"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LineChart, Lock, Atom, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'

const projects = [
  {
    id: 'predictive-maintenance',
    title: 'Predictive Maintenance Platform',
    description: 'A real-time monitoring system for heavy machinery, elevators (FDK), and cooling systems that predicts failures before they occur, reducing downtime and maintenance costs.',
    icon: <LineChart className="h-10 w-10 text-blue-500" />,
    image: '/images/predictive.png',
    technologies: ['Edge AI', 'IoT Sensors', 'Cloud Analytics', 'Digital Twin'],
    challenges: [
      'Processing sensor data in real-time at the edge',
      'Creating accurate predictive models with limited historical data',
      'Designing for harsh industrial environments'
    ],
    outcomes: [
      '45% reduction in unexpected downtime',
      '30% decrease in maintenance costs',
      'Extended equipment lifespan by up to 3 years'
    ],
    color: 'blue'
  },
  {
    id: 'secure-iot-gateway',
    title: 'Secure IoT Gateway',
    description: 'A physical access controller used in smart estates and logistics hubs, providing secure device connectivity, data privacy, and remote management capabilities.',
    icon: <Lock className="h-10 w-10 text-green-500" />,
    image: '/images/secureIoT.png',
    technologies: ['Secure Boot', 'TLS/SSL', 'MQTT', 'OTA Updates'],
    challenges: [
      'Implementing robust security without sacrificing performance',
      'Supporting multiple protocols and legacy devices',
      'Ensuring reliability in areas with unstable power'
    ],
    outcomes: [
      'Zero security breaches since implementation',
      'Supports 500+ concurrent device connections',
      'Reduced deployment time by 60%'
    ],
    color: 'green'
  },
  {
    id: 'quantum-sandbox',
    title: 'Quantum Sandbox Tool',
    description: 'An internal educational platform that enables experimentation with quantum circuits, making quantum computing concepts accessible to engineers and researchers across Africa.',
    icon: <Atom className="h-10 w-10 text-purple-500" />,
    image: '/images/quantum.png',
    technologies: ['Qiskit', 'Python', 'Web Simulator', 'Quantum Visualization'],
    challenges: [
      'Simplifying complex quantum concepts for broader audiences',
      'Creating intuitive visualizations of quantum states',
      'Balancing educational value with practical applications'
    ],
    outcomes: [
      'Training provided to 200+ engineers across 5 countries',
      'Development of 3 experimental quantum algorithms',
      'Foundation for future quantum application research'
    ],
    color: 'purple'
  },
  {
    id: 'docstant-integration',
    title: 'Docstant Integration',
    description: 'An AI-powered doctor assistant for diagnosis and record-keeping in African clinics, improving healthcare delivery in resource-constrained environments.',
    icon: <Stethoscope className="h-10 w-10 text-red-500" />,
    image: '/images/docstant.png',
    technologies: ['Large Language Models', 'Healthcare APIs', 'Offline Processing', 'Low-resource ML'],
    challenges: [
      'Adapting AI models to work with limited connectivity',
      'Ensuring privacy of sensitive medical data',
      'Training models with regionally relevant medical information'
    ],
    outcomes: [
      'Reduced diagnostic time by 35% in pilot clinics',
      'Improved treatment accuracy by 28%',
      'Digitized over 50,000 patient records'
    ],
    color: 'red'
  }
]

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 0
  const colorMap = {
    blue: 'border-blue-200 bg-blue-50',
    green: 'border-green-200 bg-green-50',
    purple: 'border-purple-200 bg-purple-50',
    red: 'border-red-200 bg-red-50'
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`border rounded-lg overflow-hidden shadow-md ${colorMap[project.color]}`}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        <div className="relative h-64 lg:h-auto">
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: 'fill' }}
          />
        </div>
        
        <div className="p-6 lg:p-8">
          <div className="flex items-center mb-4">
            <div className={`flex-shrink-0 mr-4`}>
              {project.icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{project.title}</h2>
          </div>
          
          <p className="text-gray-700 mb-6">{project.description}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-primary mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span 
                  key={i} 
                  className="inline-block px-3 py-1 text-sm bg-white rounded-full border border-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Key Challenges</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Outcomes</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                {project.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
          <Link href="/contact">Enquire More </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

const ProjectList = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectList