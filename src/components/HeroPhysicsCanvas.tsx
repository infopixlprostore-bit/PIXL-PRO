import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  color: string;
  glowColor: string;
  alpha: number;
  connectedCount: number;
}

export default function HeroPhysicsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseRef = useRef<{ x: number | null; y: number | null; rx: number | null; ry: number | null }>({
    x: null,
    y: null,
    rx: null, // relative / target
    ry: null,
  });

  // Track cursor position inside container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Set up ResizeObserver to handle container scaling precisely (complying with stage guidelines)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let resizeTimeout: NodeJS.Timeout;

    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;

      // Debounce the resize to prevent layout thrashing and high redraw costs
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setDimensions({ width, height });
      }, 100);
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Main canvas animation and physics engine loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high PPI screens cleanly
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Seed data particles matching the neon violet / neon pink branding
    const particleCount = Math.min(65, Math.floor((dimensions.width * dimensions.height) / 16000));
    const particles: Particle[] = [];

    const neonColors = [
      { base: "rgba(139, 92, 246, ", glow: "rgba(139, 92, 246, 0.4)" }, // Neon Violet
      { base: "rgba(217, 70, 239, ", glow: "rgba(217, 70, 239, 0.4)" }, // Neon Pink
      { base: "rgba(244, 63, 94, ", glow: "rgba(244, 63, 94, 0.35)" },   // Neon Coral
    ];

    for (let i = 0; i < particleCount; i++) {
      const colorSet = neonColors[Math.floor(Math.random() * neonColors.length)];
      const baseAlpha = 0.15 + Math.random() * 0.45;
      
      // Floating base random speed velocities
      const baseVx = (Math.random() - 0.5) * 0.35;
      const baseVy = (Math.random() - 0.5) * 0.35;

      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        size: 1 + Math.random() * 2.2,
        color: `${colorSet.base}${baseAlpha})`,
        glowColor: colorSet.glow,
        alpha: baseAlpha,
        connectedCount: 0,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const mouse = mouseRef.current;
      const interactionRadius = 140;

      // Update particle positions and apply physics simulation
      particles.forEach((p) => {
        // Apply basic velocity
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders gracefully
        if (p.x < -10) p.x = dimensions.width + 10;
        if (p.x > dimensions.width + 10) p.x = -10;
        if (p.y < -10) p.y = dimensions.height + 10;
        if (p.y > dimensions.height + 10) p.y = -10;

        // Calculate vector from mouse pointer
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < interactionRadius) {
            // Apply localized physics forces
            // Gentle attraction with rotation vortex effect, or smooth kinetic acceleration
            const force = (interactionRadius - distance) / interactionRadius; // 0 to 1
            
            // Push particles sideways and slightly out (swirling orbital repulsion)
            const angle = Math.atan2(dy, dx);
            const targetVx = p.baseVx + Math.cos(angle + Math.PI / 4) * force * 1.2;
            const targetVy = p.baseVy + Math.sin(angle + Math.PI / 4) * force * 1.2;

            // Smooth interpolation (inertia/friction)
            p.vx += (targetVx - p.vx) * 0.08;
            p.vy += (targetVy - p.vy) * 0.08;
          } else {
            // Return back to organic ambient floating velocity smoothly
            p.vx += (p.baseVx - p.vx) * 0.04;
            p.vy += (p.baseVy - p.vy) * 0.04;
          }
        } else {
          // Return back to organic ambient floating velocity smoothly if mouse is gone
          p.vx += (p.baseVx - p.vx) * 0.04;
          p.vy += (p.baseVy - p.vy) * 0.04;
        }

        p.connectedCount = 0;
      });

      // Draw connection lines first (circuit/neural styled network logic)
      const maxDistance = 90;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            p1.connectedCount++;
            p2.connectedCount++;

            // Calculate opacity based on distance
            const alpha = (1 - dist / maxDistance) * 0.12;

            // Draw line
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();

            // Occasionally draw micro technical bridge dots (highly polished detail)
            if (dist < maxDistance * 0.4 && Math.random() < 0.005) {
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;
              ctx.beginPath();
              ctx.arc(midX, midY, 1, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(217, 70, 239, 0.4)";
              ctx.fill();
            }
          }
        }
      }

      // Draw particles on top of connections
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw micro glows around highly connected nodes to highlight networking complexity
        if (p.connectedCount >= 3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.glowColor;
          ctx.fill();
        }
      });

      // Draw mouse helper aura to connect user to the simulation
      if (mouse.x !== null && mouse.y !== null) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(217, 70, 239, 0.25)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      id="hero-physics-ambient-container"
      className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full mix-blend-screen opacity-70"
      />
    </div>
  );
}
