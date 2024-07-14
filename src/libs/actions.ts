
"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "./prismadb"
import { z } from "zod"
import { revalidatePath } from "next/cache"



export const follow = async (userId:string)=>{
    const{userId:currentUserId}= auth()
    if(!currentUserId)return 
try {
    const existingFollow = await prisma.follower.findFirst({
        where:{
            userOneId:userId,
            userTwoId:currentUserId
        }
    })

    if(existingFollow){
        await prisma.follower.delete({
            where:{
                id:existingFollow.id
            }
        })
    }else{
        const isFollowRequestSent = await prisma.followRequest.findFirst({
             where:{
                senderId:currentUserId,
                recieverId:userId
             }
        })

        if(isFollowRequestSent){
            await prisma.followRequest.delete({
                where:{
                    id:isFollowRequestSent.id
                }
            })
        }else{
            await prisma.followRequest.create({
                data:{
                    senderId:currentUserId,
                recieverId:userId
                }
            })
        }
    }
} catch (error) {
    console.log(error)
    throw new Error("can not follow user")
}
}





export const switchBlock = async(userId:string)=>{
    const{userId:currentUserId}= auth()
    if(!currentUserId)return 
    try {
        const existingBlock = await prisma.block.findFirst({
            where:{
                userOneIdBlockerId:currentUserId,
                userTwoIdBlockedId:userId
            }
        })
        
        if(existingBlock){
            await prisma.block.delete({
                where:{
                    id:existingBlock.id
                }
            })
        }else{
            await prisma.block.create({
                data:{
                    userOneIdBlockerId:currentUserId,
                    userTwoIdBlockedId:userId
                }
            })
        }
    } catch (error) {
        console.log(error)
        throw new Error("can not block user")
    }
}


export const updateUser = async (formdata:FormData,cover:string)=>{

    try {
       
        const forms = Object.fromEntries(formdata)
       const filtered = Object.fromEntries(Object.entries(forms).filter(([_,value])=> value !==""))
      

         const isVerified = z.object({
            cover:z.string().optional(),
            name:z.string().max(40).optional(),
            surname:z.string().max(40).optional(),
            description:z.string().max(400).optional(),
            work:z.string().max(40).optional(),
            city:z.string().max(40).optional(),
            school:z.string().max(40).optional(),
            website:z.string().max(40).optional(),
         })

         const verifield = isVerified.safeParse({...filtered,cover})

         if(!verifield.success){
            console.log(verifield.error.flatten().fieldErrors)
            return
         }
         const{userId:currentUserId}= auth()
         if(!currentUserId)return 
         

          const userupdated=   await prisma.user.update({
                where:{
                    id:currentUserId
                },
                data:verifield.data
            })
     revalidatePath("/profile/"+userupdated?.username)
     
    } catch (error) {
        
    }
}


export const acceptFollowRequest = async ( senderId:string) =>{

    const{userId:currentUserId}= auth()
    if(!currentUserId)return 


   
    try {
        const existingFollowerRequest = await prisma.followRequest.findFirst({
            where:{
                senderId,
                recieverId:currentUserId
            }
        })

        if(existingFollowerRequest){
            await prisma.followRequest.delete({
                where:{
                    id:existingFollowerRequest.id
                }
            })

            await prisma.follower.create({
                data:{
                    userOneId:currentUserId ,
                    userTwoId: senderId
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}



export const declineFollowRequest = async ( senderId:string) =>{

    const{userId:currentUserId}= auth()
    if(!currentUserId)return 


   
    try {
        const existingFollowerRequest = await prisma.followRequest.findFirst({
            where:{
                senderId,
                recieverId:currentUserId
            }
        })

        if(existingFollowerRequest){
            await prisma.followRequest.delete({
                where:{
                    id:existingFollowerRequest.id
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export const addMedia = async(url:string)=>{
 
    const{userId}= auth()
 
    if(!userId) {
    return null
}
if(url ===""){
    return
}

    try {
        const medias = await prisma.multimedia.create({
            data:{
            userId:userId!,url:url 
            },
            include:{
                user:true
            }
        })
     
  
          return medias
    } catch (error) {
        console.log(error)
    }
}

export const deleteMedia = async (id:number)=>{
    try {
        const existingMedia = await prisma.multimedia.findFirst({
            where:{
                id
            }
        })
        if(existingMedia){
            await prisma.multimedia.delete({
                where:{
                    id:existingMedia.id
                }
            })
        }
       
      
    } catch (error) {
        console.log(error)
    }
}


export const addPost = async (img:string,desc:string)=>{
    const{userId}= auth()
 
    if(!userId) {
    return null
}

    try {
        await prisma.post.create({
            data:{
                img,userId,desc
            }
        })

        revalidatePath("/")
    } catch (error) {
        console.log(error)
    }
}

export const likePost = async(postId:number)=>{
    try {
        const {userId} = auth()
        if(!userId){
            return
        }

        const existingLike = await prisma.like.findFirst({
            where:{
                userId,postId
            }
        })
if(existingLike){
    await prisma.like.delete({
        where:{
            id:existingLike.id
        }
    })
}else{
    await prisma.like.create({
        data:{
            postId,userId
        }
    })
}
        
    } catch (error) {
        console.log(error)
    }
}

export const commentAction = async (postId:number,desc:string)=>{
    const{userId}= auth()
 
    if(!userId) {
    return null
}
    try {
        const comments = await prisma.comment.create({
            data:{
                userId,postId,desc
            }
        })
revalidatePath("/")
        return comments
    } catch (error) {
        console.log(error)
    }
}


export const addStoryList = async (img:string)=>{
    const{userId}= auth()
 
    if(!userId) {
    return null
}
    try {
        const storys = await prisma.story.create({
            data: {img,userId,expiresAt:new Date(Date.now()+24*60*60*1000) }

          
        })
        revalidatePath("/")
        return storys 
    } catch (error) {
        console.log(error)
    }
}


export const fetchUsers = async (username:string)=>{
    const{userId}= auth()
  username =username.toLowerCase()
    if(!userId) {
    return null
}
    try {
        const users = await prisma.user.findMany({
            where:{
              
                    id: {
                      not: userId,
                    },
            },
            take:20
        })
        
       return   users.filter((item:any)=>item?.name?.toLowerCase().includes(username) || item?.surname?.toLowerCase().includes(username) )
    
    } catch (error) {
        console.log(error)
    }
}



export const suggestAdd = async (id:string)=>{
    const{userId}= auth()

      if(!userId) {
      return null
  }
    try {

        const existingFollowerRequest = await prisma.followRequest.findFirst({
            where:{
                senderId:userId,
                recieverId:id
            }
        })

        if(existingFollowerRequest){
            await prisma.followRequest.delete({
                where:{
                    id:existingFollowerRequest.id
                }
            })
      return
            
        }else{

            const res = await prisma.followRequest.create({
               data:{
                   senderId:userId,
                   recieverId:id
               }
            })
            revalidatePath("/")
           
        }
    } catch (error) {
        console.log(error)
    }
}



export const deletePost = async (id:number)=>{
    const{userId}= auth()

    if(!userId) {
    return null
}
    try {
       await prisma.post.delete({
        where:{
            id
        }
       })
       revalidatePath("/")
    } catch (error) {
        console.log(error)
    }
}


