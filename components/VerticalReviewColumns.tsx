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
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Michael Anderson',
    role: 'Client',
    review: 'The branding upgrade was exactly what we needed—clean, consistent, and professional. Our online presence improved immediately, and clients noticed fast. The whole process with BMYBrand was smooth and straightforward.',
    initials: 'MA',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    role: 'Client',
    review: 'Our brand now feels modern, consistent, and polished. The redesign clarified our message, and customers are responding better than ever.',
    initials: 'SM',
    rating: 5
  },
  {
    id: 3,
    name: 'Hassan Mughis',
    role: 'Client',
    review: 'The branding upgrade was exactly what we needed—clean, consistent, and professional. Our online presence improved immediately, and clients noticed fast. The whole process with BMYBrand was smooth and straightforward.',
    initials: 'HM',
    rating: 5
  },
  {
    id: 4,
    name: 'James Carter',
    role: 'Client',
    review: 'BMYBrand\'s redesign gave our brand the consistency and polish we needed. Customers notice the difference immediately.',
    initials: 'JC',
    rating: 5
  },
  {
    id: 5,
    name: 'Ava Rodriguez',
    role: 'Client',
    review: 'Our brand finally feels modern and polished. The redesign brought clarity to our message, and customers are engaging better than ever.',
    initials: 'AR',
    rating: 5
  },
  {
    id: 6,
    name: 'Oliver Bennett',
    role: 'Client',
    review: 'Working with BMYBrand transformed our online presence. The attention to detail and creative approach exceeded all expectations.',
    initials: 'OB',
    rating: 5
  }
]

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="bg-[#191A35] rounded-2xl md:rounded-3xl p-4 md:p-6 mb-4 md:mb-6 flex flex-col gap-3 md:gap-4 min-h-[240px] md:min-h-[280px] lg:min-h-[320px] w-full">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden shrink-0 bg-linear-to-br from-[#ff6b35] to-[#f45b25] flex items-center justify-center">
          {review.image ? (
            <img 
              src={review.image} 
              alt={review.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-base md:text-xl font-bold BenzinBold">
              {review.initials}
            </span>
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
  // Duplicate reviews for infinite scroll effect
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
  // Split reviews into 4 columns with different content
  const column1 = [reviews[0], reviews[1], reviews[5]]
  const column2 = [reviews[2], reviews[3]]
  const column3 = [reviews[4], reviews[0]]
  const column4 = [reviews[1], reviews[2], reviews[4]]

  return (
    <div className="w-full bg-[#11122F] py-10 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 h-[400px] sm:h-[500px] md:h-[700px] lg:h-[900px] xl:h-[1000px] overflow-hidden">
          {/* Top fade - applies to all columns */}
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
          
          {/* Bottom fade - applies to all columns */}
          <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 md:h-32 lg:h-40 xl:h-48 bg-linear-to-t from-[#11122F] via-[#11122F]/95 to-transparent z-30 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

export default VerticalReviewColumns
