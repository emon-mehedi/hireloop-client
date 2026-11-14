"use client"

// Search bar for the Browse Jobs page — mirrors the Figma
// "Section - Search & Quick Filters".
//
// Submit is intentionally a no-op stub: changing the query does not
// navigate or set any URL state. Implement the real search here later
// (e.g. router.push with ?q= plus the current filter values).

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

export function JobSearchBar() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // TODO: wire server-side search (router.push with ?q= and filters).
        event.preventDefault()
    }

    return (
        <form
            onSubmit={handleSubmit}
            role="search"
            className="surface-card flex flex-col gap-3 p-6 sm:flex-row sm:items-center"
        >
            <div className="relative flex-1">
                <Search
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#8E9192]"
                />
                <Input
                    name="q"
                    aria-label="Search jobs"
                    placeholder="Search by job title, keywords..."
                    className="surface-field h-12 w-full pr-3 pl-10 text-sm text-[#EDEDEF] placeholder:text-[#A0A0AB]"
                />
            </div>
            <button type="submit" className={cn(buttonVariants(), "bg-white text-[#2F3131] hover:bg-white/90 sm:h-12")}>
                Search Jobs
            </button>
        </form>
    )
}