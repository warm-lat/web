import type { Metadata, Viewport } from "next"
import "../../styles/globals.css"
import Navbar from "@/components/(global)/Header/Navbar"
import { Footer } from "@/components/(global)/Footer"

export const viewport: Viewport = {
    themeColor: "776dd4"
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

export default function warmMain({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`bg-warm-100 font-satoshi`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    )
}
