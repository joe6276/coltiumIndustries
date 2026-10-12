import React from 'react'
import Hero from '@/components/home/Hero'
import CompanyOverview from '@/components/home/CompanyOverview'
import KeySectors from '@/components/home/KeySectors'
import QuickLinks from '@/components/home/QuickLinks'
import Testimonials from '@/components/home/Testimonials'
import { EngineeringHighlight, FeaturedProject, ProductHighlights, PartnerHighlights, ProjectEnquiry } from '@/components/home/HomeHighlights'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyOverview />
      <EngineeringHighlight />
      <FeaturedProject />
      <ProductHighlights />
      <KeySectors />
      <PartnerHighlights />
      <Testimonials />
      <QuickLinks />
      <ProjectEnquiry />
    </>
  )
}
