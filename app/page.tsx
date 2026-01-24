'use client'
import React, { useRef } from 'react'
import Heropage from "@/components/heropage";
import Logobar from "@/components/logobar";
import Navbar from "@/components/Navbar";
import Flyingbear from "@/components/flyingbear";
import Addblock from "@/components/addblock";
import Ourbranding from "@/components/ourbranding";
import StackingCards from "@/components/StackingCards";
import DesignedGrow from "@/components/DesignedGrow";
import BottomCTA from "@/components/BottomCTA";
import Footer from '@/components/Footer';
import Technologies from '@/components/Technologies';
import CreativeProcess from '@/components/CreativeProcess';
import Brandsspec from '@/components/Brandsspec';
import RequestForm from '@/components/RequestForm';

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

      {/* DesignedGrow section with ref */}
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
