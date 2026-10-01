import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Layers } from 'lucide-react'

export default function OriginalHeroPanel() {
  return (
    <div className="original-hero-panel relative flex items-center justify-center overflow-hidden bg-primary text-white">
      <Image
        src="/images/hero/circuit-background.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-primary/55 to-primary/35" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 15%, hsl(220 65% 12% / 0.6) 65%, hsl(220 65% 12% / 0.97) 100%)' }}
      />
      <div className="container relative z-10 flex flex-col items-center py-16 text-center">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Coltium Industries</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Where Technology Meets <span className="text-cyan-200">Purpose</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 md:text-xl">
          We build practical, advanced, and scalable technologies that solve urgent real-world problems across healthcare, energy, mobility, and infrastructure.
        </p>
        <div className="mt-9 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Link href="/technologies" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/40 bg-primary px-6 py-3.5 font-semibold text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <Layers size={18} aria-hidden="true" />Explore Technologies <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/partners" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/50 bg-white/5 px-6 py-3.5 font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Meet Our Partners <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
