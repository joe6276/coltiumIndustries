"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const JoinTeam = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Join Our Team</h2>
          <p className="text-lg text-gray-700 mb-8">
            We're always looking for talented individuals who are passionate about using technology to solve real-world problems. If you're interested in joining our team, we'd love to hear from you.
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-4">Open Positions</h3>
            <p className="text-gray-700 mb-6">
              We're currently growing our team in the following areas:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="border border-gray-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-primary mb-2">Embedded Systems Engineer</h4>
                <p className="text-sm text-gray-600">
                  Design and develop firmware for microcontroller-based systems.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-primary mb-2">AI/ML Engineer</h4>
                <p className="text-sm text-gray-600">
                  Implement and optimize machine learning models for edge devices.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-primary mb-2">IoT Specialist</h4>
                <p className="text-sm text-gray-600">
                  Develop secure, reliable IoT infrastructure for connected devices.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-primary mb-2">Business Development Lead</h4>
                <p className="text-sm text-gray-600">
                  Identify partnerships and growth opportunities across industries.
                </p>
              </div>
            </div>
            
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Link href="/contact">Contact Us About Careers</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default JoinTeam