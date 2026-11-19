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

**Approved engineering plan integrated; Stage 1 backend verified locally. The playable game and complete user journey remain unfinished.**

The [approved engineering plan](/planning/engineering-plan) records scope, architecture, testing and quality decisions. The [specification](/planning/specification#five-user-stories) owns the five stories, and the [roadmap](/planning/roadmap#implementation-milestones) records the four stages. See the [verification record](/planning/experiments#stage-1-verification) for the 38 passing backend tests and limits of that evidence. Stage 1 source is recorded in [Stage 1 commit `c9f6f44`](https://github.com/jasdeepn24/is218-highway-game-research/commit/c9f6f441150b3898225129a12622f5a4a2824f1b).

Soccer and basketball remain documented as [alternatives considered](/research/game-ideas). Three.js with vanilla JavaScript and Vite is selected for gameplay; Flask/SQLite handles accounts and saved runs. Basic movement and collisions come first; Rapier is only a possible later experiment. Swift and Metal are excluded.

## First Playable Version

This checklist defines the planned first driving demo, based on the
[specification](/planning/specification#first-version).
This checklist preserves the first-playable clarification from [issue #2](https://github.com/jasdeepn24/is218-highway-game-research/issues/2) and commit `0ac642f`, updated to the approved plan. Driving and controller items remain unimplemented and unverified; linked checks describe future testing.

The [Review 2 milestone](/planning/roadmap#mapping-stages-to-course-reviews) requires signup → login → playable highway run → saved result → logout, including minimum Stage 3 integration. The driving checklist below is one part of that journey, not the entire milestone.

### Initial driving demo

- [ ] One three-lane highway, one drivable car, and a third-person follow camera.
  Check scene performance with [E01](/planning/experiments#e01)
  and steering/camera stability with [E02](/planning/experiments#e02).
- [ ] Keyboard steering, acceleration, braking, pause, and replay.
  Verify a complete run using the
  [keyboard test matrix](/research/controllers#test-matrix-not-run)
  and [gameplay acceptance checks](/planning/specification#five-user-stories).
- [ ] Basic traffic with safe spawning.
  Use [E03](/planning/experiments#e03) to check 100 seeded spawn
  cases for violations of the player's safety zone.
- [ ] Simple driving physics and collision detection.
  Use [E02](/planning/experiments#e02) for frame-rate consistency and the
  [unit testing strategy](/planning/engineering-plan#_6-testing-strategy) for collision boundaries.
  [E09](/planning/experiments#e09) is a possible later Rapier experiment.
- [ ] A run that ends on collision or the 20-second limit, shows a score, and can be replayed.
  Verify the [US2 gameplay checks](/planning/specification#five-user-stories)
  and [G01–G02 acceptance criteria](/planning/specification#eventual-acceptance-criteria),
  including stable score and position while paused.
  Distance-based scoring is the current candidate; permanent score
  storage must be connected to the existing local run API in Stage 3.

### Planned controller requirement

Implement keyboard gameplay first. Controller support remains required, but is not a claim of initial keyboard-slice completion.

- [ ] Bluetooth Xbox and PlayStation controller support on Mac.
  Use [E08](/planning/experiments#e08) to test physical devices,
  mappings, analog inputs, keyboard fallback, focus loss,
  disconnect pause, and reconnects.

### Integration and earlier optional ideas

- Minimum Stage 3 integration connects playable runs to the [local Flask/SQLite backend](/planning/accounts) for Review 2. The full private dashboard/history and account maintenance follow for Review 3.
- Optional additions: a first-person cockpit camera, extra visual
  polish, and a near-miss bonus with rules preventing repeated
  awards for the same encounter, retained from earlier research; these are not additions to the approved five stories.

Controller support remains a planned requirement; real hardware checks are separate from the keyboard driving acceptance checks.
