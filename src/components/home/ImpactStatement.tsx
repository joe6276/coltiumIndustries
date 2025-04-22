"use client"

import React from 'react'
import { motion } from 'framer-motion'

const ImpactStatement = () => {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full translate-x-[50%] translate-y-[50%]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            We're not just engineers. We're solution architects for Africa's most pressing challenges.
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto"></div>
        </motion.div>
      </div>
    </section>
  )
}

export default ImpactStatement