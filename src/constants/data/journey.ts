// Single source for the scroll journey. Every fact here mirrors the CV
// (Hendy_Nurfrianto_Senior_Software_Engineer.pdf); do not add claims that are not in it.

export const PORTFOLIO_DRIVE_URL =
  'https://drive.google.com/drive/folders/1Y2T8prWNpxZ9nxEz6mHjsLIhL_2P1Feg?usp=sharing'

export const CONTACT = {
  email: 'hendyn25@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hendy-nurfrianto-4977b0177',
  github: 'https://github.com/jawahendy',
} as const

export type Landmark =
  | 'start'
  | 'campus'
  | 'office'
  | 'hq'
  | 'curtain'
  | 'mine'
  | 'phone'
  | 'showroom'
  | 'refinery'
  | 'warehouse'
  | 'billboards'
  | 'gate'

export type StageKind = 'intro' | 'education' | 'work' | 'skills' | 'projects' | 'contact'

export interface Stage {
  id: string
  kind: StageKind
  landmark: Landmark
  // Short label for the stepper and the 3D pin
  label: string
  period: string
  // Compact period for the stepper
  short: string
  title: string
  org?: string
  summary?: string
  points?: string[]
  stack?: string[]
}

export const STAGES: Stage[] = [
  {
    id: 'start',
    kind: 'intro',
    landmark: 'start',
    label: 'Start',
    period: 'Jakarta',
    short: 'Jakarta',
    title: 'Hendy Nurfrianto',
    summary:
      'Senior Software Engineer building web and mobile applications since 2019, specializing in React, Next.js, TypeScript, and React Native, with fullstack experience in Node.js, PostgreSQL, and Firebase. Shipped production apps on the Play Store and App Store for enterprise clients including Astra International (Auto2000). Leads projects and architecture decisions, mentors junior developers, and builds AI-powered features with MCP with Claude.',
  },
  {
    id: 'gunadarma',
    kind: 'education',
    landmark: 'campus',
    label: 'Gunadarma',
    period: '2015 – 2018',
    short: '2015–18',
    title: 'Universitas Gunadarma',
    org: 'Depok',
    points: [
      'Master’s Degree in Information Systems Management · 2016 – 2018 · GPA 3.42 / 4.00',
      'Bachelor’s Degree in Informatics Engineering · Graduated 2015',
    ],
  },
  {
    id: 'adicipta',
    kind: 'work',
    landmark: 'office',
    label: 'Adicipta',
    period: 'Jan – May 2018',
    short: '2018',
    title: 'Website Developer',
    org: 'PT Adicipta Inovasi Technology',
    points: [
      'Developed application features as part of the programming team.',
      'Maintained the company product website and implemented new features.',
    ],
  },
  {
    id: 'celerates',
    kind: 'work',
    landmark: 'hq',
    label: 'Celerates',
    period: 'May 2019 – Now',
    short: '2019–now',
    title: 'Software Developer',
    org: 'PT Mitra Talenta Grup (Celerates)',
    summary:
      'Software development company delivering web and mobile applications for enterprise clients.',
    points: [
      'Led end-to-end redevelopment of the Celerates company website (v2.0) using Next.js, from architecture to deployment.',
      'Maintain and build new features for the Celerates company profile and product websites, including Firebase Analytics integration.',
      'Set up cloud servers and CI/CD pipelines for frontend application deployment.',
      'Mentor junior developers and conduct code reviews to maintain code quality across projects.',
      'Work directly with clients and stakeholders to translate business requirements into technical solutions.',
      'Build fullstack features and REST APIs using Next.js, React, Node.js, Express.js, Knex.js, and Go.',
      'Deliver client projects in Agile/Scrum teams, building responsive interfaces with a focus on performance optimization.',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'Express.js', 'Go', 'CI/CD'],
  },
  {
    id: 'gordi',
    kind: 'work',
    landmark: 'curtain',
    label: 'Gordi',
    period: 'Aug – Oct 2019',
    short: '2019',
    title: 'Frontend Developer',
    org: 'PT Gordi',
    points: [
      'Built features for the Gordi web application using React.',
      'Fixed production bugs on the company website.',
      'Wrote technical documentation and FAQ content for the website.',
    ],
    stack: ['React'],
  },
  {
    id: 'pama',
    kind: 'work',
    landmark: 'mine',
    label: 'Pama Persada',
    period: 'Nov 2019 – Dec 2021',
    short: '2019–21',
    title: 'Developer',
    org: 'PT Pama Persada',
    points: [
      'Built a geolocation-based augmented reality app with Firebase real-time synchronization.',
      'Developed a virtual reality application in Unity (C#) for mining operations.',
      'Built a React web application to integrate AI features into mining site operations.',
      'Built and maintained internal company applications with Firebase Analytics integration.',
      'Developed backend services with Node.js and Firebase NoSQL database to support the AR and web applications.',
    ],
    stack: ['Unity C#', 'AR', 'VR', 'React', 'Node.js', 'Firebase'],
  },
  {
    id: 'mitra-solusi',
    kind: 'work',
    landmark: 'phone',
    label: 'Mitra Solusi',
    period: 'Jan – Jul 2022',
    short: '2022',
    title: 'Apps Developer',
    org: 'PT Mitra Solusi Telematika',
    points: [
      'Developed the THRU mobile app with Redux state management, published on Play Store and App Store.',
      'Maintained the app and resolved production bugs.',
    ],
    stack: ['React Native', 'Redux'],
  },
  {
    id: 'astra',
    kind: 'work',
    landmark: 'showroom',
    label: 'Astra',
    period: 'Aug 2022 – Jan 2024',
    short: '2022–24',
    title: 'Apps Developer',
    org: 'PT Astra International · Auto2000',
    points: [
      'Developed and maintained the Auto2000 mobile app with Redux state management, live on Play Store and App Store.',
      'Migrated the Auto2000 app to Ignite boilerplate with MobX state management, improving code maintainability and reducing recurring bugs.',
      'Refactored legacy code and resolved production bugs, improving app stability.',
      'Built new features for Auto2000 and internal company mobile apps.',
    ],
    stack: ['React Native', 'Redux', 'MobX', 'Ignite'],
  },
  {
    id: 'radiant',
    kind: 'work',
    landmark: 'refinery',
    label: 'Radiant',
    period: 'Jul 2024 – Now',
    short: '2024–now',
    title: 'Frontend Lead',
    org: 'Radiant Utama Interinsco',
    points: [
      'Built the frontend of two applications from scratch: the Risk Based Inspection (RBI) web platform for clients and the public, and QIMS, an internal project management web application built with Next.js and TypeScript.',
      'Define the frontend UI architecture, including Redux state management, and lead code reviews for both applications.',
      'Maintain both applications, deliver new features, and resolve production issues to keep releases stable.',
      'Implemented an AI chatbot feature with automatic synchronization through GitHub CI/CD pipelines.',
      'Conducted penetration testing to identify security vulnerabilities in the web platforms before release.',
      'Integrated PostHog product analytics into the web platforms to monitor user behavior and feature usage.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Redux', 'PostHog', 'AI'],
  },
  {
    id: 'skills',
    kind: 'skills',
    landmark: 'warehouse',
    label: 'Skills',
    period: 'Toolbox',
    short: 'Toolbox',
    title: 'What I work with',
  },
  {
    id: 'projects',
    kind: 'projects',
    landmark: 'billboards',
    label: 'Projects',
    period: 'Selected work',
    short: 'Work',
    title: 'Shipped and live',
  },
  {
    id: 'contact',
    kind: 'contact',
    landmark: 'gate',
    label: 'Contact',
    period: 'Next stop',
    short: 'Next stop',
    title: 'Let’s build the next stage',
    summary:
      'Open to senior frontend and mobile roles, and to project work. I work directly with clients and stakeholders, from requirements to a maintained, well-tested product.',
  },
]

export const SKILL_GROUPS: { name: string; items: string[] }[] = [
  { name: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Responsive Design', 'Performance Optimization'] },
  { name: 'Mobile', items: ['React Native', 'Flutter', 'Swift', 'SwiftUI', 'iOS Development'] },
  { name: 'State', items: ['Redux', 'Zustand', 'MobX'] },
  { name: 'Testing', items: ['Jest', 'React Testing Library', 'UI Testing'] },
  { name: 'Backend & DB', items: ['Node.js', 'Express.js', 'Knex.js', 'Go', 'REST API', 'PostgreSQL', 'MongoDB', 'SQL', 'Firebase'] },
  { name: 'Cloud & DevOps', items: ['AWS', 'GCP', 'Alibaba Cloud', 'Cloudflare', 'Docker', 'CI/CD'] },
  { name: 'Tools', items: ['Git', 'GitHub', 'GitLab', 'JIRA', 'Figma', 'Agile/Scrum'] },
  { name: 'AI', items: ['AI chat UI with streaming (Vercel AI SDK)', 'MCP with Claude for testing automation', 'GitHub Copilot', 'Cursor', 'Claude Code'] },
  { name: 'Analytics', items: ['PostHog', 'Firebase Analytics'] },
  { name: 'Other', items: ['Unity (C#)', 'Augmented Reality', 'Virtual Reality', 'Blender', 'Shopify'] },
]

export const FEATURED_PROJECTS = [
  {
    name: 'Lucatris',
    note: 'RBI platform · Radiant',
    image: '/image/journey/Luc.webp',
    link: 'https://lucatris.com/',
  },
  {
    name: 'Auto2000',
    note: 'React Native · Play Store',
    image: '/image/journey/auto.webp',
    link: 'https://play.google.com/store/apps/details?id=id.co.astra.ai.dev1&hl=id',
  },
  {
    name: 'Celerates website',
    note: 'Next.js · v2.0',
    image: '/image/journey/cele.webp',
    link: 'https://celerates.co.id/',
  },
] as const

export const SKILL_CRATES = [
  'react', 'nextjs', 'ts', 'node', 'rdx', 'firebase',
  'docker', 'aws', 'flutter', 'unity', 'go', 'post',
].map((name) => `/image/journey/skill-${name}.webp`)

// World units between two stops on the road
export const STAGE_SPACING = 16
