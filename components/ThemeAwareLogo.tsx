"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import Image from "next/image"; // Using Next.js Image for optimization

export default function ThemeAwareLogo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // When the component mounts, we set the state to true
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Until the component is mounted, we don't know the theme
  // You can return a placeholder or null here
  if (!mounted) {
    // You can also render a static placeholder logo here
    return null;
  }

  // Use resolvedTheme to handle the "system" theme correctly
  const logoSrc = resolvedTheme === 'light' ? '/logo_light.png' : '/logo.png';

  return (
    <Image 
      src={logoSrc} 
      alt="Logo" 
      width={180} // Add appropriate dimensions
      height={40} // Add appropriate dimensions
      priority 
      className="h-auto w-auto object-contain py-2 pr-4"
    />
  );
}
