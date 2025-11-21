
import { getIndustryInsights } from "@/actions/dashboard"
import { getUserOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import Dashboard from "../page";
import DashboardView from "./dashboard-view";

export default async function IndustryInsights(){
    const insights = await getIndustryInsights(); 
    const {isOnboarded} = await getUserOnBoardingStatus();
    if(!isOnboarded){
        redirect("/onboarding")
    } 
    return (
            <div className="container mx-auto">
                <DashboardView insights={insights}/>
            </div>
    )
}