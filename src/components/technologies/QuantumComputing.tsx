import React from 'react'
import { Atom } from 'lucide-react'
import TechSection from './TechSection'

const quantumApplications = [
  {
    subTechnology: "Qiskit SDK + Quantum Circuit Sim",
    application: "Research collaboration with ASIC College"
  },
  {
    subTechnology: "Quantum Encryption Testing",
    application: "Future-proof secure protocols for public infrastructure"
  },
  {
    subTechnology: "Hybrid Quantum-Classical Algorithms",
    application: "Experimental AI in cryptographic routines"
  },
  {
    subTechnology: "Quantum Device Simulators",
    application: "Education for R&D labs in Africa"
  }
]

const QuantumComputing = () => {
  return (
    <TechSection
      id="quantum-computing"
      title="Quantum & Advanced Computing"
      icon={<Atom className="h-8 w-8 text-primary" />}
      description="We explore and implement next-generation computing paradigms, including quantum algorithms and advanced processing architectures."
      backgroundColor="bg-white"
      applications={quantumApplications}
    />
  )
}

export default QuantumComputing