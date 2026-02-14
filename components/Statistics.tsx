"use client"
import { statsData } from '@/app/constants'
import React from 'react'
import CountUp from 'react-countup';

const Statistics = () => {
  return (
    <div className="flex flex-col items-center md:flex-row gap-2.5 md:gap-5">
        {statsData.map((item, index)=>(
            <div key={index} className="flex flex-1  flex-col md:flex-row items-center jusify-center lg:justify-start" >
                <CountUp end={item?.value} duration={5} className="text-4xl lg:text-6xl font-extrabold text-white"/>
                <p className="text-4xl lg:text-6xl font-extrabold text-white">{item.subvalue}</p>
                <p className="leading-snug text-sm text-white/70 px-2 md:px-4">{item?.title}</p>
            </div>
        ))}
    </div>
  );
}

export default Statistics