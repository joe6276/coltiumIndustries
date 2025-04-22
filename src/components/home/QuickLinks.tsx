"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Cpu, Wrench, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

const cards = [
  {
    title: "Technologies",
    description: "Explore our technology stack, from embedded systems to AI and predictive analytics.",
    icon: <Cpu className="h-10 w-10" />,
    link: "/technologies",
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    textColor: "text-blue-600"
  },
  {
    title: "Projects",
    description: "See how we're applying technology to solve real-world problems across industries.",
    icon: <Wrench className="h-10 w-10" />,
    link: "/projects",
    color: "bg-green-50 hover:bg-green-100 border-green-200",
    textColor: "text-green-600"
  },
  {
    title: "Our Team",
    description: "Meet the engineers and strategists building Africa's technology solutions.",
    icon: <Users className="h-10 w-10" />,
    link: "/team",
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
    textColor: "text-purple-600"
  }
]

const QuickLinks = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Explore Coltium</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover more about our technologies, projects, and the team behind Coltium Industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`border rounded-lg p-6 ${card.color} transition-all hover:shadow-md`}
            >
              <div className={`${card.textColor} mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{card.title}</h3>
              <p className="text-gray-700 mb-6">{card.description}</p>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Link href={card.link}>
                  Explore {card.title}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickLinks