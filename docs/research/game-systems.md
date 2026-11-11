# Graphics, physics, and traffic

**Research and proposed design only.** Three.js is selected. No game systems have been implemented.

## Realistic-looking graphics

The goal is believable materials, lighting, vehicle scale, road motion, and camera position. The official [Three.js car-material demo](https://threejs.org/examples/webgl_materials_car.html) is a useful browser-rendering reference; it does not prove that a complete highway scene will run at the same quality or speed.

Investigate physically based materials, environment lighting, restrained shadows, fog for distance, and consistent exposure. AI can draft material configurations and diagnose rendering errors. Human review should check overly shiny asphalt, glass that hides the road, inconsistent shadows, and missing surfaces. Compare screenshots from the actual renderer, not only generated concept art.

## Highway environments

Use reusable road sections with lane markings, shoulders, barriers, and occasional roadside props. AI can draft procedural geometry or Blender scripts, placement rules, and seed-based scenery layouts. Inspect seams, scale, repetition, and objects appearing inside lanes.

[Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html) supports repeated geometry/material combinations with different transforms to reduce draw calls. **Proposal:** use instancing for compatible barriers and posts, pool road sections and traffic, and limit distant detail. Instancing does not remove texture-memory costs or make every vehicle material combination free.

## Vehicle physics

Rapier is the leading candidate. Its [raycast vehicle API](https://rapier.rs/javascript3d/classes/DynamicRayCastVehicleController.html) exposes wheel suspension, steering, engine-force, and brake controls. AI can help connect chassis transforms to visuals, configure simplified colliders, and create repeatable handling tests. It cannot establish realism just by choosing plausible values.

**Proposal:** begin with forgiving arcade handling, simplified collisions, and a fixed simulation timestep with interpolated visuals. Tune acceleration, braking, steering at speed, center of mass, and suspension. Check instability after a frame hitch and collision tunneling at high speeds. Detailed tire and damage simulation are outside the initial scope. Compare [cannon-es](https://github.com/pmndrs/cannon-es) if integration or tuning becomes a blocker.

## Traffic behavior

Traffic AI means decision logic in the game, not necessarily a generative model. Proposed states are cruise, follow, brake, and change lane. AI coding tools can draft these states and tests. Use seeded randomness for repeatability, check front/rear clearance before lane changes, and prevent spawns inside the player's safety zone.

Keep background traffic simple and reserve detailed simulation for nearby interactions. Inspect unfair spawns, simultaneous merges, cars braking forever, and visible recycling. No language-model calls are planned in the per-frame driving loop.

## Performance evidence

Provisional goal: 60 FPS at 1280 × 720 on the user's Mac, with a lower-quality 30 FPS option. Neither target has been achieved or measured here. Record hardware, browser, pixel ratio, asset size, draw calls, traffic count, median/p95 frame time, and load time. Run a longer session to look for memory growth.

## Controls and feedback

Keyboard and Bluetooth Xbox/PlayStation controller support are required. Read the [controller research](/research/controllers) for mappings and device tests. Keep pause, mute, replay, and clear controls. A readable HUD and visual crash feedback must work without audio.
