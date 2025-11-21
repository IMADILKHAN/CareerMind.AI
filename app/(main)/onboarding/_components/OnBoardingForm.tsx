"use client";
import { industries } from "@/data/industries"; 
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {onboardingSchema} from "../../../lib/schema";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {useFetch} from "../../../../hooks/use-fetch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { error } from "console";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/actions/user";
import { Loader, Loader2 } from "lucide-react";
import { toast } from "sonner";

type OnBoardingFormProps = {
    industries: typeof industries; // infers Industry[]
  };

export default  function OnBoardingForm({industries}:OnBoardingFormProps){ 
    const [selectedIndustry,setselectedIndustry] = useState(null);
    const router = useRouter(); 
    const {
        loading:updateLoading,
        fn:updateUserFn,
        data:updateResult} =  useFetch(updateUser)
    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue,
        watch,
    } =  useForm({
        resolver:zodResolver(onboardingSchema),
    })
    const watchIndustry = watch("industry");
    const onSubmit = async (values) => {
        const formattedIndustry =
          `${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`;
      
        const res = await updateUserFn({
          ...values,
          industry: formattedIndustry, // fixed typo
        });
        
      
        if (!res || res.success) {
          toast.success("Profile completed successfully!");
          router.push("/dashboard");
          router.refresh();
        }
        router.replace(`/onboarding?ts=${Date.now()}`);
      };
      
    useEffect(()=>{
        if(updateResult?.success && !updateLoading){
            toast.success("Profile completed successfully!"); 
            router.push("/dashboard"); 
            router.refresh();
        }
    },[updateResult,updateLoading])
    return(
        <div className="flex items-center justify-center bg-background">
            <Card className="w-full max-w-lg mt-10 mx-2">
                <CardHeader className="">
                    <CardTitle className=" mx-auto text-3xl">Complete Your Profile</CardTitle>
                    <CardDescription>Choose your industry to receive personalized career insights and recommendations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                    <Select
                        onValueChange={(value)=>{
                            setValue("industry",value);
                            setselectedIndustry(
                                industries.find((ind)=>ind.id==value)
                            );
                            setValue("subIndustry","")
                        }}
                    >
                        <SelectTrigger id="industry"className="w-full min-w-full">
                            <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                            {industries.map((industry)=>{
                                return( 
                                <SelectItem value={industry.id} key={industry.id}>{industry.name}</SelectItem>                                
                                )
                            })}
                        </SelectContent>
                    </Select>
                    {errors.industry && (
                        <p className="text-sm text-red-500">
                            {errors.industry.message}
                        </p>
                    )}
                    </div>
                    
                    {
                        watchIndustry && (
                            <div className="space-y-2">
                            <Label htmlFor="subIndustry">Sub-industry</Label>
                        <Select
                            onValueChange={(value)=>{
                                setValue("subIndustry",value)
                            }}
                        >
                            <SelectTrigger id="subIndustry" className="w-full min-w-full">
                                <SelectValue placeholder="Select your sub-industry" />
                            </SelectTrigger>
                            <SelectContent>
                                {selectedIndustry?.subIndustries.map((subIndustry)=>{
                                    return( 
                                    <SelectItem value={subIndustry} key={subIndustry}>{subIndustry}</SelectItem>                                
                                    )
                                })}
                            </SelectContent>
                        </Select>
                        {errors.subIndustry && (
                            <p className="text-sm text-red-500">
                                {errors.subIndustry.message}
                            </p>
                        )}
                        </div>
                        )
                    }
                      <div className="space-y-2">
                            <Label htmlFor="experience">Experience</Label> 
                            <Input 
                            id="experience"
                            type='number'  
                            min="0"
                            max="30" 
                            placeholder="Enter years of experience"
                            {...register("experience")}
                            />
                        {errors.experience && (
                            <p className="text-sm text-red-500">
                                {errors.experience.message}
                            </p>
                        )}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="experience">Skills</Label> 
                            <Input 
                            id="skills"
                            placeholder="e.g., AI/ML, Web Development, Project Management"
                            {...register("skills")}
                            />
                        <p className="text-sm texted-muted-foreground">
                          Separate multiple skills with commas.
                        </p>
                        {errors.skills && (
                            <p className="text-sm text-red-500">
                                {errors.skills.message}
                            </p>
                        )}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="experience">Bio</Label> 
                            <Textarea
                            id="bio"
                            placeholder="Tell us about yourself (max 500 characters)"
                            {...register("bio")}
                            />
                        {errors.bio && (
                            <p className="text-sm text-red-500">
                                {errors.bio.message}
                            </p>
                        )}
                        </div>
                            <Button type=" submit"
                                className="w-full"
                                disabled={updateLoading}
                            >
                                 {updateLoading? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> 
                                        Saving.....
                                    </>
                                ):
                                ("Complete Profile")
                            }
                            </Button>
                    </form>
                </CardContent>
            </Card>  
        </div>
    )
}
