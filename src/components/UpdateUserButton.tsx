import React from 'react'

const UpdateUserButton = () => {

    const updateUser = async ()=>{

    }
  return (
    <form action={updateUser} className='w-full' >
    <button className='bg-blue-500 text-white font-medium capitalize p-3 text-xl rounded-md w-full'>update</button>
       </form>
  )
}

export default UpdateUserButton