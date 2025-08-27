import React from 'react'
import OurStory from '@/components/about/OurStory'
import CompanyHistory from '@/components/about/CompanyHistory'
import VisionMission from '@/components/about/VisionMission'
import WhatWeDo from '@/components/about/WhatWeDo'

export const metadata = {
  title: 'About Us | Coltium Industries',
  description: 'Learn about Coltium Industries, our story, vision, mission, and what we do.',
  keywords: 'Coltium Industries, about us, tech innovation, vision, mission',
}

export default function AboutPage() {
  return (
    <>
      <OurStory />
      <CompanyHistory />
      <VisionMission />
      <WhatWeDo />
    </>
  )
}