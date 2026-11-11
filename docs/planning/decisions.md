# Decision log

## D01 · Documentation first

**Accepted · November 11, 2026.** Keep VitePress as the research notebook. This update adds research and plans only.

## D02 · Highway driving selected

**Accepted · November 11, 2026; replaces the provisional genre choice.** The user selected a small, optimized highway game with a third-person follow camera. Racing in Car 2021 serves as visual inspiration. A cockpit view is optional for later. Soccer and basketball remain documented as alternatives considered.

## D03 · Three.js selected

**Accepted · November 11, 2026; replaces the engine-selection gate.** Use Three.js for the browser game. Godot is historical comparison material. Swift and Metal will not be used for the build. This is a project choice, not a measured engine-performance ranking.

## D04 · Flask and SQLite planned

**Accepted direction for later implementation.** Use Flask for accounts, authorization, and score endpoints, with server-side SQLite persistence. Hosting and recovery details remain open.

## D05 · Evidence before claims

**Accepted.** Distinguish documented tool capabilities, design proposals, and measured results. No game experiments have been run and no commercial-level visual quality is promised.

## D06 · Keep the local notebook running

**Accepted.** Maintain the existing VitePress preview and navigation. Publishing is a separate step.

## D07 · Keyboard and controller are required

**Accepted · November 11, 2026.** Support keyboard plus Bluetooth Xbox/PlayStation controllers on Mac through browser input APIs. Exact controller models, macOS versions, browser mappings, and compatibility still require hardware testing.

## D08 · Rapier leads the physics shortlist

**Proposed.** Its vehicle controller is a useful starting point. Compare integration effort and behavior with cannon-es if necessary. Do not install a game engine or implement driving during this research update.
