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
            className={`${isCommandsPage || isAvatarsPage || isHomePage || isPurchasePage || isApplyPage || isVerifyPage || isFeaturesPage ? "" : "mt-[30vh]"} border-t border-white/10 bg-[#0A0A0B] footer pb-10`}>
            <div className="flex w-full py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="block mb-6">
                            <Image
                                src="https://r2.warm.lat/pfp.jpg"
                                alt="warm"
                                width={64}
                                height={64}
                                className="rounded-xl"
                            />
                        </Link>
                        <p className="text-white/40 text-sm text-center md:text-left max-w-xs leading-relaxed">
                            Copyright {new Date().getFullYear()} {""}
                            <Link 
                                href="https://azron.net"
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                Azron LLC
                            </Link>
                            . All rights reserved.
                            <br />
                            Maintained by {" "}
                            <Link 
                                href="https://fakecrime.bio/^"
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                Nxyy
                            </Link>
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                        <div>
                            <h6 className="font-semibold text-sm text-white mb-4 uppercase tracking-wider">Bot</h6>
                            <nav className="flex flex-col gap-3">
                                <Link href="/invite" className="text-white/60 hover:text-white transition-colors text-sm">
                                    Invite
                                </Link>
                                <Link href="https://docs.warm.lat/" className="text-white/60 hover:text-white transition-colors text-sm">
                                    Documentation
                                </Link>
                                <Link href="https://discord.gg/apply" className="text-white/60 hover:text-white transition-colors text-sm">
                                    Support Server
                                </Link>
                            </nav>
                        </div>

                        <div>
                            <h6 className="font-semibold text-sm text-white mb-4 uppercase tracking-wider">Legal</h6>
                            <nav className="flex flex-col gap-3">
                                <Link href="/terms" className="text-white/60 hover:text-white transition-colors text-sm">
                                    Terms
                                </Link>
                                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors text-sm">
                                    Privacy
                                </Link>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <h6 className="font-semibold text-sm text-white mb-4 uppercase tracking-wider">Follow Us</h6>
                        <div className="flex space-x-4">
                            <Link href="https://discord.gg/apply" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                                <FaDiscord size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}