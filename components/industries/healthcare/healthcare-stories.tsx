'use client'

import Image from 'next/image'

type HealthcareStoryItem = {
  title: string
  description: string
  name?: string
  role?: string
  showcaseImage?: string
  showcaseAlt?: string
  logoSrc?: string
  logoAlt?: string
  avatarSrc?: string
}

type HealthcareStoriesProps = {
  title?: string
  stories?: HealthcareStoryItem[]
  transparentBackground?: boolean
}

export default function HealthcareStories({
  title = 'Real Healthcare Growth Stories Powered by Strategy & Technology',
  stories = [
    {
      title: 'Fountain Hills Emergency Room\nPatient-First ER Care',
      description:
        'BmyBrand delivered exactly what we needed: a fast, professional, and patient-focused website. The new experience makes it easier for patients to find care quickly, and our team has seen a noticeable increase in engagement and inquiries.',
      name: 'Fountain Hills',
      role: 'Operations Team',
      showcaseImage: '/bmyb-global-container-01.webp',
      showcaseAlt: 'Fountain Hills healthcare website showcase',
      logoSrc: '/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-02.svg',
      logoAlt: 'Fountain Hills Emergency Room',
      avatarSrc: '/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-01.svg',
    },
    {
      title: 'Instinctive Healthcare Solutions\nScalable Healthcare Growth',
      description:
        'Working with BmyBrand transformed how we present our services online. The improved structure, clarity, and overall performance have significantly enhanced how clients interact with our brand, making the experience more intuitive, engaging, and effective.',
      name: 'Instinctive Healthcare',
      role: 'Marketing Team',
      showcaseImage: '/bmyb-global-container-02.webp',
      showcaseAlt: 'Instinctive healthcare website showcase',
      logoSrc: '/bmyb-industries-healthcare-cropped-instinctive-healthcare-solutions-1-02.svg',
      logoAlt: 'Instinctive Healthcare Solutions',
      avatarSrc: '/bmyb-industries-healthcare-cropped-instinctive-healthcare-solutions-1-01.svg',
    },
  ],
  transparentBackground = false,
}: HealthcareStoriesProps) {
  const storyBackgrounds = [
    'bg-[#f3d0c6]',
    'bg-[linear-gradient(135deg,#9fc2cb_0%,#d6ebf0_48%,#9db9c3_100%)]',
  ]

  return (
    
    <section className={transparentBackground ? "" : "bg-[#191A35]"}>
      <div className="mx-auto w-[90%] 2xl:w-[75%] py-10 sm:py-14 lg:py-18 ">
      <div className=" max-w-6xl">
        <h2 className="BenzinSemibold text-white text-[0.9rem] sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.8rem] xl:text-[2.3rem] 2xl:text-[2.8rem] leading-[1.18]">
          {title}
        </h2>
        <div className="mt-6 h-px w-full bg-white/8" />
      </div>

      {stories.map((story, index) => {
        const isReversed = index % 2 === 1
        const showcase = (
          <div className={`h-full min-h-[400px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden rounded-4xl ${storyBackgrounds[index % storyBackgrounds.length]}`}>
            <Image
              src={story.showcaseImage ?? '/bmyb-global-container-01.webp'}
              alt={story.showcaseAlt ?? 'Case study showcase'}
              width={872}
              height={531}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="block h-full w-full object-cover object-center"
            />
          </div>
        )

        const details = (
          <div className="flex h-full flex-col rounded-[14px] bg-white/[0.04] px-6 py-6 sm:px-7 sm:py-7">
            <img
              src={story.logoSrc ?? '/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-02.svg'}
              alt={story.logoAlt ?? story.name ?? 'Case study logo'}
              width={240}
              height={48}
              className="block h-12 w-auto object-contain object-left self-start"
            />
            <p className="mt-5 text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/65 ">
              {story.description}
            </p>

            <div className="mt-auto pt-8 flex items-center gap-3">
              <img
                src={story.avatarSrc ?? story.logoSrc ?? '/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-01.svg'}
                alt=""
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
              <div>
                <div className="text-white BenzinSemibold">{story.name}</div>
                <div className="text-sm text-white/45">{story.role}</div>
              </div>
            </div>
          </div>
        )

        return (
          <div key={`${story.title}-${index}`}>
            <div className="mt-16 text-left">
              <h3 className="BenzinSemibold text-white text-[0.8rem] sm:text-[0.9rem] md:text-[1.05rem] lg:text-[1.2rem] xl:text-[1.5rem] 2xl:text-[1.75rem] leading-tight">
                {story.title.split('\n').map((line, lineIndex, arr) => (
                  <span key={`${line}-${lineIndex}`}>
                    {line}
                    {lineIndex < arr.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h3>

              <div className={`mt-4 grid items-stretch gap-6 ${isReversed ? 'lg:grid-cols-[0.3fr_0.7fr]' : 'lg:grid-cols-[0.7fr_0.3fr]'}`}>
                {isReversed ? (
                  <>
                    {details}
                    {showcase}
                  </>
                ) : (
                  <>
                    {showcase}
                    {details}
                  </>
                )}
              </div>
            </div>

            {index < stories.length - 1 ? (
              <div className="mt-12">
                <div className="h-px w-full bg-white/8" />
              </div>
            ) : null}
          </div>
        )
      })}
      </div>
    </section>
  )
}
