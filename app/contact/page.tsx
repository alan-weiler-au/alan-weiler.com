"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

import {FaPhoneAlt, FaEnvelope} from 'react-icons/fa'
import {motion} from "framer-motion";
import Link from 'next/link';
import { defaultCountries, parseCountry, PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';


import { useState } from 'react';


const info = [

  {
    icon: <FaPhoneAlt/>,
    title: "Phone",
    description: "+61 404 874 276",
    link: "tel:+61404874276"
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description:"alanweilerau@gmail.com",
    link: "mailTo"
  },
]

const ContactPage = () => {

    const [phone, setPhone] = useState('');
    const { toast } = useToast();
    const countries = defaultCountries.filter((country) => {
      const { iso2 } = parseCountry(country);
      return ['au', 'us'].includes(iso2);
    });

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const apiEndpoint = '/api/email';
      const formData = new FormData(event.currentTarget);
      formData.append("name", formData.get("firstname") + " " + formData.get("lastname"))
      const object = Object.fromEntries(formData);
      console.log(object);
      const json = JSON.stringify(object);
      fetch(apiEndpoint, {
        method: 'POST',
        body: json,
      })
        .then((res) => res.json())
        .then(() => {

          const currDate = new Date().toLocaleDateString();
          const currTime = new Date().toLocaleTimeString();
          toast({
            title: "Your message has been sent.",
            description: currDate + " " + currTime,
            
          })
        })
        .catch((err) => {
          alert(err);
        });
  }

  

  return (
    <motion.section initial={{opacity: 0}} 
                    animate={{opacity: 1, 
                      transition: { delay: 0.4, 
                        ease: "easeIn"}, }} className="py-6">

      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[45%] order-2 xl:order-none px-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h3 className="text-4xl text-lightSky">Lets talk collaboration</h3>
              <p>Need an experienced professional for your next project?  Are you seeking a knowledgable web developer?  Want to design and build a mobile application together?  Drop your information below and we can start building.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="firstname" name="firstname" placeholder="First name" />
                <Input type="lastname" name="lastname" placeholder="Last name" />
                <Input type="email" name="email" placeholder="Email address" />
                {/*<Input type="tel" name="phone" placeholder="Phone number"/>*/}
                <PhoneInput
                    className="flex h-9 w-full h-[48px] rounded-md border border-input bg-black px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus:border-lightSky hoverEffect focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    defaultCountry="au"
                    countries={countries}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    name="phone"/>
                
              </div>
              {/*
              <Select name="service" >
                <SelectTrigger  className="w-full justify-between ">
                  <SelectValue  placeholder="Select a service"></SelectValue>
                </SelectTrigger>
                <SelectContent >
                  <SelectGroup>
                    {/*<SelectLabel className="text-white/40">Select a service</SelectLabel>
                    <SelectItem value="Website Development">Website Development</SelectItem>
                    <SelectItem value="Full Stack Web Development">Full Stack Web Development</SelectItem>
                    <SelectItem value="Mobile Application Development">Mobile Application Development</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>*/}

              <Textarea name="message" className="h-[200px]" placeholder="Type your message here."/>
              <Button className="bg-transparent max-w-40 rounded-full border border-lightSky/50 
                  text-white hover:bg-hoverColor hover:text-black hoverEffect">Send Message</Button>
            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-center order-1  xl:order-none mb-8 xl:mb-0 px-8">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {

                return <Link href={item.link} key={index} className="flex items-center gap-6 hover:text-lightSky hoverEffect">
                  <div  className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c]  rounded-md flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <h3 className="text-xl">{item.description}</h3>
                  </div>
                </Link>
              })}
            </ul>
          </div>
        </div> 
      </div>
    </motion.section>
    
  )
}

export default ContactPage
