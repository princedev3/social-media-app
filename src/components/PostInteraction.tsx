"use client"
import { likePost } from '@/libs/actions'
import { useAuth, useUser } from '@clerk/nextjs'
import { Post, User } from '@prisma/client'
import Image from 'next/image'
import React, { useOptimistic, useState } from 'react'


type postType =Post & {user:User} &{ like:string[]} & {_count:{comment:number}}
const PostInteraction = ({item}:{item:postType}) => {

    const {userId} =useAuth()
    
    const [likeState,setLikeState]=useState({
        likeCount:item.like.length,
        isLike:userId?item.like.includes(userId):false
    })
    const[optimisticLike,switchOptimisticLike]=useOptimistic(likeState,(prevState,value)=>({likeCount:prevState.isLike?prevState.likeCount-1:prevState.likeCount+1,isLike:!prevState.isLike}))

    const handleLike = async ()=>{
        try {
            switchOptimisticLike("")
             await likePost(item.id)
             setLikeState(prev=>({
                likeCount:prev.isLike?prev.likeCount-1:prev.likeCount+1,
                isLike:!prev.isLike
             }))
        } catch (error) {
            
        }
    }
  return (
    <div className='flex justify-between items-center'>
    <div className="flex gap-8 items-center">
               <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
                <form action={handleLike} className="">
                    <button>
               <Image src={ optimisticLike?.isLike?"/liked.png" :"/like.png"} alt='' width={16 } height={16} className='object-cover cursor-pointer rounded-md'/>
                    </button>
                </form>
                  <span className='text-gray-400'>|</span>
                  <span className='text-gray-400'>{optimisticLike?.likeCount } <span className="hidden md:inline">likes</span></span>
               </div>
               <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
               <Image src={"/comment.png"} alt='' width={16 } height={16} className='object-cover cursor-pointer rounded-md'/>
                  <span className='text-gray-400'>|</span>
                  <span className='text-gray-400'>{item._count.comment} <span className="hidden md:inline">comment</span></span>
               </div>
                </div>
              
                <div className="">
                <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
               <Image src={"/share.png"} alt='' width={16 } height={16} className='object-cover cursor-pointer rounded-md'/>
                  <span className='text-gray-400'>|</span>
                  <span className='text-gray-400'> <span className="hidden md:inline">shares</span></span>
               </div>
                </div>
            </div>
  )
}

export default PostInteraction