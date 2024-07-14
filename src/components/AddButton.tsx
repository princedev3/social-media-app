"use client"
import React from 'react'
import { useFormStatus } from 'react-dom'

const AddButton = () => {
    const {pending} = useFormStatus()
  return (
    <button disabled={pending} className={`${pending ?"bg-blue-300 cursor-pointer":"bg-blue-500"}  text-white font-medium capitalize px-2 py-1 rounded-md relative`} >
        {pending? <div className='inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-blue-600 border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white ' />:"send"}
    </button>
  )
}

export default AddButton