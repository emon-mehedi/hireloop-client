"use client"

import { useState } from "react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Eye, Pencil, MoreHorizontal, Plus, Users } from "lucide-react"
import type { JobFormData } from "@/app/dashboard/recruiter/jobs/new/page"

// Table rows carry the same flat shape the "Post a New Job" form (JobFormData)
// stores, plus the extra fields only the table needs.
type JobStatus = "active" | "expired"

type JobRow = JobFormData & {
    id: string
    applicants: number
    status: JobStatus
    /** Relativized post date, e.g. "Posted 4d ago". */
    posted: string
}

// Dummy data in the JobFormData shape — swap for API data later.
const DUMMY_JOBS: JobRow[] = [
    {
        id: "jl-90210",
        title: "Frontend Developer",
        companyName: "HirePulse Network",
        category: "Design",
        jobType: "full-time",
        isRemote: true,
        location: "New York, USA",
        deadline: "2025-05-30",
        minSalary: "25",
        maxSalary: "40",
        salaryFrequency: "per hour",
        responsibilities: "Build accessible, responsive UIs in close partnership with design.",
        requirements: "• 3+ years React/TypeScript\nSolid CSS fundamentals",
        applicants: 34,
        status: "active",
        posted: "Posted 4d ago",
    },
    {
        id: "jl-88231",
        title: "Backend Engineer",
        companyName: "HirePulse Labs",
        category: "Engineering & Tech",
        jobType: "full-time",
        isRemote: false,
        location: "London, UK",
        deadline: "2025-06-14",
        minSalary: "90k",
        maxSalary: "115k",
        salaryFrequency: "per year",
        responsibilities: "Design and run resilient services powering the job-matching engine.",
        requirements: "• Node.js & MongoDB experience\nAPI design fluency",
        applicants: 19,
        status: "active",
        posted: "Posted 1w ago",
    },
    {
        id: "jl-99032",
        title: "DevOps Specialist",
        companyName: "HirePulse Platform",
        category: "Infrastructure",
        jobType: "full-time",
        isRemote: false,
        location: "Berlin, Germany",
        deadline: "2025-06-30",
        minSalary: "95k",
        maxSalary: "120k",
        salaryFrequency: "per year",
        responsibilities: "Own CI/CD pipelines, containers, and observability tooling.",
        requirements: "• Kubernetes in production\nIaC with Terraform",
        applicants: 12,
        status: "active",
        posted: "Posted 2w ago",
    },
    {
        id: "jl-44112",
        title: "Product Marketing Lead",
        companyName: "HirePulse Network",
        category: "Marketing",
        jobType: "full-time",
        isRemote: true,
        location: "Remote (EU/US)",
        deadline: "2025-07-15",
        minSalary: "80k",
        maxSalary: "105k",
        salaryFrequency: "per year",
        responsibilities: "Own positioning, launches, and enablement for the platform suite.",
        requirements: "• 5+ years B2B SaaS marketing\nTrack record of launches",
        applicants: 27,
        status: "active",
        posted: "Posted 5d ago",
    },
    {
        id: "jl-33208",
        title: "QA Automation Engineer",
        companyName: "HirePulse Platform",
        category: "Quality",
        jobType: "part-time",
        isRemote: false,
        location: "Dublin, Ireland",
        deadline: "2025-05-01",
        minSalary: "35",
        maxSalary: "50",
        salaryFrequency: "per hour",
        responsibilities: "Automate regression suites and champion quality gates in CI.",
        requirements: "• Playwright/Cypress expertise\nSharp eye for UX bugs",
        applicants: 8,
        status: "expired",
        posted: "Posted 3w ago",
    },
]

/** "25", "40", "per hour" → "€25 – €40 / hr" (as in the Figma rows). */
const formatCompensation = (job: JobFormData) =>
    `€${job.minSalary} – €${job.maxSalary} / ${job.salaryFrequency.replace("per ", "")}`

/** "2025-05-30" → "May 30, 2025". Fixed en-US so SSR and client agree. */
const formatDeadline = (deadline: string) =>
    new Date(deadline).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })

const badgeClass =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize"
const statusStyles: Record<JobStatus, string> = {
    active: "border-emerald-400/30 bg-emerald-400/15 text-emerald-300",
    expired: "border-white/10 bg-white/5 text-white/50",
}
const typePillClass =
    "inline-flex items-center whitespace-nowrap rounded-lg border border-white/10 bg-[#1A1A1F] px-2.5 py-0.5 text-xs capitalize text-white/80"

const iconButtonClass =
    "flex size-8 items-center justify-center rounded-md border border-white/10 bg-[#1A1A1F] text-white/60 transition-colors hover:border-white/25 hover:text-white"

// Responsive column visibility — shared by <th> and <td> so they always agree.
const cellVis = {
    company: "hidden md:table-cell",
    type: "hidden lg:table-cell",
    compensation: "hidden lg:table-cell",
    applicants: "hidden lg:table-cell",
    deadline: "hidden lg:table-cell",
} satisfies Record<string, string>

const headingClass = "px-3 py-3.5 text-xs font-medium tracking-wide text-white/50 uppercase"
const cellClass = "px-3 py-3.5"

export default function RecruiterJobsPage() {
    const [jobs, setJobs] = useState<JobRow[]>(DUMMY_JOBS)

    console.log("jobs data", jobs) // wire to backend fetch later

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm">
                <span className="text-white/50">Manage Jobs</span>
                <span aria-hidden className="text-white/30">/</span>
                <span className="text-white/90">Job Listings & Postings</span>
            </nav>

            {/* Page heading + primary action */}
            <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                    <h1 className="font-heading text-[28px] leading-[1.15] font-bold tracking-[-0.02em] text-white">
                        Manage Job Posts
                    </h1>
                    <p className="text-sm text-white/60">
                        Review live listings, monitor applicants, and update job details
                        across your organization.
                    </p>
                </div>
                <Link
                    href="/dashboard/recruiter/jobs/new"
                    className={cn(buttonVariants(), "bg-[#5C53FE] hover:bg-[#7B74FF]")}
                >
                    <Plus aria-hidden />
                    New Job Post
                </Link>
            </header>

            {/* Postings table — columns collapse away on smaller screens instead of scrolling */}
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101010]/95 shadow-[inset_0_3px_10px_rgba(255,255,255,0.04)]">
                <div className="overflow-x-auto">
                    <table className="table-fixed w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th scope="col" className={cn(headingClass, "px-5", "lg:w-[20%]")}>
                                    Job title & dept
                                </th>
                                <th scope="col" className={cn(headingClass, cellVis.company, "lg:w-[16%]")}>
                                    Company & location
                                </th>
                                <th scope="col" className={cn(headingClass, cellVis.type, "lg:w-[9%]")}>
                                    Type
                                </th>
                                <th scope="col" className={cn(headingClass, cellVis.compensation, "lg:w-[12%]")}>
                                    Compensation
                                </th>
                                <th scope="col" className={cn(headingClass, cellVis.applicants, "lg:w-[12%]")}>
                                    Applicants
                                </th>
                                <th scope="col" className={cn(headingClass, "lg:w-[9%]")}>
                                    Status
                                </th>
                                <th scope="col" className={cn(headingClass, cellVis.deadline, "lg:w-[11%]")}>
                                    Deadline
                                </th>
                                <th scope="col" className={cn(headingClass, "px-5", "lg:w-[11%]")}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr
                                    key={job.id}
                                    className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.03]"
                                >
                                    {/* Job title & dept */}
                                    <td className={cn(cellClass, "px-5")}>
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="hidden size-10 shrink-0 items-center justify-center rounded-lg bg-[#5C53FE]/15 text-sm font-semibold text-[#8B85FF] sm:flex"
                                                aria-hidden
                                            >
                                                {job.title.charAt(0)}
                                            </span>
                                            <div className="flex min-w-0 flex-col">
                                                <span className="truncate font-medium text-[#EDEDEF]">
                                                    {job.title}
                                                </span>
                                                <span className="truncate text-xs text-white/50">
                                                    {job.category}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Company & location */}
                                    <td className={cn(cellClass, cellVis.company)}>
                                        <div className="flex min-w-0 flex-col">
                                            <span className="truncate text-[#EDEDEF]">{job.companyName}</span>
                                            <span className="truncate text-xs text-white/50">
                                                {job.isRemote ? `Remote (${job.location})` : job.location}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className={cn(cellClass, cellVis.type)}>
                                        <span className={typePillClass}>{job.jobType}</span>
                                    </td>
                                    {/* Compensation */}
                                    <td className={cn(cellClass, cellVis.compensation)}>
                                        <span className="whitespace-nowrap text-white/80">
                                            {formatCompensation(job)}
                                        </span>
                                    </td>

                                    {/* Applicants */}
                                    <td className={cn(cellClass, cellVis.applicants)}>
                                        <span className="flex items-center gap-2 whitespace-nowrap text-white/80">
                                            <Users aria-hidden className="size-4 text-white/40" />
                                            {job.applicants} candidates
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className={cellClass}>
                                        <span className={cn(badgeClass, statusStyles[job.status])}>
                                            {job.status}
                                        </span>
                                    </td>

                                    {/* Deadline */}
                                    <td className={cn(cellClass, cellVis.deadline)}>
                                        <div className="flex flex-col whitespace-nowrap">
                                            <span className="text-[#EDEDEF]">{formatDeadline(job.deadline)}</span>
                                            <span className="text-xs text-white/50">{job.posted}</span>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className={cn(cellClass, "px-5")}>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                aria-label={`View ${job.title}`}
                                                className={iconButtonClass}
                                            >
                                                <Eye aria-hidden className="size-4" />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label={`Edit ${job.title}`}
                                                className={iconButtonClass}
                                            >
                                                <Pencil aria-hidden className="size-4" />
                                            </button>
                                            <button
                                                type="button"
                                                aria-label={`More actions for ${job.title}`}
                                                className={cn(iconButtonClass, "hidden md:flex")}
                                            >
                                                <MoreHorizontal aria-hidden className="size-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}