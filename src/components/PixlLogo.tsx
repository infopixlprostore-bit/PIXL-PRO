import React from "react";
import { motion } from "motion/react";

interface PixlLogoProps extends React.SVGProps<SVGSVGElement> {
  glow?: boolean;
  className?: string;
  onlyIcon?: boolean;
}

export function PixlLogo({ glow = true, className = "h-8 w-auto", onlyIcon = false, ...props }: PixlLogoProps) {
  // Staggered letter drawing animation parameters
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (customIndex: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", stiffness: 45, damping: 14, delay: customIndex * 0.16 + 0.1 },
        opacity: { duration: 0.4, delay: customIndex * 0.16 }
      }
    })
  };

  const letterVariants = {
    hidden: { y: 22, opacity: 0, scale: 0.94 },
    visible: (customIndex: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 14,
        delay: customIndex * 0.16
      }
    })
  };

  const viewBox = onlyIcon ? "35 32 38 48" : "32 32 118 48";

  return (
    <motion.svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible`}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      {...props}
    >
      <defs>
        {/* Glow filter for tech neon aura */}
        <filter id="logo-glow-violet" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Dynamic transition gradients */}
        <linearGradient id="neon-gradient" x1="35" y1="32" x2="150" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#c084fc" /> {/* neon violet light */}
          <stop offset="100%" stopColor="#8b5cf6" /> {/* neon violet */}
        </linearGradient>

        <linearGradient id="violet-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>

        {/* Gray/Charcoal subtle metallic path gradient for base state */}
        <linearGradient id="charcoal-silver" x1="32" y1="32" x2="150" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#F4F4F5" />
          <stop offset="100%" stopColor="#A1A1AA" />
        </linearGradient>

        <linearGradient id="magenta-pixel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D946EF" />
          <stop offset="100%" stopColor="#FF00A0" />
        </linearGradient>
      </defs>

      {/* --- Letter P (Signature Monogram) --- */}
      <motion.g custom={0} variants={letterVariants} className="cursor-pointer">
        {/* Underlay glow on hover */}
        <motion.path
          d="M 42 36 H 58 A 12 12 0 0 1 58 60 H 48 A 6 6 0 0 0 42 66 V 73"
          stroke="url(#violet-glow-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { opacity: 0 },
            hover: { opacity: 0.6, filter: "url(#logo-glow-violet)" }
          }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none"
        />

        {/* Main premium stroke */}
        <motion.path
          d="M 42 36 H 58 A 12 12 0 0 1 58 60 H 48 A 6 6 0 0 0 42 66 V 73"
          stroke="url(#charcoal-silver)"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          custom={0}
          variants={pathVariants}
          whileHover={{ stroke: "url(#neon-gradient)", strokeWidth: 7 }}
        />

        {/* Signature magenta pixel terminal block */}
        <motion.rect
          x="38.75"
          y="73"
          width="6.5"
          height="6.5"
          fill="url(#magenta-pixel-grad)"
          rx="0.5"
          custom={0}
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: (customIndex: number) => ({ 
              scale: 1, 
              opacity: 1,
              transition: {
                type: "spring",
                stiffness: 120,
                damping: 10,
                delay: customIndex * 0.16 + 0.35
              }
            }),
            hover: { 
              scale: 1.35, 
              filter: "url(#logo-glow-violet)",
              transition: { yoyo: Infinity, duration: 0.4 } 
            }
          }}
          className={glow ? "animate-pulse" : ""}
          style={{ transformOrigin: "42px 76px" }}
        />
      </motion.g>

      {!onlyIcon && (
        <>
          {/* --- Letter I --- */}
          <motion.g custom={1} variants={letterVariants}>
            <motion.path
              d="M 83 36 V 60"
              stroke="url(#violet-glow-grad)"
              strokeWidth="9"
              strokeLinecap="round"
              variants={{
                hidden: { opacity: 0 },
                hover: { opacity: 0.5, filter: "url(#logo-glow-violet)" }
              }}
              className="pointer-events-none"
            />
            <motion.path
              d="M 83 36 V 60"
              stroke="url(#charcoal-silver)"
              strokeWidth="6.5"
              strokeLinecap="round"
              custom={1}
              variants={pathVariants}
              whileHover={{ stroke: "url(#neon-gradient)", strokeWidth: 7 }}
            />
          </motion.g>

          {/* --- Letter X --- */}
          <motion.g custom={2} variants={letterVariants}>
            <motion.path
              d="M 98 36 L 114 60 M 114 36 L 98 60"
              stroke="url(#violet-glow-grad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { opacity: 0 },
                hover: { opacity: 0.5, filter: "url(#logo-glow-violet)" }
              }}
              className="pointer-events-none"
            />
            <motion.path
              d="M 98 36 L 114 60 M 114 36 L 98 60"
              stroke="url(#charcoal-silver)"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              custom={2}
              variants={pathVariants}
              whileHover={{ stroke: "url(#neon-gradient)", strokeWidth: 7 }}
            />
          </motion.g>

          {/* --- Letter L --- */}
          <motion.g custom={3} variants={letterVariants}>
            <motion.path
              d="M 126 36 V 60 H 141"
              stroke="url(#violet-glow-grad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={{
                hidden: { opacity: 0 },
                hover: { opacity: 0.5, filter: "url(#logo-glow-violet)" }
              }}
              className="pointer-events-none"
            />
            <motion.path
              d="M 126 36 V 60 H 141"
              stroke="url(#charcoal-silver)"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              custom={3}
              variants={pathVariants}
              whileHover={{ stroke: "url(#neon-gradient)", strokeWidth: 7 }}
            />
          </motion.g>
        </>
      )}
    </motion.svg>
  );
}
