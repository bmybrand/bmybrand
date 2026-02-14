'use client'

import React, { useEffect, useRef, useState } from 'react'

const Fountherobar = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  

  return (
    <div
    
      className="relative bg-[url('/doc.svg')] bg-cover bg-center h-fit lg:h-150 overflow-hidden flex justify-center items-center"
      
    >

      <div className="relative flex flex-col w-[90%] 2xl:w-[85%] h-full pt-30 items-center justify-center text-center">
        <div
          className={`relative z-10 flex flex-col gap-4 py-20 lg:py-32 max-w-6xl transition-all duration-1200 ease-out ${
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
          }`}
        >
          <h1 className="BenzinSemibold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
          Fountain Hills Emergency Room & Medical Center
          </h1>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/80 leading-relaxed">
          We designed and developed a modern, patient-first website for Fountain Hills Emergency Room and Medical Center that clearly communicates 24/7 emergency care, key medical services, and critical patient information. The experience focuses on trust, clarity, and fast access—making it easy for patients to call, get directions, book appointments, and find answers when they need them most.</p>
        </div>
      </div>
    </div>
  )
}

export default Fountherobar
