"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Cpu, 
  Brain, 
  Layers, 
  Globe, 
  Atom, 
  LineChart, 
  Rocket, 
  Activity 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const technologies = [
  {
    id: 'embedded-systems',
    name: 'Embedded Systems & Firmware',
    icon: <Cpu className="h-6 w-6" />,
    color: 'bg-blue-500',
    description: 'Custom hardware and firmware solutions for real-world applications.'
  },
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence (AI/ML)',
    icon: <Brain className="h-6 w-6" />,
    color: 'bg-green-500',
    description: 'Intelligent algorithms that learn, adapt, and solve complex challenges.'
  },
  {
    id: 'asic-fpga',
    name: 'ASIC & FPGA Design',
    icon: <Layers className="h-6 w-6" />,
    color: 'bg-amber-500',
    description: 'Custom chip designs and field-programmable gate arrays for specialized computing needs.'
  },
  {
    id: 'iot-connectivity',
    name: 'IoT & Secure Connectivity',
    icon: <Globe className="h-6 w-6" />,
    color: 'bg-red-500',
    description: 'Connected device ecosystems that communicate and collaborate securely.'
  },
  {
    id: 'quantum-computing',
    name: 'Quantum & Advanced Computing',
    icon: <Atom className="h-6 w-6" />,
    color: 'bg-purple-500',
    description: 'Next-generation computing paradigms for solving complex problems.'
  },
  {
    id: 'predictive-systems',
    name: 'Predictive Systems & Digital Twins',
    icon: <LineChart className="h-6 w-6" />,
    color: 'bg-indigo-500',
    description: 'Systems that analyze data to predict outcomes and enable proactive responses.'
  },
  {
    id: 'space-navigation',
    name: 'Space Navigation & Guidance',
    icon: <Rocket className="h-6 w-6" />,
    color: 'bg-cyan-500',
    description: 'Low-latency, high-reliability systems for spacecraft and satellites.'
  },
  {
    id: 'sports-technology',
    name: 'Sports Technology',
    icon: <Activity className="h-6 w-6" />,
    color: 'bg-orange-500',
    description: 'Performance tracking, biomechanics analysis, and training optimization systems.'
  },
]

const TechnologiesList = () => {
  const [activeTech, setActiveTech] = useState('embedded-systems')
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Technology Stack</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            From embedded systems to quantum computing, our technologies span the cutting edge of what's possible in hardware, software, and intelligence.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex flex-col items-center"
            >
              <button
                onClick={() => setActiveTech(tech.id)}
                className={cn(
                  "w-full px-4 py-6 rounded-lg transition-all duration-300 flex flex-col items-center space-y-3 h-full",
                  activeTech === tech.id 
                    ? "bg-primary/10 border-2 border-primary shadow-md" 
                    : "bg-white hover:bg-primary/5 border border-gray-200"
                )}
              >
                <div className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center text-white transition-all",
                  tech.color
                )}>
                  {tech.icon}
                </div>
                <h3 className="text-sm font-semibold text-primary text-center leading-tight">
                  {tech.name}
                </h3>
              </button>
            </motion.div>
          ))}
        </div>
        
        <Link
          href="#technology-details"
          className="block w-full max-w-sm mx-auto py-3 px-6 text-center bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Explore Applications
        </Link>
      </div>
    </section>
  )
}

export default TechnologiesList