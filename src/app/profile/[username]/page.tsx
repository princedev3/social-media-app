import Feeds from '@/components/Feeds'
import LeftSide from '@/components/LeftSide'
import ProfileElement from '@/components/ProfileElement'
import ProfileRightBar from '@/components/ProfileRightBar'
import prisma from '@/libs/prismadb'
import React from 'react'

const Profile =async ({params}:{params:{username:string}}) => {
  const {username}= params
  const user =  await prisma.user.findFirst({
    where:{
      username
    },
    include:{
      _count:{
          select:{
            post:true,
            follower:true,
            following:true
          }
      }
    }
  })

  return (
    <div className="px-3 md:px-8 py-4 flex  mt-20 ">
    <div className="hidden md:flex md:w-[30%] lg:w-[20%] overflow-y-scroll  max-h-[calc(100vh-110px)]  noScroll-Bar pr-3 ">
      <LeftSide sectionType="profile" userProfileId={user?.id} />
    </div>
   

    <div className="w-full md:w-[70%] lg:w-[60%]  px-4   flex flex-col gap-5 overflow-y-scroll  max-h-[calc(100vh-110px)]  noScroll-Bar ">
      
    <ProfileElement user={user!} />
     < Feeds username={username} />
    </div>
    <div className="hidden lg:flex lg:w-[20%]">
      < ProfileRightBar user={user!} />
    </div>
   
 </div>
  )
}

export default Profile