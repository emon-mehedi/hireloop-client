// My Applications — seeker dashboard page, from the Figma
// "Seeker / My Applications" (stats bento + applications table).
//
// Serves the dummy applications for now; swap the import for the real
// loader (getApplications by user id) when the backend endpoint is ready.

import { PageContainer } from "@/components/dashboard/page-shell"
import { ApplicationsBoard } from "./_components/applications-board"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getApplications } from "@/lib/api/applications-server";

export default async function MyApplicationsPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const applications = await getApplications(`applicantId=${session?.user.id}`);
    return (
        <PageContainer>
            <ApplicationsBoard applications={applications} />
        </PageContainer>
    )
}