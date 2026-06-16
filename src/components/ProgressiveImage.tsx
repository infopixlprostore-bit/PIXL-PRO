import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  accentColor?: string; // Dominant tone for initial ambient loading aura
  scaleOnHover?: boolean;
  isBlueprintActive?: boolean;
}

export default function ProgressiveImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  accentColor = "#8b5cf6",
  scaleOnHover = false,
  isBlueprintActive = false
}: ProgressiveImageProps) {
  const [isHighResLoaded, setIsHighResLoaded] = useState<boolean>(false);
  const [blurSrc, setBlurSrc] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // Reset state when source image changes
    setIsHighResLoaded(false);
    setBlurSrc(null);
    setIsError(false);

    const img = new Image();
    img.src = src;
    img.referrerPolicy = "no-referrer";

    const handleLoad = () => {
      // Dynamic client-side thumbnail generation
      // Downsamples input image to a 20x11 raster canvas for an authentic pixelated preview
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 20;
      canvas.height = 11;

      if (ctx) {
        try {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const tinyDataUrl = canvas.toDataURL("image/jpeg", 0.3);
          setBlurSrc(tinyDataUrl);
        } catch (e) {
          // Fallback if cross-origin or canvas capture limitations occur
          setBlurSrc(src);
        }
      }
    };

    const handleError = () => {
      setIsError(true);
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
      img.addEventListener("error", handleError);
    }

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [src]);

  // Combined styling with blueprint logic and group hovers
  const imageStyles = `${className} transition-all duration-700 ${
    scaleOnHover ? "group-hover:scale-105" : ""
  } ${isBlueprintActive ? "blur-[1px] brightness-70 contrast-125 grayscale" : ""}`;

  return (
    <div className="relative w-full h-full overflow-hidden bg-charcoal-pure flex items-center justify-center">
      {/* Stage 1: Ambient CSS Glowing Color Gradient Aura (Pulsing Skeleton) */}
      <AnimatePresence>
        {!isHighResLoaded && (
          <motion.div
            key="stage1-skeleton"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center bg-charcoal-dark"
          >
            {/* Shimmer line effect */}
            <div className="absolute inset-0 shimmer-bg opacity-[0.14]" />

            {/* Glowing neon sphere behind placeholder */}
            <div
              className="absolute w-24 h-24 rounded-full blur-[40px] opacity-35 animate-pulse"
              style={{ backgroundColor: accentColor }}
            />

            {/* Infinite tech coordinates tracker indicator */}
            <div className="absolute bottom-3 left-4 text-[9px] font-mono text-gray-500/80 flex items-center gap-1.5 select-none">
              <span className="h-1 w-1 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
              <span>CACHING_MEDIA_SOURCE...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Low-Resolution Blur Image (Pixelated Raster Canvas Preview) */}
      <AnimatePresence>
        {blurSrc && !isHighResLoaded && !isError && (
          <motion.img
            key="stage2-lowres"
            src={blurSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`${imageStyles} filter blur-xl scale-110 opacity-60 absolute inset-0 pointer-events-none`}
          />
        )}
      </AnimatePresence>

      {/* Stage 3: High-Resolution Final Master Artwork */}
      {!isError ? (
        <motion.img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onLoad={() => setIsHighResLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHighResLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={imageStyles}
        />
      ) : (
        <div className="text-[10px] font-mono text-gray-500 uppercase flex items-center gap-2">
          <span>Failed to load asset</span>
        </div>
      )}
    </div>
  );
}
