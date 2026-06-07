"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Cpu, Wrench, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const cards = [
  {
    title: "Technologies",
    description: "Explore our technology stack, from embedded systems to AI and predictive analytics.",
    icon: <Cpu className="h-8 w-8 text-primary" />,
    link: "/technologies"
  },
  {
    title: "Projects",
    description: "See how we're applying technology to solve real-world problems across industries.",
    icon: <Wrench className="h-8 w-8 text-primary" />,
    link: "/projects"
  },
  {
    title: "Our Team",
    description: "Meet the engineers and strategists building Africa's technology solutions.",
    icon: <Users className="h-8 w-8 text-primary" />,
    link: "/team"
  }
]

interface LinkCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const LinkCard = ({ title, description, icon, link }: LinkCardProps) => {
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
      className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/70 p-8 transition-all duration-300 hover:border-primary/30 hover:bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 group flex flex-col justify-between h-full min-h-[280px]"
    >
      {/* Glow Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(17, 38, 77, 0.04), transparent 80%)`,
        }}
      />

      <div>
        <div className="flex items-center justify-center h-14 w-14 rounded-xl mb-6 transition-all duration-300 group-hover:scale-105 w-fit border bg-primary/5 border-primary/10">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-primary/90 transition-colors duration-300">{title}</h3>
        <p className="text-slate-600 text-[15px] leading-relaxed mb-6">{description}</p>
      </div>

      <div className="mt-auto pt-4">
        <Button 
          asChild 
          variant="outline" 
          className="border-slate-300 hover:border-primary text-slate-700 hover:text-white bg-white hover:bg-primary transition-all duration-300 w-full flex items-center justify-center gap-1.5"
        >
          <Link href={link}>
            <span>Explore {title}</span>
            <ArrowRight size={15} className="transform transition-transform group-hover:translate-x-0.5 duration-200" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

const QuickLinks = () => {
  return (
    <section className="py-20 md:py-28 bg-white relative border-t border-slate-100">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
        
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 tracking-tight leading-tight">Explore Coltium</h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Discover more about our technologies, active deployment projects, and the engineering team behind our solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <LinkCard
                title={card.title}
                description={card.description}
                icon={card.icon}
                link={card.link}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickLinks