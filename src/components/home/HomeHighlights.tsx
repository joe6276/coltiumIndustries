import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const linkStyle = 'inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500'
const headingStyle = 'text-3xl font-semibold leading-tight tracking-tight text-primary md:text-5xl'
const eyebrowStyle = 'mb-4 text-xs font-semibold uppercase tracking-[0.18em]'

export function EngineeringHighlight() {
  return (
    <section className="overflow-hidden bg-primary text-white" aria-labelledby="engineering-heading">
      <div className="container grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className={`${eyebrowStyle} text-cyan-200`}>FPGA / SoC / ASIC engineering</p>
          <h2 id="engineering-heading" className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Built for the demands<br />of your hardware.</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">From a new requirement to existing RTL or a board prototype, explore how Coltium approaches digital architecture, verification, and hardware integration.</p>
          <ul className="mt-7 flex flex-wrap gap-3 text-sm text-blue-100">
            {['Architecture', 'RTL & IP', 'Verification', 'FPGA integration'].map(item => <li key={item} className="rounded-full border border-white/25 px-4 py-2">{item}</li>)}
          </ul>
          <Link href="/fpga-asic" className={`${linkStyle} mt-7`}>Explore digital hardware engineering <ArrowRight size={18} /></Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image loading="eager" src="/images/company-overview/embedded-systems.webp" alt="Electronic circuitry illustrating digital hardware engineering" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
    </section>
  )
}

export function FeaturedProject() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="featured-project-heading">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-50">
          <Image loading="eager" src="/images/predictive.png" alt="Predictive maintenance platform project illustration" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-contain p-4" />
        </div>
        <div>
          <p className={`${eyebrowStyle} text-blue-700`}>Featured project / Industrial systems</p>
          <h2 id="featured-project-heading" className={headingStyle}>Spot the signals.<br />Anticipate the failure.</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">Our predictive maintenance platform brings sensor monitoring, edge AI, and cloud analytics together to help teams identify equipment problems before they disrupt operations.</p>
          <p className="mt-4 max-w-xl leading-relaxed text-slate-600">Explore the challenges, technologies, and applications behind this work and our other projects.</p>
          <Link href="/projects" className={`${linkStyle} mt-6 text-primary`}>See our project portfolio <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  )
}

export function ProductHighlights() {
  return (
    <section className="bg-slate-100 py-16 md:py-24" aria-labelledby="platforms-heading">
      <div className="container">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div><p className={`${eyebrowStyle} text-blue-700`}>Platforms & products</p><h2 id="platforms-heading" className={headingStyle}>More ways to build value.</h2></div>
          <p className="max-w-md text-lg leading-relaxed text-slate-600">Discover Coltium’s work in digital project assets and intelligent engineering assistance.</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-2">
          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="relative aspect-[16/9] bg-blue-50">
              <Image loading="eager" src="/images/hero/cdpes-network.jpg" alt="Illustration of a computer connected to a global digital network" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-contain p-5" />
            </div>
            <div className="p-7 sm:p-9">
              <p className={`${eyebrowStyle} text-blue-700`}>Coltium Digital Project Equity System</p>
              <h3 className="text-3xl font-semibold text-primary">CDPES</h3>
              <p className="mt-4 leading-relaxed text-slate-600">Request digital project asset valuation, follow the approval process, and browse published marketplace listings.</p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-primary">
                <Link href="/cdpes" className={linkStyle}>Explore CDPES <ArrowRight size={18} /></Link>
                <Link href="/marketplace" className={linkStyle}>Browse marketplace <ArrowRight size={18} /></Link>
              </div>
            </div>
          </article>
          <article className="flex flex-col overflow-hidden rounded-xl bg-slate-950 text-white">
            <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
              <Image loading="eager" src="/images/hero/aeca-blueprint.jpg" alt="Mechanical engineering drawings on blue blueprint sheets" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="p-7 sm:p-9">
              <p className={`${eyebrowStyle} text-emerald-300`}>CAD engineering assistant</p>
              <h3 className="text-3xl font-semibold">AECA</h3>
              <p className="mt-4 leading-relaxed text-slate-300">Explore an engineering assistant focused on identifying design issues and explaining manufacturing constraints within the CAD workflow.</p>
              <Link href="/aeca" className={`${linkStyle} mt-6`}>Discover AECA <ArrowRight size={18} /></Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

const partners = [
  { name: 'FDK Elevators', logo: '/images/fdk2.png' },
  { name: 'Docstant', logo: '/images/doc.png' },
  { name: 'Prifrruff Ltd', logo: '/images/prifrruff.jpg' },
  { name: 'CIAI', logo: '/images/ciai.png' },
  { name: 'Malik', logo: '/images/malik.png' },
  { name: 'ASIC College', logo: '/images/acis.png' },
  { name: 'Pweza', logo: '/images/pweza.png' },
]

export function PartnerHighlights() {
  return (
    <section className="border-y border-slate-200 bg-white py-12 md:py-16" aria-labelledby="partners-heading">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <h2 id="partners-heading" className="text-2xl font-semibold text-primary md:text-3xl">Progress through collaboration.</h2>
          <Link href="/partners" className={`${linkStyle} text-primary`}>Meet our partners <ArrowRight size={18} /></Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {partners.map(partner => (
            <li key={partner.name} className="flex flex-col items-center rounded-lg border border-slate-100 p-4">
              <div className="relative h-16 w-full"><Image loading="eager" src={partner.logo} alt="" fill sizes="(max-width: 639px) 50vw, (max-width: 1279px) 25vw, 14vw" className="object-contain" /></div>
              <span className="mt-3 text-center text-sm text-slate-600">{partner.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ProjectEnquiry() {
  return (
    <section className="bg-primary py-16 text-white md:py-24" aria-labelledby="project-enquiry-heading">
      <div className="container grid items-center gap-9 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div><p className={`${eyebrowStyle} text-blue-200`}>Start a conversation</p><h2 id="project-enquiry-heading" className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">What do you want to build?</h2><p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-200">Bring an idea, a technical challenge, or an existing prototype. Tell us where you are and what you need to do next.</p></div>
        <div className="flex flex-wrap gap-4 lg:justify-end">
          <Link href="/contact" className="inline-flex min-h-12 items-center gap-3 rounded-md bg-white px-6 py-4 font-semibold text-primary hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Discuss your project <ArrowRight size={18} /></Link>
          <Link href="/login" className="inline-flex min-h-12 items-center gap-3 rounded-md border border-white/50 px-6 py-4 font-semibold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Client portal <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  )
}
