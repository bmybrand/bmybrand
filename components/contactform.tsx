'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  message: string
}

const contactOptions = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Book A Discovery Call',
    description: 'Schedule a quick call to discuss your goals, scope, and timeline—no pressure, just clarity.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Get A Custom Quote',
    description: 'Share what you need and we\'ll send a tailored estimate with the right package and next steps.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: 'Request A Website Audit',
    description: 'Want quick wins? Send us your URL and we\'ll review UX, messaging, and conversion opportunities.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: 'Project Support',
    description: 'Already working with us? Reach out here for updates, revisions, or ongoing support.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Partnerships & Collabs',
    description: 'Already working with us? Reach out here for updates, revisions, or ongoing support.'
  }
]

const services = [
  'Brand Identity & Design',
  'Website Development',
  'E-commerce Solutions',
  'Digital Marketing',
  'AI-Driven Solutions',
  'Business Operations',
  'Mobile App Development',
  'Custom Software',
  'Other'
]

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    mode: 'onSubmit',
  })

  const onSubmit = (data: FormValues) => {
    console.log('Contact form submission:', data)
    reset()
  }

  return (
    <section className="bg-[#11122F] text-white py-20 overflow-x-hidden">
      <div className="mx-auto w-[90%] 2xl:w-[75%] max-w-full">
        <div className="flex flex-col lg:flex-row gap-12 w-full min-w-0">
          
          {/* Left Section - Contact Options */}
          <div className="flex-1 min-w-0 space-y-6">
            {contactOptions.map((option, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0">
                  {option.icon}
                </div>
                <div>
                  <h3 className="text-white text-base md:text-lg BenzinSemibold mb-1">
                    {option.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Section - Contact Form */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white BenzinSemibold mb-8">
              Let's Build Something<br />
              Powerful Together
            </h2>

            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
              {/* First and Last Name Row */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25] text-white placeholder:text-white/40"
                    placeholder="First Name"
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName && (
                    <span className="text-xs text-[#F45B25]">{errors.firstName.message}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25] text-white placeholder:text-white/40"
                    placeholder="Last Name"
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName && (
                    <span className="text-xs text-[#F45B25]">{errors.lastName.message}</span>
                  )}
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25] text-white placeholder:text-white/40"
                    placeholder="Email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                  />
                  {errors.email && (
                    <span className="text-xs text-[#F45B25]">{errors.email.message}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25] text-white placeholder:text-white/40"
                    placeholder="Phone"
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                  {errors.phone && (
                    <span className="text-xs text-[#F45B25]">{errors.phone.message}</span>
                  )}
                </div>
              </div>

              {/* Service Select */}
              <div className="flex flex-col gap-2 w-full min-w-0">
                <select
                  className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25] text-white"
                  {...register('service', { required: 'Please select a service' })}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-[#11122F] text-white/40">
                    Select Service
                  </option>
                  {services.map((service, index) => (
                    <option key={index} value={service} className="bg-[#11122F] text-white">
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span className="text-xs text-[#F45B25]">{errors.service.message}</span>
                )}
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2 w-full min-w-0">
                <textarea
                  className="min-h-[140px] w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#F45B25] text-white placeholder:text-white/40 resize-none"
                  placeholder="Message"
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message && (
                  <span className="text-xs text-[#F45B25]">{errors.message.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="w-full">
                <button
                  type="submit"
                  className="w-full h-12 rounded-lg bg-gradient-to-r from-[#F45B25] to-[#FF843E] text-white font-semibold hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 BenzinSemibold"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
