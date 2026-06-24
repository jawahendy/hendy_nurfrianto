'use client'

import { usePostHog } from 'posthog-js/react'
import { useEffect, useRef } from 'react'

// Track when a section enters the viewport
export function useSectionTracking(sectionName: string) {
  const posthog = usePostHog()
  const ref = useRef<HTMLElement>(null)
  const tracked = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true
          posthog?.capture('section_viewed', {
            section: sectionName,
            page: window.location.pathname,
          })
          observer.unobserve(element)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [sectionName, posthog])

  return ref
}

// Track a button/link click with custom properties
export function useClickTracking() {
  const posthog = usePostHog()

  const trackClick = (eventName: string, properties?: Record<string, unknown>) => {
    posthog?.capture(eventName, {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      ...properties,
    })
  }

  return { trackClick }
}
