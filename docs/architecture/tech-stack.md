# Technology Stack

## Overview

This document provides a comprehensive overview of all technologies, frameworks, libraries, and tools used in the Hendy Nurfrianto Portfolio project.

## Core Technologies

### Runtime & Framework

| Technology | Version | Purpose | Documentation |
|-----------|---------|---------|---------------|
| **Node.js** | ^20 | JavaScript runtime environment | [nodejs.org](https://nodejs.org) |
| **Next.js** | 14.2.30 | React framework with SSR, routing, and optimization | [nextjs.org](https://nextjs.org) |
| **React** | ^18 | UI library for building component-based interfaces | [react.dev](https://react.dev) |
| **React DOM** | ^18 | React rendering for web browsers | [react.dev](https://react.dev) |
| **TypeScript** | ^5 | Typed superset of JavaScript | [typescriptlang.org](https://typescriptlang.org) |

### Language

- **TypeScript 5.x**: Primary development language
  - Strict mode enabled
  - Full type safety
  - Enhanced IDE support
  - Better code maintainability

## Frontend Stack

### 3D World (career journey)

| Library | Version | Purpose | Usage |
|---------|---------|---------|-------|
| **three** | ^0.169.0 | WebGL 3D engine | Orthographic isometric town, lighting, shadows |
| **@react-three/fiber** | ^8.17.10 | React renderer for three.js (React 18 line) | `Canvas`, `useFrame` render loop in `components/Journey/World` |
| **@react-three/drei** | ^9.117.3 | R3F helpers | `RoundedBox`, `Html` pin labels, `useTexture` |
| **@types/three** | ^0.169.0 | Type definitions (dev) | Strict TypeScript for scene code |

The 3D scene is procedural: no GLB/model files. Buildings, vehicles, trees and the
cartoon walker are composed from primitives in `World/Kit.tsx`, `World/Landmarks.tsx`
and `World/Character.tsx`. The scene chunk is loaded with `next/dynamic` (`ssr: false`),
so it never blocks first paint.

### UI Framework & Components

| Library | Version | Purpose | Usage |
|---------|---------|---------|-------|
| **Lucide React** | ^0.522.0 | Icon library with React components | Icons in the journey overlay and detail routes |
| **Simple Icons (SVG files)** | n/a | Brand logos (CC0) copied into `public/image/skills/*.svg` | AI and tooling logos on `/skill` |
| **@radix-ui/react-slot** | ^1.2.3 | Composition utility | *Installed but unused since the 3D redesign; candidate for removal* |

### Styling

| Technology | Version | Purpose | Features |
|-----------|---------|---------|----------|
| **Tailwind CSS** | ^3.4.1 | Utility-first CSS framework | Responsive design, custom utilities |
| **PostCSS** | ^8 | CSS transformation tool | Tailwind processing |
| **tailwindcss-animate** | ^1.0.7 | Animation utilities for Tailwind | Pre-built animations |
| **@butterfail/tailwindcss-inverted-radius** | ^0.1.2 | Custom border radius utilities | Inverted radius effects |
| **tailwind-merge** | ^3.3.1 | Merge Tailwind classes intelligently | Conflict resolution |
| **clsx** | ^2.1.1 | Utility for constructing className strings | Conditional classes |
| **class-variance-authority** | ^0.7.1 | Variant-based component styling | *Unused since the redesign; candidate for removal* |

### Animation & Motion

| Library | Version | Purpose | Features |
|---------|---------|---------|----------|
| **Framer Motion** | ^12.18.1 | Animation library for React | Only the `MotionLazy` provider remains; no component animates with it after the redesign |
| **Embla Carousel** (+ autoplay, auto-scroll, wheel-gestures) | ^8.x | Carousel library | *Unused since the redesign; candidates for removal* |

Motion in the journey is authored in the R3F render loop (`useFrame`), driven by scroll
progress in `components/Journey/store.ts`, plus CSS transitions on the overlay.

## Development Stack

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | ^8 | Code linting and quality checks |
| **eslint-config-next** | 14.2.30 | Next.js-specific ESLint rules |

### Build Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **Next.js Compiler** | 14.2.30 | Built-in Rust-based compiler (SWC) |
| **@next/swc-darwin-arm64** | Latest | Native compilation for Apple Silicon |
| **TypeScript Compiler** | ^5 | Type checking and transpilation |

## Type Definitions

| Package | Version | Purpose |
|---------|---------|---------|
| **@types/node** | ^20 | Node.js type definitions |
| **@types/react** | ^18 | React type definitions |
| **@types/react-dom** | ^18 | React DOM type definitions |

## Documentation & Methodology

| Tool | Version | Purpose |
|------|---------|---------|
| **@ptnglobal/bmad-method** | ^4.43.1 | Documentation and project management methodology |

## Font Stack

### Custom Fonts
- **Geist** (voice: headings, body, UI), local variable font `src/assets/fonts/GeistVF.woff`
- **Geist Mono** (periods, stop IDs, counts only), local `GeistMonoVF.woff`

Both are loaded with `next/font/local` in `src/constants/fonts.tsx`. Montserrat, Inter and
Poppins were removed in the redesign, so no Google Fonts request is made.

## Package Manager

- **npm**: Default package manager
  - Lock file: `package-lock.json`
  - Ensures consistent dependency versions

## Browser Support

### Target Browsers
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- ES2015+ JavaScript support
- CSS Grid and Flexbox support required

### Polyfills
- Minimal polyfills needed due to modern browser targets
- Next.js handles most compatibility concerns automatically

## Infrastructure & Deployment

### Compatible Deployment Platforms
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Cloudflare Pages**
- **AWS Amplify**
- **Self-hosted Node.js server**

### Deployment Requirements
- Node.js 18.17 or higher
- npm or yarn
- Build process: `npm run build`
- Start command: `npm start`

## Development Environment

### Minimum Requirements
- Node.js: v20.x or higher
- npm: v9.x or higher
- OS: macOS, Linux, or Windows
- RAM: 4GB minimum, 8GB recommended
- Disk Space: 500MB for dependencies

### IDE Recommendations
- **Visual Studio Code** (with extensions):
  - ESLint
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features
  - Prettier (optional)

## API & External Services

### Current Integration
- **PostHog** product analytics (`src/providers/PostHogProvider.tsx`, `src/hooks/useTracking.ts`),
  proxied through Next.js rewrites at `/ingest`. Events include `section_viewed`, `cta_clicked`,
  `project_clicked`, `stepper_clicked`, `panel_toggled`, `nav_clicked`, `portfolio_filter_used`.
- Portfolio archive links out to a Google Drive folder (`PORTFOLIO_DRIVE_URL` in `constants/data/journey.ts`).
- All page content is static (from `constants/data/`).

### Potential Integrations
- **Analytics**: Google Analytics, Plausible
- **Forms**: Formspree, EmailJS
- **CMS**: Contentful, Sanity, Strapi
- **Email**: SendGrid, Mailgun
- **Hosting/CDN**: Vercel Edge Network, Cloudflare

## Performance Optimization Technologies

### Built-in Optimizations
1. **Next.js Image Optimization**: Automatic image optimization and lazy loading
2. **Font Optimization**: Variable font loading and subsetting
3. **Code Splitting**: Automatic route-based splitting
4. **Tree Shaking**: Unused code elimination
5. **Minification**: JavaScript and CSS minification
6. **Compression**: Gzip/Brotli compression

### Lazy Loading
- The WebGL scene (`World/Scene.tsx`, ~169 KB gzip with three.js) is a dynamic import, loaded after first paint
- Detail routes reuse the same chunk for their blurred backdrop
- Scene textures are small WebP files in `public/image/journey/` (screens ≤ 768px, skill crates 128px)

### 3D Performance Budget
- Low-power devices (≤4 cores, ≤4 GB memory or width < 768px): no shadow maps, DPR capped at 1.25
- Backdrop mode on detail routes always caps DPR at 1.25 (it is blurred anyway)
- Shadow map 2048px that follows the camera; contact "blob" textures instead of extra shadow casters
- No WebGL: pre-rendered per-stop stills (`public/image/journey/stills/stage-N.webp`, ~560 KB total, only the active stop ±1 mounted)
- `prefers-reduced-motion`: walker and camera snap to stops, traffic and camera drift are parked

## Security Technologies

### Security Features
- TypeScript for type safety
- Next.js built-in security headers
- No unsafe dependencies (checked via npm audit)
- Strict Content Security Policy (can be configured)

### Dependency Security
- Regular dependency updates
- Automated security vulnerability scanning
- Lock file for consistent installations

## Testing Stack (Future)

### Recommended Testing Tools
- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Playwright/Cypress**: E2E testing
- **Lighthouse CI**: Performance testing

## Monitoring & Analytics

### In Use
- **PostHog**: product analytics (see API & External Services)

### Recommended Additions
- **Vercel Analytics**: Performance and user analytics
- **Sentry**: Error tracking
- **Google Analytics/Plausible**: User behavior analytics
- **Web Vitals**: Core Web Vitals monitoring

## Version Control

- **Git**: Version control system
- **GitHub**: Repository hosting (assumed)
- Current branch: `main`

## Design System

### Design Tokens
- The visual system is documented in `DESIGN.md` at the project root (generated with the Impeccable skill)
- Colour tokens are `--j-*` CSS custom properties in `src/app/globals.css`, mirrored for 3D materials in
  `src/components/Journey/World/palette.ts`; keep the two in sync
- Overlay components are plain CSS classes (`.j-card`, `.j-stepper`, `.j-btn`, …) in `globals.css`

### Accessibility
- All journey copy is real DOM text; the WebGL canvas is `aria-hidden`
- Semantic HTML structure
- ARIA attributes where needed
- Keyboard navigation support

## Architecture Patterns

### Supported Patterns
- Server Components (Next.js 14)
- Client Components ('use client')
- React Server Actions (can be implemented)
- API Routes (can be implemented)
- Middleware (can be implemented)

## Module System

- **ES Modules**: Modern JavaScript module system
- **TypeScript Modules**: Full ES6 module support
- **Path Aliases**: `@/*` pointing to `src/*`

## Code Quality Tools

### Current
- ESLint with Next.js configuration
- TypeScript strict mode
- Consistent code style

### Recommended Additions
- Prettier for code formatting
- Husky for git hooks
- Lint-staged for pre-commit checks
- Commitlint for conventional commits

## License

**Private Project**: This is a personal portfolio with private licensing.

## Technology Selection Rationale

### Why Next.js 14?
- Modern App Router for improved routing
- Built-in optimization features
- Excellent developer experience
- Strong TypeScript support
- Industry-standard for React applications

### Why Tailwind CSS?
- Utility-first approach speeds up development
- Small bundle size with purging
- Excellent responsive design utilities
- Extensive customization options
- Great developer experience

### Why React Three Fiber?
- Declarative three.js scenes in React, sharing state and props with the DOM overlay
- `useFrame` gives a per-frame loop for scroll-driven walking, traffic and camera without React re-renders
- drei provides production helpers (rounded geometry, DOM labels, texture loading)
- A real 3D world doubles as proof of the AR/VR/Unity side of the CV

### Why TypeScript?
- Type safety prevents bugs
- Better IDE support and autocomplete
- Self-documenting code
- Easier refactoring
- Industry standard

## Dependency Update Strategy

### Update Frequency
- **Major updates**: Quarterly review
- **Minor updates**: Monthly review
- **Patch updates**: Weekly review
- **Security updates**: Immediately

### Update Process
1. Review changelog
2. Test in development
3. Update package.json
4. Run tests (when implemented)
5. Deploy to staging (if available)
6. Deploy to production

## Conclusion

This tech stack provides a modern, performant, and maintainable foundation for a portfolio website. All technologies are well-documented, actively maintained, and represent current industry best practices.
