'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'
import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Initialize PostHog once on the client
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    defaults: '2026-05-30',
    capture_pageview: false, // we handle this manually for accurate SPA tracking
    capture_pageleave: true,
    persistence: 'localStorage',
  })
}

// Tracks page views on every route change (SPA-aware)
function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthogClient = usePostHog()
  const previousPathname = useRef<string | null>(null)

  useEffect(() => {
    if (!posthogClient) return

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')

    // Avoid duplicate fires on initial mount
    if (previousPathname.current === url) return
    previousPathname.current = url

    posthogClient.capture('$pageview', {
      $current_url: window.location.href,
      page_path: pathname,
      page_title: document.title,
    })
  }, [pathname, searchParams, posthogClient])

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
