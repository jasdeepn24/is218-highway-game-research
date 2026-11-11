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
