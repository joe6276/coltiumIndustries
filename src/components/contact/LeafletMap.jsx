"use client"

import React, { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Coordinates for Langata Hardy, Nairobi
const position = [-1.3553, 36.7349]

const LeafletMap = () => {
  useEffect(() => {
    // Fix Leaflet icon issues
    delete L.Icon.Default.prototype._getIconUrl
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }, [])

  return (
    <MapContainer 
      center={position} 
      zoom={15} 
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <div className="p-1">
            <strong>Coltium Industries</strong><br />
            Langata Hardy, Nairobi
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default LeafletMap