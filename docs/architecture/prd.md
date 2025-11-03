# Product Requirements Document (PRD)

## Hendy Nurfrianto Portfolio Website

**Version:** 1.0
**Date:** 2025-11-03
**Status:** In Production
**Author:** Hendy Nurfrianto
**Project Type:** Personal Portfolio / Online CV

---

## Executive Summary

The Hendy Nurfrianto Portfolio Website is a modern, interactive personal portfolio and online CV designed to showcase professional skills, experience, and projects. Built with cutting-edge web technologies including Next.js 14, React 18, TypeScript, and Tailwind CSS, the site provides an engaging user experience with smooth animations, glassmorphic design elements, and responsive layouts optimized for all devices.

### Key Highlights

- **Modern Tech Stack**: Next.js 14 with App Router, React 18, TypeScript 5
- **Responsive Design**: Mobile-first approach with desktop and tablet optimization
- **Interactive Animations**: Framer Motion for smooth page transitions and component animations
- **Glassmorphic UI**: Modern design with backdrop blur and transparency effects
- **Performance Optimized**: Server-side rendering, code splitting, and lazy loading
- **Accessibility First**: ARIA labels, semantic HTML, keyboard navigation

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

#### 1. Home Page (`/`)

**Status:** ✅ Implemented

**Description:**
Interactive landing page with profile information, brief introduction, and navigation to other sections.

**Key Elements:**
- Profile picture/avatar
- Name and title/role
- Brief introduction/tagline
- Navigation to Skills and Portfolio pages
- Responsive layout (Desktop & Mobile variants)
- Background image with overlay
- Glassmorphic design elements
- Smooth animations on load

**Technical Implementation:**
- Server Component (default)
- Responsive design with separate Desktop/Mobile components
- Framer Motion animations
- Tailwind CSS styling
- Background image optimization

**User Experience:**
- First impression optimization
- Fast loading time
- Clear call-to-action buttons
- Smooth transitions

---

#### 2. Skills Page (`/skill`)

**Status:** ✅ Implemented

**Description:**
Comprehensive display of technical skills organized in an interactive grid layout.

**Key Elements:**
- Skills grid with icons and labels
- Categorized skills (Frontend, Backend, Tools, Cloud, etc.)
- Animated skill card appearance
- Back navigation button
- Search/filter functionality (future)

**Skill Categories:**
- **Frontend**: React, Next.js, TypeScript, HTML, JavaScript
- **Mobile**: Flutter, React Native, Android, iOS
- **Backend**: Node.js, Go, GraphQL, REST API
- **Databases**: MongoDB, MySQL, Redis, PostgreSQL
- **DevOps**: Docker, Git, GitLab, CI/CD
- **Cloud**: AWS, GCP, Azure, Firebase, Alibaba Cloud
- **Tools**: Jira, Postman, npm, Unity
- **Monitoring**: Grafana, Dynatrace, CloudWatch

**Technical Implementation:**
- Client Component ('use client')
- Framer Motion for staggered animations
- Random directional entry animations
- Next.js Image optimization
- Responsive grid (2-6 columns based on viewport)
- Glassmorphic card design

**User Experience:**
- Visual skill representation with icons
- Engaging entrance animations
- Clear categorization
- Easy navigation back to home

---

#### 3. Portfolio Page (`/portofolio`)

**Status:** ✅ Implemented

**Description:**
Showcase of completed projects with images, descriptions, technologies used, and links.

**Key Elements:**
- Project cards with images
- Project titles and descriptions
- Technology tags for each project
- External links to live projects
- Responsive grid layout
- Animated card entrance

**Project Information:**
- Project thumbnail/screenshot
- Project name
- Technology stack used
- Project type (Web/Mobile)
- Link to live project (if available)

**Technical Implementation:**
- Client Component ('use client')
- Framer Motion random motion animations
- Next.js Image component with responsive sizing
- Conditional rendering for mobile/web projects
- External link handling
- Glassmorphic card design
- Hover effects

**User Experience:**
- Visual project showcase
- Clear technology indication
- Easy access to live projects
- Engaging animations
- Responsive layout

---

#### 4. Layout & Navigation

**Status:** ✅ Implemented

**Description:**
Global layout with consistent styling, font loading, and metadata.

**Key Elements:**
- Root layout component
- Custom font loading (Montserrat, Inter, Poppins)
- Global styles
- Metadata and SEO tags
- OpenGraph configuration
- Favicon

**Technical Implementation:**
- Server Component layout
- Next.js font optimization
- MotionLazy wrapper for animations
- Global CSS variables
- SEO-friendly metadata

---

### Supporting Features

#### 1. MotionLazy Component

**Purpose:** Optimize bundle size by lazy loading Framer Motion

**Implementation:**
- Dynamic import of Framer Motion
- Lazy loading wrapper
- Motion feature configuration
- Performance optimization

#### 2. UI Components

**Button Component:**
- Multiple variants (primary, secondary, destructive, ghost, link)
- Multiple sizes (default, sm, lg, icon)
- Radix UI slot pattern
- Class variance authority
- Full accessibility support

**Carousel Component:**
- Embla Carousel integration
- Autoplay support
- Auto-scroll functionality
- Wheel gesture support
- Responsive design
- Keyboard navigation

#### 3. Utilities

**cn() Function:**
- Class name merging
- Tailwind conflict resolution
- Conditional classes

**mergeOpenGraph():**
- OpenGraph metadata generation
- SEO optimization
- Social media preview

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
| Animations | Framer Motion | ^12.18.1 | ✅ |
| UI Components | Radix UI | ^1.2.3 | ✅ |
| Icons | Lucide React | ^0.522.0 | ✅ |

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

### Design System

**Color Palette:**
- CSS variables for theming
- HSL color format
- Support for dark mode (future)

**Typography:**
- **Primary Font**: Montserrat (body, headings)
- **Secondary Font**: Inter (UI elements)
- **Accent Font**: Poppins (special elements)
- Variable fonts for optimization
- Responsive font sizes

**Spacing:**
- Tailwind CSS spacing scale
- Consistent padding/margin
- Responsive spacing

**Border Radius:**
- Multiple radius options (sm, md, lg)
- Inverted radius support
- Consistent rounding

### Visual Design

**Glassmorphism:**
- Backdrop blur effects
- Semi-transparent backgrounds
- Border with transparency
- Shadow for depth

**Animation Principles:**
- Smooth transitions (0.3-0.8s duration)
- Easing functions (easeOut, easeInOut)
- Staggered animations for lists
- Entrance animations
- Hover effects

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1280px

### Layout Patterns

**Grid System:**
- Flexbox and CSS Grid
- Responsive columns
- Auto-fit/auto-fill patterns

**Component Structure:**
- Card-based layout
- Glassmorphic containers
- Consistent spacing
- Visual hierarchy

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
