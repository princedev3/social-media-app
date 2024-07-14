"use client"
import { acceptFollowRequest, declineFollowRequest } from '@/libs/actions'
import { FollowRequest, User } from '@prisma/client'
import Image from 'next/image'
import React, { useOptimistic, useState } from 'react'


type requestType= FollowRequest & {sender:User} &{reciever:User}

const FriendRequestList = ({ friendRequestList}:{friendRequestList:requestType[]}) => {



    const[requestState,setRequestState]=useState(friendRequestList)


    const acceptRequest =async (senderId:string,requestId:number)=>{
        switchOtimisticRequest(requestId)
        try {
            
            await acceptFollowRequest(senderId)
            setRequestState(prev=>prev.filter(item=>item.id !==requestId))
        } catch (error) {
            console.log(error)
        }
      } 
    
     
    const declineRequest =async (senderId:string,requestId:number)=>{
        switchOtimisticRequest(requestId)
        try {
            
            await declineFollowRequest(senderId)
            setRequestState(prev=>prev.filter(item=>item.id !==requestId))
        } catch (error) {
            console.log(error)
        }
      } 
    
     
      const[optimisticRequest ,switchOtimisticRequest]= useOptimistic(requestState,(initial,number)=>initial.filter(item=>item.id !==number))
      
  return (

    <div className="flex flex-col gap-3">
{
  optimisticRequest.map(item=>(

    <div className="flex items-center justify-between mt-5  ">
              <div className="flex gap-2 items-center"> 
                  <Image src={item.sender.avatar || "/noAvatar.png"} alt='' width={40} height={40} className='w-8 h-8  rounded-full object-cover'/>
                   <span className='text-sm text-gray-600 capitalize'>{item.sender.username} </span>
              </div>
              <div className="flex gap-3 items-center justify-end">
                <form action={()=>acceptRequest(item.senderId,item.id) } >
                  <button>
              <Image src={"/accept.png"} alt='' width={20} height={20} className='w-5 h-5  rounded-full object-cover'/>
                  </button>
                </form>

                <form action={()=>declineRequest(item.senderId,item.id)} >
                  <button>
              <Image src={"/reject.png"} alt='' width={20} height={20} className='w-5 h-5  rounded-full object-cover'/>
                  </button>
                </form>

              </div>
         </div>
    ))
}
    </div>
  )
}

export default FriendRequestList