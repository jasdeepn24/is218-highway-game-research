# Research roadmap

## Review 1 historical checkpoint

**IS218 Creative Project Review 1 was due November 12, 2026 at 2:30 PM Eastern.** The statuses below preserve the recorded checkpoint; pending items have not been independently rechecked in this documentation update.

## Review 1 rubric

| Criterion | Points |
| --- | ---: |
| Complete | 25 |
| Thoughtful | 25 |
| Checked | 25 |
| Understood | 25 |

## Review 1 checklist

| Step | Status | Evidence |
| --- | --- | --- |
| Create the VitePress site and preview it locally | Verified | The site loaded in the local browser preview. |
| Document the game concept, Three.js choice, and initial specification | Verified | See the [research overview](/research/overview), [decision log](/planning/decisions), and [game specification](/planning/specification). |
| Finish the five user stories | Documented | At Review 1, five labeled stories had positive and negative checks. The [specification](/planning/specification#five-user-stories) now records the approved acceptance criteria. |
| Push the site to GitHub | Verified | The documentation is in the [GitHub repository](https://github.com/jasdeepn24/is218-highway-game-research). |
| Publish with GitHub Pages | Verified | The [successful Actions run](https://github.com/jasdeepn24/is218-highway-game-research/actions/runs/43098761164) deployed the [research site](https://jasdeepn24.github.io/is218-highway-game-research/). |
| Verify the public site | Pending | Open the public URL and check the homepage, navigation, roadmap, and five user stories. |
| Get real peer feedback and record it in a GitHub issue | Pending | Ask a peer to review the public site and record their actual feedback and the page it concerns in an issue. |

See also the [career research site](https://jasdeepn24.github.io/is218-career-portfolio-research/).

## Current peer-review update

[Issue #2](https://github.com/jasdeepn24/is218-highway-game-research/issues/2), submitted by `dlg309`, requested a clearer first-playable checklist and links to experiment checks. It is closed as completed. [Commit `0ac642f`](https://github.com/jasdeepn24/is218-highway-game-research/commit/0ac642f0f1deaa0af8911d8f332b319fb6b4b71a) added the clarification; the [author’s follow-up](https://github.com/jasdeepn24/is218-highway-game-research/issues/2#issuecomment-6906149105) reports checking the published homepage, build and deployment. No reviewer retry is recorded in the issue comments. The Review 1 table above remains the original checkpoint, not the current issue status.

## Implementation milestones

| Milestone | Main tasks and dependencies | Evidence |
|---|---|---|
| Stage 1 — Backend | Registration, authentication, database, run validation and security tests | Actual pytest results and source revision |
| Stage 2 — Gameplay | Three.js scene, input, simulation, traffic, collision, scoring and replay | Gameplay tests and browser demonstration |
| Stage 3 — Integration | Connect gameplay to authenticated run API and persistence; implement private history and account maintenance | End-to-end journey and ownership tests |
| Stage 4 — Review and handoff | Peer feedback, fixes, regression tests, setup instructions, CI, final documentation | Issue, change, retest and passing checks |

### Mapping stages to course reviews

Per the posted Review 2 requirement supplied for this update, the first working slice must demonstrate **signup → login → playable highway run → saved result → logout**. Backend tests or a standalone driving demo do not complete Review 2. Stages 1 and 2 plus the minimum Stage 3 integration needed to persist a real run belong to Review 2; a saved-result confirmation is sufficient for this slice, without the full private dashboard. **Review 3** completes the full private dashboard/history and account maintenance in Stage 3, followed by Stage 4 review and handoff. These course checkpoints do not replace the four development stages.

Introduce relevant fast lint/test CI checks alongside Stages 1–3 as tools become configured; Stage 4 consolidates regression evidence and handoff rather than postponing all CI until then. Keyboard gameplay comes first; Xbox/PlayStation controller support remains planned and requires physical testing.

**Responsibilities:** I define requirements, choose the design, review AI-generated code, verify the application, and maintain the project record. Codex assists with implementation and tests. A real classmate provides independent feedback. AI does not replace the reviewer.

These are approved milestones, not completion claims. Stage 1 has a local implementation and a verified backend test run, with source recorded in [Stage 1 commit `c9f6f44`](https://github.com/jasdeepn24/is218-highway-game-research/commit/c9f6f441150b3898225129a12622f5a4a2824f1b). See the [verification record](/planning/experiments#stage-1-verification). Stages 2–4 remain planned; earlier backend dashboard work does not complete the integrated user journey. Hardware controller checks and the input-pattern experiment remain open.

## Open details

Exact Xbox and PlayStation controller models for hardware testing are still unknown. Any additional submission instructions beyond the details recorded here still need to be checked against the course assignment.
