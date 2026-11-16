---
layout: home
hero:
  name: Highway Game Lab
  text: How far can AI take a browser driving game?
  tagline: IS218 · Jasdeep Nagra. Researching realistic-looking highway driving with Three.js, keyboard and Bluetooth controllers on Mac, and a future Flask/SQLite backend.
  actions:
    - theme: brand
      text: Explore the research
      link: /research/overview
    - theme: alt
      text: Visual references
      link: /research/visual-references
    - theme: alt
      text: See the next steps
      link: /planning/roadmap
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

**Research and planning. No game has been built, and no game experiment has been run.**

**Chosen direction:** a small, optimized Three.js highway game with a third-person camera behind the car. Keyboard and Bluetooth Xbox/PlayStation controller support on Mac are requirements. Flask and SQLite are the planned backend. Rapier is the leading physics candidate, pending a small test. Swift and Metal are not part of the build.

Soccer and basketball remain documented as [alternatives considered](/research/game-ideas).

The eventual product needs real accounts, saved scores, a private dashboard, and account maintenance. Those requirements are recorded in the [draft specification](/planning/specification), not implemented in this documentation site.

## First Playable Version

This checklist defines the planned first driving demo, based on the
[draft specification](/planning/specification#first-version).
All items are unimplemented and unverified; the linked checks describe
future testing, not completed results.

### Initial driving demo

- [ ] One highway, one drivable car, and a third-person follow camera.
  Check scene performance with [E01](/planning/experiments#e01)
  and steering/camera stability with [E02](/planning/experiments#e02).
- [ ] Keyboard steering, acceleration, braking, pause, and replay.
  Verify a complete run using the
  [keyboard test matrix](/research/controllers#test-matrix-not-run)
  and [gameplay acceptance checks](/planning/specification#us2-—-highway-gameplay-with-keyboard-or-controller).
- [ ] Bluetooth Xbox and PlayStation controller support on Mac.
  Use [E08](/planning/experiments#e08) to test physical devices,
  mappings, analog inputs, keyboard fallback, focus loss,
  disconnect pause, and reconnects.
- [ ] Basic traffic with safe spawning.
  Use [E03](/planning/experiments#e03) to check 100 seeded spawn
  cases for violations of the player's safety zone.
- [ ] Simple driving physics and collision detection.
  Use [E09](/planning/experiments#e09) for repeated braking,
  turning, and collision cases, and
  [E02](/planning/experiments#e02) for frame-rate consistency.
  Rapier remains a candidate pending testing.
- [ ] A run that ends with a score and can be replayed.
  Verify the [US2 gameplay checks](/planning/specification#us2-—-highway-gameplay-with-keyboard-or-controller)
  and [G01–G02 acceptance criteria](/planning/specification#eventual-acceptance-criteria),
  including stable score and position while paused.
  Distance-based scoring is the current candidate; permanent score
  storage belongs to the later backend phase.

### Later additions

- Required backend phase: registration, login/logout, permanently
  saved scores, a private dashboard, and account maintenance using
  the [planned Flask/SQLite backend](/planning/accounts).
- Optional additions: a first-person cockpit camera, extra visual
  polish, and a near-miss bonus with rules preventing repeated
  awards for the same encounter, as described in the
  [draft specification](/planning/specification#first-version).

Keyboard and controller support are part of the initial scope.
The later account and score requirements remain part of the overall
project.
