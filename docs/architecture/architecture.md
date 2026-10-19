# Architecture Documentation

## Project Overview

**Project Name:** Hendy Nurfrianto Portfolio
**Type:** Personal Portfolio/CV Website
**Version:** 0.1.0
**Framework:** Next.js 14 (React 18) + React Three Fiber
**Related docs:** `PRODUCT.md` (product truth), `DESIGN.md` (visual system), `tech-stack.md`, `source-tree.md`

## System Architecture

### High-Level Architecture

The home page is a scroll-driven career journey. A full-bleed, real-time WebGL town (orthographic,
isometric, low-poly) renders behind regular DOM content. Each of the 12 scroll sections is one stop
on the road: Start, Gunadarma, Adicipta, Celerates, Gordi, Pama Persada, Mitra Solusi, Astra, Radiant,
Skills, Projects and Contact. A cartoon walker moves between the stops as the visitor scrolls. The
detail routes `/skill` and `/portofolio` show the same town, environment only and blurred, behind
their panels.

```
┌──────────────────────────────────────────────────────────────────┐
│                         Client Browser                            │
│                                                                   │
│  DOM layer (z-index 10+)                WebGL layer (fixed, z 0)  │
│  ┌──────────────────────────────┐      ┌───────────────────────┐ │
│  │ Journey (components/Journey) │      │ Scene (World/Scene)   │ │
│  │  - 12 × 100svh sections      │      │  - CameraRig          │ │
│  │  - Hero + StageCard panels   │ ───▶ │  - Landmarks + Yards  │ │
│  │  - TopBar, Stepper           │ store│  - Traffic, Sidewalk  │ │
│  │  - Mobile panel fold         │      │  - Character, Pins    │ │
│  └──────────────────────────────┘      └───────────────────────┘ │
│            ▲ window scroll                    ▲ useFrame (60fps)  │
│            └──── journey.stage / walker ──────┘ (store.ts)        │
│                                                                   │
│  Fallbacks: no WebGL → StaticWorld stills · reduced motion → snap │
└──────────────────────────────────────────────────────────────────┘
```

### Architecture Patterns

#### 1. **App Router Architecture (Next.js 14)**
- The App Router handles routing and the root layout (fonts, metadata, PostHog)
- Pages are client components because the journey and the detail routes are interactive
- The WebGL scene is a `next/dynamic` import with `ssr: false`, so SSR HTML holds every word of content

#### 2. **DOM Content over a WebGL World**
- The canvas is `aria-hidden` decoration. All copy, links and buttons are DOM, so SEO and screen readers work
- Scroll is the single input. `Journey` converts window scroll into `journey.stage` (0..11, fractional between stops)
- The scene reads `journey` and `walker` from a plain mutable module (`store.ts`) inside `useFrame`,
  so scrolling never triggers per-frame React re-renders. React state changes only when the active stop changes

#### 3. **Procedural 3D Kit**
- No model files. Every object is composed from primitives in `World/Kit.tsx` (`Block`, `OfficeBuilding`,
  `GableRoof`, `Truck`, `Car`, `Tree`, `Pin`, `Screen`, `ContactBlob`)
- One landmark component per stage in `World/Landmarks.tsx`, placed every `STAGE_SPACING` (16 units) along the road
- 3D colours live in `World/palette.ts` and mirror the `--j-*` CSS tokens in `globals.css`

#### 4. **Feature-Based Organization**
```
src/
├── app/                      # Routes, layout, globals.css (tokens + .j-* components)
├── components/Journey/       # Journey DOM layer, backdrop, fallback, capability, store
│   └── World/                # React Three Fiber scene
├── constants/data/           # journey.ts (CV content), Service.tsx (skills + portfolio lists)
├── hooks/useTracking.ts      # PostHog helpers
├── providers/                # PostHogProvider
└── lib/                      # cn(), mergeOpenGraph()
```

## Core Components

### 1. **Application Layer** (`src/app/`)
- **Root Layout** (`layout.tsx`): Geist fonts, metadata/OpenGraph, `PostHogProvider`
- **Home** (`page.tsx`): renders `<Journey />`
- **Skills** (`skill/page.tsx`): skills inventory grouped by CV category, over `<WorldBackdrop stage={9} />`
- **Portfolio** (`portofolio/page.tsx`): filterable project manifest, over `<WorldBackdrop stage={10} />`

### 2. **Journey DOM Layer** (`src/components/Journey/`)
- **index.tsx**: sections, hero, proof chip, nav, stepper (12 stops on desktop, a pager on mobile), and the mobile panel fold
- **StageCard.tsx**: card bodies per stage kind; content from `constants/data/journey.ts` (CV-verbatim)
- **WorldBackdrop.tsx / StaticWorld.tsx / capability.ts**: backdrop for detail routes, no-WebGL stills, device detection
- **store.ts**: `journey` (stage, reducedMotion), `walker` (x, z, speed), `walkPosition()`, `dwellAmount()`

### 3. **Scene Layer** (`src/components/Journey/World/`)
- **Scene.tsx**: the `Canvas` (orthographic, flat tone mapping, soft shadows) and the rest of the world:
  - **Camera rig:** follows the walker, framed beside the card on desktop and above the sheet on mobile.
    In backdrop mode it drifts slowly along the road instead.
  - **Lights:** a hemisphere fill plus a camera-following key light with a 2048px shadow map.
  - **Ground:** ground plane, road with dashes, sidewalk, and paved yards with bay paint.
  - **Traffic:** cars, box trucks and container trucks in two lanes, speed uniform per lane.
  - **Pins:** map pins and DOM tag labels via drei `Html`.
- **Character.tsx**: procedural cartoon walker:
  - walks the sidewalk and steps into each yard at a stop;
  - knee/elbow walk cycle, idle breathing, a wave at Start.
- **Landmarks.tsx**:
  - campus, 1–2 floor offices, the Celerates tower, the curtain shop;
  - mine site, phone monument, showroom, refinery;
  - warehouse with skill crates, billboards, gate.

### 4. **Data Layer** (`src/constants/data/`)
- **journey.ts**: `STAGES`, `SKILL_GROUPS`, `FEATURED_PROJECTS`, `SKILL_CRATES`, `CONTACT`, `PORTFOLIO_DRIVE_URL`.
  Career facts must match the CV PDF.
- **Service.tsx**: icon list for `/skill` and the full project list for `/portofolio`.

## Technical Architecture

### Frontend Architecture

#### Rendering Strategy
- Static prerender of all routes (`next build` reports them as static)
- Client hydration for interactivity; the 3D chunk loads after first paint

#### State Management
- React state only for UI decisions: active stop, panel open/closed, summary expanded, portfolio filter
- Frame-rate state (scroll progress, walker position) lives in `store.ts`, outside React

#### Styling Architecture
- Design tokens are `--j-*` custom properties in `app/globals.css`
- Components are named `.j-*` classes (`.j-card`, `.j-stepper`, `.j-btn`, `.j-tag`, …), with Tailwind utilities for small layout helpers
- Overlay panels are solid white with a hairline and a soft shadow. The backdrop on detail routes is blurred with CSS `filter`
- Breakpoints:
  - compact below 1024px: bottom-sheet cards, a pager stepper, a foldable panel;
  - desktop: right-hand cards and the 12-stop stepper;
  - short desktop (height up to 800px): a tighter type scale.

### Animation Architecture
- **Scroll to walk:** `walkPosition()` holds the walker at each stop, then eases between stops
- **Step-in:** `dwellAmount()` moves the walker from the sidewalk into the yard on arrival
- **Walk cycle:** procedural joint rotation scaled by `walker.speed`
- **Traffic:** looping lanes driven by the R3F clock
- **Reduced motion:** the walker and camera snap to stops, traffic and the backdrop drift are parked, and CSS transitions are disabled

### Font Management
- Geist and Geist Mono, local variable fonts via `next/font/local` (`constants/fonts.tsx`)
- Geist Mono is reserved for periods, stop IDs and counts

## Data Flow

### Content Flow
```
CV PDF → constants/data/journey.ts → StageCard / Hero / Stepper → DOM
                                   → STAGES.length / landmark → Scene (one landmark per stage)
```

### Scroll Flow
```
window scroll → Journey.handleScroll → journey.stage (+ stepper fill, activeIndex state)
             → useFrame: Character (walker.x/z/speed) → CameraRig (follow) → render
```

### Fallback Flow
```
capability.ts → webgl:   <Scene />
              → static:  <StaticWorld /> (stills of active stop ±1)
              → reduced: Scene with snapping, parked traffic
```

## Build & Deployment Architecture

### Build Process
1. TypeScript strict type check and ESLint (`next build`)
2. Static prerender of `/`, `/skill`, `/portofolio`
3. Code splitting: the three.js/R3F scene is its own lazy chunk (~169 KB gzip)

### Deployment Strategy
- Vercel (current: hendy-nurfrianto.vercel.app)
- PostHog requests are proxied through the `/ingest` rewrites in `next.config.mjs`

### Asset Pipeline (manual)
- Scene textures in `public/image/journey/` are downscaled WebP copies of `public/image/porto` and `public/image/skills`
- No-WebGL stills (`public/image/journey/stills/stage-N.webp`) are captured from the running scene with UI hidden.
  **Re-render them whenever landmarks, the character or lighting change.**

## Performance Optimizations

1. **Lazy 3D**: the scene chunk is dynamically imported; first paint is DOM only
2. **Device tiers**: low-power devices get no shadows and DPR ≤ 1.25. The backdrop mode always caps DPR
3. **No per-frame React work**: frame state lives in a mutable store
4. **Small textures**: WebP, 128px skill crates, ≤768px screens
5. **Fallback stills** load only for the active stop and its neighbours
6. **Instancing** for road dashes; shared contact-shadow texture

## Security Considerations

1. Strict TypeScript; no user-generated content or forms
2. External links use `rel="noopener noreferrer"`
3. Only external service: PostHog analytics (proxied)

## Scalability Considerations

### Current Scale
- Single-user portfolio, static content, no backend

### Extending the Journey
- **Add a stage:** add an entry to `STAGES`, add a landmark type and component, add a `PIN_HEIGHT`, and widen the
  stepper grid (it currently uses `repeat(12, …)` in `globals.css`). Then re-render the fallback stills
- **Replace the walker:** swap `Character.tsx` for a rigged GLB (Idle/Walk/Wave). The rest of the scene depends only on `walker.x/z/speed`

## Dependencies Architecture

### Core
- **next** 14.2.30, **react/react-dom** ^18, **typescript** ^5

### 3D
- **three** ^0.169.0, **@react-three/fiber** ^8.17.10, **@react-three/drei** ^9.117.3, **@types/three** ^0.169.0

### UI, Styling, Analytics
- **tailwindcss** ^3.4.1, **clsx**, **tailwind-merge**, **lucide-react**, **posthog-js**

### Unused since the redesign (candidates for removal)
- **@radix-ui/react-slot**, **class-variance-authority**, **embla-carousel-*** (4 packages)
- **framer-motion**: only the `MotionLazy` provider remains

## Integration Points

### External Integrations
- **PostHog**: product analytics
- **Google Drive**: portfolio archive link
- **BMad Method**: documentation workflow
- **Impeccable** (Claude skill): design system docs in `DESIGN.md`; its workspace is `.impeccable/` (gitignored)

## Development Architecture

### Development Workflow
1. Local development: `npm run dev`
2. Linting: `npm run lint`
3. Type check: `npx tsc --noEmit`
4. Production build: `npm run build`

## Documentation Architecture

- **Product**: `PRODUCT.md`
- **Design system**: `DESIGN.md`
- **Architecture**: `docs/architecture/` (this folder)
- **BMad config**: `.bmad-core/core-config.yaml`

## Future Architecture Enhancements

1. A rigged GLB avatar (Blender + Mixamo) in place of the procedural walker
2. Remove the unused dependencies listed above
3. Automated test suite (Jest, Testing Library) and a visual regression check for the stills
4. A CV PDF download, once its public exposure (phone number) is approved
5. Structured data (JSON-LD `Person`) for SEO

## Conclusion

The architecture keeps content and interaction in the DOM and treats the WebGL town as a progressively
enhanced layer. It stays fast, accessible and readable without the 3D, while the 3D itself shows craft.
