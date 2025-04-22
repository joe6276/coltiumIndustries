import React from 'react'
import TeamHero from '@/components/team/TeamHero'
import TeamMembers from '@/components/team/TeamMembers'
import JoinTeam from '@/components/team/JoinTeam'

export const metadata = {
  title: 'Our Team | Coltium Industries',
  description: 'Meet the team behind Coltium Industries - innovative engineers and strategists building Africa\'s technology solutions.',
  keywords: 'tech team, engineering team, Frank Otieno Ouma, Samwel Njenga, tech leadership',
}

export default function TeamPage() {
  return (
    <>
      <TeamHero />
      <TeamMembers />
      <JoinTeam />
    </>
  )
}
