import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { PixlLogo } from "./components/PixlLogo";
import GraphicsGallery from "./components/GraphicsGallery";
import ContactSection from "./components/ContactSection";
import CustomCursor from "./components/CustomCursor";
import ServicesSection from "./components/ServicesSection";
import SectionTransitionGlitch from "./components/SectionTransitionGlitch";
import PageLoader from "./components/PageLoader";
import ScrollProgressBar from "./components/ScrollProgressBar";
import HeroPhysicsCanvas from "./components/HeroPhysicsCanvas";
import { Share2, Check, ArrowDownCircle, Sparkles, MapPin, Layers, Briefcase, ChevronRight, Activity } from "lucide-react";
import { soundManager } from "./utils/audio";

const seeMoreContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const seeMoreItemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 15,
    },
  },
};

export default function App() {
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isSeeMoreHovered, setIsSeeMoreHovered] = useState<boolean>(false);
  const [seeMoreRipples, setSeeMoreRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleSeeMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playClick();
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setSeeMoreRipples((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), x, y }
    ]);
  };

  const removeSeeMoreRipple = (id: number) => {
    setSeeMoreRipples((prev) => prev.filter((r) => r.id !== id));
  };

  const sections = [
    { id: "home", label: "01 // HOME" },
    { id: "services", label: "02 // SERVICES" },
    { id: "gallery", label: "03 // GALLERY" },
    { id: "contact", label: "04 // CONTACT" },
  ];

  useEffect(() => {
    const sectionIds = ["home", "services", "gallery", "contact"];
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    let activeIdFromObserver = "home";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
            activeIdFromObserver = entry.target.id;
          }
        });

        // Edge case: scroll to top/bottom check to prevent delay
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
        const isAtTop = window.scrollY < 40;

        if (isAtTop) {
          setActiveSection("home");
        } else if (isAtBottom) {
          setActiveSection("contact");
        } else {
          setActiveSection(activeIdFromObserver);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -35% 0px", // focus on central reading area of the screen
        threshold: [0.05, 0.15, 0.3, 0.5],
      }
    );

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    const handleScrollEdges = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      const isAtTop = window.scrollY < 40;

      if (isAtTop) {
        setActiveSection("home");
      } else if (isAtBottom) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScrollEdges, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollEdges);
    };
  }, []);

  // Parallax Scroll Coordinates driven by scroll hooks
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 250]);
  const textY = useTransform(scrollY, [0, 800], [0, -120]);
  const decorShapeY = useTransform(scrollY, [0, 1000], [0, -300]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  // Mouse coordinate motion values for interactive interactive parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configurations for smooth organic movement
  const springX = useSpring(mouseX, { stiffness: 75, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 75, damping: 25 });

  // Map normalized coordinates into precise 3D-depth layer translations
  const layer1X = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const layer1Y = useTransform(springY, [-0.5, 0.5], [-40, 40]);

  const layer2X = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const layer2Y = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const layer3X = useTransform(springX, [-0.5, 0.5], [30, -30]); // Inverse direction
  const layer3Y = useTransform(springY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Normalize coordinates from -0.5 to 0.5
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  return (
    <div className="relative min-h-screen bg-charcoal-pure text-gray-200 overflow-x-hidden selection:bg-neon-violet selection:text-white font-sans antialiased">
      <PageLoader />
      <CustomCursor />
      <SectionTransitionGlitch activeSection={activeSection} />
      <ScrollProgressBar activeSection={activeSection} sections={sections} />
      {/* 1. Header / Navigation */}
      <header className="fixed top-0 inset-x-0 z-40 bg-charcoal-pure/80 backdrop-blur-md border-b border-charcoal-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo / Monogram PIXL */}
          <a
            href="#"
            className="flex items-center gap-0 group"
            id="header-brand-logo-link"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
          >
            <PixlLogo className="h-6 w-auto text-white transition-all duration-300" glow={true} onlyIcon={false} />
          </a>

          {/* Nav Anchors */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider text-gray-400">
            {sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  id={`nav-link-${sec.id}`}
                  href={`#${sec.id}`}
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={(e) => {
                    e.preventDefault();
                    soundManager.playClick();
                    setActiveSection(sec.id);
                    document.getElementById(sec.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`relative py-2 px-3.5 transition-all duration-300 rounded-md uppercase font-semibold select-none z-10 ${
                    isActive
                      ? "text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                      : "hover:text-gray-200"
                  }`}
                >
                  {/* Subtle ambient glowing background pill */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicatorCapsule block"
                      className="absolute inset-0 bg-white/[0.04] border border-white/[0.06] rounded-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_15px_rgba(139,92,246,0.1)] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10">{sec.label}</span>

                  {/* Sleek dual-tone indicator underline with soft blur */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-neon-violet-light to-neon-pink-light rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)] z-20"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Share button tool */}
          <div>
            <button
              id="btn-share-link"
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => {
                handleShareClick();
                soundManager.playClick();
              }}
              className={`py-2 px-4 rounded-xl text-xs font-mono font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                shareCopied
                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                  : "bg-charcoal-dark border-charcoal-border hover:border-neon-violet hover:text-white"
              }`}
            >
              {shareCopied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>COPIED PORTFOLIO LINK</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>SHARE PORTFOLIO</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with dynamic Parallax */}
      <motion.section 
        id="home"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-screen flex items-center justify-center pt-18 overflow-hidden z-10"
      >
        {/* Interactive Physics Data Particles Canvas */}
        <HeroPhysicsCanvas />

        {/* Parallax Background Grid */}
        <motion.div
          style={{ y: backgroundY, opacity: opacityHero }}
          className="absolute inset-0 pointer-events-none opacity-25"
        >
          {/* Neon violet radial gradient */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-violet/10 rounded-full blur-[120px]" />
          
          {/* Subtle design matrix background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, #1a1a23 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #1a1a23 40px)",
              backgroundSize: "40px 40px"
            }}
          />
          {/* Floating blueprint coordinates */}
          <div className="absolute top-1/3 left-12 font-mono text-[9px] text-[#8b5cf6]/40 uppercase select-none">
            SYS_REF_H01 // ASPECT 1.618
          </div>
          <div className="absolute bottom-1/4 right-12 font-mono text-[9px] text-[#d946ef]/40 uppercase select-none">
            DEC_CORE // VEC_STATION_Y
          </div>
        </motion.div>

        {/* Floating Abstract Parallax Geometry - Right side */}
        <motion.div
          style={{ y: decorShapeY, opacity: opacityHero }}
          className="absolute right-[10%] top-[25%] pointer-events-none hidden lg:block"
        >
          <motion.div
            style={{ x: layer1X, y: layer1Y }}
            className="w-56 h-56 border border-neon-violet/10 rounded-full flex items-center justify-center backdrop-blur-[1.5px] transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
          >
            <div className="w-44 h-44 border border-dashed border-neon-pink/15 rounded-full flex items-center justify-center animate-spin-slow">
              <motion.div 
                style={{ x: layer2X, y: layer2Y }}
                className="w-32 h-32 border border-neon-violet/25 rounded-full bg-gradient-to-br from-neon-violet/5 to-transparent flex items-center justify-center"
              >
                <div className="w-2 h-2 rounded-full bg-neon-pink/40 animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Abstract Parallax Geometry - Left side */}
        <motion.div
          style={{ y: useTransform(scrollY, [0, 1000], [0, -160]), opacity: opacityHero }}
          className="absolute left-[8%] bottom-[20%] pointer-events-none hidden lg:block"
        >
          <motion.div
            style={{ x: layer3X, y: layer3Y }}
            className="flex items-center gap-4 bg-charcoal-pure/45 border border-charcoal-border/40 px-5 py-3.5 rounded-2xl backdrop-blur-md shadow-2xl"
          >
            {/* Minimal target grid elements */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <span className="absolute w-2.5 h-2.5 rounded-full bg-neon-pink/30 animate-ping duration-1500" />
              <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
              <div className="absolute w-6 h-6 border border-dashed border-neon-pink/20 rounded-full animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-widest text-[#a78bfa] uppercase">SYSTEM COORDINATOR</span>
              <span className="text-[10px] font-mono text-gray-400 font-semibold uppercase">NODE_TRX // ON_TARGET</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 flex flex-col items-center text-center">
          {/* Pill announcement badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 py-1 px-3.5 bg-[#171026] border border-[#ff00a0]/15 rounded-full text-[10px] font-mono tracking-widest text-[#a855f7] uppercase flex items-center gap-1.5"
          >
            <Sparkles className="h-3 w-3 text-neon-pink" />
            <span>Distributed Freelance Design Collective</span>
          </motion.div>

          {/* Large Hero Title Logo Block */}
          <motion.div
            style={{ y: textY, opacity: opacityHero }}
            className="my-3 flex flex-col items-center gap-2"
          >
            <h1 className="flex items-center justify-center gap-0 tracking-tight select-none text-white leading-none">
              <PixlLogo glow={true} className="h-16 sm:h-24 md:h-32 w-auto text-white" onlyIcon={false} />
            </h1>
            
            <p className="text-sm md:text-md font-mono tracking-widest text-[#a78bfa] font-medium uppercase mt-4">
              MINIMAL BRANDING // INTERACTIVE UI COMPONENTS
            </p>
          </motion.div>

          {/* Description & Core features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mt-6 font-sans text-center mx-auto"
          >
            <div className="text-gray-300 space-y-4 text-base md:text-lg leading-relaxed">
              <p className="font-semibold text-white text-lg md:text-xl">
                Welcome to PIXL — where ideas become digital realities.
              </p>
              <p>
                We are a young creative studio helping brands build their online presence through stunning websites, seamless experiences, and bold designs.
              </p>
              <p>
                We believe every business deserves a digital identity that feels unique, memorable, and built for the future.
              </p>
            </div>

            {/* Bullets feature indicators */}
            <div className="grid grid-cols-3 gap-4 items-center justify-center mt-10 pt-8 border-t border-charcoal-border/40 text-left">
              {/* Feature 1 */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-neon-violet-light font-semibold uppercase flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-violet" /> 01 _ IDENTITIES
                </span>
                <span className="text-[11px] text-gray-400">Minimalist guidelines & procedural vector marks.</span>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-1 border-x border-charcoal-border/40 px-4">
                <span className="text-xs font-mono text-neon-pink font-semibold uppercase flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon-pink" /> 02 _ COMPONENT
                </span>
                <span className="text-[11px] text-gray-400">Physics-backed, micro-animated client widgets.</span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-gray-300 font-semibold uppercase flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" /> 03 _ CUSTOM
                </span>
                <span className="text-[11px] text-gray-400">Pure freelance autonomy with cohesive agency standards.</span>
              </div>
            </div>
          </motion.div>

          {/* Call to actions indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
              Scroll down to review portfolios
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* 3. Section: Our Services */}
      <motion.section 
        id="services" 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="py-24 bg-charcoal-pure relative z-20 border-t border-charcoal-border/40 pb-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesSection />
        </div>
      </motion.section>

      {/* 4. Section: Design Graphics & Case studies */}
      <motion.section 
        id="gallery" 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="py-24 bg-charcoal-dark/50 relative z-20 border-t border-charcoal-border/40 pb-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GraphicsGallery />

          {/* See More Link to Drive Folder */}
          <motion.div
            variants={seeMoreContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-16 flex flex-col items-center justify-center text-center"
          >
            <motion.p
              variants={seeMoreItemVariants}
              className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4"
            >
              // ARCHIVE MEDIA DATA
            </motion.p>
            <motion.a
              variants={seeMoreItemVariants}
              href="https://drive.google.com/drive/folders/1QY-U8g5KSz0kPAkXwGS4xDYhEd2QB3uP?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block cursor-pointer relative"
              onMouseEnter={() => {
                soundManager.playHover();
                setIsSeeMoreHovered(true);
              }}
              onMouseLeave={() => setIsSeeMoreHovered(false)}
            >
              <AnimatePresence>
                {isSeeMoreHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, x: "-50%", scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                    exit={{ opacity: 0, y: 8, x: "-50%", scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute bottom-full left-1/2 mb-4 px-3 py-1.5 bg-neutral-900/95 border border-rose-500/40 rounded-md text-[10px] font-mono tracking-wider text-rose-300 whitespace-nowrap pointer-events-none z-30 shadow-[0_0_12px_rgba(217,70,239,0.3)] flex items-center gap-1.5"
                  >
                    <span>Navigate to Drive</span>
                    <span className="text-neon-pink">↗</span>
                    {/* Small pointer tail */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] w-2 h-2 bg-neutral-900 border-r border-b border-rose-500/40 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                id="btn-drive-folder"
                onClick={handleSeeMoreClick}
                className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-16 w-64 border p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg flex items-center justify-between"
              >
                {seeMoreRipples.map((ripple) => (
                  <motion.span
                    key={ripple.id}
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{ scale: 5, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute bg-rose-400/40 rounded-full pointer-events-none z-10 blur-[1px]"
                    style={{
                      left: ripple.x - 24,
                      top: ripple.y - 24,
                      width: 48,
                      height: 48,
                    }}
                    onAnimationComplete={() => removeSeeMoreRipple(ripple.id)}
                  />
                ))}
                <span className="relative z-20">See more</span>
                <ChevronRight className="h-5 w-5 relative z-20 text-gray-200 group-hover:text-rose-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>



      {/* 5. Section: Contact & Enquiry */}
      <motion.section 
        id="contact" 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="py-24 bg-charcoal-pure relative z-20 border-t border-charcoal-border/60 pb-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactSection />
        </div>
      </motion.section>

      {/* 7. Global Footer */}
      <footer className="bg-charcoal-pure border-t border-charcoal-border py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[11px] font-mono text-gray-500 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
          </div>

          <div className="flex items-center gap-2 select-none" id="footer-logo-box">
            <PixlLogo glow={false} className="h-5 w-auto text-gray-500 hover:text-white transition-colors" onlyIcon={true} />
            <span>© 2026 PIXL LABORATORY. ALL SECRETS CODIFIED.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
