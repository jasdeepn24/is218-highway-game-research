import os
import secrets
import sqlite3
import time
from datetime import timedelta
from pathlib import Path
from uuid import uuid4

from flask import Flask, abort, jsonify, redirect, render_template, request, session, url_for
from flask_login import LoginManager, UserMixin, current_user, login_required, login_user, logout_user
from flask_wtf import FlaskForm, CSRFProtect
from flask_wtf.csrf import CSRFError, generate_csrf
from werkzeug.security import check_password_hash, generate_password_hash
from wtforms import PasswordField, StringField
from wtforms.validators import Length, Regexp

from .db import close_db, get_db, init_db


class Credentials(FlaskForm):
    username = StringField('Username', filters=[lambda s: s.strip() if s else s],
                           validators=[Length(min=3, max=32), Regexp(r'^[A-Za-z0-9_]+$')])
    password = PasswordField('Password', validators=[Length(min=12, max=128)])


class User(UserMixin):
    def __init__(self, row):
        self.id = row['id']
        self.username = row['username']


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        DATABASE=str(Path(app.instance_path) / 'highway.sqlite3'),
        SECRET_KEY=os.environ.get('HIGHWAY_SECRET_KEY'),
        SESSION_COOKIE_HTTPONLY=True, SESSION_COOKIE_SAMESITE='Lax',
        SESSION_COOKIE_SECURE=os.environ.get('HIGHWAY_HTTPS') == '1',
        PERMANENT_SESSION_LIFETIME=timedelta(hours=2),
        MAX_CONTENT_LENGTH=16 * 1024,
    )
    if test_config:
        app.config.update(test_config)
    Path(app.instance_path).mkdir(parents=True, exist_ok=True)
    if not app.config['SECRET_KEY']:
        # A local secret persists across restarts, never enters Git, and is owner-only.
        secret_path = Path(app.instance_path) / 'secret.key'
        try:
            fd = os.open(secret_path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
        except FileExistsError:
            pass
        else:
            with os.fdopen(fd, 'w') as handle:
                handle.write(secrets.token_hex(32))
        app.config['SECRET_KEY'] = secret_path.read_text().strip()
        if len(app.config['SECRET_KEY']) < 32:
            raise RuntimeError('Local secret file is invalid; supply HIGHWAY_SECRET_KEY.')
    CSRFProtect(app)
    login = LoginManager(app)
    app.teardown_appcontext(close_db)

    @login.user_loader
    def load_user(user_id):
        row = get_db().execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
        return User(row) if row else None

    @login.unauthorized_handler
    def unauthorized():
        if request.path.startswith('/api/'):
            return jsonify(error='Authentication required'), 401
        return redirect(url_for('login_view'))

    @app.errorhandler(CSRFError)
    def csrf_error(error):
        if request.path.startswith('/api/'):
            return jsonify(error='Invalid or missing CSRF token'), 400
        return render_template('error.html', message='Form expired or CSRF token missing. Reload and try again.'), 400

    @app.after_request
    def security_headers(response):
        response.headers['Cache-Control'] = 'no-store'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['Content-Security-Policy'] = "default-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'"
        return response

    @app.get('/')
    def index():
        return render_template('index.html')

    @app.route('/register', methods=['GET', 'POST'])
    def register():
        form = Credentials()
        error = None
        if form.validate_on_submit():
            db = get_db()
            try:
                db.execute('INSERT INTO users(username, password_hash) VALUES (?, ?)',
                           (form.username.data.lower(), generate_password_hash(form.password.data)))
                db.commit()
            except sqlite3.IntegrityError:
                db.rollback()
                error = 'Username is already registered.'
            else:
                return redirect(url_for('login_view'))
        status = 400 if request.method == 'POST' else 200
        return render_template('auth.html', form=form, title='Register', error=error), status

    @app.route('/login', methods=['GET', 'POST'])
    def login_view():
        form = Credentials()
        error = None
        if form.validate_on_submit():
            row = get_db().execute('SELECT * FROM users WHERE username = ?', (form.username.data,)).fetchone()
            if row and check_password_hash(row['password_hash'], form.password.data):
                session.clear()
                login_user(User(row), remember=False)
                session.permanent = True
                return redirect(url_for('dashboard'))
            error = 'Invalid username or password.'
        return render_template('auth.html', form=form, title='Sign in', error=error), (400 if request.method == 'POST' else 200)

    @app.post('/logout')
    @login_required
    def logout():
        logout_user()
        session.clear()
        return redirect(url_for('index'))

    @app.get('/dashboard')
    @login_required
    def dashboard():
        runs = get_db().execute('SELECT * FROM runs WHERE user_id = ? AND completed_at IS NOT NULL ORDER BY completed_at DESC', (current_user.id,)).fetchall()
        return render_template('dashboard.html', runs=runs)

    @app.get('/api/csrf')
    @login_required
    def csrf_token():
        return jsonify(csrf_token=generate_csrf())

    @app.post('/api/runs')
    @login_required
    def start_run():
        now = time.time()
        db = get_db()
        # Repeated start requests return the same pending ticket; expired tickets are discarded.
        with db:
            db.execute('DELETE FROM runs WHERE user_id = ? AND completed_at IS NULL AND started_at < ?', (current_user.id, now - 300))
            db.execute('INSERT OR IGNORE INTO runs(id, user_id, started_at) VALUES (?, ?, ?)', (str(uuid4()), current_user.id, now))
            row = db.execute('SELECT * FROM runs WHERE user_id = ? AND completed_at IS NULL', (current_user.id,)).fetchone()
        return jsonify(id=row['id'], duration_seconds=20, expires_at=row['started_at'] + 300), 201

    @app.get('/api/runs')
    @login_required
    def list_runs():
        rows = get_db().execute('SELECT * FROM runs WHERE user_id = ? AND completed_at IS NOT NULL ORDER BY completed_at DESC', (current_user.id,)).fetchall()
        return jsonify(runs=[dict(row) for row in rows])

    @app.get('/api/runs/<run_id>')
    @login_required
    def get_run(run_id):
        row = owned_run(run_id)
        return jsonify(dict(row))

    def owned_run(run_id):
        row = get_db().execute('SELECT * FROM runs WHERE id = ? AND user_id = ?', (run_id, current_user.id)).fetchone()
        if row is None:
            abort(404)
        return row

    @app.post('/api/runs/<run_id>/complete')
    @login_required
    def complete_run(run_id):
        row = owned_run(run_id)
        data = request.get_json(silent=True)
        if not isinstance(data, dict) or set(data) != {'score'} or type(data['score']) is not int or not 0 <= data['score'] <= 2000:
            return jsonify(error='Submit only an integer score between 0 and 2000'), 400
        if row['completed_at'] is not None:
            return jsonify(error='Run already completed'), 409
        now = time.time()
        if not 20 <= now - row['started_at'] <= 300:
            return jsonify(error='Run is too early or expired'), 400
        db = get_db()
        with db:
            changed = db.execute('UPDATE runs SET score = ?, completed_at = ? WHERE id = ? AND user_id = ? AND completed_at IS NULL', (data['score'], now, run_id, current_user.id)).rowcount
        if not changed:
            return jsonify(error='Run already completed'), 409
        return jsonify(id=run_id, score=data['score'], duration_seconds=20), 200

    @app.cli.command('init-db')
    def init_db_command():
        """Create missing tables without deleting existing data."""
        init_db()
        print('Database initialized (existing data preserved).')

    with app.app_context():
        init_db()
    return app
