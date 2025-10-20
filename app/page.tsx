import FeatureSection from "@/components/FeatureSection";
import GridBackground from "@/components/GridBackground";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonial";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/data/features";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <GridBackground/> 
      <HeroSection/> 
      <FeatureSection/>
      <HowItWorks/>
      <Testimonials/>

    </>
      
  );
}
