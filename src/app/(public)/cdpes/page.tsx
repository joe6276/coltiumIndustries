// First, create the CDPES page: src/app/(public)/cdpes/page.tsx
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Zap, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  DollarSign,
  Shield,
  Clock,
  BarChart3,
  Coins,
  Users,
  Target,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import CdpesHero from '@/components/cdpes/CdpesHero'

export default function CDPESPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const processes = [
    {
      title: "Client Payment",
      description: "Secure payment processing through Stripe and M-Pesa integration",
      icon: CreditCard,
      color: "bg-blue-500",
      features: [
        "Stripe payment gateway integration",
        "M-Pesa mobile money support",
        "Real-time payment verification",
        "Automated receipt generation",
        "Multi-currency support"
      ]
    },
    {
      title: "Digital Asset Tokenization",
      description: "AI-powered professional asset valuation and tokenization",
      icon: Zap,
      color: "bg-purple-500",
      features: [
        "Advanced AI valuation algorithms",
        "Economic modeling (NPV, EVM)",
        "Machine learning adjustments", 
        "Probabilistic analysis with confidence intervals",
        "Blockchain-ready token creation"
      ]
    },
    {
      title: "Marketplace Integration",
      description: "Seamless listing and trading of tokenized digital assets",
      icon: TrendingUp,
      color: "bg-green-500",
      features: [
        "Instant marketplace listing",
        "Professional asset categorization",
        "Real-time trading capabilities",
        "Comprehensive asset analytics",
        "Liquidity pool integration"
      ]
    }
  ]

  const steps = [
    {
      step: "1",
      title: "Project Selection",
      description: "Choose your digital asset project for tokenization",
      icon: Target
    },
    {
      step: "2", 
      title: "Payment Processing",
      description: "Complete secure payment via Stripe or M-Pesa",
      icon: CreditCard
    },
    {
      step: "3",
      title: "Admin Approval",
      description: "Professional review and approval process",
      icon: Shield
    },
    {
      step: "4",
      title: "AI Tokenization",
      description: "Advanced AI-powered asset valuation",
      icon: Zap
    },
    {
      step: "5",
      title: "Marketplace Listing",
      description: "Automatic listing for trading and investment",
      icon: TrendingUp
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      
      <CdpesHero/>

      {/* Process Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Three Core Pillars
            </h2>
            <p className="text-xl text-slate-600">
              Our integrated platform combines payment processing, AI tokenization, and marketplace trading
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {processes.map((process, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader>
                    <div className={`w-16 h-16 ${process.color} rounded-xl flex items-center justify-center mb-4`}>
                      <process.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800">
                      {process.title}
                    </CardTitle>
                    <p className="text-slate-600">
                      {process.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {process.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              How CDPES Works
            </h2>
            <p className="text-xl text-slate-600">
              From payment to marketplace - a seamless 5-step process
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transform -translate-y-1/2 z-0"></div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {steps.map((step, index) => (
                <motion.div key={index} variants={fadeInUp} className="text-center">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-blue-100">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-slate-600">
              Advanced technology powering the future of digital asset trading
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Enterprise Security", desc: "Bank-grade security protocols" },
              { icon: Zap, title: "AI-Powered Valuation", desc: "Advanced machine learning algorithms" },
              { icon: Clock, title: "Real-Time Processing", desc: "Instant payment and tokenization" },
              { icon: BarChart3, title: "Advanced Analytics", desc: "Comprehensive market insights" },
              { icon: Users, title: "Multi-Stakeholder", desc: "Clients, admins, and project managers" },
              { icon: Award, title: "Professional Grade", desc: "Enterprise-level platform" },
              { icon: Coins, title: "Token Economy", desc: "Full blockchain integration" },
              { icon: DollarSign, title: "Multi-Currency", desc: "Global payment support" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6 rounded-lg bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Digital Assets?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the future of digital asset tokenization and trading with CDPES
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/login" className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}