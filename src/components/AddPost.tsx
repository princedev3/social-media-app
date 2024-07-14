"use client"
import { addPost } from '@/libs/actions'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import AddButton from './AddButton'
import { useUser } from '@clerk/nextjs'

const AddPost = () => {

  const [img,setImg]=useState<any>("")
  const[desc,setDesc]=useState("")

  const postRef = useRef<any>()

  const handleAddPost = async()=>{
    if(desc===""){
      return
    }
    try {
      await addPost(img?.secure_url,desc,)
      postRef.current.value===""
      setDesc("")
      setImg("")
    } catch (error) {
      console.log(error)
    }
  }
const{user}= useUser()

  return (
    <div className='p-4 bg-white w-full rounded-md flex gap-1 justify-between'>
<Image src= {user?.imageUrl || "/noAvatar.png" }  alt='' width={100} height={100} className='w-10 h-10 object-cover rounded-full'/>

        <div className="flex-1 w-full flex flex-col gap-5">
      <form  action={handleAddPost }  className="w-full flex gap-2 items-center">
        <textarea ref={postRef} name="" value={desc} onChange={(e)=>setDesc(e.target.value)} id="" rows={5} className='outline-none border rounded-md w-full bg-slate-100 resize-none text-lg text-black' ></textarea>
       
        <AddButton/>
     
      </form>
      <div className="flex justify-between flex-wrap gap-5 ">
      <CldUploadWidget  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}  options={{sources:["local","unsplash" ,"camera","dropbox"],multiple:true}} onSuccess={(result,{widget})=>{setImg(result.info),widget.close()}}>
{({ open }) => {
return (
<div className="flex items-center gap-2 cursor-pointer "  onClick={() => open()}>
<Image src={"/addimage.png"} alt='' width={20} height={20} className='object-cover w-5 h-5 cursor-pointer self-center '/>
       Photo
</div>
);
}}
</CldUploadWidget>
                 <div className="flex items-center gap-2 cursor-pointer">
                   <Image src={"/addVideo.png"} alt='' width={20} height={20} className='object-cover w-5 h-5 rcursor-pointer self-center'/>
                   Video
                   </div>
                   <div className="flex items-center gap-2 cursor-pointer">
                   <Image src={"/addevent.png"} alt='' width={20} height={20} className='object-cover w-5 h-5 cursor-pointer self-center'/>
                   Event
                   </div>
                   <div className="flex items-center gap-2 cursor-pointer">
                   <Image src={"/poll.png"} alt='' width={20} height={20} className='object-cover w-5 h-5  cursor-pointer self-center'/>
                   Poll
                   </div>
      </div>
        </div>

    </div>
  )
}

export default AddPost