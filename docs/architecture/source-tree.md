# Source Tree Documentation

## Overview

This document provides a comprehensive overview of the project's directory structure, file organization, and the purpose of each component within the codebase.

## Project Root Structure

```
hendy_nurfrianto/
├── .bmad-core/              # BMad Method configuration and resources
├── .claude/                 # Claude AI configuration and commands
├── .git/                    # Git version control
├── .next/                   # Next.js build output (generated)
├── docs/                    # Project documentation
│   └── architecture/        # Architecture documentation
├── node_modules/            # npm dependencies (generated)
├── public/                  # Static assets served directly
├── src/                     # Source code (main application)
├── .gitignore              # Git ignore rules
├── components.json          # shadcn/ui configuration
├── LICENSE                  # Project license
├── next.config.mjs          # Next.js configuration
├── next-env.d.ts           # Next.js TypeScript declarations
├── package.json            # npm package configuration
├── package-lock.json       # npm lock file
├── postcss.config.mjs      # PostCSS configuration
├── README.md               # Project readme
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Source Directory Structure (`src/`)

### Complete Source Tree

```
src/
├── app/                    # Next.js 14 App Router
│   ├── favicon.ico        # Site favicon
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page (/)
│   ├── portofolio/        # Portfolio page route
│   │   └── page.tsx       # Portfolio page component
│   └── skill/             # Skills page route
│       └── page.tsx       # Skills page component
│
├── assets/                # Static assets (fonts, images)
│   └── fonts/            # Custom font files
│       ├── GeistMonoVF.woff
│       └── GeistVF.woff
│
├── components/            # React components
│   ├── Home/             # Home page components
│   │   ├── index.tsx     # Home page main component
│   │   ├── Desktop.tsx   # Desktop layout variant
│   │   └── Mobile.tsx    # Mobile layout variant
│   │
│   ├── Marquee/          # Marquee scrolling component
│   │   └── index.tsx
│   │
│   ├── MotionLazy/       # Lazy-loaded Framer Motion wrapper
│   │   ├── index.tsx     # Main component
│   │   └── features.tsx  # Motion features configuration
│   │
│   └── ui/               # UI primitives (Radix UI based)
│       ├── button.tsx    # Button component
│       └── carousel.tsx  # Carousel component
│
├── constants/             # Static data and configuration
│   ├── fonts.tsx         # Font definitions and imports
│   └── data/             # Static content data
│       └── Service.tsx   # Service/offering data
│
└── lib/                   # Utility functions and helpers
    ├── mergeOpenGraph.ts # OpenGraph metadata utilities
    └── utils.ts          # General utility functions
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
    ├── skills/          # Technology/skill icons
    ├── PP.jpg           # Profile picture
    ├── Web.png          # Web screenshot
    ├── Web.jpg
    └── Mobile.png       # Mobile screenshot
```

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

##### `components/Home/`
Home page-specific components with responsive variants.

| File | Purpose |
|------|---------|
| `index.tsx` | Main Home component wrapper |
| `Desktop.tsx` | Desktop layout implementation |
| `Mobile.tsx` | Mobile layout implementation |

##### `components/Marquee/`
Marquee/scrolling text component implementation.

##### `components/MotionLazy/`
Lazy-loaded Framer Motion wrapper to reduce initial bundle size.

| File | Purpose |
|------|---------|
| `index.tsx` | Lazy loading wrapper component |
| `features.tsx` | Motion features configuration |

##### `components/ui/`
Base UI components following Radix UI patterns.

| Component | Purpose | Based On |
|-----------|---------|----------|
| `button.tsx` | Button component with variants | Radix UI Slot |
| `carousel.tsx` | Carousel component | Embla Carousel + Radix UI |

#### `src/constants/` - Constants and Static Data

Configuration, constants, and static content.

| File | Purpose | Exports |
|------|---------|---------|
| `fonts.tsx` | Font definitions | `inter`, `montserrat`, `poppins` |
| `data/Service.tsx` | Service/offering data | Service list data |

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
- **Total Source Files**: ~25-30 TypeScript/TSX files
- **Components**: ~12 components
- **Pages/Routes**: 3 routes (home, skill, portfolio)
- **Utility Files**: 2 files
- **Configuration Files**: 5 files

### Lines of Code (Estimated)
- **Application Code**: ~1,000-1,500 lines
- **Configuration**: ~200 lines
- **Styles**: ~100 lines

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

## Navigation & Routing Map

```
/ (Home)
├── /skill (Skills Page)
└── /portofolio (Portfolio Page)
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
