import React from 'react'
import {
  ArrowRight,
  Brain,
  CheckCircle,
  AlertTriangle,
  Zap,
  Layers,
  Monitor,
  Database,
  Eye,
  Target,
  Bell,
  MessageSquare,
  GitBranch,
  FileText,
  Wrench,
  Activity,
  XCircle,
  Code,
  Terminal,
  Play,
  Cpu
} from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';

const AECALandingPage = () => {
  const agentCapabilities = [
    {
      title: "Autonomous Runtime",
      description: "Always-on agent continuously monitors your CAD environment without manual triggers or interruptions to your workflow.",
      icon: Brain,
      status: "active"
    },
    {
      title: "Hybrid Intelligence",
      description: "Fast deterministic engineering checks combined with OpenAI-powered reasoning for contextual explanations.",
      icon: Cpu,
      status: "active"
    },
    {
      title: "Design Memory",
      description: "Persistent memory system tracks every decision, change, and rationale across your entire design history.",
      icon: Database,
      status: "active"
    }
  ]

  const engineeringChecks = [
    { check: "Wall Thickness Validation", icon: CheckCircle, color: "text-green-500" },
    { check: "Fillet Radii for Stress Relief", icon: CheckCircle, color: "text-green-500" },
    { check: "Hole Edge Spacing", icon: CheckCircle, color: "text-green-500" },
    { check: "Tool Access Verification", icon: CheckCircle, color: "text-green-500" },
    { check: "Material Constraint Compliance", icon: CheckCircle, color: "text-green-500" },
    { check: "Assembly Feasibility", icon: CheckCircle, color: "text-green-500" },
    { check: "Safety Factor Analysis", icon: CheckCircle, color: "text-green-500" },
    { check: "Manufacturing DFM Rules", icon: CheckCircle, color: "text-green-500" }
  ]

  const agentInterface = [
    {
      tab: "Violations",
      desc: "Real-time issue detection with severity ranking",
      icon: AlertTriangle,
      color: "border-red-500"
    },
    {
      tab: "Explain",
      desc: "AI-powered context and fix suggestions",
      icon: MessageSquare,
      color: "border-blue-500"
    },
    {
      tab: "Memory",
      desc: "Design timeline and decision history",
      icon: Database,
      color: "border-purple-500"
    },
    {
      tab: "Checks",
      desc: "Live compliance status dashboard",
      icon: Eye,
      color: "border-green-500"
    },
    {
      tab: "Reports",
      desc: "Automated compliance documentation",
      icon: FileText,
      color: "border-amber-500"
    }
  ]

  const useCaseMetrics = [
    {
      scenario: "CNC Bracket Design",
      problem: "Internal fillet too small for standard cutter",
      solution: "Agent flags R2.5mm fillet, suggests R3.2mm for ⌀6.4 endmill",
      savings: "$2,400",
      metric: "Tooling Cost Avoided"
    },
    {
      scenario: "Sheet Metal Enclosure",
      problem: "Bend radius violates material limits",
      solution: "Real-time alert on 2mm bend in 3mm steel, recommends 4mm minimum",
      savings: "3 Days",
      metric: "Fabrication Delay Prevented"
    },
    {
      scenario: "Bolted Assembly",
      problem: "Fastener clearance interference",
      solution: "Detects M8 bolt head collision with adjacent part, suggests offset",
      savings: "95%",
      metric: "First Assembly Success Rate"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section - Dark Technical Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Status Bar - Like the AECA UI */}
          <div className="mb-8 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm border border-emerald-500/30 rounded-lg px-6 py-3">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-mono">AGENT ONLINE</span>
              </div>
              <div className="text-slate-400 text-sm font-mono">Heuristics: <span className="text-emerald-400">ACTIVE</span></div>
              <div className="text-slate-400 text-sm font-mono">AI Reasoning: <span className="text-blue-400">READY</span></div>
            </div>
            <div className="text-slate-500 text-xs font-mono">v2.1.0</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              {/* Product Label */}
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-md px-4 py-2 mb-6">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-mono font-semibold">AutonCAD Agent // AECA</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Autonomous</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                  Engineering Compliance
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                An AI agent that lives inside your CAD environment, continuously monitoring designs and catching compliance violations before they become expensive manufacturing failures.
              </p>

              {/* Key Differentiators */}
              <div className="space-y-3 mb-10">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-slate-300"><span className="text-white font-semibold">Not a tool, an agent</span> — Autonomous runtime, not manual activation</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-slate-300"><span className="text-white font-semibold">Ambient supervision</span> — Continuous monitoring without workflow interruption</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-slate-300"><span className="text-white font-semibold">Hybrid intelligence</span> — Deterministic rules + AI reasoning</p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://teal-kringle-864aee.netlify.app/" target="_blank" rel="noopener noreferrer">
                  <button className="group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40">
                    <Play className="mr-2 h-5 w-5" />
                    View Live Demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>
                <Link href="/contact">
                  <button className="border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                    Contact Our Team
                  </button>
                </Link>
              </div>
            </div>

            {/* Right - Visual/Placeholder */}
            <div className="relative">
              <div className="relative bg-slate-900 border border-emerald-500/30 rounded-xl p-6 shadow-2xl shadow-emerald-500/10">
                {/* Mock Agent Window */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span className="text-slate-300 font-mono text-sm">Agent Window</span>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex space-x-2 text-xs font-mono">
                    <div className="px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded">Violations (3)</div>
                    <div className="px-3 py-1.5 bg-slate-800 text-slate-400 rounded">Explain</div>
                    <div className="px-3 py-1.5 bg-slate-800 text-slate-400 rounded">Memory</div>
                    <div className="px-3 py-1.5 bg-slate-800 text-slate-400 rounded">Checks</div>
                  </div>

                  {/* Mock Violations */}
                  <div className="space-y-2">
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-red-400 text-xs font-mono font-semibold">CRITICAL</span>
                        <XCircle className="h-4 w-4 text-red-400" />
                      </div>
                      <p className="text-slate-300 text-sm mb-2">Wall thickness 1.2mm below minimum 2.0mm for CNC</p>
                      <div className="text-emerald-400 text-xs font-mono">→ Feature: Pocket_001 | Face: 12</div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-amber-400 text-xs font-mono font-semibold">WARNING</span>
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                      </div>
                      <p className="text-slate-300 text-sm mb-2">Fillet R1.5 may require custom tooling</p>
                      <div className="text-emerald-400 text-xs font-mono">→ Suggest: R2.0 or R3.2 for standard cutters</div>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-blue-400 text-xs font-mono font-semibold">INFO</span>
                        <MessageSquare className="h-4 w-4 text-blue-400" />
                      </div>
                      <p className="text-slate-300 text-sm">Hole spacing meets minimum standards</p>
                      <div className="text-emerald-400 text-xs font-mono">✓ All fastener clearances verified</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Capabilities - Technical Cards */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-md px-4 py-2 mb-4">
              <Code className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-mono">AGENT ARCHITECTURE</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Three-Layer System</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Built on FreeCAD with Python runtime and AI reasoning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agentCapabilities.map((capability, index) => {
              const IconComponent = capability.icon
              return (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                      <IconComponent className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 text-xs font-mono uppercase">{capability.status}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{capability.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{capability.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Engineering Checks - Terminal Style */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Terminal Output */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between">
                <span className="text-slate-400 font-mono text-sm">aeca_runtime.py</span>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-6 font-mono text-sm space-y-2 max-h-96 overflow-y-auto">
                <div className="text-slate-500"># Deterministic Engineering Checks</div>
                <div className="text-green-400">✓ Initializing agent runtime...</div>
                <div className="text-green-400">✓ Loading heuristics engine</div>
                <div className="text-green-400">✓ Connecting to OpenAI reasoning layer</div>
                <div className="text-slate-500 mt-3"># Running compliance validation</div>
                {engineeringChecks.map((check, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className={`h-4 w-4 ${check.color}`} />
                    <span className="text-slate-300">{check.check}</span>
                  </div>
                ))}
                <div className="text-blue-400 mt-3">→ AI Reasoning: Analyzing violations...</div>
                <div className="text-emerald-400">→ Agent Status: Monitoring active</div>
                <div className="flex items-center space-x-2 mt-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Agent running continuously</span>
                </div>
              </div>
            </div>

            {/* Right - Description */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Real-Time Engineering Validation
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                AECA runs <span className="text-emerald-400 font-semibold">deterministic engineering checks</span> on every design change,
                instantly flagging violations before you commit to manufacturing.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Lightning Fast</h4>
                    <p className="text-slate-400">Heuristics engine validates designs in milliseconds, not minutes</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">AI-Powered Explanations</h4>
                    <p className="text-slate-400">OpenAI translates technical violations into plain language with fix suggestions</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Design Memory</h4>
                    <p className="text-slate-400">Every decision, change, and rationale preserved across sessions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Interface Tabs */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Five-Tab Agent Interface</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Separate window provides real-time feedback without disrupting your CAD workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {agentInterface.map((tab, index) => {
              const IconComponent = tab.icon
              return (
                <div
                  key={index}
                  className={`bg-slate-800/50 border-2 ${tab.color} rounded-lg p-5 hover:bg-slate-800 transition-all duration-300 cursor-pointer group`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <IconComponent className="h-6 w-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                    <div className={`w-2 h-2 rounded-full ${tab.color.replace('border', 'bg')}`}></div>
                  </div>
                  <h4 className="text-white font-bold mb-2 font-mono text-sm">{tab.tab}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{tab.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases - Engineering Scenarios */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 rounded-md px-4 py-2 mb-4">
              <Wrench className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-mono">REAL ENGINEERING SCENARIOS</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Preventing Costly Manufacturing Failures</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              How AECA catches expensive violations before they reach the shop floor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCaseMetrics.map((useCase, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 px-5 py-3">
                  <h4 className="text-white font-bold font-mono text-sm">{useCase.scenario}</h4>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <XCircle className="h-4 w-4 text-red-400" />
                      <span className="text-red-400 text-xs font-mono font-semibold">PROBLEM</span>
                    </div>
                    <p className="text-slate-400 text-sm">{useCase.problem}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400 text-xs font-mono font-semibold">AGENT ACTION</span>
                    </div>
                    <p className="text-slate-300 text-sm">{useCase.solution}</p>
                  </div>

                  <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-slate-500 text-xs mb-1">{useCase.metric}</div>
                      <div className="text-2xl font-bold text-emerald-400">{useCase.savings}</div>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark with Green Accent */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-6 py-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 font-mono text-sm">Agent Ready for Deployment</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stop Designing Blind. Start Designing with an Agent.
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join engineering teams using AECA to catch compliance violations in real-time,
            reduce rework by 85%, and ship manufacturable designs faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://teal-kringle-864aee.netlify.app/" target="_blank" rel="noopener noreferrer">
              <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40">
                <Terminal className="mr-2 h-5 w-5" />
                View Live Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </a>
            <Link href="/contact">
              <button className="border-2 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                Contact Our Team
              </button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>FreeCAD Integration</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Python Runtime</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>OpenAI Powered</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AECALandingPage
