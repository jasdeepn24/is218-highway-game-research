# IS218 Highway Game Research

Research and planning by Jasdeep Nagra for an original 3D browser game inspired by the highway-driving experience of Racing in Car 2021. Three.js is selected with keyboard and Bluetooth Xbox/PlayStation controls on Mac. Vanilla JavaScript + Vite is selected for gameplay. Flask/SQLite supports accounts and private saved runs. Keyboard gameplay and score integration were merged in [PR #4](https://github.com/jasdeepn24/is218-highway-game-research/pull/4); controller support remains planned, with Rapier only a possible later experiment. Soccer and basketball are documented as alternatives considered. Swift and Metal are excluded from the build. **VitePress publishes the research/SPEC; the separate playable application runs locally.**

**Review 2: project plan/SPEC only, November 26, 2026 at 2:30 PM ET. Review 3: Integrated Build, November 30.** Start with the [engineering plan](docs/planning/engineering-plan.md), [main workflow and five stories](docs/planning/specification.md), [roadmap](docs/planning/roadmap.md), and [current implementation evidence](docs/planning/experiments.md#current-github-status).

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
