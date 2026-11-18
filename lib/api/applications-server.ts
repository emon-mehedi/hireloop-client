import { authFetch } from "../core/server"
import { ApplicationRow } from "../types/applications"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// GET /applications?userId=… — placeholder until loading is wired.
export const getApplications = async (query = ""): Promise<ApplicationRow[]> => {
    const api =`${BASE_URL}/applications?${query}`
    const res = await authFetch(api)
    return res.json()
}