"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Server, Cpu, Database, LineChart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BentoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const BentoCard = ({ icon, title, description, className }: BentoCardProps) => {
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
      className={cn(
        "relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/70 p-8 md:p-10 transition-all duration-300 hover:border-primary/30 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 group flex flex-col justify-between h-full min-h-[220px]",
        className
      )}
    >
      {/* Interactive Mouse Radial Glow (Subtle Brand Blue Glow) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(17, 38, 77, 0.05), transparent 80%)`,
        }}
      />

      <div>
        <div className="flex items-center justify-center h-14 w-14 rounded-xl mb-6 transition-transform duration-300 group-hover:scale-110 border bg-primary/5 border-primary/10">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-primary/95 transition-colors duration-300">
          {title}
        </h3>
      </div>
      <p className="text-slate-600 text-base leading-relaxed mt-2">
        {description}
      </p>
    </div>
  );
};

const CompanyOverview = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative">
      {/* Decorative background visual accents using brand blue */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 blur-3xl pointer-events-none rounded-full"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary/5 blur-3xl pointer-events-none rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 tracking-tight leading-tight">
            Who We Are
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Coltium Industries is a deep-tech company specializing in embedded systems, AI, custom chip design, IoT infrastructure, and predictive technology. Every project is developed with one principle in mind — technology must solve problems.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {/* Card 1: Embedded Systems (spans 4/6 on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 lg:col-span-4"
          >
            <BentoCard
              icon={<Server className="w-7 h-7 text-primary" />}
              title="Embedded Systems"
              description="Designing ultra-reliable custom hardware circuits and firmware layers optimized for energy, mobility, and critical edge processing infrastructures."
            />
          </motion.div>

          {/* Card 2: AI & ML (spans 2/6 on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 lg:col-span-2"
          >
            <BentoCard
              icon={<Cpu className="w-7 h-7 text-primary" />}
              title="AI & ML"
              description="Deploying high-performance neural networks directly to the edge for real-time diagnostics, intelligent automation, and computer vision."
            />
          </motion.div>

          {/* Card 3: IoT Infrastructure (spans 2/6 on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3 lg:col-span-2"
          >
            <BentoCard
              icon={<Database className="w-7 h-7 text-primary" />}
              title="IoT Infrastructure"
              description="Creating resilient mesh networks and secure telemetry systems that bind edge physical nodes to scalable enterprise command interfaces."
            />
          </motion.div>

          {/* Card 4: Predictive Technology (spans 4/6 on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3 lg:col-span-4"
          >
            <BentoCard
              icon={<LineChart className="w-7 h-7 text-primary" />}
              title="Predictive Technology"
              description="Using advanced statistical inference and sensor telemetry to predict machinery failures, optimise power grids, and address challenges before they disrupt operations."
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CompanyOverview