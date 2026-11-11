# Draft game specification

**Direction accepted; detailed specification remains a draft.** Build a small, optimized 3D highway game for browsers using Three.js, with keyboard and Bluetooth Xbox/PlayStation controller support on Mac. Use a suitable physics library, with Rapier the leading candidate. Plan Flask/SQLite for the later backend. Swift and Metal are excluded.

## Intended experience

Start a short highway run, avoid traffic, see your score when the run ends, and replay. In the later Flask/SQLite phase, finish the required accounts, private dashboard, and saved scores before adding optional camera modes or visual polish.

## First version

One highway, one drivable car, basic traffic, simple driving physics, collision detection, scoring, and replay. Use lightweight free or appropriately licensed 3D assets. Support keyboard and Bluetooth controller steering, acceleration, and braking on Mac. The default camera follows behind the car in third person so players can see their vehicle and nearby traffic. A distance-based score is the simplest candidate. A near-miss bonus is optional and needs rules to prevent repeated awards for the same encounter.

Racing in Car 2021 serves as visual inspiration. The first version prioritizes smooth performance and small downloads. A first-person cockpit camera and extra visual polish are optional additions for later.

## Five user stories

These are acceptance checks for future implementation.

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

## Eventual acceptance criteria

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

The [account plan](/planning/accounts) explains the backend boundary. The documentation site itself contains no user system.
