"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Button from "@/components/ui/Button"

interface Stats {
    users: number
    guilds: number
}

let cachedStats: Stats | null = null
let lastFetchTime: number | null = null
const CACHE_DURATION = 5 * 60 * 1000

export default function HeroSection() {
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
        <section className="relative min-h-[80vh] flex items-center justify-center py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="md:col-span-1 flex justify-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative w-48 h-48 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                            <Image
                                src="https://r2.warm.lat/pfp.jpg"
                                alt="Warm"
                                fill
                                sizes="192px"
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:col-span-2 text-center md:text-left">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                            <span className="text-white">The Ultimate</span>
                            <br />
                            <span className="text-white/60">Discord Experience</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/50 max-w-2xl mb-8 leading-relaxed">
                            Powering{" "}
                            <span className="text-white font-semibold">
                                {stats.guilds.toLocaleString()}
                            </span>{" "}
                            servers and serving{" "}
                            <span className="text-white font-semibold">
                                {stats.users.toLocaleString()}
                            </span>{" "}
                            users with advanced moderation, music, and utility features.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/invite">
                                <Button size="lg">Add to Discord</Button>
                            </Link>
                            <Link href="/commands">
                                <Button variant="secondary" size="lg">
                                    View Commands
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
