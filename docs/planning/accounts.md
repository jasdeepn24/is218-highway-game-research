# Flask and SQLite backend

**Stage 1 is committed and verified locally.** Source: [Stage 1 commit `c9f6f44`](https://github.com/jasdeepn24/is218-highway-game-research/commit/c9f6f441150b3898225129a12622f5a4a2824f1b). See the [Stage 1 verification record](/planning/experiments#stage-1-verification) for checked behavior, source fingerprints and test results. The minimum gameplay integration is now verified locally; account maintenance remains planned. See the [Stage 3 record](/planning/experiments#stage-3-verification). The [approved stories](/planning/specification#five-user-stories) govern current requirements.

## Responsibilities

| Layer | Responsibility | Boundary |
| --- | --- | --- |
| Three.js browser frontend | Rendering, controls, local simulation, run summary | Browser-submitted data is untrusted |
| Flask server | Registration, authentication, sessions, access checks, score validation | Derives user identity from the authenticated session |
| SQLite database | User IDs, usernames, password hashes and owned runs | Stored on the server, never exposed as a public file |
| VitePress | Research and specifications | Separate from private application data |

For the first local application, Flask can serve the game files and API from the same origin. This keeps session handling simpler than separate frontend/backend origins. Hosting is a later decision; localhost can support the first demonstration. [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) can host documentation/static files but cannot run this Flask backend.

## Why this backend fits

Flask's [database tutorial](https://flask.palletsprojects.com/en/stable/tutorial/database/) uses Python's SQLite support without a separate database server. It notes that concurrent writes occur sequentially. **Assessment:** this is reasonable for a small class project; it is not evidence of high-concurrency readiness. Public hosting would need a persistent database file, backups, and an appropriate production server.

The [Flask authentication tutorial](https://flask.palletsprojects.com/en/stable/tutorial/views/) demonstrates registration, login, password hashing, and sessions. It is a starting reference rather than a complete production security design.

## Earlier proposed records and operations

The proposals below are retained as research history. They are not the implemented schema or additional approved scope. Current `users` stores ID, username and password hash; `runs` stores ID, owner ID, start/completion times and score. Display names, preferences, recovery and deletion are not implemented. The approved US5 covers display-name and password changes; preferences, recovery and deletion remain earlier ideas.

Users: internal ID, unique login identifier, password hash, display name, creation time. Runs: ID, owner ID, score, duration, mode, timestamp, rules version, and a unique submission ID. Preferences: owner ID, audio level, and graphics settings.

Proposed routes cover registration, login/logout, the private dashboard, submitting/listing runs, changing display name/password, and deleting an account. Enforce ownership on every read and write. Use parameterized SQL, password hashing, CSRF protection for cookie-authenticated mutations, and appropriate cookie settings. Recheck current Flask security guidance before implementation.

Never trust a submitted user ID to select the score owner. Never store plain passwords or privileged secrets in client code. Validate score shape, ranges, duration, and duplicate submission IDs. Plausibility checks reduce easy abuse but do not prove that a client-side run was honest.

## Current API and integration

Source inspection confirms registration, login/logout, a protected dashboard, CSRF tokens, and start/list/read/complete run endpoints. The dashboard shows an empty state and a run list; totals and account-maintenance routes are absent. See the verification record for test coverage rather than treating source presence as complete story acceptance.

The API issues a server-owned run ID and accepts one completion with integer score,
active `elapsed_seconds`, and `reason` (`collision` or `finished`). Active duration
must be greater than zero and at most 20 seconds; `finished` requires 20. Score
cannot exceed `floor(40 * elapsed_seconds)`, matching the game's 40 m/s speed cap.
Duplicate completion is rejected with 409 and the owner is derived from the session.
Historical stored scores remain readable; the old score-only request is rejected.

### Resolved integration decision: run timing

**Implemented locally, November 19, 2026.** Collisions can save before 20 seconds.
Active duration cannot exceed server wall time by more than 0.25 seconds; pauses
freeze simulation time while wall time advances. The five-minute wall-clock ticket
expiry remains. Expired results produce an explicit unsaved error, with retry or
an explicit new-run action; the client never silently saves under a replacement ID.
No server simulation or new database columns were needed.

Flask serves the Vite build at protected `/play/` routes on the same origin as auth
and the API. The game starts only after receiving a ticket, saves on collision or
timer completion, confirms the persisted score, and uses the same ID for retries.
Explicit replay abandons an unfinished ticket owned by that player; another tab's
unfinished run can therefore be invalidated. Existing completed scores are unchanged.

Duration and collision claims remain untrusted. A modified client can submit a
plausible fabricated score after waiting; these checks do not prove honest driving.
See the [Stage 3 verification record](/planning/experiments#stage-3-verification)
and local `game-app/README.md` for exact commands, tests, and limitations.

Local logout clears the browser session; the current signed-cookie approach does not centrally revoke a copied session cookie. US5 still needs a documented password-change/session-invalidation flow. Score plausibility checks cannot prove honest gameplay.

The committed [Stage 1 README](https://github.com/jasdeepn24/is218-highway-game-research/blob/c9f6f441150b3898225129a12622f5a4a2824f1b/game-app/README.md) contains local setup and API details. Public backend hosting remains open; the complete game is initially intended to run locally.

## Privacy and cookies

**Current data:** SQLite stores user ID, username and password hash, plus each run's ID, owner ID, start time, completion time and score. Unfinished runs have no completion time or score. The app does not request email, real name or location. Display names/preferences are not stored yet. Use synthetic accounts for class testing and avoid personal details in usernames.

**Login cookie:** Flask uses a signed session cookie for login and CSRF/session state, not advertising. Signing protects against tampering; it does not encrypt the contents. Passwords and score history are not stored in it. The current configuration uses `HttpOnly`, `SameSite=Lax` and a two-hour lifetime that can refresh with activity. `Secure` is enabled when `HIGHWAY_HTTPS=1`; public deployment would need HTTPS and this setting. See [Flask's cookie-security guidance](https://flask.palletsprojects.com/en/stable/web-security/). Signing out clears the browser session, but does not centrally revoke a copied cookie. Password-change/session invalidation remains planned.

**Access protection:** Flask requires sign-in for the game, results and run API, derives ownership from the session, validates submissions, uses parameterized SQL and CSRF protection, and hashes passwords. SQLite and secrets stay out of Git and the public documentation site. These measures are not a security audit or a guarantee against cheating.

**Retention/deletion plan:** Accounts and completed scores currently remain in the local database until manually removed; there is no automatic retention policy or account-deletion screen. Proposed policy: keep class demonstration data only through grading, then remove test accounts and their runs. Before using real accounts, define a deletion-request process, verify ownership, delete related runs before the account, and document how any backups will expire. This is planning, not an implemented deletion feature or a change to US5.

**Practical considerations:** Explain data use before inviting real users, collect only what the workflow needs, and keep identifying data out of public screenshots and feedback. No third-party analytics is being added. The public GitHub Pages research site is separate from the local login app; hosting-provider data handling needs review before public deployment. Privacy/cookie obligations depend on the eventual audience and hosting; check applicable requirements before launch rather than claiming full legal compliance. The [accessibility plan](/planning/engineering-plan#accessibility-and-phone-testing-plan) also covers clear labels, errors and keyboard use of account screens.

## Usage measure: completed runs per week

**Planned measurement; no usage results collected here.** Count saved, completed runs to see whether players finish and save a session. Include both collision endings and 20-second finishes; exclude unfinished tickets and unsaved attempts. This measures saved completions, not unique players or every game played.

Once a week, the project owner can open the existing SQLite database locally in read-only mode and run:

```sql
SELECT COUNT(*) AS completed_runs
FROM runs
WHERE completed_at >= :week_start_utc
  AND completed_at < :next_week_start_utc;
```

Bind the two parameters to Unix timestamps for consecutive Monday 00:00 UTC boundaries. Use the same UTC week definition each time; record the date range and aggregate count only. Use the demonstration database consistently and keep automated-test databases separate. A completed row is counted once even when a save is retried. No new table, tracking cookie, third-party service or application endpoint is needed. This check has not been run as part of the SPEC update.
