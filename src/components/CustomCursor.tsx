import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [currentHoverType, setCurrentHoverType] = useState<string | null>(null);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for tracking
  const coreSpringX = useSpring(cursorX, { damping: 35, stiffness: 450, mass: 0.2 });
  const coreSpringY = useSpring(cursorY, { damping: 35, stiffness: 450, mass: 0.2 });

  useEffect(() => {
    // Check if the system actually has a hover capability (no Touch-only devices)
    const mediaQuery = window.matchMedia("(hover: hover)");
    const checkHover = () => {
      setIsMobile(!mediaQuery.matches);
    };

    checkHover();
    mediaQuery.addEventListener("change", checkHover);

    if (!mediaQuery.matches) {
      return () => mediaQuery.removeEventListener("change", checkHover);
    }

    // Mouse movement callback
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (isHidden) {
        setIsHidden(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    // Global click hooks
    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    // Tracking hover on interactive selectors
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const element = target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer, [id^='btn-'], [id^='card-']");
      if (element) {
        setIsHovered(true);
        // Identify if it's a specialty CAD reload, drive folder, or form button
        if (element.id === "btn-submit-contact") {
          setCurrentHoverType("transmit");
        } else if (element.id === "btn-drive-folder") {
          setCurrentHoverType("expand");
        } else if (element.id === "btn-reload-gallery") {
          setCurrentHoverType("relay");
        } else {
          setCurrentHoverType("generic");
        }
      } else {
        setIsHovered(false);
        setCurrentHoverType(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      mediaQuery.removeEventListener("change", checkHover);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isHidden]);

  if (isMobile || isHidden) {
    return null;
  }

  return (
    <>
      {/* Sharp Custom-Themed Arrow Pointer (Snappy Pointing Core) */}
      <motion.div
        style={{
          x: coreSpringX,
          y: coreSpringY,
          translateX: 0,
          translateY: 0,
        }}
        className="fixed top-0 left-0 z-[10000] pointer-events-none select-none flex flex-col items-start"
        animate={{
          scale: isClicked ? 0.85 : isHovered ? 1.15 : 1,
          rotate: isClicked ? -6 : isHovered ? -2 : 0,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
      >
        {/* original shape reconstructed as a high-fidelity vector arrow */}
        <svg 
          width="18" 
          height="20" 
          viewBox="0 0 26 28" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_10px_rgba(139,92,246,0.5)]"
        >
          <defs>
            <linearGradient id="cursor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" /> {/* Neon Violet */}
              <stop offset="100%" stopColor="#d946ef" /> {/* Neon Pink */}
            </linearGradient>
          </defs>
          <path
            d="M0 0 L0 20 L5 15 L9 24.5 L12.5 23 L8.5 13.5 H15.5 Z"
            fill="url(#cursor-gradient)"
            stroke={isClicked ? "#ffffff" : isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.88)"}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Dynamic coordinate marker projection alongside the arrow tip */}
        {isHovered && currentHoverType !== "generic" && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0, x: 12, y: -4 }}
            animate={{ scale: 1, opacity: 0.95, x: 18, y: -4 }}
            className="absolute bg-[#09090b]/92 border border-[#a855f7]/30 rounded px-1.5 py-0.5 text-[8.5px] font-mono text-white tracking-widest whitespace-nowrap uppercase shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none"
          >
            {currentHoverType === "transmit" ? "SYS_TRX_LOCK" : currentHoverType === "relay" ? "RELAY_SYNC" : "DATA_EXP"}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

