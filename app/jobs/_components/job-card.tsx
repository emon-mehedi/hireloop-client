'use client'
import { JobRow } from '@/lib/types/jobs';
import { useRouter } from 'next/navigation';
import React from 'react';

const JobCard = ({job}:{job:JobRow}) => {
  const router = useRouter()
  const handleViewJobDetails=(jobId:string)=>{
    router.push(`/jobs/${jobId}`)
  }
  return (
    <li key={job._id} onClick={()=>handleViewJobDetails(job._id)} className="surface-card p-6 border border-black rounded-md">
      <h3 className="font-heading text-lg font-semibold text-black">
        {job.title}
      </h3>
      <p className="mt-1 text-sm text-[#6E6E78]">
        {job.companyName} • {job.location}
        {job.isRemote ? " (Remote)" : ""}
      </p>
    </li>
  );
};

export default JobCard;