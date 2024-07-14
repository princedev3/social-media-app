import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProfileCard from './ProfileCard'
import prisma from '@/libs/prismadb'
import { auth } from '@clerk/nextjs/server'



const LeftSide =async ({sectionType,userProfileId}:{sectionType:string,userProfileId:string|undefined}) => {
  const {userId} = auth()
  if(!userId)return 

  const users = await prisma.user.findFirst({
   where:{
    id:userId
   },
   select:{
    follower:true,
    following:true
   }
  })

  const followers = users?.follower.map(item=>item.userTwoId) as string[]

  const following = users?.following.map(item=>item.userOneId) as string[]

  const allIds = [...followers,...following]

  const finalIds = [...new Set(allIds)].filter(item=>item !==userId) 

const followings = await prisma.user.findMany({
  where:{
    id:{
      in:finalIds
    }
  }
})



  return (
    <div className=' top-0 flex flex-col gap-8 w-full'>
        {
            sectionType ==="home" && <ProfileCard/>
        }
        {
sectionType === "profile" && userProfileId ===userId && 
   <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
    <span className="text-blue-500 capitalize text-sm">see friends list</span>
   {
    
    followings.map(item=>(
      <Link href={"/profile/"+item.username} className="flex gap-2 items-center cursor-pointer">
          <Image src={item?.avatar || "/noAvatar.png"} alt='' width={20} height={20} className='w-8 h-8 object-cover rounded-full'/>
          <span className="text-sm capitalize text-gray-500 ">{(item?.name  && item?.surname)? item?.name +" "+item?.surname : item?.username} </span>
      </Link>
    ))
   }
   </div>
        }
<div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
        <Link href={"/"}className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'>
          <Image src={"/posts.png"} alt='' width={20} height={20}/>
          <span className="">My post</span>
        </Link>
          <hr  className='border-t-1 border-gray-50 w-36 self-center'/>
        <Link href={"/"}className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'>
          <Image src={"/activity.png"} alt='' width={20} height={20}/>
          <span className="">Activity</span>
        </Link>
          <hr  className='border-t-1 border-gray-50 w-36 self-center'/>
        <Link href={"/"}className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'>
          <Image src={"/market.png"} alt='' width={20} height={20}/>
          <span className="">market place</span>
        </Link>
          <hr  className='border-t-1 border-gray-50 w-36 self-center'/>
        <Link href={"/"}className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'>
          <Image src={"/events.png"} alt='' width={20} height={20}/>
          <span className="">event</span>
        </Link>
          <hr  className='border-t-1 border-gray-50 w-36 self-center'/>
        <Link href={"/"}className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'>
          <Image src={"/albums.png"} alt='' width={20} height={20}/>
          <span className="">album</span>
        </Link>
          <hr  className='border-t-1 border-gray-50 w-36 self-center'/>
        <Link href={"/"}className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'>
          <Image src={"/videos.png"} alt='' width={20} height={20}/>
          <span className="">videos</span>
        </Link>
          <hr  className='border-t-1 border-gray-50 w-36 self-center'/>
        <Link href={"/"}className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'>
          <Image src={"/news.png"} alt='' width={20} height={20}/>
          <span className="">news</span>
        </Link>
          <hr  className='border-t-1 border-gray-50 w-36 self-center'/>
        <Link href={"/"}className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'>
          <Image src={"/courses.png"} alt='' width={20} height={20}/>
          <span className="">courses</span>
        </Link>
          <hr  className='border-t-1 border-gray-50 w-36 self-center'/>
        <Link href={"/"}className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'>
          <Image src={"/lists.png"} alt='' width={20} height={20}/>
          <span className="">list</span>
        </Link>
          <hr  className='border-t-1 border-gray-50 w-36 self-center'/>
        <Link href={"/"}className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'>
          <Image src={"/settings.png"} alt='' width={20} height={20}/>
          <span className="">settings</span>
        </Link>
      </div>
    </div>
  )
}

export default LeftSide