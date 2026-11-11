# Planned Flask and SQLite backend

**Selected direction for later implementation. No backend or accounts are built yet.**

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

## Proposed records and operations

Users: internal ID, unique login identifier, password hash, display name, creation time. Runs: ID, owner ID, score, duration, mode, timestamp, rules version, and a unique submission ID. Preferences: owner ID, audio level, and graphics settings.

Proposed routes cover registration, login/logout, the private dashboard, submitting/listing runs, changing display name/password, and deleting an account. Enforce ownership on every read and write. Use parameterized SQL, password hashing, CSRF protection for cookie-authenticated mutations, and appropriate cookie settings. Recheck current Flask security guidance before implementation.

Never trust a submitted user ID to select the score owner. Never store plain passwords or privileged secrets in client code. Validate score shape, ranges, duration, and duplicate submission IDs. Plausibility checks reduce easy abuse but do not prove that a client-side run was honest.

## Future acceptance checks

Register and log in; reject invalid credentials; save a score and retrieve it after sign-out/sign-in; deny access to another user's run; reject signed-out writes; update a display name; change a password with verification; define recovery and deletion behavior. Test these with two separate accounts. No test is complete yet.
