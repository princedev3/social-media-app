import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

   


type userType = User & {_count:{ post:number,  follower:number,following:number}}
const ProfileElement = ({user}:{user:userType }) => {
     
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col '>
        <div className="h-[30vh] relative">
            <Image src={ user?.cover || "https://images.pexels.com/photos/20858584/pexels-photo-20858584/free-photo-of-sunlight-on-snow-in-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"} alt="" fill className="rounded-md  object-cover"/>
            <Image src= {user?.avatar || "https://images.pexels.com/photos/7402403/pexels-photo-7402403.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"} alt="" width={48} height={48} className="rounded-full w-40 h-40 absolute left-0 right-0 m-auto -bottom-20 ring-4 ring-white z-30  object-cover"/>
        </div>
        <div className=" flex flex-col gap-2 items-center mt-24 w-full">
          <div className="flex items-center gap-3">
            <span className="font-semibold capitalize text-xl">{(user?.name  && user?.surname)? user?.name +" "+user?.surname : user?.username} </span>
            <Image src="/messages.png" width={20} height={20} alt='' className='w-5 h-5 object-cover'  />
          </div>

            <div className="flex justify-between items-center gap-14">
                 <div className="flex flex-col   gap-1  items-center">
                      <span className="text-gray-600 text-lg font-medium capitalize">post</span>
                      <span className="text-gray-700 font-meduim">{user?._count?.post} </span>
                 </div>
                 <div className="flex flex-col gap-1  items-center">
                      <span className="text-gray-600 text-lg font-medium capitalize">flowers</span>
                      <span className="text-gray-700 font-meduim">{user?._count?.follower} </span>
                 </div>
                 <div className="flex flex-col gap-1  items-center">
                      <span className="text-gray-600 text-lg font-medium capitalize">followings</span>
                      <span className="text-gray-700 font-meduim">{user?._count?.following}</span>
                 </div>
            </div>
           
        </div>
    </div>
  )
}

export default ProfileElement