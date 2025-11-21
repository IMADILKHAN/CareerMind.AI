import {auth} from "@clerk/nextjs/server";
import {db} from "../lib/prisma";

import OpenAI from "openai";
const client = new OpenAI();






export const genrateIndustryInsights = async (industry)=>{
    const prompt = String.raw`You are a data analyst AI that returns ONLY valid JSON for industry insights in **India**.
                Make Sure you get the latest data that is of 2025 and 2026. The data should be futrue looking.
                Analyze the ${industry} industry in **India** and respond ONLY with a JSON object in this exact shape (no markdown, no notes, no extra text):

                {
                "salaryRanges": [
                    {
                    "role": "string",
                    "location": "India",
                    "salaries": {
                        "fresher": number,
                        "twoYears": number,
                        "fiveYears": number,
                        "median": number
                    },
                    "min": number,
                    "max": number,
                    "median": number
                    }
                ],
                "growthRate": number,
                "demandLevel": "HIGH" | "MEDIUM" | "LOW",
                "topSkills": ["skill1","skill2","skill3","skill4","skill5"],
                "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
                "keyTrends": ["trend1","trend2","trend3","trend4","trend5"],
                "recommendedSkills": ["skill1","skill2","skill3","skill4","skill5"]
                }

                Rules:
                - Country context is India only.
                - All salaries are annual, in INR, plain numbers (no commas/symbols).
                - For each role: provide values for fresher, twoYears, fiveYears Experience.
                - Set "median" = the statistical median of those three values.
                - Set "min" = minimum of those three; "max" = maximum; "median" must match the median above.
                - Include at least 5 roles.
                - Provide exactly 5 items for topSkills, keyTrends, recommendedSkills.
                - growthRate is a number (no % sign).
                - Return only the JSON object.`;

                const response = await client.responses.create({
                    model: "gpt-5-nano",
                    input: prompt
                });
                const dataFromAI = JSON.parse(response.output_text); 

                // console.log(dataFromAI);
                return dataFromAI


}


export async function getIndustryInsights(){
    const {userId} = await auth();
    let currDate = new Date(Date.now())
    if(!userId) throw new Error("Unauthorized");
    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        include: { industryInsight: true }, 
      });
    if(!user) throw new Error("User not Found");   
    console.log("from getIndustry Insight")
    console.log(user);
    console.log(user.industryInsight.nextUpdate <= currDate,user.industryInsight.nextUpdate ,currDate)
    if(!user.industryInsight || user.industryInsight.nextUpdate <= currDate ){
        const insights  = await genrateIndustryInsights(user.industry); 
        const industryInsigts = await db.industryInsight.upsert({
            where: {
              industry: user.industry,   // unique key
            },
            update: {
              ...insights,
              lastUpdated:new Date(Date.now()),
              nextUpdate: new Date(Date.now() + 7*24*60*60*1000), // 1 week
            },
            create: {
              industry: user.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7*24*60*60*1000),
            },
          });
         return industryInsigts 
    }
    console.log("from the other side")
    return user.industryInsight;
}