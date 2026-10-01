'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Cpu, Database, LineChart, Server } from 'lucide-react'
import OriginalHeroPanel from './OriginalHeroPanel'

const cards = [
  { image: '/images/company-overview/embedded-systems.webp', title: 'Embedded Systems', icon: Server, href: '/technologies#embedded-systems' },
  { image: '/images/company-overview/ai-ml.webp', title: 'AI & ML', icon: Cpu, href: '/technologies#artificial-intelligence' },
  { image: '/images/company-overview/iot-infrastructure.webp', title: 'IoT Infrastructure', icon: Database, href: '/technologies#iot-connectivity' },
  { image: '/images/company-overview/predictive-technology.webp', title: 'Predictive Technology', icon: LineChart, href: '/technologies#predictive-systems' },
  { image: '/images/company-overview/embedded-systems.webp', title: 'FPGA / SoC / ASIC', icon: Cpu, href: '/fpga-asic' },
  { image: '/images/hero/cdpes-network.jpg', title: 'CDPES', icon: Database, href: '/cdpes' },
]

function CapabilityCard({ card, index, staticLayout = false }: { card: typeof cards[number]; index: number; staticLayout?: boolean }) {
  const Icon = card.icon
  return (
    <Link href={card.href} className={`hero-capability-card group ${staticLayout ? 'hero-capability-static' : `hero-capability-${index}`} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400`}>
      <Image loading="eager" src={card.image} alt="" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />
      <div className="relative z-10 flex items-center gap-3 p-5 xl:p-6">
        <Icon size={22} className="shrink-0 text-cyan-200" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-white xl:text-xl">{card.title}</h2>
      </div>
    </Link>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const [desktop, setDesktop] = useState(false)
  const [motionDisabled, setMotionDisabled] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(88)
  const [viewportHeight, setViewportHeight] = useState(900)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // The whole gallery starts enlarged around its central tile. Scrolling
  // reveals the surrounding tiles without replacing or duplicating the hero.
  const scale = useTransform(scrollYProgress, [0, 0.72, 1], [2.12, 1, 1])
  // Keep tile geometry fixed throughout the zoom, as in the reference.
  // The final part of the scroll pans down the gallery to reveal its last row.
  const galleryY = useTransform(scrollYProgress, [0, 0.72, 1], [0, 0, -(viewportHeight - headerHeight) * 0.25])
  const radius = useTransform(scrollYProgress, [0, 0.55], [0, 12])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const update = () => setDesktop(query.matches)
    update()
    const updateHeight = () => setViewportHeight(window.innerHeight)
    updateHeight()
    window.addEventListener('resize', updateHeight)
    query.addEventListener('change', update)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setMotionDisabled(motionQuery.matches)
    updateMotion()
    motionQuery.addEventListener('change', updateMotion)
    const header = sectionRef.current?.closest('.public-site')?.querySelector('header')
    const observer = new ResizeObserver(() => {
      if (header) setHeaderHeight(header.getBoundingClientRect().height)
    })
    if (header) observer.observe(header)
    return () => { query.removeEventListener('change', update); motionQuery.removeEventListener('change', updateMotion); observer.disconnect(); window.removeEventListener('resize', updateHeight) }
  }, [])

  const animated = desktop && !reducedMotion && !motionDisabled

  return (
    <section ref={sectionRef} className={animated ? 'hero-mosaic-stage' : 'hero-mosaic-static'} style={{ '--hero-header-height': `${headerHeight}px` } as React.CSSProperties} aria-label="Coltium technology showcase">
      {animated ? (
        <div className="hero-mosaic-sticky">
          <div className="hero-mosaic-position">
            <motion.div className="hero-mosaic-grid" style={{ scale, y: galleryY }}>
              {cards.map((card, index) => <CapabilityCard key={card.title} card={card} index={index} />)}
              <motion.div className="hero-mosaic-main" style={{ borderRadius: radius }}>
                <div className="hero-original-frame"><OriginalHeroPanel /></div>
              </motion.div>
            </motion.div>
          </div>
          <motion.p style={{ opacity: hintOpacity }} className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-white">Scroll to explore <ArrowDown size={15} /></motion.p>
        </div>
      ) : (
        <>
          <OriginalHeroPanel />
          <div className="grid gap-3 bg-white p-3 md:grid-cols-2">{cards.map((card, index) => <CapabilityCard key={card.title} card={card} index={index} staticLayout />)}</div>
        </>
      )}
    </section>
  )
}
