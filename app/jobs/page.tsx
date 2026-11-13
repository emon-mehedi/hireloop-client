import { getJobs } from "@/lib/api/jobs";

const BrowseJobsPage = async({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

  //this creates a object of params from url
  const search = await searchParams

  //this converts the object to string (URLSearchParams from js)
  const urlSearch = new URLSearchParams(search as Record<string, string>);
  const query= urlSearch.toString();
  console.log("search params:", query);
  const jobs = await getJobs(query);

  return(
    <div>
      <h1>Browse Jobs Page</h1>
      <ul>
        {
          jobs.map((job)=>(<li key={job._id}>{job.title}</li>)) 
        }
      </ul>
    </div>
  )
}

export default BrowseJobsPage