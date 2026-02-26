import { Linkedin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { useGlobalFxControls} from "@/app/providers/GlobalFxProvider"
import { motion } from "motion/react";



const socialData= [{title:"Linkedin", href:"https://www.linkedin.com/in/alan-lee-weiler", icon:<Linkedin/>}, /*{title:"Github", href:"https://github.com/alanleeweiler", icon:<Github/>}*/]
const SocialLinks = () => {

  const fx = useGlobalFxControls()

  return (
    <TooltipProvider>
        
    <div className="flex items-center gap-3">
        {socialData.map((item)=>(
            <Tooltip key={item?.title}>
                <TooltipTrigger asChild>
                    <motion.div animate={fx} key={item?.title} className="text-[var(--fx-color)] border border-[var(--fx-color)] p-2.5 rounded-full  hover:border-[var(--fx-color)] hoverEffect
                    bg-transparent rounded-full border border-[var(--fx-color)]
                  text-[var(--fx-color)] hover:bg-[var(--fx-color)] hover:text-black ">
                        <Link href={item?.href} target="_blank" rel="noopener noreferrer" aria-label={item?.title}>
                            {item?.icon}
                        </Link>
                    </motion.div>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-hoverColor font-semibold">{item?.title}</TooltipContent>
            </Tooltip>
        ))} 
    </div>
    </TooltipProvider>
  )
}

export default SocialLinks