'use client'

import Image from 'next/image'
import { STAGES } from '@/constants/data/journey'
import { cn } from '@/lib/utils'

// Pre-rendered stills of the same scene for devices without WebGL.
// Only the active stop and its neighbours are mounted so the rest never load.
const StaticWorld = ({ activeIndex }: { activeIndex: number }) => (
  <>
    {STAGES.map((stage, i) =>
      Math.abs(i - activeIndex) <= 1 ? (
        <Image
          key={stage.id}
          src={`/image/journey/stills/stage-${i}.webp`}
          alt=""
          fill
          sizes="100vw"
          priority={i === 0}
          className={cn('j-still', i === activeIndex && 'is-on')}
        />
      ) : null,
    )}
  </>
)

export default StaticWorld
