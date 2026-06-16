import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, Sparkles, Move, Zap, RefreshCw, Palette } from "lucide-react";

export default function BespokePlayground() {
  // Spring Physics States
  const [stiffness, setStiffness] = useState<number>(300);
  const [damping, setDamping] = useState<number>(15);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);
  const [decayPoints, setDecayPoints] = useState<string>("");

  // Magnetic Button States
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const magneticRef = useRef<HTMLButtonElement>(null);

  // Color Shifter Specs
  const [violetHue, setVioletHue] = useState<number>(265); // 262 is neon violet
  const [neonGlowRange, setNeonGlowRange] = useState<number>(15);

  // Math simulation for spring decays
  useEffect(() => {
    // Generate a beautiful decay curve based on stiffness and damping
    const points = [];
    const step = 2;
    const length = 200; // SVG Width
    // Simplistic damped harmonic oscillator simulation: x(t) = e^(-omega * t) * cos(freq * t)
    const omega = damping / 10;
    const freq = Math.sqrt(stiffness) / 10;

    for (let x = 0; x <= length; x += step) {
      const t = x / 40; // time conversion
      const amplitude = 40; // height
      const y = amplitude * Math.exp(-omega * t) * Math.cos(freq * t);
      // Center vertical at y = 45 in our 90px height graph
      points.push(`${x},${45 + y}`);
    }
    setDecayPoints(points.join(" "));
  }, [stiffness, damping]);

  // Trigger bounce animation
  const triggerBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 800);
  };

  // Magnetic button calculations
  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (magneticRef.current) {
      const rect = magneticRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Pull strength factor
      const strength = 0.35;
      setMagnetPos({ x: x * strength, y: y * strength });
    }
  };

  const resetMagnetic = () => {
    setMagnetPos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div id="playground-root" className="bg-charcoal-dark border border-charcoal-border rounded-2xl p-6 md:p-8 flex flex-col gap-6">
      {/* Overview header */}
      <div>
        <span className="text-xs font-mono tracking-widest text-[#a855f7] uppercase flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 fill-neon-violet/30" /> // LIVE PLAYGROUND
        </span>
        <h3 className="text-xl font-display font-semibold text-white mt-1">
          Tactile UI Component Sandbox
        </h3>
        <p className="text-xs text-gray-400 mt-2 max-w-2xl leading-relaxed">
          PIXL structures smooth, highly polished micro-interactions using core mathematical physics and viewport calculations. Play with the dynamic widgets below to evaluate our production standards first-hand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        {/* Component 1: Spring Physics Decay Engine */}
        <div className="bg-charcoal-pure border border-charcoal-border/70 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-gray-400 font-semibold uppercase">
                01 _ Mass Curve Decay
              </span>
              <span className="text-[9px] font-mono text-neon-pink bg-[#2d112d] px-1.5 py-0.5 rounded border border-neon-pink/10">
                ACTIVE_PHYSICS
              </span>
            </div>
            <h4 className="text-sm font-display font-medium text-white mb-3">
              Elastic Spring Oscillation
            </h4>

            {/* Simulated spring decay SVG plotting */}
            <div className="h-24 bg-[#050507] rounded-lg border border-charcoal-border/60 p-2 relative flex items-center mb-4 overflow-hidden">
              <svg className="w-full h-full text-neon-violet overflow-visible" viewBox="0 0 200 90">
                {/* Center equilibrium line */}
                <line x1="0" y1="45" x2="200" y2="45" stroke="#1f1f23" strokeWidth="1" strokeDasharray="2 2" />
                {/* Mathematical decay path */}
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  points={decayPoints}
                  className="transition-all duration-300"
                />
              </svg>

              {/* Bounce sample component with active motion */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    y: isBouncing ? [-20, 15, -10, 5, -2, 0] : 0,
                    scale: isBouncing ? [1.1, 0.9, 1.05, 0.97, 1.0, 1] : 1
                  }}
                  transition={{
                    type: "spring",
                    stiffness: stiffness,
                    damping: damping
                  }}
                  className="h-7 w-7 rounded-lg bg-gradient-to-br from-neon-violet to-neon-pink flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                  onClick={triggerBounce}
                >
                  <RefreshCw className={`h-3 w-3 text-white ${isBouncing ? "animate-spin" : ""}`} />
                </motion.div>
                <span className="text-[8px] font-mono text-gray-500">TEST APEX</span>
              </div>
            </div>

            {/* Sliders controls */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-gray-400">Stiffness (Mass K)</span>
                  <span className="text-neon-violet-light font-medium">{stiffness} N/m</span>
                </div>
                <input
                  id="range-sandbox-stiffness"
                  type="range"
                  min="50"
                  max="800"
                  step="10"
                  value={stiffness}
                  onChange={(e) => setStiffness(parseInt(e.target.value))}
                  className="w-full h-1 bg-charcoal-border rounded appearance-none cursor-pointer accent-neon-violet"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-gray-400">Damping (Frictional B)</span>
                  <span className="text-neon-pink-light font-medium">{damping} N·s/m</span>
                </div>
                <input
                  id="range-sandbox-damping"
                  type="range"
                  min="2"
                  max="50"
                  step="1"
                  value={damping}
                  onChange={(e) => setDamping(parseInt(e.target.value))}
                  className="w-full h-1 bg-charcoal-border rounded appearance-none cursor-pointer accent-neon-pink"
                />
              </div>
            </div>
          </div>

          <button
            id="btn-trigger-bounce"
            onClick={triggerBounce}
            className="w-full mt-4 py-2 bg-charcoal-light hover:bg-[#1a122e] border border-charcoal-border hover:border-neon-violet text-[10px] font-mono font-medium rounded-lg text-gray-300 hover:text-white transition-all uppercase"
          >
            Trigger Spring Bounce
          </button>
        </div>

        {/* Component 2: Magnetic UI Button */}
        <div className="bg-charcoal-pure border border-charcoal-border/70 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-gray-400 font-semibold uppercase">
                02 _ Viewport Proximity
              </span>
              <span className="text-[9px] font-mono text-[#a78bfa] bg-[#1a142e] px-1.5 py-0.5 rounded border border-neon-violet/10">
                PROXIMITY_VEC
              </span>
            </div>
            <h4 className="text-sm font-display font-medium text-white mb-3">
              Magnetic Pointer Puller
            </h4>

            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Hover your cursor near the component below. The button detects coordinate vectors, pulling the UI element into magnetic alignment.
            </p>

            {/* Magnetic Button Area Box */}
            <div className="h-32 bg-[#050507] rounded-lg border border-charcoal-border/60 relative flex items-center justify-center overflow-hidden">
              {/* Proximity Grid Lines */}
              {isHovered && (
                <div className="absolute inset-0 pointer-events-none opacity-20 transition-opacity">
                  <div className="absolute inset-x-0 h-[1px] bg-neon-pink" style={{ top: "50%" }} />
                  <div className="absolute inset-y-0 w-[1px] bg-neon-pink" style={{ left: "50%" }} />
                  <div className="absolute border border-neon-pink rounded-full w-20 h-20 border-dashed animate-ping" style={{ top: "calc(50% - 40px)", left: "calc(50% - 40px)" }} />
                </div>
              )}

              <button
                ref={magneticRef}
                id="btn-magnetic-sandbox"
                onMouseMove={handleMagneticMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={resetMagnetic}
                style={{
                  transform: `translate(${magnetPos.x}px, ${magnetPos.y}px)`,
                  transition: isHovered ? "none" : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                className="px-5 py-2.5 bg-charcoal-dark border border-charcoal-border hover:border-neon-pink rounded-xl text-xs font-mono font-medium text-white flex items-center gap-1.5 cursor-pointer shadow-lg select-none relative group"
              >
                {/* Glow ring under mouse */}
                <div className="absolute inset-0 rounded-xl bg-neon-pink opacity-0 group-hover:opacity-10 blur transition-opacity pointer-events-none" />
                <Move className="h-3.5 w-3.5 text-neon-pink group-hover:scale-110 transition-transform" />
                <span>Magnetic Component</span>
              </button>
            </div>
          </div>

          <div className="text-[9px] font-mono text-gray-500 mt-4 flex justify-between">
            <span>D_COORD_X: {Math.round(magnetPos.x)}px</span>
            <span>D_COORD_Y: {Math.round(magnetPos.y)}px</span>
          </div>
        </div>

        {/* Component 3: Violet / Neon Contrast Customizer */}
        <div className="bg-charcoal-pure border border-charcoal-border/70 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-gray-400 font-semibold uppercase">
                03 _ Spectrum Config
              </span>
              <span className="text-[9px] font-mono text-amber-400 bg-[#2e2611] px-1.5 py-0.5 rounded border border-amber-400/10">
                PALETTE_SYS
              </span>
            </div>
            <h4 className="text-sm font-display font-medium text-white mb-3">
              Spectrum Contrast Shifter
            </h4>

            {/* Color Sample Panel previews */}
            <div className="rounded-lg p-3 bg-charcoal-dark border border-charcoal-border/60 flex flex-col gap-3.5 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-gray-400 uppercase">Interactive Elements</span>
                <span className="text-[8px] font-mono text-gray-500">PREVIEW</span>
              </div>

              {/* Sample Custom Violet border, shadow, text */}
              <div
                className="p-3.5 rounded-xl border flex flex-col gap-2 transition-all duration-300"
                style={{
                  borderColor: `hsla(${violetHue}, 80%, 60%, 0.4)`,
                  boxShadow: `0 0 ${neonGlowRange}px hsla(${violetHue}, 80%, 50%, 0.15)`,
                  backgroundColor: "#09090b"
                }}
              >
                <span
                  className="text-xs font-display font-semibold transition-colors"
                  style={{ color: `hsl(${violetHue}, 90%, 75%)` }}
                >
                  PIXL Vector Agency
                </span>
                <span className="text-[10px] font-mono text-gray-400 uppercase">
                  Freelance Network
                </span>
                <div
                  className="w-full h-1 bg-charcoal-light rounded overflow-hidden"
                >
                  <div
                    className="h-full transition-all"
                    style={{
                      width: "70%",
                      backgroundColor: `hsl(${violetHue}, 90%, 65%)`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Hue slider */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-gray-400">Hue Degrees (λ)</span>
                  <span style={{ color: `hsl(${violetHue}, 95%, 70%)` }} className="font-semibold">
                    {violetHue}°
                  </span>
                </div>
                <input
                  id="range-sandbox-hue"
                  type="range"
                  min="180"
                  max="330"
                  value={violetHue}
                  onChange={(e) => setVioletHue(parseInt(e.target.value))}
                  className="w-full h-1 bg-charcoal-border rounded appearance-none cursor-pointer accent-neon-pink"
                />
              </div>

              {/* Glow density slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-gray-400">Glow Aura Radius</span>
                  <span className="text-white font-medium">{neonGlowRange}px</span>
                </div>
                <input
                  id="range-sandbox-glow"
                  type="range"
                  min="0"
                  max="40"
                  value={neonGlowRange}
                  onChange={(e) => setNeonGlowRange(parseInt(e.target.value))}
                  className="w-full h-1 bg-charcoal-border rounded appearance-none cursor-pointer accent-neon-violet"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-charcoal-border/30 flex justify-between items-center text-[9px] font-mono text-gray-500">
            <span className="flex items-center gap-1">
              <Palette className="h-3 w-3 text-neon-violet" /> HSLA_EXP_VAR
            </span>
            <span>COMPLIANT STATUS OK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
