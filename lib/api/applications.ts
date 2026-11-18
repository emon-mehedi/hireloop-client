"use server";

// Data-access module for the applications API (Express on :5000).
// Follows the `lib/api/jobs.ts` pattern.

import type { ApplicationFormData } from "@/lib/types/applications"
import { protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"



//function to get count of applications of a user
export const getApplicationsCount = async (query = ""): Promise<{count: number}> => {
    const res = await fetch(`${BASE_URL}/applications/count?${query}`)
    return res.json()
}

export const createApplication = async (data: ApplicationFormData) => {
    const api = `${BASE_URL}/applications`
    const res = await protectedMutation(api, "POST", data)
    return res.json()
}