# IS218 Highway Game Research

Research and planning by Jasdeep Nagra for an original 3D browser game inspired by the highway-driving experience of Racing in Car 2021. Three.js is selected with keyboard and Bluetooth Xbox/PlayStation controls on Mac. Flask/SQLite is planned for accounts and scores; Rapier is the leading physics candidate. Soccer and basketball are documented as alternatives considered. Swift and Metal are excluded from the build. **This repository contains documentation, not a playable game.**

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

The configured path is `/is218-highway-game-research/`. Documentation is in `docs/`; navigation is in `docs/.vitepress/config.mjs`. The build workflow checks documentation and produces a downloadable preview artifact. It does not deploy a public website.

## Research method

Start with `docs/research/overview.md`, compare ideas and technologies, then use the experiment backlog. Every experiment starts as **not run**. Record exact tool/model versions, prompts, human corrections, hardware, failures, and results before claiming success.

The structure is inspired by [Keith Williams's AI Game Lab](https://kaw393939.github.io/is218-individual-game/). Research text is original synthesis with linked primary sources. No game assets or copied implementation from Racing in Car 2021 are included.
