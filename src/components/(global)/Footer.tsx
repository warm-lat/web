"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaDiscord } from "react-icons/fa";

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
            className={`${isCommandsPage || isAvatarsPage || isHomePage || isPurchasePage || isApplyPage || isVerifyPage || isFeaturesPage ? "" : "mt-[30vh]"} border-t border-warm-card-border bg-[#0B0C0C] footer pb-10`}>
            <div className="flex w-full border-solid border-t border-warm-600 border-opacity-10 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                        <Link href="/" className="block">
                            <Image
                                src="https://r2.warm.lat/pfp.jpg"
                                alt="warm"
                                width={120}
                                height={120}
                                className="rounded-2xl mb-4"
                            />
                        </Link>
                        <p className="text-warm-pink text-sm text-center md:text-left">
                            Copyright © 2025 warm.lat. <br /> All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                        <div>
                            <h6 className="font-extrabold text-2xl text-white mb-4">Bot</h6>
                            <nav className="flex flex-col gap-2">
                                <Link href="/invite" className="font-semibold text-warm-pink hover:text-warm-blue transition-colors">
                                    Invite
                                </Link>
                                <Link href="https://docs.warm.lat/" className="font-semibold text-warm-pink hover:text-warm-blue transition-colors">
                                    Documentation
                                </Link>
                                <Link href="https://discord.gg/apply" className="font-semibold text-warm-pink hover:text-warm-blue transition-colors">
                                    Support Server <FaDiscord className="inline-block ml-1" />
                                </Link>
                            </nav>
                        </div>

                        <div>
                            <h6 className="font-extrabold text-2xl text-white mb-4">Legal</h6>
                            <nav className="flex flex-col gap-2">
                                <Link href="/terms" className="font-semibold text-warm-pink hover:text-warm-blue transition-colors">
                                    Terms
                                </Link>
                                <Link href="/privacy" className="font-semibold text-warm-pink hover:text-warm-blue transition-colors">
                                    Privacy
                                </Link>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <h6 className="font-extrabold text-2xl text-white mb-4">Follow Us</h6>
                        <div className="flex space-x-4">
                            <Link href="https://discord.gg/apply" target="_blank" rel="noopener noreferrer">
                                <Image src="https://r2.warm.lat/discord.svg" alt="Discord" width={30} height={30} style={{ filter: 'brightness(0) saturate(100%) hue-rotate(200deg)' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}