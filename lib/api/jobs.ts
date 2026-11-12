export const getJobs = async()=>{
  const res=await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`);
  const jobs= await res.json();
  return jobs
} 