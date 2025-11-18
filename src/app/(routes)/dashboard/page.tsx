"use client"

console.log('Dashboard module loading')

import { useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { HiOutlineCog, HiServer } from "react-icons/hi"
import { fetchUserGuilds } from "@/libs/dashboard/guild"
import type { DiscordGuild } from "@/libs/dashboard/guild"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { checkBetaAccess } from "@/libs/dashboard/beta"
import { checkDashboardAuth } from "@/libs/dashboard/auth"

export default function DashboardPage() {
    console.log('Dashboard component rendering')
    const router = useRouter()

    useEffect(() => {
        console.log('Auth effect running')
        const hasAuth = checkDashboardAuth()
        console.log('Has auth:', hasAuth)
        
        if (!hasAuth) {
            console.log('No auth, redirecting')
            router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
        }
    }, [router])

    const { data: betaAccess } = useQuery({
        queryKey: ["beta"],
        queryFn: checkBetaAccess,
        staleTime: 1000 * 60 * 5,
        retry: false
    })

    const { data, isLoading, error } = useQuery({
        queryKey: ["guilds"],
        queryFn: fetchUserGuilds,
        staleTime: 1000 * 60 * 5,
        retry: 1
    })

    useEffect(() => {
        if (error) console.log('Query error:', error)
        if (error instanceof Error && error.message === "Unauthorized") {
            console.log('Unauthorized error, redirecting to login')
            const currentPath = window.location.pathname
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
        }
    }, [error, router])

    useEffect(() => {
        if (betaAccess && !betaAccess.has_access) {
            const currentPath = window.location.pathname
            router.push(`/login?redirect=${encodeURIComponent(currentPath)}`)
        }
    }, [betaAccess, router])

    if (isLoading) {
        return <LoadingSkeleton />
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black/95 flex items-center justify-center">
                <div className="text-red-400">
                    {error instanceof Error ? error.message : "Failed to load dashboard"}
                </div>
            </div>
        )
    }

    const sortGuilds = (guilds: DiscordGuild[]) => {
        return guilds.sort((a, b) => {
            const aCanManage = a.permissions.manage_guild || a.permissions.admin
            const bCanManage = b.permissions.manage_guild || b.permissions.admin
            if (aCanManage && !bCanManage) return -1
            if (!aCanManage && bCanManage) return 1

            if (a.mutual && !b.mutual) return -1
            if (!a.mutual && b.mutual) return 1
            
            return a.name.localeCompare(b.name)
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#0F0F10] to-[#0A0A0B] p-6 md:p-8 lg:p-12">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-8 md:mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-4 md:gap-6"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
                            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-2 ring-white/10">
                                <Image
                                    src={data?.user.avatar ? `https://cdn.discordapp.com/avatars/${data.user.id}/${data.user.avatar}.png` : "/default-avatar.png"}
                                    alt="User avatar"
                                    width={80}
                                    height={80}
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">
                                Welcome back, {data?.user.username}
                            </h1>
                            <p className="text-sm md:text-base text-white/60">
                                Select a server to manage its settings and features
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {data?.guilds && sortGuilds(data.guilds).map((guild, index) => (
                        <motion.div
                            key={guild.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                                          hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden flex flex-col h-full">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 ring-1 ring-white/10">
                                            {guild.icon ? (
                                                <Image
                                                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                                                    alt={guild.name}
                                                    width={56}
                                                    height={56}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <HiServer className="w-7 h-7 text-white/60" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-white mb-1 truncate">{guild.name}</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-white/10 text-white/80">
                                                {guild.owner ? "Owner" : 
                                                 guild.permissions.admin ? "Admin" : 
                                                 guild.permissions.manage_guild ? "Manager" : 
                                                 "Member"}
                                            </span>
                                            {!guild.mutual && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-500/20 text-blue-300">
                                                    Not Added
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-auto">
                                    {guild.mutual ? (
                                        guild.permissions.manage_guild || guild.permissions.admin ? (
                                            <a
                                                href={`/dashboard/${guild.id}`}
                                                className="flex-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 
                                                         text-white h-11 px-4 rounded-xl transition-all duration-200 flex items-center justify-center 
                                                         font-medium text-sm border border-white/10 hover:border-white/20"
                                            >
                                                <span>Manage Server</span>
                                            </a>
                                        ) : (
                                            <div className="flex-1 bg-white/5 text-white/40 h-11 px-4 rounded-xl 
                                                      cursor-not-allowed flex items-center justify-center text-sm font-medium">
                                                No Permission
                                            </div>
                                        )
                                    ) : (
                                        guild.permissions.manage_guild || guild.permissions.admin ? (
                                            <a 
                                                href={`https://discord.com/api/oauth2/authorize?client_id=1420609343283531776&permissions=8&scope=bot&guild_id=${guild.id}`}
                                                className="flex-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 
                                                         text-blue-200 h-11 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 
                                                         font-medium text-sm border border-blue-500/20 hover:border-blue-500/30"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <HiServer className="w-4 h-4" />
                                                Add Bot
                                            </a>
                                        ) : (
                                            <div className="flex-1 bg-white/5 text-white/40 h-11 px-4 rounded-xl 
                                                      cursor-not-allowed flex items-center justify-center text-sm font-medium">
                                                No Permission
                                            </div>
                                        )
                                    )}
                                    {(guild.mutual && (guild.permissions.manage_guild || guild.permissions.admin)) && (
                                        <button className="bg-white/5 hover:bg-white/10 text-white h-11 w-11 rounded-xl 
                                                 transition-colors duration-200 flex items-center justify-center border border-white/10 hover:border-white/20">
                                            <HiOutlineCog className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-purple-500/[0.02] to-transparent 
                                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#0F0F10] to-[#0A0A0B] p-6 md:p-8 lg:p-12">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-8 md:mb-12">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 animate-pulse ring-2 ring-white/10" />
                        <div>
                            <div className="h-8 md:h-10 w-48 md:w-64 bg-white/10 rounded-lg animate-pulse mb-2" />
                            <div className="h-4 w-32 md:w-48 bg-white/10 rounded-lg animate-pulse" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {[1,2,3,4,5,6].map((i) => (
                        <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 animate-pulse">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-14 h-14 rounded-xl bg-white/10" />
                                <div className="flex-1">
                                    <div className="h-4 w-full bg-white/10 rounded mb-2" />
                                    <div className="h-3 w-20 bg-white/10 rounded" />
                                </div>
                            </div>
                            <div className="h-11 bg-white/10 rounded-xl" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}