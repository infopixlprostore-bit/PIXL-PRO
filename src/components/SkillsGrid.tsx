import React from "react";
import { motion } from "motion/react";
import { Code2, Palette, Zap, Database, Activity, Shield, Terminal } from "lucide-react";
import { soundManager } from "../utils/audio";

interface SkillItem {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<any>;
  glowColor: string;
  shadowColor: string;
  metric: string;
}

export default function SkillsGrid() {
  const skills: SkillItem[] = [
    {
      id: "skill-code",
      name: "React / TS Architecture",
      category: "CORE_LOGIC",
      icon: Code2,
      glowColor: "text-neon-violet-light",
      shadowColor: "rgba(168, 85, 247, 0.35)",
      metric: "99.2% OPTIMIZED"
    },
    {
      id: "skill-design",
      name: "High-Fidelity Design",
      category: "CREATIVE_UI",
      icon: Palette,
      glowColor: "text-neon-pink-light",
      shadowColor: "rgba(236, 72, 153, 0.35)",
      metric: "PIXEL_PERFECT"
    },
    {
      id: "skill-speed",
      name: "Performance Tuning",
      category: "ENGINE_SPEED",
      icon: Zap,
      glowColor: "text-amber-400",
      shadowColor: "rgba(251, 191, 36, 0.35)",
      metric: "100_LIGHTHOUSE"
    },
    {
      id: "skill-data",
      name: "Durable Databases",
      category: "DATA_STORAGE",
      icon: Database,
      glowColor: "text-emerald-400",
      shadowColor: "rgba(52, 211, 153, 0.35)",
      metric: "ZERO_PERSIST"
    },
    {
      id: "skill-motion",
      name: "Advanced Interactions",
      category: "FLUID_MOTION",
      icon: Activity,
      glowColor: "text-cyan-400",
      shadowColor: "rgba(34, 211, 238, 0.35)",
      metric: "60_FPS_FLUID"
    },
    {
      id: "skill-security",
      name: "Security Encryption",
      category: "SECURE_OPS",
      icon: Shield,
      glowColor: "text-rose-400",
      shadowColor: "rgba(251, 113, 133, 0.35)",
      metric: "AES_256_ACTIVE"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 15
      }
    }
  };

  return (
    <div className="mt-20 relative z-10">
      {/* Small Section Header Accent */}
      <motion.div 
        whileHover="hover"
        className="flex items-center gap-3 mb-8 cursor-pointer select-none group/accent"
      >
        <motion.div 
          variants={{
            hover: { scaleX: 1.05, backgroundColor: "rgba(168, 85, 247, 0.4)" }
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="h-px flex-1 bg-charcoal-border/55 origin-right" 
        />
        <motion.span 
          variants={{
            hover: { scale: 1.02 }
          }}
          transition={{ type: "spring", stiffness: 220, damping: 15 }}
          className="text-[10px] font-mono text-gray-400 group-hover/accent:text-white transition-colors duration-300 tracking-widest uppercase flex items-center gap-2 font-semibold"
        >
          <motion.div
            variants={{
              hover: { rotate: 180, scale: 1.15 }
            }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
          >
            <Terminal className="h-3.5 w-3.5 text-neon-violet-light group-hover/accent:text-neon-pink-light transition-colors duration-300" />
          </motion.div>
          <span>TECHNICAL_SKILL_MATRIX_INTEGRITY</span>
        </motion.span>
        <motion.div 
          variants={{
            hover: { scaleX: 1.05, backgroundColor: "rgba(236, 72, 153, 0.4)" }
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="h-px flex-1 bg-charcoal-border/55 origin-left" 
        />
      </motion.div>

      {/* Grid wrapper */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.id}
              id={`grid-skill-${skill.id}`}
              variants={itemVariants}
              whileHover={{
                y: -6,
                borderColor: "rgba(255, 255, 255, 0.25)",
                boxShadow: `0 16px 36px -4px ${skill.shadowColor}`,
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="bg-charcoal-dark border border-charcoal-border/60 rounded-xl p-5 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden cursor-pointer h-40"
            >
              {/* Subtle back glowing overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-15 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${skill.shadowColor} 0%, transparent 70%)`
                }}
              />

              {/* Upper Section with category & interactive glowing Icon */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono text-gray-500 group-hover:text-gray-300 transition-colors tracking-widest">
                    {skill.category}
                  </span>

                  {/* interactive icon wrapper with subtle scale */}
                  <div className="relative">
                    <Icon
                      className={`h-5 w-5 text-gray-400 group-hover:${skill.glowColor} transition-all duration-300 group-hover:scale-110`}
                      style={{
                        filter: "drop-shadow(0 0 4px rgba(255,255,255,0.05))"
                      }}
                    />
                    {/* Pulsing neon point behind the icon on hover */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-full opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: skill.shadowColor }}
                    />
                  </div>
                </div>

                <h4 className="font-display font-medium text-white text-sm tracking-tight group-hover:text-white transition-colors">
                  {skill.name}
                </h4>
              </div>

              {/* Lower Section with metrics */}
              <div className="mt-4 pt-3 border-t border-charcoal-border/30 group-hover:border-charcoal-border/80 transition-colors duration-300 flex items-center justify-between text-[8px] font-mono text-gray-500">
                <span className="group-hover:text-gray-400 transition-colors">METRIC_STATUS</span>
                <span className="text-gray-400 font-bold group-hover:text-white transition-colors flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-emerald-500 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  {skill.metric}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
