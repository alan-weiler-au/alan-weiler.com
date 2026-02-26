"use client"
import React from "react"
import hero from "../app/images/hero.png"
import Image from "next/image"
import { motion, Variants } from "motion/react"
import { useGlobalFxControls } from "@/app/providers/GlobalFxProvider"

const circleVariants: Variants = {
  initial: {
    strokeDasharray: "24 10 0 0",
    rotate: 0,
    opacity: 0,
  },
  animate: (index: number) => ({
    strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
    rotate: [120, 360],
    opacity: 1,
    transition: {
      strokeDasharray: { duration: 20, repeat: Infinity, repeatType: "reverse" as const },
      rotate: { duration: 20, repeat: Infinity, repeatType: "reverse" as const },
      opacity: { duration: 1, delay: 2 + index * 1, ease: "easeIn" },
    },
  }),
}

const Photo = () => {
  const fx = useGlobalFxControls()

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1, duration: 1, ease: "easeIn" } }}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1, duration: 1, ease: "easeInOut" } }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div className="w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden fade-out-1 scale-85">
            <Image
              src={hero}
              alt="Alan Weiler"
              width={400}
              height={400}
              quality={100}
              className="object-contain w-full h-full"
            />
          </div>
        </motion.div>

        <svg
          className="w-[250px] lg:w-[506px] h-[250px] lg:h-[506px]"
          viewBox="0 0 506 506"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ✅ Apply GLOBAL fx to a wrapper so the circle can keep its own variants */}
          <motion.g animate={fx}>
            <motion.circle
              cx="253"
              cy="253"
              r={240}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="var(--fx-color)"
              variants={circleVariants}
              initial="initial"
              animate="animate"
              custom={0}
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
            />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  )
}

export default Photo