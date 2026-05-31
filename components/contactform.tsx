'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
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
    description:
      'Schedule a quick call to discuss your goals, project scope, and timeline. No pressure-just clear direction and next steps.',
  },
  {
    iconSrc: '/bmyb-contact-custom-quote-01.svg',
    title: 'Get A Custom Quote',
    description:
      "Tell us what you need, and we'll provide a tailored estimate with the right solution, pricing, and approach for your project.",
  },
  {
    iconSrc: '/bmyb-contact-website-audit-01.svg',
    title: 'Request A Website Audit',
    description:
      "Share your website URL, and we'll review it for UX, messaging, performance, and conversion improvement opportunities.",
  },
  {
    iconSrc: '/bmyb-contact-project-support-01.svg',
    title: 'Get Project Support',
    description:
      'Need help with an ongoing project? Reach out for updates, revisions, or any technical or design support.',
  },
  {
    iconSrc: '/bmyb-contact-partnership-collabs-01.svg',
    title: 'Partnerships & Collaborations',
    description:
      "Let's explore how we can work together on long-term partnerships, collaborations, or strategic opportunities.",
  },
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
  'Other',
]

export default function ContactForm() {
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
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
        body: JSON.stringify({
          formType: 'contact',
          ...data,
          accessPage: pathname || '/',
        }),
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
    <section className="overflow-x-hidden bg-[#11122F] py-20 text-white">
      <div className="mx-auto w-[90%] max-w-360 2xl:w-[75%]">
        <div className="flex w-full min-w-0 flex-col gap-12 lg:flex-row">
          <div className="flex min-h-0 min-w-0 max-w-xl flex-1 flex-col justify-between">
            {contactOptions.map((option) => (
              <div key={option.title} className="flex max-w-lg items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 text-white">
                  <Image
                    src={option.iconSrc}
                    alt=""
                    width={32}
                    height={32}
                    className="h-7 w-7"
                  />
                </div>
                <div className="max-w-md">
                  <h3 className="BenzinRegular mb-2 text-base text-white md:text-lg xl:text-xl 2xl:text-2xl">
                    {option.title}
                  </h3>
                  <p className="text-base text-white/60">{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="BenzinSemibold mb-8 text-2xl text-white md:text-3xl lg:text-4xl">
              Let&apos;s Talk About What You Want to Build Next
            </h2>

            <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex w-full flex-col gap-4 sm:flex-row">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <input
                    className="h-12 w-full rounded-lg border border-white/10 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F45B25]"
                    placeholder="First Name"
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName && (
                    <span className="text-xs text-[#F45B25]">{errors.firstName.message}</span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <input
                    className="h-12 w-full rounded-lg border border-white/10 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F45B25]"
                    placeholder="Last Name"
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName && (
                    <span className="text-xs text-[#F45B25]">{errors.lastName.message}</span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 sm:flex-row">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <input
                    className="h-12 w-full rounded-lg border border-white/10 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F45B25]"
                    placeholder="Email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email',
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-xs text-[#F45B25]">{errors.email.message}</span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <input
                    className="h-12 w-full rounded-lg border border-white/10 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F45B25]"
                    placeholder="Phone"
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                  {errors.phone && (
                    <span className="text-xs text-[#F45B25]">{errors.phone.message}</span>
                  )}
                </div>
              </div>

              <div className="flex w-full min-w-0 flex-col gap-2">
                <select
                  className={`h-12 w-full rounded-lg border border-white/10 bg-transparent px-4 text-sm outline-none focus:border-[#F45B25] ${selectedService ? 'text-white' : 'text-white/40'}`}
                  {...register('service', { required: 'Please select a service' })}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-[#11122F] text-white/40">
                    Select Service
                  </option>
                  {services.map((service) => (
                    <option key={service} value={service} className="bg-[#11122F] text-white">
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span className="text-xs text-[#F45B25]">{errors.service.message}</span>
                )}
              </div>

              <div className="flex w-full min-w-0 flex-col gap-2">
                <textarea
                  className="min-h-35 w-full resize-none rounded-lg border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F45B25]"
                  placeholder="Message"
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message && (
                  <span className="text-xs text-[#F45B25]">{errors.message.message}</span>
                )}
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="BenzinSemibold h-12 w-full rounded-lg bg-linear-to-r from-[#F45B25] to-[#FF843E] text-white transition-all duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              {submitSuccess && <p className="text-sm text-green-400">{submitSuccess}</p>}
              {submitError && <p className="text-sm text-[#F45B25]">{submitError}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
