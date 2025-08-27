import React from 'react'
import Hero from '@/components/home/Hero'
import CompanyOverview from '@/components/home/CompanyOverview'
import KeySectors from '@/components/home/KeySectors'
import ImpactStatement from '@/components/home/ImpactStatement'
import QuickLinks from '@/components/home/QuickLinks'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyOverview />
      <KeySectors />
      <ImpactStatement />
      <QuickLinks />
    </>
  )
}