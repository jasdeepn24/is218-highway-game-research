# Experiment backlog

**All game experiments are proposed and not run.** Documentation setup is not evidence that the game will perform well.

| ID | Question | Controlled test | Acceptance / evidence |
| --- | --- | --- | --- |
| E01 | Can a simple highway scene run smoothly? | Three.js scene with fixed resolution, traffic count, laptop, and browser; compare quality settings | 60-second capture after warm-up; median/p95 frame time, size, errors; compare with provisional 60 FPS target |
| E02 | Is steering predictable? | Same inputs over 10 seconds at 30 and 60 FPS conditions | Proposed less than 5% distance difference; no sudden camera jumps; manual feel notes |
| E03 | Can traffic avoid unfair spawns? | Fixed seed list and 100 spawn cases | No spawn inside player safety zone; record failing seed and spacing |
| E04 | Can AI-assisted assets meet the budget? | One comparable car/interior asset | Record creation, cleanup, license, size, defects, and rendering cost; choose budget after baseline |
| E05 | Which coding workflow helps most? | Same small task and acceptance checks in clean branches | Total time, corrections, failures, exact model/tool, review notes; no winner without comparable trials |
| E06 | Does audio behave in a browser? | Play, mute, pause, resume, replay on Chrome and Safari | No unwanted autoplay, obvious loop seam, or duplicate playing loops |
| E07 | Can private scores remain private? | Two test identities against the planned Flask/SQLite backend | Cross-user read/write denied, signed-out requests denied, valid owner access works |
| E08 | Do both Bluetooth controller families work on Mac? | Physical Xbox and PlayStation devices in Chrome and Safari; record exact versions and models | Verify analog steering/triggers, mapping, keyboard fallback, focus loss, disconnect pause, and two reconnects; mark each combination separately |
| E09 | Is Rapier handling suitable? | Simple chassis/road, fixed timestep, repeated brake/turn/collision cases | No runaway acceleration or persistent jitter; compare distance across frame rates; log tuning and repair time |

E08 is the next recommended technical check because a software-only test cannot establish physical controller support. These are test plans; no controller-reading widget or game prototype has been added.

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
