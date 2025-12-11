"use client"

import { usePathname } from "next/navigation"
import { Footer } from "@/components/(global)/Footer"
import Navbar from "@/components/(global)/Header/Navbar"
import { Suspense } from "react"
import Loading from "@/app/(routes)/loading"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isApplyPage = pathname?.startsWith("/apply")
    const isCommandsPage = pathname?.startsWith("/commands")
    const isStatusPage = pathname?.startsWith("/status")

    return (
        <div>
            {isApplyPage || isCommandsPage || isStatusPage ? (
                children
            ) : (
                <>
                    <Navbar />
                    <Suspense fallback={<Loading />}>{children}</Suspense>
                    <Footer />
                </>
            )}
        </div>
    )
}