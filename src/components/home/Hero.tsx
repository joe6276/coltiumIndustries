"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Layers } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-blue-400/10"
          animate={{
            y: [0, 30, 0],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute left-10 bottom-10 w-64 h-64 rounded-full bg-blue-300/10"
          animate={{
            x: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute right-1/4 bottom-1/3 w-40 h-40 rounded-full bg-blue-200/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            >
              Where Technology Meets Purpose
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-10 text-gray-100"
            >
              We build practical, advanced, and scalable technologies that solve urgent real-world problems across healthcare, energy, mobility, and infrastructure.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              {/* Primary CTA Button with enhanced styling */}
              <Link href="/technologies" className="group">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  {/* Button glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  
                  <div className="relative bg-white px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 text-primary font-medium shadow-lg">
                    <Layers size={18} className="transform transition-transform group-hover:scale-110 duration-300" />
                    <span>Explore Technologies</span>
                    <ArrowRight size={16} className="transform transition-all group-hover:translate-x-1 duration-300" />
                  </div>
                </motion.div>
              </Link>
              
              {/* Secondary CTA Button with enhanced styling */}
              <Link href="/partners" className="group">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <div className="relative px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 text-white font-medium border border-white/50 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <span>Meet Our Partners</span>
                    <ArrowRight size={16} className="transform transition-all group-hover:translate-x-1 duration-300" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Curved bottom section divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
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