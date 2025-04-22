"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Activity, BarChart, LineChart, Monitor, Database } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const SportsTechnology = () => {
  return (
    <section id="sports-technology" className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <Activity className="h-10 w-10 text-primary mr-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Sports Technology</h2>
          </div>
          
          <p className="text-lg text-gray-700 mb-6">
            At Coltium Industries, we are redefining how athletic performance is measured, optimized, and enhanced through the integration of AI, real-time data acquisition, embedded systems, and machine learning. Our sports technology division focuses on transforming raw human performance into actionable intelligence.
          </p>
          
          <h3 className="text-2xl font-bold text-primary mb-8">What We're Building:</h3>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mr-4">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-primary">Real-Time Performance Tracking</h4>
              </div>
              
              <p className="text-gray-700 mb-4">
                We develop wearable sensors and embedded firmware platforms that track athletes' biometrics in real-time — capturing metrics like:
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <li className="bg-blue-50 p-3 rounded-lg flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Speed, acceleration, and fatigue</span>
                </li>
                <li className="bg-blue-50 p-3 rounded-lg flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Muscle activity (EMG)</span>
                </li>
                <li className="bg-blue-50 p-3 rounded-lg flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Heart rate, oxygen saturation, and recovery analytics</span>
                </li>
              </ul>
              
              <p className="text-gray-700">
                These are used in training camps, live matches, and rehabilitation centers to monitor physical strain and adaptation.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mr-4">
                  <Monitor className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-primary">Biomechanics & Movement Analysis</h4>
              </div>
              
              <p className="text-gray-700 mb-4">
                Through our AI-enhanced motion systems and camera-embedded models, we perform:
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <li className="bg-green-50 p-3 rounded-lg flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Kinematic motion capture</span>
                </li>
                <li className="bg-green-50 p-3 rounded-lg flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Gait and posture correction feedback</span>
                </li>
                <li className="bg-green-50 p-3 rounded-lg flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>3D joint mapping and performance correction</span>
                </li>
              </ul>
              
              <p className="text-gray-700">
                Used in sports like athletics, football, basketball, and swimming.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mr-4">
                  <BarChart className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-primary">AI-Powered Game Strategy & Coaching Intelligence</h4>
              </div>
              
              <p className="text-gray-700 mb-4">
                We build platforms that merge:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <span className="font-medium text-purple-800">Game video footage</span>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <span className="font-medium text-purple-800">Statistical tracking</span>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <span className="font-medium text-purple-800">Predictive modeling</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3">
                To generate:
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Real-time coaching feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Opponent pattern recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Tactical heatmaps and player positioning suggestions</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mr-4">
                  <LineChart className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="text-xl font-semibold text-primary">Machine Learning for Injury Prevention</h4>
              </div>
              
              <p className="text-gray-700 mb-4">
                We integrate ML to:
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Predict overuse injuries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Flag strain signatures from historical data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Automate workload balancing and training adaptation plans</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 mr-4">
                  <Database className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="text-xl font-semibold text-primary">Data Integration Dashboards</h4>
              </div>
              
              <p className="text-gray-700 mb-4">
                All athlete and team data is visualized in secure, cloud-connected dashboards with:
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Role-based access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Coach/team-specific reports</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>API integration to other team tools and wearables</span>
                </li>
              </ul>
            </motion.div>
          </div>
          
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-primary mb-6">Where Our Tech is Used:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center"
                >
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <h5 className="font-semibold text-primary mb-2">Professional Teams & Clubs</h5>
                  <p className="text-sm text-gray-600">Performance enhancement and injury prediction</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center"
                >
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <h5 className="font-semibold text-primary mb-2">National Training Centers</h5>
                  <p className="text-sm text-gray-600">Athlete diagnostics and biomechanics labs</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center"
                >
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <h5 className="font-semibold text-primary mb-2">Rehabilitation Clinics</h5>
                  <p className="text-sm text-gray-600">Post-injury monitoring and motion restoration</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center"
                >
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="h-6 w-6 text-amber-600" />
                  </div>
                  <h5 className="font-semibold text-primary mb-2">E-sports and Virtual Coaching</h5>
                  <p className="text-sm text-gray-600">Reaction time and input performance analysis</p>
                </motion.div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-primary mb-6">Core Technologies Behind the Systems</h3>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="p-4 text-left">Area</th>
                      <th className="p-4 text-left">Technologies</th>
                    </tr>
                  </thead>
                  <tbody>
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-gray-200"
                    >
                      <td className="p-4 font-medium">Hardware</td>
                      <td className="p-4">Wearables, sensors, low-power MCUs</td>
                    </motion.tr>
                    
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="border-b border-gray-200 bg-gray-50"
                    >
                      <td className="p-4 font-medium">Software</td>
                      <td className="p-4">Embedded firmware, telemetry sync, custom apps</td>
                    </motion.tr>
                    
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="border-b border-gray-200"
                    >
                      <td className="p-4 font-medium">AI/ML</td>
                      <td className="p-4">TensorFlow Lite, TinyML, predictive modeling</td>
                    </motion.tr>
                    
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="border-b border-gray-200 bg-gray-50"
                    >
                      <td className="p-4 font-medium">Data</td>
                      <td className="p-4">Secure cloud storage, real-time streaming</td>
                    </motion.tr>
                    
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <td className="p-4 font-medium">UI</td>
                      <td className="p-4">Dashboards, mobile apps, coach portals</td>
                    </motion.tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }
  
  export default SportsTechnology