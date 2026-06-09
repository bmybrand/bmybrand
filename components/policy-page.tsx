import Link from 'next/link'
import Navbar from './navbar'
import Footer from './footer'

type PolicyPageProps = {
  title: string
  updatedOn: string
  sections: Array<{
    heading: string
    body: string[]
  }>
}

export default function PolicyPage({ title, updatedOn, sections }: PolicyPageProps) {
  return (
    <div className="min-h-screen bg-[#11122F] text-white">
      <Navbar />

      <main className="mx-auto w-[92%] max-w-6xl pt-36 pb-16 sm:pt-40 sm:pb-20">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)] sm:p-8 lg:p-12">
          <Link href="/" className="text-sm text-[#F45B25] hover:underline">
            Back to home
          </Link>

          <header className="mt-6 border-b border-white/10 pb-8">
            <h1 className="BenzinSemibold text-3xl leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="mt-4 text-sm text-white/55">Last updated: {updatedOn}</p>
          </header>

          <div className="space-y-10 py-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="BenzinSemibold text-xl sm:text-2xl">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-white/72 sm:text-base">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
