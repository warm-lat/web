"use client"
import { motion } from "framer-motion"
import { Bot, ChevronDown, Gift, Music, Shield, Wallet, FileText, Code } from "lucide-react"
import Link from "next/link"
import { useCallback, useRef, useState } from "react"

interface NavItemProps {
    label: string
    destination: string
    isActive: boolean
}

const NavItem: React.FC<NavItemProps> = ({ label, destination, isActive }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const clearTimeoutRef = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }

    const handleMouseEnter = useCallback(() => {
        clearTimeoutRef()
        setShowDropdown(true)
    }, [])

    const handleMouseLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setShowDropdown(false)
        }, 150)
    }, [])

    if (label === "Features") {
        return (
            <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <button className="px-4 py-2 rounded-lg font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1">
                    {label}
                    <ChevronDown className="w-4 h-4" />
                </button>

                {showDropdown && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                            className="w-[800px] bg-[#0A0A0B]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-4 grid grid-cols-[300px,1fr] gap-4">
                                <Link
                                    href="/features/moderation"
                                    className="flex flex-col justify-between h-full p-5 rounded-xl hover:bg-white/5 transition-all group">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 rounded-lg bg-blue-400/10 group-hover:bg-blue-400/20 transition-colors">
                                                <Shield className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div className="font-semibold text-white">Moderation</div>
                                        </div>
                                        <p className="text-sm text-white/60 leading-relaxed">
                                            Advanced auto-moderation system with customizable
                                            filters, anti-spam, and content detection
                                        </p>
                                    </div>
                                    <div className="text-sm text-white/50 mt-4">
                                        Protect your server with advanced filters and automated
                                        actions
                                    </div>
                                </Link>

                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        href="/features/voice"
                                        className="p-4 rounded-xl hover:bg-white/5 transition-all group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-1.5 rounded-lg bg-purple-400/10 group-hover:bg-purple-400/20 transition-colors">
                                                <Music className="w-4 h-4 text-purple-400" />
                                            </div>
                                            <div className="font-medium text-white text-sm">
                                                Music Player
                                            </div>
                                        </div>
                                        <p className="text-xs text-white/60">
                                            High quality music with playlist support
                                        </p>
                                    </Link>

                                    <Link
                                        href="/features/economy"
                                        className="p-4 rounded-xl hover:bg-white/5 transition-all group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-1.5 rounded-lg bg-green-400/10 group-hover:bg-green-400/20 transition-colors">
                                                <Wallet className="w-4 h-4 text-green-400" />
                                            </div>
                                            <div className="font-medium text-white text-sm">Economy</div>
                                        </div>
                                        <p className="text-xs text-white/60">
                                            Complete economy system with businesses
                                        </p>
                                    </Link>

                                    <Link
                                        href="/features/giveaway"
                                        className="p-4 rounded-xl hover:bg-white/5 transition-all group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-1.5 rounded-lg bg-yellow-400/10 group-hover:bg-yellow-400/20 transition-colors">
                                                <Gift className="w-4 h-4 text-yellow-400" />
                                            </div>
                                            <div className="font-medium text-white text-sm">Giveaways</div>
                                        </div>
                                        <p className="text-xs text-white/60">
                                            Easy to use giveaway system
                                        </p>
                                    </Link>

                                    <Link
                                        href="/features/welcome"
                                        className="p-4 rounded-xl hover:bg-white/5 transition-all group">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-1.5 rounded-lg bg-red-400/10 group-hover:bg-red-400/20 transition-colors">
                                                <Bot className="w-4 h-4 text-red-400" />
                                            </div>
                                            <div className="font-medium text-white text-sm">Welcome</div>
                                        </div>
                                        <p className="text-xs text-white/60">
                                            Customizable welcome messages
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        )
    }

    if (label === "Tools") {
        return (
            <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <button className="px-4 py-2 rounded-lg font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1">
                    {label}
                    <ChevronDown className="w-4 h-4" />
                </button>

                {showDropdown && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                            className="w-[400px] bg-[#0A0A0B]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-4 space-y-2">
                                <Link
                                    href="/embed"
                                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-all group">
                                    <div className="p-2 rounded-lg bg-blue-400/10 group-hover:bg-blue-400/20 transition-colors">
                                        <Code className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Embed Builder</div>
                                        <p className="text-sm text-white/60">Create beautiful embeds for your server</p>
                                    </div>
                                </Link>

                                <a
                                    href="https://docs.warm.lat"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/5 transition-all group">
                                    <div className="p-2 rounded-lg bg-purple-400/10 group-hover:bg-purple-400/20 transition-colors">
                                        <FileText className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">Documentation</div>
                                        <p className="text-sm text-white/60">Learn how to use Warm</p>
                                    </div>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <Link href={destination} className={`px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'text-white bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
            {label}
        </Link>
    )
}

export default NavItem
