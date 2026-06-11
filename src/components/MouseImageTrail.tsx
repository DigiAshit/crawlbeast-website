"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailImage {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
}

const trailImages = [
  "/popup.png",
  "/crawlBeast.png",
  "/popup.png",
  "/crawlBeast.png"
];

const MouseImageTrail: React.FC = () => {
  const [images, setImages] = useState<TrailImage[]>([]);
  const imageIndexRef = useRef(0);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const nextIdRef = useRef(0);

  useEffect(() => {
    // Disable on mobile/touch viewports
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const threshold = 120; // px distance threshold to spawn a new image

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastXRef.current;
      const dy = e.clientY - lastYRef.current;
      const distance = Math.hypot(dx, dy);

      if (distance < threshold) return;

      lastXRef.current = e.clientX;
      lastYRef.current = e.clientY;

      const rotation = dx > 0 ? 12 : -12; // rotate based on direction
      const currentSrc = trailImages[imageIndexRef.current % trailImages.length];
      imageIndexRef.current += 1;

      const newImage: TrailImage = {
        id: nextIdRef.current++,
        x: e.clientX,
        y: e.clientY + window.scrollY, // account for page scrolling
        src: currentSrc,
        rotation,
      };

      setImages((prev) => [...prev, newImage]);

      // Automatically remove image after animation duration
      setTimeout(() => {
        setImages((prev) => prev.filter((img) => img.id !== newImage.id));
      }, 1500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {images.map((img) => (
          <motion.div
            key={img.id}
            initial={{ scale: 0.5, opacity: 0, rotate: img.rotation * 0.5 }}
            animate={{ scale: 1, opacity: 0.85, rotate: img.rotation }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, duration: 1.2 }}
            style={{
              position: "absolute",
              left: img.x,
              top: img.y - window.scrollY, // keep aligned with viewport
              x: "-50%",
              y: "-50%",
            }}
            className="w-48 h-auto overflow-hidden rounded-xl border border-white/10 bg-[#0e1320] p-1.5 shadow-2xl"
          >
            <img
              src={img.src}
              alt="Trail thumbnail"
              className="w-full h-auto rounded-lg object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MouseImageTrail;
