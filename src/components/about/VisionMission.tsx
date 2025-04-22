"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { LightbulbIcon, Target } from 'lucide-react'

const VisionMission = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-secondary/30 p-8 rounded-lg border border-secondary"
          >
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mr-4">
                <LightbulbIcon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Our Vision</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              To empower societies by building advanced technology with practical purpose.
            </p>
            <p className="text-gray-600">
              We envision a future where technology bridges gaps, enhances lives, and drives sustainable development across Africa and beyond.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-secondary/30 p-8 rounded-lg border border-secondary"
          >
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mr-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              To design, test, and deliver advanced embedded systems, AI solutions, and chip-level platforms that directly solve real-world problems in critical sectors.
            </p>
            <p className="text-gray-600">
              We're committed to creating technology that's not just innovative, but accessible, sustainable, and aligned with the unique needs of our communities.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default VisionMission
