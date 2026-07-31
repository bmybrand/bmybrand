'use client'

import React from 'react'
import { motion } from 'framer-motion'

const locations = [
  {
    title: 'US Office',
    city: 'Allen',
    cityDetail: 'PO BOX 605, Allen, TX',
    mapUrl: 'https://www.google.com/maps?q=PO%20BOX%20605%20Allen%2C%20TX%2075013&output=embed',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=PO+BOX+605+Allen%2C+TX+75013',
    email: 'info@bmybrand.com',
    phone: '+1 469 501 1401',
    location: 'Austin, TX 73301, USA'
  },
  {
    title: 'Canada Office',
    city: 'Toronto',
    cityDetail: '845 Adelaide St W, Toronto',
    mapUrl: 'https://www.google.com/maps?q=845%20Adelaide%20St%20W%2C%20Toronto%2C%20ON%20M6J%203X1%2C%20Canada&output=embed',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=845+Adelaide+St+W%2C+Toronto%2C+ON+M6J+3X1%2C+Canada',
    email: 'info@bmybrand.com',
    phone: '+(587) 492-5888',
    location: '845 Adelaide St W, Toronto, ON M6J 3X1, Canada'
  }
]

export default function ContactLocations() {
  return (
    <section className="bg-[#11122F] text-white pt-20 pb-0 overflow-x-hidden">
      <div className="mx-auto w-[90%] 2xl:w-[75%] max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Map */}
              <div className="relative w-full h-84 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <iframe
                  src={location.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
                
                {/* Location Badge */}
                <div className="absolute top-4 right-4 bg-white rounded-lg px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#F45B25]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="text-sm font-semibold text-[#11122F]">{location.city}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{location.cityDetail}</p>
                  <a
                    href={location.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#F45B25] hover:underline mt-1 inline-block"
                  >
                    View larger map
                  </a>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-xl md:text-2xl text-white BenzinSemibold mb-4">
                  {location.title}
                </h3>
                
                <div className="space-y-3">
                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 shrink-0">
                      <svg className="w-full h-full text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm">Email: {location.email}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 shrink-0">
                      <svg className="w-full h-full text-[#F45B25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm">Phone: {location.phone}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 shrink-0">
                      <svg className="w-full h-full text-[#F45B25]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm">Location: {location.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
