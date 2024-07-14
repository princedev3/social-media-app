'use client';
import { commentAction } from '@/libs/actions';
import {  useUser } from '@clerk/nextjs'
import { Comment, User } from '@prisma/client'
import Image from 'next/image'
import React, { useOptimistic, useRef, useState } from 'react'
 
type commentType= Comment & { user:User}

const CommentList = ({postComments,postId}:{postComments:commentType[],postId:number}) => {

const[commentItems,setCommentItems]=useState(postComments)    
const[desc,setDesc]=useState<any>("")

const[optimistComment,addOptimisticComment]=useOptimistic(commentItems,(prev,value:commentType)=>([...prev,value]))

const {user} = useUser()

const inputRef = useRef<any>(null);
const addComment = async()=>{

    addOptimisticComment({
            id: Math.random(),
            createdAt:new Date(Date.now()) ,
            updatedAt: new Date(Date.now()),
            desc: "new post loading",
            postId: postId,
            userId: user?.id!,
            user:{
                id: user?.id!,
                username: user?.username!,
                name: "",
                surname: "",
                work: "",
                city: "",
                school: "",
                website: "",
                cover: "",
                avatar: "",
                description: "",
                createdAt: new Date(Date.now()),
            }
        })
        
    try {
      const newComment =  await commentAction(postId,desc)
       setCommentItems(prev=>[newComment!,...prev])
       inputRef.current.value = ""
       setDesc("")
    } catch (error) {
        console.log(error)
    }
}
    
   
  return (  
    <>
      <div className="">
        <form action={addComment} className="flex items-center gap-2">
            <Image src={user?.imageUrl|| "/noAvatar.png"} alt='' width={40} height={40} className='w-6 h-6 rounded-full object-cover'/>
            <input ref={inputRef} type="text" onChange={(e)=>setDesc(e.target.value)} placeholder='write about this post' className='p-2 outline-none border rounded-md flex-1'  />
        </form>
        </div>


        <div className="flex justify-end  ">
        <div className="flex flex-col gap-4 jus w-[90%] ">

    
           
   
    {
       optimistComment?.length>0 && optimistComment.map(item=>(

           <div className="flex flex-col gap-3">
            <div className="flex gap-4">
            <Image src={item?.user?.avatar|| "/noAvatar.png"} alt='' width={40} height={40} className='w-7 h-7 object-cover rounded-full'/>
               <div className="flex flex-col gap-3">
             <span className="text-sm text-gray-500">{item?.desc}
             </span>

             <div className='flex justify-between items-center'>
         <div className="flex gap-8 items-center">
           <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <form action={""} className="">
                <button>
           <Image src={  "/like.png"} alt='' width={16 } height={16} className='object-cover cursor-pointer rounded-md'/>
                </button>
            </form>
              <span className='text-gray-400'>|</span>
              <div className='text-gray-400'>0 <span className="hidden md:inline">likes</span></div>
           </div>
           <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
           <Image src={"/comment.png"} alt='' width={16 } height={16} className='object-cover cursor-pointer rounded-md'/>
              <span className='text-gray-400'>|</span>
              <div className='text-gray-400'>0<span className="hidden md:inline">comment</span></div>
           </div>
            </div>
          
            <div className="">
            <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
           <Image src={"/share.png"} alt='' width={16 } height={16} className='object-cover cursor-pointer rounded-md'/>
              <span className='text-gray-400'>|</span>
              <div className='text-gray-400'> <span className="hidden md:inline">shares</span></div>
           </div>
            </div>
            </div>
               </div>
            </div>
           </div>
        ))



}
        </div>
        </div>
    </>
  )
}

export default CommentList