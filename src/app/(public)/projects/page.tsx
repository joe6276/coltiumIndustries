import React from 'react'
import ProjectsHero from '@/components/projects/ProjectsHero'
import ProjectList from '@/components/projects/ProjectList'

export const metadata = {
  title: 'Projects | Coltium Industries',
  description: 'Explore our innovative tech projects: predictive maintenance, secure IoT, quantum computing tools, and AI integrations.',
  keywords: 'tech projects, predictive maintenance, IoT, quantum computing, AI healthcare',
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectList />
    </>
  )
}