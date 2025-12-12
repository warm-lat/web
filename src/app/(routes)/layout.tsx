import "@/styles/globals.css"
import type { Metadata, Viewport } from "next"
import { Manrope } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { Footer } from "@/components/(global)/Footer"
import Navbar from "@/components/(global)/Header/Navbar"
import { Suspense } from "react"
import Loading from "./loading"
import { LayoutWrapper } from "@/app/(routes)/layoutWrapper"
import { headers } from 'next/headers'

const manrope = Manrope({ subsets: ["latin"] })

export const viewport: Viewport = {
    themeColor: "transparent"
}

export const metadata: Metadata = {
    title: "warm",
    description: "The only aesthetic multi-functional Discord bot you need.",
    twitter: {
        site: "https://warm.lat/",
        card: "player"
    },
    openGraph: {
        url: "https://warm.lat/",
        type: "website",
        title: "warm",
        siteName: "warm.lat",
        description: "The only aesthetic multi-functional Discord bot you need.",
        images: [
            {
                url: "https://r2.warm.lat/pfp.jpg",
                width: 500,
                height: 500,
                alt: "warm"
            }
        ]
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const headersList = headers()
    const pathname = headersList.get("x-pathname") || ""
    const paths = ["/dashboard", "/status", "/commands"];
    
    if (paths.some((path) => pathname.startsWith(path))) {
        return (
            <html lang="en" className="bg-black">
                <body className={`font-satoshi flex flex-col min-h-screen justify-between bg-black`}>
                    {children}
                </body>
            </html>
        )
    }

    return (
        <html lang="en" className="bg-black">
            <body className={`${manrope.className} font-satoshi flex flex-col min-h-screen justify-between bg-black`}>
                    <LayoutWrapper>{children}</LayoutWrapper>
            </body>
        </html>
    )
}