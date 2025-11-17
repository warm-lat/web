"use client"

import Image from "next/image"
import Link from "next/link"
import { FaDiscord } from "react-icons/fa"

const footerLinks = {
    bot: [
        { label: "Invite", href: "/invite" },
        { label: "Documentation", href: "https://docs.warm.lat/" },
        { label: "Support Server", href: "https://discord.gg/apply" }
    ],
    legal: [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" }
    ]
}

export const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-[#0A0A0B]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2">
                        <Link href="/" className="block mb-6 w-fit">
                            <Image
                                src="https://r2.warm.lat/pfp.jpg"
                                alt="warm"
                                width={56}
                                height={56}
                                className="rounded-xl"
                            />
                        </Link>
                        <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                            Copyright {new Date().getFullYear()}{" "}
                            <Link
                                href="https://azron.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/60 hover:text-white transition-colors">
                                Azron LLC
                            </Link>
                            . All rights reserved.
                            <br />
                            Maintained by{" "}
                            <Link
                                href="https://fakecrime.bio/^"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/60 hover:text-white transition-colors">
                                Nxyy
                            </Link>
                        </p>
                    </div>

                    <div>
                        <h6 className="font-semibold text-sm text-white mb-4">Bot</h6>
                        <nav className="flex flex-col gap-3">
                            {footerLinks.bot.map(link => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-white/60 hover:text-white transition-colors text-sm">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h6 className="font-semibold text-sm text-white mb-4">Legal</h6>
                        <nav className="flex flex-col gap-3">
                            {footerLinks.legal.map(link => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-white/60 hover:text-white transition-colors text-sm">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-8">
                            <h6 className="font-semibold text-sm text-white mb-4">Follow Us</h6>
                            <Link
                                href="https://discord.gg/apply"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex text-white/60 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                                <FaDiscord size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}