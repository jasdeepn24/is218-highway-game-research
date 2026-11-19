# Game specification

**Approved · November 2026.** The [engineering plan](/planning/engineering-plan) defines the goal, audience assumption, scope, stack, architecture, testing strategy and Definition of Done. This page owns the five user stories and acceptance criteria.

## First version

See the approved [first driving slice and project boundaries](/planning/engineering-plan#_1-project-goal-and-scope). Controller support remains required and separately subject to real-hardware testing. The keyboard game and minimum account-to-saved-run journey are now verified locally; see the [Stage 3 results](/planning/experiments#stage-3-verification). This does not complete future controller, full dashboard, or account-maintenance requirements.

## Five user stories

| ID / Priority | User story | Acceptance criteria |
|---|---|---|
| US1 — High | As a player, I want to register, sign in, and sign out so I can use my own account. | Valid registration/login succeeds; duplicate accounts and incorrect passwords fail; logout removes protected access. |
| US2 — High | As a player, I want to drive and avoid traffic so I can complete a scored run. | Keyboard controls operate the car; collision or the 20-second limit ends the run; pause stops progress; results and replay work. Controller checks remain separate until tested. |
| US3 — High | As a player, I want to save my completed runs so I can return to them later. | A valid result belongs to the signed-in user, survives server restart, and cannot be duplicated by retrying the same submission. Invalid or unauthorized requests fail. |
| US4 — Medium | As a player, I want a private dashboard so I can review my scores. | An empty account shows an empty state; saved scores and totals appear correctly; other users cannot access my results. |
| US5 — Medium | As a player, I want to update my display name and password. | Valid updates work; incorrect current passwords are rejected; password changes invalidate old credentials and sessions according to the documented flow. |

These criteria define required behavior, not completed results. For US5, the password-change/session-invalidation flow must still be documented and implemented.

## Earlier detailed checks

The following Review 1 wording and US1–US5 heading anchors are retained for reference and existing links. The approved table above governs scope and acceptance; these examples are not additional stories or completion claims. US2’s controller checks remain planned hardware checks after the keyboard-first implementation. US4 and US5 describe Review 3 work; Review 2 needs the [minimum integrated journey](/planning/roadmap#mapping-stages-to-course-reviews).

### US1 — Account registration, login, and logout

As a new player, I want to register, log in, and log out so I can use my own account.

- **Positive check:** Register with valid details, log in with the new credentials, and log out. The account is accessible after login and the session ends after logout.
- **Negative check:** Try to log in with an incorrect password. The attempt is rejected and no signed-in session is created.

### US2 — Highway gameplay with keyboard or controller

As a player on Mac, I want to steer, accelerate, and brake with either a keyboard or a Bluetooth controller so I can play using my preferred controls.

- **Positive check:** Complete a scored run and replay it using the keyboard, then repeat with a supported Bluetooth controller. Both inputs can steer, accelerate, and brake.
- **Negative check:** Disconnect the controller while accelerating. The held input clears, the game pauses, and the player can explicitly resume with the keyboard.

### US3 — Permanently saved scores

As a signed-in player, I want my completed runs saved so I can see my scores when I return.

- **Positive check:** Finish a run, restart the app server using the same SQLite database, then sign in from a fresh browser session. The same score is present for the account.
- **Negative check:** Submit an invalid score. The server rejects it and the saved score history is unchanged.

### US4 — Private score dashboard

As a signed-in player, I want a private dashboard so I can review my own scores.

- **Positive check:** Sign in as a player with saved runs and open the dashboard. It shows that player's scores.
- **Negative check:** Try to access the dashboard while signed out, then sign in as a different player and request the first player's scores. Both attempts are denied without exposing those scores.

### US5 — Account maintenance

As a signed-in player, I want to change my display name and password so I can maintain my account.

- **Positive check:** Update the display name and change the password using the correct current password. After logging out, sign in with the new password and confirm the new name appears.
- **Negative check:** Attempt a password change using an incorrect current password. The request is rejected and the current password still works.

## Earlier research criteria

The following Review 1 checklist is retained as research history. The approved stories above and engineering plan govern current scope. Earlier mentions of recovery, account deletion, mute, optional camera modes and visual polish do not add requirements to the five approved stories. Controller edge cases remain useful hardware test evidence.

### Eventual acceptance criteria {#eventual-acceptance-criteria}

| ID | Requirement | Evidence needed later |
| --- | --- | --- |
| G01 | User can complete or fail a run and replay | Browser test plus manual playtest |
| G02 | Pause stops gameplay progression | Score and position remain stable while paused |
| G03 | Driving uses elapsed time consistently | Compare equivalent input across frame-rate conditions |
| G04 | The third-person camera follows behind the car | Verify the player car and nearby traffic stay visible during normal steering |
| I01 | Bluetooth Xbox and PlayStation controls work on the target Mac | Record each physical device, browser, mappings, analog triggers, dead zone, and disconnect/reconnect results |
| I02 | Keyboard remains a complete alternative | Start, drive, pause, and replay without a controller |
| A01 | Real registration, sign-in, sign-out | Valid and invalid authentication flow tests |
| A02 | Scores persist across sessions | Finish a run, sign out/in, retrieve same record |
| A03 | Dashboard is private | Signed-out access denied; user B cannot access user A's data |
| A04 | Account maintenance | Display-name update, authenticated password change, recovery approach, account deletion flow |
| S01 | Server validates submitted results | Reject malformed, duplicated, or implausible runs; document remaining cheat limits |
| U01 | Controls, error states, and mute are clear | Keyboard review and peer feedback |

## Quality targets to validate

Proposed: responsive desktop layout, 60 FPS target with 30 FPS fallback, and a useful load indicator. Select a load-time and download-size budget after measuring the first scene. Do not treat targets as completed tests.

The [backend record](/planning/accounts) distinguishes local implementation from remaining integration work.
