# Highway Game — Stages 1 and 2

Flask authentication and SQLite persistence for the Review 2 highway game.
This application is separate from the VitePress research website. Stage 2 adds a
standalone Three.js game in `frontend/`. Stage 3 will connect it to the existing
authentication and run API; Stage 2 does not send or save results.

## Install on Mac

Use Python 3.13 (tested with the existing Python 3.13.0 environment; use a current
patched Python release for deployment). From the repository root:

```sh
cd game-app
# Only if .venv does not already exist:
python3 -m venv .venv
source .venv/bin/activate
python -m pip --isolated install --index-url https://pypi.org/simple --upgrade pip
python -m pip --isolated install --index-url https://pypi.org/simple -r requirements-dev.txt
python -m pip check
```

`requirements.txt` pins the runtime dependencies, including transitive packages.
`requirements-dev.txt` additionally pins the test dependencies. For a runtime-only
installation, install `requirements.txt` instead.

### Certificate issue investigated

The existing Python.org 3.13 installation reports no default CA file; its expected
OpenSSL certificate path is `/Library/Frameworks/Python.framework/Versions/3.13/etc/openssl/cert.pem`.
This is consistent with the previously reported Python certificate error, but the
original failing command/log was unavailable. The initial sandboxed installation
attempt here failed at DNS resolution, not TLS.

Installation succeeded using pip 24.2 with its default system trust support and an
explicit HTTPS PyPI index. No SSL checks were disabled and no `--trusted-host` flags
were used. Pip 24.2+ on Python 3.10+ uses system certificates as well as certifi:
https://pip.pypa.io/en/stable/topics/https-certificates/

If plain Python HTTPS calls still fail outside pip, run the official
`Install Certificates.command` bundled in `/Applications/Python 3.13/` for that
Python.org installation, then retry. That system-wide repair was not performed
here. For managed networks, use your administrator's approved CA bundle via
`PIP_CERT`; never bypass verification or download an untrusted certificate.

## Run locally

```sh
cd game-app  # omit if already here
source .venv/bin/activate
python -m flask --app highway init-db
python -m flask --app highway run --host 127.0.0.1 --port 5000
```

Open http://127.0.0.1:5000 . Register a username (3–32 ASCII letters, numbers,
underscores) and password (12–128 characters), sign in, view your private results,
and sign out. Usernames are case-insensitive and stored lowercase. Passwords use
Werkzeug's salted scrypt hash. No game or pretend score submission UI is provided.

The application initializes missing tables on startup; `init-db` is also available
and does **not** drop tables or erase data. Data lives in `instance/highway.sqlite3`.
The first local launch creates an owner-readable/writable `instance/secret.key` and
reuses it on restart. Both are ignored by Git, as are `.venv`, caches, and `.env`
files. Do not delete the instance directory if you want to preserve accounts/runs.

For deployment, supply a strong `HIGHWAY_SECRET_KEY` through the environment or a
secret manager and set `HIGHWAY_HTTPS=1` behind HTTPS to enable Secure cookies.
The application does not load `.env` files automatically. The Flask development
server is for local use. Sessions expire after two hours of inactivity; cookies
are HttpOnly and SameSite=Lax. POST forms and API writes require CSRF tokens.

## Backend API contract (Stage 3 integration)

All `/api/*` routes require a signed-in session. Missing authentication returns
401 (a write without valid CSRF may return 400 first). The dashboard redirects
signed-out users to sign-in. No cross-origin API access is configured.

| Request | Behavior |
| --- | --- |
| `GET /api/csrf` | Obtain `csrf_token` for the current session. |
| `POST /api/runs` | Start a server-issued run; returns `id`, `duration_seconds: 20`, and `expires_at` (Unix seconds). Repeated starts reuse the pending run. |
| `POST /api/runs/<id>/complete` | Submit JSON `{"score":123}` and the `X-CSRFToken` header. |
| `GET /api/runs` | List only the current user's completed runs. |
| `GET /api/runs/<id>` | Read the current user's pending or completed run. |

The future same-origin frontend should use session cookies and refresh its CSRF
token after signing in. It must obtain a run ID before gameplay. A completion must
arrive 20–300 seconds after the server start time. Score must be an integer from
0 through 2000; booleans, fractional values, extra fields, and malformed JSON are
rejected. The bound is provisional for Stage 2's distance scoring and must be
revisited if scoring rules change. The client cannot select the owner or timing.

Each run can be completed only once. A conditional database update also rejects
concurrent duplicate completions with 409. Unknown and other players' IDs both
return 404. Completed runs cannot be edited/deleted through any route. An expired
pending ticket is discarded when its owner starts again. Only one pending run per
player is allowed, including across tabs. Starting again after completion is a
new legitimate run, not a duplicate of the previous result.

To exercise the API without implementing gameplay, sign in and use the browser
console on the local app:

```js
const {csrf_token} = await (await fetch('/api/csrf')).json();
const headers = {'X-CSRFToken': csrf_token, 'Content-Type': 'application/json'};
const run = await (await fetch('/api/runs', {method: 'POST', headers})).json();
// Wait at least 20 seconds, then submit once:
await fetch(`/api/runs/${run.id}/complete`, {
  method: 'POST', headers, body: JSON.stringify({score: 123})
});
// Reload My results to see the saved result.
```

## Tests

```sh
cd game-app  # omit if already here
source .venv/bin/activate
python -m pytest -q
```

Tests keep CSRF enabled and use temporary SQLite databases. They cover registration,
case-insensitive duplicate usernames, validation, scrypt hashing, failed login,
logout, session/CSRF rotation, unauthorized access, cross-user isolation, restart
persistence, non-destructive initialization, foreign keys, score bounds, malformed
JSON, expired/early runs, duplicate starts, and sequential/concurrent duplicate
completions. Timing tests age database tickets instead of sleeping for 20 seconds.

## Scope and limitations

The server validates ownership, elapsed time, shape/range of scores, and uniqueness;
it does not simulate driving. A modified client can wait and submit a fabricated
score within the allowed range. This is practical validation, not anti-cheat.
Server elapsed time includes client pauses/network delay. Stage 2 must decide how
to handle a run interrupted for more than five minutes.

Registration/login rate limiting, password recovery, account maintenance, deployment
configuration, and production monitoring are not implemented in Stage 1. Local
logout clears the browser session; signed cookie sessions do not offer central
revocation of an already stolen cookie. Protect the secret and use HTTPS when
hosting. Database schema migrations will be needed if future stages change tables.

Runtime pins were checked with `pip-audit` against PyPI advisories during this work:
no known vulnerabilities were reported. This is a point-in-time check, not a promise
of permanent safety. Optional recheck after installing `pip-audit`:

```sh
python -m pip_audit --disable-pip --no-deps -r requirements.txt
```

## Stage 2: play locally

Use Node.js 22.12+ (verified with Node 24.11.1). From the repository root:

```sh
cd game-app/frontend
npm ci
npm run dev
```

Open the Local URL printed by Vite (normally http://127.0.0.1:5173/).
Flask is not needed for this standalone demo; its application and database are
unchanged. `npm test` runs six essential Vitest rule tests; `npm run build` creates
ignored `frontend/dist/` output. The lockfile pins dependencies.

Click **Start driving**. W/Up accelerates, S/Down brakes, A/D or Left/Right steers.
P/Escape or the Pause button pauses/resumes. Losing focus automatically pauses and
clears held keys. Drive for 20 seconds of active simulation time, avoid orange
stationary traffic, and earn one point per meter. A collision ends the run early;
**Drive again** resets it. Scores are in-memory only. The simulation uses a fixed
60 Hz step, caps speed at 40 m/s, and limits steering to the road. Severe rendering
stalls are capped to avoid a large jump; this can extend wall-clock run duration.

`src/game.js` owns rules, `input.js` owns keyboard input, `scene.js` draws simple
Three.js geometry, and `main.js` coordinates the loop/UI. No React, Rapier, audio,
or gamepad code is included. Xbox/PlayStation support remains a future requirement.

Stage 3 must resolve early collision results versus the backend's 20-second minimum
submission time, and pauses versus its five-minute ticket expiry. This stage does
not alter those backend rules or implement API integration.
