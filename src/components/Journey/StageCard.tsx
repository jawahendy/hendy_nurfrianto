'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, FolderOpen, Github, Linkedin, Mail } from 'lucide-react'
import {
  CONTACT,
  FEATURED_PROJECTS,
  PORTFOLIO_DRIVE_URL,
  SKILL_GROUPS,
  type Stage,
} from '@/constants/data/journey'
import { useClickTracking } from '@/hooks/useTracking'

interface StageCardProps {
  stage: Stage
}

const Row = ({ label, value, badge }: { label: string; value: string; badge?: string }) => (
  <div className="j-row">
    <dt>{label}</dt>
    <dd>
      {badge && <span className="j-status">{badge}</span>}
      {value}
    </dd>
  </div>
)

const WorkBody = ({ stage }: { stage: Stage }) => {
  const isCurrent = stage.period.includes('Now')
  return (
    <>
      <h2 className="j-card-title">{stage.kind === 'work' ? stage.org : stage.title}</h2>
      <dl className="j-rows">
        {stage.kind === 'work' && <Row label="Role" value={stage.title} />}
        <Row label="Period" value={stage.period} badge={isCurrent ? 'Current' : undefined} />
        {stage.kind === 'education' && stage.org && <Row label="Campus" value={stage.org} />}
      </dl>
      {stage.summary && <p className="j-card-lede">{stage.summary}</p>}
      {stage.points && (
        <ul className="j-points">
          {stage.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      {stage.stack && (
        <ul className="j-chips" aria-label="Stack">
          {stage.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  )
}

const SkillsBody = ({ stage }: { stage: Stage }) => {
  const { trackClick } = useClickTracking()
  return (
    <>
      <h2 className="j-card-title">{stage.title}</h2>
      <dl className="j-skill-groups">
        {SKILL_GROUPS.map((group) => (
          <div key={group.name}>
            <dt>{group.name}</dt>
            <dd>{group.items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
      <Link
        href="/skill"
        className="j-btn j-btn-ghost"
        onClick={() => trackClick('cta_clicked', { button: 'All skills', section: 'journey_skills' })}
      >
        All skills <ArrowRight aria-hidden className="size-4" />
      </Link>
    </>
  )
}

const ProjectsBody = ({ stage }: { stage: Stage }) => {
  const { trackClick } = useClickTracking()
  return (
    <>
      <h2 className="j-card-title">{stage.title}</h2>
      <ul className="j-projects">
        {FEATURED_PROJECTS.map((project) => (
          <li key={project.name}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('project_clicked', { project_name: project.name, page: 'home' })}
            >
              <Image src={project.image} alt="" width={96} height={64} className="j-thumb" />
              <span className="j-project-text">
                <strong>{project.name}</strong>
                <span>{project.note}</span>
              </span>
              <ArrowUpRight aria-hidden className="size-4 shrink-0" />
            </a>
          </li>
        ))}
      </ul>
      <div className="j-actions">
        <Link
          href="/portofolio"
          className="j-btn j-btn-primary"
          onClick={() => trackClick('cta_clicked', { button: 'All projects', section: 'journey_projects' })}
        >
          All projects <ArrowRight aria-hidden className="size-4" />
        </Link>
        <a
          href={PORTFOLIO_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="j-btn j-btn-ghost"
          onClick={() => trackClick('cta_clicked', { button: 'Portfolio Drive', section: 'journey_projects' })}
        >
          <FolderOpen aria-hidden className="size-4" /> Portfolio Drive
        </a>
      </div>
    </>
  )
}

const ContactBody = ({ stage }: { stage: Stage }) => {
  const { trackClick } = useClickTracking()
  const links = [
    { label: 'LinkedIn', href: CONTACT.linkedin, Icon: Linkedin },
    { label: 'GitHub', href: CONTACT.github, Icon: Github },
    { label: 'Portfolio Drive', href: PORTFOLIO_DRIVE_URL, Icon: FolderOpen },
  ]
  return (
    <>
      <h2 className="j-card-title">{stage.title}</h2>
      {stage.summary && <p className="j-card-lede">{stage.summary}</p>}
      <a
        href={`mailto:${CONTACT.email}`}
        className="j-btn j-btn-primary j-btn-wide"
        onClick={() => trackClick('contact_clicked', { channel: 'email', section: 'journey_contact' })}
      >
        <Mail aria-hidden className="size-4" /> {CONTACT.email}
      </a>
      <ul className="j-link-list">
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('contact_clicked', { channel: label, section: 'journey_contact' })}
            >
              <Icon aria-hidden className="size-4" />
              {label}
              <ArrowUpRight aria-hidden className="ml-auto size-4" />
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

const StageCard = ({ stage }: StageCardProps) => {
  if (stage.kind === 'skills') return <SkillsBody stage={stage} />
  if (stage.kind === 'projects') return <ProjectsBody stage={stage} />
  if (stage.kind === 'contact') return <ContactBody stage={stage} />
  return <WorkBody stage={stage} />
}

export default StageCard
