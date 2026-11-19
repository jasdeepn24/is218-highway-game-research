# Flask and SQLite backend

**Stage 1 is committed and verified locally.** Source: [Stage 1 commit `c9f6f44`](https://github.com/jasdeepn24/is218-highway-game-research/commit/c9f6f441150b3898225129a12622f5a4a2824f1b). See the [Stage 1 verification record](/planning/experiments#stage-1-verification) for checked behavior, source fingerprints and test results. Gameplay integration and account maintenance remain planned. The [approved stories](/planning/specification#five-user-stories) govern current requirements.

## Responsibilities

| Layer | Responsibility | Boundary |
| --- | --- | --- |
| Three.js browser frontend | Rendering, controls, local simulation, run summary | Browser-submitted data is untrusted |
| Flask server | Registration, authentication, sessions, access checks, score validation | Derives user identity from the authenticated session |
| SQLite database | Users, scores, profile/preferences | Stored on the server, never exposed as a public file |
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

## Current API and remaining integration

Source inspection confirms registration, login/logout, a protected dashboard, CSRF tokens, and start/list/read/complete run endpoints. The dashboard shows an empty state and a run list; totals and account-maintenance routes are absent. See the verification record for test coverage rather than treating source presence as complete story acceptance.

The current API issues a server-owned run ID and accepts one integer score from 0–2000 only 20–300 seconds after the server start. A second completion is rejected with 409. The client cannot select the owner. These are current implementation details, not changes to the approved gameplay rules.

### Priority integration decision: run timing

**Unresolved; required for Review 2 integration.** A collision can end the approved run before 20 seconds, but the current backend rejects completion until 20 wall-clock seconds have elapsed. Pause must freeze movement, score and the gameplay timer, yet the backend clock keeps advancing; a long pause can expire the ticket after 300 seconds even though fewer than 20 seconds were played.

**Proposed simple solution, not implemented:** send active gameplay duration and an end reason (`collision` or `time_limit`) with the score. The client accumulates active time only while unpaused. Permit collision completion before 20 active seconds; require 20 active seconds for a time-limit finish, with a small documented numerical tolerance. Replace the blanket 20-second server minimum with reason/duration validation: active duration must be within 0–20 seconds and cannot exceed server elapsed time beyond the tolerance. Keep server-issued IDs, ownership, CSRF, score validation and single-completion checks. Client duration and collision claims remain untrusted plausibility inputs, not proof of honest play.

Treat the existing 300-second wall-clock expiry as a separate ticket lifetime, not the gameplay timer. If a long pause expires it, show an explicit unsaved/expired result and offer a new run; do not silently save under a new ticket or count paused time toward gameplay. Confirm this expiry behavior and tolerance before implementation. This proposal preserves collision/20-second endings and pause semantics without adding a server simulation; no backend changes have been made.

Local logout clears the browser session; the current signed-cookie approach does not centrally revoke a copied session cookie. US5 still needs a documented password-change/session-invalidation flow. Score plausibility checks cannot prove honest gameplay.

The committed [Stage 1 README](https://github.com/jasdeepn24/is218-highway-game-research/blob/c9f6f441150b3898225129a12622f5a4a2824f1b/game-app/README.md) contains local setup and API details. Public backend hosting remains open; the complete game is initially intended to run locally.
