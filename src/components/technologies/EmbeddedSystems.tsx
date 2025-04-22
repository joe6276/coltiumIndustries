import React from 'react'
import { Cpu } from 'lucide-react'
import TechSection from './TechSection'

const embeddedApplications = [
  {
    subTechnology: "MCU/MPU Architecture (NXP, Infineon, TI)",
    application: "Predictive maintenance, industrial sensors, medical monitoring"
  },
  {
    subTechnology: "Custom Board Design (PCB + Firmware)",
    application: "Garage diagnostic kits, smart home devices"
  },
  {
    subTechnology: "Real-time OS (FreeRTOS, Zephyr)",
    application: "Safety-critical systems, robotics, wearables"
  },
  {
    subTechnology: "Edge Connectivity (CAN, RS485, Modbus)",
    application: "Vehicle ECUs, smart energy devices, factory controllers"
  },
  {
    subTechnology: "Secure Bootloaders",
    application: "Tamper-proof updates for critical systems (e.g. Finstinct)"
  }
]

const EmbeddedSystems = () => {
  return (
    <TechSection
      id="embedded-systems"
      title="Embedded Systems & Firmware"
      icon={<Cpu className="h-8 w-8 text-primary" />}
      description="We design and develop custom hardware and firmware solutions tailored for specific applications, from sensor networks to control systems."
      backgroundColor="bg-white"
      applications={embeddedApplications}
    />
  )
}

export default EmbeddedSystems