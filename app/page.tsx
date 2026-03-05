"use client"

import Container from "@/components/Container";
import HomeDescription from "@/components/HomeDescription";
import Photo from "@/components/Photo";
import SocialLinks from "@/components/SocialLinks";
import Statistics from "@/components/Statistics";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import SneakyRabbitLogin from "@/components/secret/SneakyRabbitLogin"

import { useGlobalFxControls} from "@/app/providers/GlobalFxProvider"
import { useState } from 'react'
import LoginDialog from '@/components/secret/LoginDialog'



export default function Home() {

  const fx = useGlobalFxControls()
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="bg-bodyColor text-white/8 ">
      <Container className="py-6 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="flex flex-col items-center md:items-start md:gap-7 text-center md:text-start">
          <div>
            <h3 className="fot semibold tracking-wider mb-1">
              software engineer
            </h3>

            <h2 className="text-3xl md:text-md-5xl mb-2 text-white">
              hello, my name is
            </h2>

            <motion.h1
              className="text-5xl md:text-7xl tracking-normal inline-block" 
              animate={fx}
              style={{ color: "var(--fx-color)" }}>
              alan_weiler
            </motion.h1>
          </div>

          <div className="w-full min-h-[290px] md:min-h-[220px] pt-4 md:pt-0 relative">
              <HomeDescription />
          </div>

          <Link href="/resume.pdf" download="resume">
          <Button asChild variant="ghost">
          <motion.button
            animate={fx}
            whileTap={{ scale: 0.98 }}
            className="
              mt-4 md:mt-6
              !rounded-full
              px-6 py-2
              inline-flex items-center gap-2
              bg-transparent border
              border-[var(--fx-color)]
              text-[var(--fx-color)] 
              hover:!bg-[var(--fx-color)] 
              hover:text-black
              transition-colors
              transform-gpu
              hoverEffect
            "
          >
            Download C/V
            <Download className="h-4 w-4" />
          </motion.button>
      </Button>
          </Link>

          <div className="mt-4">
            <SocialLinks />
          </div>

          <Statistics />
        </div>

        <Photo />
        <SneakyRabbitLogin
        onOpenLogin={() => setLoginOpen(true)}
        size={70}/>
        <LoginDialog open={loginOpen} setOpen={setLoginOpen} />

      </Container>
    </div>
  );
}
