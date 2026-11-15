// Checkout / payment page — from the Figma "Public / Checkout — Stripe
// Payment" (simplified: no card fields, since payment will be collected
// on Stripe's hosted Checkout page — the Pay button hands off there).
//
// Layout: order summary (left) + payment method card with Pay button
// (right), "Powered by Stripe" footer note.
//
// The order is a constant for now; make it dynamic (plan or application
// fee, or a ?plan= search param) once the billing endpoint exists.

import Link from "next/link"
import { ArrowLeft, CreditCard, Lock } from "lucide-react"
import { PayButton } from "./_components/pay-button"

const ORDER = {
    name: "Hireloop Pro Plan",
    description: "Access to all features",
    amount: "$20.00",
}

// Figma checkout palette.
const borderClass = "border-[#2e2e33]"
const mutedClass = "text-[#a1a1aa]"
const dimmedClass = "text-[#808089]"

export default function CheckoutPage() {
    return (
        <div className="min-w-0">
            {/* Minimal header like the Figma checkout top bar: brand only. */}
            <header className="mx-auto flex h-24 w-full max-w-3xl items-center px-4">
                <Link
                    href="/"
                    aria-label="Back"
                    className="mr-6 text-[#a1a1aa] transition-colors hover:text-white"
                >
                    <ArrowLeft aria-hidden className="size-6" />
                </Link>
                <Link href="/" className="font-heading text-lg font-bold text-black">
                    Hireloop
                </Link>
            </header>

            <main className="mx-auto grid w-full max-w-3xl gap-16 px-4 pb-16 pt-4 lg:grid-cols-2">
                {/* Order summary */}
                <section>
                    <p className={`text-xs font-bold uppercase tracking-[0.1em] ${dimmedClass}`}>
                        Order summary
                    </p>

                    <div className="mt-7 flex items-start justify-between gap-4 border-b pb-8 border-[#2e2e33]">
                        <div>
                            <h2 className="text-lg font-semibold leading-7 text-black">
                                {ORDER.name}
                            </h2>
                            <p className={`mt-1.5 text-sm ${mutedClass}`}>
                                {ORDER.description}
                            </p>
                        </div>
                        <p className="whitespace-nowrap text-lg font-semibold leading-7 text-black">
                            {ORDER.amount}
                        </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-lg font-semibold text-black">
                        <span>Total</span>
                        <span className="whitespace-nowrap">{ORDER.amount}</span>
                    </div>
                </section>

                {/* Payment */}
                <section>
                    <h2 className="text-sm font-semibold text-black">Payment method</h2>

                    <div className={`mt-7 overflow-hidden rounded-lg border ${borderClass}`}>
                        {/* Card method header — the real form fields come from
                            Stripe, so the body is a redirect note for now. */}
                        <div className="flex items-center gap-3 border-b border-[#2e2e33] bg-[#27272a] px-4 py-3.5">
                            <CreditCard aria-hidden className="size-5 text-[#a1a1aa]" />
                            <span className="text-sm font-medium text-white">Card</span>
                        </div>

                        <div className="flex flex-col gap-4 p-4">
                            <p className="min-h-[90px] text-base text-[#888891]">
                                You&apos;ll be redirected to Stripe&apos;s secure checkout to complete
                                your payment. Card details are never stored on Hireloop.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        {/* TODO: wire the Stripe Checkout Session redirect (pay-button). */}
                        <PayButton label={`Pay ${ORDER.amount}`} />
                        <p className={`mt-4 flex items-center justify-center gap-1.5 text-xs ${dimmedClass}`}>
                            <Lock aria-hidden className="size-3.5" />
                            Powered by Stripe
                        </p>
                    </div>
                </section>
            </main>
        </div>
    )
}