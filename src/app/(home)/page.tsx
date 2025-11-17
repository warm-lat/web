"use client"

import { MeshGradient } from "@/components/(global)/GradientMesh"
import HeroSection from "@/components/home/HeroSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import StatsSection from "@/components/home/StatsSection"
import { useEffect, useState } from "react"

interface Stats {
    users: number
    guilds: number
}

let cachedStats: Stats | null = null
let lastFetchTime: number | null = null
const CACHE_DURATION = 5 * 60 * 1000

export default function HomePage() {
    const [stats, setStats] = useState<Stats>({ users: 0, guilds: 0 })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                if (
                    cachedStats &&
                    lastFetchTime &&
                    Date.now() - lastFetchTime < CACHE_DURATION
                ) {
                    setStats(cachedStats)
                    return
                }

                const response = await fetch("https://api.warm.lat/status", {
                    headers: { "User-Agent": "warm-web/1.0.0" }
                })

                if (!response.ok) throw new Error(`API returned ${response.status}`)

                const data = await response.json()
                cachedStats = {
                    users: data.shards.reduce(
                        (acc: number, shard: any) =>
                            acc + parseInt(shard.users.replace(/,/g, "")),
                        0
                    ),
                    guilds: data.shards.reduce(
                        (acc: number, shard: any) => acc + parseInt(shard.guilds),
                        0
                    )
                }
                lastFetchTime = Date.now()
                setStats(cachedStats)
            } catch (error) {
                console.error("Failed to fetch stats:", error)
            }
        }
        fetchStats()
    }, [])

    return (
        <div className="relative w-full overflow-x-hidden">
            {/* Noise texture */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat"
                }}
            />

            {/* Gradient overlay */}
            <div
                className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-zinc-400/5"
                style={{ mixBlendMode: "overlay" }}
            />

            {/* Mesh gradient background */}
            <MeshGradient />

            {/* Content */}
            <div className="relative z-10">
                <HeroSection />
                <FeaturesSection />
                <StatsSection stats={stats} />
            </div>
        </div>
    )
}
