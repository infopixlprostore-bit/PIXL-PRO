import React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { soundManager } from "../utils/audio";

interface Section {
  id: string;
  label: string;
}

interface ScrollProgressBarProps {
  activeSection: string;
  sections: Section[];
}

export default function ScrollProgressBar({ activeSection, sections }: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  
  // Spring config for ultra-smooth rendering of the neon progress bar
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  const handleScrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 72; // Nav height compensation
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div 
      id="scroll-tracker-timeline" 
      className="fixed right-3 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center select-none pointer-events-auto h-[280px] md:h-[320px] justify-between"
    >
      {/* Decorative Top Accent Tick */}
      <div className="w-[1px] h-2 bg-charcoal-border opacity-50 font-mono text-[8px] text-gray-600 mb-2">
        ┌
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        {/* Full Height Track Line */}
        <div className="absolute w-[2px] h-full bg-charcoal-light/45 rounded-full overflow-hidden border border-charcoal-border/10">
          {/* Active Progress glow indicator */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-full rounded-full bg-gradient-to-b from-neon-violet via-neon-pink to-neon-violet-light shadow-[0_0_8px_rgba(139,92,246,0.6)]"
            style={{
              scaleY,
              transformOrigin: "top",
            }}
          />
        </div>

        {/* Section Indicators */}
        <div className="absolute h-full flex flex-col justify-between items-center py-2">
          {sections.map((sec, index) => {
            const isActive = activeSection === sec.id;
            const stepNumber = `0${index + 1}`;

            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onMouseEnter={() => soundManager.playHover()}
                onClick={(e) => {
                  soundManager.playClick();
                  handleScrollTo(sec.id, e);
                }}
                className="group relative flex items-center justify-center w-8 h-8 cursor-pointer focus:outline-none"
                aria-label={`Scroll to ${sec.label}`}
              >
                {/* Visual Trigger - Glowing ring & core dot */}
                <div className="relative flex items-center justify-center">
                  {/* Outer active pulse ring */}
                  <motion.div
                    animate={{
                      scale: isActive ? [1, 1.4, 1] : 1,
                      opacity: isActive ? [0.4, 0.8, 0.4] : 0,
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute w-5 h-5 rounded-full border border-neon-pink/40 bg-neon-pink/5"
                  />

                  {/* Central interactive handle */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      borderColor: isActive ? "var(--color-neon-pink)" : "var(--color-charcoal-border)",
                      backgroundColor: isActive ? "var(--color-charcoal-pure)" : "var(--color-charcoal-medium)",
                    }}
                    whileHover={{ scale: 1.3 }}
                    className={`w-2.5 h-2.5 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-sm`}
                  >
                    {/* Inner core neon element */}
                    {isActive && (
                      <motion.div 
                        layoutId="active-core-dot"
                        className="w-1 h-1 rounded-full bg-neon-pink" 
                      />
                    )}
                  </motion.div>
                </div>

                {/* Floating Tooltip Label (Revealed on hover) */}
                <div className="absolute right-9 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-right flex items-center">
                  <div className="bg-charcoal-pure border border-charcoal-border/95 text-[10px] font-mono font-medium text-white px-3 py-1.5 rounded-md shadow-2xl flex items-center gap-2 whitespace-nowrap">
                    <span className="text-neon-pink-light font-bold">{stepNumber}</span>
                    <span className="text-gray-400">/</span>
                    <span className="tracking-widest">{sec.label.replace(/^\d+\s*\/\/\s*/, "")}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse" />
                    )}
                  </div>
                  {/* Tooltip triangle tail */}
                  <div className="w-1.5 h-1.5 bg-charcoal-pure border-r border-t border-charcoal-border/95 rotate-45 -mr-1.5 ml-0.5 z-[-1]" />
                </div>

                {/* Micro Permanent Index Label to the left on desktop */}
                <div className="absolute left-6 text-[8px] font-mono text-gray-500 hidden md:block select-none pointer-events-none transition-all duration-300 origin-left">
                  <span className={`transition-colors duration-300 ${isActive ? "text-neon-pink font-semibold scale-110" : "text-gray-500/70"}`}>
                    {stepNumber}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Decorative Bottom Accent Tick */}
      <div className="w-[1px] h-2 bg-charcoal-border opacity-50 font-mono text-[8px] text-gray-600 mt-2">
        └
      </div>
    </div>
  );
}
