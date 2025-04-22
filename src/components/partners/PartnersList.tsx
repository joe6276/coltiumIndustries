"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const partners = [
  {
    id: 'fdk-elevators',
    name: 'FDK Elevators',
    logo: '/images/fdk2.png',
    description: 'Collaborated on embedded diagnostics for elevator maintenance',
    details: 'We developed a predictive maintenance system for FDK Elevators that monitors critical components in real-time, predicting potential failures before they occur and reducing downtime by 45%.',
    collaboration: [
      'Embedded sensor arrays for vibration and acoustic monitoring',
      'Edge AI processing for real-time anomaly detection',
      'Cloud dashboard for maintenance scheduling and analytics'
    ],
    website: 'https://www.fdkelevators.com' // Added website URL
  },
  {
    id: 'docstant',
    name: 'Docstant',
    logo: '/images/doc.png',
    description: 'Built core AI and cloud architecture for medical assistant platform',
    details: 'Our partnership with Docstant focuses on bringing AI-powered medical assistance to underserved communities across Africa, helping clinicians diagnose conditions and maintain patient records more efficiently.',
    collaboration: [
      'AI model development for symptom analysis and treatment recommendations',
      'Secure patient data handling and storage infrastructure',
      'Offline-capable architecture for remote clinic deployment'
    ],
    website: 'https://docstant.app' // Added website URL
  },
  {
    id: 'prifrruff',
    name: 'Prifrruff Ltd',
    logo: '/images/prifrruff.jpg',
    description: 'Joint energy and smart system research',
    details: 'Our collaboration with Prifrruff Ltd has led to innovations in renewable energy monitoring and smart grid management systems, improving energy efficiency across both urban and rural applications.',
    collaboration: [
      'Smart grid monitoring and management systems',
      'Solar and battery management optimization',
      'Real-time energy consumption analytics'
    ],
    website: 'https://www.linkedin.com/company/priffruff-ltd' // Added website URL
  },
  {
    id: 'ciai',
    name: 'CIAI',
    logo: '/images/ciai.png',
    description: 'Data systems for policy & community innovation',
    details: 'We work with CIAI to develop data infrastructure for public policy research and community development initiatives, enabling data-driven decision making for social impact.',
    collaboration: [
      'Secure data collection and anonymization platforms',
      'Community-focused data visualization tools',
      'Policy simulation and impact assessment systems'
    ],
    website: 'https://communityinactioninstitute.org' // Added website URL
  },
  {
    id: 'malik',
    name: 'Malik',
    logo: '/images/malik.png',
    description: 'Product prototyping in consumer-grade electronics',
    details: 'Our partnership with Malik involves rapid prototyping and development of consumer electronics, with a focus on locally relevant, affordable, and durable products.',
    collaboration: [
      'Low-cost embedded system design',
      'Ruggedized hardware for challenging environments',
      'User-centered design for regional needs'
    ],
    website: 'https://www.malik-tech.com' // Added website URL
  },
  {
    id: 'asic-college',
    name: 'ASIC College',
    logo: '/images/acis.png',
    description: 'Quantum & chip design education tools',
    details: 'Together with ASIC College, we have created educational platforms and tools for semiconductor design and quantum computing education, helping to build the next generation of African hardware engineers.',
    collaboration: [
      'Interactive chip design simulation tools',
      'Quantum computing sandbox environments',
      'Hardware engineering curriculum development'
    ],
    website: 'https://asic.college' // Added website URL
  },
  {
    id: 'pweza',
    name: 'Pweza Logistics',
    logo: '/images/pweza.png',
    description: 'AI route engine and smart device tracking infrastructure',
    details: 'Our work with Pweza Logistics has transformed last-mile delivery in urban African centers through AI-optimized routing and real-time tracking systems.',
    collaboration: [
      'Dynamic route optimization algorithms',
      'Low-power GPS tracking devices',
      'Real-time delivery management platform'
    ],
    website: 'https://www.pweza.info' // Added website URL
  }
]

const PartnerCard = ({ partner, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="h-16 mb-6 flex items-center justify-center">
            <div className="relative h-12 w-40">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-primary mb-2 text-center">{partner.name}</h3>
          <p className="text-gray-700 mb-6 text-center">{partner.description}</p>
          
          <div className="border-t border-gray-200 pt-6 mt-auto">
            <div className="mb-4">
              <p className="text-gray-700 mb-4">{partner.details}</p>
              <h4 className="text-lg font-medium text-primary mb-2">Our Collaboration</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {partner.collaboration.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {partner.website && (
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80 hover:bg-primary/5 p-0 h-auto font-medium flex items-center gap-1 group"
                asChild  // This allows the Button to take on the behavior of its child
              >
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Learn more <ExternalLink size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const PartnersList = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xl text-gray-700 max-w-3xl mx-auto mb-16 text-center"
        >
          At Coltium, we forge strategic partnerships across industries to solve complex challenges and create meaningful impact. Together with our partners, we're building the technological foundation for Africa's future.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersList