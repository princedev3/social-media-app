import React from 'react'
import UserInfoCard from './UserInfoCard'
import UserMediaCard from './UserMediaCard'
import { User } from '@prisma/client'

type userType = User & {_count:{ post:number,  follower:number,following:number}}
const ProfileRightBar = ({user}:{user:userType}) => { 
  return (
    <div className='flex flex-col gap-4'>
        <UserInfoCard user={user}/>
        <UserMediaCard user={user}/>
    </div>
  )
}

export default ProfileRightBar