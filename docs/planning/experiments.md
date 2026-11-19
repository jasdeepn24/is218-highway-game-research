# Experiment backlog

**Driving, rendering, controller and pattern experiments remain proposed and not run.** Backend checks are recorded separately below. Documentation setup is not evidence that the game will perform well.

| ID | Question | Controlled test | Acceptance / evidence |
| --- | --- | --- | --- |
| <span id="e01"></span>E01 | Can a simple highway scene run smoothly? | Three.js scene with fixed resolution, traffic count, laptop, and browser; compare quality settings | 60-second capture after warm-up; median/p95 frame time, size, errors; compare with provisional 60 FPS target |
| <span id="e02"></span>E02 | Is steering predictable? | Same inputs over 10 seconds at 30 and 60 FPS conditions | Proposed less than 5% distance difference; no sudden camera jumps; manual feel notes |
| <span id="e03"></span>E03 | Can traffic avoid unfair spawns? | Fixed seed list and 100 spawn cases | No spawn inside player safety zone; record failing seed and spacing |
| E04 | Can AI-assisted assets meet the budget? | One comparable car/interior asset | Record creation, cleanup, license, size, defects, and rendering cost; choose budget after baseline |
| E05 | Which coding workflow helps most? | Same small task and acceptance checks in clean branches | Total time, corrections, failures, exact model/tool, review notes; no winner without comparable trials |
| E06 | Does audio behave in a browser? | Play, mute, pause, resume, replay on Chrome and Safari | No unwanted autoplay, obvious loop seam, or duplicate playing loops |
| E07 | Can private scores remain private? | Two test identities against the local Flask/SQLite backend | Cross-user read/write denied, signed-out requests denied, valid owner access works |
| <span id="e08"></span>E08 | Do both Bluetooth controller families work on Mac? | Physical Xbox and PlayStation devices in Chrome and Safari; record exact versions and models | Verify analog steering/triggers, mapping, keyboard fallback, focus loss, disconnect pause, and two reconnects; mark each combination separately |
| <span id="e09"></span>E09 | Is Rapier handling suitable? | Simple chassis/road, fixed timestep, repeated brake/turn/collision cases | No runaway acceleration or persistent jitter; compare distance across frame rates; log tuning and repair time |

E08 still requires real hardware; software-only tests cannot establish controller support. The [approved milestones](/planning/roadmap#implementation-milestones) set the implementation order. E09 is a possible later physics experiment, not a prerequisite for basic collisions. E07 has related backend test evidence below, but no full browser journey has been verified. No controller-reading widget or playable game has been added.

## E10 · Input-pattern comparison {#e10}

**Planned; not run.** Compare a Strategy-style keyboard/controller input interface against direct conditional handling using the same acceptance checks. Record code complexity, testing effort and actual advantages/disadvantages before choosing. This is the approved pattern experiment; no additional patterns are introduced.

## Stage 1 verification {#stage-1-verification}

**Locally verified · November 18, 2026.** On `codex/review2-first-slice`, initial Git status was `?? game-app/`; tracked documentation was clean. The documentation base revision is `0ac642f`, which does **not** contain Stage 1. The verified source and tests are now recorded in [Stage 1 commit `c9f6f44`](https://github.com/jasdeepn24/is218-highway-game-research/commit/c9f6f441150b3898225129a12622f5a4a2824f1b). Their contents match the locally verified files; the commit adds provenance, not new test results.

Inspected local files: `game-app/highway/__init__.py`, `game-app/highway/db.py`, `game-app/highway/templates/`, `game-app/tests/test_backend.py`, dependency files and `game-app/README.md`.

From `game-app/`, reran the existing suite without bytecode or pytest cache writes:

```sh
PYTHONDONTWRITEBYTECODE=1 .venv/bin/python -m pytest -q -p no:cacheprovider
```

**Observed:** `38 passed in 3.00s` (exit 0). The shell also reported that pyenv could not rehash its non-writable shims directory; this did not prevent the test run. The suite uses synthetic identities and temporary SQLite databases. Persistence is checked by creating a new Flask app/test client against the same test database, not by restarting a live server process.

| Area | Evidence and limits |
| --- | --- |
| Authentication | Tests cover registration and hashing, duplicate/invalid registration, wrong credentials, login and logout, CSRF rotation and protected access. No browser E2E journey was run. |
| Runs and persistence | Tests cover ownership, app recreation with the same database, signed-out rejection, invalid scores, timing, boundaries, duplicate and concurrent completion. Requests simulate runs; no driving occurs. |
| Dashboard | Source has a protected empty state and run list; tests check owner visibility and absence of another user's run. Score totals are absent and US4 is not declared complete. |
| Account maintenance | Display-name/password updates and session invalidation are not implemented. US5 remains planned. |
| Gameplay and integration | No Three.js/Vite game frontend, gameplay unit tests, Playwright journey or hardware controller result exists. The [current API timing gap](/planning/accounts#current-api-and-remaining-integration) remains unresolved. |
| Quality automation | Existing Actions workflow builds/deploys VitePress only. Ruff, ESLint, Vitest, Playwright and game CI are planned; no operational configuration was found. No lint or dependency audit was rerun here. |

This is an independent rerun of the existing backend tests, not an independent security audit or proof that every story is Done. Expectations and coverage still need human review under the approved Definition of Done.

### Local source fingerprints

SHA-256 fingerprints identify the inspected source and tests and match the Stage 1 commit linked above:

```text
ff74589f498364aed45c2be9230033e89f4880f00f340eb4f900c8b8da7c5e32  game-app/highway/__init__.py
3f69f4839e2a3ba43c8c8b97780ab0cb01e263a08a3e207ad96e22271ba1fd63  game-app/highway/db.py
966db856cdcbf127ce33fddcff7bf1b85fe7b2d98ad847eb7667363e3c5c6367  game-app/tests/test_backend.py
```

## Experiment record template

Copy this into a dated Markdown page after selecting a test:

```text
ID and question:
Status: proposed / running / passed / failed / inconclusive
Date and starting commit:
Tool/model/version and exact prompt:
Environment: hardware, OS, browser, engine, resolution
Prediction and acceptance criteria:
Procedure and fixed inputs:
Observed result:
Logs, screenshots, measurements, and result commit:
Human corrections, retries, and total time:
Known limits and next decision:
```

## Rules for interpreting results

Define pass criteria before running. Preserve failures rather than only saving the best output. A working demo on one laptop does not establish browser-wide compatibility. A screenshot cannot validate controls or physics. A generated test suite cannot establish correctness if its expectations simply repeat the same implementation mistake.

## Stage 2 verification

**November 18, 2026 — local standalone keyboard slice.** The existing
`codex/review2-first-slice` branch was fast-forwarded to GitHub `main` at `c438ade`;
the merged Stage 1 and planning files were preserved.

Implemented in `game-app/frontend/`: Three.js geometry, three lanes, third-person
camera, keyboard acceleration/braking/steering, stationary traffic, collision end,
20-second active timer, distance score, pause/focus-loss handling, and replay.
Rules are independent of rendering and input. Controller support remains planned.

- Six Vitest tests passed: movement/scoring, pause, timer/replay, collision/lane
  separation, safe distant spawning, and frame-rate consistency.
- The unchanged backend passed all 38 pytest tests. A diagnostic invocation from
  the repository root initially failed to import `highway`; adding `game-app` to
  the Python import path allowed the full suite to run successfully.
- Vite production build passed. Its Three.js bundle is about 535.58 kB minified /
  133.39 kB gzipped, producing Vite's standard 500 kB chunk warning.
- Local in-app browser: observed acceleration, steering, braking to zero,
  pause/resume, collision with final score, replay reset, and timer completion at
  0.0 seconds. No browser console errors were captured. Narrow-screen header
  overflow was corrected and visually rechecked.
- Added application CI for pytest, Vitest, and the frontend build. It has not run
  on GitHub yet. Existing documentation deployment workflow is unchanged.

This is not the integrated Review 2 journey: no authentication or score API calls
are made by the game. Stage 3 must reconcile early collisions with the backend's
20-second minimum result time and paused runs with ticket expiry. No physical
controller testing, performance benchmark, or anti-cheat claim is made here.
See `game-app/README.md` in the repository for local commands and remaining limits.
