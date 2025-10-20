"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import HeroImageAnimation from "./HeroImageAnimation";

export default function HeroSection() {
  return (
    <section className="w-full pt-36 md:pt-48 pb-10 text-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Headline */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            Unlock Your Career Potential with{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300">
            Transform the way you grow your career with{" "}
            <span className="text-white font-semibold">personalized AI guidance</span>, 
            expert interview preparation, and intelligent resume & cover letter tools — 
            all designed to help you stand out and succeed.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:opacity-90 transition duration-300"
            >
              Get Started
            </Button>
          </Link>

          <Link href="/demo">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-full border border-gray-500 text-gray-200 hover:border-transparent hover:bg-gradient-to-r hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 hover:text-white transition duration-300"
            >
              Watch Demo
            </Button>
          </Link>
        </div>
        
            <HeroImageAnimation/>
      </div>
    </section>
  );
}
