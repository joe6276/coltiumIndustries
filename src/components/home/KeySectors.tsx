"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Factory, Truck, Watch, Building, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const sectors = [
  {
    id: 'healthcare',
    title: 'Smart Healthcare',
    icon: <Heart className="h-8 w-8 text-primary" />,
    description: 'AI-enabled medical diagnostics, remote patient monitoring systems, and secure telemetry systems for modern clinical environments.'
  },
  {
    id: 'industrial',
    title: 'Industrial Automation',
    icon: <Factory className="h-8 w-8 text-primary" />,
    description: 'Autonomous factory controls, smart manufacturing execution systems, and sensor-driven predictive maintenance platforms.'
  },
  {
    id: 'mobility',
    title: 'Urban Mobility & Logistics',
    icon: <Truck className="h-8 w-8 text-primary" />,
    description: 'Intelligent fleet orchestration systems, supply chain telemetry, and route optimization systems.'
  },
  {
    id: 'wearables',
    title: 'Consumer Wearables',
    icon: <Watch className="h-8 w-8 text-primary" />,
    description: 'Ultra-low power wearable biosensors, custom biometric tracking systems, and consumer IoT electronics.'
  },
  {
    id: 'infrastructure',
    title: 'Public Infrastructure',
    icon: <Building className="h-8 w-8 text-primary" />,
    description: 'Smart city utility monitoring, distributed renewable energy management grids, and resilient public safety electronics.'
  }
]

interface SectorCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SectorCard = ({ icon, title, description }: SectorCardProps) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 group flex flex-col justify-between h-full min-h-[260px]"
    >
      {/* Dynamic Cursor Trail Glow (Subtle Brand Blue Glow) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(17, 38, 77, 0.05), transparent 80%)`,
        }}
      />

      <div>
        <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary/5 border border-primary/10 mb-6 transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:scale-105 w-fit">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6 text-left">
          {description}
        </p>
      </div>

      <Link 
        href="/technologies" 
        className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 mt-auto group/btn"
      >
        <span>Explore Solutions</span>
        <ArrowRight size={15} className="ml-1.5 transform transition-transform group-hover/btn:translate-x-1 duration-200" />
      </Link>
    </div>
  );
};

const KeySectors = () => {
  return (
    <section className="py-20 md:py-28 bg-slate-50 relative border-t border-slate-100">
      {/* Grid Decorative Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 tracking-tight leading-tight">Key Sectors</h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            We develop systems across primary industries where advanced technology can deliver structural efficiency and real-world impact.
          </p>
        </motion.div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "h-full",
                index === 4 && "md:col-span-2 lg:col-span-1"
              )}
            >
              <SectorCard
                icon={sector.icon}
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