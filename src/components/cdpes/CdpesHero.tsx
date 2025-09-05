import { motion } from 'framer-motion'
import React from 'react'
import { Badge } from '../ui/badge'

const CdpesHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Background Elements */}
      {/* <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" /> */}
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-4 py-2 text-sm">
              Coltium Digital Project Equity System
            </Badge>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CDPES Platform
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl sm:text-2xl text-blue-200 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform project work into owned, valuable, and tradable digital equity. 
            The future of digital asset creation, valuation, and monetization.
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-blue-300/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Comprehensive Digital Asset Unit (DAU) creation, AI-powered valuation, 
            tokenization, and marketplace trading - revolutionizing how digital assets 
            are valued, owned, and monetized
          </motion.p>
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
    </div>
  )
}

export default CdpesHero