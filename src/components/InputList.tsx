"use client"
import { fetchUsers } from '@/libs/actions'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const InputList = () => {

    const[outputList,setOutputList]=useState<any>([])
    const[open,setIsOpen]=useState(false)
   
    const handleSubmit = async(formData:FormData)=>{

const username = formData.get("username") as string

if(username ===""){
  return
}
      try {
        const res = await fetchUsers(username)
        setOutputList(res)
        setIsOpen(true)
      } catch (error) {
        console.log(error)
      }
    }


    const modalRef = useRef<any>();
    const textRef = useRef<any>()

    useEffect(() => {
      const handleClickOutside = (event:any) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false)
        textRef.current.value = ""
        }
      };
  
      if (open) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [open]);
    
   
  return (
    <div className="w-full relative">
     <form action={(FormData)=>handleSubmit(FormData)} >
<button className='w-full'>
        <input type='text' ref={textRef} name='username' className='outline-none border border-blue-200 placeholder:text-blue-300 rounded placeholder:capitalize p-[5px] w-full' placeholder='search for friends'/>
</button>
</form>



{
  (open &&  outputList?.length >0)  && 
<div className="absolute z-50 bg-slate-50 p-2 w-full rounded-md border-white" ref={modalRef}>
  <>
  {

  outputList?.map((item:any)=>(<div className='w-full  z-50 '>

     <Link key={item?.id} href={"/profile/"+item.username} className="text-xl font-medium hover:bg-white/80 flex  p-2 capitalize text-gray-600">{(item.name + " " + item.surname)?(item.name + " " + item.surname):(item.username)} </Link>
  </div>))
  }
  </>
</div>
}

    </div>
  )
}

export default InputList