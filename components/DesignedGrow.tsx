import React from 'react'

const items = [
  {
    title: "Create Faster. Anywhere.",
    desc: "Bring your ideas to life with clean branding, modern UI/UX, and fast-loading design. We create intuitive visuals that engage your audience instantly—on every device, anywhere."
  },
  {
    title: "Keep Your Brand Safe. Always.",
    desc: "We keep your brand secure, stable, and worry-free with clean builds and reliable support."
  },
  {
    title: "Launch Smarter. Everywhere.",
    desc: "From branding to ecommerce, we create scalable digital experiences built for real growth."
  }
]

const checklist = [
  "Fast delivery",
  "Clean branding",
  "Modern UI/UX",
  "Mobile-ready",
  "Smooth loading",
  "High engagement",
  "Quick updates",
  "Creative flexibility"
]

const DesignedGrow = () => {
  return (
    <div className="flex flex-col items-center mb-30 ">
      {/* Heading */}
      <div className="w-full flex flex-col justify-center items-center mt-30 ">
        <h1 className="mb-10 w-[90%] xl:w-[60%] text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl BenzinSemibold text-center">
          Built to Create. <span className="text-[#F45B25]">Designed to Grow</span>
        </h1>
        <p className="w-[90%] 2xl:w-[60%] text-base text-[#ADAECC] text-center">
          At BMYBrand, we help businesses grow with powerful design, high-performing websites, and strategic digital experiences.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-[90%] 2xl:w-[75%] gap-12 mt-12">

        {/* LEFT - Text */}
        <div className="flex flex-col justify-center lg:w-1/2 gap-6 text-white">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden group cursor-pointer
                         border-l-2 border-[#F45B25]
                         hover:border-l-4 transition-all duration-300"
            >
              {/* Fade gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent
                           opacity-0 group-hover:opacity-100
                           transition-opacity duration-500 ease-out"
              />

              <div className="relative p-5">
                <h2 className="text-xl lg:text-2xl font-semibold mb-2">
                  {item.title}
                </h2>
                <p className="text-[#ADAECC]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT - Image + Checklist */}
        <div className="flex flex-col gap-6 lg:w-1/2 justify-center items-center">
          <img
            src="/getskeebear.svg"
            alt="Designed to Grow"
            className="object-contain w-full"
          />

          
        </div>

      </div>
      {/* Checklist */}
<div className="flex flex-wrap justify-center gap-y-4 
                w-[90%] 2xl:w-[70%] mt-10">
  {checklist.map((point, index) => (
    <div
      key={index}
      className="flex items-center gap-3
                 basis-1/2 sm:basis-1/4
                 text-white"
    >
      {/* Checked box */}
      <div className="w-5 h-5 flex items-center justify-center
                      rounded bg-[#F45B25] text-black text-sm font-bold">
        ✓
      </div>
      <span className="text-[#ADAECC] text-sm">
        {point}
      </span>
    </div>
  ))}
</div>



    </div>
  )
}

export default DesignedGrow
