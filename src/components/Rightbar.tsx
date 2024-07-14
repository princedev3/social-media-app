import React from 'react'
import FriendRequest from './FriendRequest'
import SuggestedList from './SuggestedList'
import { auth } from '@clerk/nextjs/server'

const Rightbar = () => {
 
  return (
    <div className='mx-auto flex flex-col items-center  gap-3 p-1' >
      < FriendRequest/>
      <SuggestedList/>
    </div>
  )
}

export default Rightbar