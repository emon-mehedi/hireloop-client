import { JobFormData } from "../types/jobs";

const BASE_URL=process.env.NEXT_PUBLIC_API_BASE_URL;

export const createJob=async (data:JobFormData)=>{
  const res=await fetch(`${BASE_URL}/jobs`,{
    method: "POST",
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}


export const deleteJob=async (jobId:string)=>{
  const res=await fetch(`${BASE_URL}/jobs/${jobId}`,{
    method: "DELETE",
  });
  return res.json();
}


export async function applyToAJob(data) {
  const res = await fetch(`${BASE_URL}/applications`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  return res.json()
}