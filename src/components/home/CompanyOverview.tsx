"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Server, Cpu, Database, LineChart } from 'lucide-react'

const CompanyOverview = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Who We Are</h2>
          <p className="text-lg md:text-xl text-gray-700">
            Coltium Industries is a deep-tech company specializing in embedded systems, AI, custom chip design, IoT infrastructure, and predictive technology. Every project is developed with one principle in mind — technology must solve problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Server className="w-10 h-10 text-primary" />,
              title: "Embedded Systems",
              description: "Custom hardware and firmware solutions for real-world applications."
            },
            {
              icon: <Cpu className="w-10 h-10 text-primary" />,
              title: "AI & ML",
              description: "Intelligent algorithms that learn, adapt, and solve complex challenges."
            },
            {
              icon: <Database className="w-10 h-10 text-primary" />,
              title: "IoT Infrastructure",
              description: "Connected device ecosystems that communicate and collaborate."
            },
            {
              icon: <LineChart className="w-10 h-10 text-primary" />,
              title: "Predictive Technology",
              description: "Anticipating needs and issues before they become problems."
            }
          ].map((item, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4 mx-auto">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-primary text-center mb-2">{item.title}</h3>
            <p className="text-gray-600 text-center">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)
}

export default CompanyOverview