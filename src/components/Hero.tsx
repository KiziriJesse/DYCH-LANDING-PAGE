"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  // A muted decorative loop must stop under prefers-reduced-motion. Syncing an
  // external system (the media element) is exactly what an effect is for.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      video.currentTime = 0;
    } else {
      void video.play().catch(() => {
        /* autoplay can be refused by the browser; the still frame is fine */
      });
    }
  }, [reduce]);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
        {/* Fallback for video not found or not supported */}
        <div className="bg-background w-full h-full" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/75 z-10" />

      {/* Content */}
      <div className="relative z-20 min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Empowering African Schools through{" "}
            <span className="text-accent">Inclusive Digital Transformation</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-muted mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Creating safe, connected, and intelligent learning environments where
            every student is protected, every record is accurate, and every parent
            stays informed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-accent-ink bg-accent hover:brightness-110 transition-[transform,filter,box-shadow] duration-500 active:scale-[0.98] shadow-[var(--glow-cta)] hover:shadow-[var(--glow-cta-hover)]"
            >
              Contact Our Team
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

