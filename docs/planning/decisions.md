# Decision log

## D01 · Documentation first

**Accepted · November 11, 2026.** Keep VitePress as the research notebook. The November 11 update added research and plans only; subsequent local Stage 1 implementation is recorded separately.

## D02 · Highway driving selected

**Accepted · November 11, 2026; replaces the provisional genre choice.** The user selected a small, optimized highway game with a third-person follow camera. Racing in Car 2021 serves as visual inspiration. A cockpit view is optional for later. Soccer and basketball remain documented as alternatives considered.

## D03 · Three.js selected

**Accepted · November 11, 2026; replaces the engine-selection gate.** Use Three.js for the browser game. Godot is historical comparison material. Swift and Metal will not be used for the build. This is a project choice, not a measured engine-performance ranking.

## D04 · Flask and SQLite planned

**Accepted direction; local Stage 1 implementation now exists.** Use Flask for accounts, authorization, and score endpoints, with server-side SQLite persistence. Hosting and recovery details remain open.

## D05 · Evidence before claims

**Accepted.** Distinguish documented tool capabilities, design proposals, and measured results. No driving or controller experiment has been run and no commercial-level visual quality is promised. Backend test evidence is recorded separately.

## D06 · Keep the local notebook running

**Accepted.** Maintain the existing VitePress preview and navigation. Publishing is a separate step.

## D07 · Keyboard and controller are required

**Accepted · November 11, 2026.** Support keyboard plus Bluetooth Xbox/PlayStation controllers on Mac through browser input APIs. Exact controller models, macOS versions, browser mappings, and compatibility still require hardware testing.

## D08 · Rapier leads the physics shortlist

**Historical proposal, superseded for the initial slice by D09.** Its vehicle controller is a useful starting point. Compare integration effort and behavior with cannon-es if necessary. Do not install a game engine or implement driving during this research update.


## D09 · Approved agile and engineering plan

**Accepted · November 18, 2026.** Integrate the supplied [engineering plan](/planning/engineering-plan). Use Three.js + vanilla JavaScript + Vite, Flask and SQLite, with the existing VitePress research site on GitHub Pages. Basic movement and collisions are sufficient initially; Rapier is a possible later experiment. The [five stories](/planning/specification#five-user-stories) and [four milestones](/planning/roadmap#implementation-milestones) govern implementation. The complete game initially runs locally; public backend hosting is open.

Keep modules focused, apply SRP, dependency inversion, KISS and DRY, and compare a Strategy-style keyboard/controller input interface with direct conditionals before choosing. No additional design patterns are approved without a specific problem. The plan owns the testing, quality and Definition of Done details.

Local backend evidence does not establish completed gameplay, physical controller compatibility or a finished user journey. Source is recorded in [Stage 1 commit `c9f6f44`](https://github.com/jasdeepn24/is218-highway-game-research/commit/c9f6f441150b3898225129a12622f5a4a2824f1b); see the [verification record](/planning/experiments#stage-1-verification).


## D10 · Minimal same-origin integration and active run time

**Implemented · November 19, 2026, within the approved Stage 3 scope.** Flask serves
the Vite build and authenticated API on one origin. Submit active duration and
`collision`/`finished` alongside the score; accept early collisions, require 20
active seconds for normal completion, cap scores at 40 points per active second,
and compare duration to server wall time with 0.25-second tolerance. Keep the
five-minute ticket lifetime and show explicit expiry/save errors. Reuse run IDs on
save retries and keep existing authentication, CSRF, ownership and atomic completion.
No schema migration or server-side driving simulation. See the [backend timing
record](/planning/accounts#resolved-integration-decision-run-timing) for limitations.
