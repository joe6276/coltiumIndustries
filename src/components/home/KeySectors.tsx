"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Factory, Truck, Watch, Building } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const sectors = [
  {
    id: 'healthcare',
    title: 'Smart Healthcare',
    icon: <Heart className="h-10 w-10 text-red-500" />,
    description: 'AI-enabled diagnostics, patient monitoring systems, and telehealth infrastructure.',
    color: 'bg-red-50 hover:bg-red-100',
    iconBg: 'bg-red-100',
    borderColor: 'border-red-200'
  },
  {
    id: 'industrial',
    title: 'Industrial Automation',
    icon: <Factory className="h-10 w-10 text-amber-500" />,
    description: 'Smart manufacturing systems and predictive maintenance platforms.',
    color: 'bg-amber-50 hover:bg-amber-100',
    iconBg: 'bg-amber-100',
    borderColor: 'border-amber-200'
  },
  {
    id: 'mobility',
    title: 'Urban Mobility & Logistics',
    icon: <Truck className="h-10 w-10 text-blue-500" />,
    description: 'Intelligent transportation systems and supply chain optimization.',
    color: 'bg-blue-50 hover:bg-blue-100',
    iconBg: 'bg-blue-100',
    borderColor: 'border-blue-200'
  },
  {
    id: 'wearables',
    title: 'Consumer Wearables',
    icon: <Watch className="h-10 w-10 text-green-500" />,
    description: 'Health tracking devices and smart consumer electronics.',
    color: 'bg-green-50 hover:bg-green-100',
    iconBg: 'bg-green-100',
    borderColor: 'border-green-200'
  },
  {
    id: 'infrastructure',
    title: 'Public Infrastructure',
    icon: <Building className="h-10 w-10 text-purple-500" />,
    description: 'Smart cities, energy management, and public service systems.',
    color: 'bg-purple-50 hover:bg-purple-100',
    iconBg: 'bg-purple-100',
    borderColor: 'border-purple-200'
  }
]

const KeySectors = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Key Sectors</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We develop solutions across industries where technology can make the most meaningful impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`border ${sector.borderColor} ${sector.color} transition-all hover:scale-105 h-full`}>
                <CardContent className="p-6">
                  <div className={`flex items-center justify-center h-16 w-16 rounded-full ${sector.iconBg} mb-4 mx-auto`}>
                    {sector.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-primary text-center mb-3">{sector.title}</h3>
                  <p className="text-gray-700 text-center mb-4">{sector.description}</p>
                  <div className="text-center">
                    <Link 
                      href="/technologies" 
                      className="text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      Learn more →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default KeySectors