"use client"

import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { motion } from 'motion/react';
import { useGlobalFxControls} from "@/app/providers/GlobalFxProvider"


interface Props{
    className?: string;
    title: string;
    subtitle: string;
}

const Logo = ({className, title, subtitle} : Props) => {

  const fx = useGlobalFxControls()

  return (
    <div className="text-2xl group">
        <Link href={'/'}>
        <motion.h2 className={cn("font-semibold hover:text-[var(--fx-color)] hoverEffect", className)} animate={fx}>
            {title}<motion.span className="text-[var(--fx-color)] group-hover:text-white hoverEffect">{subtitle}</motion.span>
        </motion.h2>
        </Link>
    </div>
  )
}

export default Logo