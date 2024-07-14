import prisma from '@/libs/prismadb'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import AddMultimdeia from './AddMultimdeia'
import { User } from '@prisma/client'


const UserMediaCard = async ({user}:{user:User}) => {
    const {userId } = auth()
    if(!userId) return null
    
    const multimedias = await prisma.multimedia.findMany({
        where:{
            userId:user?.id
        }
    })
 


  return (
    <div className='bg-white rounded-md p-3'>
        
          <AddMultimdeia multimedias={multimedias}  user={user} />
        
      
    </div>
  )
}

export default UserMediaCard