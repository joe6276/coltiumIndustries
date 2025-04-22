"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Brain, Layers, Globe, Atom, LineChart, Rocket, Activity } from 'lucide-react'
import { Tab } from '@headlessui/react'
import { cn } from '@/lib/utils'

// Common components for reuse
const TechCategory = ({ id, children }) => (
  <section id={id} className="py-10">
    <div className="container mx-auto px-4 max-w-6xl">
      {children}
    </div>
  </section>
)

const ApplicationTable = ({ applications }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden mt-8">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-primary text-white">
          <th className="p-4 text-left rounded-tl-lg">Sub-Technology</th>
          <th className="p-4 text-left rounded-tr-lg">Real-World Application</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app, index) => (
          <motion.tr 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
          >
            <td className="p-4 border-b border-gray-200 font-medium">{app.subTechnology}</td>
            <td className="p-4 border-b border-gray-200">{app.application}</td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Technology-specific components
const EmbeddedSystems = () => {
  const applications = [
    {
      subTechnology: "MCU/MPU Architecture (NXP, Infineon, TI)",
      application: "Predictive maintenance, industrial sensors, medical monitoring"
    },
    {
      subTechnology: "Custom Board Design (PCB + Firmware)",
      application: "Garage diagnostic kits, smart home devices"
    },
    {
      subTechnology: "Real-time OS (FreeRTOS, Zephyr)",
      application: "Safety-critical systems, robotics, wearables"
    },
    {
      subTechnology: "Edge Connectivity (CAN, RS485, Modbus)",
      application: "Vehicle ECUs, smart energy devices, factory controllers"
    },
    {
      subTechnology: "Secure Bootloaders",
      application: "Tamper-proof updates for critical systems (e.g. Finstinct)"
    }
  ]
  
  return (
    <TechCategory id="embedded-systems">
      <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
            <Cpu className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">Embedded Systems & Firmware</h2>
          <p className="text-lg text-gray-700 max-w-3xl">
            We design and develop custom hardware and firmware solutions tailored for specific applications, from sensor networks to control systems.
          </p>
        </div>
      </div>
      
      <ApplicationTable applications={applications} />
    </TechCategory>
  )
}

const ArtificialIntelligence = () => {
  const applications = [
    {
      subTechnology: "TinyML / Edge AI",
      application: "Voice biometrics, environmental prediction (wearables)"
    },
    {
      subTechnology: "LLM Integration (OpenAI, Azure AI)",
      application: "Docstant – intelligent medical copilot"
    },
    {
      subTechnology: "Reinforcement Learning",
      application: "Dynamic route planning for Pweza Logistics"
    },
    {
      subTechnology: "Computer Vision",
      application: "Optical reading of meters, surveillance classification"
    },
    {
      subTechnology: "AIoT",
      application: "Interconnected devices with self-decision ability"
    }
  ]
  
  return (
    <TechCategory id="ai-ml">
      <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <Brain className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">Artificial Intelligence (AI/ML)</h2>
          <p className="text-lg text-gray-700 max-w-3xl">
            We develop and implement AI models that can learn, adapt, and make decisions based on data patterns, optimized for embedded and edge deployments.
          </p>
        </div>
      </div>
      
      <ApplicationTable applications={applications} />
    </TechCategory>
  )
}

const ChipDesign = () => {
  const applications = [
    {
      subTechnology: "RTL Design (Verilog/SystemVerilog)",
      application: "Custom silicon design, prototyping embedded CPUs"
    },
    {
      subTechnology: "FPGA Prototyping (Xilinx, Intel)",
      application: "Garage test platforms, low-latency neural nets"
    },
    {
      subTechnology: "Hardware Description Modeling",
      application: "Simulation of processor flows for ASIC tape-outs"
    },
    {
      subTechnology: "High-Speed Interfaces (I2S, LVDS)",
      application: "Audio, camera, display modules in smart devices"
    },
    {
      subTechnology: "Chip Emulation & Verification",
      application: "Partner demos, lab simulations for ASIC College"
    }
  ]
  
  return (
    <TechCategory id="asic-fpga">
      <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100">
            <Layers className="h-8 w-8 text-amber-600" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">ASIC & FPGA Design</h2>
          <p className="text-lg text-gray-700 max-w-3xl">
            We design custom semiconductors and FPGA solutions for specialized computing needs, from high-performance processing to low-power applications.
          </p>
        </div>
      </div>
      
      <ApplicationTable applications={applications} />
    </TechCategory>
  )
}

const IoTConnectivity = () => {
  const applications = [
    {
      subTechnology: "Wi-Fi/BLE Modules (AIROC, ESP32, nRF)",
      application: "Wearables, smart home, logistics tracking"
    },
    {
      subTechnology: "MQTT/HTTP/CoAP Protocols",
      application: "Cloud-connected remote monitoring systems"
    },
    {
      subTechnology: "Secure Communication (TLS/SSL, OPTIGA Trust M)",
      application: "Healthcare and transport data privacy"
    },
    {
      subTechnology: "Geo-fencing (uBlox GPS + Cloud Sync)",
      application: "Pweza delivery tracking, asset protection"
    },
    {
      subTechnology: "OTA Updates & Remote Debugging",
      application: "FOTA for field-deployed devices"
    }
  ]
  
  return (
    <TechCategory id="iot-connectivity">
      <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <Globe className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">IoT & Secure Connectivity</h2>
          <p className="text-lg text-gray-700 max-w-3xl">
            We build connected device ecosystems that communicate securely and reliably, with emphasis on low-power operation and data privacy.
          </p>
        </div>
      </div>
      
      <ApplicationTable applications={applications} />
    </TechCategory>
  )
}

const QuantumComputing = () => {
  const applications = [
    {
      subTechnology: "Qiskit SDK + Quantum Circuit Sim",
      application: "Research collaboration with ASIC College"
    },
    {
      subTechnology: "Quantum Encryption Testing",
      application: "Future-proof secure protocols for public infrastructure"
    },
    {
      subTechnology: "Hybrid Quantum-Classical Algorithms",
      application: "Experimental AI in cryptographic routines"
    },
    {
      subTechnology: "Quantum Device Simulators",
      application: "Education for R&D labs in Africa"
    }
  ]
  
  return (
    <TechCategory id="quantum-computing">
      <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100">
            <Atom className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">Quantum & Advanced Computing</h2>
          <p className="text-lg text-gray-700 max-w-3xl">
            We explore and implement next-generation computing paradigms, including quantum algorithms and advanced processing architectures.
          </p>
        </div>
      </div>
      
      <ApplicationTable applications={applications} />
    </TechCategory>
  )
}

const PredictiveSystems = () => {
  const applications = [
    {
      subTechnology: "Condition Monitoring AI",
      application: "Smart elevators (FDK), HVAC analytics"
    },
    {
      subTechnology: "Vibration Analysis",
      application: "Rotating equipment life prediction"
    },
    {
      subTechnology: "Asset Health Indexing",
      application: "Urban infrastructure (bridges, generators)"
    },
    {
      subTechnology: "Time Series Forecasting",
      application: "Logistics planning and stock optimization"
    },
    {
      subTechnology: "3D Digital Twin Visualization",
      application: "Virtual inspection dashboards for clients"
    }
  ]
  
  return (
    <TechCategory id="predictive-systems">
      <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100">
            <LineChart className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">Predictive Systems & Digital Twins</h2>
          <p className="text-lg text-gray-700 max-w-3xl">
            We develop systems that analyze data in real-time to predict outcomes and enable proactive responses, creating digital representations of physical assets.
          </p>
        </div>
      </div>
      
      <ApplicationTable applications={applications} />
    </TechCategory>
  )
}

// Space Navigation & Guidance and Sports Technology components will be implemented here too
// Let's start with Space Navigation

const SpaceNavigation = () => {
  return (
    <TechCategory id="space-navigation">
      <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-cyan-100">
            <Rocket className="h-8 w-8 text-cyan-600" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">Space Navigation & Guidance</h2>
          <p className="text-lg text-gray-700 max-w-3xl">
            Coltium develops low-latency, high-reliability embedded systems that power critical guidance and navigation functions in spacecraft and satellites.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 mr-4">
              <Cpu className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary">Custom Embedded Platforms</h3>
          </div>
          
          <p className="text-gray-700 mb-4">
            Coltium develops low-latency, high-reliability embedded systems that are ideal for real-time processing in spacecraft. Our microcontroller and SoC-based designs power functions like:
          </p>
          
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Star tracker data processing</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Gyroscope/accelerometer fusion</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Onboard decision-making for orientation & correction</span>
            </li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 mr-4">
              <Brain className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary">AI-Enhanced Guidance Logic</h3>
          </div>
          
          <p className="text-gray-700 mb-4">
            We integrate machine learning models and sensor fusion algorithms to improve traditional inertial navigation. This allows:
          </p>
          
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Predictive trajectory correction</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Drift minimization in deep-space environments</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Enhanced failure detection and self-correction during critical maneuvers</span>
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
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 mr-4">
              <Globe className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary">Custom Firmware for Space-Grade Components</h3>
          </div>
          
          <p className="text-gray-700 mb-4">
            Our firmware teams design for:
          </p>
          
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Radiation-hardened chips</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Secure bootloaders and fail-safes</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Power optimization for energy-limited systems</span>
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
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 mr-4">
              <Rocket className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold text-primary">Modular Guidance Systems for CubeSats & Nanosatellites</h3>
          </div>
          
          <p className="text-gray-700 mb-4">
            Coltium's scalable architecture supports miniaturized missions, providing:
          </p>
          
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Compact GN&C (Guidance, Navigation & Control) packages</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Real-time environmental sensing</span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-600 mr-2">•</span>
              <span>Autonomy in orbit correction and reorientation</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </TechCategory>
  )
}

// Continuing the TechnologyDetails.tsx file with SportsTechnology component

const SportsTechnology = () => {
    return (
      <TechCategory id="sports-technology">
        <div className="flex flex-col md:flex-row items-start mb-6 gap-6">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100">
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">Sports Technology</h2>
            <p className="text-lg text-gray-700 max-w-3xl">
              At Coltium Industries, we are redefining how athletic performance is measured, optimized, and enhanced through the integration of AI, real-time data acquisition, embedded systems, and machine learning.
            </p>
          </div>
        </div>
        
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-lg shadow-md overflow-hidden mt-8"
      >
        <div className="p-6">
          <h3 className="text-2xl font-bold text-primary mb-4">What We're Building</h3>
          
          <div className="space-y-8 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-orange-50 p-6 rounded-lg border border-orange-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mr-4">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="text-xl font-semibold text-primary">Real-Time Performance Tracking</h4>
              </div>
              
              <p className="text-gray-700 mb-4">
                We develop wearable sensors and embedded firmware platforms that track athletes' biometrics in real-time — capturing metrics like:
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <li className="bg-white p-3 rounded-lg flex items-start shadow-sm">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Speed, acceleration, and fatigue</span>
                </li>
                <li className="bg-white p-3 rounded-lg flex items-start shadow-sm">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Muscle activity (EMG)</span>
                </li>
                <li className="bg-white p-3 rounded-lg flex items-start shadow-sm">
                  <span className="text-orange-600 mr-2">•</span>
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
              className="bg-green-50 p-6 rounded-lg border border-green-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mr-4">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-primary">Biomechanics & Movement Analysis</h4>
              </div>
              
              <p className="text-gray-700 mb-4">
                Through our AI-enhanced motion systems and camera-embedded models, we perform:
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <li className="bg-white p-3 rounded-lg flex items-start shadow-sm">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Kinematic motion capture</span>
                </li>
                <li className="bg-white p-3 rounded-lg flex items-start shadow-sm">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Gait and posture correction feedback</span>
                </li>
                <li className="bg-white p-3 rounded-lg flex items-start shadow-sm">
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
              className="bg-blue-50 p-6 rounded-lg border border-blue-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mr-4">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-primary">AI-Powered Game Strategy & Coaching Intelligence</h4>
              </div>
              
              <p className="text-gray-700 mb-4">
                We build platforms that merge:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-medium text-blue-800">Game video footage</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-medium text-blue-800">Statistical tracking</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <span className="font-medium text-blue-800">Predictive modeling</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3">
                To generate:
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Real-time coaching feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Opponent pattern recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Tactical heatmaps and player positioning suggestions</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-purple-50 p-6 rounded-lg border border-purple-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mr-4">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-primary">Machine Learning for Injury Prevention</h4>
              </div>
              
              <p className="text-gray-700 mb-4">
                We integrate ML to:
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Predict overuse injuries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Flag strain signatures from historical data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>Automate workload balancing and training adaptation plans</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-primary mb-6">Where Our Tech is Used</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center"
            >
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="h-6 w-6 text-orange-600" />
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
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="h-6 w-6 text-blue-600" />
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
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <h5 className="font-semibold text-primary mb-2">E-sports and Virtual Coaching</h5>
              <p className="text-sm text-gray-600">Reaction time and input performance analysis</p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h4 className="text-xl font-bold text-primary mb-4">Core Technologies Behind the Systems</h4>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="p-4 text-left">Area</th>
                    <th className="p-4 text-left">Technologies</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium">Hardware</td>
                    <td className="p-4">Wearables, sensors, low-power MCUs</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-4 font-medium">Software</td>
                    <td className="p-4">Embedded firmware, telemetry sync, custom apps</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-4 font-medium">AI/ML</td>
                    <td className="p-4">TensorFlow Lite, TinyML, predictive modeling</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-4 font-medium">Data</td>
                    <td className="p-4">Secure cloud storage, real-time streaming</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">UI</td>
                    <td className="p-4">Dashboards, mobile apps, coach portals</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </TechCategory>
  )
}

// Now completing the TechnologyDetails component
const TechnologyDetails = () => {
  const [activeTab, setActiveTab] = useState('embedded-systems')
  
  const tabItems = [
    { id: 'embedded-systems', label: 'Embedded Systems', icon: <Cpu className="h-5 w-5" /> },
    { id: 'ai-ml', label: 'AI/ML', icon: <Brain className="h-5 w-5" /> },
    { id: 'asic-fpga', label: 'ASIC & FPGA', icon: <Layers className="h-5 w-5" /> },
    { id: 'iot-connectivity', label: 'IoT', icon: <Globe className="h-5 w-5" /> },
    { id: 'quantum-computing', label: 'Quantum', icon: <Atom className="h-5 w-5" /> },
    { id: 'predictive-systems', label: 'Predictive', icon: <LineChart className="h-5 w-5" /> },
    { id: 'space-navigation', label: 'Space', icon: <Rocket className="h-5 w-5" /> },
    { id: 'sports-technology', label: 'Sports', icon: <Activity className="h-5 w-5" /> }
  ]
  
  return (
    <section id="technology-details" className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Technology Applications</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover how our technologies solve real-world problems across various industries.
          </p>
        </motion.div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Tab.Group defaultIndex={0} onChange={(index) => setActiveTab(tabItems[index].id)}>
            <Tab.List className="flex overflow-x-auto bg-primary/5 border-b border-gray-200">
              {tabItems.map((item) => (
                <Tab
                  key={item.id}
                  className={({ selected }) =>
                    cn(
                      'flex items-center space-x-2 px-4 py-3 font-medium focus:outline-none whitespace-nowrap',
                      selected
                        ? 'text-primary border-b-2 border-primary bg-white'
                        : 'text-gray-600 hover:text-primary hover:bg-white/50'
                    )
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <EmbeddedSystems />
              </Tab.Panel>
              <Tab.Panel>
                <ArtificialIntelligence />
              </Tab.Panel>
              <Tab.Panel>
                <ChipDesign />
              </Tab.Panel>
              <Tab.Panel>
                <IoTConnectivity />
              </Tab.Panel>
              <Tab.Panel>
                <QuantumComputing />
              </Tab.Panel>
              <Tab.Panel>
                <PredictiveSystems />
              </Tab.Panel>
              <Tab.Panel>
                <SpaceNavigation />
              </Tab.Panel>
              <Tab.Panel>
                <SportsTechnology />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  )
}

export default TechnologyDetails