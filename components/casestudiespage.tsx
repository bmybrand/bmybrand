import dynamic from 'next/dynamic'
import Navbar from './navbar'
import Herobarcase from './herobarcase'
import RecentProjects from './recentprojects'

const Evaluate = dynamic(() => import('./evaluatcta'))
const Brandsspec = dynamic(() => import('./brandsspec'))
const RequestForm = dynamic(() => import('./requestform'))
const Footer = dynamic(() => import('./footer'))

const CaseStudiespage = () => {
  return (
    <div className="bg-[#11122F] ">
      <Navbar />
      <Herobarcase />
      <RecentProjects />
      <Evaluate />
      <Brandsspec />
      <RequestForm /> 
      <Footer />
    </div>
  )
}

export default CaseStudiespage
