# Product Requirements Document (PRD)

## Hendy Nurfrianto Portfolio Website

**Version:** 2.0 (3D career journey redesign)
**Date:** 2026-10-19 (v1.0: 2025-11-03)
**Status:** In Production
**Author:** Hendy Nurfrianto
**Project Type:** Personal Portfolio / Online CV

---

## Executive Summary

The Hendy Nurfrianto Portfolio Website is a personal portfolio and online CV. Version 2.0 turns the home page into a scroll-driven career journey. A real-time 3D isometric town (React Three Fiber) renders behind real DOM content, and a cartoon walker moves from stop to stop as the visitor scrolls. Each stop is one stage of the CV, and the text on each card matches the CV word for word. The Skills and Portfolio pages sit over the same town, blurred, so the whole site reads as one world. Product truth lives in `PRODUCT.md` and the visual system in `DESIGN.md`.

### Key Highlights

- **3D career journey**: 12 stops (Start → Gunadarma → Adicipta → Celerates → Gordi → Pama Persada → Mitra Solusi → Astra → Radiant → Skills → Projects → Contact). Every work stop is an office building with themed props, with two-way traffic on the road
- **CV-verbatim content**: all career facts come from the CV PDF; no invented metrics or testimonials
- **Modern Tech Stack**: Next.js 14 App Router, React 18, TypeScript 5, three.js + React Three Fiber
- **Responsive Design**: right-hand cards on desktop; a foldable bottom sheet and pager stepper on mobile
- **Progressive enhancement**: real DOM text, a no-WebGL still fallback, `prefers-reduced-motion` snapping
- **Analytics**: PostHog section, CTA, stepper and panel events

---

## Table of Contents

1. [Product Vision & Goals](#product-vision--goals)
2. [Target Audience](#target-audience)
3. [User Personas](#user-personas)
4. [Features & Functionality](#features--functionality)
5. [User Stories](#user-stories)
6. [Technical Requirements](#technical-requirements)
7. [Design Requirements](#design-requirements)
8. [Non-Functional Requirements](#non-functional-requirements)
9. [Success Metrics](#success-metrics)
10. [Future Roadmap](#future-roadmap)
11. [Constraints & Dependencies](#constraints--dependencies)

---

## Product Vision & Goals

### Vision Statement

To create an outstanding personal portfolio that showcases technical expertise and professional experience in a visually stunning, performant, and user-friendly manner, setting the standard for modern portfolio websites.

### Primary Goals

1. **Professional Presence**: Establish a strong online professional presence
2. **Skill Showcase**: Demonstrate technical skills and capabilities effectively
3. **Portfolio Display**: Highlight completed projects with detailed information
4. **User Engagement**: Create an engaging, interactive experience for visitors
5. **Performance**: Deliver fast loading times and smooth interactions
6. **Accessibility**: Ensure the site is accessible to all users
7. **SEO Optimization**: Improve discoverability through search engines

### Business Objectives

- Attract potential employers and clients
- Showcase professional portfolio and achievements
- Demonstrate technical proficiency and modern development practices
- Generate leads for freelance or employment opportunities
- Build personal brand

---

## Target Audience

### Primary Audience

1. **Recruiters & Hiring Managers**
   - Looking for frontend/full-stack developers
   - Evaluating technical skills and experience
   - Seeking candidates with modern tech stack expertise

2. **Potential Clients**
   - Companies seeking freelance developers
   - Startups looking for technical talent
   - Agencies hiring contractors

3. **Industry Peers**
   - Fellow developers
   - Tech community members
   - Potential collaborators

### Secondary Audience

- Educational institutions
- Conference organizers
- Tech bloggers and journalists
- Open-source community

---

## User Personas

### Persona 1: Tech Recruiter Rachel

**Demographics:**
- Age: 30-45
- Role: Senior Technical Recruiter
- Industry: Technology
- Tech Savviness: Medium

**Goals:**
- Quickly assess candidate technical skills
- View portfolio of completed projects
- Understand technology expertise
- Contact potential candidates

**Pain Points:**
- Too much time spent evaluating candidates
- Difficulty assessing technical capabilities
- Poorly designed portfolios

**Needs:**
- Clear skill presentation
- Easy navigation
- Quick loading times
- Contact information readily available

### Persona 2: Startup CTO Michael

**Demographics:**
- Age: 28-40
- Role: CTO/Technical Lead
- Industry: Startup/Tech
- Tech Savviness: High

**Goals:**
- Find skilled developers for projects
- Evaluate code quality and technical approach
- Review completed project portfolio
- Assess cultural fit

**Pain Points:**
- Limited time for candidate evaluation
- Need to verify technical claims
- Difficulty finding specialists

**Needs:**
- Detailed project descriptions
- Technology stack information
- Code samples or GitHub links
- Professional presentation

### Persona 3: Fellow Developer Diana

**Demographics:**
- Age: 22-35
- Role: Software Developer
- Industry: Technology
- Tech Savviness: High

**Goals:**
- Networking and collaboration
- Learn about new technologies
- Share knowledge
- Find inspiration for own portfolio

**Pain Points:**
- Finding quality developer portfolios
- Staying updated with tech trends
- Building own portfolio

**Needs:**
- Modern design inspiration
- Technical implementation details
- Clear code structure
- Technology references

---

## Features & Functionality

### Core Features

#### 1. Home Page: Career Journey (`/`)

**Status:** ✅ Implemented (v2.0)

**Description:**
A scroll-driven 3D journey through the CV. Each 100svh scroll section is one stop. The walker walks the sidewalk to the next stop and steps into its yard, and the stop's card shows that stage.

**Key Elements:**
- **Hero (Start):** name, role, stack line, and the CV summary. Actions: "Walk the journey" and "Portfolio Drive". On mobile the summary is clamped with a "Read full summary" toggle
- **Stage cards:**
  - title, Role/Period rows (with a "Current" badge), CV bullets and stack chips;
  - on desktop, no card scrolls at 1280×720 and above.
- **Skills card:** the CV skill groups, plus a link to `/skill`
- **Projects card:** three featured projects, plus links to `/portofolio` and the Drive archive
- **Contact card:** email, LinkedIn, GitHub and the Drive archive
- **Top bar:** one proof chip ("Since 2019") and the nav (Skills, Portfolio, Contact)
- **Stepper:** 12 dated stops on desktop (click to travel); a prev/next pager on mobile
- **Mobile panel fold:** a chevron toggle collapses the card to its title. The choice is shared across stops
- **3D world:**
  - landmarks per employer and campus;
  - yards with bay paint;
  - two-way traffic: cars, box trucks, container trucks;
  - map pins with stop labels.

**Technical Implementation:**
- `components/Journey` (DOM) plus `components/Journey/World` (R3F scene, dynamic import, client only)
- Scroll progress is stored in `store.ts` and read every frame. React re-renders only on stop change
- Fallbacks:
  - no WebGL: pre-rendered stills per stop;
  - reduced motion: snap to stops, parked traffic;
  - low-power devices: no shadows, capped DPR.

**User Experience:**
- One continuous story instead of stacked sections
- The content is always readable, with the 3D as an enhancement
- Contact is never more than one action away (top-bar Contact)

---

#### 2. Skills Page (`/skill`)

**Status:** ✅ Implemented (v2.0)

**Description:**
A "Skills inventory": 54 tools grouped into shelf bays, over the blurred town.

**Skill Groups:**
Frontend, Mobile, AI (Claude Code, MCP with Claude, Vercel AI SDK, GitHub Copilot, Cursor), State & testing, Tools, Backend & data, Cloud & DevOps, Analytics & monitoring, Other.

**Technical Implementation:**
- Data from `constants/data/Service.tsx`, grouped by file name in `skill/page.tsx` (`CATALOG`)
- Icons: project PNGs plus Simple Icons SVGs (CC0) in `public/image/skills/`
- `WorldBackdrop` at the Skills stop: environment only, slow camera drift, CSS blur

---

#### 3. Portfolio Page (`/portofolio`)

**Status:** ✅ Implemented (v2.0)

**Description:**
A "Project manifest": 18 projects with a screenshot, type badge, stack line and a live link (or "Internal or archived"), filterable by All / Web / Mobile, over the blurred town.

**Technical Implementation:**
- Data from `ourPortofolio` in `constants/data/Service.tsx`
- Segmented filter with counts; `portfolio_filter_used` and `project_clicked` events
- The footer CTA opens the portfolio Google Drive archive

---

#### 4. Layout & Navigation

**Status:** ✅ Implemented

**Key Elements:**
- Root layout with Geist and Geist Mono (local fonts), metadata and OpenGraph
- PostHog provider with SPA pageview and page-leave tracking
- Detail routes share `SubHeader` (back to the journey, Skills, Portfolio, Drive)

---

### Supporting Features

#### 1. Procedural 3D Kit
- `Block`, `OfficeBuilding` (1–2 floors), `GableRoof` (ribbed), `Truck` (box/container), `Car`, `Tree`, `Pin`, `Screen`, `ContactBlob`
- A cartoon walker (`Character.tsx`) with a walk cycle, idle and wave. It can be swapped for a rigged GLB later

#### 2. Capability & Fallbacks
- `capability.ts` detects WebGL, low-power devices and reduced motion
- `StaticWorld.tsx` cross-fades the stills for the active stop and its neighbours

#### 3. Utilities
- `cn()` for class merging, `mergeOpenGraph()` for OpenGraph metadata
- `useSectionTracking` / `useClickTracking` (PostHog)

---

## User Stories

### Epic 1: Browse Portfolio

**US-001: View Home Page**
```
As a visitor
I want to see the home page with profile information
So that I can learn about Hendy Nurfrianto and navigate to other sections

Acceptance Criteria:
- ✅ Profile image is displayed
- ✅ Name and title are visible
- ✅ Brief introduction is shown
- ✅ Navigation buttons are present
- ✅ Page loads in under 2 seconds
- ✅ Mobile and desktop layouts work correctly
```

**US-002: View Skills**
```
As a recruiter
I want to see all technical skills organized by category
So that I can quickly assess technical capabilities

Acceptance Criteria:
- ✅ Skills are displayed with icons
- ✅ Skills are organized in a grid
- ✅ All skill categories are visible
- ✅ Skills animate on page load
- ✅ Page is responsive on all devices
- ✅ Back button returns to home
```

**US-003: View Portfolio Projects**
```
As a potential client
I want to see completed projects with details
So that I can evaluate project experience and quality

Acceptance Criteria:
- ✅ Projects are displayed as cards
- ✅ Each project shows thumbnail, name, and technologies
- ✅ Projects have links to live sites (when available)
- ✅ Layout is responsive
- ✅ Projects animate on load
- ✅ Technology tags are visible
```

### Epic 2: Navigation

**US-004: Navigate Between Pages**
```
As a user
I want to easily navigate between different sections
So that I can explore the entire portfolio

Acceptance Criteria:
- ✅ Navigation is intuitive
- ✅ Back buttons work correctly
- ✅ Page transitions are smooth
- ✅ Browser back/forward buttons work
- ✅ URLs are shareable
```

### Epic 3: Performance

**US-005: Fast Loading**
```
As a user on mobile
I want the site to load quickly
So that I can access information without waiting

Acceptance Criteria:
- ✅ Initial page load < 2 seconds
- ✅ Images are optimized
- ✅ JavaScript bundle is minimized
- ✅ Lazy loading is implemented
- ✅ Server-side rendering is used
```

### Epic 4: Accessibility

**US-006: Keyboard Navigation**
```
As a user who relies on keyboard navigation
I want to navigate the entire site using keyboard
So that I can access all features without a mouse

Acceptance Criteria:
- ✅ All interactive elements are keyboard accessible
- ✅ Tab order is logical
- ✅ ARIA labels are present
- ✅ Focus indicators are visible
```

---

## Technical Requirements

### Frontend Requirements

| Requirement | Technology | Version | Status |
|-------------|-----------|---------|--------|
| Framework | Next.js | 14.2.30 | ✅ |
| UI Library | React | ^18 | ✅ |
| Language | TypeScript | ^5 | ✅ |
| Styling | Tailwind CSS | ^3.4.1 | ✅ |
| 3D Engine | three.js | ^0.169.0 | ✅ |
| 3D Renderer | @react-three/fiber | ^8.17.10 | ✅ |
| 3D Helpers | @react-three/drei | ^9.117.3 | ✅ |
| Icons | Lucide React | ^0.522.0 | ✅ |
| Analytics | posthog-js | ^1.393.3 | ✅ |

### Development Requirements

- **Node.js**: v20 or higher
- **Package Manager**: npm
- **Build Tool**: Next.js built-in (SWC)
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode

### Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Requirements

- **First Contentful Paint (FCP)**: < 1.5 seconds
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **Time to Interactive (TTI)**: < 3 seconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### SEO Requirements

- ✅ Meta tags (title, description)
- ✅ OpenGraph tags for social media
- ✅ Semantic HTML
- ✅ Fast loading times
- ✅ Mobile-friendly
- 🔄 Structured data (Schema.org) - Future
- 🔄 XML sitemap - Future
- 🔄 robots.txt - Future

---

## Design Requirements

The full visual system (tokens, components, 3D materials, named rules) is documented in `DESIGN.md`. The summary:

### Design System

**Colour:**
- Porcelain-cool ground (`#e0e7f5`), white walls, cobalt structure and actions (`#2f5bea`)
- **One amber** (`#f4a51c`) reserved for "you are here": the active stop, the walker's hoodie and the active stepper dot
- Tokens are `--j-*` CSS variables in `globals.css`, mirrored in `World/palette.ts`

**Typography:**
- **Geist**: headings, body, UI
- **Geist Mono**: periods, stop IDs and counts only

**Panels:**
- Solid white, 20px radius, 1px ink hairline, soft two-layer shadow; no glass or transparency over the world

### Visual Design

**World:**
- Orthographic isometric low-poly town; soft-edged blocks, ribbed cobalt roofs, contact shadows
- The walker is a rounded cartoon at human scale relative to the buildings

**Animation Principles:**
- Motion is scroll-driven (walk, step-in), with ambient traffic and, on detail routes, a slow camera drift
- UI transitions are 200–300ms with `cubic-bezier(0.16, 1, 0.3, 1)`
- Reduced motion snaps the walker and parks traffic

**Responsive Breakpoints:**
- Compact: < 1024px (bottom sheet, pager stepper, foldable panel, active label only)
- Desktop: ≥ 1024px (right-hand card, 12-stop stepper)
- Short desktop: ≥ 1024px and height ≤ 800px (tighter card type)

### Layout Patterns

- One card per stop. No card grids on the journey
- Detail routes: the page head in a panel; skills in masonry bays; projects in a 1/2/3-column tile grid

---

## Non-Functional Requirements

### Performance

1. **Loading Performance**
   - Initial load < 2 seconds
   - Subsequent page loads < 1 second
   - Image lazy loading
   - Code splitting

2. **Runtime Performance**
   - Smooth 60 FPS animations
   - No jank or stuttering
   - Efficient re-renders
   - Optimized bundle size

### Security

1. **Content Security**
   - No user-generated content (static site)
   - Safe external links (target="_blank" with rel attributes)
   - No sensitive data exposure

2. **Dependency Security**
   - Regular security audits
   - Updated dependencies
   - No known vulnerabilities

### Scalability

1. **Content Scalability**
   - Easy to add new projects
   - Easy to add new skills
   - Maintainable codebase

2. **Traffic Scalability**
   - Static site can handle high traffic
   - CDN support
   - Cacheable assets

### Maintainability

1. **Code Quality**
   - TypeScript for type safety
   - ESLint for code quality
   - Consistent coding standards
   - Component modularity

2. **Documentation**
   - Architecture documentation
   - Code comments where needed
   - README with setup instructions
   - BMad Method integration

### Accessibility (WCAG 2.1 Level AA)

1. **Keyboard Navigation**
   - All interactive elements keyboard accessible
   - Logical tab order
   - Skip links (future)

2. **Screen Reader Support**
   - ARIA labels
   - Semantic HTML
   - Alt text for images

3. **Visual Accessibility**
   - Sufficient color contrast
   - Readable font sizes
   - Focus indicators
   - No content flashing

### Reliability

1. **Uptime**
   - 99.9% uptime target
   - Fast recovery from failures

2. **Error Handling**
   - Graceful degradation
   - Error boundaries (future)
   - Fallback content

---

## Success Metrics

### Key Performance Indicators (KPIs)

1. **User Engagement**
   - Average session duration: > 2 minutes
   - Pages per session: > 2 pages
   - Bounce rate: < 40%

2. **Performance Metrics**
   - Lighthouse Performance Score: > 90
   - Lighthouse Accessibility Score: > 95
   - Lighthouse Best Practices Score: > 90
   - Lighthouse SEO Score: > 95

3. **Technical Metrics**
   - Build time: < 1 minute
   - Bundle size: < 500KB (initial)
   - Core Web Vitals: All green

4. **Business Metrics**
   - Contact form submissions (future): > 5/month
   - Project inquiries: > 2/month
   - Social shares: > 10/month

### Analytics (Future Implementation)

- Google Analytics or Plausible
- User flow tracking
- Event tracking (button clicks, page views)
- Conversion tracking

---

## Future Roadmap

### Phase 2 (Q1 2026)

**Priority: High**
- ✨ Contact form implementation
- ✨ Blog/Articles section
- ✨ Dark mode toggle
- ✨ Enhanced SEO (sitemap, robots.txt)
- ✨ Analytics integration

**Priority: Medium**
- Case study pages for projects
- Testimonials section
- Resume/CV download
- Social media integration
- Newsletter subscription

### Phase 3 (Q2 2026)

**Priority: High**
- CMS integration (Contentful/Sanity)
- Search functionality
- Filter/sort projects and skills

**Priority: Medium**
- Multi-language support (i18n)
- Advanced animations
- 3D elements
- Interactive project demos

### Phase 4 (Q3 2026)

**Priority: Low**
- Admin dashboard
- Dynamic content management
- A/B testing
- Advanced analytics
- Performance monitoring (Sentry)

### Continuous Improvements

- Regular dependency updates
- Performance optimization
- SEO enhancements
- Accessibility improvements
- Content updates

---

## Constraints & Dependencies

### Technical Constraints

1. **Static Site Limitation**
   - No server-side dynamic content (currently)
   - No database integration (currently)
   - Limited to static data

2. **Build Process**
   - Requires Node.js v20+
   - Build time increases with content

3. **Browser Compatibility**
   - Modern browsers only
   - No IE11 support

### External Dependencies

1. **Hosting/Deployment**
   - Requires hosting platform (Vercel recommended)
   - CDN for optimal performance

2. **Third-Party Services (Future)**
   - Email service for contact form
   - Analytics service
   - CMS service (optional)

### Resource Constraints

1. **Development**
   - Single developer (Hendy Nurfrianto)
   - Time limitations
   - Budget constraints for services

2. **Content**
   - Content creation time
   - Image/asset sourcing
   - Portfolio project availability

---

## Risk Assessment

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|------------|------------|
| Dependency vulnerabilities | High | Medium | Regular updates, security audits |
| Performance degradation | High | Low | Performance monitoring, optimization |
| Browser compatibility | Medium | Low | Cross-browser testing |
| Build failures | Medium | Low | CI/CD, automated testing |

### Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|------------|------------|
| Low user engagement | High | Medium | SEO, marketing, social media |
| Outdated content | Medium | High | Regular updates, content calendar |
| Competition | Medium | High | Unique design, quality content |

---

## Compliance & Legal

### Privacy

- No personal data collection (currently)
- Privacy policy (future, if contact form added)
- Cookie policy (if analytics added)

### Accessibility

- WCAG 2.1 Level AA compliance
- Regular accessibility audits

### Licensing

- Code: Private/Proprietary
- Dependencies: Various open-source licenses (MIT, Apache 2.0)
- Assets: Personal ownership or licensed

---

## Appendices

### Appendix A: Technology Stack Details

See `tech-stack.md` for complete technology documentation.

### Appendix B: Architecture Documentation

See `architecture.md` for system architecture details.

### Appendix C: Source Code Structure

See `source-tree.md` for complete codebase organization.

### Appendix D: Coding Standards

See `coding-standards.md` for development guidelines.

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-03 | Hendy Nurfrianto | Initial PRD creation |

---

## Approval

**Product Owner:** Hendy Nurfrianto
**Status:** Approved
**Date:** 2025-11-03

---

**End of Product Requirements Document**
