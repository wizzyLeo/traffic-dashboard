'use client';
import React, {useState} from 'react';
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const Header = ({isMainPage}) => {
  const [isDashboard, setIsDashboard] = useState(true)
  return (
    <div className='px-12 py-6 w-screen flex justify-between items-center'>
        <div className='flex gap-4 items-center'>
            <Image src="/SafeStreets.png" alt="logo" width={50} height={50}/>
            <Link href={"/marketing"}>SafeStreets</Link>
        </div>
        {isMainPage && (
          <div>
            <Link href="/main/dashboard" className={`${isDashboard && "border-b-2"}`} onClick={()=>(setIsDashboard(true))}>Dashboard</Link>
            <div className='w-[40px] h-full bg-slate-600 inline-block'></div>
            <Link href="/main/map" className={`${!isDashboard && "border-b-2"}`} onClick={()=>(setIsDashboard(false))}>map</Link>
          </div>
        )}
        <div>
          <UserButton afterSignOutUrl="/main"/>
        </div>
        
        
    </div>
  )
}

export default Header