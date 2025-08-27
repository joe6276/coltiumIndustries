import React from 'react'
import TechHero from '@/components/technologies/TechHero'
import EmbeddedSystems from '@/components/technologies/EmbeddedSystems'
import ArtificialIntelligence from '@/components/technologies/ArtificialIntelligence'
import ChipDesign from '@/components/technologies/ChipDesign'
import IoTConnectivity from '@/components/technologies/IoTConnectivity'
import QuantumComputing from '@/components/technologies/QuantumComputing'
import PredictiveSystems from '@/components/technologies/PredictiveSystems'
import SpaceNavigation from '@/components/technologies/SpaceNavigation'
import SportsTechnology from '@/components/technologies/SportsTechnology'
import TechnologiesList from '@/components/technologies/TechnologiesList'
import TechnologyDetails from '@/components/technologies/TechnologyDetails'

export const metadata = {
  title: 'Technologies & Applications | Coltium Industries',
  description: 'Explore our technology stack from embedded systems to AI, chip design, IoT, quantum computing, predictive systems, space navigation, and sports technology.',
  keywords: 'embedded systems, AI, chip design, ASIC, FPGA, IoT, quantum computing, predictive systems, space navigation, sports technology',
}

export default function TechnologiesPage() {
  return (
    <>
      <TechHero />
      {/* <TechnologiesList />
      <TechnologyDetails /> */}
      <EmbeddedSystems />
      <ArtificialIntelligence />
      <ChipDesign />
      <IoTConnectivity />
      <QuantumComputing />
      <PredictiveSystems />
      <SpaceNavigation />
      <SportsTechnology />
    </>
  )
}