import React from 'react'
import { Globe } from 'lucide-react'
import TechSection from './TechSection'

const iotApplications = [
  {
    subTechnology: "Wi-Fi/BLE Modules (AIROC, ESP32, nRF)",
    application: "Wearables, smart home, logistics tracking"
  },
  {
    subTechnology: "MQTT/HTTP/CoAP Protocols",
    application: "Cloud-connected remote monitoring systems"
  },
  {
    subTechnology: "Secure Communication (TLS/SSL, OPTIGA Trust M)",
    application: "Healthcare and transport data privacy"
  },
  {
    subTechnology: "Geo-fencing (uBlox GPS + Cloud Sync)",
    application: "Pweza delivery tracking, asset protection"
  },
  {
    subTechnology: "OTA Updates & Remote Debugging",
    application: "FOTA for field-deployed devices"
  }
]

const IoTConnectivity = () => {
  return (
    <TechSection
      id="iot-connectivity"
      title="IoT & Secure Connectivity"
      icon={<Globe className="h-8 w-8 text-primary" />}
      description="We build connected device ecosystems that communicate securely and reliably, with emphasis on low-power operation and data privacy."
      backgroundColor="bg-secondary/20"
      applications={iotApplications}
    />
  )
}

export default IoTConnectivity