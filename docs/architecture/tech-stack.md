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

### UI Framework & Components

| Library | Version | Purpose | Usage |
|---------|---------|---------|-------|
| **Radix UI** | ^1.2.3 | Unstyled, accessible UI primitives | Button, Carousel slots |
| **@radix-ui/react-slot** | ^1.2.3 | Composition utility for merging props | Component composition |
| **Lucide React** | ^0.522.0 | Icon library with React components | Icons throughout the app |

### Styling

| Technology | Version | Purpose | Features |
|-----------|---------|---------|----------|
| **Tailwind CSS** | ^3.4.1 | Utility-first CSS framework | Responsive design, custom utilities |
| **PostCSS** | ^8 | CSS transformation tool | Tailwind processing |
| **tailwindcss-animate** | ^1.0.7 | Animation utilities for Tailwind | Pre-built animations |
| **@butterfail/tailwindcss-inverted-radius** | ^0.1.2 | Custom border radius utilities | Inverted radius effects |
| **tailwind-merge** | ^3.3.1 | Merge Tailwind classes intelligently | Conflict resolution |
| **clsx** | ^2.1.1 | Utility for constructing className strings | Conditional classes |
| **class-variance-authority** | ^0.7.1 | Variant-based component styling | Component variants |

### Animation & Motion

| Library | Version | Purpose | Features |
|---------|---------|---------|----------|
| **Framer Motion** | ^12.18.1 | Animation library for React | Page transitions, component animations |
| **Embla Carousel React** | ^8.6.0 | Carousel library | Image/content carousels |
| **embla-carousel-autoplay** | ^8.6.0 | Autoplay plugin for Embla | Automatic carousel progression |
| **embla-carousel-auto-scroll** | ^8.6.0 | Auto-scroll plugin | Continuous scrolling |
| **embla-carousel-wheel-gestures** | ^8.0.2 | Mouse wheel support | Enhanced user interaction |

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
- **Montserrat** (Primary font family)
- **Inter** (Secondary font)
- **Poppins** (Accent font)

All fonts are loaded via Next.js font optimization for optimal performance.

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
- No external APIs currently integrated
- All content is static

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
- Framer Motion via MotionLazy wrapper
- Component-level code splitting
- Dynamic imports where beneficial

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

## Monitoring & Analytics (Future)

### Recommended Tools
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
- Color system via CSS variables (HSL format)
- Spacing scale via Tailwind
- Typography scale (font families and sizes)
- Border radius system

### Accessibility
- Radix UI for accessible primitives
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

### Why Framer Motion?
- Powerful animation capabilities
- React-first API
- Spring animations for natural movement
- Gesture support
- Layout animations

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
