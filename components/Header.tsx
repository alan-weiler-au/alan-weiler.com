"use client"
import React from 'react'
import Container from './Container'
import Logo from './Logo'
import { navbarData } from '@/app/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileNav from './MobileNav'


const Header = () => {
  const pathname = usePathname();
  
  return (
    
    <header className="border-b border-b-hoverColor bg-bodyColor text-white/80 sticky top-0 z-50">
        <Container className="py-5 flex items-center justify-between">

            <Logo title="alan_" subtitle="weiler" />
            <div className="hidden md:inline-flex items-center gap-7 text-sm uppercase font-medium">{navbarData?.map((item)=>(

                <Link key= {item?.title} href={item?.href} 
                    className={`hover:text-hoverColor hoverEffect relative group overflow-x-hidden ${ pathname === item?.href && "text-hoverColor"}`}>
                    {item?.title}
                    <span className={`w-full h-px bg-hoverColor 
                                        inline-block absolute left-0 bottom-0 group-hover:translate-x-0 hoverEffect  
                                        ${pathname === item?.href ? "translate-x-0" : "-translate-x-[105%]"}`}/></Link>))}

                <Link href={"/resume.pdf"} target="_blank" rel="noopener noreferrer" className="text-sm bg-lightSky/10 px-4 py-2 
                            rounded-md border border-hoverColor/10 hover:border-hoverColor hover:bg-hoverColor hover:text-black hoverEffect">Hire me</Link>
                </div>
                <div className="xl:hidden">
                  <MobileNav aria-label="Toggle menu"/>
                </div>
        </Container>
    </header>
  )
}

export default Header