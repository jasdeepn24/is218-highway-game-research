# What AI can actually do

## Documented capabilities

| Tool | Primary-source capability | What that does not establish |
| --- | --- | --- |
| OpenAI Codex | Coding assistance that can write, review, and help ship code ([OpenAI](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)) | That it will produce a realistic, correct game without review |
| Claude Code | Reads a codebase, edits files, runs commands, and integrates with development tools ([Anthropic](https://code.claude.com/docs/en/overview)) | That its generated physics or visual output is correct |
| GitHub Copilot agents | Agentic coding capabilities with documented limitations and evaluation guidance ([GitHub](https://docs.github.com/en/copilot/responsible-use/agents)) | That a successful code change proves game quality |

Tool availability, model choice, and usage limits need recording at the time of each experiment. This notebook does not rank untested models or promise unlimited work under a subscription.

## Tasks to investigate

**Programming:** Request small features, integration code, debugging, tests, and explanations. Validate the behavior with independently specified acceptance checks.

**3D and graphics:** Request modeling scripts, material setups, optimization suggestions, and asset cleanup. A rendered concept image is not an optimized, textured, game-ready 3D model.

**Physics:** Ask for steering models, collision rules, and frame-rate independence. Check values and outcomes; plausible-looking code can still behave differently at 30 and 60 FPS.

**Audio:** Investigate original sound generation or editing, then inspect licensing, loop seams, volume, and browser playback. No audio-generation service has been selected or tested.

**Traffic:** Ask for lane-following logic and reproducible tests. Runtime traffic AI can be ordinary rules and state machines; it does not require an online language model for each car.

## Fair evaluation

Give each available coding tool the same bounded task and acceptance criteria in a clean branch. Record tool/model, prompt, starting commit, time, retries, usage or cost if available, corrections, and final failures. Use the same assets and target browser. Do not compare one polished result against another tool's first draft.

Measure total effort, including human review and playtesting. Passing tests are necessary for defined behavior but cannot prove driving feel, visual consistency, or maintainability. No productivity percentage has been measured in this project.

Next: [the experiment backlog](/planning/experiments).

## Research for the chosen stack

Use AI assistance to draft Three.js integration and physics tests, inspect car assets, and explain frame-time problems. See the [asset and audio pipeline](/research/assets), [graphics and traffic research](/research/game-systems), and [controller plan](/research/controllers). Controller code needs physical-device checks; asset generation needs visual inspection. The later Flask/SQLite work needs independent authorization tests. None of these game outcomes have been demonstrated yet.
