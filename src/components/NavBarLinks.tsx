"use client"
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useState } from 'react'

const NavBarLinks = () => {
    const [open,setOpen]= useState(false)
    
  return (  
    <div className='lg:hidden'>
        <div className="rounded w-8 flex items-center  ">
        <div className="w-full flex flex-col gap-[4.5px]  p-1 hover:border hover:border-blue-300 " onClick={()=>setOpen(!open)}>
            <div className={`${open?"rotate-45 origin-left":""} h-1 w-full bg-blue-500 rounded-sm transition-all duration-300`} ></div>
            <div className={`${open?"opacity-0":""} h-1 w-full bg-blue-500 rounded-sm  transition-all duration-300`}></div>
            <div className={`${open?"-rotate-45 origin-left":""} h-1 w-full bg-blue-500 rounded-sm  transition-all duration-300`}></div>
        </div>

    <div className={`${open ? " left-0":" -left-[100%] "} absolute w-full h-[calc(100vh-80px)] top-20 bg-blue-400 duration-300`} >
{
   open && (
        <div className={`h-full w-full `}>
            <div className="flex flex-col w-full h-full gap-5 items-center justify-center">
            <Link href={"/"} className='capitalize text-white font-medium cursor-pointer text-xl'>friends</Link>
            <Link href={"/"} className='capitalize text-white font-medium cursor-pointer text-xl'>messages</Link>
            <Link href={"/"} className='capitalize text-white font-medium cursor-pointer text-xl'>notifications</Link>
            </div>
        </div>
)
}
</div>

        </div>
    </div>
  )
}

export default NavBarLinks