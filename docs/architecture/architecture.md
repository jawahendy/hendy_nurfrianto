# Architecture Documentation

## Project Overview

**Project Name:** Hendy Nurfrianto Portfolio
**Type:** Personal Portfolio/CV Website
**Version:** 0.1.0
**Framework:** Next.js 14 (React 18)

## System Architecture

### High-Level Architecture

This is a modern, single-page application (SPA) portfolio website built using Next.js 14 with the App Router pattern. The application follows a component-based architecture with a clear separation of concerns.

```
┌─────────────────────────────────────────────────────────┐
│                     Client Browser                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │           Next.js App Router (React 18)           │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         Page Components (Routes)            │  │  │
│  │  │  - Home (/)                                 │  │  │
│  │  │  - Skills (/skill)                          │  │  │
│  │  │  - Portfolio (/portofolio)                  │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         Shared Components                    │  │  │
│  │  │  - UI Components (Radix UI)                 │  │  │
│  │  │  - Motion Components (Framer Motion)        │  │  │
│  │  │  - Marquee, Carousel                        │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │         Utilities & Constants               │  │  │
│  │  │  - Fonts, Data, Utils                       │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Architecture Patterns

#### 1. **App Router Architecture (Next.js 14)**
- Uses the modern Next.js App Router for routing and layouts
- Server Components by default for optimal performance
- Client Components marked with 'use client' directive where needed

#### 2. **Component-Based Architecture**
- Atomic design principles with reusable UI components
- Component composition for complex features
- Separation between UI components and page components

#### 3. **Feature-Based Organization**
```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable components
├── constants/        # Static data and configuration
├── lib/             # Utility functions and helpers
└── assets/          # Static assets (fonts, images)
```

## Core Components

### 1. **Application Layer** (`src/app/`)
- **Root Layout** (`layout.tsx`): Global layout with font configuration and metadata
- **Home Page** (`page.tsx`): Landing page
- **Skills Page** (`skill/page.tsx`): Skills showcase
- **Portfolio Page** (`portofolio/page.tsx`): Project portfolio

### 2. **Component Layer** (`src/components/`)
- **Home Components**: Desktop and Mobile variants
- **MotionLazy**: Lazy-loaded Framer Motion wrapper for animations
- **Marquee**: Scrolling text/content display
- **UI Components**: Radix UI-based components (Button, Carousel)

### 3. **Utilities Layer** (`src/lib/`)
- **utils.ts**: General utility functions (class merging)
- **mergeOpenGraph.ts**: OpenGraph metadata utilities

### 4. **Constants Layer** (`src/constants/`)
- **fonts.tsx**: Font definitions (Montserrat, Inter, Poppins)
- **data/**: Static content and service data

## Technical Architecture

### Frontend Architecture

#### Rendering Strategy
- **Server-Side Rendering (SSR)**: Default for all routes
- **Static Generation**: Can be implemented for static content
- **Client-Side Rendering**: Used for interactive components with animations

#### State Management
- React Context API (if needed)
- Component-level state with hooks
- No external state management library (Redux/Zustand) currently implemented

#### Styling Architecture
- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: Custom properties for theming
- **Global Styles**: `app/globals.css` for base styles
- **Component Styles**: Co-located with components using Tailwind classes

### Animation Architecture
- **Framer Motion**: For page transitions and component animations
- **MotionLazy**: Lazy loading wrapper to optimize bundle size
- **Embla Carousel**: For carousel functionality with autoplay and wheel gestures

### Font Management
- Custom font loading with Next.js font optimization
- Variable fonts for multiple font families:
  - Montserrat (primary)
  - Inter
  - Poppins

## Data Flow

### Static Content Flow
```
Constants/Data → Components → Pages → Browser
```

### User Interaction Flow
```
User Event → Component Handler → State Update → Re-render
```

### Animation Flow
```
Page Load → MotionLazy Wrapper → Framer Motion → Animated Components
```

## Build & Deployment Architecture

### Build Process
1. **TypeScript Compilation**: Type checking and transpilation
2. **Next.js Build**: Optimizes React components and generates routes
3. **Asset Optimization**: Image optimization, font subsetting
4. **Bundle Generation**: Optimized JavaScript bundles with code splitting

### Deployment Strategy
- Static export support via Next.js
- Server-side deployment for dynamic features
- Edge deployment support (Vercel, Netlify, Cloudflare Pages)

## Performance Optimizations

1. **Code Splitting**: Automatic route-based code splitting
2. **Lazy Loading**: MotionLazy component for on-demand animation library loading
3. **Font Optimization**: Next.js font optimization with variable fonts
4. **Image Optimization**: Next.js Image component (when used)
5. **Tree Shaking**: Unused code elimination during build

## Security Considerations

1. **TypeScript**: Type safety to prevent runtime errors
2. **Strict Mode**: Enabled in TypeScript configuration
3. **No External API Calls**: Fully static content (currently)
4. **Content Security**: No user-generated content or forms

## Scalability Considerations

### Current Scale
- Single-user portfolio site
- Static content with no backend
- Minimal external dependencies

### Future Scalability
- Can add CMS integration (Contentful, Sanity)
- Can add backend API routes for contact forms
- Can implement dynamic content loading
- Can add analytics and monitoring

## Dependencies Architecture

### Core Dependencies
- **next**: 14.2.30 - Framework
- **react**: ^18 - UI library
- **react-dom**: ^18 - React rendering
- **typescript**: ^5 - Type system

### UI & Styling
- **tailwindcss**: ^3.4.1 - Styling framework
- **framer-motion**: ^12.18.1 - Animations
- **@radix-ui/react-slot**: ^1.2.3 - Unstyled UI primitives

### Utilities
- **clsx**: ^2.1.1 - Class name utility
- **tailwind-merge**: ^3.3.1 - Tailwind class merging
- **class-variance-authority**: ^0.7.1 - Variant styling

### Carousel & Motion
- **embla-carousel-react**: ^8.6.0 - Carousel library
- **embla-carousel-autoplay**: ^8.6.0 - Autoplay plugin
- **embla-carousel-auto-scroll**: ^8.6.0 - Auto-scroll plugin
- **embla-carousel-wheel-gestures**: ^8.0.2 - Wheel gesture support

## Integration Points

### External Integrations
- **BMad Method**: Documentation management system
- **Lucide React**: Icon library

### Future Integration Possibilities
- Analytics (Google Analytics, Plausible)
- CMS (Headless CMS integration)
- Contact forms (EmailJS, Formspree)
- Blog (MDX support)

## Development Architecture

### Development Environment
- **Node.js**: Runtime environment
- **npm**: Package manager
- **ESLint**: Code linting with Next.js configuration
- **TypeScript**: Static type checking

### Development Workflow
1. Local development: `npm run dev`
2. Linting: `npm run lint`
3. Production build: `npm run build`
4. Production server: `npm run start`

## Documentation Architecture

### BMad Method Integration
The project uses BMad Method for comprehensive documentation management:
- **Core Config**: `.bmad-core/core-config.yaml`
- **Architecture Docs**: `docs/architecture/`
- **PRD**: `docs/prd.md`
- **Stories**: `docs/stories/`

## Future Architecture Enhancements

1. **Backend Integration**: Add API routes for dynamic features
2. **CMS Integration**: Connect to headless CMS for content management
3. **Authentication**: Add user authentication for admin features
4. **Database**: Integrate database for dynamic content storage
5. **Testing**: Add comprehensive test suite (Jest, Testing Library)
6. **CI/CD**: Implement automated testing and deployment pipelines
7. **Monitoring**: Add error tracking and performance monitoring
8. **SEO**: Enhanced SEO with dynamic metadata and structured data

## Conclusion

This architecture provides a solid foundation for a modern, performant portfolio website. The modular structure allows for easy maintenance and future enhancements while maintaining optimal performance and user experience.
