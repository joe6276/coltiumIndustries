import React from 'react'
import PartnersHero from '@/components/partners/PartnersHero'
import PartnersList from '@/components/partners/PartnersList'

export const metadata = {
  title: 'Partners | Coltium Industries',
  description: 'Discover our ecosystem of partners across healthcare, logistics, education, and technology sectors.',
  keywords: 'tech partners, FDK Elevators, Docstant, ASIC College, Pweza Logistics',
}

export default function PartnersPage() {
  return (
    <>
      <PartnersHero />
      <PartnersList />
    </>
  )
}
