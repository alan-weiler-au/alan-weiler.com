"use client"
import React from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose} from './ui/sheet';
import { LucideAlignLeft} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { navbarData } from '@/app/constants';
import Link from 'next/link';
import SocialLinks from './SocialLinks';


const MobileNav = () => {

    const pathname = usePathname();


  return (
    <Sheet>
        <SheetTrigger className="flex justify-center items-center">
            <LucideAlignLeft className="text-[32px] text-lightSky" />
        </SheetTrigger>
        <SheetContent>
            <SheetTitle>
                Mobile Menu
            </SheetTitle>
    
            <nav className="flex flex-col px-5 gap-7 text-sm font-medium mt-2 ">
                <Logo title="alan_" subtitle="weiler" />
                    {navbarData?.map((item)=>(
                        <SheetClose asChild key={item?.title}>
                        <Link key={item?.title} href={item?.href} 
                                className={`hover:text-hoverColor hoverEffect relative group overflow-x-hidden ${ pathname === item?.href && "text-hoverColor"}`}>{item?.title}
                </Link></SheetClose>))}
                <Link href={"/resume.pdf"} target="_blank" rel="noopener noreferrer" className="text-sm bg-lightSky/10 px-4 py-2 
                                rounded-md border border-hoverColor/10 hover:border-hoverColor hover:bg-hoverColor hover:text-black hoverEffect text-center">Hire me</Link>
                <div className="items-center">
                    <SocialLinks />
                </div>
            </nav>  
        </SheetContent>
    </Sheet>
  );
}

export default MobileNav;