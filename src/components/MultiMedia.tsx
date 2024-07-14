"use client"
import { deleteMedia } from '@/libs/actions';
import { useAuth } from '@clerk/nextjs';
import { Multimedia, User } from '@prisma/client';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";

const MultiMedia = ({item,user}:{item: Multimedia,user:User}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  const router = useRouter()
   const{userId} = useAuth()
  return (
    <>
        <div className="w-[40%] h-[15vh] relative" key={item.id}  onMouseEnter={handleMouseEnter }
            onMouseLeave={handleMouseLeave}>
                <Image alt='' src={item?.url} fill className='object-cover rounded-md '/>
                {
                  userId===user?.id &&   isHovered && <div className="absolute z-50">
                        <form action={()=>{deleteMedia(item.id),router.refresh() }}  >
                            <button className='bg-white rounded-full p-1 cursor-pointer'>
                        < MdOutlineDeleteOutline className='fill-red-600 text-xl'/>

                            </button>
                        </form>
                    </div>
                }
            </div>
    </>
  )
}  

export default MultiMedia