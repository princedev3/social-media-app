"use client"
import { suggestAdd } from '@/libs/actions'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useOptimistic, useState } from 'react'

const SuggestAdd = ({item,suggestArray}:{item:User,suggestArray:string[]}) => {

    const router = useRouter()


    const [idsList,setIdsList]=useState<string[]>(suggestArray)

    useEffect(()=>{
        setIdsList(suggestArray)
    },[suggestArray.length])


    const [suggestOptimistic,switchSuggestOptimist]= useOptimistic(idsList,(prev,value:string)=>(prev.filter(item=>item!==value)))

    const handleAdd=async(id:string)=>{
      
       switchSuggestOptimist(id)  
   await suggestAdd(id)
  setIdsList((prev:any)=>prev.filter((item:string) =>item!==id))
router.refresh()
    }
  return (
    <form action={()=>handleAdd(item.id)} className="">
        <button   className='bg-blue-500 hover:bg-blue-700 hover:border-white px-2 py-1 rounded-md text-white font-medium '>
            {suggestOptimistic.includes(item.id)? "Sent":"Add"}
          
        </button>
        
    </form>
  )
}

export default SuggestAdd