import React from 'react'
import { LineChart } from 'lucide-react'
import TechSection from './TechSection'

const predictiveApplications = [
  {
    subTechnology: "Condition Monitoring AI",
    application: "Smart elevators (FDK), HVAC analytics"
  },
  {
    subTechnology: "Vibration Analysis",
    application: "Rotating equipment life prediction"
  },
  {
    subTechnology: "Asset Health Indexing",
    application: "Urban infrastructure (bridges, generators)"
  },
  {
    subTechnology: "Time Series Forecasting",
    application: "Logistics planning and stock optimization"
  },
  {
    subTechnology: "3D Digital Twin Visualization",
    application: "Virtual inspection dashboards for clients"
  }
]

const PredictiveSystems = () => {
  return (
    <TechSection
      id="predictive-systems"
      title="Predictive Systems & Digital Twins"
      icon={<LineChart className="h-8 w-8 text-primary" />}
      description="We develop systems that analyze data in real-time to predict outcomes and enable proactive responses, creating digital representations of physical assets."
      backgroundColor="bg-secondary/20"
      applications={predictiveApplications}
    />
  )
}

export default PredictiveSystems