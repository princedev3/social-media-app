import React from 'react'
import Posts from './Posts'
import prisma from '@/libs/prismadb'
import { auth } from '@clerk/nextjs/server'

const Feeds =async ({username}:{username:string}) => {
  let post:any[] = []
if(username){
  post = await prisma.post.findMany({
    where:{
      user:{
        username:username
      }
    },
    include:{
      user:true,
      like :{
        select:{
          userId:true
        }
      },
      _count:{
        select:{
          comment:true
        }
      }
    },
    orderBy:{
      createdAt:"desc"
    }
  })
}
const {userId} = auth()
if (!userId){
  return
}

if(userId){
  const users = await prisma.follower.findMany({
    where:{
      userOneId:userId
    },
    select:{
      userTwoId:true
    }
  })

  const followingsIds = users.map(item=>item.userTwoId)
 post = await prisma.post.findMany({
  where:{
    userId:{
      in:[...followingsIds,userId]
    }
  },
  include:{
    user:true,
    like:{
      select:{
        userId:true
      }
    },
    _count:{
      select:{
        comment:true
      }
    }
  },
  orderBy:{
    createdAt:"desc"
  }
 })
}



  return (
    <div className='flex flex-col gap-3'>
      {post.length > 0 && post.map(item=>(
        <Posts item={item} />
      ))}
    </div>
  )
}

export default Feeds