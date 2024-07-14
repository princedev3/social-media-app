"use client"
import { addStoryList } from '@/libs/actions'
import { useAuth } from '@clerk/nextjs'
import { Story, User } from '@prisma/client'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { useEffect, useOptimistic, useState } from 'react'


type storyType = Story & {user:User}

const StoryList = ({storylist}:{storylist: storyType[]}) => {

    const [userStory,setUserStory]=useState(storylist)

    const[optimisticStory,switchOptimisticStory]=useOptimistic(userStory,(prevStory,value:storyType)=>([value,...prevStory]))

    const[img,setImg]=useState<any>("")
const{userId}= useAuth()

    useEffect(()=>{
   const storyFunc = async ()=>{
    switchOptimisticStory({
        id:Math.random(),
        createdAt:new Date(Date.now()), 
          expiresAt:new Date(Date.now()),
        img:"",
           userId:userId!,
           user:{
            id: userId!,
            username: "adding",
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
    if(img===""){
        return
    }
    try {
      const stories=   await  addStoryList(img?.secure_url)
      setUserStory((prev)=>[stories!,...prev])
        
    } catch (error) {
        console.log(error)
    }
   }
   storyFunc()
    },[img])

    
   

    const [openImage, setOpenImage] = useState(false);

    useEffect(() => {
      const intervals = setInterval(() => setOpenImage(false), 4000);
  
      return () => clearInterval(intervals);
    }, [openImage]);
  
    const[imageIdx,setImageIdx]=useState(0)
    const handleClick = (id:number)=>{
      setImageIdx(id)
  }
   
  
  return (
    <>
        <CldUploadWidget  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}  options={{sources:["local","unsplash" ,"camera","dropbox"],multiple:true}} onSuccess={(result,{widget})=>{setImg(result.info),widget.close()}}>
{({ open }) => {
return (
   <div className="flex flex-col items-center gap-2 cursor-pointer w-full  h-full   "  >
   <Image src={ "/noAvatar.png"} alt='' width={40} height={40} className='object-cover w-16 h-16 rounded-full border-2 border-blue-500' onClick={() => open()}/>
   <div>
   <button className="font-medium text-white bg-blue-600 capitalize text-sm px-2 py-1 rounded-md">send </button>   
   </div>
</div>
);
}}
</CldUploadWidget>
{
    optimisticStory?.length>0 && optimisticStory.map((item,idx)=>(
        <div className="flex flex-col items-center gap-2 cursor-pointer  h-full  w-full" key={item?.id}   onClick={()=>{setOpenImage(!openImage),handleClick(idx)}}  >
       <div className="relative object-cover w-16 h-16 rounded-full border-2 border-blue-500">  
        <Image src={item?.img} alt='' fill className=' object-cover rounded-full' />
       </div>
       
       
        {openImage && (
        <div className="absolute z-50 left-0 top-20 w-full h-full bg-black/10" >
          <Image src={optimisticStory[imageIdx]?.img} fill className="object-contain" alt="" />
           
          <div className="w-full bg-gray-200 rounded-full h-[3px] overflow-hidden absolute z-[9999] ">
            <div className="bg-blue-500 h-full w-full rounded-full progress-bar animate-progress"></div>
          </div>
          <span className="font-medium  text-blue-600 capitalize text-sm ">{optimisticStory[imageIdx]?.user?.username} </span> 
        </div>
      )}
  
     </div>
    ))
}

    </>
  )
}


export default StoryList