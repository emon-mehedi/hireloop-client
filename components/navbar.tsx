"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import logo from "@/public/images/logo.png"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "@/lib/auth-client"

const NAV_ITEMS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
] as const

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const closeMenu = () => setIsOpen(false);
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut()
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="HireLoop home"
        >
          <Image src={logo} alt="HireLoop" priority className="h-8 w-auto" />
        </Link>

        {/* Desktop navigation */}
        <nav className="ml-auto hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                isActive(pathname, item.href)
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth actions */}
        <div className="hidden items-center gap-2 md:flex">
          {
            session?.user
              ? <>
                <span>Welcome {session.user.name}</span>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </>
              : <>
                <Link
                  href="/sign-in"
                  className={cn(
                    "inline-flex h-8 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                    isActive(pathname, "/sign-in")
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Sign In
                </Link>
                <Button nativeButton={false} render={<Link href="/sign-up" />}>
                  Get Started
                </Button>
              </>
          }
        </div>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div id="mobile-nav" className="border-t md:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={
                  isActive(pathname, item.href) ? "page" : undefined
                }
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                  isActive(pathname, item.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t pt-3">
              {
                session?.user
                  ? <>
                    <span>Welcome {session.user.name}</span>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                  </>
                  : <>
                    <Link
                      href="/sign-in"
                      onClick={closeMenu}
                      className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      Sign In
                    </Link>
                    <Button
                      nativeButton={false}
                      render={<Link href="/sign-up" onClick={closeMenu} />}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </>
              }

            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
