import React from 'react'
import { Brain } from 'lucide-react'
import TechSection from './TechSection'

const aiApplications = [
  {
    subTechnology: "TinyML / Edge AI",
    application: "Voice biometrics, environmental prediction (wearables)"
  },
  {
    subTechnology: "LLM Integration (OpenAI, Azure AI)",
    application: "Docstant – intelligent medical copilot"
  },
  {
    subTechnology: "Reinforcement Learning",
    application: "Dynamic route planning for Pweza Logistics"
},
{
  subTechnology: "Computer Vision",
  application: "Optical reading of meters, surveillance classification"
},
{
  subTechnology: "AIoT",
  application: "Interconnected devices with self-decision ability"
}
]

const ArtificialIntelligence = () => {
return (
  <TechSection
    id="artificial-intelligence"
    title="Artificial Intelligence (AI/ML)"
    icon={<Brain className="h-8 w-8 text-primary" />}
    description="We develop and implement AI models that can learn, adapt, and make decisions based on data patterns, optimized for embedded and edge deployments."
    backgroundColor="bg-secondary/20"
    applications={aiApplications}
  />
)
}

export default ArtificialIntelligence