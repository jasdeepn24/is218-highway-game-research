# 3D cars, assets, and audio

## A practical AI-assisted car pipeline

| Route | Useful starting point | Work still needed |
| --- | --- | --- |
| Licensed model | Inspectable geometry and stated usage terms | Confirm interior quality, scale, texture size, and editable wheels |
| AI-generated 3D | Meshy's [image-to-3D API](https://docs.meshy.ai/en/api/image-to-3d) documents image-based model generation | Inspect hidden surfaces, topology, UVs, wheel separation, and output rights |
| AI-written modeling scripts | Coding assistant drafts a procedural car/blockout or repetitive cleanup steps | Run in the modeling tool, inspect geometry, correct artifacts |

**Assessment:** A licensed or carefully modeled vehicle is the safer first baseline for a readable exterior in third person. A detailed interior is only relevant if the optional cockpit camera is added. Generated models may need substantial cleanup; we have not measured that work. Meshy is a research candidate, not a purchased service or proven workflow here.

Proposed sequence: original brief → model or generate → inspect in Blender → simplify and fix materials → export GLB → load in Three.js → measure. [GLTFLoader](https://threejs.org/docs/pages/GLTFLoader.html) supports glTF 2.0 and relevant compression extensions; compression requires the appropriate loader/decoder configuration. A model that opens in a viewer may still be too large for the game.

## Environments and materials

Use AI to help generate road-section scripts, texture variations, and asset-checking reports. Keep a consistent scale and material palette. [Poly Haven](https://polyhaven.com/license) publishes HDRIs, textures, and models under CC0; it is a candidate source for lighting and road materials. Inspect each asset's suitability rather than assuming all downloads are game-ready.

## Audio

Begin with engine idle/driving loops, a passing-car sound, and a collision cue. AI can draft playback logic and suggest mixing changes. [ElevenLabs' sound-effects guide](https://elevenlabs.io/docs/eleven-creative/playground/sound-effects) documents text-generated effects and a looping option. This establishes a tool capability, not that generated engine loops sound convincing or are covered by the user's current plan.

**Proposal:** compare generated effects with original or appropriately licensed recordings. Audition loop seams, pitch changes, clipping, and volume balance. A single loop pitched across a large range may sound unnatural; test crossfading a few engine states if needed. Keep mute and volume accessible.

[MDN's autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) explains playback restrictions. Start or resume audio from an explicit user action. Verify pause, tab switching, replay, and that a new run does not leave a second engine loop playing.

## Provenance and acceptance

For every acquired asset, record author/provider, original URL, license or service terms, date, AI model/prompt if applicable, edits, file size, texture dimensions, and attribution. Check new paid services before committing to them. Reference images are not permission to extract a game's models or sounds.

No playable assets have been downloaded or generated for this project. The [visual reference board](/research/visual-references) contains study material, not our game output. Do not copy Racing in Car 2021 branding, assets, or code.
