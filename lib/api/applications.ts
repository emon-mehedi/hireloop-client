// Data-access module for the applications API (Express on :5000).
// Follows the `lib/api/jobs.ts` pattern.

import type { ApplicationFormData } from "@/lib/types/applications"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"



//function to get count of applications of a user
export const getApplicationsCount = async (query = ""): Promise<{count: number}> => {
    const res = await fetch(`${BASE_URL}/applications/count?${query}`)
    return res.json()
}

export const createApplication = async (data: ApplicationFormData) => {
    const res = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return res.json()
}