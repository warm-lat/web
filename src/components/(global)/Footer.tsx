"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Footer = () => {
    const pathname = usePathname()
    const isCommandsPage = pathname === "/commands"
    const isAvatarsPage = pathname.startsWith("/avatars/")
    const isPurchasePage = pathname === "/purchase"
    const isHomePage = pathname === "/"
    const isApplyPage = pathname === "/apply"
    const isVerifyPage = pathname.startsWith("/verify/")
    const isFeaturesPage = pathname.startsWith("/features/")

    return (
        <div
            className={`${isCommandsPage || isAvatarsPage || isHomePage || isPurchasePage || isApplyPage || isVerifyPage || isFeaturesPage ? "" : "mt-[30vh]"} border-t border-evict-card-border bg-[#0B0C0C] footer pb-10`}>
            <div className="flex w-full border-solid border-t border-evict-600 border-opacity-10">
                <div className="flex flex-col w-full mt-10 px-4 sm:px-6 lg:px-8 sm:flex-row sm:justify-between">
                    <div className="flex flex-col items-start mb-8 sm:mb-0">
                        <Image
                            src="https://r2.warm.lat/pfp.jpg"
                            alt="warm"
                            height={150}
                            width={150}
                            className="rounded-2xl"
                        />
                        <p className="text-warm-pink text-sm mt-4">
                            Copyright © 2025 warm.lat. All rights reserved.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 sm:flex-row">
                        <div className="flex flex-col">
                            <span className="font-extrabold text-2xl text-white">Bot</span>
                            <Link
                                href="/invite"
                                className="font-semibold text-warm-pink text-sm mt-2">
                                Invite
                            </Link>
                            <Link
                                href="https://docs.warm.lat/"
                                className="font-semibold text-warm-pink text-sm mt-2">
                                Documentation
                            </Link>
                            <Link
                                href="https://discord.gg/apply"
                                className="font-semibold text-warm-pink text-sm mt-2">
                                Support Server
                            </Link>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-2xl text-white">Legal</span>
                            <Link
                                href="/terms"
                                className="font-semibold text-warm-pink text-sm mt-2">
                                Terms
                            </Link>
                            <Link
                                href="/privacy"
                                className="font-semibold text-warm-pink text-sm mt-2">
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
