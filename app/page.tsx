import Container from "@/components/Container";
import HomeDescription from "@/components/HomeDescription";
import Photo from "@/components/Photo";
import SocialLinks from "@/components/SocialLinks";
import Statistics from "@/components/Statistics";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-bodyColor text-white/8 ">
      <Container className="py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center md:items-start md:gap-7 text-center md:text-start">
          <div>
            <h3 className="fot semibold tracking-wider mb-1">so<span className="text-lightSky">f</span>twar<span className="text-lightSky">e</span> eng<span className="text-lightSky">i</span>neer</h3>
            <h2 className="text-3xl md:text-md-5xl mb-2 text-white">hello, my name is</h2>
            <h1 className="text-lightSky text-5xl md:text-7xl tracking-normal">alan_weiler</h1>
            </div>
            <div className="w-full h-[240px] md:h-[200px] relative">
              <div className="absolute top-0 left-0 w-full h-full my-2">
              <HomeDescription />

              </div>
            </div>
            <Link href="/resume.pdf" download="resume"><Button className="max-sm:mt-40 md:mt-40 bg-transparent rounded-full border border-lightSky/50 
                  text-lightSky hover:bg-hoverColor hover:text-black hoverEffect py-2">Download C/V<Download/></Button></Link>
            <div className="max-sm:my-3">
              <SocialLinks />
            </div>
            <Statistics />
          
          </div>
          <Photo/>
      </Container>
    </div>
  );
}
