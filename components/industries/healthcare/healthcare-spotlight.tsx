'use client'

import Stack from '@/components/Stack'

export default function HealthcareSpotlight() {
  const images = Array.from({ length: 10 }, (_, index) => `https://picsum.photos/200/300?random=${index + 1}`)

  return (
    <section className="bg-[#11122F]">
      <div className="mx-auto grid w-[90%] 2xl:w-[85%] gap-12 py-14 sm:py-18 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-22">
        <div className="relative mx-auto flex w-full max-w-[430px] items-center justify-center py-8 lg:mx-0 lg:max-w-[470px]">
          <div style={{ width: 280, height: 380 }}>
            <Stack
              randomRotation={false}
              sensitivity={200}
              sendToBackOnClick={true}
              autoplay={false}
              autoplayDelay={3000}
              pauseOnHover={false}
              cards={images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`spotlight-card-${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ))}
            />
          </div>
        </div>

        <div className="max-w-[560px]">
          <img
            src="/FH-EmergencyRoom-Logo-ERClinic-1 2.svg"
            alt="Fountain Hills Emergency Room and Medical Center"
            className="h-12 w-auto object-contain"
          />

          <blockquote className="mt-6 max-w-[34rem] text-lg leading-8 text-white/88 sm:text-[1.45rem] sm:leading-[1.7]">
            From the beginning, it was clear that BMYBrand understood the urgency and trust required in
            healthcare. They delivered a fast, patient-focused website that makes it easier for people to
            find care, access services, and take action when it matters most.
          </blockquote>

          <div className="mt-10 flex items-center gap-3">
            <img
              src="/FH-EmergencyRoom-Logo-ERClinic-1 2 (2).svg"
              alt=""
              className="h-12 w-12 rounded-full object-contain"
            />
            <div>
              <div className="text-white BenzinSemibold">Fountain Hills</div>
              <div className="text-sm text-white/48">Operations Team</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
