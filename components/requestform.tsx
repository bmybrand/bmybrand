'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

gsap.registerPlugin(ScrollTrigger);

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

type FaqItem = {
  number: string;
  question: string;
  answer?: string;
};

const FAQS: FaqItem[] = [
  {
    number: '01',
    question: 'What services does BMYBrand offer?',
    answer:
      'BMYBrand provides complete digital solutions, including AI-driven systems, software development, digital marketing, commerce solutions, brand experience design, and business operations support.',
  },
  {
    number: '02',
    question: 'Do you work with small businesses and startups?',
    answer:
      'Yes, we work with startups, small businesses, and established brands. Our solutions are tailored to match each business stage, goals, and budget requirements.',
  },
  {
    number: '03',
    question: 'How long does a project usually take?',
    answer:
      'Timelines depend on the project scope. Simple projects may take a few weeks, while complex solutions like software or platforms take longer based on requirements.',
  },
  {
    number: '04',
    question: 'Do you provide custom solutions or ready-made templates?',
    answer:
      'We focus on fully custom solutions designed specifically for your business needs, ensuring better performance, scalability, and long-term usability.',
  },
  {
    number: '05',
    question: 'Can I request changes during the project?',
    answer:
      'Yes, we follow a collaborative process where feedback and revisions are included to ensure the final output matches your expectations and requirements.',
  },
  {
    number: '06',
    question: 'How do I get started with BMYBrand?',
    answer:
      'You can simply contact us through the website, share your idea or requirements, and our team will guide you through the next steps.',
  },
];

type RequestFormProps = {
  title?: React.ReactNode;
};

export default function RequestForm({ title }: RequestFormProps) {
  const pathname = usePathname();
  const [openFaq, setOpenFaq] = useState<string | null>('01');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const faqColRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !formColRef.current || !faqColRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.05, ease: 'sine.out', clearProps: 'transform' }
      )
        .fromTo(
          formColRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 1.0, ease: 'sine.out', clearProps: 'transform' },
          '-=0.5'
        )
        .fromTo(
          faqColRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 1.0, ease: 'sine.out', clearProps: 'transform' },
          '-=0.8'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (number: string) => {
    setOpenFaq((prev) => (prev === number ? null : number));
  };

  const onSubmit = async (data: FormValues) => {
    setSubmitStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          service: 'Custom Quote Request',
          accessPage: pathname ?? '',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('[RequestForm] Email route error:', result);
        setSubmitStatus('error');
        return;
      }

      setSubmitStatus('success');
      reset();
    } catch (err) {
      console.error('[RequestForm] Submit failed:', err);
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-[#11122F] text-white py-20 overflow-x-hidden">
      <div className="mx-auto w-[90%] 2xl:w-[75%] max-w-full">
        

        <div className="flex flex-col lg:flex-row gap-12 w-full min-w-0">
          
          {/* Left Section: Form */}
          <div ref={formColRef} className="flex-1 min-w-0">
          <div ref={headingRef}>
          <h2 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-4xl font-semibold mb-4 text-center lg:text-left BenzinSemibold  max-w-2xl">
            {title ?? (
              <>
                <span className="text-[#F45B25]">Talk to Us</span> About Your Business Goals and
                <br />
                Ideas!
              </>
            )}
          </h2>
          <p className="text-[#ADAECC] text-sm sm:text-base mb-12 text-center lg:text-left max-w-2xl">
            Contact us today to discuss how we can help you design, develop, and scale your digital
            presence effectively.
          </p>
        </div>
            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
              {/* First and Last Name Row */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                    placeholder="First Name"
                    type="text"
                    {...register('firstName', { required: 'First name is required' })}
                  />
                  {errors.firstName ? (
                    <span className="text-xs text-[#F45B25]">{errors.firstName.message}</span>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                    placeholder="Last Name"
                    type="text"
                    {...register('lastName', { required: 'Last name is required' })}
                  />
                  {errors.lastName ? (
                    <span className="text-xs text-[#F45B25]">{errors.lastName.message}</span>
                  ) : null}
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                    placeholder="Email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                  />
                  {errors.email ? (
                    <span className="text-xs text-[#F45B25]">{errors.email.message}</span>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <input
                    className="h-12 w-full rounded-lg bg-white/5 border border-white/10 px-4 text-sm outline-none focus:border-[#F45B25]"
                    placeholder="Phone Number"
                    type="tel"
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                  {errors.phone ? (
                    <span className="text-xs text-[#F45B25]">{errors.phone.message}</span>
                  ) : null}
                </div>
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2 w-full min-w-0">
                <textarea
                  className="min-h-[140px] w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#F45B25]"
                  placeholder="Message"
                  {...register('message', { required: 'Message is required' })}
                />
                {errors.message ? (
                  <span className="text-xs text-[#F45B25]">{errors.message.message}</span>
                ) : null}
              </div>

              {/* Submit Button */}
              <div className="w-full">
                {submitStatus === 'error' && (
                  <p className="text-center text-sm text-[#F45B25] mb-2">Something went wrong. Please try again.</p>
                )}
                {submitStatus === 'success' && (
                  <p className="text-center text-sm text-[#22c55e] mb-2">Request sent! We&apos;ll get back to you soon.</p>
                )}
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full h-12 rounded-lg bg-linear-to-r from-[#F45B25] to-[#FF843E] text-white font-semibold hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] hover:brightness-105 transition-all duration-300 BenzinSemibold disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {submitStatus === 'loading' ? 'Sending...' : 'Request a Quote'}
                </button>
              </div>
            </form>
          </div>

          {/* Right Section: FAQs */}
          <div ref={faqColRef} className="flex-1 min-w-0">
            <div className="flex flex-col gap-6 w-full">
              {FAQS.map((item) => (
                <div key={item.number} className="border border-white/10 rounded-md overflow-hidden w-full">
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.number)}
                    className={`flex w-full items-stretch text-left hover:bg-white/5 border-b border-white/10 transition-all duration-300 ${openFaq === item.number ? 'border-b border-white/10' : 'border-b-0 border-white/10'}`}
                  >
                    <div className='flex gap-3 p-5 flex-1 min-w-0 items-center'>
                      <span className="text-white text-[16px] font-semibold BenzinRegular shrink-0">{item.number}</span>
                      <h3 className="text-white text-[16px] font-semibold BenzinRegular">{item.question}</h3>
                    </div>
                    <span
                      className={`flex shrink-0 w-12 md:w-16 items-center justify-center text-2xl transition-colors duration-300 ${
                        openFaq === item.number
                          ? 'bg-[#F45B25] text-white'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {openFaq === item.number ? '-' : '+'}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === item.number && item.answer && (
                      <motion.div
                        className="overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          height: { duration: 0.35, ease: 'easeOut', delay: 0.2 },
                          opacity: { duration: 0.2, ease: 'easeOut' },
                        }}
                      >
                        <p className="mt-3 text-sm sm:text-base text-white/70 leading-6 pl-10 pr-5 pb-5">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
