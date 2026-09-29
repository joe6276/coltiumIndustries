'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, MotionConfig } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Cpu,
  ExternalLink,
  Layers,
  Lightbulb,
} from 'lucide-react'

const buildOptions = [
  {
    id: 'fpga',
    title: 'FPGA',
    icon: Cpu,
    description: 'Real-time logic, acceleration, interfaces and deterministic control.',
  },
  {
    id: 'soc',
    title: 'SoC',
    icon: Layers,
    description: 'Integrated processors, programmable logic, memory and embedded systems.',
  },
  {
    id: 'asic',
    title: 'ASIC',
    icon: Cpu,
    description: 'Custom digital IP, subsystems and silicon architectures.',
  },
  {
    id: 'unsure',
    title: 'Not sure yet?',
    icon: Lightbulb,
    description: 'Bring us the requirement. We’ll help architect the path.',
  },
]

const designStages = [
  {
    name: 'Your requirement',
    detail: 'Define the use case, constraints and target platform. Start at any stage, including with existing RTL or a prototype.',
    tags: ['Use case', 'Constraints', 'Target'],
  },
  {
    name: 'Architecture',
    detail: 'Partition the system and plan interfaces, clocks, memory and performance around the requirements.',
    tags: ['System partitioning', 'Interfaces', 'Clocks', 'Memory'],
  },
  {
    name: 'RTL / IP',
    detail: 'Develop synthesizable digital logic, reusable IP and interfaces for the intended hardware platform.',
    tags: ['Verilog', 'SystemVerilog', 'VHDL', 'AXI'],
  },
  {
    name: 'Verify',
    detail: 'Check behavior and integration with simulation, assertions, clock and reset domain checks, and timing analysis.',
    tags: ['Simulation', 'Assertions', 'CDC / RDC', 'Timing'],
  },
  {
    name: 'Implement',
    detail: 'Synthesize, apply constraints and optimize the design through implementation and timing closure.',
    tags: ['Synthesis', 'Constraints', 'Optimization', 'Timing closure'],
  },
  {
    name: 'FPGA / SoC / ASIC',
    detail: 'Prototype, deploy or integrate the design, and advance the digital hardware toward its next development stage.',
    tags: ['Prototype', 'Deploy', 'Integrate', 'Advance'],
  },
]

const capabilities = [
  { name: 'RTL / IP', text: 'Custom digital logic, controllers, interfaces and reusable IP.' },
  { name: 'Verification', text: 'Testbenches, assertions, simulation and functional validation.' },
  { name: 'Timing', text: 'Constraints, CDC / RDC, static timing analysis and closure.' },
  { name: 'DSP / Data', text: 'Sampling, streaming, signal processing and high-throughput datapaths.' },
  { name: 'SoC Design', text: 'CPU and programmable logic, buses, memory and subsystem integration.' },
  { name: 'Embedded', text: 'Interrupts, DMA, firmware interfaces and hardware/software integration.' },
  { name: 'FPGA', text: 'Architecture through implementation, bring-up and optimization.' },
  { name: 'ASIC', text: 'Digital architecture, RTL, verification and silicon-development path.' },
]

const engineeringProjects = [
  {
    title: 'Deterministic Event & Control Engine',
    tags: ['125 MHz', 'RTL', 'Synchronization', 'Timing verified'],
    href: 'https://github.com/franksombudsman-ops/fpga-rtl-portfolio/tree/main/projects/zcu104/01-deterministic-event-control-engine',
  },
  {
    title: 'Real-Time Sensor-Actuator Engine',
    tags: ['SPI', '10 kHz sampling', 'Real-time RTL', 'Control'],
    href: 'https://github.com/franksombudsman-ops/fpga-rtl-portfolio/tree/main/projects/zcu104/02-real-time-sensor-actuator-engine',
  },
  {
    title: 'AXI-Lite Control Peripheral',
    tags: ['AXI4-Lite', 'Custom IP', 'Registers', 'SoC integration'],
    href: 'https://github.com/franksombudsman-ops/fpga-rtl-portfolio/tree/main/projects/zcu104/03-axi-lite-control-peripheral',
  },
  {
    title: 'Interrupt-Driven Control SoC',
    tags: ['CPU + FPGA', 'Interrupts', 'Sensors', 'Embedded control'],
    href: 'https://github.com/franksombudsman-ops/fpga-rtl-portfolio/tree/feat/zcu104-interrupt-driven-soc-control/projects/zcu104/04-interrupt-driven-soc-control',
  },
]

function ProjectVisual({ variant, title }: { variant: number; title: string }) {
  return (
    <div role="img" aria-label={`Technical illustration for ${title}`} className="relative -mx-6 -mt-6 mb-6 h-32 overflow-hidden bg-[#081727] md:-mx-7 md:-mt-7">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(34,211,238,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.16)_1px,transparent_1px)] [background-size:24px_24px]" />
      <svg viewBox="0 0 520 140" className="relative h-full w-full" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`project-stroke-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#67E8F9" />
            <stop offset="1" stopColor="#818CF8" />
          </linearGradient>
        </defs>
        {variant === 0 && <>
          <path d="M24 90H93V51H159V90H222V36H287V90H354V59H415V90H496" stroke={`url(#project-stroke-${variant})`} strokeWidth="3" strokeLinejoin="round" />
          <path d="M24 104H496" stroke="#24435B" strokeWidth="1" strokeDasharray="4 7" />
          {[93, 159, 222, 287, 354, 415].map((x) => <circle key={x} cx={x} cy={x === 93 || x === 159 || x === 287 || x === 415 ? 51 : x === 222 ? 36 : 59} r="4" fill="#A5F3FC" />)}
          <text x="24" y="29" fill="#A5F3FC" fontSize="10" fontFamily="monospace" letterSpacing="2">EVENT // SYNCHRONIZE // CONTROL</text>
        </>}
        {variant === 1 && <>
          <path d="M25 76C54 76 53 41 82 41S110 108 139 108 168 47 197 47 225 92 254 92 282 36 311 36 340 85 369 85 399 54 428 54 465 77 496 77" stroke={`url(#project-stroke-${variant})`} strokeWidth="3" />
          <path d="M25 112H496M25 28H496" stroke="#24435B" strokeWidth="1" strokeDasharray="4 7" />
          <rect x="222" y="45" width="100" height="54" rx="8" stroke="#4B6D87" fill="#0D2236" />
          <text x="272" y="77" fill="#CFFAFE" fontSize="10" textAnchor="middle" fontFamily="monospace">SENSOR → ACTUATOR</text>
        </>}
        {variant === 2 && <>
          {[0, 1, 2].map((row) => <g key={row}>
            <rect x="29" y={24 + row * 32} width="104" height="22" rx="5" fill="#102A40" stroke="#2E627E" />
            <text x="81" y={39 + row * 32} fill="#CFFAFE" fontSize="9" textAnchor="middle" fontFamily="monospace">REG {row}</text>
            <path d={`M133 ${35 + row * 32}H237`} stroke={`url(#project-stroke-${variant})`} strokeWidth="2" />
            <circle cx="237" cy={35 + row * 32} r="3" fill="#67E8F9" />
          </g>)}
          <rect x="266" y="32" width="220" height="76" rx="9" fill="#0D2236" stroke="#4B6D87" />
          <text x="376" y="61" fill="#CFFAFE" fontSize="11" textAnchor="middle" fontFamily="monospace">AXI4-LITE</text>
          <text x="376" y="80" fill="#91A9BC" fontSize="9" textAnchor="middle" fontFamily="monospace">ADDRESS / DATA / CONTROL</text>
        </>}
        {variant === 3 && <>
          <rect x="34" y="26" width="138" height="38" rx="7" fill="#102A40" stroke="#4B6D87" />
          <text x="103" y="49" fill="#CFFAFE" fontSize="10" textAnchor="middle" fontFamily="monospace">PROCESSOR SYSTEM</text>
          <rect x="348" y="76" width="138" height="38" rx="7" fill="#102A40" stroke="#4B6D87" />
          <text x="417" y="99" fill="#CFFAFE" fontSize="10" textAnchor="middle" fontFamily="monospace">PROGRAMMABLE LOGIC</text>
          <path d="M172 45H242V95H348M242 45H302V95H348" stroke={`url(#project-stroke-${variant})`} strokeWidth="2" />
          <path d="M242 22V45M302 95V122M242 95H205" stroke="#818CF8" strokeWidth="2" strokeDasharray="4 5" />
          <circle cx="242" cy="45" r="4" fill="#A5F3FC" />
          <circle cx="302" cy="95" r="4" fill="#C4B5FD" />
        </>}
      </svg>
    </div>
  )
}

function SectionHeading({ id, eyebrow, title, body }: { id: string; eyebrow: string; title: string; body?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      {body && <p className="mt-4 text-lg leading-relaxed text-slate-600">{body}</p>}
    </div>
  )
}

function HardwareVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]" aria-label="Illustration of a digital hardware chip and signal paths" role="img">
      <div className="absolute inset-8 rounded-full bg-cyan-400/10 blur-3xl" />
      <svg viewBox="0 0 560 430" className="relative h-auto w-full overflow-visible" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="chip-gradient" x1="164" y1="86" x2="385" y2="322" gradientUnits="userSpaceOnUse">
            <stop stopColor="#12365A" />
            <stop offset="1" stopColor="#0A1428" />
          </linearGradient>
          <linearGradient id="trace-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#22D3EE" />
            <stop offset="1" stopColor="#818CF8" />
          </linearGradient>
        </defs>
        <path d="M34 103H132V145H171M526 94H424V145H389M32 327H131V286H171M526 329H427V286H389" stroke="#1E4164" strokeWidth="2" />
        <path d="M41 214H121V189H171M520 214H439V189H389M280 24V80M280 350V406" stroke="#1E4164" strokeWidth="2" />
        <path d="M35 103H132V145H171M526 94H424V145H389M32 327H131V286H171M526 329H427V286H389" stroke="url(#trace-gradient)" strokeWidth="2" strokeDasharray="5 12" opacity=".8" />
        <circle cx="35" cy="103" r="5" fill="#22D3EE" />
        <circle cx="526" cy="94" r="5" fill="#818CF8" />
        <circle cx="32" cy="327" r="5" fill="#818CF8" />
        <circle cx="526" cy="329" r="5" fill="#22D3EE" />
        <rect x="157" y="72" width="246" height="286" rx="25" fill="#06101F" stroke="#35617E" strokeWidth="2" />
        <rect x="174" y="89" width="212" height="252" rx="17" fill="url(#chip-gradient)" stroke="#1F5271" />
        <rect x="203" y="121" width="154" height="188" rx="12" fill="#09182B" stroke="#287D9B" />
        <path d="M220 147H340M220 166H319M220 264H340M220 283H301" stroke="#1D4964" strokeWidth="2" />
        <path d="M232 207H262L276 190L293 225L310 207H329" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="276" cy="190" r="4" fill="#A5F3FC" />
        <circle cx="293" cy="225" r="4" fill="#A5F3FC" />
        <text x="280" y="247" fill="#CFFAFE" textAnchor="middle" fontSize="12" fontFamily="monospace" letterSpacing="3">DIGITAL LOGIC</text>
        {Array.from({ length: 6 }).map((_, i) => (
          <React.Fragment key={i}>
            <path d={`M${188 + i * 33} 72V55M${188 + i * 33} 358V375`} stroke="#4B7891" strokeWidth="3" />
            <path d={`M157 ${111 + i * 44}H140M403 ${111 + i * 44}H420`} stroke="#4B7891" strokeWidth="3" />
          </React.Fragment>
        ))}
        <motion.circle cx="280" cy="207" r="83" stroke="#22D3EE" strokeWidth="1" opacity=".35" animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.2, 0.55, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.circle cx="132" cy="145" r="4" fill="#A5F3FC" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2.4, repeat: Infinity }} />
        <motion.circle cx="424" cy="286" r="4" fill="#C4B5FD" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2.8, repeat: Infinity, delay: 0.6 }} />
      </svg>
      <div className="absolute left-0 top-[18%] hidden rounded-lg border border-cyan-300/20 bg-slate-950/80 px-3 py-2 font-mono text-xs text-cyan-100 shadow-lg shadow-cyan-950/30 sm:block">RTL // SYSTEMVERILOG</div>
      <div className="absolute bottom-[16%] right-0 hidden rounded-lg border border-indigo-300/20 bg-slate-950/80 px-3 py-2 font-mono text-xs text-indigo-100 shadow-lg shadow-indigo-950/30 sm:block">TIMING // VERIFIED</div>
    </div>
  )
}

function FpgaAsicPage() {
  const [selectedBuild, setSelectedBuild] = useState(buildOptions[0].id)
  const [selectedStage, setSelectedStage] = useState(1)
  const [selectedCapability, setSelectedCapability] = useState(0)
  const currentBuild = buildOptions.find((item) => item.id === selectedBuild) ?? buildOptions[0]
  const currentStage = designStages[selectedStage]
  const currentCapability = capabilities[selectedCapability]

  return (
    <MotionConfig reducedMotion="user">
      <main>
        <section className="relative isolate overflow-hidden bg-[#071321] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_45%,rgba(8,145,178,0.18),transparent_42%),linear-gradient(120deg,#071321_20%,#0b1a32_66%,#11152d)]" />
          <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(125,211,252,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.2)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="container relative mx-auto grid min-h-[690px] items-center gap-8 px-4 pb-24 pt-16 lg:min-h-[720px] lg:grid-cols-[1fr_1.05fr] lg:gap-4 lg:pt-20">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="relative z-10 max-w-2xl">
              <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Coltium Digital Hardware</p>
              <h1 className="text-4xl font-bold uppercase leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
                FPGA <span className="text-cyan-300">•</span> SoC <span className="text-cyan-300">•</span> ASIC
                <span className="mt-2 block text-white">Design</span>
              </h1>
              <p className="mt-6 text-2xl font-medium text-slate-100 sm:text-3xl">From idea to digital hardware.</p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Architecture <span className="text-cyan-400">·</span> RTL <span className="text-cyan-400">·</span> Verification <span className="text-cyan-400">·</span> Implementation <span className="text-cyan-400">·</span> Silicon
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                  Discuss your project <ArrowRight size={18} />
                </Link>
                <Link href="#engineering-work" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-500/70 bg-slate-900/30 px-6 py-3 font-semibold text-white transition-colors hover:border-cyan-300 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                  View engineering work <ArrowDown size={17} />
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
                <span>Hardware architecture</span><span className="text-cyan-400">/</span><span>Digital logic</span><span className="text-cyan-400">/</span><span>System integration</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.12 }}>
              <HardwareVisual />
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        </section>

        <section aria-labelledby="build-title" className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeading id="build-title" eyebrow="Start with the outcome" title="What are you building?" body="Choose a direction or bring us the requirement. We can help shape the right hardware path." />
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {buildOptions.map((option) => {
                const Icon = option.icon
                const active = option.id === selectedBuild
                return (
                  <button key={option.id} type="button" aria-pressed={active} onClick={() => setSelectedBuild(option.id)} className={`group min-h-[220px] rounded-2xl border p-6 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 ${active ? 'border-cyan-600 bg-slate-950 text-white shadow-xl shadow-cyan-950/15' : 'border-slate-200 bg-white text-slate-900 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-lg'}`}>
                    <span className={`mb-8 flex h-12 w-12 items-center justify-center rounded-xl ${active ? 'bg-cyan-300/15 text-cyan-300' : 'bg-cyan-50 text-cyan-800'}`}><Icon size={23} /></span>
                    <span className="block text-lg font-bold">{option.title}</span>
                    <span className={`mt-2 block text-sm leading-relaxed ${active ? 'text-slate-300' : 'text-slate-600'}`}>{option.description}</span>
                  </button>
                )
              })}
            </div>
            <div className="mx-auto mt-6 flex max-w-6xl flex-col items-start justify-between gap-4 rounded-xl border border-cyan-100 bg-cyan-50/70 p-5 sm:flex-row sm:items-center">
              <p aria-live="polite" className="text-sm text-slate-700"><span className="font-semibold text-slate-950">Selected: {currentBuild.title}.</span> {currentBuild.description}</p>
              <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 font-semibold text-cyan-800 hover:text-cyan-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700">Start a conversation <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="flow-title" className="bg-[#f4f8fb] py-20 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeading id="flow-title" eyebrow="The engineering path" title="From requirement to hardware" body="Start at any stage. Coltium can architect, design, verify, integrate or advance an existing digital hardware project." />
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-6">
                {designStages.map((stage, index) => (
                  <button key={stage.name} type="button" aria-pressed={selectedStage === index} onClick={() => setSelectedStage(index)} className={`relative min-h-[108px] rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-2 ${selectedStage === index ? 'border-slate-900 bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-800 hover:border-cyan-500'}`}>
                    <span className={`mb-3 block font-mono text-xs ${selectedStage === index ? 'text-cyan-300' : 'text-cyan-800'}`}>0{index + 1}</span>
                    <span className="block text-sm font-bold leading-snug">{stage.name}</span>
                    {index < designStages.length - 1 && <ArrowRight aria-hidden="true" className="absolute -right-[14px] top-1/2 z-10 hidden -translate-y-1/2 text-cyan-700 xl:block" size={22} />}
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-2xl bg-slate-950 p-6 text-white md:p-8">
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Selected stage</p>
                    <h3 className="mt-2 text-2xl font-bold">{currentStage.name}</h3>
                    <p aria-live="polite" className="mt-3 leading-relaxed text-slate-300">{currentStage.detail}</p>
                  </div>
                  <div className="flex max-w-xl flex-wrap gap-2">
                    {currentStage.tags.map((tag) => <span key={tag} className="rounded-full border border-cyan-200/20 bg-cyan-300/10 px-3 py-1.5 font-mono text-xs text-cyan-100">{tag}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="capability-title" className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeading id="capability-title" eyebrow="Engineering capability" title="Built around the system" body="Explore the disciplines that connect digital logic to a working hardware platform." />
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="relative overflow-hidden rounded-3xl bg-[#071321] p-5 sm:p-8">
                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.2)_1px,transparent_1px)] [background-size:32px_32px]" />
                <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {capabilities.map((capability, index) => {
                    const active = selectedCapability === index
                    return (
                      <button key={capability.name} type="button" aria-pressed={active} onClick={() => setSelectedCapability(index)} className={`flex min-h-[112px] flex-col justify-between rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${active ? 'border-cyan-300 bg-cyan-300/15 text-white' : 'border-slate-600/70 bg-slate-900/80 text-slate-200 hover:border-cyan-400/70'}`}>
                        <span className={`h-2 w-2 rounded-full ${active ? 'bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]' : 'bg-slate-500'}`} />
                        <span className="mt-4 text-sm font-semibold leading-snug">{capability.name}</span>
                      </button>
                    )
                  })}
                </div>
                <p className="relative mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/70">Digital hardware capability map // select a node</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 md:p-9">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-800">Capability 0{selectedCapability + 1}</span>
                <h3 className="mt-4 text-2xl font-bold text-slate-950">{currentCapability.name}</h3>
                <p aria-live="polite" className="mt-4 leading-relaxed text-slate-600">{currentCapability.text}</p>
                <div className="mt-7 h-px bg-gradient-to-r from-cyan-500/70 to-transparent" />
                <p className="mt-5 text-sm text-slate-500">Capabilities can be combined across a complete design or applied to a specific stage of an existing project.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="engineering-work" aria-labelledby="engineering-work-title" className="scroll-mt-24 bg-[#f4f8fb] py-20 md:py-24">
          <div className="container mx-auto px-4">
            <SectionHeading id="engineering-work-title" eyebrow="Engineering proof" title="Built. Verified. Measured." body="Selected FPGA and SoC work demonstrating digital logic, interfaces, timing and embedded integration." />
            <div role="region" aria-label="Engineering projects; swipe to browse" className="mx-auto flex max-w-6xl snap-x snap-mandatory gap-5 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
              {engineeringProjects.map((project, index) => (
                <article key={project.title} className="group flex min-h-[250px] min-w-[86%] snap-start flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-slate-900/5 md:min-w-0 md:p-7">
                  <ProjectVisual variant={index} title={project.title} />
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="font-mono text-xs font-semibold tracking-[0.18em] text-cyan-800">PROJECT / 0{index + 1}</span>
                    <span className="rounded-md bg-slate-950 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-200">ZCU104</span>
                  </div>
                  <h3 className="max-w-lg text-xl font-bold leading-snug text-slate-950 md:text-2xl">{project.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">{tag}</span>)}
                  </div>
                  <Link href={project.href} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-cyan-800 hover:text-cyan-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700">
                    View project <ExternalLink size={15} aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-9 text-center">
              <Link href="https://github.com/franksombudsman-ops/fpga-rtl-portfolio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition-colors hover:border-cyan-600 hover:text-cyan-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700">
                Explore engineering portfolio <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-slate-950 py-20 text-white md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(8,145,178,0.2),transparent_46%)]" />
          <div className="container relative mx-auto px-4 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-300"><Check size={23} /></span>
            <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Coltium digital hardware</p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">Have a digital hardware problem?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">Bring the requirement, architecture, existing RTL or prototype. Coltium Engineering can help take it forward.</p>
            <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-7 py-3 font-bold text-slate-950 transition-colors hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
              Talk to Coltium Engineering <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
    </MotionConfig>
  )
}

export default FpgaAsicPage
