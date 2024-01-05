import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'

const MarketingPage = () => {
  return (
    <div className='px-12 py-6 flex flex-col items-center'>
        <HeroSection/>
    </div>
  )
}

const HeroSection = () => {
    return (
        <>
            <Header isMainPage={false}/>
            <section
            className="relative flex flex-col items-start w-screen  pt-28 px-12">
                <p className="text-xl font-montserrat text-coral-red">Traffic Safety Insights</p>
                <h1 className="mt-10 text-8xl max-sm:text-[72px] max-sm:leading-[82] font-bold font-palanquin">
                    <span className="xl:bg-rose-500 xl:whitespace-nowrap relative z-10 pr-10">Your Road Safety Dashboard</span>
                    <br/>
                    <span className='text-coral-red mt-3 inline-block'>Monitor &amp; Engage </span> in Traffic Safety
                </h1>
                <p className='font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm'>
                    Explore real-time data and trends on road safety, monitor governmental actions, and contribute to a safer driving environment.
                </p>
                <Button asChild className="bg-rose-600 text-white w-[100px] h-[40px] rounded-xl hover:bg-white hover:text-rose-500 "><Link href="/sign-in">Join Us</Link></Button>
                <Image src="/inspection-bg.png" alt="inspection" width={500} height={600} className='object-contain'/>
            </section>
        </>

    )
}

export default MarketingPage