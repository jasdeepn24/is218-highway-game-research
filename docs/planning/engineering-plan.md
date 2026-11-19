# Highway Game Lab — Agile and Engineering Plan
**IS218 Creative Project | November 2026 · Approved plan**

Approved decisions and planned requirements are recorded here; implementation evidence lives in the [experiment record](/planning/experiments#stage-1-verification). Stories and milestones are maintained on their existing pages to avoid duplicate reports.

## 1. Project goal and scope

**Goal:** Create a small 3D highway driving game for browsers where users can register, drive, earn scores, review their results, and manage their accounts.

**Target audience:** Students and casual players interested in short driving games. This is an initial design assumption, not a verified user-research result.

**Working promise:** A player can register, sign in, complete a highway run, save the result, view private history, update their account, and sign out.

**First driving slice:** One three-lane highway, a third-person camera, a controllable car, basic traffic or obstacles, collisions, scoring, and a 20-second run with replay. Implement keyboard gameplay first; Xbox/PlayStation controller support remains a planned requirement with separate physical testing.

**Project boundaries:** No multiplayer, public leaderboard, payments, complex physics, or detailed vehicle customization in the initial version. Bluetooth Xbox/PlayStation controller support remains a planned requirement and must be tested on real hardware before claiming completion.

## 2. Agile stories and acceptance criteria

The [specification](/planning/specification#five-user-stories) is the canonical record of the five approved stories, priorities and acceptance criteria. See the [Stage 1 verification record](/planning/experiments#stage-1-verification) for locally checked results and remaining gaps; no story is declared Done by this plan.

## 3. Prioritized backlog and milestones

The [roadmap](/planning/roadmap#implementation-milestones) records the four approved stages, dependencies, evidence and responsibilities alongside the preserved Review 1 record. Its [course-review mapping](/planning/roadmap#mapping-stages-to-course-reviews) requires the integrated signup → login → playable highway run → saved result → logout slice for Review 2; the full private dashboard and account maintenance belong to Review 3.

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

**Alternatives and tradeoffs:** Godot or Unity would require changing the existing browser-oriented approach. React/Next.js would add framework complexity. Rapier is a possible later physics experiment, but basic movement and collisions are sufficient initially. A hosted database is unnecessary for the local demonstration.

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
| End-to-end | Signup → login → playable run → saved result → logout; returning user or unauthorized-access scenario | Playwright, Chromium |
| Manual | Visual driving behavior, controls, readability, real controller compatibility | Local browser and actual hardware |

**Efficiency:** Run focused fast tests during development. Run the complete unit/integration suite before merging. Use one or two high-value E2E journeys rather than repeating every individual rule in a browser.

Use synthetic accounts and isolated test databases. Record expected results independently of implementation. Test failure and boundary cases, not just successful behavior.

## 7. Code quality and automation

**Python:** Ruff linting and formatting using a practical PEP 8-aligned configuration. Avoid adding a second formatter for the same code.

**JavaScript:** ESLint for code-quality rules. Add Prettier only if consistent formatting needs separate enforcement.

**Automation:** GitHub Actions should run relevant Python checks, JavaScript checks, and builds. Keep the existing VitePress deployment workflow working. Browser E2E tests can run at integration checkpoints or before merging rather than after every small edit.

**Failure policy:** Fix meaningful linting and test failures before merging. Do not silence errors, disable tests, or change assertions just to obtain a green result.

### Commands and check cadence

| Tool / status | Command and working directory | When to run |
| --- | --- | --- |
| pytest — operational locally | From `game-app/`: `.venv/bin/python -m pytest -q`; use `-k <case>` for focused checks | Relevant backend edits; full suite before merging backend/integration changes. The [recorded run](/planning/experiments#stage-1-verification) passed 38 tests. |
| Ruff — proposed | From `game-app/`: `.venv/bin/python -m ruff check highway tests` and `.venv/bin/python -m ruff format --check highway tests` | Python edits and relevant CI; use `ruff format` locally when formatting is needed. |
| ESLint — proposed | From the future frontend package directory: `./node_modules/.bin/eslint .` | JavaScript edits and relevant CI, with generated files excluded by configuration. |
| Vitest — proposed | From that package: `./node_modules/.bin/vitest run`; append a test-file filter for focused runs | Gameplay-rule edits; full unit suite before merging relevant changes. |
| Playwright — proposed | From that package: `./node_modules/.bin/playwright test --project=chromium` | Integration checkpoints and before merging journey changes; one or two high-value journeys, including the Review 2 flow. |

Ruff and the JavaScript tools still need dependencies/configuration; the frontend package, tests and named Chromium project are planned. These commands are proposals, not checks run here, and are not installation instructions. Command references: [Ruff](https://docs.astral.sh/ruff/tutorial/), [ESLint](https://eslint.org/docs/latest/use/command-line-interface), [Vitest](https://vitest.dev/guide/cli.html), [Playwright](https://playwright.dev/docs/test-cli).

Keep local feedback focused; run full unit/integration suites and lint checks in relevant CI before merging, and gate integrated journeys at checkpoints instead of repeating every rule in a browser. Documentation-only edits use the already-operational root command `npm run docs:build` plus link checks. Existing CI deploys VitePress only; add application checks during the relevant development stages, not only at handoff. Do not rerun unchanged application suites for documentation-only edits.

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
