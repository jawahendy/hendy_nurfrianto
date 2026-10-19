# Hendy Nurfrianto · My CV Online

The personal portfolio of Hendy Nurfrianto, Senior Software Engineer (React, Next.js, React Native, Node.js).
The home page is a scroll-driven **3D career journey**. A cartoon walker crosses an isometric low-poly town
and stops at every employer from the CV. The Skills and Portfolio pages sit over the same town, blurred.

Live: https://hendy-nurfrianto.vercel.app

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · three.js + React Three Fiber + drei · Tailwind CSS · PostHog

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

PostHog needs `NEXT_PUBLIC_POSTHOG_KEY` (and optionally `NEXT_PUBLIC_POSTHOG_HOST`) in `.env.local`.

## Where things live

| What | Where |
|------|-------|
| Career content (CV-verbatim stages, skill groups, contact, Drive link) | `src/constants/data/journey.ts` |
| Skill icons and portfolio list | `src/constants/data/Service.tsx` |
| Journey DOM layer (cards, stepper, mobile panel fold) | `src/components/Journey/` |
| 3D scene (camera, traffic, landmarks, walker) | `src/components/Journey/World/` |
| Design tokens and component styles | `src/app/globals.css` (mirrored in `World/palette.ts`) |
| Product truth / design system | `PRODUCT.md` / `DESIGN.md` |
| Architecture docs | `docs/architecture/` |

## Editing the journey

- **Change text:** edit `STAGES` in `journey.ts`. Keep it matching the CV.
- **Add a stage:** add it to `STAGES`, add a landmark in `World/Landmarks.tsx` (plus `PIN_HEIGHT`), and update the
  stepper column count in `globals.css`.
- **After any scene change** (landmarks, character, lighting), re-render the no-WebGL fallback stills
  `public/image/journey/stills/stage-0..11.webp`. Capture each stop at 1600×1000 with the UI hidden and
  reduced motion on, then convert the captures to WebP.
