"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const sectors = [
  {
    id: 'healthcare',
    title: 'Smart Healthcare',
    imageSrc: '/images/key-sectors/smart-healthcare.svg',
    imageAlt: 'Medical technology illustration',
    description: 'AI-enabled medical diagnostics, remote patient monitoring systems, and secure telemetry systems for modern clinical environments.'
  },
  {
    id: 'industrial',
    title: 'Industrial Automation',
    imageSrc: '/images/key-sectors/industrial-automation.svg',
    imageAlt: 'Industrial data analysis illustration',
    description: 'Autonomous factory controls, smart manufacturing execution systems, and sensor-driven predictive maintenance platforms.'
  },
  {
    id: 'mobility',
    title: 'Urban Mobility & Logistics',
    imageSrc: '/images/key-sectors/urban-mobility-logistics.svg',
    imageAlt: 'Delivery and logistics illustration',
    description: 'Intelligent fleet orchestration systems, supply chain telemetry, and route optimization systems.'
  },
  {
    id: 'wearables',
    title: 'Consumer Wearables',
    imageSrc: '/images/key-sectors/consumer-wearables.svg',
    imageAlt: 'Smartwatch and navigation illustration',
    description: 'Ultra-low power wearable biosensors, custom biometric tracking systems, and consumer IoT electronics.'
  },
  {
    id: 'infrastructure',
    title: 'Public Infrastructure',
    imageSrc: '/images/key-sectors/public-infrastructure.svg',
    imageAlt: 'Global infrastructure deployment illustration',
    description: 'Smart city utility monitoring, distributed renewable energy management grids, and resilient public safety electronics.'
  },
  {
    id: 'fintech',
    title: 'Financial Technology',
    imageSrc: '/images/key-sectors/financial-technology.svg',
    imageAlt: 'Currency conversion and financial technology illustration',
    description: 'Secure payment infrastructure, intelligent financial data systems, and automated tools that make digital transactions more accessible and efficient.'
  }
]

interface SectorCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

const SectorCard = ({ imageSrc, imageAlt, title, description }: SectorCardProps) => {
  return (
    <div className="group relative flex min-h-[360px] h-full flex-col overflow-hidden rounded-[24px] border border-slate-200/90 bg-white px-8 py-8 shadow-[0_2px_7px_rgba(15,23,42,0.12),0_14px_32px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_12px_24px_rgba(15,23,42,0.12),0_22px_44px_rgba(15,23,42,0.1)]">
      <div className="relative z-10 mb-7 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition-transform duration-300 group-hover:scale-105">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={112}
          height={112}
          className="h-12 w-12 object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <h3 className="mb-5 text-[25px] font-semibold leading-tight tracking-[-0.02em] text-slate-900">
          {title}
        </h3>
        <p className="text-[17px] leading-[1.65] text-slate-700">
          {description}
        </p>

        <Link
          href="/technologies"
          className="mt-auto inline-flex items-center pt-8 text-[16px] font-semibold text-[#005a9c] underline decoration-1 underline-offset-2 transition-colors duration-200 hover:text-primary group/btn"
        >
          <span>Explore solutions</span>
          <ArrowRight size={16} className="ml-1.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const KeySectors = () => {
  return (
    <section className="relative border-t border-slate-100 bg-[#f2fbff] py-20 md:py-28">
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 tracking-tight leading-tight">Key Sectors</h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            We develop systems across primary industries where advanced technology can deliver structural efficiency and real-world impact.
          </p>
        </motion.div>

        {/* Sectors Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <SectorCard
                imageSrc={sector.imageSrc}
                imageAlt={sector.imageAlt}
                title={sector.title}
                description={sector.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KeySectors
