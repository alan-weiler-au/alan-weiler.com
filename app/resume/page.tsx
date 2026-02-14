"use client"
import { Briefcase, Code2 } from 'lucide-react'
import React from 'react'
import { FaAndroid, FaAngular, FaCss3, FaHtml5, FaJava, FaNode, FaPython, FaReact,  } from 'react-icons/fa';
import { SiExpress, SiJavascript, SiNextdotjs, SiSpring, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'motion/react';
import Link from 'next/link';


// about data
const aboutItems = {

  title: "About Me",
  description: "I am a software engineer with a passion for building web applications. I have experience with modern web technologies and frameworks like React, Next.js, and Tailwind CSS. I am always looking to learn new things and improve my skills. I am a team player and I enjoy working with others to achieve a common goal. I am always looking for new opportunities to grow and improve as a developer.",
  info: [
    {fieldName: "Name",
      value: "Alan Weiler",
      link: undefined
    },
    {fieldName: "Phone",
      value: "+61 404 874 276",
      link: "tel:+61404874276"
    },
    {fieldName: "Experience",
      value: "8 years",
      link: undefined
    },
    {fieldName: "LinkedIn",
      value: "linkedin.com/in/alan-lee-weiler",
      link: "https://linkedin.com/in/alan-lee-weiler"
    },
    {fieldName: "Nationality",
      value: "American",
      link: undefined
    },
    {fieldName: "Email",
      value: "alan.weiler.au@gmail.com",
      link: "mailTo:alan.weiler.au@gmail.com"
    },
    {fieldName: "Freelance",
      value: "Available",
      link: undefined
    },
    {fieldName: "Languages",
      value: "English - native, Spanish - basic",
      link: undefined
    },


  ]
}

// experience data
const experienceItems = {

  icon: Briefcase,
  title: "My Experience",
  description: "I've worked as a developer for 9 years, working with a variety of programming languages and technologies. I have worked on a wide range of projects, from small websites to large web applications. I am always looking for new opportunities to learn and grow as a developer.",
  items : [
    {
      company: "Advantage Tech - Contract",
      position: "Software Developer - Mobile",
      duration: "2024-2025"
    },
    {
      company: "Zachary Piper Solutions / CGI Federal",
      position: "Senior Software Developer",
      duration: "2021-2024"
    },

    {
      company: "Silicon Holler / TechTap",
      position: "Software Developer",
      duration: "2020-2021"
    },

    {
      company: "Petted.io",
      position: "Software Developer - Mobile",
      duration: "2018-2020"
    },
    {
      company: "WhoWantsWhat",
      position: "Junior Software Developer - Mobile",
      duration: "2017-2018"
    },
  ]
}

// skills data
const skillsItems = {
  icon: Code2,
  title: "My Skills",
  description: "I have experience with a variety of programming languages and technologies. I am proficient in front-end and back-end development, and I have experience working with databases and APIs. I am always looking to learn new skills and improve my knowledge.",
  skills: [

    {
      icon: <FaReact />,
      name: "React"
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js"
    },
    {
      icon: <SiJavascript />,
      name: "JavaScript"
    },
    {
      icon: <SiTypescript />,
      name: "TypeScript"
    },
    {
      icon: <FaCss3 />,
      name: "Css3"
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind CSS"
    },
    {
      icon: <FaHtml5 />,
      name: "HTML5"
    },
    {
      icon: <FaJava />,
      name: "Java"
    },
    {
      icon: <FaPython />,
      name: "Python"
    },
    {
      icon: <FaNode/>,
      name: "Node",
    },
    {
      icon: <SiExpress/>,
      name: "Express",
    },
    {
      icon: <FaAndroid/>,
      name: "Android"
    },
    {
      icon: <FaAngular/>,
      name: "Angular"
    },
    {
      icon: <SiSpring/>,
      name: "Java Spring"
    }
    /*{
      title: "Front-End Development",
      items: ["React", "Next.js", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Aurelia", "Angular"]  
    },
    {
      title: "Back-End Development",
      items: ["Node.js", "Express", "PostgreSQL", "SQL", "Firebase, Java Spring"]
    },
    {
      title: "Other Skills",
      items: ["Git", "GitHub", "VS Code", "RESTful APIs", "GraphQL", "Android Development - Java", "XML", "Python"]
    }*/
  ]
}



const ResumePage = () => {
  return (
    <motion.div 
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        transition={{
          delay: 2.4, 
          duration: 0.5, 
          ease: "easeIn"}} 
        className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0">
          <div className="container mx-auto my-6">
            <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-[60px]">
              <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
                <TabsTrigger className="hover:bg-lightSky/50 " value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="about">About Me</TabsTrigger>
              </TabsList>

              {/* content */}
              <div className="min-h-[70vh] w-full">

                {/* experience */}
                <TabsContent value="experience" className="w-full">
                  <div className="flex flex-col gap-[30px] text-center xl:text-left">
                    <h3 className="text-4xl font-bold">{experienceItems.title}</h3>
                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{experienceItems.description}</p>
                    <ScrollArea className="h-[480px]">
                      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                        {experienceItems.items.map((item, index) => {
                          return <li key={index} className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                            <span className="text-lightSky">{item.duration}</span>
                            <h3 className="text-xl max-[268px] min-h-[60px] text-center lg:text-left">{item.position}</h3>
                            <div className="flex items-center gap-3">
                              <span className="w-[6px] h-[6px] rounded-full bg-lightSky"></span>
                              <p className="text-white/60">{item.company}</p>
                            </div>
                          </li>
                        })}
                      </ul>
                    </ScrollArea>
                  </div>
                </TabsContent>

                {/* skills */}
                <TabsContent value="skills" className="w-full">
                  <div className="flex flex-col gap-[30px]">
                    <div className="flex flex-col gap-[30px] text-center xl:text-left">
                      <h3 className="text-4xl font-bold">{skillsItems.title}</h3>
                      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skillsItems.description}</p>
                    </div>
                    <ul className="grid grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                      {skillsItems.skills.map((skill, index) => {
                        return <li key={index}>
                          <div className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                            
                            <div className="text-6xl group-hover:text-[0px] group-hover:text-lightSky group-hover:opacity-0 transition-all duration-300 absolute opacity-100 morphEffect">
                              {skill.icon}
                              </div>
                            <p className="text-2xl absolute group-hover:opacity-100 opacity-0 text-lightSky morphEffect">{skill.name}</p>
                          </div>
                        </li>
                      })}
                    </ul>
                  </div>
                </TabsContent>
                {/* about */}
                <TabsContent value="about" className="w-full text-center xl:text-left">
                  <div className="flex flex-col gap-[30px]">
                    <h3 className="text-4xl font-bold">{aboutItems.title}</h3>
                    <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{aboutItems.description}</p>
                    <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                      {aboutItems.info.map((item, index) => {
                        return <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                          <span className="text-md text-white/60">{item.fieldName}</span>
                          {item.link ? <Link href={item.link} className="hover:text-lightSky hoverEffect">{item.value}</Link> : <span className="text-lg text-bold">{item.value}</span>}
                        </li>
                      })}
                    </ul>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
      
    </motion.div>
  )
}

export default ResumePage
