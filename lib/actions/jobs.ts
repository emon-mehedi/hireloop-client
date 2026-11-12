import { JobFormData } from "@/app/dashboard/recruiter/jobs/new/page";


export const createJob=async (data:JobFormData)=>{
  const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`,{
    method: "POST",
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}