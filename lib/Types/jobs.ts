export type JobFormData = {
  title: string
  companyName: string
  category: string
  jobType: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
}

export type JobType = "full-time" | "part-time" | "contract" | "internship"



export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Infrastructure",
  "Quality",
]

export const JOB_TYPES: JobType[] = ["full-time", "part-time", "contract", "internship"]

export const SALARY_FREQUENCIES = ["per hour", "per day", "per week", "per month", "per year"]


// Table rows carry the same flat shape the "Post a New Job" form (JobFormData)
// stores, plus the extra fields only the table needs.
export type JobStatus = "active" | "expired"

export type JobRow = JobFormData & {
    _id: string
    applicants: number
    status: JobStatus
    /** Relativized post date, e.g. "Posted 4d ago". */
    posted: string
}