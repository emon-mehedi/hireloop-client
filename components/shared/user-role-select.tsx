"use client"

import { ROLE_META, USER_ROLES, UserRole } from "@/lib/types/users"
// Native select for changing a user's role. Rendering only — persistence
// is the caller's responsibility (the admin users page wires the DB
// update separately). Same pattern as ApplicationStatusSelect.

import { cn } from "@/lib/utils"

export function UserRoleSelect({
    value,
    onChange,
    className,
}: {
    value: UserRole
    onChange: (role: UserRole) => void
    className?: string
}) {
    return (
        <select
            aria-label="Change user role"
            value={value}
            onChange={(event) => onChange(event.target.value as UserRole)}
            className={cn(
                "surface-field h-8 rounded-md px-2.5 text-xs text-[#EDEDEF]",
                className,
            )}
        >
            {USER_ROLES.map((role) => (
                <option key={role} value={role} className="bg-[#1A1A1F]">
                    Make {ROLE_META[role].label}
                </option>
            ))}
        </select>
    )
}