"use client"
import React from 'react'
import { motion } from 'framer-motion'

const TeamHero = () => {
  return (
    <section className="relative min-h-[400px] pt-24 pb-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h1>
          <div className="w-24 h-1 bg-white/50 mx-auto mb-8"></div>
          <p className="text-xl text-gray-100 mb-16">
            Dedicated innovators building technology with purpose.
          </p>
        </motion.div>
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

export default TeamHero