"use client"

import React, { createContext, useContext, useEffect, useMemo } from "react"
import { useAnimationControls } from "motion/react"

const GlobalFxContext =
  createContext<ReturnType<typeof useAnimationControls> | null>(null)

export function GlobalFxProvider({ children }: { children: React.ReactNode }) {
  const controls = useAnimationControls()

  useEffect(() => {
    // Must match Photo.tsx exactly
    const blue = "#55c9e6"
    const red = "#d63131"
    const legSeconds = 20
    const flipSeconds = 0.2
    const total = legSeconds * 2 // 40s

    // Shake knobs
    const shakeWindow = 0.22
    const shakeSteps : number = 16
    const xAmp = 10
    const yAmp = 1.2
    const rotAmp = 0.35

    const tFlip1 = legSeconds / total // 0.5
    const tFlip2 = 1

    function windowBounds(centerT: number) {
      const half = (shakeWindow / total) / 2
      const start = Math.max(0, centerT - half)
      const end = Math.min(1, centerT + half)
      return { start, end }
    }

    function windowTimes(start: number, end: number) {
      const arr: number[] = []
      for (let i = 0; i < shakeSteps; i++) {
        const p = shakeSteps === 1 ? 0 : i / (shakeSteps - 1)
        arr.push(start + (end - start) * p)
      }
      return arr
    }

    function grittyShake(amplitude: number, steps = shakeSteps) {
      const vals: number[] = []
      for (let i = 0; i < steps; i++) {
        const sign = i % 2 === 0 ? 1 : -1
        const decay = 1 - (i / steps) * 0.25
        const wobble = 1 + (i % 3 === 0 ? 0.15 : i % 3 === 1 ? -0.08 : 0.05)
        vals.push(sign * amplitude * decay * wobble)
      }
      return vals
    }

    // --- Build "hold, shake, hold" timelines to avoid drift ---
    const w1 = windowBounds(tFlip1)
    const w2 = windowBounds(tFlip2)

    const times1 = windowTimes(w1.start, w1.end)
    const times2 = windowTimes(w2.start, w2.end)

    // Times: 0, hold until w1.start, shake window 1, hold, shake window 2, end
    const shakeTimes: number[] = [
      0,
      w1.start, ...times1, w1.end,
      (total - flipSeconds) / total, // ensure alignment point near end (0.9875)
      w2.start, ...times2, w2.end,
      1,
    ]

    const xShake = grittyShake(xAmp)
    const yShake = grittyShake(yAmp)
    const rShake = grittyShake(rotAmp)

    // Values: 0, 0 (hold), shake..., 0 (hold), 0 (hold), shake..., 0 (hold), 0
    const xKeyframes: number[] = [
      0,
      0, ...xShake, 0,
      0,
      0, ...xShake, 0,
      0,
    ]
    const yKeyframes: number[] = [
      0,
      0, ...yShake, 0,
      0,
      0, ...yShake, 0,
      0,
    ]
    const rKeyframes: number[] = [
      0,
      0, ...rShake, 0,
      0,
      0, ...rShake, 0,
      0,
    ]

    // --- Color timing: drive a CSS variable globally ---
    const strokeTimes: number[] = [
      0,
      (legSeconds - flipSeconds) / total, // 0.4875
      legSeconds / total,                 // 0.5
      (total - flipSeconds) / total,      // 0.9875
      1,
      1,
    ]

    const colorKeyframes = [blue, blue, red, red, blue, blue]

    controls.start({
      // Global CSS var (works for text, borders, AND svg if you reference it)
      ["--fx-color" as any]: colorKeyframes,

      // Shake
      x: xKeyframes,
      y: yKeyframes,
      rotate: rKeyframes,

      transition: {
        ["--fx-color" as any]: {
          duration: total,
          times: strokeTimes,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
        x: { duration: total, times: shakeTimes, ease: "linear", repeat: Infinity, repeatType: "loop" },
        y: { duration: total, times: shakeTimes, ease: "linear", repeat: Infinity, repeatType: "loop" },
        rotate: { duration: total, times: shakeTimes, ease: "linear", repeat: Infinity, repeatType: "loop" },
      },
    })
  }, [controls])

  const value = useMemo(() => controls, [controls])

  return <GlobalFxContext.Provider value={value}>{children}</GlobalFxContext.Provider>
}

export function useGlobalFxControls() {
  const ctx = useContext(GlobalFxContext)
  if (!ctx) throw new Error("useGlobalFxControls must be used inside GlobalFxProvider")
  return ctx
}