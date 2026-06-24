'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: '/ingest',
    ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: '2026-05-30',
    capture_pageview: false,
    capture_pageleave: false, // we handle this manually for SPA accuracy
    persistence: 'localStorage',
    loaded: (ph) => {
      if (process.env.NODE_ENV === 'development') {
        ph.debug()
      }
    },
  })
}

function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const previousUrl = useRef<string | null>(null)
  const pageStartTime = useRef<number>(Date.now())

  useEffect(() => {
    const currentUrl = window.location.href

    // Fire $pageleave for the previous page before tracking the new one
    if (previousUrl.current && previousUrl.current !== currentUrl) {
      const duration = (Date.now() - pageStartTime.current) / 1000

      posthog.capture('$pageleave', {
        $current_url: previousUrl.current,
        $duration: duration,
      })
    }

    // Reset timer and track new pageview
    pageStartTime.current = Date.now()
    previousUrl.current = currentUrl

    const pageNameMap: Record<string, string> = {
      '/': 'Home',
      '/portofolio': 'Portfolio',
      '/skill': 'Skills',
    }

    posthog.capture('$pageview', {
      $current_url: currentUrl,
      page_path: pathname,
      page_title: document.title,
      page_name: pageNameMap[pathname] ?? pathname,
      device_type: window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop',
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
    })
  }, [pathname, searchParams])

  // Fire $pageleave when user actually closes/leaves the browser tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      const duration = (Date.now() - pageStartTime.current) / 1000
      posthog.capture('$pageleave', {
        $current_url: window.location.href,
        $duration: duration,
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <PageViewTracker />
      {children}
    </PHProvider>
  )
}
