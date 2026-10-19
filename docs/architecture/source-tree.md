# Source Tree Documentation

## Overview

This document provides a comprehensive overview of the project's directory structure, file organization, and the purpose of each component within the codebase.

## Project Root Structure

```
hendy_nurfrianto/
├── .bmad-core/              # BMad Method configuration and resources
├── .claude/                 # Claude AI configuration and commands
├── .git/                    # Git version control
├── .impeccable/             # Impeccable design-skill workspace (gitignored): surface brief, design.json, raster provenance
├── .next/                   # Next.js build output (generated)
├── docs/                    # Project documentation
│   └── architecture/        # Architecture documentation
├── node_modules/            # npm dependencies (generated)
├── public/                  # Static assets served directly
├── src/                     # Source code (main application)
├── .gitignore              # Git ignore rules
├── components.json          # shadcn/ui configuration (legacy)
├── DESIGN.md                # Visual design system (tokens, components, 3D world rules)
├── LICENSE                  # Project license
├── next.config.mjs          # Next.js configuration
├── next-env.d.ts           # Next.js TypeScript declarations
├── package.json            # npm package configuration
├── package-lock.json       # npm lock file
├── postcss.config.mjs      # PostCSS configuration
├── PRODUCT.md              # Product truth: audiences, purpose, evidence, principles
├── README.md               # Project readme
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Source Directory Structure (`src/`)

### Complete Source Tree

```
src/
├── app/                        # Next.js 14 App Router
│   ├── globals.css             # Design tokens (--j-*) and every .j-* component style
│   ├── layout.tsx              # Root layout: Geist fonts, metadata, PostHog provider
│   ├── page.tsx                # Home (/) → <Journey />
│   ├── icon.tsx, apple-icon.tsx # Generated favicons
│   ├── portofolio/page.tsx     # Project manifest (filterable), over the blurred town
│   └── skill/page.tsx          # Skills inventory (grouped bays), over the blurred town
│
├── assets/fonts/               # GeistVF.woff, GeistMonoVF.woff (local variable fonts)
│
├── components/
│   ├── Journey/                # The 3D career journey
│   │   ├── index.tsx           # Scroll journey: sections, hero, top bar, stepper, mobile panel fold
│   │   ├── StageCard.tsx       # Card bodies per stage kind (work, education, skills, projects, contact)
│   │   ├── SubHeader.tsx       # Top bar for the detail routes
│   │   ├── WorldBackdrop.tsx   # Environment-only blurred town behind /skill and /portofolio
│   │   ├── StaticWorld.tsx     # No-WebGL fallback: cross-fading pre-rendered stills
│   │   ├── capability.ts       # WebGL / low-power / reduced-motion detection
│   │   ├── store.ts            # Scroll progress + walker state shared with the render loop
│   │   └── World/              # React Three Fiber scene (client only, dynamic import)
│   │       ├── Scene.tsx       # Canvas, camera rig, lights, ground, road, sidewalk, traffic, pins
│   │       ├── Character.tsx   # Procedural cartoon walker and its walk/idle/wave animation
│   │       ├── Landmarks.tsx   # One landmark per stage (campus, offices, mine, showroom, refinery, …)
│   │       ├── Kit.tsx         # Primitives: Block, OfficeBuilding, GableRoof, Truck, Car, Tree, Pin, Screen, …
│   │       └── palette.ts      # 3D material colours (mirror of the CSS tokens)
│   │
│   └── MotionLazy/             # LazyMotion provider (legacy, no animations use it now)
│
├── constants/
│   ├── fonts.tsx               # geistSans, geistMono (next/font/local)
│   └── data/
│       ├── journey.ts          # Stages (CV-verbatim), skill groups, featured projects, contact, Drive URL
│       └── Service.tsx         # Skill icon list and full portfolio list (used by /skill and /portofolio)
│
├── hooks/
│   └── useTracking.ts          # PostHog section/click tracking
│
├── lib/
│   ├── mergeOpenGraph.ts       # OpenGraph metadata
│   └── utils.ts                # cn() class merger
│
└── providers/
    └── PostHogProvider.tsx     # PostHog init + SPA pageview tracking
```

## Directory Descriptions

### Root Level

#### `.bmad-core/`
BMad Method core configuration and resources for documentation management.

**Contents:**
- `core-config.yaml` - Project configuration for BMad Method

#### `.claude/`
Claude AI integration configuration for development assistance.

**Contents:**
- `commands/` - Custom Claude commands
- `settings.local.json` - Local Claude settings

#### `docs/`
Project documentation organized by type.

**Structure:**
```
docs/
└── architecture/
    ├── architecture.md      # System architecture documentation
    ├── tech-stack.md        # Technology stack details
    ├── source-tree.md       # This file
    ├── coding-standards.md  # Coding standards and conventions
    └── prd.md              # Product Requirements Document
```

#### `public/`
Static assets served directly without processing.

**Structure:**
```
public/
├── favicon.ico           # Site favicon
├── meta/                # Meta images (OG images, etc.)
│   └── PP.jpg
└── image/               # Images organized by category
    ├── clients/         # Client logos
    ├── skills/          # Technology/skill icons (PNG, plus Simple Icons SVGs for AI and tooling)
    ├── porto/           # Full-size project screenshots (portfolio page)
    ├── journey/         # Compact WebP textures for the 3D scene (screens, skill crates)
    │   └── stills/      # stage-0..11.webp: no-WebGL fallback stills rendered from the scene
    ├── PP.jpg           # Profile picture
    ├── Web.png          # Web screenshot
    ├── Web.jpg
    └── Mobile.png       # Mobile screenshot
```

The stills must be re-rendered whenever the scene changes (landmarks, character, lighting).

### Source Code (`src/`)

#### `src/app/` - Next.js App Router

The `app` directory uses Next.js 14's App Router pattern.

**Key Files:**

| File | Purpose | Type |
|------|---------|------|
| `layout.tsx` | Root layout wrapping all pages | Server Component |
| `page.tsx` | Home page route (/) | Server Component |
| `globals.css` | Global CSS styles | Stylesheet |
| `favicon.ico` | Site favicon | Asset |

**Routes:**

| Route | File Path | Description |
|-------|-----------|-------------|
| `/` | `app/page.tsx` | Home/landing page |
| `/skill` | `app/skill/page.tsx` | Skills showcase page |
| `/portofolio` | `app/portofolio/page.tsx` | Portfolio projects page |

#### `src/assets/` - Static Assets

Contains assets that need to be imported in source code (as opposed to `public/` for direct serving).

**Structure:**
- `fonts/` - Font files loaded via Next.js font optimization
  - `GeistMonoVF.woff` - Geist Mono variable font
  - `GeistVF.woff` - Geist variable font

#### `src/components/` - React Components

Reusable React components organized by feature or type.

##### `components/Journey/`
The career journey: a full-bleed WebGL town behind real DOM content.

| File | Purpose |
|------|---------|
| `index.tsx` | Builds one 100svh section per stage, maps scroll progress to `journey.stage`, renders the top bar, stepper and mobile panel toggle |
| `StageCard.tsx` | Card content per stage kind; all career text comes from `constants/data/journey.ts` |
| `WorldBackdrop.tsx` | Reuses the scene in `mode="backdrop"` (no walker, no pins, slow camera drift, CSS blur) for detail routes |
| `StaticWorld.tsx` | Fallback stills when WebGL is unavailable |
| `capability.ts` | Detects WebGL, low-power devices and `prefers-reduced-motion` |
| `store.ts` | Mutable state read every frame (`journey.stage`, `walker.x/z/speed`) plus easing helpers |

##### `components/Journey/World/`
The React Three Fiber scene. Everything is procedural geometry; there are no model files.

| File | Purpose |
|------|---------|
| `Scene.tsx` | Orthographic camera rig (follows the walker or drifts in backdrop mode), lights, ground, road, sidewalk, two-way traffic, pins and labels |
| `Character.tsx` | Cartoon walker: walks the sidewalk, steps into each yard, idles and waves; swap for a GLB later |
| `Landmarks.tsx` | Landmark per stage; work stops are 1–2 floor offices (Celerates is a tower) with themed yard props |
| `Kit.tsx` | Shared primitives and the shared contact-shadow texture |
| `palette.ts` | Material colours; keep in sync with `--j-*` tokens in `globals.css` |

##### `components/MotionLazy/`
Lazy-loaded Framer Motion provider kept from the previous version; nothing animates with it now.

#### `src/constants/` - Constants and Static Data

Configuration, constants, and static content.

| File | Purpose | Exports |
|------|---------|---------|
| `fonts.tsx` | Font definitions | `geistSans`, `geistMono` |
| `data/journey.ts` | Journey content (CV-verbatim) | `STAGES`, `SKILL_GROUPS`, `FEATURED_PROJECTS`, `SKILL_CRATES`, `CONTACT`, `PORTFOLIO_DRIVE_URL`, `STAGE_SPACING` |
| `data/Service.tsx` | Skill icons and portfolio list | `Skills`, `Skills2`, `ourPortofolio`, `ourClientData` |

#### `src/lib/` - Utility Functions

Helper functions and utilities used throughout the application.

| File | Purpose | Key Functions |
|------|---------|---------------|
| `utils.ts` | General utilities | `cn()` - class name merger |
| `mergeOpenGraph.ts` | OpenGraph utilities | `mergeOpenGraph()` - OG metadata |

## Configuration Files

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Key Settings:**
- Strict mode enabled
- Path alias `@/*` → `src/*`
- Module resolution: bundler

### Tailwind Configuration (`tailwind.config.ts`)

**Key Features:**
- Custom color system with CSS variables
- Custom font families (Montserrat, Inter, Poppins)
- Custom border radius system
- Inverted radius plugin
- Animation utilities

### Next.js Configuration (`next.config.mjs`)

Currently using default configuration. Can be extended for:
- Image optimization settings
- Internationalization
- Redirects and rewrites
- Environment variables
- Custom webpack configuration

### PostCSS Configuration (`postcss.config.mjs`)

Processes Tailwind CSS directives and other PostCSS plugins.

## File Naming Conventions

### Components
- **React Components**: PascalCase with `.tsx` extension
  - Example: `Button.tsx`, `HomePage.tsx`
- **Component Files**: `index.tsx` for main export
  - Example: `components/Home/index.tsx`

### Utilities
- **Utility Files**: camelCase with `.ts` extension
  - Example: `utils.ts`, `mergeOpenGraph.ts`

### Routes
- **Page Files**: `page.tsx` for route endpoints
- **Layout Files**: `layout.tsx` for route layouts

### Styles
- **CSS Files**: kebab-case with `.css` extension
  - Example: `globals.css`

### Configuration
- **Config Files**: kebab-case with appropriate extension
  - Example: `tailwind.config.ts`, `next.config.mjs`

## Import Path Conventions

### Absolute Imports (Preferred)
```typescript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { inter } from '@/constants/fonts'
```

### Relative Imports (When Necessary)
```typescript
import Desktop from './Desktop'
import Mobile from './Mobile'
```

## File Organization Best Practices

### Component Organization
```
ComponentName/
├── index.tsx          # Main component export
├── ComponentName.tsx  # Component implementation (optional)
├── types.ts          # TypeScript types (if complex)
└── utils.ts          # Component-specific utilities (if needed)
```

### Feature-Based Organization
Components are organized by feature (Home, Marquee) or type (ui).

## Generated Directories (Not in Source Control)

### `.next/`
Next.js build output and cache.
- Server files
- Static files
- Build manifest
- Cache

### `node_modules/`
npm package dependencies.

## Public Assets Organization

### Images
```
public/image/
├── clients/     # Client/company logos
├── skills/      # Technology/skill icons
├── porto/       # Project screenshots
├── journey/     # 3D scene textures + fallback stills
├── PP.jpg       # Profile picture
├── Web.png      # Screenshots
└── Mobile.png
```

**Image Formats:**
- `.png` - For logos and icons with transparency
- `.jpg` - For photographs
- `.webp` - For optimized web images

## Documentation Organization

```
docs/
├── architecture/
│   ├── architecture.md        # System design
│   ├── tech-stack.md          # Technologies used
│   ├── source-tree.md         # This file
│   ├── coding-standards.md    # Code conventions
│   └── prd.md                 # Product requirements
├── prd/                       # Sharded PRD (if used)
└── stories/                   # User stories (if used)
```

## Build Output Structure

### Production Build
```
.next/
├── cache/              # Build cache
├── server/             # Server-side code
│   ├── app/           # App routes
│   └── chunks/        # Code chunks
└── static/            # Static assets
    ├── chunks/        # JavaScript chunks
    ├── css/           # CSS files
    └── media/         # Optimized media
```

## Source Code Metrics

### Current Structure (Approximate)
- **Total Source Files**: 27 TypeScript/TSX files
- **Journey components**: 7 DOM files + 5 scene files
- **Pages/Routes**: 3 routes (home journey, skill, portfolio)

### Lines of Code (Estimated)
- **Application Code**: ~3,500 lines (about 2,100 in `components/Journey`, including the 3D scene)
- **Styles**: ~1,300 lines (`globals.css`)

## Future Structure Considerations

### Potential Additions
```
src/
├── app/
│   └── api/              # API routes
│       └── contact/      # Contact form API
├── components/
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── common/           # Common components
├── hooks/                # Custom React hooks
├── types/                # Global TypeScript types
├── config/               # Application configuration
├── services/             # API services
└── utils/
    ├── api/              # API utilities
    └── validation/       # Form validation
```

## Version Control

### Git Structure
- **Main Branch**: `main`
- **Ignored Files**: See `.gitignore`
  - `node_modules/`
  - `.next/`
  - `.env*.local`
  - Build outputs
  - `.impeccable/` (design-skill workspace)

## Key Architectural Decisions

### 1. App Router Over Pages Router
- Using Next.js 14 App Router for modern routing
- Server Components by default
- Improved performance and developer experience

### 2. TypeScript Throughout
- All source files use TypeScript
- Strict mode enabled for type safety

### 3. Component Colocation
- Components organized by feature
- Related files kept together

### 4. Path Aliases
- `@/*` alias for cleaner imports
- Reduces import path complexity

### 5. DOM Content Over a WebGL World
- Every word on the journey is real DOM text; the canvas is decoration (`aria-hidden`)
- Scroll position is the single input: `journey.stage` in `store.ts` drives walker, camera and the stepper
- Scene state lives outside React and is read in `useFrame`, so scrolling never re-renders React per frame
- Fallbacks: reduced motion snaps to stops; no WebGL shows pre-rendered stills

## Navigation & Routing Map

```
/ (Home: 12-stop scroll journey)
│   Start → Gunadarma → Adicipta → Celerates → Gordi → Pama Persada → Mitra Solusi
│   → Astra → Radiant → Skills → Projects → Contact
├── /skill (Skills inventory)
└── /portofolio (Project manifest)
```

**Route Structure:**
- Flat hierarchy (no nested routes currently)
- Direct navigation between main sections
- Client-side navigation via Next.js Link

## Conclusion

This source tree follows modern Next.js 14 conventions with a clear separation of concerns. The structure is designed for:
- **Maintainability**: Clear organization and naming
- **Scalability**: Easy to add new features
- **Performance**: Optimized with lazy loading and code splitting
- **Developer Experience**: Logical structure with path aliases

The modular organization allows for easy navigation and understanding of the codebase while maintaining flexibility for future enhancements.
