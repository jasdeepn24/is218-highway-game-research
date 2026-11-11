# Research overview

November 11, 2026 · Direction selected

**Decision:** Three.js browser highway driving, keyboard and Bluetooth Xbox/PlayStation controllers on Mac, followed by Flask/SQLite accounts and scores. Physics-library selection remains open. No Swift or Metal implementation.

The question is whether AI-assisted development can produce an enjoyable, small, optimized 3D highway game with a third-person follow camera that classmates can open in a browser. We also need to find out which parts remain difficult even when AI writes much of the code.

## What realism means here

The initial goal is believable scale, road motion, lighting, a readable vehicle exterior, traffic spacing, and responsive controls. Accurate tire simulation, licensed car models, a full city, and commercial-game visual parity are not established requirements. Visual realism and simulation accuracy are separate decisions.

## Evidence labels

| Label | Meaning |
| --- | --- |
| Documented | A linked primary source describes a capability or restriction. |
| Assessment | Our reasoning about suitability; not a measured result. |
| Proposed | A design or test that has not been approved as final. |
| Tested here | A reproducible project observation with a result and evidence. |

## Research findings

**Documented:** Three.js supplies browser 3D rendering, but is not a complete game engine. Godot can export to the browser with platform restrictions. Swift has a WebAssembly path; that does not turn Metal into a browser API. See the [technology comparison](/research/technologies).

**Assessment:** A constrained highway run is likely easier to scope than a full team-sports simulation. A basketball shooting challenge could be smaller still. The [alternatives page](/research/game-ideas) preserves this comparison; highway driving is now selected.

**Unknown:** Achievable frame rate, loading time, driving feel, asset quality, and total AI-assisted development effort. These need [experiments](/planning/experiments).

## How this notebook is organized

The [professor's AI Game Lab](https://kaw393939.github.io/is218-individual-game/) was reviewed for its research, source library, roadmap, game brief, experiments, and decision-log structure. This notebook adapts that organization with original project-specific content. It does not treat the example website as a complete assignment rubric.
