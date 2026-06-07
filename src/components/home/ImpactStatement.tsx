"use client"

import React from 'react'
import { motion } from 'framer-motion'

const ImpactStatement = () => {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl"></div>
        
        {/* Layered Cyber SVG Wave/Telemetry lines (utilizing blue theme) */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-40 opacity-15 text-blue-400/20" 
          viewBox="0 0 1440 150" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,75 C240,120 480,30 720,75 C960,120 1200,30 1440,75 L1440,150 L0,150 Z" 
            fill="url(#wave-gradient-1)"
          />
          <path 
            d="M0,90 C200,45 440,135 700,90 C960,45 1200,135 1440,90 L1440,150 L0,150 Z" 
            fill="url(#wave-gradient-2)"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="wave-gradient-1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.25)" />
              <stop offset="100%" stopColor="rgba(17, 24, 39, 0.0)" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(96, 165, 250, 0.15)" />
              <stop offset="100%" stopColor="rgba(17, 24, 39, 0.0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.15] text-white tracking-tight">
            We're not just engineers. We're <span className="bg-gradient-to-r from-blue-300 via-blue-100 to-blue-200 bg-clip-text text-transparent drop-shadow-sm">solution architects</span> for Africa's most pressing challenges.
          </h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-blue-400 to-blue-200 mx-auto rounded-full mt-10"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ImpactStatement