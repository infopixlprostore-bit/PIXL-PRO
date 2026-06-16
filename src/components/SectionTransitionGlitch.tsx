import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SectionTransitionGlitchProps {
  activeSection: string;
}

export default function SectionTransitionGlitch({ activeSection }: SectionTransitionGlitchProps) {
  const [isGlitching, setIsGlitching] = useState<boolean>(false);
  const [glitchText, setGlitchText] = useState<string>("");
  const previousSectionRef = useRef<string>(activeSection);

  useEffect(() => {
    // Only trigger on actual section changes, ignore initial mount
    if (previousSectionRef.current !== activeSection) {
      setIsGlitching(true);
      
      const newSection = activeSection.toUpperCase();
      setGlitchText(`SYNCING_VIEWPORT_NODE // SRC: ${previousSectionRef.current.toUpperCase()} -> DST: ${newSection}`);
      previousSectionRef.current = activeSection;

      // Set timeout to clear the glitch effect
      const timeout = setTimeout(() => {
        setIsGlitching(false);
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [activeSection]);

  return (
    <AnimatePresence mode="wait">
      {isGlitching && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {/* Subtle full-screen CRT Scanline Overlay Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-charcoal-pure"
            style={{
              backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.04))`,
              backgroundSize: "100% 4px, 6px 100%",
            }}
          />

          {/* Glitch Slices: Simulated RGB Split horizontal shifts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.45, 0.15, 0.65, 0],
              x: [0, -12, 10, -5, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1], ease: "easeInOut" }}
            className="absolute inset-0 border-y-[1.5px] border-neon-pink/20 bg-neon-violet/5 mix-blend-screen"
          />

          {/* Sweeping Laser Scanline */}
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 0.65, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-pink to-transparent opacity-85 shadow-[0_0_15px_rgba(217,70,239,0.95)]"
          />

          {/* Second Offset Sweeping Laser Scanline (Subtle Violet Echo) */}
          <motion.div
            initial={{ top: "-20%" }}
            animate={{ top: "120%" }}
            transition={{ duration: 0.7, delay: 0.08, ease: "linear" }}
            className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-neon-violet to-transparent opacity-65 shadow-[0_0_10px_rgba(139,92,246,0.7)]"
          />

          {/* Technical Alignment Crosshairs & Status indicator */}
          <div className="absolute top-24 left-6 select-none font-mono text-[9px] text-neon-pink-light tracking-wider flex flex-col gap-1 md:left-12">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-1.5 bg-charcoal-pure/90 border border-charcoal-border px-2.5 py-1 rounded"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neon-pink animate-ping" />
              <span>{glitchText}</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.2, 0.9, 0] }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[8px] text-gray-500 flex items-center gap-2"
            >
              <span>SYS_GRID_STABILIZATION // CONNECTED</span>
              <span>[X_ALIG: OK]</span>
            </motion.div>
          </div>

          <div className="absolute bottom-24 right-6 select-none font-mono text-[8px] text-gray-500/80 tracking-widest hidden md:flex items-center gap-2 right-12 bg-charcoal-pure/85 border border-charcoal-border/40 px-2 py-0.5 rounded">
            <span>RESYNC_ACTIVE</span>
            <div className="flex gap-0.5">
              <span className="w-[3px] h-[7px] bg-neon-violet" />
              <span className="w-[3px] h-[7px] bg-neon-violet animate-pulse" />
              <span className="w-[3px] h-[7px] bg-neon-pink" />
              <span className="w-[3px] h-[7px] bg-neon-pink animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
