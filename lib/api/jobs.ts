export const getJobs = async(querry:string='')=>{
  //if querry exists, it will be send to backend
  const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs?${querry}`);
  const jobs= await res.json();
  return jobs
} 