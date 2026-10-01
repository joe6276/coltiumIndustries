import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Cpu, Layers, Target } from 'lucide-react'

const strengths = [
  { title: 'Hardware and software, together', description: 'Connecting devices, firmware, and intelligent applications.', icon: Cpu },
  { title: 'Practical problem solving', description: 'Engineering around the requirements of each application.', icon: Target },
  { title: 'Experience across industries', description: 'Applying our capabilities to healthcare, energy, mobility, and infrastructure.', icon: Layers },
]

export default function CompanyOverview() {
  return (
    <section className="bg-white py-16 md:py-24" aria-labelledby="company-introduction-heading">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Who we are</p>
            <h2 id="company-introduction-heading" className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-primary md:text-5xl">Engineering ideas into practical solutions.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">Coltium Industries brings together embedded systems, artificial intelligence, and digital hardware engineering to solve real-world challenges.</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">Based in Nairobi, we develop technologies for healthcare, energy, mobility, and infrastructure—connecting devices, data, and software around the needs of each application.</p>
            <Link href="/about" className="mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500">About Coltium <ArrowRight size={18} /></Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-50"><Image loading="eager" src="/images/about.png" alt="Coltium engineering and technology illustration" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-contain p-4" /></div>
        </div>
        <div className="mt-12 grid gap-7 border-t border-slate-200 pt-8 md:grid-cols-3">
          {strengths.map(({ title, description, icon: Icon }) => <div key={title}><Icon className="mb-4 text-blue-700" size={26} aria-hidden="true" /><h3 className="text-xl font-semibold text-primary">{title}</h3><p className="mt-3 max-w-md leading-relaxed text-slate-600">{description}</p></div>)}
        </div>
      </div>
    </section>
  )
}
