"use client"; // This directive marks the component as a Client Component

import { useEffect } from 'react';

const GridBackground = () => {
  // The core logic for tracking the mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // We set the CSS variables '--mouse-x' and '--mouse-y' on the root element
      // so they can be accessed by the pseudo-elements in the CSS file.
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    // Add the event listener when the component mounts
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts
    // This is crucial for preventing memory leaks in a React application
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <>
      <div className="grid-background-container"></div>
      <style jsx global>{`
        /* This container holds both grid layers */
        .grid-background-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }

        /* Create a shared properties block for both grids to avoid repetition */
        .grid-background-container::before,
        .grid-background-container::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: 60px 60px;
        }

        /* The base, dim grid layer (bottom layer) */
        .grid-background-container::before {
            background-image:
                linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
            background: radial-gradient(circle,transparent,rgba(0,0,0,0.5)); 
            width:100%; 
            height:100%;
            content:""; 
            position:absolute;
            top:0;
            left:0;
        }

        /* The glowing grid layer (top layer) */
        .grid-background-container::after {
            --glow-color: rgba(255, 255, 255, 0.15);
            background-image:
                linear-gradient(to right, var(--glow-color) 1px, transparent 1px),
                linear-gradient(to bottom, var(--glow-color) 1px, transparent 1px);

            -webkit-mask-image: radial-gradient(
                circle 490px at var(--mouse-x) var(--mouse-y),
                black, 
                transparent
            );
            mask-image: radial-gradient(
                circle 490px at var(--mouse-x) var(--mouse-y),
                black,
                transparent
            );
            transition: -webkit-mask-image 0.15s ease-out, mask-image 0.15s ease-out;
        }
      `}</style>
    </>
  );
};

export default GridBackground;

