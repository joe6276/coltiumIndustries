// src/app/(public)/cdpes/page.tsx
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
  Award,
  FileText,
  Brain,
  Globe,
  Lock,
  Layers,
  RefreshCw,
  Database,
  Sparkles
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

  const coreProcesses = [
    {
      title: "Digital Asset Unit (DAU) Creation",
      description: "Transform every project deliverable into a valuable, tracked digital asset",
      icon: FileText,
      color: "bg-blue-500",
      features: [
        "Automatic DAU creation from deliverables",
        "Metadata tracking and provenance",
        "Version control and lineage",
        "Quality assessment and validation",
        "Contributor attribution system"
      ]
    },
    {
      title: "AI-Powered Valuation Engine",
      description: "Real-time asset valuation with forecasting and risk assessment",
      icon: Brain,
      color: "bg-purple-500",
      features: [
        "Uniqueness and complexity analysis",
        "Market demand assessment",
        "Effort and reusability scoring",
        "Confidence interval forecasting",
        "Risk and volatility modeling"
      ]
    },
    {
      title: "Tokenization & Marketplace",
      description: "Convert DAUs to tradeable tokens with built-in rights management",
      icon: Coins,
      color: "bg-green-500",
      features: [
        "ERC-721/1155 token standards",
        "Smart contract rights management",
        "Automated royalty distribution",
        "Licensing and usage tracking",
        "Secondary market trading"
      ]
    }
  ]

  const lifecycle = [
    {
      step: "1",
      title: "Project Intake & Scoping",
      description: "Structured project requests with auto-suggested milestone plans",
      icon: Target,
      details: "Client submits brief, system suggests DAU types and milestones"
    },
    {
      step: "2", 
      title: "DAU Creation & Execution",
      description: "PM uploads deliverables that become trackable digital assets",
      icon: FileText,
      details: "Each deliverable becomes a DAU with metadata and provenance"
    },
    {
      step: "3",
      title: "AI Valuation & Forecasting",
      description: "Real-time value computation with future projections",
      icon: Brain,
      details: "Engine computes current value and forecast curves with confidence"
    },
    {
      step: "4",
      title: "Review & Smart Escrow",
      description: "Client/admin approval with automated payment release",
      icon: Shield,
      details: "Smart escrow releases funds on approval, handles disputes"
    },
    {
      step: "5",
      title: "Tokenization",
      description: "Convert approved DAUs into blockchain tokens",
      icon: Zap,
      details: "Tokens carry ownership, valuation history, and license terms"
    },
    {
      step: "6",
      title: "Marketplace Trading",
      description: "List, sell, license, bundle, or stake tokenized assets",
      icon: TrendingUp,
      details: "Full marketplace with discovery, trading, and analytics"
    }
  ]

  const stakeholders = [
    {
      role: "Clients",
      icon: Users,
      color: "text-blue-600",
      responsibilities: [
        "Submit project requests & scope",
        "Approve milestones and DAUs",
        "View real-time value & ROI forecasts",
        "Tokenize owned assets",
        "Trade in marketplace"
      ]
    },
    {
      role: "Project Managers",
      icon: Target,
      color: "text-purple-600", 
      responsibilities: [
        "Plan milestones and DAU creation",
        "Upload deliverables with context",
        "Provide quality evidence",
        "Request tokenization",
        "Manage contributor relationships"
      ]
    },
    {
      role: "Admins",
      icon: Shield,
      color: "text-green-600",
      responsibilities: [
        "Review and approve milestones",
        "Oversee valuation integrity",
        "Configure marketplace rules",
        "Monitor compliance",
        "Manage platform governance"
      ]
    }
  ]

  const keyFeatures = [
    { icon: Shield, title: "Cryptographic Ownership", desc: "Immutable provenance and tamper-evident logs" },
    { icon: Brain, title: "AI Valuation Engine", desc: "Real-time value with confidence intervals" },
    { icon: Clock, title: "Smart Escrow", desc: "Milestone-based payment automation" },
    { icon: Layers, title: "Rights Management", desc: "Programmable licensing and royalties" },
    { icon: BarChart3, title: "Portfolio Analytics", desc: "Value tracking and performance metrics" },
    { icon: Globe, title: "Multi-Currency", desc: "Fiat and crypto payment support" },
    { icon: RefreshCw, title: "Dynamic Valuation", desc: "Market-responsive asset pricing" },
    { icon: Database, title: "Asset Registry", desc: "Comprehensive DAU metadata system" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <CdpesHero />
      
      {/* Problem & Solution */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-800 border-red-200">The Problem</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Today's Reality vs. Tomorrow's Opportunity
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Current State */}
            <motion.div {...fadeInUp} className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-800 mb-4">Current State</h3>
                <ul className="space-y-3 text-red-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Work delivered as files and messages with unclear value</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Milestones approved without long-term asset worth assessment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Ownership, licensing, and IP lineage remain ambiguous</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span>No liquid market to resell, license, or bundle deliverables</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* CDPES Solution */}
            <motion.div {...fadeInUp} className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">CDPES Solution</h3>
                <ul className="space-y-3 text-green-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Converts work into financially quantified Digital Asset Units</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Provides continuous valuation and ROI forecasting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Tokenizes assets for secure ownership and programmable licensing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Creates marketplace for trading - value doesn't end at delivery</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Processes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">Core Technology</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Three Revolutionary Pillars
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CDPES unifies intelligent project management, AI valuation, and blockchain tokenization
            </p>
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreProcesses.map((process, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`${process.color} p-3 rounded-lg`}>
                        <process.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{process.title}</CardTitle>
                    </div>
                    <p className="text-gray-600">{process.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {process.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
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

      {/* Lifecycle Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">End-to-End Lifecycle</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              From Project to Tradeable Asset
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete workflow from initial request to marketplace trading
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-green-300" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {lifecycle.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <step.icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  <p className="text-xs text-blue-600">{step.details}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Roles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">Multi-Stakeholder Platform</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Designed for Every Role
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aligned incentives for clients, project managers, and administrators
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stakeholders.map((stakeholder, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <stakeholder.icon className={`h-8 w-8 ${stakeholder.color}`} />
                      <CardTitle className="text-xl">{stakeholder.role}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {stakeholder.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${stakeholder.color.replace('text', 'bg')}`} />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800 border-yellow-200">Platform Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Enterprise-Grade Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced features powering the future of digital asset creation and trading
            </p>
          </motion.div>
          
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <Sparkles className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Digital Assets?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the future of digital asset creation, valuation, and trading with CDPES. 
              Turn your project work into valuable, tradeable digital equity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}