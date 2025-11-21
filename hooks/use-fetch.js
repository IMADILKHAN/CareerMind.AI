import { err } from "inngest/types";
import { useState } from "react"
import { toast } from "sonner";

export function useFetch(cb){
    const[data,setData] = useState(undefined); 
    const[loading,setLoading] = useState(null); 
    const[error,setError] = useState(null); 

    const fn = async(...args)=>{
            setLoading(true);
            setError(null);

            try {
                const response = await cb(...args);
                setData(response);
                return response; 
            } catch (error) {
                setError(error);
                toast.error(err?.message || "Something went wrong.");
                throw err;   
            }
            finally{
                setLoading(false);
            }
    }

    return {data,loading,error,fn,setData}
}

