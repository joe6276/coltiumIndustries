"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  Code, 
  Cog, 
  Globe, 
  ShieldCheck
} from 'lucide-react'

const services = [
  {
    icon: <Cpu className="h-8 w-8 text-primary" />,
    title: "Hardware + Firmware Development",
    description: "Custom circuit design, PCB layout, and embedded firmware for specialized applications."
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "AI Model Engineering",
    description: "Custom machine learning models optimized for specific use cases and deployment environments."
  },
  {
    icon: <Cog className="h-8 w-8 text-primary" />,
    title: "Semiconductor Design",
    description: "Custom chip design and FPGA implementations for specialized computing needs."
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Real-time Predictive Systems",
    description: "Systems that analyze data in real-time to predict outcomes and enable proactive responses."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Cross-industry Systems Integration",
    description: "Seamless integration of hardware, software, and network components across different platforms."
  }
]

const WhatWeDo = () => {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">What We Do</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Each of our technologies is purpose-built, not experimental. Every circuit, line of code, or algorithm exists to solve an actual challenge.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mr-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
              </div>
              <p className="text-gray-700 pl-16">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo