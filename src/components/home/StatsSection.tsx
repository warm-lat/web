"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FaServer, FaUsers } from "react-icons/fa"
import { HiOutlineStatusOnline } from "react-icons/hi"
import { IoTerminal } from "react-icons/io5"
import { RiDiscordLine, RiRobot2Line } from "react-icons/ri"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

interface Props {
    stats: { users: number; guilds: number }
}

const statsData = [
    { icon: FaServer, label: "Active Servers", value: "guilds" as const, color: "purple" },
    { icon: FaUsers, label: "Total Users", value: "users" as const, color: "blue" },
    { icon: IoTerminal, label: "Commands", value: "1,000+", color: "green" },
    { icon: HiOutlineStatusOnline, label: "Uptime", value: "99.9%", color: "red" }
]

export default function StatsSection({ stats }: Props) {
    return (
        <Section className="border-t border-white/10">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="grid grid-cols-2 gap-6">
                        {statsData.map((stat, i) => (
                            <Card
                                key={i}
                                className="group"
                                gradient>
                                <div className="flex items-center gap-3 mb-2">
                                    <stat.icon className="w-5 h-5 text-white/40" />
                                    <div className="text-3xl font-bold text-white">
                                        {typeof stat.value === "string"
                                            ? stat.value
                                            : stats[stat.value].toLocaleString()}
                                    </div>
                                </div>
                                <div className="text-sm text-white/40">{stat.label}</div>
                            </Card>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="lg:pl-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to enhance your Discord server?
                        </h2>
                        <p className="text-white/50 text-xl mb-10 leading-relaxed">
                            Join hundreds of servers already using Warm
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/invite">
                                <Button size="lg" className="w-full sm:w-auto">
                                    <RiRobot2Line className="w-5 h-5" />
                                    Add to Discord
                                    <motion.span
                                        className="inline-block"
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 3 }}>
                                        →
                                    </motion.span>
                                </Button>
                            </Link>
                            <Link href="https://discord.gg/apply" target="_blank">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#4752C4] border-none">
                                    <RiDiscordLine className="w-5 h-5" />
                                    Join our Discord
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    )
}
