# IS218 Highway Game Research

Research and planning by Jasdeep Nagra for an original 3D browser game inspired by the highway-driving experience of Racing in Car 2021. Three.js is selected with keyboard and Bluetooth Xbox/PlayStation controls on Mac. Vanilla JavaScript + Vite is selected for gameplay. Flask/SQLite accounts and run endpoints are recorded in [Stage 1 commit `c9f6f44`](https://github.com/jasdeepn24/is218-highway-game-research/commit/c9f6f441150b3898225129a12622f5a4a2824f1b); basic movement and collisions are planned, with Rapier only a possible later experiment. Soccer and basketball are documented as alternatives considered. Swift and Metal are excluded from the build. **The VitePress site documents the project; the separate local backend is not yet a playable game.** Start with the [approved engineering plan](docs/planning/engineering-plan.md), [five stories](docs/planning/specification.md), and [Stage 1 verification record](docs/planning/experiments.md#stage-1-verification).

## Preview

Use Node.js 22 or newer:

```sh
npm install
npm run docs:dev
```

Open the Local URL printed by VitePress. After a lockfile exists, use `npm ci` for repeatable installation.

```sh
npm run docs:build
npm run docs:preview
```

The configured path is `/is218-highway-game-research/`. Documentation is in `docs/`; navigation is in `docs/.vitepress/config.mjs`. The workflow builds the documentation and deploys it to [GitHub Pages](https://jasdeepn24.github.io/is218-highway-game-research/).

## Research method

Start with `docs/research/overview.md`, compare ideas and technologies, then use the experiment backlog. Every experiment starts as **not run**. Record exact tool/model versions, prompts, human corrections, hardware, failures, and results before claiming success.

The structure is inspired by [Keith Williams's AI Game Lab](https://kaw393939.github.io/is218-individual-game/). Research text is original synthesis with linked primary sources. No game assets or copied implementation from Racing in Car 2021 are included.
