"use client"
import { deletePost } from '@/libs/actions'
import { Post, User } from '@prisma/client'
import Image from 'next/image'
import React, { useState } from 'react'

type postType =Post & {user:User} &{ like:string[]} & {_count:{comment:number}}

const DeletePost = ({item}:{item:postType}) => {

    const[open,setOpen]=useState(false)

    const deletepost = async ()=>{
        try {
           await  deletePost(item.id)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="">

        <Image src={"/more.png"} alt='' width={40} height={40} className='object-cover w-7 h-7 rounded-md cursor-pointer' onClick={()=>setOpen(!open)}/>
        {
            open && 
            <form action={deletepost} className="">
                <button className='absolute right-0 top-9 min-w-fit min-h-8 bg-slate-600 p-2 rounded-md z-50 text-white'>DeletePost</button>
            </form>
        }
    </div>
  )
}

export default DeletePost