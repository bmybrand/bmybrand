'use client'

import React from 'react'

interface Review {
  id: number
  name: string
  role: string
  review: string
  image?: string
  initials?: string
  rating: number
  logo: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Daniel Reeves',
    role: 'Client',
    review: 'BmyBrand built our website perfectly, with a smooth experience, great design, and everything works exactly how our business needed it.',
    initials: 'DR',
    rating: 5,
    logo: '/bmyb-logo-trustpilot-1-01.svg'
  },
  {
    id: 2,
    name: 'Hannah Brooks',
    role: 'Client',
    review: 'The AI automation solution saved us so much time, improved workflow, and made daily operations much more efficient overall.',
    initials: 'HB',
    rating: 5,
    logo: '/bmyb-logo-google-01.svg'
  },
  {
    id: 3,
    name: 'Mark Bennett',
    role: 'Client',
    review: 'Their digital marketing team helped increase our traffic significantly, and we started getting real leads within a few weeks.',
    initials: 'MB',
    rating: 5,
    logo: '/bmyb-logo-upwork-01.svg'
  },
  {
    id: 4,
    name: 'Laura Mitchell',
    role: 'Client',
    review: 'We got a complete e-commerce store, and it works flawlessly, with easy checkout and excellent user experience for customers.',
    initials: 'LM',
    rating: 5,
    logo: '/bmyb-logo-clutchco-01.svg'
  },
  {
    id: 5,
    name: 'Jason Clarke',
    role: 'Client',
    review: 'Branding work was outstanding; they understood our vision clearly and created a strong identity that truly represents our business.',
    initials: 'JC',
    rating: 5,
    logo: '/bmyb-logo-yelp-01.svg'
  },
  {
    id: 6,
    name: 'Emily Harper',
    role: 'Client',
    review: 'Software development was smooth, professional, and exactly tailored to our needs, making our internal system much easier to manage.',
    initials: 'EH',
    rating: 5,
    logo: '/bmyb-global-bark-01.svg'
  },
  {
    id: 7,
    name: 'Kevin Lawson',
    role: 'Client',
    review: 'Business operations became far more organized after their automation setup, reducing manual work and improving overall productivity.',
    initials: 'KL',
    rating: 5,
    logo: '/bmyb-logo-trustpilot-1-01.svg'
  },
  {
    id: 8,
    name: 'Megan Foster',
    role: 'Client',
    review: 'The team was very responsive, listened carefully, and delivered a solution that matched exactly what we were looking for.',
    initials: 'MF',
    rating: 5,
    logo: '/bmyb-logo-google-01.svg'
  },
  {
    id: 9,
    name: 'Andrew Cole',
    role: 'Client',
    review: 'Our online presence improved massively after their marketing strategy, and engagement across platforms has grown consistently every month.',
    initials: 'AC',
    rating: 5,
    logo: '/bmyb-logo-upwork-01.svg'
  },
  {
    id: 10,
    name: 'Rachel Turner',
    role: 'Client',
    review: 'From start to finish, everything felt professional, simple, and result-driven, making the whole experience very easy and stress-free.',
    initials: 'RT',
    rating: 5,
    logo: '/bmyb-logo-clutchco-01.svg'
  }
]

const ReviewCard = ({ review }: { review: Review }) => {
  const logoSrc = review.logo
  return (
    <div className="bg-[#191A35] rounded-2xl md:rounded-3xl p-4 md:p-6 mb-4 md:mb-6 flex flex-col justify-center gap-3 md:gap-4 min-h-[240px] md:min-h-[280px] lg:min-h-[320px] w-full">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="w-20 h-4 md:w-24 md:h-6 flex items-center justify-start shrink-0 mb-2">
          {review.image ? (
            <img
              src={review.image}
              alt={review.name}
              className="w-full h-full object-cover object-left"
            />
          ) : (
            <img
              src={logoSrc}
              alt=""
              className="w-full h-full object-contain object-left"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          )}
        </div>
      </div>

      <p className="text-white/80 text-xs md:text-sm leading-relaxed grow">
        {review.review}
      </p>

      <div className="flex flex-col gap-1.5 md:gap-2">
        <h3 className="text-white font-semibold text-base md:text-lg BenzinSemibold">
          {review.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-[#ff6b35] text-xs md:text-sm font-medium">
            {review.role}
          </span>
          <div className="flex gap-0.5 md:gap-1">
            {[...Array(review.rating)].map((_, i) => (
              <span key={i} className="text-[#ff6b35] text-sm md:text-base">★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const VerticalScrollColumn = ({
  reviews,
  animationClass
}: {
  reviews: Review[]
  animationClass: string
}) => {
  const duplicatedReviews = [...reviews, ...reviews, ...reviews]

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className={`flex flex-col ${animationClass}`}>
        {duplicatedReviews.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} review={review} />
        ))}
      </div>
    </div>
  )
}

const VerticalReviewColumns = () => {
  const column1 = [reviews[0], reviews[1], reviews[2]]
  const column2 = [reviews[3], reviews[4]]
  const column3 = [reviews[5], reviews[6]]
  const column4 = [reviews[7], reviews[8], reviews[9]]

  return (
    <div className="w-full bg-[#11122F] py-10 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 h-[400px] sm:h-[500px] md:h-[700px] lg:h-[900px] xl:h-[1000px] overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-20 sm:h-24 md:h-32 lg:h-40 xl:h-48 bg-linear-to-b from-[#11122F] via-[#11122F]/95 to-transparent z-30 pointer-events-none" />

          <div className="h-full">
            <VerticalScrollColumn reviews={column1} animationClass="animate-scroll-up" />
          </div>
          <div className="hidden md:block h-full">
            <VerticalScrollColumn reviews={column2} animationClass="animate-scroll-down" />
          </div>
          <div className="hidden lg:block h-full">
            <VerticalScrollColumn reviews={column3} animationClass="animate-scroll-up-slow" />
          </div>
          <div className="hidden lg:block h-full">
            <VerticalScrollColumn reviews={column4} animationClass="animate-scroll-down-slow" />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 md:h-32 lg:h-40 xl:h-48 bg-linear-to-t from-[#11122F] via-[#11122F]/95 to-transparent z-30 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

export default VerticalReviewColumns
