# Highway Game Lab — Agile and Engineering Plan
**IS218 Creative Project | November 2026 · Approved plan**

Approved decisions and planned requirements are recorded here; implementation evidence lives in the [experiment record](/planning/experiments#stage-1-verification). Stories and milestones are maintained on their existing pages to avoid duplicate reports.

## 1. Project goal and scope

**Goal:** Create a small 3D highway driving game for browsers where users can register, drive, earn scores, review their results, and manage their accounts.

**Target audience:** Students and casual players interested in short driving games. This is an initial design assumption, not a verified user-research result.

**Main workflow:** Register → sign in → play a 20-second highway game → save score → view private results. Collisions can end a run early. Account maintenance and dashboard totals remain later work; sign-out stays part of US1.

**First driving slice:** One three-lane highway, a third-person camera, a controllable car, basic traffic or obstacles, collisions, scoring, and a 20-second run with replay. Implement keyboard gameplay first; Xbox/PlayStation controller support remains a planned requirement with separate physical testing.

**Project boundaries:** No multiplayer, public leaderboard, payments, complex physics, or detailed vehicle customization in the initial version. Bluetooth Xbox/PlayStation controller support remains a planned requirement and must be tested on real hardware before claiming completion.

## 2. Agile stories and acceptance criteria

The [specification](/planning/specification#five-user-stories) is the canonical record of the five approved stories, priorities and acceptance criteria. See the [Stage 1 verification record](/planning/experiments#stage-1-verification) for locally checked results and remaining gaps; no story is declared Done by this plan.

## 3. Prioritized backlog and milestones

The [roadmap](/planning/roadmap#implementation-milestones) records the four approved stages, dependencies, evidence and responsibilities alongside the preserved Review 1 record. Its [course-review mapping](/planning/roadmap#mapping-stages-to-course-reviews) records Review 2 as SPEC only (November 26, 2:30 PM ET) and Review 3 as Integrated Build (November 30).

## 4. Technology architecture

```text
Browser
  Three.js + JavaScript + Vite
  Game interface, input, rendering, simulation
                 |
                 | HTTP / JSON
                 v
Flask backend
  Authentication, session security,
  authorization, run validation
                 |
                 v
SQLite
  User accounts and saved runs

Separate VitePress research website
  Hosted on GitHub Pages
  Plans, decisions, tests and evidence
```

**Technology decisions:**

- **Three.js:** Suitable for a browser-based 3D game without a full game engine.
- **Vanilla JavaScript + Vite:** Small frontend setup without an unnecessary React/Next.js framework.
- **Flask:** Lightweight Python backend for authentication and game requests.
- **SQLite:** Persistent storage without a separate database server.
- **VitePress + GitHub Pages:** Continue publishing research and project evidence.

**Why this fits:** Three.js handles the 3D scene while plain JavaScript keeps the small game loop and controls easy to follow. Vite builds the browser files; Flask handles accounts and score requests; SQLite keeps data between runs without another server to manage.

**Brief comparison:** React/Next.js could help a larger interface-heavy website, but this small game does not need an additional UI framework alongside Three.js and Flask. Unity offers an editor and broader game-engine tooling, but would change the existing JavaScript workflow and build process. Keeping the selected stack makes the project easier to explain and maintain. Rapier remains a possible later physics experiment; basic movement and collisions are sufficient initially.

**Data flow:** Registration/login forms go to Flask, which validates them and stores or checks a password hash in SQLite. After login, the browser sends its session cookie with requests. Flask serves the Vite-built game and issues an owned run ID. Three.js runs the game in the browser; completion addresses that run ID and sends the score, active duration and end reason as JSON with a CSRF token. Flask checks the session, ownership and result, then saves the score and completion time in SQLite. The private results page reads only that user's completed runs. The browser never accesses SQLite directly. Duration and end reason are validated but are not stored as database columns.

**Hosting limitation:** GitHub Pages publishes static content and cannot run Flask. The complete game will initially run locally. Public backend hosting is an open decision, not a current requirement.

**Security:** Keep authentication and ownership checks on the backend, hash passwords, use CSRF protection, and exclude databases and secrets from Git. Submitted game data is untrusted. Current score plausibility checks cannot establish cheat-proof gameplay.

## 5. Code architecture, SOLID and design patterns

Keep modules focused on distinct responsibilities:

| Module area | Responsibility |
|---|---|
| Scene/rendering | Draw road, cars, traffic, camera and lighting |
| Simulation/rules | Movement, elapsed time, collision rules and scoring |
| Input | Translate keyboard and future controller actions into game commands |
| API integration | Send authenticated run requests and handle results/errors |
| Flask auth/routes | Registration, login, logout and protected requests |
| Persistence/validation | Store owned results and reject invalid or duplicate submissions |

**Single Responsibility Principle:** Each module has one clear responsibility.

**Dependency Inversion:** Keep gameplay calculations separate from Three.js rendering and browser input APIs, allowing them to be tested independently.

**KISS and DRY:** Prefer simple functions and shared validation over unnecessary classes or duplicate logic.

**Pattern experiment:** Compare a Strategy-style keyboard/controller input interface against direct conditional handling. Use the same acceptance checks for both. Record code complexity, testing effort, and actual advantages/disadvantages before deciding.

Do not introduce additional design patterns unless a specific problem justifies them.

## 6. Testing strategy

| Layer | Important checks | Tools |
|---|---|---|
| Unit | Known movement inputs, frame-rate consistency, collision boundaries, timer, pause, scoring | Vitest |
| Integration | Valid/invalid login, persistence, private ownership, CSRF protection, invalid results, duplicate submissions | pytest |
| End-to-end | Register → sign in → play → save → private results → sign out; returning user or unauthorized-access scenario | Manual Chrome journey recorded; Playwright automation planned |
| Manual | Visual driving behavior, controls, readability, real controller compatibility | Local browser and actual hardware |

**Efficiency:** Run focused fast tests during development. Run the complete unit/integration suite before merging. Use one or two high-value E2E journeys rather than repeating every individual rule in a browser.

Use synthetic accounts and isolated test databases. Record expected results independently of implementation. Test failure and boundary cases, not just successful behavior.

### Accessibility and phone testing plan

**Planned; not performed in this documentation update.** Existing keyboard gameplay checks do not establish full keyboard accessibility or phone support.

- **Keyboard:** Use Tab/Shift+Tab and Enter/Space through registration, sign-in, game actions, results and sign-out. Check visible focus, logical order, labeled fields, understandable errors, no keyboard traps, and usable pause/replay. Check that gameplay keys do not interfere with typing in forms. Record any failures before claiming accessibility improvements.
- **Phone layout:** Check 320, 375 and 390 CSS-pixel widths, portrait/landscape, and enlarged text. Forms, instructions, score, errors and buttons should remain readable without overlap or horizontal page scrolling. Then check on an actual phone, recording device/browser; a narrow desktop preview alone is insufficient.
- **Touch controls:** Plan visible left/right, accelerate/brake, pause and replay buttons, with generous spacing and a target of at least 44 × 44 CSS pixels. Test steering while accelerating, release/cancel behavior, rotation and focus loss. These controls are not implemented; phone layout testing does not prove touch gameplay works.

Use [W3C accessibility principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/) and [WCAG 2.2](https://www.w3.org/TR/WCAG22/) as guidance for keyboard access, focus, labels, contrast and reflow. Check text instructions and results as well as the 3D canvas. Screen-reader access to real-time driving remains an unresolved limitation; no full accessibility or legal-compliance claim is made. Record actual checks in the [experiment log](/planning/experiments).

## 7. Code quality and automation

**Python:** Ruff linting and formatting using a practical PEP 8-aligned configuration. Avoid adding a second formatter for the same code.

**JavaScript:** ESLint for code-quality rules. Add Prettier only if consistent formatting needs separate enforcement.

**Automation:** GitHub Actions should run relevant Python checks, JavaScript checks, and builds. Keep the existing VitePress deployment workflow working. Browser E2E tests can run at integration checkpoints or before merging rather than after every small edit.

**Failure policy:** Fix meaningful linting and test failures before merging. Do not silence errors, disable tests, or change assertions just to obtain a green result.

### Commands and check cadence

| Tool / status | Command and working directory | When to run |
| --- | --- | --- |
| pytest — operational locally and in CI | From `game-app/`: `.venv/bin/python -m pytest -q`; use `-k <case>` for focused checks | Relevant backend edits; full suite before merging backend/integration changes. The [recorded run](/planning/experiments#stage-1-verification) passed 38 tests at Stage 1; the [Stage 3 record](/planning/experiments#stage-3-verification) reports 51. |
| Ruff — proposed | From `game-app/`: `.venv/bin/python -m ruff check highway tests` and `.venv/bin/python -m ruff format --check highway tests` | Python edits and relevant CI; use `ruff format` locally when formatting is needed. |
| ESLint — proposed | From `game-app/frontend/` (configuration still planned): `./node_modules/.bin/eslint .` | JavaScript edits and relevant CI, with generated files excluded by configuration. |
| Vitest — operational locally and in CI | From `game-app/frontend/`: `npm test`; append a test-file filter for focused runs | Gameplay-rule edits; full unit suite before merging relevant changes. |
| Playwright — proposed | From that package: `./node_modules/.bin/playwright test --project=chromium` | Integration checkpoints and before merging journey changes; one or two high-value journeys, including the main workflow for the Integrated Build. |

The frontend package and Vitest tests exist. Ruff, ESLint and Playwright configuration (including a named Chromium project) remain planned; their commands are proposals. The recorded Chrome journey was manual, not a Playwright test. No application tests were rerun for this documentation update. Command references: [Ruff](https://docs.astral.sh/ruff/tutorial/), [ESLint](https://eslint.org/docs/latest/use/command-line-interface), [Vitest](https://vitest.dev/guide/cli.html), [Playwright](https://playwright.dev/docs/test-cli).

Keep local feedback focused; run full unit/integration suites and lint checks in relevant CI before merging, and gate integrated journeys at checkpoints instead of repeating every rule in a browser. Documentation-only edits use the already-operational root command `npm run docs:build` plus link checks. Existing CI also runs pytest, Vitest and the Vite build; see the [GitHub status evidence](/planning/experiments#current-github-status). Lint and browser automation remain planned. Do not rerun unchanged application suites for documentation-only edits.

## 8. Definition of Done and project review

A user story is complete when:

- Its acceptance criteria are satisfied.
- Relevant normal, invalid, and boundary checks pass.
- The behavior has been verified at the appropriate level.
- Code quality checks pass.
- Actual results, limitations and source changes are recorded.

Keep the GitHub issue → decision → change → verification → reviewer-retry process visible.

**Open questions:** Physical controller compatibility, input-pattern experiment results, public backend hosting, visual-performance targets, and stronger score verification.

**Documentation rule:** Update the existing specification, roadmap, decision log and experiment record as implementation progresses. Clearly distinguish proposed work, implemented work, and verified results. Do not duplicate the same report across multiple pages.
