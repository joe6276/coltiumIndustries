import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css"
import Script from 'next/script'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Coltium Industries | Advanced Technology With Purpose',
  description: 'We build practical, advanced, and scalable technologies that solve urgent real-world problems across healthcare, energy, mobility, and infrastructure.',
  keywords: 'embedded systems, AI for Africa, tech innovation, Coltium Industries',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TR0727ZEVH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TR0727ZEVH');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} antialiased min-h-screen bg-white`}>
        {children}
      </body>
    </html>
  )
}