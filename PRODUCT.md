# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Recruiters and tech leads** evaluating Hendy for Senior Software Engineer roles (React, Next.js, React Native, Node.js). They scan for seniority, enterprise clients, shipped apps and the stack, then open the CV/portfolio or make contact.
- **Prospective freelance/project clients** looking for proof of delivered web and mobile work before reaching out about a project.

## Product Purpose

The personal portfolio of Hendy Nurfrianto (hendy-nurfrianto.vercel.app). It presents his career since 2018 as a walkable journey, proves his capability with real projects, and turns a visit into contact: email, LinkedIn, GitHub, or the portfolio Google Drive folder.

## Positioning

He is a frontend/mobile engineer who has also shipped AR/VR (Unity C#), Blender and AI features. Rendering the portfolio as a real-time 3D world is itself proof of that range, so the 3D must be well-crafted and performant, not decoration.

## Operating Context

- Visitors arrive from the CV PDF, LinkedIn, GitHub or job applications, on desktop and mobile.
- Source of truth for career facts: `Hendy_Nurfrianto_Senior_Software_Engineer.pdf` (CV, 2026).
- PostHog analytics is integrated (`src/providers/PostHogProvider.tsx`, `src/hooks/useTracking.ts`). Keep tracking events through the redesign.

## Capabilities and Constraints

- Next.js 14 App Router, TypeScript strict, Tailwind, three.js + React Three Fiber. Deployed on Vercel.
- Routes: `/` (scroll journey), `/skill`, `/portofolio`. The detail routes sit over the same town, environment only and blurred.
- Confirmed 3D approach: real WebGL (React Three Fiber) with a low-poly character that walks through career stages as the visitor scrolls. This needs a static, non-WebGL fallback for low-power devices and `prefers-reduced-motion`.
- Character: a procedural rounded cartoon walker (no model file) at human scale relative to the buildings; replaceable later with Hendy's own rigged Blender GLB (Idle/Walk/Wave).

## Evidence on Hand

- Career timeline (from the CV): Adicipta Inovasi (2018) → Gordi (2019) → Pama Persada (2019–2021, AR/VR/AI) → Mitra Solusi Telematika (2022, THRU app) → Astra International / Auto2000 (2022–2024) → Celerates (2019–present) with Radiant Utama Interinsco as Frontend Lead (2024–present, RBI + QIMS). Education: Universitas Gunadarma, S1 Informatics (2015) and S2 Information Systems Management (2016–2018).
- Skill icons: `public/image/skills/*`. Project screenshots: `public/image/porto/*`. Client logos: `public/image/clients/*`. Profile photo: `public/image/PP.jpg`.
- Portfolio Google Drive: https://drive.google.com/drive/folders/1Y2T8prWNpxZ9nxEz6mHjsLIhL_2P1Feg?usp=sharing
- Contact: hendyn25@gmail.com, linkedin.com/in/hendy-nurfrianto-4977b0177, github.com/jawahendy.
- No testimonials, metrics or client quotes exist. Do not fabricate any.

## Product Principles

1. Every claim traces back to the CV. The journey is his real career, in order.
2. Proof over adjectives: shipped apps, named clients, and screenshots carry the argument.
3. 3D serves the story. Scroll is the walk, each stop is a career stage, and content stays readable without the 3D.
4. Contact is never more than one action away.
5. Performance is part of the craft: the page must still feel fast on a mid-range phone.

## Accessibility & Inclusion

All content must be reachable as real DOM text, independent of the WebGL canvas. Respect `prefers-reduced-motion` and support keyboard navigation between stages.
