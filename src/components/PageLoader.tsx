import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Artificial minimum duration to show off the beautiful loader and prevent flicker
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const loaderLetters = ["P", "I", "X", "L", " ", "L", "A", "B", "S"];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="global-page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 bg-charcoal-pure z-[9999] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Futuristic technical background specs */}
          <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none" />
          
          {/* Subtle glowing anchor in the center of the viewport */}
          <div className="absolute w-80 h-80 rounded-full bg-neon-violet/10 blur-[80px] animate-pulse pointer-events-none" />

          {/* Core Uiverse.io Loader Widget */}
          <div className="loader-wrapper">
            <div className="loader" />
            
            {/* Split each character to stagger the bounce and shine sequence */}
            <div className="flex gap-1 items-center justify-center relative z-10 font-mono tracking-widest text-[#f4f4f5] text-[15px] font-bold">
              {loaderLetters.map((char, index) => {
                if (char === " ") {
                  return <span key={`space-${index}`} className="w-2" />;
                }
                return (
                  <span
                    key={`char-${index}`}
                    className="loader-letter inline-block"
                    style={{ "--i": index } as React.CSSProperties}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Loader status feedback label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-8 text-[9px] font-mono tracking-[0.25em] text-gray-500 uppercase select-none flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-violet animate-ping" />
            <span>INITIALIZING // SYSTEMS_READY</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
