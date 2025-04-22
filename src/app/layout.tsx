import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';


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
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}