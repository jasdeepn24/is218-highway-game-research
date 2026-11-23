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

Professor Williams's clarification, supplied by the project owner on November 23, supersedes the earlier working-application requirement for Review 2.

| Checkpoint | Due | Deliverable |
| --- | --- | --- |
| Review 2 — Project plan/SPEC | November 26, 2026, 2:30 PM ET | Main workflow, five stories/criteria, technology rationale, data flow, testing/accessibility/mobile plan, privacy/cookies, usage measure and roadmap. A finished application is not required. |
| Review 3 — Integrated Build | November 30, 2026 | Demonstrate the connected register → sign in → play → save → private-results workflow and record actual verification and remaining gaps. |

Stages 1–3 are the development sequence supporting the Integrated Build, not Review 2 prerequisites. Keyboard gameplay and minimum integration already have evidence. Dashboard totals, account maintenance, controller support and mobile controls remain build-backlog work, not completed features. These course checkpoints do not replace the four development stages; no Review 3 submission time has been supplied.

Introduce relevant fast lint/test CI checks alongside Stages 1–3 as tools become configured; Stage 4 consolidates regression evidence and handoff rather than postponing all CI until then. Keyboard gameplay comes first; Xbox/PlayStation controller support remains planned and requires physical testing.

**Responsibilities:** I define requirements, choose the design, review AI-generated code, verify the application, and maintain the project record. Codex assists with implementation and tests. A real classmate provides independent feedback. AI does not replace the reviewer.

These are approved milestones, not completion claims. Stage 1 has a local implementation and a verified backend test run, with source recorded in [Stage 1 commit `c9f6f44`](https://github.com/jasdeepn24/is218-highway-game-research/commit/c9f6f441150b3898225129a12622f5a4a2824f1b). See the [verification record](/planning/experiments#stage-1-verification). Stage 2 and minimum gameplay integration have local verification and were merged in PR #4; see the [Stage 3 record](/planning/experiments#stage-3-verification) and [GitHub status](/planning/experiments#current-github-status). Full Review 3 dashboard/account maintenance and Stage 4 remain unfinished. Hardware controller checks and the input-pattern experiment remain open.

## Open details

Exact Xbox and PlayStation controller models for hardware testing are still unknown. Any additional submission instructions beyond the details recorded here still need to be checked against the course assignment.

## Review 2 peer SPEC feedback and revisions

**Pending: no Review 2 SPEC feedback has been received or recorded.** The earlier issue #2 above is historical feedback, not a new Review 2 review.

Ask a classmate whether the main workflow, scope, technology choices and acceptance criteria are understandable. After actual feedback arrives, record:

| Date / reviewer / issue link | Actual feedback and affected section | Revision or reason for no change | Recheck / reviewer follow-up |
| --- | --- | --- | --- |
| Pending | Awaiting real SPEC feedback | No feedback-driven revision yet | Not performed |

The November 23 documentation revision reflects Professor Williams's checkpoint clarification and the owner's approved changes; it is not peer-testing evidence.
