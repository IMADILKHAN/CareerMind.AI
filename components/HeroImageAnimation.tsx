"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";

export default function HeroImageAnimation() {
  const imageContainerRef = useRef(null); // Ref for the element we'll be animating

  // This function calculates the tilt based on scroll position
  const handleScroll = useCallback(() => {
    const container = imageContainerRef.current;
    if (!container) return;

    // Get the viewport height
    const viewportHeight = window.innerHeight;

    // Get the bounding box of the element relative to the viewport
    const { top, height } = container.getBoundingClientRect();

    // Calculate the visibility percentage:
    // 0 when the top of the element is at the bottom of the viewport
    // 1 when the bottom of the element is at the top of the viewport
    // (This matches framer-motion's scrollYProgress offset: ["start end", "end start"])
    const scrollProgress = Math.max(
      0,
      Math.min(1, 1 - (top + height) / (viewportHeight + height))
    );

    // Map scrollProgress (0 to 1) to rotateX (15deg to -15deg)
    // When scrollProgress is 0, rotateX is 15deg (tilting up, away from viewer)
    // When scrollProgress is 1, rotateX is -15deg (tilting down, towards viewer)
    const startTilt = 15; // Initial tilt degree
    const endTilt = -15;  // Final tilt degree
    const currentTilt = startTilt + (endTilt - startTilt) * scrollProgress;

    // Apply the transform
    container.style.transform = `rotateX(${currentTilt}deg)`;
    container.style.transformOrigin = 'center center'; // Ensures rotation is around the center
  }, []);

  useEffect(() => {
    // Set initial transform when the component mounts
    // This ensures the image starts with the 15deg tilt before any scroll
    if (imageContainerRef.current) {
        imageContainerRef.current.style.transform = `rotateX(15deg)`;
        imageContainerRef.current.style.transformOrigin = 'center center';
    }

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set the initial position based on current scroll
    handleScroll();

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Re-run effect if handleScroll changes (unlikely with useCallback)

  return (
    // Outer div to establish the 3D perspective context
    // and hold the image container that will actually rotate.
    // The perspective value determines how "strong" the 3D effect is.
    <div
      style={{
        perspective: "1000px", // Essential for 3D transforms
        transformStyle: "preserve-3d", // Necessary for nested 3D transforms
      }}
      className="mt-12"
    >
      <div
        ref={imageContainerRef} // Attach ref to the element that will be transformed
        className="
          relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800
          transition-all duration-300 ease-out // Keep hover transitions
          hover:shadow-[0_0_15px_rgba(0,191,255,0.3),_0_0_30px_rgba(0,191,255,0.15)]
          hover:border-[rgba(0,191,255,0.4)]
          hover:scale-[1.005]
          // Important: No direct CSS transform property here for rotation,
          // as JS will be setting it. We allow JS to fully control 'transform'.
        "
      >
        <Image
          src="/banner2.jpg"
          alt="AI career coach interface banner"
          width={1280}
          height={820}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>
    </div>
  );
}