import prisma from '@/libs/prismadb'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProfileCard =async () => {

  const {userId} = auth()


  const user = await prisma.user.findFirst({
    where:{
      id: userId!
    },
  include:{
    _count:{
      select:{
        follower:true
      }
    }
  }
  })
  if(!user) return null


  return (
    <div>
        <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6'>
        <div className="h-20 relative">
            <Image src={user?.cover ||"https://images.pexels.com/photos/20858584/pexels-photo-20858584/free-photo-of-sunlight-on-snow-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"} alt="" fill className="rounded-md  object-cover"/>
            <Image src= {user?.avatar || "https://images.pexels.com/photos/7402403/pexels-photo-7402403.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"} alt="" width={48} height={48} className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-30  object-cover"/>
        </div>
        <div className="h-20 flex flex-col gap-2 items-center">
            <span className="font-semibold">{user.username} </span>
            <div className="flex items-center gap-4">
                <div className="flex ">
                <Image src="https://images.pexels.com/photos/20858584/pexels-photo-20858584/free-photo-of-sunlight-on-snow-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={12} height={12} className="rounded-full w-4 h-4   object-cover"/>
                <Image src="https://images.pexels.com/photos/20858584/pexels-photo-20858584/free-photo-of-sunlight-on-snow-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={12} height={12} className="rounded-full w-4 h-4   object-cover"/>
                <Image src="https://images.pexels.com/photos/20858584/pexels-photo-20858584/free-photo-of-sunlight-on-snow-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" width={12} height={12} className="rounded-full w-4 h-4   object-cover"/>
                </div>
                <span className="text-[10px] text-gray-500">{user._count.follower}  Followers</span>
            </div>
            <Link href={`/profile/${user.username}`} className='bg-blue-500 text-white text-xs p-2 rounded-md'>My Profile</Link>
        </div>
    </div>
    </div>
  )
}

export default ProfileCard