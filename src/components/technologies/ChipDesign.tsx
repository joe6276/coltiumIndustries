import React from 'react'
import Link from 'next/link'
import { Layers } from 'lucide-react'
import TechSection from './TechSection'

const chipApplications = [
  {
    subTechnology: "RTL Design (Verilog/SystemVerilog)",
    application: "Custom silicon design, prototyping embedded CPUs"
  },
  {
    subTechnology: "FPGA Prototyping (Xilinx, Intel)",
    application: "Garage test platforms, low-latency neural nets"
  },
  {
    subTechnology: "Hardware Description Modeling",
    application: "Simulation of processor flows for ASIC tape-outs"
  },
  {
    subTechnology: "High-Speed Interfaces (I2S, LVDS)",
    application: "Audio, camera, display modules in smart devices"
  },
  {
    subTechnology: "Chip Emulation & Verification",
    application: "Partner demos, lab simulations for ASIC College"
  }
]

const ChipDesign = () => {
  return (
    <>
      <TechSection
        id="chip-design"
        title="ASIC & FPGA Design"
        icon={<Layers className="h-8 w-8 text-primary" />}
        description="We design custom semiconductors and FPGA solutions for specialized computing needs, from high-performance processing to low-power applications."
        backgroundColor="bg-white"
        applications={chipApplications}
      />
      <div className="bg-white pb-16">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/fpga-asic"
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Explore FPGA, SoC &amp; ASIC Engineering
          </Link>
        </div>
      </div>
    </>
  )
}

export default ChipDesign
