import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Grid, Eye, Tags, Calendar, User, CheckCircle2, ChevronRight, X, RefreshCw } from "lucide-react";
import { GraphicProject } from "../types";
import { graphicProjects } from "../data";
import ProgressiveImage from "./ProgressiveImage";

export default function GraphicsGallery() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeBlueprintId, setActiveBlueprintId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<GraphicProject | null>(null);

  // Motion variants for stagger-loaded visual flow
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 75,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleManualReload = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const toggleBlueprint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveBlueprintId(activeBlueprintId === id ? null : id);
  };

  return (
    <div id="graphic-gallery-root" className="flex flex-col gap-8">
      {/* Informational intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest text-neon-pink uppercase">
            // STATIC MEDIA GRAPHICS
          </span>
          <h3 className="text-2xl font-display font-semibold text-white mt-1">
            Bespoke Creative Deliverables
          </h3>
          <p className="text-sm text-gray-400 mt-2 max-w-2xl">
            A selective showcase of minimalist vector systems, digital editorial printouts, and silicon physical vessels crafted by our freelance experts.
          </p>
        </div>
        
        {isLoading ? (
          <div 
            style={{ height: "48px" }}
            className="text-[11px] font-mono text-[#a78bfa] border border-[#a855f7]/30 rounded-lg px-3 bg-[#171026] flex items-center gap-2 self-start md:self-auto pulse-subtle"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-pink animate-ping" />
            <span>SYNCHRONIZING CAD DATA_NODE...</span>
          </div>
        ) : (
          <div 
            style={{ height: "48px" }}
            className="text-[11px] font-mono text-gray-400 border border-charcoal-border rounded-lg px-3 bg-charcoal-dark flex items-center gap-3 self-start md:self-auto select-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-pink animate-pulse" />
              <span>Interactive Grid Overlays Active</span>
            </div>
            <span className="text-gray-600">|</span>
            <button
              id="btn-reload-gallery"
              onClick={handleManualReload}
              className="text-[#a78bfa] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3 text-neon-pink" />
              <span>Reload Relay</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid of graphics */}
      <motion.div
        key={isLoading ? "loading" : "loaded"}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {isLoading ? (
          // Skeleton loader cards
          Array.from({ length: 4 }).map((_, index) => (
            <motion.div
              variants={cardVariants}
              key={`skeleton-card-${index}`}
              className="bg-charcoal-dark/70 border border-charcoal-border/60 rounded-2xl overflow-hidden flex flex-col justify-between h-full min-h-[350px] pointer-events-none select-none"
            >
              {/* Shimmer Image Box */}
              <div className="relative aspect-video overflow-hidden bg-charcoal-pure border-b border-charcoal-border/50 flex items-center justify-center">
                <div className="absolute inset-0 shimmer-bg opacity-70" />
                
                {/* Visual CAD axes outline */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.12]">
                  <div className="w-[85%] h-[85%] border border-[#a855f7] rounded border-dashed flex items-center justify-center pulse-subtle">
                    <div className="w-[60%] h-[60%] border border-[#d946ef] rounded-full border-dashed" />
                  </div>
                </div>

                {/* Loading code string indicator */}
                <div className="absolute bottom-3 left-4 text-[9px] font-mono text-gray-500 flex items-center gap-1.5">
                  <span className="h-1 w-1 bg-neon-violet rounded-full animate-ping" />
                  <span>STREAMING_ASSETS_NODE_{index + 1}...</span>
                </div>
              </div>

              {/* Shimmer Metadata & Description blocks */}
              <div className="p-5 flex flex-col gap-4 flex-grow justify-between">
                <div className="space-y-4">
                  {/* Category Pill Skeleton */}
                  <div className="h-3.5 w-24 rounded bg-charcoal-medium hover:border-gray-700 shimmer-bg border border-charcoal-border/30" />
                  
                  {/* Title Skeleton */}
                  <div className="h-5 w-2/3 rounded-lg bg-charcoal-medium shimmer-bg" />
                  
                  {/* Description Paragraph lines */}
                  <div className="space-y-2">
                    <div className="h-2.5 w-11/12 rounded bg-charcoal-medium shimmer-bg" />
                    <div className="h-2.5 w-4/5 rounded bg-charcoal-medium shimmer-bg" />
                  </div>
                </div>

                {/* Bottom line coordinates */}
                <div className="flex items-center justify-between pt-4 border-t border-charcoal-border/30 mt-6 text-[10px] font-mono text-gray-600">
                  <div className="h-3 w-16 rounded bg-charcoal-medium shimmer-bg" />
                  <div className="h-3 w-12 rounded bg-charcoal-medium shimmer-bg" />
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          // Original loaded data items
          graphicProjects.map((proj) => {
            const isBlueprintActive = activeBlueprintId === proj.id;
            return (
              <motion.div
                variants={cardVariants}
                key={proj.id}
                id={`card-graphic-${proj.id}`}
                onClick={() => setSelectedProject(proj)}
                className="bg-charcoal-dark border border-charcoal-border rounded-2xl overflow-hidden group hover:border-gray-700 transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container with overlays */}
                <div className="relative aspect-video overflow-hidden bg-charcoal-pure border-b border-charcoal-border">
                  <ProgressiveImage
                    src={proj.imageUrl}
                    alt={proj.title}
                    scaleOnHover={true}
                    isBlueprintActive={isBlueprintActive}
                    accentColor={proj.id === "g1" ? "#8b5cf6" : proj.id === "g2" ? "#3b82f6" : proj.id === "g3" ? "#d946ef" : "#10b981"}
                  />

                  {/* SVG Blueprint alignment overlays */}
                  <AnimatePresence>
                    {isBlueprintActive && (
                      <motion.svg
                        key="blueprint-svg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full pointer-events-none text-neon-violet"
                        viewBox="0 0 400 225"
                      >
                        {/* Technical CAD grids */}
                        <path d="M 0 50 H 400 M 0 112.5 H 400 M 0 175 H 400 M 100 0 V 225 M 200 0 V 225 M 300 0 V 225" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="0.5" strokeDasharray="3 3" />
                        
                        {/* Geometric focal lines */}
                        <circle cx="200" cy="112.5" r="75" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.75" fill="none" strokeDasharray="1 4" />
                        <circle cx="200" cy="112.5" r="4" fill="rgba(217, 70, 239, 0.8)" />
                        <line x1="50" y1="28.125" x2="350" y2="196.875" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="0.5" />
                        <line x1="350" y1="28.125" x2="50" y2="196.875" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="0.5" />

                        {/* Dimensions tags */}
                        <rect x="8" y="8" width="84" height="15" rx="3" fill="#09090b" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.5" />
                        <text x="14" y="18" fill="#a78bfa" fontSize="8" fontFamily="monospace" letterSpacing="0.05em">SPEC_RATIO: 16:9</text>

                        <rect x="306" y="8" width="86" height="15" rx="3" fill="#09090b" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.5" />
                        <text x="312" y="18" fill="#d946ef" fontSize="8" fontFamily="monospace" letterSpacing="0.05em">GRID_LOCK: TRUE</text>

                        {/* Vector crosshairs */}
                        <path d="M190 112.5 h20 M200 102.5 v20" stroke="#d946ef" strokeWidth="1" />
                      </motion.svg>
                    )}
                  </AnimatePresence>

                  {/* Dark Vignette on normal hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-pure/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />
                </div>

                {/* Bottom Details panel */}
                <div className="p-5 flex flex-col gap-4 flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="font-display font-medium text-white text-[15px] group-hover:text-neon-violet-light transition-colors">
                        {proj.title}
                      </h4>
                    </div>

                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Quick details */}
                  <div className="flex items-center justify-between pt-3 border-t border-charcoal-border/30 text-[10px] font-mono text-gray-500 mt-auto">
                    <span className="text-gray-500 uppercase">{proj.category}</span>
                    <span className="text-[#a78bfa] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Case <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>

      {/* Case Study Full Expansion (Details Drawer / Lightbox Overlay) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#000000a0] backdrop-blur-sm"
            />

            {/* Sidebar modal detail panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-xl h-full bg-charcoal-dark border-l border-charcoal-border p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Header */}
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-charcoal-border/50">
                  <span className="text-[10px] font-mono tracking-widest text-[#a855f7] uppercase">
                    // WORK SPECIFICATIONS
                  </span>
                  <button
                    id="btn-close-modal"
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-lg bg-charcoal-pure hover:bg-charcoal-light border border-charcoal-border hover:border-gray-500 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Banner Image */}
                <div className="relative aspect-video rounded-xl overflow-hidden mt-6 bg-charcoal-pure border border-charcoal-border">
                  <ProgressiveImage
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    accentColor={selectedProject.id === "g1" ? "#8b5cf6" : selectedProject.id === "g2" ? "#3b82f6" : selectedProject.id === "g3" ? "#d946ef" : "#10b981"}
                  />
                  <div className="absolute top-3 left-3 z-10 text-[10px] font-mono tracking-widest text-white bg-charcoal-pure/85 px-2.5 py-1 rounded border border-charcoal-border uppercase">
                    {selectedProject.category}
                  </div>
                </div>

                {/* Project Details */}
                <div className="mt-6 flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-display font-semibold text-white">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Core Challenges & Solutions */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-charcoal-pure border border-charcoal-border/80 rounded-xl p-4">
                      <h4 className="text-xs font-mono text-neon-pink font-semibold uppercase tracking-wider mb-1.5">
                        The Challenge
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    <div className="bg-charcoal-pure border border-charcoal-border/80 rounded-xl p-4">
                      <h4 className="text-xs font-mono text-neon-violet-light font-semibold uppercase tracking-wider mb-1.5">
                        Adaptive Solution
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>

                  {/* Technical Metadata */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-2 border-t border-charcoal-border/50">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-500">CLIENT ARCHETYPE</span>
                      <span className="text-white font-medium">{selectedProject.client}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-500">DELIVERY TIMECODE</span>
                      <span className="text-white font-medium">Q1 {selectedProject.year}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tag System & Footer */}
              <div className="mt-8 pt-4 border-t border-charcoal-border/50">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Tags className="h-3 w-3 text-neon-pink mr-1" />
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-gray-400 bg-charcoal-pure px-2 py-1 rounded border border-charcoal-border/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-[10px] font-mono text-gray-500 flex items-center justify-between">
                  <span>DEPLOYED VIA PIXL DISTRIBUTED NETWORK</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Project Case Verified
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
