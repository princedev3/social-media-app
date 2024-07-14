"use client"
import { addMedia } from '@/libs/actions'
import { useAuth } from '@clerk/nextjs'
import { Multimedia, User } from '@prisma/client'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { useEffect, useOptimistic, useState } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'
import MultiMedia from './MultiMedia'

type multimediaType =  Multimedia
const AddMultimdeia = ({multimedias,user}:{multimedias:multimediaType[],user:User}) => {

    const [url ,setUrl]= useState<any>("")

    const {userId}= useAuth()
  const[imageList,setImageList]=useState(multimedias)

    useEffect(()=>{
        const addMultiMedias = async()=>{

            if(url === ""){
                return
             }
            switchOptimisticList({
                id: Math.random(),
                url :"/noAvatar.png",
                userId: user?.id
            })
            try {
             
            const values=  await addMedia(url?.secure_url)
               setImageList(prev=>[values!,...prev])
               setUrl("")

            } catch (error) {
                console.log(error)
            }
        }
        addMultiMedias()
    },[url])

    const[optimistList,switchOptimisticList]=useOptimistic(imageList,(prevState,value:any)=>[value,...prevState])


    
 
  return (
    <>
    <div className="flex justify-between items-center mb-3">
        <span className="text-xl font-semibold text-blue-500 capitalize">gallery</span>
          
        {
            userId ===user?.id && 
         <CldUploadWidget   uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}  options={{sources:["local","unsplash" ,"camera","dropbox"],multiple:true}} onSuccess={result=>setUrl(result.info)}>
                 {({ open }) => {
            return (
              
                    <button disabled={optimistList.length ===5}  className='disabled:cursor-not-allowed'>
                    <span  className="text-3xl font-semibold text-blue-500"  onClick={() => open()}>+</span>
                    </button>
                
                      ) } }
           </CldUploadWidget>
        }
           </div>
           <div  className="flex flex-wrap gap-4 w-full items-center justify-center">
            {
                optimistList.length>0 && optimistList.map(item=>(

            <MultiMedia item={item} user={user} />
               ))
            }
           
        </div>
    </>
  )
}

export default AddMultimdeia