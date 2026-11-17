"use client"

// Admin User Management table — from the Figma "Admin / Manage Users":
// toolbar (search by name/email + role filter + Export List), then a
// high-density table (avatar + name, email, role pill, join date,
// status pill, actions).
//
// Role changes are local for now: persisting them is wired up separately
// (see handleRoleChange).

import { useMemo, useState } from "react"
import { Download, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserRole, UserRow } from "@/lib/types/users"
import { RolePill } from "@/components/shared/role-pill"
import { Pill } from "@/components/shared/pill"
import { UserRoleSelect } from "@/components/shared/user-role-select"
import { updateUserRole } from "@/lib/actions/users"

const cardShadow =
    "shadow-[0_1px_2px_rgba(0,0,0,0.35)] shadow-[inset_0_1px_rgba(255,255,255,0.035)]"

const headerCellClass = "px-3 py-3 text-[11px] font-medium tracking-wide uppercase text-white"

// Role filter values: the roles themselves plus "all".
const ROLE_FILTERS = ["all", "admin", "recruiter", "seeker"] as const
type RoleFilter = (typeof ROLE_FILTERS)[number]

const ROLE_FILTER_LABELS: Record<RoleFilter, string> = {
    all: "All Roles",
    admin: "Admin",
    recruiter: "Recruiter",
    seeker: "Seeker",
}

export function UsersTable({ users }: { users: readonly UserRow[] }) {
    // Current role per user (row id → role), editable below.
    const [roles, setRoles] = useState<Record<string, UserRole>>(() =>
        Object.fromEntries(users.map((user) => [user.id, user.role])),
    )
    const [search, setSearch] = useState("")
    const [roleFilter, setRoleFilter] = useState<RoleFilter>("all")

    const handleRoleChange = async(id: string, role: UserRole) => {
        // TODO: persist to the database (better-auth setRole / PATCH) —
        // the admin-side role update is wired up later; for now the
        // change only lives in this table's state.
        setRoles((prev) => ({ ...prev, [id]: role }));
        const res = await updateUserRole(id, role);
        console.log("response after update", res);
        if(res.modifiedCount>0){
          console.log("User role updated successfully");
        }
    }

    const visibleUsers = useMemo(
        () =>
            users.filter(
                (user) =>
                    roleFilter === "all" ||
                    (roles[user.id] ?? user.role) === roleFilter,
            ).filter((user) =>
                `${user.name} ${user.email}`
                    .toLowerCase()
                    .includes(search.trim().toLowerCase()),
            ),
        [users, roles, roleFilter, search],
    )

    return (
        <div>
            {/* Toolbar: search + role filter + export (Figma) */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
                <label className="relative flex h-10 min-w-56 flex-1 items-center sm:max-w-72">
                    <Search aria-hidden className="absolute left-3 size-4 text-[#A0A0AB]" />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search by name or email..."
                        className="surface-field h-full w-full rounded-lg pl-9 pr-3 text-[13px] text-black placeholder:text-[#A0A0AB]"
                    />
                </label>

                <select
                    aria-label="Filter by role"
                    value={roleFilter}
                    onChange={(event) => setRoleFilter(event.target.value as RoleFilter)}
                    className="surface-field h-10 rounded-lg px-3 text-[13px] text-black"
                >
                    {ROLE_FILTERS.map((filter) => (
                        <option key={filter} value={filter} className="bg-[#1A1A1F]">
                            {ROLE_FILTER_LABELS[filter]}
                        </option>
                    ))}
                </select>

                {/* TODO: wire the export handler. */}
                <button
                    type="button"
                    className={cn(
                        "flex h-10 items-center gap-2 rounded-lg bg-[#FAFAFA] px-4 text-[13px] font-medium text-[#0B0B0C]",
                        cardShadow,
                        "transition-colors hover:bg-white",
                    )}
                >
                    <Download aria-hidden className="size-3.5" />
                    Export List
                </button>
            </div>

            {/* High-density data table (Figma) */}
            <section className={cn("overflow-hidden border border-white/10 bg-[#141418]", cardShadow)}>
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed min-w-4xl text-left">
                        <colgroup>
                            <col className="w-[20%]" />
                            <col className="w-[24%]" />
                            <col className="w-[14%]" />
                            <col className="w-[13%]" />
                            <col className="w-[13%]" />
                            <col />
                        </colgroup>

                        <thead>
                            <tr className="bg-[#1A1A1F]">
                                <th scope="col" className={headerCellClass}>User name</th>
                                <th scope="col" className={headerCellClass}>Email address</th>
                                <th scope="col" className={headerCellClass}>Role</th>
                                <th scope="col" className={headerCellClass}>Join date</th>
                                <th scope="col" className={headerCellClass}>Status</th>
                                <th scope="col" className={headerCellClass}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {visibleUsers.map((user) => {
                                const role = roles[user.id] ?? user.role
                                const suspended = user.banned
                                return (
                                    <tr
                                        key={user.id}
                                        className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.03]"
                                    >
                                        {/* User name (avatar + name) */}
                                        <td className={cn("px-3 py-3.5", suspended && "opacity-60")}>
                                            <div className="flex items-center gap-3">
                                                <span
                                                    aria-hidden
                                                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#222228] text-xs font-semibold text-[#EDEDEF]"
                                                >
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                                <span className="block truncate text-[13px] font-medium text-white">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Email address */}
                                        <td className={cn("px-3 py-3.5", suspended && "opacity-60")}>
                                            <span className="block truncate text-[13px] text-white">
                                                {user.email}
                                            </span>
                                        </td>

                                        {/* Role */}
                                        <td className="px-3 py-3.5">
                                            <RolePill role={role} />
                                        </td>

                                        {/* Join date */}
                                        <td className={cn("px-3 py-3.5", suspended && "opacity-60")}>
                                            <span className="block truncate text-[13px] text-white">
                                                {formatJoinDate(user.createdAt)}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-3 py-3.5">
                                            <Pill
                                                label={suspended ? "Suspended" : "Active"}
                                                color={suspended ? "white" : "white"}
                                            />
                                        </td>

                                        {/* Actions — role toggle (persistence TODO) */}
                                        <td className="px-3 py-3.5">
                                            <UserRoleSelect
                                                value={role}
                                                onChange={(next) => handleRoleChange(user.id, next)}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    {visibleUsers.length === 0 ? (
                        <p className="p-10 text-center text-sm text-white/50">
                            No users match your filters.
                        </p>
                    ) : null}
                </div>
            </section>
        </div>
    )
}

/** ISO timestamp → "Oct 12, 2023". Fixed en-US so SSR and client agree. */
const formatJoinDate = (createdAt: string) =>
    new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    })