
import Image from 'next/image'
import React, { Suspense } from 'react'
import Comment from './Comment'
import { Post, User } from '@prisma/client'
import PostInteraction from './PostInteraction'
import DeletePost from './DeletePost'
import { auth } from '@clerk/nextjs/server'

type postType =Post & {user:User} &{ like:string[]} & {_count:{comment:number}}

const Posts = ({item}:{item:postType}) => {

const {userId}= auth()
  return (
    <div className='bg-white rounded-md p-4' key={item.id}>
<div className="flex  flex-col gap-4">

  <div className="flex items-center justify-between relative">
<div className="flex gap-2 items-center">
<Image src={item?.user?.avatar || "/noAvatar.png"} alt='' width={40} height={40} className='object-cover w-10 h-10 rounded-full'/>
<span className="font-medium capitalize"> {(item.user?.name  && item.user?.surname)? item.user?.name +" "+item.user?.surname : item.user?.username} </span>
</div>
{
  item.userId ===userId &&
 <DeletePost item={item} />
}
  </div>



<div className="flex flex-col gap-4">
   {
    item?.img &&
    <div className="w-full min-h-96 relative"> 
   <Image src={item?.img!} alt='' fill className='object-cover rounded-md'/> 
    </div>
   } 
    <p className="">
     {item?.desc}
    </p>
</div>
<PostInteraction item={item} />  
        <Comment postId={item.id} />
</div>
   
    </div>
  )
}

export default Posts