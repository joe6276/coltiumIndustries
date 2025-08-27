"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Linkedin, 
  Mail, 
  Cpu, 
  Brain, 
  LineChart,
  BarChart4
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const teamMembers = [
  // {
  //   id: 'frank',
  //   name: 'Frank Otieno Ouma',
  //   role: 'Founder & CEO',
  //   image: '/images/frank.png',
  //   bio: 'Leads innovation and R&D. Specialist in embedded systems, AI, chip design, and advanced product engineering.',
  //   expertise: [
  //     'Embedded Systems Architecture',
  //     'AI/ML Implementation',
  //     'Semiconductor Design',
  //     'Product Development Strategy'
  //   ],
  //   contact: {
  //     email: 'frank@intl-coltium.com',
  //     linkedin: 'https://www.linkedin.com/in/frank-otieno-1a7044137'
  //   },
  //   icon: <Cpu className="h-6 w-6" />
  // },
  {
    id: 'samwel',
    name: 'Samwel Njenga',
    role: 'Finance & Strategy Lead',
    image: '/images/samwel.png',
    bio: 'Manages operations, market entry strategy, and partner development. Background in business optimization and growth modeling.',
    expertise: [
      'Financial Planning & Analysis',
      'Market Research',
      'Business Development',
      'Partnership Management'
    ],
    contact: {
      email: 'samwel@intl-coltium.com',
      linkedin: 'https://linkedin.com/in/samwel-njenga'
    },
    icon: <BarChart4 className="h-6 w-6" />
  }
]

const TeamMembers = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Leadership</h2>
          <p className="text-lg text-gray-700">
            Our team combines expertise in embedded systems, artificial intelligence, and strategic business development to create technology solutions that address real-world challenges.
          </p>
        </motion.div>
        
        {/* Modified grid with justify-center to center single item */}
        <div className="flex flex-wrap justify-center gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto"
            >
              <div className="relative h-80 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    {member.icon}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">{member.bio}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-primary mb-3">Areas of Expertise</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {member.expertise.map((skill, i) => (
                      <li key={i} className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                        <span className="text-gray-700">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-4">
                  <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                    <a href={`mailto:${member.contact.email}`}>
                      <Mail className="h-4 w-4" /> Email
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                    <a href={member.contact.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamMembers