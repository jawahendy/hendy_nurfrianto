---
name: Hendy Nurfrianto
description: A career walked as an isometric low-poly town, read through solid white control-panel cards.
colors:
  cobalt: "#2f5bea"
  cobalt-deep: "#2448c4"
  cobalt-tint: "#e8eefd"
  amber: "#f4a51c"
  amber-tint: "#fdf1da"
  green-ink: "#1b6b47"
  green-tint: "#e2f3ea"
  porcelain-ground: "#e0e7f5"
  porcelain-deep: "#d2d9e4"
  ink: "#16203a"
  ink-2: "#46516e"
  ink-3: "#5f6a87"
  card: "#ffffff"
  card-solid: "#ffffff"
  line: "rgba(22, 32, 58, 0.09)"
  world-wall: "#f6f7fa"
  world-wall-shade: "#e4e8ef"
  world-cobalt-soft: "#6f8ff2"
  world-glass: "#bcd0f7"
  world-door: "#20398f"
  world-yard: "#f3f6fc"
  world-road: "#d3dbea"
  world-curb: "#c4cde0"
  world-paint: "#f2c94c"
  world-leaf: "#7fc49a"
  world-leaf-deep: "#5aa97b"
  world-lawn: "#bfe0c8"
  world-trunk: "#a98665"
  world-crate: "#d9b07a"
  world-crate-deep: "#c1935a"
  world-teal: "#3aa7a0"
  world-teal-deep: "#2b8580"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5.4vw, 5.25rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4rem)"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  role:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)"
    fontWeight: 600
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
    lineHeight: 1.2
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    fontFeature: "tnum"
rounded:
  xs: "5px"
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "16px"
  card: "20px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.card-solid}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "0 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-deep}"
  button-ghost:
    backgroundColor: "{colors.card-solid}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 18px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.cobalt-tint}"
    textColor: "{colors.cobalt-deep}"
  button-sm:
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "36px"
  glass-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "22px 26px"
    width: "min(540px, 42vw)"
  panel-toggle:
    backgroundColor: "{colors.cobalt-tint}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.md}"
    size: "36px"
  stack-chip:
    backgroundColor: "{colors.cobalt-tint}"
    textColor: "{colors.cobalt-deep}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  status-pill:
    backgroundColor: "{colors.green-tint}"
    textColor: "{colors.green-ink}"
    rounded: "{rounded.pill}"
    padding: "1px 8px"
  pin-tag:
    backgroundColor: "{colors.card-solid}"
    textColor: "{colors.ink}"
    rounded: "9px"
    padding: "5px 10px 5px 6px"
  pin-tag-active:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.card-solid}"
  nav-link:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  nav-link-active:
    backgroundColor: "{colors.cobalt-tint}"
    textColor: "{colors.cobalt-deep}"
  segmented-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card-solid}"
    rounded: "{rounded.md}"
    height: "38px"
  bay-icon:
    backgroundColor: "{colors.card-solid}"
    rounded: "{rounded.md}"
    size: "36px"
---

# Design System: Hendy Nurfrianto

## Overview

**Creative North Star: "The Logistics Map Town"**

The career is a place. A real-time orthographic WebGL town sits full-bleed behind everything: porcelain-cool ground, white-walled low-rise offices under cobalt roofs, muted green round trees, and a two-lane road with white dashes where cars, white box trucks and teal container trucks run both ways. A pale sidewalk runs between the road and the yards, and on it walks one rounded cartoon figure in an amber hoodie with a cobalt backpack. Each employer is a landmark on its own paved yard, marked by a map pin and a floating tag. Scroll is the step: the walker leaves the yard, walks the sidewalk, and steps a little into the next lot.

Over the world floats a thin layer of solid white tracking cards, read like a logistics control panel: a large 20px radius, soft diffuse shadow, ledger rows, small cobalt-tint chips, and Geist Mono for periods and stop IDs. The UI never competes with the town; it labels it. The detail routes (`/skill`, `/portofolio`) park the same town behind their panels, environment only, softly blurred and slowly drifting, so leaving the walk still feels like the same map.

Density is calm and legible: one card at a time, real DOM text that matches the CV word for word, generous line height. The 3D is proof of craft (low-poly but soft-edged, shadowed and anti-aliased), never decoration that hides the content.

**Key Characteristics:**
- Full-bleed orthographic town at a fixed 45-degree isometric camera, cobalt and white over porcelain, with live two-way traffic.
- One amber voice: the walker, the active pin, the active stepper dot, the active tag ID.
- Solid white cards (opaque, 20px radius, 1px ink hairline, soft two-layer shadow).
- Geist for voice, Geist Mono for IDs, periods and counts.
- Scroll-driven walk along the sidewalk with a dwell at every stop; reduced motion snaps stop to stop and parks the traffic.
- Detail routes reuse the town as a blurred, walker-free backdrop.
- A pre-rendered still of every stop stands in when WebGL is unavailable.

## Colors

A cool porcelain-and-cobalt map with white architecture, muted greens, and a single warm amber reserved for "you are here".

### Primary
- **Map Cobalt** (`cobalt`): the structural colour of the world (roofs, signs, vehicles, the backpack, sneaker soles, inactive pins) and the action colour of the UI (primary buttons, focus ring, selection, track fill, done stepper dots, bullet squares).
- **Deep Cobalt** (`cobalt-deep`): hover for primary buttons; in 3D the roof corrugation ribs and ridge caps, truck chassis and some vehicle bodies; in the UI the role line, chip and tag-ID text, the active step label and the "Read full summary" link.
- **Cobalt Tint** (`cobalt-tint`): quiet fills for chips, tag IDs, the proof-chip icon tile, the mobile fold toggle, nav hover and current-page links.

### Secondary
- **Walker Amber** (`amber`): the "you are here" signal. The walker's hoodie and sleeves (with `amberDeep` #d98a06 for pocket, hood rim and cuffs in 3D), the active map pin, the active stepper dot with its 3px amber halo, the active tag's ID chip, and the active portfolio filter count.
- **Amber Tint** (`amber-tint`): declared for soft amber fills; reserved, not yet used by a shipped component.

### Tertiary
- **Ledger Green** (`green-ink` on `green-tint`): one job only, the "Current" status pill inline in a stage card's Period row.

### Neutral
- **Porcelain Ground** (`porcelain-ground`): page background, canvas backdrop, `theme-color`, and (at 28%) the wash over the detail-route backdrop. The ground mesh is authored lighter (#e8eefa) so that, lit, it renders to this value.
- **Porcelain Deep** (`porcelain-deep`): empty stepper track.
- **Ink** (`ink`): headings and primary text; the "on" state of the portfolio segmented control.
- **Ink 2** (`ink-2`): body copy, ledes, nav links, the fold-toggle chevron.
- **Ink 3** (`ink-3`): meta text, row labels, periods, sub-lines.
- **Card White** (`card` / `card-solid`): every overlay surface, ghost buttons and skill icon tiles.
- **Hairline** (`line`): panel borders, row dividers, ghost-button borders, thumbnail and icon-tile rings.

### World materials (palette.ts)
The 3D materials live in `src/components/Journey/World/palette.ts` and must mirror the CSS tokens for every shared hue (cobalt, cobalt-deep, amber, ground/backdrop). World-only materials: **White Wall** and **Wall Shade** for facades, plinths, posts and white car bodies and box-truck cargo; **Soft Cobalt** for window bands, curtains and yard edge lines; **Pale Glass** for windows and windshields; **Night Door**; **Yard** for the paved lots and the sidewalk; **Road** and **Curb** greys; **Bay Paint** yellow for dashed parking bays (a paint colour, distinct from amber); **Leaf**, **Leaf Deep**, **Lawn**, **Trunk** for vegetation; **Crate** and **Crate Deep** for pallets and skill crates; **Teal** and **Teal Deep** for container trucks and teal cars; plus sand, tire, skin, hair and pants for single props and the walker.

### Named Rules
**The One Amber Rule.** Amber marks where the visitor is: the walker, the active pin, the active dot, the active tag ID, the active filter count. Inactive states are always cobalt or neutral. Small amber signage accents on landmarks (the start signpost plank, the contact gate stripe, the mailbox flag) are the only other uses; no vehicle is amber, and it never spreads to buttons, links or headings.

**The Mirror Rule.** Any colour that appears in both the canvas and the DOM is defined once in CSS and copied verbatim into `palette.ts`. The canvas backdrop equals `porcelain-ground` so the fixed CSS layer and the WebGL frame never show a seam.

## Typography

**Display Font:** Geist (variable, local, with system-ui fallback)
**Body Font:** Geist
**Label/Mono Font:** Geist Mono (variable, local, tabular numerals)

**Character:** A neutral, engineered grotesk set tight and heavy at display size (650 weight, -0.04em), paired with a mono that reads like the stop codes on a dispatch board.

### Hierarchy
- **Display** (650, clamp(2.25rem, 5.4vw, 5.25rem) compact / clamp(2.5rem, 4.4vw, 4.5rem) desktop, 0.98): the name in the home hero only. Balanced wrapping. Drops to 1.75rem when the mobile hero is folded.
- **Headline** (650, clamp(2.25rem, 5vw, 4rem), 1): detail-route page titles ("Skills inventory", "Project manifest").
- **Title** (650, 22px, 20px on short desktop screens, 1.15, -0.025em): stage-card headings. Bay headings and tile names step down to 17px and 16px at the same weight.
- **Role** (600, clamp(1.05rem, 1.5vw, 1.35rem), Deep Cobalt): the role line under the name.
- **Body** (400, 14.5px compact / 15px desktop hero, 16px page ledes, 1.6, max 60-62ch): hero and page ledes.
- **Body small** (13px desktop / 13.5-14.5px compact, 1.45-1.55): card ledes, bullets, ledger rows. Short desktop screens drop bullets to 12.5px / 1.4. Skill groups sit at 12.5-13px.
- **Label** (600, 12.5-14px): buttons, nav, step labels, chips (550).
- **Mono** (Geist Mono, 10.5-12px, tabular): stop IDs ("03", "03/11"), periods under stepper dots, bay and filter counts.

### Named Rules
**The Dispatch Code Rule.** Mono is only for things a dispatcher would read as codes: stop IDs, periods, counts. Never set prose, headings or buttons in mono.

**The CV Verbatim Rule.** Card text is the CV's text, unabridged. When it does not fit, the card tightens its type and rhythm (desktop, then short-screen mode); it never paraphrases or trims a point.

## Layout

The home route is a stack of full-viewport sections (`100svh`, scroll-snap proximity) over a fixed world layer. One section equals one career stop, and the stage card for that stop is the only content block on screen.

- **Desktop (1024px and up):** one proof chip top-left, nav top-right (16px inset). The hero docks right (`right: max(32px, 5vw)`, vertically centred, `min(600px, 44vw)` wide, 30px 32px padding, capped at `100svh - 230px`). Stage cards dock right (`right: max(28px, 4vw)`, centred 14px above middle, `min(540px, 42vw)` wide, 22px 26px padding, capped at `100svh - 220px`) with tight rhythm: 6px ledger rows, 13px bullets on a 6px gap, 12px chip margins. At 1280x720 and up no card scrolls. The stepper is a fixed bar 16px from the bottom, up to 1180px wide, a 12-column grid of every stop. The camera holds the current stop left of centre beside the card (zoom `min(w/30, h/18)`).
- **Short desktop (1024px and up, 800px tall or less):** cards tighten once more (18px 24px padding, 20px title, 4px rows, 12.5px bullets, 8px section gaps, cap `100svh - 196px`) and the stepper slims.
- **Compact (under 1024px):** proof chips and text nav links hide; a brand pill and the Contact button remain. The hero and card become a bottom sheet (12px side insets, 104px from the bottom, 56svh / 52svh max, internal scroll with a fade mask only while more content waits). A 36px chevron toggle top-right folds the sheet to its title (the hero keeps name and role); the open state is shared across every stop, so a folded sheet stays folded while walking on. The hero summary clamps to 4 lines behind a "Read full summary" toggle. The stepper collapses to prev / "03/11 Label period" / next with a 3px progress track. The camera zooms to `min(w/16, h/26)` and frames the walker itself in the upper band above the sheet; only the active stop's tag is shown. Desktop panels never fold.
- **Detail routes:** the town backdrop is fixed behind; a sticky sub-header, then a `min(1180px, 100%)` main column, 16px padding growing to 24px. The page head sits in a solid panel (24px padding). Skills is a masonry of shelf bays (1, 2, 3 columns at 640px and 1024px); portfolio is a tile grid (1, 2, 3 columns at the same breakpoints).
- **Rhythm:** a 4px base (4, 8, 12, 16, 20, 24, 32). Card padding 20px compact / 22-26px desktop; hero 22px / 30-32px.

**The One Card Rule.** Each stop gets exactly one card, docked away from the walker. Never stack several cards over the world.

## Elevation & Depth

Depth comes from two systems that agree. The world carries real 3D depth: an orthographic camera at offset (20, 19, 20), a hemisphere light (sky #f4f8ff, ground #d3dcee, 1.5) for soft fill, and one white directional key light (1.75) that follows the camera with 2048px shadow maps, so every block, vehicle and the walker cast a soft shadow. Trees, pallets, crates and the walker also sit on a shared radial **contact blob** (ink at 55% fading to 0) to ground them without hard edges. The UI floats above on solid white panels with soft, diffuse, downward shadows: ambient, never structural, never hard-offset.

On detail routes the world itself recedes: the canvas (or still) takes `blur(6px) saturate(0.92)`, scaled 1.04 so no hard edge shows at the viewport, under a 28% porcelain-ground wash. The blur belongs to the world layer, never to a panel.

### Shadow Vocabulary
- **Card** (`box-shadow: 0 1px 2px rgba(22,32,58,0.06), 0 14px 36px -10px rgba(22,32,58,0.22)`): every overlay surface: hero, stage card, stepper, top-bar pills, page heads, bays, tiles, page CTAs.
- **Small** (`box-shadow: 0 1px 2px rgba(22,32,58,0.06), 0 6px 16px -6px rgba(22,32,58,0.18)`): 3D pin tags and the segmented control.
- **Primary glow** (`box-shadow: 0 1px 1px rgba(36,72,196,0.4), 0 8px 18px -8px rgba(47,91,234,0.7)`): primary buttons only.
- **Tile lift** (`box-shadow: 0 1px 2px rgba(22,32,58,0.06), 0 22px 44px -14px rgba(22,32,58,0.3)`): hover on a live portfolio tile, with a 3px rise.
- **Active dot halo** (`box-shadow: 0 0 0 3px amber, 0 4px 10px rgba(244,165,28,0.5)`): the current stepper dot.

### Named Rules
**The Solid Panel Rule.** Overlay surfaces are opaque white with a 1px ink-9% hairline and the Card shadow; no transparency or backdrop blur, because the town smears into pale blotches behind translucent panels. Never use a coloured panel over the world.

## Shapes

Everything is soft-cornered, in the world and on screen. In 3D, the base primitive is a rounded box (radius 0.08, clamped to the block's size); gable roofs are bevelled prisms with Deep Cobalt corrugation ribs on both slopes and a ridge cap; trees are two overlapping spheres on a tapered trunk; pins are a sphere over an inverted cone. The walker is built from capsules and spheres only (big round head, capsule torso and limbs, rounded sneakers). The only intentionally faceted shapes are the mine's spoil heaps (flat-shaded cones), read as raw earth. On screen the radius scales with the element: 5px tag IDs, 8px chips and thumbnails, 10px small buttons, nav links, the fold toggle and icon tiles, 12px buttons and list rows, 14-16px pills and the proof chip, 20px cards, fully round status pills and stepper dots. Bullets are 6px squares with 2px corners in cobalt, a map-marker, not a typographic dot.

## Components

### Buttons
Tactile and quiet: a soft press of 1px on active, colour change on hover.
- **Shape:** gently rounded (12px; small variant 10px), 44px minimum height (36px small).
- **Primary:** Map Cobalt fill, white label (14px / 600), primary glow shadow. Hover to Deep Cobalt.
- **Ghost:** solid white, ink label, hairline border. Hover to cobalt tint with Deep Cobalt text.
- **Wide:** full-width primary for the contact email.
- **Text toggle:** "Read full summary" / "Show less", 13.5px / 600 Deep Cobalt, underline on hover; compact hero only.
- **Focus:** 2px cobalt outline, 3px offset, global.

### Chips
- **Stack chips:** cobalt-tint fill, Deep Cobalt 12.5px / 550 text (12px, 3px 9px on desktop cards), 8px radius, 6px gap wrap.
- **Status pill:** Ledger Green on green tint, fully round, 1px 8px, sitting inline before the value in the Period row; used only for "Current".
- **Tile type:** cobalt-tint, 6px radius, 11.5px, "Mobile" / "Web".

### Cards / Containers
- **Corner Style:** 20px.
- **Background:** solid card white (see Solid Panel Rule).
- **Shadow Strategy:** Card shadow.
- **Internal Padding:** 20px compact, 22px 26px desktop, 18px 24px on short screens.
- **Ledger rows:** label left in Ink 3, value right in 600 weight, hairline top and bottom; 9px vertical padding compact, 6px desktop, 4px short-screen. Skill groups use the same ledger with a 6.5-6.75rem label column.
- **Project and link lists:** full-bleed hover rows (12px radius, cobalt-tint hover), 72x48 thumbnail with a hairline ring, trailing arrow.
- **Fold toggle (compact only):** 36px cobalt-tint square, 10px radius, top-right at 14px; the chevron rotates 180 degrees over 300ms when folded. Each toggle is `aria-expanded` against its panel and fires `panel_toggled`.

### Navigation
- **Top bar:** solid pill (16px radius, 6px padding) holding text links (14px / 550, Ink 2, cobalt-tint hover) and the Contact primary button. `aria-current="page"` links take the cobalt-tint state on detail routes.
- **Sub-header (detail routes):** sticky; a small ghost "Journey" back button left, the nav pill right with a small primary "Drive" button. Button labels hide visually at 479px and below.
- **Stepper:** the always-on career navigation. Desktop: 12 stops on a 2px track, each a 14px dot over a 600 label and a mono period. Upcoming dots are white with a grey ring, passed dots are solid cobalt, the current dot is amber with a white ring and amber halo. Compact: 40px prev/next buttons around a live "NN/NN Label period" readout and a 3px fill track.

### Proof Chip
One solid pill, top-left on desktop only: a 16px line icon in a cobalt-tint 10px tile, then a 15px / 650 fact ("Since 2019") and a 12px Ink 3 qualifier. Facts come from the CV only.

### Skill Bays
Shelf-bay panels (18px padding) on `/skill`, one per CV category including AI: a 17px heading with a mono Deep Cobalt count over a hairline, then a two-column list of 14px / 550 names, each led by a 36px white icon tile with a hairline ring holding a 24px logo. Logos are the tools' own marks (Simple Icons SVGs in brand colour, or the incumbent PNGs); they are content, not palette.

### Map Pins and Tags (signature)
Each landmark carries a 3D pin and a DOM tag anchored above it. Tag: white, 9px radius, small shadow, a mono two-digit ID chip then the stop label. Active: the pin turns amber, grows to 1.25x and bobs; the tag turns cobalt with white text and an amber ID chip. Pins and tags exist only in the journey, never on the backdrop.

### Low-poly Kit (signature)
The world is built only from shared primitives in `World/Kit.tsx`: Block (rounded box, cast and receive shadow), GableRoof (ribbed, ridge-capped), WindowRow, OfficeBuilding, Screen (framed screenshot panel for phones, billboards, monitors), Pin, Tree, Lawn, Pallet, Car, Truck (box or container cargo), Forklift and ContactBlob. Each employer sits on a 14.2 x 11.2 paved Yard with a Soft Cobalt front line and a yellow dashed bay. Work stops are low-rise offices of one or two floors; Celerates alone stays a tall glass-banded tower. OfficeBuilding (2.3-unit floors, window bands front and side, a door with an accent sign band, an accent floor band between storeys, a flat roof with a plant box or a gable roof) is the base for new office stops and carries Pama, Mitra Solusi and Radiant; Adicipta, Gordi and Astra are bespoke compositions at the same scale. Each stop's theme lives in its yard as accents (spoil heaps, dump truck, VR headset monument, AR marker, phone monument, tanks, pipes and flare stack, showroom cars). New landmarks compose these primitives with palette materials; roughness stays high (0.85-0.95) on matte surfaces and drops (0.2-0.45) only for glass and vehicle bodies.

### Street and Traffic
The road is 4.2 units wide with curbs and white centre dashes; a Yard-coloured sidewalk strip (1.1 wide) runs between the far curb and the yards and is the walker's path. Traffic runs in two lanes, one each way (4.2 and 3.4 units/s), every lane at one uniform speed with even spacing so nothing overtakes. Fleets mix cars (cobalt, white, teal), white box trucks with a body-colour side stripe, and teal container trucks with Teal Deep ribs, all on cobalt or Deep Cobalt cabs and chassis.

### Walker
A procedural rounded cartoon at scale 0.62, standing on the slabs (ground offset 0.135): big head with a hair cap and three-lobe fringe, eyes with a white highlight, pink cheeks and a smile; capsule amber hoodie with pocket and hood rim, cobalt laptop backpack; capsule limbs jointed at knees and elbows; white sneakers on cobalt soles. Swappable for a rigged GLB; the scene depends only on the walker's x, z and speed.

### Motion
- **Scroll-driven walk:** scroll progress maps to a fractional stage. Within each section the walker holds still for the first and last 18% and walks between (smoothstep 0.18-0.82), so the visitor reads while standing and walks while the card changes.
- **Dwell and step-in:** at a stop the walker stands just inside the yard; before walking he steps back onto the sidewalk (dwell smoothstep 0.03-0.15) and steps in again on arrival. He turns along the shortest arc and faces the camera when idle.
- **Gait:** hip swing with a knee fold as each leg passes under, arms counter-swinging with soft elbows, a step bob, a slight torso twist with the head countering it. Idle: breathing and a slow head tilt. A wave on the start plaza.
- **Traffic:** continuous, per-lane uniform speed; parked at its starting slots under reduced motion.
- **Camera:** damped follow (factor 5) and damped zoom (factor 4). Backdrop mode drifts sinusoidally along the road around the page's stop (period about 157s, amplitude 26 units).
- **UI:** 200ms colour transitions, 300ms for dots, tags, the fold chevron and tile lift, all on `cubic-bezier(0.16, 1, 0.3, 1)`. The canvas fades in over 900ms once ready; fallback stills cross-fade over 600ms.
- **Reduced motion:** the walker, camera and zoom snap to the rounded stop with no walk cycle, no wave and no smooth scrolling; traffic and the backdrop drift park; CSS transitions collapse to 0.01ms.

### World Backdrop
`/skill` and `/portofolio` render the same Scene in `backdrop` mode: environment and traffic only, no walker, no pins, camera centred on the page's stop (Skills warehouse, Projects billboards), DPR capped at 1.25, blurred and washed as described in Elevation. Without WebGL the page's still stands in under the same blur.

### No-WebGL Fallback
When WebGL is unavailable, one pre-rendered still per stop (`/image/journey/stills/stage-N.webp`, rendered from the same scene) cross-fades in behind the same cards and stepper. Only the active stop and its neighbours are mounted. Under 1024px the still is cropped to the top 50svh, above the sheet. Low-power devices (4 cores or fewer, 4GB or less, or narrower than 768px) keep WebGL but drop shadows and cap DPR at 1.25. World rasters (textures and stills) live under `public/image/journey`, each with a provenance sidecar in `.impeccable/provenance/journey`.

## Do's and Don'ts

### Do:
- **Do** build new 3D props only from the Kit primitives and `palette.ts` materials, with soft rounded edges and a contact blob underneath.
- **Do** start a new employer stop from OfficeBuilding at one or two floors, and put its theme in the yard as accents.
- **Do** keep every shared hue identical in `globals.css` and `palette.ts`.
- **Do** put every overlay on the solid white surface (opaque, 20px radius, hairline, Card shadow).
- **Do** reserve amber for the current position: walker, active pin, active dot, active tag ID.
- **Do** set stop IDs, periods and counts in Geist Mono with tabular numerals.
- **Do** keep all content in real DOM text, CV-verbatim, and give every new stop a pre-rendered still for the fallback.
- **Do** dock one card per stop away from the walker, and switch to the foldable bottom sheet under 1024px.
- **Do** give detail routes the blurred town backdrop rather than a flat page.

### Don't:
- **Don't** use amber for buttons, links, headings, vehicles or inactive states.
- **Don't** put opaque coloured panels or hard offset shadows over the world; shadows stay soft and diffuse.
- **Don't** blur or tint a panel to separate it from the town; blur only the world layer, and only on detail routes.
- **Don't** set prose or headings in mono, or display type in anything but Geist.
- **Don't** add a hero-then-stacked-section-cards page structure to the home route; the walk is the structure.
- **Don't** animate anything that ignores `prefers-reduced-motion`; the walk must snap and the traffic must park.
- **Don't** build buildings, vehicles or props from sharp unbevelled boxes; only flat ground paint (road dashes, curbs, yard lines, bay markings) stays square.
