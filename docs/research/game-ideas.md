# Alternatives we considered

**Decision · November 11, 2026:** Highway driving is selected. This comparison preserves the reasons and tradeoffs, rather than asking us to choose the genre again.

**Assessment, not measured development estimates.** These ratings describe relative scope for a solo student using AI assistance. A generated screenshot is not evidence of a playable game.

| Idea | Small version worth testing | Main challenges | Relative difficulty |
| --- | --- | --- | --- |
| Highway driving | One straight road, one car, traffic avoidance, timed score | Camera feel, speed perception, traffic spacing, collisions | Moderate to high |
| Soccer | A few aimed shots or short passing puzzles | Ball flight, aiming, goalkeeper behavior, readable feedback | Moderate |
| Basketball | Timed free throws with adjustable aim and power | Consistent ball physics, hoop detection, satisfying feedback | Low to moderate |
| Full soccer match | Teams, movement, passing, tackling, match rules | Animation blending, tactics, possession, many agents | Very high |
| Full basketball match | Teams, dribbling, passing, defending, rules | Ball-hand contact, animation, spacing, team decisions | Very high |

## Selected concept: highway driving

This best matches the preferred third-person driving experience. Cars can remain mostly rigid objects, and traffic can use lane-based rules. A straight reusable road also limits the environment work. That reduces some complexity, but lighting, vehicle visibility, and smooth performance still need attention.

Use Racing in Car 2021 as an experience reference supplied by the project owner. Its internal engine, source code, and production process have not been verified here. We are not promising a clone or its level of polish.

## Soccer and basketball alternatives

Soccer could use discrete shot challenges rather than an entire match. Basketball could focus on free throws before adding a moving player. Both still support accounts, saved scores, and a dashboard.

## Why we selected highway driving

It matches the desired behind-the-car camera, traffic avoidance, and controller-driven experience. If the scope grows too large, reduce scenery, traffic density, or camera complexity before reconsidering the genre. The engine choice is Three.js; detailed handling and graphical quality still need evidence.
