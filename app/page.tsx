import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/footer";
import GridBackground from "@/components/GridBackground";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonial";
import Faqs from "@/components/faqs";
import FooterLanding from "@/components/footer";



export default function Home() {
  return (
    <>
      <GridBackground/> 
      <HeroSection/> 
      <FeatureSection/>
      <HowItWorks/>
      <Testimonials/>
      <Faqs/>
      <FooterLanding/>
    </>
      
  );
}
