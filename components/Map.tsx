'use client'

import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Graticule, Sphere, Marker } from 'react-simple-maps'

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Function to generate varied shades for each country
const getCountryShade = (countryCode: string | undefined, baseColor: string) => {
  // Return base color if no country code
  if (!countryCode) return baseColor;
  
  // Create a simple hash from country code
  let hash = 0;
  for (let i = 0; i < countryCode.length; i++) {
    hash = countryCode.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert to a variation between -20 and +20
  const variation = (hash % 40) - 20;
  
  // Parse the hex color
  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);
  
  // Apply variation
  const newR = Math.max(0, Math.min(255, r + variation));
  const newG = Math.max(0, Math.min(255, g + variation));
  const newB = Math.max(0, Math.min(255, b + variation));
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

const offices = [
  {
    name: 'Canada',
    metric: '350+ Projects',
    coordinates: [-106.3468, 56.1304],
  },
  {
    name: 'United States',
    metric: '14.673 mt/capita',
    coordinates: [-95.7129, 37.0902],
  },
]

export default function Map() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    if (hoveredCountry) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [hoveredCountry])

  return (
    <section className="bg-[#0F1035] py-20">
      <div className="w-[90%] lg:w-[85%] 2xl:w-[80%] mx-auto">
        <div className="text-center mb-12">
          <h2 className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white BenzinSemibold mb-4">
            Our <span className="text-[#F45B25]">Global Reach</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            We work with clients from all around the world, delivering exceptional digital solutions globally.
          </p>
        </div>

        <div className="relative overflow-visible">
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{
              rotate: [-20, 0, 0],
              scale: 170,
            }}
            width={800}
            height={500}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <Sphere stroke="none" strokeWidth={0} fill="transparent" id="sphere" />
            
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name || geo.id
                  const countryCode = geo.id
                  // USA and Canada get specific darker shades, others get varied light shades
                  const isUSA = countryCode === '840' || countryCode === 'USA' || countryCode === 'US'
                  const isCanada = countryCode === '124' || countryCode === 'CAN' || countryCode === 'CA'
                  
                  let baseFill, hoverFill
                  
                  if (isUSA) {
                    baseFill = '#E8632A'   // Darker orange for USA
                    hoverFill = '#B84418'  // Very dark on hover
                  } else if (isCanada) {
                    baseFill = '#E8632A'   // Same darker orange for Canada
                    hoverFill = '#B84418'  // Very dark on hover
                  } else {
                    // All other countries get varied light shades (lighter than USA/Canada)
                    baseFill = getCountryShade(countryCode, '#FF996A')
                    hoverFill = getCountryShade(countryCode, '#FF8553')
                  }
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredCountry(countryName)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      style={{
                        default: {
                          fill: baseFill,
                          stroke: "none",
                          outline: "none",
                        },
                        hover: {
                          fill: hoverFill,
                          stroke: "none",
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: hoverFill,
                          outline: "none",
                        },
                      }}
                    />
                  )
                })
              }
            </Geographies>

            {offices.map((office) => (
              <Marker key={office.name} coordinates={office.coordinates as [number, number]}>
                {/* Simple dot marker */}
                <circle cx="0" cy="0" r="5" fill="#F45B25" stroke="#FFFFFF" strokeWidth="2" />
              </Marker>
            ))}
          </ComposableMap>
          
          {hoveredCountry && (
            <div 
              className="fixed bg-white text-[#F45B25] px-4 py-2 rounded shadow-lg z-50 pointer-events-none border border-gray-200"
              style={{
                left: `${mousePosition.x + 15}px`,
                top: `${mousePosition.y + 15}px`,
              }}
            >
              <p className="text-sm font-semibold whitespace-nowrap">{hoveredCountry}</p>
              {/* Show additional info for USA and Canada */}
              {(hoveredCountry === 'United States' || hoveredCountry === 'United States of America') && (
                <p className="text-xs text-gray-600 mt-1">headoffice ustin, Texas</p>
              )}
              {hoveredCountry === 'Canada' && (
                <p className="text-xs text-gray-600 mt-1">headoffice Toronto, Canada</p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl text-[#FF6B35] BenzinSemibold mb-2">50+</h3>
            <p className="text-white/80 text-sm md:text-base">Countries Served</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl text-[#FF6B35] BenzinSemibold mb-2">200+</h3>
            <p className="text-white/80 text-sm md:text-base">Happy Clients</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl text-[#FF6B35] BenzinSemibold mb-2">500+</h3>
            <p className="text-white/80 text-sm md:text-base">Projects Completed</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl text-[#FF6B35] BenzinSemibold mb-2">24/7</h3>
            <p className="text-white/80 text-sm md:text-base">Support Available</p>
          </div>
        </div>
      </div>
    </section>
  )
}

