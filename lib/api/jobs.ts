const BASE_URL =process.env.NEXT_PUBLIC_API_BASE_URL

export const getJobs = async(querry:string='')=>{
  //if querry exists, it will be send to backend
  const res=await fetch(`${BASE_URL}/jobs?${querry}`);
  const jobs= await res.json();
  return jobs
} 

export const getJobById = async(jobId:string)=>{
  const res= await fetch(`${BASE_URL}/jobs/${jobId}`)
  return res.json()
}