# Selected stack and earlier comparisons

**Selected:** Three.js for browser rendering; Flask/SQLite for the later backend. **Still under evaluation:** physics library. Godot, Swift, and Metal are retained below as research history, not planned implementation routes.

Official capabilities are linked below. Difficulty and suitability are project assessments, not benchmark results.

| Option | What it provides | Browser limitations / missing pieces | Difficulty here | Fit |
| --- | --- | --- | --- | --- |
| Three.js + JavaScript/TypeScript | Scene, camera, rendering, materials, model loading | Not a full game engine; we assemble physics, input, traffic, UI, and persistence | Moderate to high; direct web integration but more systems code | Selected |
| Godot + GDScript | Game editor, scene organization, physics, animation, game tooling | Web export needs WebAssembly and WebGL 2; Compatibility renderer; browser restrictions differ from native | Moderate; learn editor and export workflow | Considered, not selected |
| Swift + WebAssembly | Swift logic compiled for a Wasm runtime; JavaScript interoperability | Needs browser API integration and a rendering approach; native Apple frameworks do not automatically carry over | High for this project | Research comparison |
| Swift + Metal | Native Apple GPU programming and graphics control | Metal is an Apple platform API, not a direct cross-platform browser deployment target | Very high if building game infrastructure ourselves | Poor fit for browser-first delivery |

## Three.js

The [official game tutorial](https://threejs.org/manual/pages/game.html) explicitly distinguishes the library from a full engine. This gives us freedom to integrate normal web account pages, but AI must still help build and connect the game systems. A plausible starting stack is TypeScript, Three.js, and a small collision/physics layer. [Rapier](https://rapier.rs/docs/) is a physics candidate, not yet a selected dependency.

## Godot

The [web export documentation](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html) says Godot 4 web export uses the Compatibility renderer and WebGL 2. C# projects currently cannot export to web. Single-threaded export avoids the cross-origin-isolation requirements of threaded exports, with performance tradeoffs. A native editor demo alone would not validate the browser version. Recheck these restrictions against the exact release before testing.

## Swift and Metal

[Swift's WebAssembly guide](https://www.swift.org/documentation/articles/wasm-getting-started.html) establishes that Swift can target Wasm. Its [browser interoperability documentation](https://docs.swift.org/latest/documentation/wasmguide/) describes JavaScript integration. [Apple's Metal overview](https://developer.apple.com/metal/) describes Apple GPU access. These are different layers: a programming language, a portable execution format, and a native graphics API.

**Assessment:** Choosing Swift for browser logic would add integration work without an obvious advantage for this student project. Metal remains useful background research about native graphics, not the proposed delivery route.

## Physics-library shortlist

| Option | Documented basis | Project tradeoff | Status |
| --- | --- | --- | --- |
| Rapier | JavaScript bindings and a raycast vehicle controller with steering, braking, engine force, and suspension controls | WebAssembly setup and vehicle tuning add work; promising foundation for collisions and handling | Leading candidate |
| cannon-es | JavaScript 3D physics engine with a TypeScript codebase | JavaScript integration is approachable; still requires handling setup and measurement | Alternative |

Sources: [Rapier vehicle API](https://rapier.rs/javascript3d/classes/DynamicRayCastVehicleController.html), [cannon-es repository](https://github.com/pmndrs/cannon-es). These document features, not a performance ranking.

**Assessment:** Start by testing Rapier with a simple chassis and road. Measure stability, frame-rate independence, collision behavior, and tuning effort. Choose it only if those results are acceptable. Realistic-looking graphics do not require a full motorsport simulator. See [system research](/research/game-systems) and [experiments](/planning/experiments).
