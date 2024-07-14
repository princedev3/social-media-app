import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import UpdateInfo from './UpdateInfo'
import { User } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/libs/prismadb'
import UserInfoCardInteraction from './UserInfoCardInteraction'

const UserInfoCard =async ({user}:{user:User}) => {


  const dateObject = new Date(user?.createdAt)
    const options:Intl.DateTimeFormatOptions = {
        month:"short",
        day:"numeric",
        year:"numeric"
    }
    const formatted = dateObject.toLocaleDateString("en-US",options)


  let blocked = false
  let followRequest = false
  let following = false
  const {userId:currentUserId} = auth()
  
  if(!currentUserId) return

  if(currentUserId){
    const blockres = await prisma.block.findFirst({
      where:{
        userOneIdBlockerId:  currentUserId,
        userTwoIdBlockedId:user?.id
      }
    })
  
    blockres?( blocked=true):( blocked=false)

    const followRes = await prisma.follower.findFirst({
      where:{
        userOneId:user?.id,
        userTwoId :currentUserId
      }
    })
   

    followRes?(following=true):(following=false)
    const followRequestRes = await prisma.followRequest.findFirst({
      where:{
        senderId:currentUserId,
        recieverId:user?.id
      }
    })
   
    followRequestRes?(followRequest=true):(followRequest=false)
  }

  return (
    <div className='p-4 bg-white shadow-md rounded-lg  text-sm flex flex-col gap-4' >
    <div className="flex justify-between items-center font-medium ">
     <span className="text-gray-500">User Infomation</span>
     {
      user?.id ===currentUserId?
      <UpdateInfo user={user} />:<span className='text-sm text-blue-500'>see all</span>
     }
      
     </div>
     

     <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-1">
            <span className="text-xl text-black/80">{(user?.name  && user?.surname)? user?.name +" "+user?.surname : user?.username}</span>
            <span className="text-xs">@{user?.username}</span>
        </div>
        <p className="text-sm">
        {user?.description}
        </p>
        {
         <div className="flex items-center gap-2">
            <Image src={"/map.png"} alt='' width={16} height={16} className=''/>
            <span className="">Living in <b>{user?.city} </b></span>
        </div>
        }
       {
        <div className="flex items-center gap-2">
        <Image src={"/school.png"} alt='' width={16} height={16} className=''/>
        <span className="">Went to {user?.school}</span>
    </div>
       }
       
            <div className="flex items-center gap-2">
            <Image src={"/work.png"} alt='' width={16} height={16} className=''/>
            <span className="">work at {user?.work} </span>
        </div>
    
        <div className="flex   justify-between  flex-col gap-2">

            
              <div className="flex gap-1 items-center">
                <Image src={"/link.png"} alt='' width={16} height={16} className=''/>
                <Link href={"https://github.com/princedev3/"} className='text-blue-500 font-medium'>{user?.website} </Link>
                </div>
            
                
            <div className="flex gap-1 items-center">
            <Image src={"/date.png"} alt='' width={16} height={16} className=''/>
           <span className="">Joined on {formatted} </span>
            </div>
     
        </div>
        <div className="w-full flex flex-col gap-2">
          {
            user?.id ===currentUserId?null:
        <UserInfoCardInteraction  userId={user?.id} blocked={blocked} followRequest={followRequest} following={following}  />
          }
       
        </div>
     
     </div>

    </div>
  )
}

export default UserInfoCard