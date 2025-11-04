import { industries } from "@/data/industries"; 
type OnBoardingFormProps = {
    industries: typeof industries; // infers Industry[]
  };

export default function OnBoardingForm({industries}:OnBoardingFormProps){
    return(<></>)
}