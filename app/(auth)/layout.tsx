export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden px-4 py-12">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/60 via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl"
      />

      <div className="relative w-full max-w-md">{children}</div>
    </main>
  )
}
