'use client'
import React, { useRef } from 'react'
import Heropage from "@/components/heropage";
import Logobar from "@/components/logobar";
import Navbar from "@/components/navbar";
import Flyingbear from "@/components/flyingbear";
import Addblock from "@/components/addblock";
import Ourbranding from "@/components/ourbranding";
import StackingCards from "@/components/stackingcards";
import DesignedGrow from "@/components/designedgrow";
import BottomCTA from "@/components/bottomcta";
import Footer from '@/components/footer';
import Technologies from '@/components/technologies';
import CreativeProcess from '@/components/creativeprocess';
import Brandsspec from '@/components/brandsspec';
import RequestForm from '@/components/requestform';
import Map from '@/components/map';

// Map component temporarily disabled to avoid conflicts with horizontal scroll
// const Map = dynamic(() => import('@/components/map'), { ssr: false });
export default function Home() {
  const designedGrowRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null) // placeholder footer

  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <Heropage />
      <Logobar />
      <Flyingbear />
      <Addblock />
      <Ourbranding />
      <StackingCards />
      <Map />
      <div ref={designedGrowRef}>
        <DesignedGrow />
      </div>

      {/* Bottom CTA appears after DesignedGrow */}
      <BottomCTA targetRef={designedGrowRef} footerRef={footerRef} />
      <Technologies />
      <CreativeProcess />
      <Brandsspec />
      <RequestForm />
      <div ref={footerRef}>
  <Footer />
</div>
    </div>
  )
}
