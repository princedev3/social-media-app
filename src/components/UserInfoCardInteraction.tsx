"use client"
import { follow, switchBlock } from '@/libs/actions'
import { useUser } from '@clerk/nextjs'
import React, { useOptimistic, useState } from 'react'

const UserInfoCardInteraction = ({following,followRequest,blocked,userId}:{blocked:boolean,followRequest:boolean,following:boolean,userId:string}) => {

    const[followStatus,setFollowStatus]=useState({
        isFollow:following,
        isFollowRequest:followRequest,
        isBlocked:blocked
    })
   


    const controlFollow = async()=>{
        switchOptimisticFollow("follow")
        try {
            await follow(userId)
            setFollowStatus(prev=>({...prev,isFollow:prev.isFollow && false,isFollowRequest:!prev.isFollow && !prev.isFollowRequest?true:false}))
        } catch (error) {
            console.log(error)
        }
    }

const [optimosticFollow,switchOptimisticFollow]=
 useOptimistic(followStatus,(prev,value:"follow"|"block")=>value==="follow"? {...prev,isFollow:prev.isFollow && false, isFollowRequest:!prev.isFollow &&!prev.isFollowRequest?true:false}:{
    ...prev,isBlocked:!prev.isBlocked
 })


 
const controlBlock = async()=>{
    switchOptimisticFollow("block")
    try {
        await switchBlock(userId)
        setFollowStatus(prev=>({...prev,isBlocked:!prev.isBlocked}))
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div className='w-full '>
        <form action={controlFollow} >
         <button className='bg-blue-500 text-white font-medium capitalize px-2 py-1 rounded-md w-full mb-3'>
            {optimosticFollow.isFollow?"following": optimosticFollow.isFollowRequest?"friend request sent": "follow"}
         </button>
        </form>

        <form action={controlBlock}  className="text-red-500 capitalize flex justify-end">
        <button>
        <span className="text-red-500 capitalize flex justify-end">
            {optimosticFollow.isBlocked?"unblocked":"block"}
        </span>
        </button>
        </form>
    </div>
  )
}

export default UserInfoCardInteraction