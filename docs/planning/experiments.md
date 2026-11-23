# Experiment backlog

**The experiment matrix remains a plan unless evidence is explicitly recorded below.** Stages 2–3 include gameplay tests and a manual browser journey; these do not complete the proposed performance, hardware-controller or pattern experiments.

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

E08 still requires real hardware; software-only tests cannot establish controller support. The [approved milestones](/planning/roadmap#implementation-milestones) set the implementation order. E09 is a possible later physics experiment, not a prerequisite for basic collisions. E07 has related backend ownership-test evidence below, and Stage 3 records a manual browser journey. A keyboard game exists; controller support remains planned.

## E10 · Input-pattern comparison {#e10}

**Planned; not run.** Compare a Strategy-style keyboard/controller input interface against direct conditional handling using the same acceptance checks. Record code complexity, testing effort and actual advantages/disadvantages before choosing. This is the approved pattern experiment; no additional patterns are introduced.

## Current GitHub status

**Checked November 23, 2026.** [PR #4](https://github.com/jasdeepn24/is218-highway-game-research/pull/4) merged gameplay and score integration on November 19 at commit [`083fb3b`](https://github.com/jasdeepn24/is218-highway-game-research/commit/083fb3b45c0b62054029626fe67983a0f535ca4b). The [application workflow](https://github.com/jasdeepn24/is218-highway-game-research/actions/runs/44572370275) and [documentation deployment](https://github.com/jasdeepn24/is218-highway-game-research/actions/runs/44572370880) succeeded on that commit. Application CI covers pytest, Vitest and the Vite build; Ruff, ESLint and Playwright remain planned.

The dated records below retain the actual local results. Their original “Review 2 integration” label preceded the course clarification: Review 2 now requires the SPEC only. No application tests, accessibility checks, phone tests or controller tests were rerun for this documentation update. Accessibility/phone plans are in the [engineering plan](/planning/engineering-plan#accessibility-and-phone-testing-plan); new peer SPEC feedback is [pending](/planning/roadmap#review-2-peer-spec-feedback-and-revisions).

## Stage 1 verification {#stage-1-verification}

This is a historical Stage 1 snapshot; later stages and the current GitHub status above supersede its implementation gaps.

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
| Gameplay and integration | No Three.js/Vite game frontend, gameplay unit tests, Playwright journey or hardware controller result exists. The API timing gap was unresolved at Stage 1; see the later [timing resolution](/planning/accounts#resolved-integration-decision-run-timing). |
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
- Added application CI for pytest, Vitest, and the frontend build. At this Stage 2 checkpoint it had not run
  on GitHub; the current status above records the later successful run. Existing documentation deployment workflow is unchanged.

At this Stage 2 checkpoint, the standalone game had no authentication or score API calls. Stage 3 subsequently reconciled early collisions with the backend's
20-second minimum result time and paused runs with ticket expiry. No physical
controller testing, performance benchmark, or anti-cheat claim is made here.
See `game-app/README.md` in the repository for local commands and remaining limits.

## Stage 3 verification

**November 19, 2026 — minimum gameplay integration, locally verified and subsequently merged in PR #4.**
Flask serves the Vite build at `/play/` with the existing login session and CSRF
protection. The game obtains a server-owned ticket, submits the actual local run
result, and confirms the stored score. Results remain private and persistent.

The [timing decision](/planning/accounts#resolved-integration-decision-run-timing)
permits early collisions using active duration, retains the five-minute ticket
lifetime, and limits score to 40 points per active second. No schema migration,
controller work, graphics changes, or full account maintenance was added.

### Automated checks actually run

- Backend: **51 pytest cases passed**. The original 38 cases remain; their submission
  helper, concurrent payload and upper score-boundary expectations were adapted to
  the new contract. Thirteen added cases cover early collision persistence, paused
  results, malformed/nonfinite/oversized durations, implausible scores, timing,
  fresh replay tickets, and protected build routes. Existing tests also verify
  persistence by recreating the app against the same database (not a live server restart), CSRF, cross-user ownership, and concurrent duplicates.
- Frontend: **9 Vitest cases passed**: the original six gameplay tests plus three
  API integration tests for duplicate recovery, account switching, and rejected saves.
- Vite production build passed; existing chunk-size warning remains (about 537 kB
  minified / 134 kB gzipped). No new runtime dependency was added.

### Real Chromium journey

Used Google Chrome with an isolated temporary SQLite database and test account.
Registered, signed in, opened the actual rendered 3D game, paused/resumed, then
collided with traffic at approximately 10.2 active seconds. The game confirmed
**Saved to your account. Score: 91**. Replayed, drove and braked, then reached the
20-second finish; the game confirmed a second saved score of **10**. Both appeared
in My results. Signed out; direct dashboard access redirected to sign-in. Signed
back in and observed both original run IDs and scores still present. No console
errors were captured in the verification tab.

### Remaining limits

Active duration and collision reason are client claims; plausibility checks cannot
prove honest driving. Pauses beyond five wall-clock minutes expire the ticket;
errors are explicit and unsaved results remain only in the open tab. Starting a
new run abandons the owner's unfinished ticket, including one in another tab.
Hardware controllers, full Review 3 dashboard/account maintenance and production
hosting remain future work. Stage 3 is now committed and merged, with successful
GitHub Actions evidence linked in the current status above.

See `game-app/README.md` for exact install/build/run commands and the manual journey.
