# Maintain the research site

## Local commands

With Node.js 22 or newer, run these commands from the repository folder:

```sh
npm ci
npm run docs:dev
```

Open the printed Local URL, including `/is218-highway-game-research/`. Once a lockfile has been generated, use `npm ci` for repeat installs.

```sh
npm run docs:build
npm run docs:preview
```

The production build checks VitePress page references and generates the search index. It does not validate the truth of claims or prove every external source is still available.

## Editing

Pages live in `docs/research/` and `docs/planning/`. Add new pages to the sidebar in `docs/.vitepress/config.mjs`. Prefer a few well-supported paragraphs over large unsourced claims. Record a source URL and access date for new research, and state whether a conclusion is documented, inferred, or tested.

VitePress 1.6.4 is pinned as the stable documentation dependency rather than using an alpha release. Review dependency updates separately.

## Verification and workflow

Build after editing links or configuration. Review navigation, search, tables, and narrow-screen layout in a browser. The GitHub workflow uploads a built site artifact for preview; it does not deploy it. The artifact can be served with a local static server under the configured base path.

## Keep evidence honest

Do not mark an experiment complete until its procedure and evidence are recorded. Do not paste account credentials, private user data, or paid proprietary material into this public repository. Keep source attribution alongside technical claims.
