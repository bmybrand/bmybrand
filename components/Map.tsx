'use client'

import { useState, useEffect } from 'react'
import { scaleLinear } from 'd3-scale'
import { ComposableMap, Geographies, Geography, Graticule, Sphere, Marker } from 'react-simple-maps'

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

const countryData: { [key: string]: number } = {
  'USA': 0.9,
  'CAN': 0.85,
  'AUS': 0.9,
  'GBR': 0.8,
  'SAU': 0.85,
  'FRA': 0.6,
  'DEU': 0.65,
  'ITA': 0.6,
  'ESP': 0.6,
  'JPN': 0.7,
  'KOR': 0.65,
  'IND': 0.7,
  'CHN': 0.75,
  'BRA': 0.6,
  'MEX': 0.6,
  'ARE': 0.8,
  'SGP': 0.7,
}

const colorScale = scaleLinear<string>()
  .domain([0, 0.5, 1])
  .range(['#FFE5D9', '#FFA573', '#FF6B35'])

const offices = [
  {
    name: 'Pakistan',
    metric: '245+ Projects',
    coordinates: [68.081, 28.8607],
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white BenzinSemibold mb-4">
            Our <span className="text-[#F45B25]">Global Reach</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
            We work with clients from all around the world, delivering exceptional digital solutions globally.
          </p>
        </div>

        <div className="relative bg-[#151735] rounded-2xl p-8 md:p-12 lg:p-16 shadow-xl overflow-hidden">
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 170,
            }}
            width={800}
            height={500}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <Sphere stroke="#2A2D5A" strokeWidth={1} fill="transparent" id="sphere" />
            <Graticule stroke="#2A2D5A" strokeWidth={0.5} strokeOpacity={0.4} />
            
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name || geo.id
                  const countryCode = geo.id
                  const intensity = countryData[countryCode] || 0.3
                  const baseFill = colorScale(intensity)
                  
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
                          fill: "#FF8C42",
                          stroke: "none",
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#FF6B35",
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
                {/* Offset the entire label so triangle points to correct location */}
                <g transform="translate(70, 0)">
                  <g style={{ filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))' }}>
                    <rect
                      x={-85}
                      y={-50}
                      width={170}
                      height={32}
                      fill="#FFFFFF"
                      rx="6"
                    />
                    
                    <path
                      d="M -75,-18 L -70,-8 L -65,-18 Z"
                      fill="#FFFFFF"
                    />
                  </g>
                  
                  <text
                    textAnchor="middle"
                    y={-28}
                    style={{
                      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                      fill: '#F45B25',
                      fontSize: '11px',
                      fontWeight: '600',
                      pointerEvents: 'none',
                      letterSpacing: '0.01em',
                    }}
                  >
                    <tspan>{office.name}: {office.metric}</tspan>
                  </text>
                </g>
                
                {/* Dot at actual marker location */}
                <circle cx="0" cy="0" r="3" fill="#F45B25" />
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

