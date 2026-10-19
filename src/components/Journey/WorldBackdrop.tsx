'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import StaticWorld from './StaticWorld'
import { detectCapability, type Capability } from './capability'
import { journey } from './store'

const Scene = dynamic(() => import('./World/Scene'), { ssr: false })

interface WorldBackdropProps {
  // The journey stop this page belongs to; the camera parks there
  stage: number
}

// The same town as the home journey, environment only, softly blurred behind
// a detail route's panels
const WorldBackdrop = ({ stage }: WorldBackdropProps) => {
  const [capability, setCapability] = useState<Capability>('pending')
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    const result = detectCapability()
    journey.reducedMotion = result.isReducedMotion
    journey.stage = stage
    setIsLowPower(result.isLowPower)
    setCapability(result.mode)
  }, [stage])

  return (
    <div className={cn('j-world j-backdrop', capability === 'webgl' && 'is-ready')} aria-hidden>
      {capability === 'webgl' && <Scene activeIndex={stage} isLowPower={isLowPower} mode="backdrop" />}
      {capability === 'static' && <StaticWorld activeIndex={stage} />}
    </div>
  )
}

export default WorldBackdrop
