export const revalidate = 0; 
import { industries } from "@/data/industries";
import { Main } from "next/document";
import {getUserOnBoardingStatus} from "@/actions/user";
import OnBoardingForm from "./_components/OnBoardingForm";
import { redirect } from "next/navigation";

export default  async function Onboarding(){
    const {isOnboarded} =  await getUserOnBoardingStatus(); 
    if(isOnboarded){
        redirect("/dashboard");
    }
    return (
        <main>
            <OnBoardingForm industries={industries} />
        </main>
    )
}