"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const OurStory = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-primary/10 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">About Us</h1>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-8"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Founded on a desire to turn technology into something meaningful, Coltium Industries was built not to follow trends, but to solve the day-to-day, large-scale, and even invisible problems through intelligent innovation.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              We started with a simple question: how can we use our engineering expertise to create solutions that directly address Africa's most pressing challenges? 
            </p>
            <p className="text-lg text-gray-700">
              Today, Coltium stands as a bridge between cutting-edge technology and practical implementation, bringing together embedded systems, artificial intelligence, and custom hardware design to create solutions that work in the real world.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src="/images/about.png"
              alt="Coltium Industries team working"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
            <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default OurStory