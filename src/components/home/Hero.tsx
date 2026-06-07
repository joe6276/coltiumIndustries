"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Layers } from 'lucide-react'
import ParticleMesh from './ParticleMesh'

const Hero = () => {
  return (
    <section className="relative min-h-[750px] lg:min-h-[900px] flex items-center bg-gradient-to-br from-primary via-primary/95 to-slate-900 overflow-hidden pt-12">
      {/* Interactive Background Particle Mesh of Africa */}
      <ParticleMesh />

      {/* Animated Glowing Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute -right-20 -top-20 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-3xl"
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute left-10 bottom-10 w-[400px] h-[400px] rounded-full bg-cyan-400/5 blur-3xl"
          animate={{
            x: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 py-16 md:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center relative z-10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
            >
              Where Technology Meets <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Purpose</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl mb-10 text-slate-200 leading-relaxed max-w-xl"
            >
              We build practical, advanced, and scalable technologies that solve urgent real-world problems across healthcare, energy, mobility, and infrastructure.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              {/* Primary CTA Button with high-contrast brand blue gradient */}
              <Link href="/technologies" className="group">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                  
                  <div className="relative bg-gradient-to-r from-blue-600 to-primary hover:from-blue-500 hover:to-primary/95 text-white px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300">
                    <Layers size={18} className="transform transition-transform group-hover:scale-110 duration-300" />
                    <span>Explore Technologies</span>
                    <ArrowRight size={16} className="transform transition-all group-hover:translate-x-1 duration-300" />
                  </div>
                </motion.div>
              </Link>
              
              {/* Secondary CTA Button: Clean ghost button with subtle border */}
              <Link href="/partners" className="group">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <div className="relative px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 text-slate-200 hover:text-white font-medium border border-slate-700/60 hover:border-slate-500/80 bg-slate-900/30 hover:bg-slate-800/40 backdrop-blur-sm transition-all duration-300">
                    <span>Meet Our Partners</span>
                    <ArrowRight size={16} className="transform transition-all group-hover:translate-x-1 duration-300" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Empty spacer to allow the background Africa particle mesh to stand out */}
          <div className="hidden lg:block w-full h-[400px] pointer-events-none z-0"></div>
        </div>
      </div>
      
      {/* Curved bottom section divider - connects to bg-white (#ffffff) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto relative block" preserveAspectRatio="none">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero