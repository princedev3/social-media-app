import prisma from '@/libs/prismadb'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'
import SuggestAdd from './SuggestAdd'

const SuggestedList =async () => {
    const{userId} =auth()
    if(!userId)return

    const followersList = await prisma.follower.findMany({
        
        select:{
            userTwoId:true,
            userOneId:true
           
        }
    })

    
    const followersIds = followersList.flatMap(item => [item.userOneId, item.userTwoId])  

    const allUsers = await prisma.user.findMany({
        where:{
            id:{
                notIn:[userId,...followersIds]
            }
        },
        take:8
    })  

    const allFollowerRequest = await prisma.followRequest.findMany({
        where:{
            senderId :userId
            },
            select:{
                recieverId:true
            }
    })
const suggestArray = allFollowerRequest.map(item=>item.recieverId)

  return (
    <div className='mx-auto bg-white rounded-md w-full p-2  '>
        <span className="text-lg text-blue-500 capitalize text-center">see suggested list</span>
        <div className="mt-3 flex flex-col gap-3">
            { 
            allUsers.map(item=>(
                <div className="flex items-center justify-between">
                <Link href={"/profile/"+item.username} className="text-gray-500 font-medium cursor-pointer p-1 hover:bg-slate-50/70 rounded-md">{(item.name + " " + item.surname)?(item.name + " " + item.surname):(item.username)} </Link>

                <SuggestAdd item={item} suggestArray={suggestArray} />
                
            </div>
            ))
            }
        </div>
    </div>
  )
}

export default SuggestedList