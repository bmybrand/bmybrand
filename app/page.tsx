import Heropage from "@/components/heropage";
import Logobar from "@/components/logobar";
import Navbar from "@/components/Navbar";
import Flyingbear from "@/components/flyingbear";
import Addblock from "@/components/addblock";
import Ourbranding from "@/components/ourbranding";
import StackingCards from "@/components/StackingCards";
import DesignedGrow from "@/components/DesignedGrow";


export default function Home() {
  return (
    <div className="bg-[#11122F] h-[900vh]">
        <Navbar />
       <Heropage />
       <Logobar />
       <Flyingbear />
       <Addblock />
       <Ourbranding />
       <StackingCards />
       <DesignedGrow />
    </div>
  );
}
