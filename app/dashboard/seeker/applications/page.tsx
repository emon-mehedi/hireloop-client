// My Applications — seeker dashboard page, from the Figma
// "Seeker / My Applications" (stats bento + applications table).
//
// Serves the dummy applications for now; swap the import for the real
// loader (getApplications by user id) when the backend endpoint is ready.

import { PageContainer } from "@/components/dashboard/page-shell"
import { ApplicationsBoard } from "./_components/applications-board"
import { DUMMY_APPLICATIONS } from "./_dummy-data"

export default function MyApplicationsPage() {
    return (
        <PageContainer>
            <ApplicationsBoard applications={DUMMY_APPLICATIONS} />
        </PageContainer>
    )
}