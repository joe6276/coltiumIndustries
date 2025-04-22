"use client"

import React from 'react'
import { motion } from 'framer-motion'

const historyTimeline = [
  {
    year: 2007,
    title: 'R&D Foundations',
    description: 'Coltium Industries was established with a strong foundation in microprocessor exploration and embedded systems R&D. Early years were focused on circuit experimentation, chip-level design understanding, and basic hardware-software interfacing.'
  },
  {
    year: 2010,
    title: 'Automation & Mechatronic Integration',
    description: 'We ventured into robotic systems and industrial automation. These years involved development of programmable logic controllers (PLCs), embedded controllers, and mechatronics platforms for small-scale industry use cases.'
  },
  {
    year: 2013,
    title: 'Networked Systems & IoT Prototyping',
    description: 'With the evolution of embedded connectivity, Coltium began integrating networked systems, enabling early IoT models. This included remote monitoring, basic telemetry systems, and wireless board communication protocols.'
  },
  {
    year: 2016,
    title: 'Digital Health Interfaces',
    description: 'We applied our embedded systems knowledge in healthcare, focusing on diagnostic interfaces and early-stage medical hardware for vital sign tracking, positioning us in health-tech ecosystems.'
  },
  {
    year: 2019,
    title: 'Intelligent Mobility & Embedded Vehicles',
    description: 'We expanded into automotive innovation — developing embedded control systems for vehicle diagnostics, electric mobility integration, and fleet tracking modules through partnerships like Pweza Logistics.'
  },
  {
    year: 2022,
    title: 'Advanced System Intelligence & AI',
    description: 'Our engineering stack evolved to include neural network integration, edge-AI modules, and ML training pipelines for predictive diagnostics, environmental sensing, and smart decision systems.'
  },
  {
    year: 'Future',
    title: 'AI-Centric Systems & Global Impact',
    description: 'We are building toward globally scalable, AI-enhanced embedded systems across healthcare, logistics, energy, and infrastructure. Our roadmap includes ASIC chip design, quantum circuit integration, and ethical AI deployment in real-time systems.'
  }
]

const CompanyHistory = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our History</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Since 2007, we've been on a journey of continuous innovation and growth, adapting our technological expertise to meet evolving challenges.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block"></div>
          
          <div className="space-y-12">
            {historyTimeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}
              >
                <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                  <div className={`px-6 py-4 rounded-lg shadow-md bg-white mx-4 ${index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'}`}>
                    <div className="flex items-center">
                      <div className="bg-primary text-white text-xl font-bold rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0 mr-4">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-gray-700">{item.description}</p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-white hidden md:block" style={{ top: `calc(${index * 100}% / ${historyTimeline.length - 1} + ${index * 12}px)` }}></div>
                
                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyHistory