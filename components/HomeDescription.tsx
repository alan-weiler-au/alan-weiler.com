"use client"

import { useTypewriter } from "@/hooks/use-typewriter";
import { useEffect, useState } from "react";
import {motion} from "motion/react";


const HomeDescription = () => {

    const description = "As a Software Engineer, I design and build software solutions that can solve the needs of companies large and small. I have experience working with a variety of programming languages and tech stacks, and I am always eager to learn and implement the most modern of well tested technologies. I am currently seeking new opportunities to further develop my skills and contribute to exciting projects."

    const [hasLoaded, setHasLoaded] = useState(false);
    const displayText = useTypewriter(description, 30);
    useEffect(() => 
        setHasLoaded(true), []
    )

    return (
        <div>
        <motion.p className="w-auto font-normal leading-7 mb-6 min-h-30" 
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 2, duration: 0.5}}>
                        {hasLoaded ? displayText.split("").map((char, index) => 
                            (<motion.span key={index}
                                            initial={{color: "rgb(255 255 255)"}}
                                            transition={{duration: 0.5, delay: index * 0.03}}>{char}</motion.span>)) : <span>{description}</span>}</motion.p>
        </div>
  )
}

export default HomeDescription