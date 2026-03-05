"use client"

import { useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import rabbit from "@/app/images/white-rabbit.png"
import LoginDialog from "./LoginDialog"

export default function WhiteRabbitTrigger() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <>
      {/* Invisible hotspot */}
      <div
        className="fixed bottom-6 right-6 w-16 h-16 z-[9999]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen(true)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.6,
          }}
          transition={{ duration: 0.25 }}
          className="cursor-pointer"
        >
          <Image
            src={rabbit}
            alt="Follow the white rabbit"
            width={48}
            height={48}
            priority
          />
        </motion.div>
      </div>

      <LoginDialog open={open} setOpen={setOpen} />
    </>
  )
}