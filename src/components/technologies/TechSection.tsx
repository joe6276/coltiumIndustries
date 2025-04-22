"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface TechApplication {
  subTechnology: string;
  application: string;
}

interface TechSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  backgroundColor: string;
  applications: TechApplication[];
}

const TechSection: React.FC<TechSectionProps> = ({ 
  id, 
  title, 
  icon, 
  description, 
  backgroundColor,
  applications 
}) => {
  return (
    <section id={id} className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-start mb-12 gap-6"
        >
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10">
              {icon}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">{title}</h2>
            <p className="text-lg text-gray-700 max-w-3xl">{description}</p>
          </div>
        </motion.div>
        
        <div className="overflow-x-auto">
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
      </div>
    </section>
  )
}

export default TechSection