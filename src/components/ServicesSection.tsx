import React from "react";
import { motion } from "motion/react";
import { Layers, Palette, Cpu, CheckCircle2, Terminal } from "lucide-react";
import SkillsGrid from "./SkillsGrid";

export default function ServicesSection() {
  const services = [
    {
      id: "srv-web",
      title: "Website Development",
      abbreviation: "DEV_WS",
      icon: Layers,
      color: "from-neon-violet to-violet-500",
      accentColor: "#8b5cf6",
      description: "Custom high-performance, responsive web architectures engineered for maximum performance, clean SEO, and seamless interactivity.",
      specs: ["React / Vite Integration", "Tailwind CSS Layouts", "Zero-Latency Performance"]
    },
    {
      id: "srv-port",
      title: "Portfolio Design",
      abbreviation: "DSN_PF",
      icon: Palette,
      color: "from-neon-pink to-pink-500",
      accentColor: "#d946ef",
      description: "Stunning visceral visual layout showcases. Tailored for creative experts, design labs, and freelance champions who require high aesthetic distinction.",
      specs: ["Premium Typography Pairings", "Custom Grid Systems", "Staggered Micro-Animations"]
    },
    {
      id: "srv-app",
      title: "Custom App Design",
      abbreviation: "APP_CS",
      icon: Cpu,
      color: "from-violet-500 to-neon-pink",
      accentColor: "#a855f7",
      description: "Responsive specialized interfaces crafted with reactive structures, client-side persistence engines, and dynamic user flow control.",
      specs: ["State Persistence Systems", "Interactive UI Overlays", "Modular Layout Flow"]
    }
  ];

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 16,
        mass: 0.85,
        staggerChildren: 0.08,
        delayChildren: 0.12
      }
    }
  };

  const cardElementVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const specListVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.08
      }
    }
  };

  const specItemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 14
      }
    }
  };

  return (
    <div id="services-root" className="w-full relative">
      {/* Background ambient grids / technical highlights */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-neon-pink/5 rounded-full blur-[100px] pointer-events-none select-none" />

      {/* Title block */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 65, damping: 14, mass: 0.9 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 relative z-10"
      >
        <div>
          <span className="text-xs font-mono text-neon-violet uppercase tracking-widest block mb-2 font-semibold">
            02 // OPERATIONS ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-none">
            OUR SERVICES
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mt-4 leading-relaxed font-sans">
            A selective configuration of modular development, branding, and interactive structures calibrated to render your custom blueprints flawlessly.
          </p>
        </div>
        <div 
          style={{ height: "48px" }}
          className="text-[11px] font-mono text-gray-400 border border-charcoal-border rounded-lg px-3 bg-charcoal-dark flex items-center gap-1.5 self-start md:self-auto select-none"
        >
          <Terminal className="h-3.5 w-3.5 text-neon-pink animate-pulse" />
          <span>SERVICES_NODE_ACTIVE // VER: 1.0.8</span>
        </div>
      </motion.div>

      {/* Grid of 3 Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10"
      >
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              id={`card-service-${service.id}`}
              variants={itemVariants}
              whileHover={{
                y: -10,
                borderColor: service.accentColor,
                boxShadow: `0 24px 48px -12px ${service.accentColor}25, 0 0 20px -2px ${service.accentColor}15`,
              }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 18,
                mass: 0.8
              }}
              className="bg-charcoal-dark border border-charcoal-border rounded-2xl p-6 sm:p-8 flex flex-col justify-between group transition-colors duration-300 relative overflow-hidden cursor-pointer"
            >
              {/* Radial gradient background highlights on hover */}
              <div 
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none transition-all duration-700 opacity-20 group-hover:opacity-50 group-hover:scale-125"
                style={{ backgroundColor: service.accentColor }}
              />

              <div>
                {/* Icon Section with neon border container */}
                <motion.div variants={cardElementVariants} className="flex items-center justify-between mb-8">
                  <div className="relative h-12 w-12 rounded-xl bg-charcoal-pure border border-charcoal-border/80 flex items-center justify-center group-hover:border-white/30 transition-all duration-300">
                    <IconComponent 
                      className="h-5 w-5 text-gray-400 group-hover:text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110" 
                      style={{ filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.1))" }}
                    />
                    
                    {/* Corner accent decorations - expands relative on hover */}
                    <span 
                      className="absolute -top-px -left-px h-1.5 w-1.5 rounded-tl transition-all duration-300 group-hover:h-3 group-hover:w-3" 
                      style={{ backgroundColor: service.accentColor }}
                    />
                    <span 
                      className="absolute -bottom-px -right-px h-1.5 w-1.5 rounded-br transition-all duration-300 group-hover:h-3 group-hover:w-3" 
                      style={{ backgroundColor: service.accentColor }}
                    />
                  </div>

                  <span 
                    className="text-[10px] font-mono text-gray-500 group-hover:text-white group-hover:border-white/30 uppercase tracking-widest border border-charcoal-border/40 bg-charcoal-pure/50 px-2 py-1 rounded transition-all duration-300"
                    style={{ textShadow: "0 0 8px rgba(255,255,255,0.1)" }}
                  >
                    {service.abbreviation}
                  </span>
                </motion.div>

                {/* Service Title */}
                <motion.h3 
                  variants={cardElementVariants}
                  className="font-display font-semibold text-white text-xl transition-all duration-300 mb-4 group-hover:translate-x-1"
                  style={{ 
                    letterSpacing: "-0.01em",
                  }}
                >
                  <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300">
                    {service.title}
                  </span>
                </motion.h3>

                {/* Description */}
                <motion.p 
                  variants={cardElementVariants}
                  className="text-xs text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300"
                >
                  {service.description}
                </motion.p>
              </div>

              {/* Specs & features inside card */}
              <motion.div 
                variants={cardElementVariants}
                className="pt-6 border-t border-charcoal-border/30 mt-auto transition-colors duration-300 group-hover:border-charcoal-border/60"
              >
                <motion.ul 
                  variants={specListVariants}
                  className="space-y-2.5"
                >
                  {service.specs.map((spec, specIdx) => (
                    <motion.li 
                      key={specIdx} 
                      variants={specItemVariants}
                      className="flex items-center gap-2.5 text-[11px] font-mono text-gray-500 group-hover:text-gray-300 transition-all duration-300"
                    >
                      <CheckCircle2 
                        className="h-3 w-3 flex-shrink-0 transition-transform duration-500 group-hover:scale-125" 
                        style={{ color: service.accentColor }}
                      />
                      <span className="transition-transform duration-300 group-hover:translate-x-1">{spec}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Responsive interactive neon Skills Matrix */}
      <SkillsGrid />

      {/* Description below them */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-16 bg-charcoal-dark/30 border border-charcoal-border/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10"
      >
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-neon-violet/10 flex items-center justify-center border border-neon-violet/20">
            <span className="h-2 w-2 rounded-full bg-neon-pink animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-display font-medium text-white uppercase tracking-wider">
              Bespoke Functional Craft Standard
            </h4>
            <p className="text-xs text-gray-400 mt-1 max-w-xl leading-relaxed">
              Every system is customized entirely to meet the rigorous expectations of digital-first clients. We do not use cookie-cutter boilerplates or low-grade themes. Everything is built from the ground up to ensure performance, identity, and elegance are optimized.
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <a
            id="btn-services-cta"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#a78bfa] hover:text-white transition-colors cursor-pointer"
          >
            <span>Initialize Brief</span>
            <span className="text-neon-pink">→</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
