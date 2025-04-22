"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Navigation, Shield, Cpu } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const SpaceNavigation = () => {
  return (
    <section id="space-navigation" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <Rocket className="h-10 w-10 text-primary mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Space Navigation & Guidance</h2>
          </div>
          
          <p className="text-lg text-gray-700 mb-12">
            Coltium develops low-latency, high-reliability embedded systems that power critical guidance and navigation functions in spacecraft and satellites, from star tracking to onboard decision-making.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full border-blue-200 bg-blue-50 hover:bg-blue-100 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mr-4">
                      <Cpu className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">Custom Embedded Platforms</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Coltium develops low-latency, high-reliability embedded systems that are ideal for real-time processing in spacecraft. Our microcontroller and SoC-based designs power functions like:
                  </p>
                  
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Star tracker data processing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Gyroscope/accelerometer fusion</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Onboard decision-making for orientation & correction</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full border-green-200 bg-green-50 hover:bg-green-100 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mr-4">
                      <Navigation className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">AI-Enhanced Guidance Logic</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    We integrate machine learning models and sensor fusion algorithms to improve traditional inertial navigation. This allows:
                  </p>
                  
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Predictive trajectory correction</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Drift minimization in deep-space environments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Enhanced failure detection and self-correction during critical maneuvers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full border-purple-200 bg-purple-50 hover:bg-purple-100 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mr-4">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">Custom Firmware for Space-Grade Components</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Our firmware teams design for:
                  </p>
                  
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Radiation-hardened chips</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Secure bootloaders and fail-safes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      <span>Power optimization for energy-limited systems</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full border-amber-200 bg-amber-50 hover:bg-amber-100 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 mr-4">
                      <Rocket className="h-6 w-6 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary">Modular Guidance Systems for CubeSats & Nanosatellites</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    Coltium's scalable architecture supports miniaturized missions, providing:
                  </p>
                  
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>Compact GN&C (Guidance, Navigation & Control) packages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>Real-time environmental sensing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">•</span>
                      <span>Autonomy in orbit correction and reorientation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SpaceNavigation
