import PageLayout from '@/components/PageLayout'
import Title from '@/components/Title'
import React from 'react'
import { servicesData } from '../constants'
import { ArrowUp } from 'lucide-react'

const ServicesPage = () => {
  
  return (
    <section className="min-h-[80vh] flex flex-col py-5 md:py-10">
      <PageLayout>
        <Title>
          Services I provide
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">
          {servicesData?.map((item) => (
            <div key={item._id} className="flex flex-col p-6 bg-lightSky/5 border border-lightSky/20 hover:border-lightSky rounded-lg shadow-md group hover:shadow-lg gap-2 hoverEffect">
              <div className="w-full flex items-center justify-between">
                <p className="text-5xl font-extrabold group-hover:text-lightSky ">{item?._id}</p>
                
                  <ArrowUp className="rotate-45 group-hover:rotate-180 group-hover:text-lightSky hoverEffect"/>
               
              </div>
              <h2 className="font-semibold text-white">{item?.title}</h2>
              <p className="text sm md:text-balance text-white/70">{item.description}</p>
              
            </div>
          ))}
        </div>
      </PageLayout>
    </section>
  )
}

export default ServicesPage