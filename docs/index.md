---
layout: home
hero:
  name: Highway Game Lab
  text: How far can AI take a browser driving game?
  tagline: IS218 · Jasdeep Nagra. Researching realistic-looking highway driving with Three.js, keyboard and Bluetooth controllers on Mac, and a local Flask/SQLite backend in progress.
  actions:
    - theme: brand
      text: Explore the research
      link: /research/overview
    - theme: alt
      text: Visual references
      link: /research/visual-references
    - theme: alt
      text: Approved engineering plan
      link: /planning/engineering-plan
features:
  - title: The driving experience
    details: Third-person driving, road environments, basic traffic, and sourced visual references.
    link: /research/visual-references
  - title: Keyboard and controller
    details: Gamepad API research, Mac Bluetooth pairing, mappings, dead zones, and disconnect handling.
    link: /research/controllers
  - title: Measure AI assistance
    details: Separate documented features from project results. Track failures, fixes, and human review.
    link: /planning/experiments
---

## Current checkpoint

**Review 2 is the project plan/SPEC, due November 26, 2026 at 2:30 PM ET. Review 3 Integrated Build is November 30.**

The [engineering plan](/planning/engineering-plan) records the design and testing plans; the [specification](/planning/specification#main-workflow) defines register → sign in → play a 20-second highway game → save score → view private results, with five preserved user stories. The [roadmap](/planning/roadmap#mapping-stages-to-course-reviews) reflects Professor Williams's clarification.

Keyboard gameplay and saved private results are implemented, with a recorded local Chrome journey and successful application CI. See the [current GitHub evidence](/planning/experiments#current-github-status). Dashboard totals, account maintenance, controller support, mobile touch controls and full accessibility checks remain planned.

Soccer and basketball remain documented as [alternatives considered](/research/game-ideas). Three.js with vanilla JavaScript and Vite is selected for gameplay; Flask/SQLite handles accounts and saved runs. Basic movement and collisions come first; Rapier is only a possible later experiment. Swift and Metal are excluded.

## First Playable Version

This checklist records the first driving demo, based on the
[specification](/planning/specification#first-version).
This checklist preserves the first-playable clarification from [issue #2](https://github.com/jasdeepn24/is218-highway-game-research/issues/2) and commit `0ac642f`, updated to the approved plan. The keyboard features below have Stage 2–3 evidence. Linked experiment plans remain separate checks, not completed benchmarks.

The [Review 2 milestone](/planning/roadmap#mapping-stages-to-course-reviews) requires the SPEC only. Existing implementation supports the plan; it does not change that deliverable.

### Initial driving demo

- [x] One three-lane highway, one drivable car, and a third-person follow camera.
  Check scene performance with [E01](/planning/experiments#e01)
  and steering/camera stability with [E02](/planning/experiments#e02).
- [x] Keyboard steering, acceleration, braking, pause, and replay.
  Verify a complete run using the
  [keyboard test matrix](/research/controllers#test-matrix-not-run)
  and [gameplay acceptance checks](/planning/specification#five-user-stories).
- [x] Basic traffic with safe spawning.
  Use [E03](/planning/experiments#e03) to check 100 seeded spawn
  cases for violations of the player's safety zone.
- [x] Simple driving physics and collision detection.
  Use [E02](/planning/experiments#e02) for frame-rate consistency and the
  [unit testing strategy](/planning/engineering-plan#_6-testing-strategy) for collision boundaries.
  [E09](/planning/experiments#e09) is a possible later Rapier experiment.
- [x] A run that ends on collision or the 20-second limit, shows a score, and can be replayed.
  Verify the [US2 gameplay checks](/planning/specification#five-user-stories)
  and [G01–G02 acceptance criteria](/planning/specification#eventual-acceptance-criteria),
  including stable score and position while paused.
  Distance-based scoring and saving through the local run API are implemented; see the
  [Stage 3 evidence](/planning/experiments#stage-3-verification).

### Planned controller requirement

Implement keyboard gameplay first. Controller support remains required, but is not a claim of initial keyboard-slice completion.

- [ ] Bluetooth Xbox and PlayStation controller support on Mac.
  Use [E08](/planning/experiments#e08) to test physical devices,
  mappings, analog inputs, keyboard fallback, focus loss,
  disconnect pause, and reconnects.

### Integration and earlier optional ideas

- Minimum Stage 3 integration connects playable runs to the [local Flask/SQLite backend](/planning/accounts), including private saved results. Dashboard totals and account maintenance remain planned for later build work.
- Optional additions: a first-person cockpit camera, extra visual
  polish, and a near-miss bonus with rules preventing repeated
  awards for the same encounter, retained from earlier research; these are not additions to the approved five stories.

Controller support remains a planned requirement; real hardware checks are separate from the keyboard driving acceptance checks.
