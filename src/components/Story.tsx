import Image from 'next/image'
import React from 'react'
import StoryList from './StoryList'
import prisma from '@/libs/prismadb'
import { auth } from '@clerk/nextjs/server'

const Story =async () => {
   const {userId} =auth()

   const getAllFollowers = await prisma.follower.findMany({
      where:{
         userOneId:userId!
      },
      select:{
         userTwoId:true
      }
   })

   const getAllFollowerIds = getAllFollowers?.map(item=>item.userTwoId)

 

const allIds = [...getAllFollowerIds,userId]

const {userId:currentUserId} = auth()

if(!currentUserId){return}

   const storylist = await prisma.story.findMany({
      where:{
            expiresAt:{
                  gt:new Date()
            },
            OR:[ {
                   user:{
                     id:{
                        in:allIds
                     }
                   }
                   }
            ]
      },
      include:{
            user:true
      }
})


  return (
    <div className='p-4 bg-white rounded-lg shadow-sm overflow-x-scroll  overflow-y-hidden w-full text-sm  removeXScroll-Bar min-h-[24vh] '>
    <div className="flex gap-8 w-max    h-full  ">
<StoryList storylist={storylist} />    
  </div>
  </div>
  )
}

export default Story