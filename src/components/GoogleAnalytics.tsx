'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface GoogleAnalyticsProps {
  trackingId: string
}

export default function GoogleAnalytics({ trackingId }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', trackingId, {
        page_path: url,
      })
    }
  }, [pathname, searchParams, trackingId])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Declare global gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}