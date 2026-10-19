'use client'

import Link from 'next/link'
import { ArrowLeft, FolderOpen } from 'lucide-react'
import { PORTFOLIO_DRIVE_URL } from '@/constants/data/journey'
import { useClickTracking } from '@/hooks/useTracking'

interface SubHeaderProps {
  current: 'skills' | 'portfolio'
}

// Top bar for the detail routes; same glass vocabulary as the journey overlay
const SubHeader = ({ current }: SubHeaderProps) => {
  const { trackClick } = useClickTracking()
  return (
    <header className="j-subheader">
      <Link href="/" className="j-btn j-btn-ghost j-btn-sm" onClick={() => trackClick('nav_clicked', { link: 'Journey' })}>
        <ArrowLeft aria-hidden className="size-4" /> <span className="j-hide-sm">Journey</span>
      </Link>
      <nav aria-label="Primary" className="j-nav j-glass">
        <Link href="/skill" aria-current={current === 'skills' ? 'page' : undefined}>
          Skills
        </Link>
        <Link href="/portofolio" aria-current={current === 'portfolio' ? 'page' : undefined}>
          Portfolio
        </Link>
        <a
          href={PORTFOLIO_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="j-btn j-btn-primary j-btn-sm"
          onClick={() => trackClick('cta_clicked', { button: 'Portfolio Drive', section: `${current}_header` })}
        >
          <FolderOpen aria-hidden className="size-4" /> <span className="j-hide-sm">Drive</span>
        </a>
      </nav>
    </header>
  )
}

export default SubHeader
