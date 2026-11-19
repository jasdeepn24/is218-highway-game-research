# Highway Game — integrated Review 2 slice

Flask serves authentication, private results, the built Three.js game, and the JSON
API from one origin. Vite builds the frontend; no separate frontend server or CORS
configuration is needed. VitePress research documentation remains separate.

## Install and run on Mac

Use Python 3.13 and Node.js 22.12+ (verified with Python 3.13.0 / Node 24.11.1).
From the repository root:

```sh
cd game-app
# Only if .venv does not already exist:
python3 -m venv .venv
source .venv/bin/activate
python -m pip --isolated install --index-url https://pypi.org/simple -r requirements-dev.txt
cd frontend
npm ci
npm run build
cd ..
python -m flask --app highway run --host 127.0.0.1 --port 5000
```

Open http://127.0.0.1:5000 . If that port is occupied, use `--port 5050` and open
http://127.0.0.1:5050 instead. Use the same host/port throughout the journey.
After frontend edits, rerun `npm run build` and reload `/play/`.
`npm run dev` alone is not the integrated application.

## Verify the complete journey

1. Register a new username (3–32 ASCII letters, digits, underscores) and password
   (12–128 characters). Sign in with that account.
2. Select **Play highway game**, then **Start driving**. W/Up accelerates,
   S/Down brakes, A/D or Left/Right steers. P/Escape or Pause pauses/resumes.
   Leaving the browser automatically pauses and clears held input.
3. Cover distance and avoid orange traffic for 20 active seconds, or hit traffic
   to end early. The game automatically submits the result and displays
   **Saved to your account. Score: …** only after server confirmation.
4. Open **My results / Sign out**. Check the result, sign out, then sign in again:
   the same result must remain. Restarting Flask with the same database also
   preserves it. A second account should see only its own results.
5. Replay for a new run. Pause partway through and confirm the timer/score stop;
   resume and finish within five minutes of starting.

If saving fails, the game says **Not saved** and offers **Retry saving**. Retry
uses the same run ID, so a lost HTTP response cannot create a second score. If your
session expired, use the **Sign in** link (new tab), log into the original account,
return, and retry. Keep the game tab open: unsaved results are in memory only.
Starting another run requires confirmation before discarding an unsaved result.

## Persistence and security

SQLite lives in `game-app/instance/highway.sqlite3`. Startup and optional
`python -m flask --app highway init-db` create missing tables without dropping data.
No schema migration is required for Stage 3; existing accounts and scores remain.

Werkzeug hashes passwords with salted scrypt. Flask-Login protects gameplay and
results; CSRF protects all writes, including logout. Ownership comes from the
session, never submitted user IDs. Sessions use HttpOnly, SameSite=Lax cookies and
a two-hour inactivity lifetime. `instance/secret.key` is generated owner-only on
first launch and reused. Instance data, secrets, `.venv`, caches, `node_modules`,
and `frontend/dist` are ignored by Git.

For HTTPS deployment, set `HIGHWAY_SECRET_KEY` in the environment/secret manager
and `HIGHWAY_HTTPS=1` for Secure cookies. `.env` files are not loaded automatically.
The Flask development server is local-only. Rate limiting, password recovery,
central session revocation and account maintenance remain outside this slice.

## Run API and timing

All API routes require login. Obtain `csrf_token` and `user_id` from `GET /api/csrf`;
send `X-CSRFToken` on writes with same-origin cookies. The frontend checks that a
retry still belongs to the original signed-in account.

- `POST /api/runs`: returns a server-issued `id`, `duration_seconds: 20`, and
  `expires_at`. Empty requests reuse a pending ticket; the game's explicit
  `{"restart":true}` starts fresh and abandons the owner's unfinished ticket.
  Starting in a second tab therefore invalidates an unfinished run in the first.
- `POST /api/runs/<id>/complete`: accepts exactly
  `{"score":75,"elapsed_seconds":5,"reason":"collision"}`.
- `GET /api/runs`: the owner's completed runs only.
- `GET /api/runs/<id>`: the owner's run; nonexistent/other-owner IDs return 404.

`elapsed_seconds` is finite active simulation time, greater than zero and at most
20. `reason` is `collision` or `finished`; `finished` requires exactly 20 seconds.
Score is an integer from zero through `floor(40 * elapsed_seconds)` (maximum speed
40 m/s, one point per meter). Active time cannot exceed server wall time, allowing
0.25 seconds for timing precision. Collisions save immediately; pauses simply add
wall time. Tickets expire after five wall-clock minutes, including pauses and save
retries. Expired results are rejected explicitly; start another run after expiry.

The old score-only payload is rejected. Historical scores remain readable even if
they exceed the new bound. Duplicate completion returns 409; an atomic conditional
update prevents concurrent duplicates. The frontend reads back a duplicate's stored
score to confirm a successful prior save rather than claiming a second save.

These checks are practical validation, not anti-cheat. The server does not simulate
traffic and cannot prove a collision, actual input, distance, or pauses. A modified
client can fabricate a plausible result after waiting long enough. The 40 m/s bound
is deliberately conservative and does not model the acceleration curve.

## Tests and build

From `game-app/`:

```sh
.venv/bin/python -m pytest -q
cd frontend
npm test
npm run build
```

The 38 original backend test cases remain, with helpers/boundary expectations
updated for the new submission contract (800 maximum rather than 2000). Additional
integration checks cover early collisions, paused runs, invalid timing/reasons,
replay tickets, protected build routes, duplicate recovery, and account changes.
The six original gameplay tests remain unchanged. Tests use temporary databases;
manual Chromium verification also uses an isolated temporary database.

Vite emits the existing >500 kB Three.js chunk warning (about 134 kB gzipped).
The build succeeds. No graphics, audio, controller support, or physics upgrades
are included; Xbox/PlayStation support remains a future hardware-tested requirement.

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
