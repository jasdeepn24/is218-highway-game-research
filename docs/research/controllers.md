# Keyboard and Bluetooth controllers on Mac

**Required for the future game; not implemented or hardware-tested yet.**

## Two separate connections

Pair the controller in macOS Bluetooth settings. The browser then reads exposed axes and buttons through the **Gamepad API**. The game does not need to implement Bluetooth pairing or use Web Bluetooth to read a conventional game controller.

Apple documents support for [Bluetooth-capable Xbox models](https://support.apple.com/en-us/111101) and [PlayStation wireless controllers](https://support.apple.com/en-am/111100). Exact model, firmware, macOS, and browser version still matter. “Connected to Mac” alone does not establish that every input works in Chrome or Safari. Older Xbox controllers without Bluetooth are outside this Bluetooth requirement.

[MDN's Gamepad guide](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API) describes connection events and polling gamepads. Use HTTPS when deployed; localhost is suitable for local development. A controller may only appear after the user presses a button while the page is active. Check actual behavior rather than relying only on a connection event.

## Proposed common action mapping

| Action | Keyboard | Xbox | PlayStation |
| --- | --- | --- | --- |
| Steer | A/D or left/right arrows | Left stick horizontal | Left stick horizontal |
| Accelerate | W or up arrow | RT | R2 |
| Brake | S or down arrow | LT | L2 |
| Pause/resume | Escape | Menu | Options |
| Confirm/restart after run | Enter | A | Cross |

These are our proposed controls, not a guarantee of raw device indexes. Check `Gamepad.mapping`: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/mapping) distinguishes standard mappings from unmapped devices. Use standard mapping only when reported, and provide calibration/remapping or a clear unsupported-layout message otherwise. Do not infer layout solely from a controller name.

## Input behavior to design

Route both devices into the same steer/throttle/brake/pause actions. Apply an adjustable stick dead zone; 0.12 is a starting hypothesis, not a measured ideal. Clamp and normalize values, then tune steering sensitivity. Analog triggers should allow partial throttle and braking. Digital keyboard input needs its own smoothing so it remains usable.

Poll fresh state during the animation loop. Handle button edges so holding Pause does not toggle every frame. On disconnect, lost focus, or hidden tab, clear held input and pause; require an explicit resume. Prevent browser scrolling only while gameplay has focus, and never capture keys in account text fields. Rumble is optional and must not be required for basic play.

## Test matrix: not run

| Device | Chrome on Mac | Safari on Mac | Required observations |
| --- | --- | --- | --- |
| Bluetooth Xbox controller; exact model to record | Not run | Not run | Pairing, detection, stick center, both triggers, buttons |
| Bluetooth PlayStation controller; exact model to record | Not run | Not run | Same checks; verify mapping rather than copying Xbox assumptions |
| Keyboard only | Not run | Not run | Complete run, pause, replay, no trapped focus |

For each controller: test connection before and after page load, two reconnects, tab switching, simultaneous triggers, held buttons, and keyboard fallback. AI can draft the adapter and synthetic input tests, but a physical controller is necessary to establish Bluetooth compatibility and input feel. See E08 in the [backlog](/planning/experiments).
