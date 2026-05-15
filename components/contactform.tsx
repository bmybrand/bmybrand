'use client'

import Image from 'next/image'
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
    iconSrc: '/bmyb-contact-book-discovery-call-01.svg',
    title: 'Book A Discovery Call',
    description: 'Schedule a quick call to discuss your goals, scope, and timeline—no pressure, just clarity.'
  },
  {
    iconSrc: '/bmyb-contact-custom-quote-01.svg',
    title: 'Get A Custom Quote',
    description: 'Share what you need and we\'ll send a tailored estimate with the right package and next steps.'
  },
  {
    iconSrc: '/bmyb-contact-website-audit-01.svg',
    title: 'Request A Website Audit',
    description: 'Want quick wins? Send us your URL and we\'ll review UX, messaging, and conversion opportunities.'
  },
  {
    iconSrc: '/bmyb-contact-project-support-01.svg',
    title: 'Project Support',
    description: 'Already working with us? Reach out here for updates, revisions, or ongoing support.'
  },
  {
    iconSrc: '/bmyb-contact-partnership-collabs-01.svg',
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormValues>({
    mode: 'onSubmit',
  })

  const selectedService = watch('service', '')

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong.')
      }

      setSubmitSuccess('Your message has been sent. We will get back to you soon.')
      reset()
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to send your message.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-[#11122F] text-white py-20 overflow-x-hidden">
      <div className="mx-auto w-[90%] 2xl:w-[75%] max-w-360">
        <div className="flex flex-col lg:flex-row gap-12 w-full min-w-0">
          
          {/* Left Section - Contact Options */}
          <div className="flex-1 min-w-0 flex max-w-xl flex-col justify-between min-h-0">
            {contactOptions.map((option, index) => (
              <div key={index} className="flex max-w-lg gap-4 items-start">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white shrink-0">
                  <Image
                    src={option.iconSrc}
                    alt=""
                    width={32}
                    height={32}
                    className="w-7 h-7"
                  />
                </div>
                <div className="max-w-md">
                  <h3 className="text-white text-base md:text-lg xl:text-xl 2xl:text-2xl BenzinRegular mb-2">
                    {option.title}
                  </h3>
                  <p className="text-white/60 text-base">
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
                    className="h-12 w-full rounded-lg bg-transparent border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25] text-white placeholder:text-white/40"
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
                    className="h-12 w-full rounded-lg bg-transparent border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25] text-white placeholder:text-white/40"
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
                    className="h-12 w-full rounded-lg bg-transparent border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25] text-white placeholder:text-white/40"
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
                    className="h-12 w-full rounded-lg bg-transparent border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25] text-white placeholder:text-white/40"
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
                  className={`h-12 w-full rounded-lg bg-transparent border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25] ${selectedService ? 'text-white' : 'text-white/40'}`}
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
                  className="min-h-35 w-full rounded-lg bg-transparent border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#F45B25] text-white placeholder:text-white/40 resize-none"
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
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-lg bg-linear-to-r from-[#F45B25] to-[#FF843E] text-white font-semibold hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 BenzinSemibold disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              {submitSuccess && (
                <p className="text-sm text-green-400">{submitSuccess}</p>
              )}
              {submitError && (
                <p className="text-sm text-[#F45B25]">{submitError}</p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
