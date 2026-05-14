'use client'

export default function HealthcareStories({
  transparentBackground = false,
}: {
  transparentBackground?: boolean;
}) {
  return (
    
    <section className={transparentBackground ? "" : "bg-[#191A35]"}>
      <div className="mx-auto w-[90%] 2xl:w-[75%] py-10 sm:py-14 lg:py-18 ">
      <div className=" max-w-6xl">
        <h2 className="BenzinSemibold text-white text-[0.9rem] sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.8rem] xl:text-[2.3rem] 2xl:text-[2.8rem] leading-[1.18]">
          Real Healthcare Growth Stories Powered by Strategy &amp; Technology
        </h2>
        <div className="mt-6 h-px w-full bg-white/8" />
      </div>

      <div className="mt-16 text-left">
        <h3 className="BenzinSemibold text-white text-[0.8rem] sm:text-[0.9rem] md:text-[1.05rem] lg:text-[1.2rem] xl:text-[1.5rem] 2xl:text-[1.75rem] leading-tight">
          Fountain Hills Emergency Room
          <br />
          Patient-First ER Care
        </h3>

        <div className="mt-4 grid gap-6 lg:grid-cols-[0.7fr_0.3fr]">
          <div className="overflow-hidden rounded-4xl bg-[#f3d0c6]">
            <img
              src="/bmyb-global-container-01.webp"
              alt="Fountain Hills healthcare website showcase"
              className="h-auto w-full object-cover object-center"
            />
          </div>

          <div className="rounded-[14px] bg-white/[0.04] px-6 py-6 sm:px-7 sm:py-7 flex flex-col">
            <img
              src="/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-02.svg"
              alt="Fountain Hills Emergency Room"
              className="block h-12 w-auto object-contain object-left self-start"
            />
            <p className="mt-5 text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/65 ">
              BMYBrand delivered exactly what we needed: a fast, professional, and patient-focused website. The new
              experience makes it easier for patients to find care quickly, and our team has seen a noticeable
              increase in engagement and inquiries.
            </p>

            <div className="mt-auto pt-8 flex items-center gap-3">
                <img
                  src="/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-01.svg"
                  alt=""
                  className="h-11 w-11  object-contain"
                />
              <div>
                <div className="text-white BenzinSemibold">Fountain Hills</div>
                <div className="text-sm text-white/45">Operations Team</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="h-px w-full bg-white/8" />
      </div>

      <div className="mt-16 text-left">
        <h3 className="BenzinSemibold text-white text-[0.8rem] sm:text-[0.9rem] md:text-[1.05rem] lg:text-[1.2rem] xl:text-[1.5rem] 2xl:text-[1.75rem] leading-tight">
          Instinctive Healthcare Solutions
          <br />
          Scalable Healthcare Growth
        </h3>

        <div className="mt-4 grid gap-6 lg:grid-cols-[0.3fr_0.7fr]">
          <div className="rounded-[14px] bg-white/[0.04] px-6 py-6 sm:px-7 sm:py-7 flex flex-col">
            <div className="flex items-center gap-3">
              <img
                src="/bmyb-industries-healthcare-cropped-instinctive-healthcare-solutions-1-02.svg"
                alt="Instinctive Healthcare Solutions"
                className="h-12 w-auto object-contain"
              />
            </div>

            <p className="mt-6 text-[0.85rem] sm:text-sm md:text-base lg:text-lg leading-6 lg:leading-8 text-white/65 ">
              Working with BMYBrand transformed how we present our services online. The improved structure, clarity,
              and overall performance have significantly enhanced how clients interact with our brand, making the
              experience more intuitive, engaging, and effective.
            </p>

            <div className="mt-auto pt-8 flex items-center gap-3">
              <img
                src="/bmyb-industries-healthcare-cropped-instinctive-healthcare-solutions-1-01.svg"
                alt=""
                className="h-11 w-auto object-contain"
              />
              <div>
                <div className="text-white BenzinSemibold">Instinctive Healthcare</div>
                <div className="text-sm text-white/45">Marketing Team</div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-4xl bg-[linear-gradient(135deg,#9fc2cb_0%,#d6ebf0_48%,#9db9c3_100%)]">
            <img
              src="/bmyb-global-container-02.webp"
              alt="Instinctive healthcare website showcase"
              className="h-auto w-full object-cover object-center"
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
