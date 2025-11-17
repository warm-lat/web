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
                isActive: pathname === "/commands"
            },
            {
                label: "Status",
                destination: "/status",
                isActive: pathname === "/status"
            }
        ],
        [pathname]
    )

    return (
        <nav className="w-full bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <Image
                                src="https://r2.warm.lat/pfp.jpg"
                                alt="warm"
                                width={36}
                                height={36}
                                className="rounded-xl transition-transform group-hover:scale-105"
                            />
                        </div>
                        <h1 className="text-xl font-semibold text-white">warm</h1>
                    </Link>
                    <div className="hidden lg:flex items-center gap-1">
                        {routes.map(item => (
                            <NavItem
                                key={item.label}
                                label={item.label}
                                destination={item.destination}
                                isActive={item.isActive}
                            />
                        ))}
                    </div>
                    <UserMenu />
                </div>
            </div>
            {children}
        </nav>
    )
}
