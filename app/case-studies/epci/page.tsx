import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function EPCIPage() {
  return (
    <div className="min-h-screen bg-[#0D0E1F]">
      <Navbar />
      <div className="py-32 px-4">
        <div className="w-[90%] lg:w-[85%] 2xl:w-[80%] mx-auto">
          <h1 className="text-4xl md:text-6xl text-white BenzinSemibold mb-8">
            EPCI Case Study
          </h1>
          <p className="text-white/70 text-lg">
            Coming soon...
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
