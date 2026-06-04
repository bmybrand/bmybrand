'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const BrandExperienceBento = dynamic(() => import('./brandexperiencebento'), {
  loading: () => (
    <div className="grid auto-rows-[6.4rem] gap-4 md:grid-cols-12 md:auto-rows-[6.4rem]">
      <div className="rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] md:col-span-5 md:row-span-4" />
      <div className="rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] md:col-span-3 md:row-span-2" />
      <div className="rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] md:col-span-4 md:row-span-5" />
      <div className="rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] md:col-span-3 md:row-span-2" />
      <div className="rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] md:col-span-8 md:row-span-1" />
      <div className="rounded-[1rem] border border-white/10 bg-[#1C1D3D] md:col-span-3 md:row-span-3" />
      <div className="rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] md:col-span-5 md:row-span-3" />
      <div className="rounded-[0.9rem] border border-white/10 bg-[#1C1D3D] md:col-span-4 md:row-span-3" />
    </div>
  ),
})

export default function BrandExperienceHero() {
  const [heroVideoInView, setHeroVideoInView] = React.useState(false)
  const heroVideoSectionRef = React.useRef<HTMLDivElement | null>(null)

  const features = [
    { image: '/bmyb-services-brand-card-icon-1-01.svg', title: 'Visual Identity System', description: 'We design logos, colors, and typography for branding and logo design services.' },
    { image: '/bmyb-services-brand-card-icon-2-01.svg', title: 'Unified Brand Messaging', description: 'We create consistent messaging for business branding services in Texas.' },
    { image: '/bmyb-services-brand-card-icon-3-01.svg', title: 'Cross-Platform Consistency', description: 'We keep brand identity consistent through branding identity development services.' },
    { image: '/bmyb-services-brand-card-icon-4-01.svg', title: 'Experience-Driven Design', description: 'We design smooth experiences that improve brand experience and trust.' },
  ]

  const impactAreas = [
    { number: '01', title: 'Brand Research', description: 'We analyze the market, audience, and competitors to build informed and effective brand experience strategies.' },
    { number: '02', title: 'Brand Positioning', description: 'We define how your brand stands out clearly in competitive markets with a strong differentiation strategy.' },
    { number: '03', title: 'Tone of Voice', description: 'We establish a consistent communication style that reflects personality and builds an emotional connection with the audience.' },
    { number: '04', title: 'Creative Direction', description: 'We guide visual and conceptual direction to ensure all brand elements stay aligned and impactful.' },
    { number: '05', title: 'Brand Guidelines', description: 'We create structured rules for visuals and messaging to maintain consistency across all platforms.' },
    { number: '06', title: 'Digital Presence', description: 'We shape how your brand appears across websites, social media, and digital platforms consistently.' },
  ]

  React.useEffect(() => {
    const node = heroVideoSectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVideoInView(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '250px 0px',
        threshold: 0,
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section className="relative overflow-hidden px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 pb-30 lg:grid-cols-2">
            <div>
              <h2 className="mb-8 text-2xl leading-tight text-white BenzinBold md:text-3xl lg:text-[45px]">
                We Build Brands That Feel Consistent Everywhere
              </h2>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                At BmyBrand, a leading digital branding agency, we specialize in creating powerful and consistent brand experience systems that help businesses stand out across every platform. Our focus on brand identity development services ensures that your visuals, messaging, and overall presence work together as one unified system. From strategy to execution, we build brands that feel cohesive, recognizable, and memorable at every customer touchpoint, whether digital or physical. This consistency strengthens trust, improves recognition, and positions your business as a professional and reliable brand in competitive markets like the USA and Texas.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-xl border-2 border-white/10 bg-[#191A35] p-7 transition-all duration-300 hover:border-[#F45B25]">
                  <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#21223F]">
                    <img src={feature.image} alt="" className="h-10 w-10 object-contain" />
                  </div>
                  <h3 className="mb-2 text-lg text-white BenzinSemibold">{feature.title}</h3>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <BrandExperienceBento />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 grid items-stretch gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl leading-tight text-white BenzinBold md:text-4xl lg:text-5xl">
                Key Aspects of Our Strong Brand
                <span className="block">Experience</span>
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-white/70">
                <p>
                  We focus on building complete brand experience systems that help businesses create lasting impact. Our approach to brand identity development services ensures every element, from visuals to messaging, works together seamlessly to build recognition, trust, and consistency. We combine strategy, creativity, and design to deliver strong branding solutions for businesses searching for branding and logo design services near me, branding company in Texas, and the best branding services in the USA.
                </p>
                <p>
                  A strong brand is more than just visuals; it is the full experience people have at every interaction. Through structured brand identity development services, we ensure your business communicates clearly across all platforms. Whether it is business branding services in Texas or logo design and branding services near me, we create unified brand systems that feel professional, memorable, and consistent everywhere your audience connects with you.
                </p>
              </div>
            </div>

            <div className="flex h-full flex-col justify-between">
              {impactAreas.map((item) => (
                <div key={item.number} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm text-white BenzinSemibold">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl text-white BenzinSemibold">{item.title}</h3>
                    <p className="leading-relaxed text-white/60">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div
            ref={heroVideoSectionRef}
            className="h-[400px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a2e] to-[#11122F] md:h-[500px] lg:h-[600px]"
          >
            {heroVideoInView ? (
              <video
                src="/bmyb-services-brand-hero-video-01.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(244,91,37,0.14),transparent_30%),linear-gradient(135deg,#1a1a2e_0%,#11122F_100%)]" />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
