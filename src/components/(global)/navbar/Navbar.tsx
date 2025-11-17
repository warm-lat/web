"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import NavItem from "./NavItem"
import UserMenu from "./UserMenu"

interface NavbarProps {
    children?: React.ReactNode
}

export default function Navbar({ children }: NavbarProps) {
    const pathname = usePathname()
    const isCommandsPage = pathname === "/commands"
    const isAvatarsPage = pathname.startsWith("/avatars/")
    const isPurchasePage = pathname === "/purchase"
    const isDashboardPage = pathname === "/dashboard"
    const isBillingPage = pathname === "/dashboard/billing"
    const isApplyPage = pathname === "/apply"
    const isProfilePage = pathname.startsWith("/@")
    const isVerifyPage = pathname.startsWith("/verify/")
    const isFeaturesPage = pathname.startsWith("/features/")
    const isEmbedPage = pathname === "/embed"

    const shouldReducePadding =
        isCommandsPage ||
        isAvatarsPage ||
        isPurchasePage ||
        isDashboardPage ||
        isBillingPage ||
        isApplyPage ||
        isProfilePage ||
        isVerifyPage ||
        isFeaturesPage ||
        isEmbedPage

    const routes = useMemo(
        () => [
            {
                label: "Features",
                destination: "#",
                isActive: pathname.startsWith("/features")
            },
            {
                label: "Tools",
                destination: "#",
                isActive: pathname.startsWith("/tools")
            },
            {
                label: "Commands",
                destination: "/commands",
                isActive: pathname == "/commands"
            },
            {
                label: "Status",
                destination: "/status",
                isActive: pathname == "/status"
            }
        ],
        [pathname]
    )

    return (
        <div className="w-full bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
            <div className="2xl:container 2xl:mx-auto px-10 md:px-[8vw] 2xl:px-52 py-5">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <Image
                                src={"https://r2.warm.lat/pfp.jpg"}
                                alt="warm"
                                width={32}
                                height={32}
                                className="rounded-xl transition-transform group-hover:scale-105"
                            />
                        </div>
                        <h1 className="text-2xl font-semibold text-white transition-colors">
                            warm
                        </h1>
                    </Link>
                    <nav className="hidden lg:flex items-center space-x-1">
                        {routes.map(item => (
                            <NavItem
                                key={item.label}
                                label={item.label}
                                destination={item.destination}
                                isActive={item.isActive}
                            />
                        ))}
                    </nav>
                    <UserMenu />
                </div>
            </div>
            {children && (
                <div
                    className={`2xl:container 2xl:mx-auto px-12 2xl:px-52 ${shouldReducePadding ? "py-2" : "py-4 mt-8"}`}>
                    {children}
                </div>
            )}
        </div>
    )
}
