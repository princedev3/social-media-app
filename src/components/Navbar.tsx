import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavBarLinks from './NavBarLinks'
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { CiUser } from 'react-icons/ci'
import InputList from './InputList'
import prisma from '@/libs/prismadb'
import { auth } from '@clerk/nextjs/server'

const Navbar = async() => {
 
  return (
    <div className='shadow-sm relative'>
        <div className="flex h-20 items-center w-full px-8 py-4">
        <div className="flex-1">
            <Link href={"/"}>
                <span className="text-xl font-medium text-blue-500 capitalize cursor-pointer hover:bg-slate-50 p-2 rounded-sm hover:shadow-sm hover:shadow-blue-50">main-land</span>
            </Link>
        </div>
        <div className="flex-[2] hidden md:flex ">
            <div className="w-full">
                <InputList  />
            </div>
        </div>
        <div className="flex-1 hidden lg:flex justify-end">




                  
           
        </div>
        <div className="flex-1  flex justify-end items-center gap-3">
       
        <ClerkLoading >
                <div className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-blue-600 border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"/>
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                   <div className="cursor-pointer hidden lg:flex">
                    <Image src={"/people.png"} alt='' width={20} height={20}/>
                   </div>
                   <div className="cursor-pointer  hidden lg:flex">
                    <Image src={"/messages.png"} alt='' width={20} height={20}/>
                   </div>
                   <div className="cursor-pointer  hidden lg:flex">
                    <Image src={"/notifications.png"} alt='' width={20} height={20}/>
                   </div>
                   <UserButton/>
                </SignedIn>
                <SignedOut>
                    <div className="flex items-center gap-1">  
                    <CiUser  className='text-2xl'/>
                    <Link href={"/sign-in"}>Login/Register</Link>
                    </div>
                </SignedOut>
            </ClerkLoaded>
        <NavBarLinks/>
        </div>
        </div>
    </div>
  )
}

export default Navbar