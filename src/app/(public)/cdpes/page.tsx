import React from 'react'
import { 
  ArrowRight, 
  CheckCircle, 
  Brain,
  Shield,
  TrendingUp,
  Zap,
  FileText,
  Coins,
  Users,
  Target,
  BarChart3,
  Clock,
  Database,
  Globe,
  Layers,
  RefreshCw,
  Award,
  Lock,
  DollarSign,
  Activity,
  Sparkles
} from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';

const CDPESLandingPage = () => {
  const coreProcesses = [
    {
      title: "Digital Asset Unit (DAU) Creation",
      description: "Transform every project deliverable into a valuable, tracked digital asset with metadata, provenance, and quality assessment.",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      title: "AI-Powered Valuation Engine", 
      description: "Real-time asset valuation with forecasting, confidence intervals, and market-responsive pricing algorithms.",
      icon: Brain,
      color: "bg-purple-500"
    },
    {
      title: "Tokenization & Marketplace",
      description: "Convert DAUs to tradeable tokens with smart contract rights management and automated royalty distribution.",
      icon: Coins,
      color: "bg-green-500"
    }
  ]

  const lifecycle = [
    {
      step: "1",
      title: "Project Intake & Scoping",
      description: "Structured project requests with auto-suggested milestone plans and DAU types",
      icon: Target
    },
    {
      step: "2", 
      title: "DAU Creation & Execution",
      description: "PM uploads deliverables that become trackable digital assets with full metadata",
      icon: FileText
    },
    {
      step: "3",
      title: "AI Valuation & Forecasting",
      description: "Real-time value computation with future projections and confidence intervals",
      icon: Brain
    },
    {
      step: "4",
      title: "Review & Approval",
      description: "Client/Admin review DAUs and milestone quality gates; comments and change requests are logged.",
      icon: Shield
    },
    {
      step: "5",
      title: "Tokenization",
      description: "Convert approved DAUs into blockchain tokens with embedded rights and royalties",
      icon: Zap
    },
    {
      step: "6",
      title: "Marketplace Trading",
      description: "List, sell, license, bundle, or stake tokenized assets with full analytics",
      icon: TrendingUp
    }
  ]

  const keyFeatures = [
    { icon: Shield, title: "Cryptographic Ownership", desc: "Immutable provenance and tamper-evident logs" },
    { icon: Brain, title: "AI Valuation Engine", desc: "Real-time value with confidence intervals" },
    { icon: Layers, title: "Rights Management", desc: "Programmable licensing and royalties" },
    { icon: BarChart3, title: "Portfolio Analytics", desc: "Value tracking and performance metrics" },
    { icon: Globe, title: "Multi-Currency", desc: "Fiat and crypto payment support" },
    { icon: RefreshCw, title: "Dynamic Valuation", desc: "Market-responsive asset pricing" },
    { icon: Database, title: "Asset Registry", desc: "Comprehensive DAU metadata system" }
  ]

  const useCases = [
    {
      title: "Startup Brand Build",
      description: "Strategy deck, brand guide, UI kit → valued, tokenized, licensed to sister brands; client recoups cost via licensing.",
      value: "$45K",
      roi: "180%"
    },
    {
      title: "Data Science Pipeline",
      description: "Feature store + model card + notebooks → bundled token sold to medtech firm with production royalties.",
      value: "$85K",
      roi: "240%"
    },
    {
      title: "Engineering Playbook",
      description: "Architecture docs + IaC templates → packaged and staked; generates ongoing income while project continues.",
      value: "$120K",
      roi: "320%"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 mb-8">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-slate-800 text-sm font-semibold tracking-wide">Coltium Digital Project Equity System</span>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight">
                Transform Work Into
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block mt-2">
                  Tradeable Digital Equity
                </span>
              </h1>

              {/* Tagline */}
              <p className="text-xl text-slate-700 mb-10 leading-relaxed max-w-lg">
                CDPES converts project deliverables into valuable Digital Asset Units (DAUs) with AI-powered valuation, 
                blockchain tokenization, and marketplace trading.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-slate-900 mb-1">AI-Powered</div>
                  <div className="text-blue-600 text-sm font-medium">Valuation Engine</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="text-2xl font-bold text-slate-900 mb-1">Real-Time</div>
                  <div className="text-purple-600 text-sm font-medium">Asset Tracking</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200">
                  <div className="text-2xl font-bold text-slate-900 mb-1">Blockchain</div>
                  <div className="text-indigo-600 text-sm font-medium">Tokenization</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <Link href="/login">
                  <button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                    Start Creating Digital Assets
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

              <Link href="/marketplace">
                <button className="ml-2 border border-blue-300 text-blue-600 hover:bg-blue-100 px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300">
                   Visit Marketplace
                  
                </button>
              </Link>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative hidden lg:block">
              {/* Main hero image */}
                <div className="relative aspect-[700/444] w-full max-w-2xl mx-auto">
                  <Image
                    className="shadow-2xl"
                    src="/images/hero/cdeps.png"
                    alt="CDPES Platform Dashboard"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      

      {/* Core Processes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Three Revolutionary Pillars</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              CDPES unifies intelligent project management, AI valuation, and blockchain tokenization into one seamless platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreProcesses.map((process, index) => {
              const IconComponent = process.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                >
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${process.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{process.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{process.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">End-to-End Lifecycle</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Complete workflow from initial project request to tradeable digital assets
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
              {lifecycle.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <div
                    key={index}
                    className="relative group"
                  >
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 z-10 relative group-hover:scale-110 transition-transform shadow-lg">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="w-8 h-8 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center absolute top-2 left-1/2 transform -translate-x-1/2 z-20 shadow-md">
                          <span className="text-sm font-bold text-blue-600">{step.step}</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-800 mb-2">{step.title}</h4>
                      <p className="text-sm text-slate-600">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">The Problem with Traditional Project Work</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Today's project deliverables lack clear value tracking, ownership clarity, and monetization potential beyond initial delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Current State */}
            <div className="bg-white rounded-2xl p-8 border border-red-200 hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-red-800">Current Reality</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Work delivered as files and messages with unclear value",
                  "Milestones approved without long-term asset worth assessment", 
                  "Ownership, licensing, and IP lineage remain ambiguous",
                  "No liquid market to resell, license, or bundle deliverables"
                ].map((issue, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                    <p className="text-slate-700">{issue}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CDPES Solution */}
            <div className="bg-white rounded-2xl p-8 border border-green-200 hover:shadow-lg transition-shadow">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800">CDPES Solution</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Converts work into financially quantified Digital Asset Units",
                  "Provides continuous valuation and ROI forecasting",
                  "Tokenizes assets for secure ownership and programmable licensing",
                  "Creates marketplace for trading - value doesn't end at delivery"
                ].map((solution, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Enterprise-Grade Technology Stack</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Advanced features powering the future of digital asset creation and trading
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-slate-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Real-World Success Stories</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how CDPES transforms traditional project work into valuable, tradeable digital assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-slate-800 mb-3">{useCase.title}</h4>
                  <p className="text-slate-600 mb-4">{useCase.description}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <div>
                    <div className="text-sm text-slate-500">Asset Value</div>
                    <div className="text-2xl font-bold text-green-600">{useCase.value}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500">ROI</div>
                    <div className="text-2xl font-bold text-purple-600">{useCase.roi}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Digital Assets?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the future of digital asset creation, valuation, and trading with CDPES. 
              Turn your project work into valuable, tradeable digital equity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              </Link>
              <Link href="/contact">
              <button className="border border-blue-300 text-blue-100 hover:bg-blue-500/10 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                Contact Our Team
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CDPESLandingPage