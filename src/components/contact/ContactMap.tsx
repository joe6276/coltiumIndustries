"use client"

import React, { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Globe, Phone } from 'lucide-react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '400px'
};

// Coordinates for Langata Hardy, Nairobi
const center = {
  lat: -1.3553, 
  lng: 36.7349
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#7c93a3" }, { lightness: -10 }],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.stroke",
      stylers: [{ color: "#ffffff" }, { visibility: "on" }, { weight: 1 }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f9f9f9" }],
    },
    {
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f2" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 0 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#fee379" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#c3d2e5" }],
    },
  ],
};

// WhatsApp SVG icon component
const WhatsAppIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="mr-3"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.655-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const ContactMap = () => {
  const [map, setMap] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  // Load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // WhatsApp number and message
  const whatsappNumber = "+17584869802";
  const whatsappMessage = "Hello Coltium Industries, I would like to get in touch.";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white rounded-lg shadow-md overflow-hidden h-full"
    >
      <div className="p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900">Address</h3>
              <p className="text-gray-600">
                15164-00509, Langata Hardy<br />
                Nairobi, Kenya
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900">Email</h3>
              <a href="mailto:contact@intl-coltium.com" className="text-gray-600 hover:text-primary transition-colors">
                contact@intl-coltium.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <Globe className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900">Website</h3>
              <a href="https://www.intl-coltium.com" className="text-gray-600 hover:text-primary transition-colors">
                www.intl-coltium.com
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-gray-900">Phone</h3>
              <p className="text-gray-600">
                +254 (0) 712 345 678
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <WhatsAppIcon />
            <div>
              <h3 className="font-medium text-gray-900">WhatsApp</h3>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors flex items-center"
              >
                +1 (758) 486-9802
                <span className="ml-2 text-xs text-gray-400">(Click to chat)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[400px] bg-gray-100 relative">
        {/* Google Map Implementation */}
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={options}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker 
              position={center}
              onClick={() => setShowInfoWindow(true)}
              icon={{
                path: "M12 0C7.58 0 4 3.58 4 8c0 1.33.37 2.74 1.07 3.91L12 23l6.93-11.09c.7-1.17 1.07-2.58 1.07-3.91 0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z",
                fillColor: "#11264D",
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 1.5,
                anchor: { x: 12, y: 23 },
              }}
            >
              {showInfoWindow && (
                <InfoWindow
                  position={center}
                  onCloseClick={() => setShowInfoWindow(false)}
                >
                  <div className="p-2">
                    <h3 className="font-medium text-gray-900 text-sm">Coltium Industries</h3>
                    <p className="text-gray-600 text-xs">15164-00509, Langata Hardy</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          </GoogleMap>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-gray-600 font-medium">Loading map...</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ContactMap