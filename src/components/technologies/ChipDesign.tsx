import React from 'react'
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
    <TechSection
      id="chip-design"
      title="ASIC & FPGA Design"
      icon={<Layers className="h-8 w-8 text-primary" />}
      description="We design custom semiconductors and FPGA solutions for specialized computing needs, from high-performance processing to low-power applications."
      backgroundColor="bg-white"
      applications={chipApplications}
    />
  )
}

export default ChipDesign