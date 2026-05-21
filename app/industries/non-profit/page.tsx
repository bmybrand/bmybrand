import IndustryPage from '@/components/industries/industrypage'
import { nonProfitIndustry } from '@/data/industries'

export default function Page() {
  return <IndustryPage industry={nonProfitIndustry} />
}
