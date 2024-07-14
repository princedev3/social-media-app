import prisma from '@/libs/prismadb'


import CommentList from './CommentList'

const Comment = async ({postId}:{postId:number}) => {

 const postComments = await prisma.comment.findMany({
 where:{
  postId
 },
 include:{
  user:true
 }
 })


  return (
    <div className='mt-4 flex flex-col gap-4'>
      <CommentList postComments={postComments} postId={postId} />
    </div>
  )
}

export default Comment