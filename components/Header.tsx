"use client"
import React from 'react'
import Container from './Container'
import Logo from './Logo'
import { navbarData } from '@/app/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'
import { useGlobalFxControls} from "@/app/providers/GlobalFxProvider"
import { motion } from 'motion/react'



const Header = () => {
  const pathname = usePathname();
  const fx = useGlobalFxControls();
  
  return (
    
  
      <motion.header
        animate={fx}
        className="border-b border-b-[var(--fx-color)] bg-bodyColor text-white/80 sticky top-0 z-50"
      >
        <Container className="py-5 flex items-center justify-between">
  
          <Logo title="alan_" subtitle="weiler" />
  
          <div className="hidden md:inline-flex items-center gap-7 text-sm uppercase font-medium">
  
            {navbarData?.map((item) => (
              <Link
                key={item?.title}
                href={item?.href}
                className={`
                  relative group overflow-x-hidden hoverEffect
                  hover:text-[var(--fx-color)]
                  ${pathname === item?.href && "text-[var(--fx-color)]"}
                `}
              >
                {item?.title}
  
                <span
                  className={`
                    w-full h-px
                    bg-[var(--fx-color)]
                    inline-block absolute left-0 bottom-0
                    group-hover:translate-x-0 hoverEffect
                    ${pathname === item?.href
                      ? "translate-x-0"
                      : "-translate-x-[105%]"}
                  `}
                />
              </Link>
            ))}
  
            {/* Hire me button */}
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-sm
                px-4 py-2
                rounded-full
                border
                border-[var(--fx-color)]
                text-[var(--fx-color)]
                hover:bg-[var(--fx-color)]
                hover:text-black
                hoverEffect
              "
            >
              Hire me
            </Link>
  
          </div>
  
          <div className="xl:hidden">
            <MobileNav aria-label="Toggle menu" />
          </div>
  
        </Container>
      </motion.header>
  )
}

export default Header