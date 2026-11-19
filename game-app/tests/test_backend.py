import re
import sqlite3
import pytest
from werkzeug.security import check_password_hash
from highway import create_app
from highway.db import get_db

PASSWORD = 'a strong password 123'


@pytest.fixture
def app(tmp_path):
    return create_app({'TESTING': True, 'SECRET_KEY': 'test-only-secret', 'DATABASE': str(tmp_path / 'test.sqlite3')})


@pytest.fixture
def client(app):
    return app.test_client()


def token(client, page='/login'):
    return re.search(r'name="csrf_token"[^>]*value="([^"]+)"', client.get(page).text).group(1)


def register(client, username='alice', password=PASSWORD):
    return client.post('/register', data={'username': username, 'password': password, 'csrf_token': token(client, '/register')})


def login(client, username='alice', password=PASSWORD):
    return client.post('/login', data={'username': username, 'password': password, 'csrf_token': token(client)})


def headers(client):
    return {'X-CSRFToken': client.get('/api/csrf').json['csrf_token']}


def start(client):
    return client.post('/api/runs', headers=headers(client)).json['id']


def age(app, run_id, seconds=21):
    with app.app_context():
        db = get_db()
        db.execute('UPDATE runs SET started_at = started_at - ? WHERE id = ?', (seconds, run_id))
        db.commit()


def complete(client, run_id, data=None):
    return client.post(f'/api/runs/{run_id}/complete', json={'score': 123} if data is None else data, headers=headers(client))


@pytest.fixture
def player(client):
    assert register(client).status_code == 302
    assert login(client).status_code == 302
    return client


def test_registration_hash_and_login(app, client):
    assert register(client).status_code == 302
    with app.app_context():
        row = get_db().execute('SELECT * FROM users').fetchone()
        assert row['password_hash'] != PASSWORD
        assert row['password_hash'].startswith('scrypt:')
        assert check_password_hash(row['password_hash'], PASSWORD)
    assert login(client).status_code == 302
    assert client.get('/dashboard').status_code == 200


@pytest.mark.parametrize('name', ['alice', 'ALICE', ' alice '])
def test_duplicate_users(client, name):
    register(client)
    assert register(client, name).status_code == 400


@pytest.mark.parametrize('name,password', [('ab', PASSWORD), ('a<script>', PASSWORD), ('a'*33, PASSWORD), ('alice', 'short'), ('alice', 'a'*129)])
def test_invalid_registration(client, name, password):
    assert register(client, name, password).status_code == 400


@pytest.mark.parametrize('name,password', [('alice', 'incorrect password'), ('nobody', PASSWORD)])
def test_login_failures(client, name, password):
    register(client)
    assert login(client, name, password).status_code == 400
    assert client.get('/api/runs').status_code == 401


def test_logout(player):
    assert player.get('/logout').status_code == 405
    assert player.post('/logout', headers=headers(player)).status_code == 302
    assert player.get('/api/runs').status_code == 401
    assert player.get('/dashboard').status_code == 302


@pytest.mark.parametrize('path', ['/register', '/login', '/logout', '/api/runs', '/api/runs/test/complete'])
def test_csrf_required(client, path):
    assert client.post(path).status_code == 400
    assert client.post(path, headers={'X-CSRFToken': 'invalid'}).status_code == 400


def test_unauthorized_requests(client):
    for path in ['/api/runs', '/api/runs/unknown', '/api/csrf']:
        assert client.get(path).status_code == 401
    csrf = token(client)
    for path in ['/api/runs', '/api/runs/unknown/complete']:
        assert client.post(path, headers={'X-CSRFToken': csrf}).status_code == 401
    assert client.get('/dashboard').status_code == 302


def test_persistence_and_non_destructive_init(app, player):
    run_id = start(player)
    age(app, run_id)
    assert complete(player, run_id).status_code == 200
    restarted = create_app({'TESTING': True, 'SECRET_KEY': 'test-only-secret', 'DATABASE': app.config['DATABASE']})
    assert restarted.test_cli_runner().invoke(args=['init-db']).exit_code == 0
    fresh = restarted.test_client()
    assert login(fresh).status_code == 302
    assert fresh.get('/api/runs').json['runs'][0]['score'] == 123
    assert run_id in fresh.get('/dashboard').text


def test_ownership(app, player):
    run_id = start(player)
    age(app, run_id)
    other = app.test_client()
    register(other, 'bobby')
    login(other, 'bobby')
    assert other.get(f'/api/runs/{run_id}').status_code == 404
    assert complete(other, run_id).status_code == 404
    assert complete(player, run_id).status_code == 200
    assert other.get('/api/runs').json == {'runs': []}
    assert run_id not in other.get('/dashboard').text
    for method in ['patch', 'put', 'delete']:
        assert getattr(other, method)(f'/api/runs/{run_id}', headers=headers(other)).status_code == 405


def test_duplicate_start_and_completion(app, player):
    run_id = start(player)
    assert start(player) == run_id
    age(app, run_id)
    assert complete(player, run_id).status_code == 200
    assert complete(player, run_id, {'score': 999}).status_code == 409
    assert player.get(f'/api/runs/{run_id}').json['score'] == 123
    assert len(player.get('/api/runs').json['runs']) == 1
    assert start(player) != run_id


@pytest.mark.parametrize('data', [{}, {'score': -1}, {'score': 2001}, {'score': True}, {'score': 1.5}, {'score': '100'}, {'score': 10, 'user_id': 2}, [], {'score': None}])
def test_invalid_results(app, player, data):
    run_id = start(player)
    age(app, run_id)
    assert complete(player, run_id, data).status_code == 400
    assert player.get('/api/runs').json['runs'] == []


def test_timing_and_expiration(app, player):
    run_id = start(player)
    assert complete(player, run_id).status_code == 400
    age(app, run_id, 301)
    assert complete(player, run_id).status_code == 400
    assert start(player) != run_id
    assert complete(player, run_id).status_code == 404


@pytest.mark.parametrize('score', [0, 2000])
def test_score_boundaries(app, player, score):
    run_id = start(player)
    age(app, run_id)
    assert complete(player, run_id, {'score': score}).status_code == 200


def test_database_foreign_keys(app):
    with app.app_context(), pytest.raises(sqlite3.IntegrityError):
        get_db().execute('INSERT INTO runs(id,user_id,started_at) VALUES (?, ?, ?)', ('bad', 999, 0))


def test_security_headers_and_cookies(client):
    register(client)
    response = login(client)
    cookie = response.headers['Set-Cookie']
    assert 'HttpOnly' in cookie and 'SameSite=Lax' in cookie
    assert response.headers['Cache-Control'] == 'no-store'
    assert "frame-ancestors 'none'" in response.headers['Content-Security-Policy']


def test_concurrent_duplicate_completion(app, player):
    from concurrent.futures import ThreadPoolExecutor
    run_id = start(player)
    age(app, run_id)
    clients = [app.test_client(), app.test_client()]
    for client in clients:
        login(client)
    csrf_headers = [headers(client) for client in clients]
    def submit(index):
        return clients[index].post(f'/api/runs/{run_id}/complete', json={'score': 123}, headers=csrf_headers[index]).status_code
    with ThreadPoolExecutor(max_workers=2) as executor:
        assert sorted(executor.map(submit, [0, 1])) == [200, 409]
    assert len(player.get('/api/runs').json['runs']) == 1


def test_malformed_json_and_missing_run(player):
    run_id = start(player)
    assert player.post(f'/api/runs/{run_id}/complete', data='{broken', content_type='application/json', headers=headers(player)).status_code == 400
    assert complete(player, 'unknown').status_code == 404


def test_login_rotates_csrf_and_logout_clears_session(client):
    register(client)
    old_token = token(client)
    login(client)
    assert client.post('/api/runs', headers={'X-CSRFToken': old_token}).status_code == 400
    client.post('/logout', headers=headers(client))
    with client.session_transaction() as session:
        assert '_user_id' not in session
