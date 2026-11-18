"use server";

import { protectedMutation } from "../core/server";
import { JobFormData } from "../types/jobs";

const BASE_URL=process.env.NEXT_PUBLIC_API_BASE_URL;

export const createJob=async (data:JobFormData)=>{
  const api = `${BASE_URL}/jobs`;
  const res=await protectedMutation(api, "POST", data)
  return res.json();
}


export const deleteJob=async (jobId:string)=>{
  const res=await fetch(`${BASE_URL}/jobs/${jobId}`,{
    method: "DELETE",
  });
  return res.json();
}


export async function applyToAJob(data) {
  const api = `${BASE_URL}/applications`;
  const res = await protectedMutation(api, "POST", data)
  return res.json()
}