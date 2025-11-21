"use server";
import {auth} from "@clerk/nextjs/server";
import {db} from "../lib/prisma";
import { err } from "inngest/types";
import { log } from "console";
import { unstable_noStore } from "next/cache";
import {genrateIndustryInsights} from "./dashboard";
export async function updateUser(data){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where:{
            clerkUserId:userId,
        },
    })
    if(!user) throw new Error("User not found"); 
    try {
        console.log("reached here")
        let industryInsigts = await db.IndustryInsight.findUnique({
            where:{
                industry:data.industry,
            }
        })
         // if industry doesnt exist
         let insights;
         if(!industryInsigts || industryInsigts.nextUpdate <= Date.now()){
            // console.log("123456")
            // console.log("Reached HERE inside ")
            insights  = await genrateIndustryInsights(data.industry); 
            
        }
        const result = await db.$transaction(
            async (tx)=>{

                if(!industryInsigts){
                    industryInsigts = await tx.IndustryInsight.create({
                        data: {
                        industry:data.industry ,
                        ...insights,
                        nextUpdate: new Date(Date.now()+7*24*60*60*1000),//1 week 
                            },  
                     })
                }
                // update the user 
                const updateUser = await tx.user.update({
                    where:{
                        Id:user.Id
                    },
                    data:{
                        industry:data.industry, 
                        experience:data.experience, 
                        bio:data.bio,
                        skills:data.skills,
                    },
                }) 
                
                return {updateUser,industryInsigts};
            },
            {
                timeout:10000,
            }
        )
        return {success:true,...result};
    } catch (error) {
        console.error("Error updating user and industry:",error.message);
        throw new Error("Failed to update profile "  + error.message);
    }
}

export async function getUserOnBoardingStatus(){
    unstable_noStore();
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");
    try {
        const user = await db.user.findUnique({
            where:{
                clerkUserId:userId,
            }
        });
        return {
            isOnboarded: !!user?.industry,
        };
    } catch (error) {
        console.error("Error checking onboarding status:",error.message); 
        throw new Error("Failed to check onboarding status");
    }
}