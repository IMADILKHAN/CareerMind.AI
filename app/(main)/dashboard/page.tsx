import { getUserOnBoardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function Dashboard(){
    const {isOnboarded} =  await getUserOnBoardingStatus(); 
    if(!isOnboarded){
        redirect("/onboarding");
    }
}