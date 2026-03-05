"use client"
import React from 'react'
import { cn } from '@/lib/utils';
import { useGlobalFxControls} from "@/app/providers/GlobalFxProvider"
import { motion } from "motion/react"


interface Props {
    children: React.ReactNode;
    className?: string;
}

const Title = ({children, className}: Props) => {

  const fx = useGlobalFxControls()

  return (
    <motion.h2 animate={fx} className={cn('text-xl text-[var(--fx-color)] font-bold mb-4', className)}>{children}</motion.h2>
  )
}

export default Title