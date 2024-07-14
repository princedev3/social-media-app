"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import UpdateUserButton from './UpdateUserButton'
import { User } from '@prisma/client'
import { updateUser } from '@/libs/actions'
import { CldUploadWidget } from 'next-cloudinary';

const UpdateInfo = ({user}:{user:User}) => {
    const[open,setOpen]=useState(false)

    const [img,setImg]=useState<any>("")
  
  return (
    <div className='hidden md:flex'>
         <span className="text-sm text-blue-500 cursor-pointer" onClick={()=>setOpen(!open)}>update</span>
         {
            open && <form action={formdata=>{updateUser(formdata,img?.secure_url||""),setOpen(false)}} className='absolute left-0 top-0 w-full min-h-full bg-black/10 flex items-center justify-center z-50 '>
               <div className='w-full md:w-[70%]   bg-white p-8 flex flex-col gap-7'>

                <span className="text-3xl font-semibold text-black p-2 bg-slate-200 rounded-sm w-fit self-end cursor-pointer  " onClick={()=>setOpen(false )} >X</span>
                <h2 className="text-xl capitalize font-semibold">Update Profile</h2>
<p className="text-gray-500 text-xl">use the navbar profile button to change the avater or username</p>

                  <div className="my-4">
                    <h2 className="text-gray-500 text-lg capitalize mb-3">Change cover image</h2>

                    <CldUploadWidget   uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}  options={{sources:["local","unsplash" ,"camera","dropbox"],multiple:true}} onSuccess={result=>setImg(result.info)}>
                 {({ open }) => {
            return (
                    <div className="flex items-center gap-2" onClick={() => open()}>
                    <Image src={img?.secure_url||"/noAvatar.png"} width={40} height={40} alt='' className='w-16 h-16 rounded-full object-cover border'/>
                      <label htmlFor="" className='text-lg capitalize'>choose</label>
                    </div>
                      ) } }
           </CldUploadWidget>
                  </div>
                  <div className="flex flex-wrap justify-between gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full md:w-[45%] ">
                        <span className="text-lg text-gray-600 capitalize">name</span>
                        <input type="text" placeholder={user.name ||"name"} name='name' className='border outline-none rounded-md w-full p-3 placeholder:text-black  placeholder:text-lg text-lg placeholder:capitalize' />
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-[45%] ">
                        <span className="text-lg text-gray-600 capitalize">description</span>
                        <input type="text" placeholder={user.description ||"description"} name='description' className='border outline-none rounded-md w-full p-3 placeholder:text-black  placeholder:text-lg text-lg placeholder:capitalize' />
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-[45%] ">
                        <span className="text-lg text-gray-600 capitalize">surname</span>
                        <input type="text" placeholder={user.surname ||"surname"} name='surname' className='border outline-none rounded-md w-full p-3 placeholder:text-black placeholder:text-lg text-lg placeholder:capitalize ' />
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-[45%] ">
                        <span className="text-lg text-gray-600 capitalize">school</span>
                        <input type="text" placeholder={user.school ||"school"} name='school' className='border outline-none rounded-md w-full p-3 placeholder:text-black  placeholder:text-lg text-lg placeholder:capitalize' />
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-[45%] ">
                        <span className="text-lg text-gray-600 capitalize">city</span>
                        <input type="text" placeholder={user.city ||"city"} name='city' className='border outline-none rounded-md w-full p-3 placeholder:text-black  placeholder:text-lg text-lg placeholder:capitalize' />
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-[45%] ">
                        <span className="text-lg text-gray-600 capitalize">website</span>
                        <input type="text" placeholder={user.website ||"website"} name='website' className='border outline-none rounded-md w-full p-3 placeholder:text-black  placeholder:text-lg text-lg placeholder:capitalize' />
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-[45%] ">
                        <span className="text-lg text-gray-600 capitalize">work</span>
                        <input type="text" placeholder={user.work ||"work"} name='work' className='border outline-none rounded-md w-full p-3 placeholder:text-black placeholder:text-lg text-lg placeholder:capitalize ' />
                    </div>
                  </div>
                
    <button className='bg-blue-500 text-white font-medium capitalize p-3 text-xl rounded-md w-full'>update</button>
      
               </div>
            </form> 
         }
    </div>
  )
}

export default UpdateInfo