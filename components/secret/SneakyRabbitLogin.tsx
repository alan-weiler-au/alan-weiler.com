"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import rabbit from "@/app/images/white-rabbit.png"


type Props = {
  onOpenLogin: () => void;
  size?: number;
  margin?: number;
  hotspotSize?: number;
  zIndex?: number;
  delayMs?: number; // <-- added
};

type Phase = "hidden" | "revealed" | "waiting" | "running" | "arrived";

export default function SneakyRabbitLoginRunner({
  onOpenLogin,
  size = 70,
  margin = 16,
  hotspotSize = 28,
  zIndex = 80,
  delayMs = 1000,
}: Props) {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [runDistance, setRunDistance] = useState(0); // negative px to left

  const timerRef = useRef<number | null>(null);
  const triggeredRef = useRef(false);

  // Compute how far to move left from right-anchored position to land at left margin
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth || 0;
      const dist = Math.max(0, vw - 2 * margin - size);
      setRunDistance(-dist);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [margin, size]);

  // Cleanup any pending timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const trigger = () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;

    setPhase("revealed");
    setPhase("waiting");

    timerRef.current = window.setTimeout(() => {
      setPhase("running");
      timerRef.current = null;
    }, delayMs);
  };

  const revealed = phase !== "hidden";
  const running = phase === "running";
  const arrived = phase === "arrived";
  const clickable = arrived;

  return (
    <>
      {/* Invisible hover hotspot in bottom-right */}
      <div
        onMouseEnter={trigger}
        style={{
          position: "fixed",
          right: margin,
          bottom: margin,
          width: hotspotSize,
          height: hotspotSize,
          zIndex,
          background: "transparent",
        }}
        aria-hidden="true"
      />

      <motion.div
        style={{
          position: "fixed",
          right: margin,
          bottom: margin,
          width: size,
          height: size,
          zIndex,
          cursor: clickable ? "pointer" : "default",
          pointerEvents: clickable ? "auto" : "none",
          imageRendering: "pixelated",
        }}
        initial={{ opacity: 0, x: 0 }}
        animate={{
          opacity: revealed ? 1 : 0,

          // 1) sit at start during waiting, 2) run across during running, 3) stay left when arrived
          x: running || arrived ? runDistance : 0,
        }}
        transition={{
            opacity: revealed
            ? { duration: 0.6, ease: "easeOut" }   // slower fade in
            : { duration: 0.2 },
          x: running
            ? { duration: 0.65, ease: "easeIn" }
            : { duration: 0 }, // no tween when not running
        }}
        onAnimationComplete={() => {
          // When the running x animation completes, mark arrived
          if (phase === "running") setPhase("arrived");
        }}
        onClick={() => {
          if (!clickable) return;
          onOpenLogin();
        }}
      >
        {/* Inner wrapper: handles flip + bobbing */}
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            imageRendering: "pixelated",
          }}
          animate={{
            // Flip rules:
            // - waiting: normal (hidden posture)
            // - running: flipped (faces run direction)
            // - arrived: flip back to normal
            scaleX: running ? -1 : 1,

            // movement feel:
            y: running
              ? [0, -2, 0, -2, 0]
              : arrived
              ? [0, -1, 0]
              : 0,

            rotate: running ? [0, -3, 3, -3, 0] : 0,

            // tiny squash while running, gentle breathe when arrived
            scaleY: running ? [1, 0.96, 1, 0.96, 1] : arrived ? [1, 0.99, 1] : 1,
          }}
          transition={{
            // Flip should be instant at phase changes
            scaleX: { duration: 0 },

            // Loops:
            y: running
              ? { duration: 0.28, repeat: Infinity, ease: "easeInOut" }
              : arrived
              ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 },

            rotate: running
              ? { duration: 0.28, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 },

            scaleY: running
              ? { duration: 0.28, repeat: Infinity, ease: "easeInOut" }
              : arrived
              ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 },
          }}
        >
          <Image
            src={rabbit}
            alt="Sneaky rabbit"
            width={size}
            height={size}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              userSelect: "none",
              pointerEvents: "none",
              imageRendering: "pixelated",
            }}
            priority
          />
        </motion.div>
      </motion.div>
    </>
  );
}