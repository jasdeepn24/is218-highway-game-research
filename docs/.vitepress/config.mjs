import { defineConfig } from 'vitepress'
export default defineConfig({
  title: 'Highway Game Lab',
  description: 'IS218 · Researching an AI-assisted 3D browser game',
  base: '/is218-highway-game-research/',
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Research', link: '/research/overview' },
      { text: 'Planning', link: '/planning/roadmap' },
      { text: 'Experiments', link: '/planning/experiments' },
      { text: 'Sources', link: '/research/sources' }
    ],
    sidebar: [
      { text: 'Research · November 2026', items: [
        { text: 'Start here', link: '/research/overview' },
        { text: 'Alternatives considered', link: '/research/game-ideas' },
        { text: 'Visual reference board', link: '/research/visual-references' },
        { text: 'Keyboard & controllers', link: '/research/controllers' },
        { text: 'Technology comparison', link: '/research/technologies' },
        { text: 'What AI can do', link: '/research/ai-tools' },
        { text: 'Graphics, physics & traffic', link: '/research/game-systems' },
        { text: 'Assets & audio', link: '/research/assets' },
        { text: 'Source library', link: '/research/sources' }
      ]},
      { text: 'Plan the project', items: [
        { text: 'Roadmap', link: '/planning/roadmap' },
        { text: 'Draft specification', link: '/planning/specification' },
        { text: 'Accounts & saved scores', link: '/planning/accounts' },
        { text: 'Experiment backlog', link: '/planning/experiments' },
        { text: 'Decision log', link: '/planning/decisions' }
      ]},
      { text: 'This notebook', items: [{ text: 'Maintain the site', link: '/guide/maintenance' }] }
    ],
    search: { provider: 'local' },
    outline: [2, 3],
    socialLinks: [{ icon: 'github', link: 'https://github.com/jasdeepn24/is218-highway-game-research' }],
    footer: { message: 'IS218 · Jasdeep Nagra · Research and planning only', copyright: 'Research snapshot: November 11, 2026' }
  }
})
