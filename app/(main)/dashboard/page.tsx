import { getUserOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import IndustryInsights from "./_components/IndsutryInsights";
export default async function Dashboard(){
    const {isOnboarded} =  await getUserOnBoardingStatus(); 
    if(!isOnboarded){
        redirect("/onboarding");
    }
    return(
        <>
            <IndustryInsights />
        </>
    )
}