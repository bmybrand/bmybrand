import Heropage from "@/components/heropage";
import Logobar from "@/components/logobar";
import Navbar from "@/components/Navbar";
import Fullyanimatedgrid from "@/components/fullyanimatedgrid";
import Flyingbear from "@/components/flyingbear";

export default function Home() {
  return (
    <div className="bg-[#11122F] h-[500vh]">
        <Navbar />
       <Heropage />
       <Logobar />
       <Flyingbear />
       
    </div>
  );
}
