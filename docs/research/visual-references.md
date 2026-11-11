# Visual reference board

**Study references, not screenshots of our game.** Each reference has a specific research purpose. No image here establishes that AI can reproduce it or that the pictured assets may be reused in our game.

## 1. Cockpit and highway experience

[View Racing in Car 2021's official App Store screenshots](https://apps.apple.com/us/app/racing-in-car-2021/id1570315891).

The publisher's listing describes driver-seat views, detailed interiors, traffic, and highway environments. Study road readability and traffic spacing. The cockpit images are references for an optional later camera. Our proposed first environment is a daylight highway with one vehicle; the reference game's broader feature set is not our scope.

## 2. What Three.js materials can look like

![Three.js Ferrari material-demo reference showing reflective paint, glass, wheels, and a neutral ground plane](https://user-images.githubusercontent.com/234804/67666954-36c5be00-f9b0-11e9-918d-63d77fd002fe.jpg)

**Source:** historical image in [three.js issue #17824](https://github.com/mrdoob/three.js/issues/17824). **Current working reference:** [official car-material demo](https://threejs.org/examples/webgl_materials_car.html), which credits the Ferrari model to vicent091036. This is a third-party demonstration, not an asset we have licensed. The older image is a visual reference only, not a current benchmark.

Study paint roughness, reflections, glass, wheel detail, and contact with the ground. The lesson is that lighting and material consistency matter alongside polygon count. Do not assume an isolated-car demo predicts highway-game frame rate.

## 3. Real-road composition reference

![Real-car cockpit view toward an Autobahn, showing road visibility, traffic scale, and dashboard placement](https://s1.cdn.autoevolution.com/images/news/gallery/new-mercedes-amg-c63-s-coupe-does-an-autobahn-top-speed-run-doesn-t-hit-200-mph_1.jpg)

**Source:** [Autoevolution's Mercedes-AMG cockpit photograph/article](https://www.autoevolution.com/news/new-mercedes-amg-c63-s-coupe-does-an-autobahn-top-speed-run-doesn-t-hit-200-mph-164383.html). Used as a linked visual study reference, not a reusable texture or model. Study framing and road readability, not the driving behavior shown. This is a real-world image, not game or AI output.

## Translate references into decisions

| Observe | Proposed choice | Verify later |
| --- | --- | --- |
| Clear forward road view | Third-person camera behind the car with a clear view of nearby traffic | Visibility and comfort on the user's display |
| Consistent material response | One coherent daylight lighting setup | Asphalt, paint, glass, and shadows under the same light |
| Recognizable traffic silhouettes | Limited set of clean vehicle shapes | Readability before adding model detail |
| Road repetition and distance | Modular highway with fog and varied roadside props | Visible seams, recycling, and performance |

External images require internet access; the original-source links remain available if an image host blocks embedding. These references were checked on November 11, 2026. No images have been presented as generated proof of the future game's quality.
