'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, Briefcase, ChevronDown, ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react'
import { PORTFOLIO_DRIVE_URL, STAGES, type Stage } from '@/constants/data/journey'
import { useClickTracking, useSectionTracking } from '@/hooks/useTracking'
import { cn } from '@/lib/utils'
import StageCard from './StageCard'
import StaticWorld from './StaticWorld'
import { detectCapability, type Capability } from './capability'
import { journey } from './store'

const Scene = dynamic(() => import('./World/Scene'), { ssr: false })

const LAST = STAGES.length - 1

const scrollToStage = (index: number) => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  window.scrollTo({ top: (index / LAST) * max, behavior: journey.reducedMotion ? 'auto' : 'smooth' })
}

// Marks a scrollable card while more content waits below, so the fade cue
// never eats the edge of a card that fits
const useOverflowCue = () => {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const hasMore = el.scrollHeight - el.clientHeight - el.scrollTop > 4
      el.dataset.more = String(hasMore)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    el.addEventListener('scroll', update, { passive: true })
    return () => {
      observer.disconnect()
      el.removeEventListener('scroll', update)
    }
  }, [])
  return ref
}

interface PanelProps {
  isPanelOpen: boolean
  onTogglePanel: () => void
}

// Phones only: folds the stage panel down to its title so the town shows
const PanelToggle = ({ isPanelOpen, onTogglePanel, controls }: PanelProps & { controls: string }) => (
  <button
    type="button"
    className="j-panel-toggle"
    aria-expanded={isPanelOpen}
    aria-controls={controls}
    aria-label={isPanelOpen ? 'Hide details' : 'Show details'}
    onClick={onTogglePanel}
  >
    <ChevronDown aria-hidden className="size-5" />
  </button>
)

const Hero = ({ stage, isPanelOpen, onTogglePanel }: { stage: Stage } & PanelProps) => {
  const { trackClick } = useClickTracking()
  const ref = useOverflowCue()
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      id={`panel-${stage.id}`}
      className="j-hero"
      data-collapsed={!isPanelOpen}
    >
      <PanelToggle isPanelOpen={isPanelOpen} onTogglePanel={onTogglePanel} controls={`panel-${stage.id}`} />
      <h1 className="j-display">{stage.title}</h1>
      <p className="j-role">Senior Software Engineer</p>
      <p className="j-stack">React · Next.js · React Native · Node.js</p>
      <p id="hero-summary" className="j-hero-lede" data-open={isSummaryOpen}>
        {stage.summary}
      </p>
      <button
        type="button"
        className="j-more"
        aria-expanded={isSummaryOpen}
        aria-controls="hero-summary"
        onClick={() => setIsSummaryOpen((open) => !open)}
      >
        {isSummaryOpen ? 'Show less' : 'Read full summary'}
      </button>
      <div className="j-actions">
        <button
          type="button"
          className="j-btn j-btn-primary"
          onClick={() => {
            trackClick('cta_clicked', { button: 'Walk the journey', section: 'journey_start' })
            scrollToStage(1)
          }}
        >
          Walk the journey <ArrowDown aria-hidden className="size-4" />
        </button>
        <a
          href={PORTFOLIO_DRIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="j-btn j-btn-ghost"
          onClick={() => trackClick('cta_clicked', { button: 'Portfolio Drive', section: 'journey_start' })}
        >
          <FolderOpen aria-hidden className="size-4" /> Portfolio Drive
        </a>
      </div>
    </div>
  )
}

const StageSection = ({
  stage,
  index,
  isPanelOpen,
  onTogglePanel,
}: { stage: Stage; index: number } & PanelProps) => {
  const ref = useSectionTracking(stage.id)
  const cardRef = useOverflowCue()
  return (
    <section
      ref={ref}
      id={stage.id}
      aria-label={stage.kind === 'intro' ? 'Introduction' : stage.label}
      className="j-section"
    >
      {index === 0 ? (
        <Hero stage={stage} isPanelOpen={isPanelOpen} onTogglePanel={onTogglePanel} />
      ) : (
        <article
          ref={cardRef}
          id={`panel-${stage.id}`}
          className="j-card"
          data-kind={stage.kind}
          data-collapsed={!isPanelOpen}
        >
          <PanelToggle isPanelOpen={isPanelOpen} onTogglePanel={onTogglePanel} controls={`panel-${stage.id}`} />
          <StageCard stage={stage} />
        </article>
      )}
    </section>
  )
}

const ProofChips = () => (
  <ul className="j-proof" aria-label="At a glance">
    <li className="j-glass">
      <Briefcase aria-hidden className="size-4" />
      <span>
        <strong>Since 2019</strong>
        <small>web &amp; mobile apps</small>
      </span>
    </li>
  </ul>
)

const TopBar = () => {
  const { trackClick } = useClickTracking()
  return (
    <header className="j-topbar">
      <Link href="/" className="j-brand j-glass">
        Hendy Nurfrianto
      </Link>
      <ProofChips />
      <nav aria-label="Primary" className="j-nav j-glass">
        <Link href="/skill" onClick={() => trackClick('nav_clicked', { link: 'Skills' })}>
          Skills
        </Link>
        <Link href="/portofolio" onClick={() => trackClick('nav_clicked', { link: 'Portfolio' })}>
          Portfolio
        </Link>
        <button
          type="button"
          className="j-btn j-btn-primary j-btn-sm"
          onClick={() => {
            trackClick('nav_clicked', { link: 'Contact' })
            scrollToStage(LAST)
          }}
        >
          Contact
        </button>
      </nav>
    </header>
  )
}

interface StepperProps {
  activeIndex: number
  fillRef: React.RefObject<HTMLSpanElement>
}

const Stepper = ({ activeIndex, fillRef }: StepperProps) => {
  const { trackClick } = useClickTracking()
  const go = (index: number) => {
    const next = Math.min(Math.max(index, 0), LAST)
    trackClick('stepper_clicked', { stage: STAGES[next].id })
    scrollToStage(next)
  }
  const active = STAGES[activeIndex]

  return (
    <nav className="j-stepper" aria-label="Career journey">
      <div className="j-stepper-compact">
        <button type="button" onClick={() => go(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous stop">
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <p aria-live="polite">
          <span className="j-mono">
            {String(activeIndex).padStart(2, '0')}/{String(LAST).padStart(2, '0')}
          </span>
          <strong>{active.label}</strong>
          <span className="j-muted">{active.short}</span>
        </p>
        <button type="button" onClick={() => go(activeIndex + 1)} disabled={activeIndex === LAST} aria-label="Next stop">
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>

      <div className="j-track" aria-hidden>
        <span ref={fillRef} className="j-track-fill" />
      </div>

      <ol className="j-steps">
        {STAGES.map((stage, i) => (
          <li key={stage.id}>
            <button
              type="button"
              onClick={() => go(i)}
              aria-current={i === activeIndex ? 'step' : undefined}
              className={cn('j-step', i < activeIndex && 'is-done', i === activeIndex && 'is-active')}
            >
              <span className="j-dot" aria-hidden />
              <span className="j-step-label">{stage.label}</span>
              <span className="j-step-period">{stage.short}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

const Journey = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  // One choice for every stop: a folded panel stays folded while walking on
  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const { trackClick } = useClickTracking()
  const handleTogglePanel = useCallback(() => {
    setIsPanelOpen((open) => {
      trackClick('panel_toggled', { open: !open })
      return !open
    })
  }, [trackClick])
  const [capability, setCapability] = useState<Capability>('pending')
  const [isLowPower, setIsLowPower] = useState(false)
  const fillRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const result = detectCapability()
    journey.reducedMotion = result.isReducedMotion
    setIsLowPower(result.isLowPower)
    setCapability(result.mode)
  }, [])

  const handleScroll = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
    journey.stage = progress * LAST
    if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress})`
    setActiveIndex((prev) => {
      const next = Math.round(journey.stage)
      return prev === next ? prev : next
    })
  }, [])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [handleScroll])

  return (
    <div className="j-root">
      <div className={cn('j-world', capability === 'webgl' && 'is-ready')} aria-hidden>
        {capability === 'webgl' && <Scene activeIndex={activeIndex} isLowPower={isLowPower} />}
        {capability === 'static' && <StaticWorld activeIndex={activeIndex} />}
      </div>
      <TopBar />
      <main className="j-sections">
        {STAGES.map((stage, i) => (
          <StageSection
            key={stage.id}
            stage={stage}
            index={i}
            isPanelOpen={isPanelOpen}
            onTogglePanel={handleTogglePanel}
          />
        ))}
      </main>
      <Stepper activeIndex={activeIndex} fillRef={fillRef} />
    </div>
  )
}

export default Journey
