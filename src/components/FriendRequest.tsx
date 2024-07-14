import { acceptFollowRequest } from '@/libs/actions'
import prisma from '@/libs/prismadb'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import React from 'react'  
import FriendRequestList from './FriendRequestList'

const FriendRequest = async() => {

  const {userId} = auth()
  if(!userId) return null



  const friendRequestList = await prisma.followRequest.findMany({
    where:{
      recieverId:userId
    },
    include:{
      sender:true
    }
  })




  
  return (
    friendRequestList.length>0?
    <div className='p-2 bg-white rounded-md  w-full'>
   
   <span className="text-sm text-blue-500  capitalize text-center">Friend request list</span>
        <div className="flex flex-col gap-3">
                <FriendRequestList friendRequestList={friendRequestList} />     
  </div> 
    </div>:null
  )
}

export default FriendRequest