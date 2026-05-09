# TowerLine Simulation Preview

This prototype is a no-fog-of-war human-vs-AI autoplay sketch for the mobile web game.

## What It Shows

- A portrait, phone-shaped battlefield.
- A splash screen that starts the match on tap and unlocks browser audio.
- Two stationary wizard points, centered and 12 tabletop inches from their edges.
- Time-grown circular command areas.
- Human-simulated player drawings against an AI opponent; drawings become forts or chess-piece soldiers.
- Bottom command controls switch the player side between Muster and Attack.
- Faster mana recovery, with mana still draining while a glyph is drawn.
- Completed fort layers, towers, and bastions add a small mana-conduit bonus, encouraging a defend-then-attack rhythm.
- Idle pressure builds when a side sits on high mana without casting or fielding an attack, inviting enemy pressure waves.
- A companion regen-speed bar that shows whether mana recovery is stopped, slow, medium, or fast.
- Upkeep pressure: existing wall length, towers, bastions, forming units, and living soldiers reduce mana regeneration.
- Strained casting when a side overdraws past zero energy.
- Soldier glyph size controls batch size, with larger drawings attempting more units and paying an escalating batch cost.
- Energy-aware AI that pauses to recover, uses cheap casts in red, and reserves large forts or crown pieces for healthier energy states.
- A human-sim controller for the south/player side that fortifies early, recovers mana more deliberately, rebuilds under pressure, and sends stronger attacks once its economy is healthy.
- Fort walls from circles, towers from auxiliary loops, and bastions from angular patterns.
- New fort walls are forced to encompass existing layers, so a fresh circle/star/square cannot intersect the walls beneath it.
- Completed fort rings slowly settle inward, lose some wall strength as they compact, and stop before intersecting lower layers.
- Rook-like wall towers follow settling rings in small hopping jumps rather than smooth slides.
- Sustained attacks create local breaches, so soldiers can push through the damaged segment while the rest of the wall still stands.
- Gates that temporarily slide open as narrow arclength doorways when friendly soldiers leave the fort, then close again.
- Fort towers and pointy bastions fire weaker defensive arrows at nearby attackers; towers can shoot over one friendly wall, while bastions fire two arrows but cannot shoot through friendly walls.
- Wizard towers fire short arrow-line attack spells at enemy soldiers inside the current command radius, helping the early game survive first contact.
- Chess-like miniatures marching automatically toward the opposing wizard; a wizard dies immediately when an enemy miniature touches them.
- Sapper attackers stop just outside an enemy wall, burrow inward, then detonate under a segment to chunk the fortification.
- Killed sappers explode on death, damaging nearby miniatures and wall segments on either side.
- Breached walls now create real storm points; attackers funnel through the opening, widen the hole as they pass, then fan around the next intact layer to attack it from multiple angles.
- Soldiers that pass close to the enemy wizard tower turn inward and try to attack it instead of drifting past on their route.
- Some attackers choose left or right flanking arcs instead of marching straight down the center.
- Soldier movement gradually accelerates later in the match to bring long sieges to a decision.
- Small attackers can commit to a sneak route, hugging the table edge and avoiding most skirmishes until they collapse inward near the enemy base.
- Soldiers that encounter enemy miniatures break off into local skirmishes before resuming their wizard push.
- Attackers can muster in pods near the fort, filling the front pod first, then a random left/right pod, then the opposite side before a wave is released.
- Newly created soldiers choose an initial marching order: defend against attackers at the home base or advance toward the opposing base.
- Natural frontage spreading so soldiers make room around crowded enemy-side fights instead of bundling into one pile.
- A match-end overlay with a win/vanquished pill, play-again control, per-side unit production/loss statistics, and broken/built layer counts for each fort.

## Current Shape Language

- Dot or short segment: pawn.
- Straight line: lancer pawn.
- Cross: blade pawn.
- Small loop with a tail: sapper.
- M shape: knight.
- W shape: crown standard.
- Bigger soldier glyphs spawn larger batches: one unit costs 1x, two units cost 3x total, three cost 6x total, and so on.
- Closed loop: wall ring.
- Small attached loops: towers.
- Sharp vertices: bastions.

The simulation is intentionally self-contained and uses plain browser canvas so it can run without installing packages.
