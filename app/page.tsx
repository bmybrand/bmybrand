import dynamic from 'next/dynamic'
import Heropage from "@/components/heropage";
import Navbar from "@/components/navbar";
const Logobar = dynamic(() => import("@/components/logobar"))
const Flyingbear = dynamic(() => import("@/components/flyingbear"))
const Addblock = dynamic(() => import("@/components/addblock"))
const Ourbranding = dynamic(() => import("@/components/ourbranding"))
const StackingCards = dynamic(() => import("@/components/stackingcards"))
const DesignedGrow = dynamic(() => import("@/components/designedgrow"))
const BottomCTA = dynamic(() => import("@/components/bottomcta"))
const Technologies = dynamic(() => import("@/components/technologies"))
const CreativeProcess = dynamic(() => import("@/components/creativeprocess"))
const Brandsspec = dynamic(() => import("@/components/brandsspec"))
const RequestForm = dynamic(() => import("@/components/requestform"))
const Footer = dynamic(() => import("@/components/footer"))
const Map = dynamic(() => import("@/components/map"))

// Map component temporarily disabled to avoid conflicts with horizontal scroll
// const Map = dynamic(() => import('@/components/map'), { ssr: false });
export default function Home() {
  return (
    <div className="bg-[#11122F]">
      <Navbar />
      <div className="pb-30">
        <Heropage />
      </div>
      <Logobar />
      <Flyingbear />
      <Addblock />
      <Ourbranding />
      <StackingCards />
      <Map />
      <div id="designed-grow-anchor">
        <DesignedGrow />
      </div>

      {/* Bottom CTA appears after DesignedGrow */}
      <BottomCTA targetId="designed-grow-anchor" footerId="page-footer" />
      <Technologies />
      <CreativeProcess />
      <Brandsspec />
      <RequestForm />
      <div id="page-footer">
        <Footer />
      </div>
    </div>
  )
}
