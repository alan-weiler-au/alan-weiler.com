import { Linkedin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'


const socialData= [{title:"Linkedin", href:"https://www.linkedin.com/in/alan-lee-weiler", icon:<Linkedin/>}, /*{title:"Github", href:"https://github.com/alanleeweiler", icon:<Github/>}*/]
const SocialLinks = () => {
  return (
    <TooltipProvider>
        
    <div className="flex items-center gap-3">
        {socialData.map((item)=>(
            <Tooltip key={item?.title}>
                <TooltipTrigger asChild>
                    <div key={item?.title} className="text-lightSky/80 border border-lightSky/30 p-2.5 rounded-full  hover:border-lightSky hoverEffect
                    bg-transparent rounded-full border border-lightSky/50 
                  text-lightSky hover:bg-hoverColor hover:text-black hoverEffect">
                        <Link href={item?.href} target="_blank" rel="noopener noreferrer" aria-label={item?.title}>
                            {item?.icon}
                        </Link>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-hoverColor font-semibold">{item?.title}</TooltipContent>
            </Tooltip>
        ))} 
    </div>
    </TooltipProvider>
  )
}

export default SocialLinks