"use client"

import { motion } from "framer-motion"
import {
    Shield,
    Music,
    Terminal,
    Settings,
    Sparkles,
    MessageSquare,
    Gamepad2,
    HeartHandshake
} from "lucide-react"
import { FaLastfm } from "react-icons/fa"
import Card from "@/components/ui/Card"
import Container from "@/components/ui/Container"
import Section from "@/components/ui/Section"

const features = [
    {
        icon: Shield,
        title: "Moderation",
        description: "Advanced moderation and auto-moderation tools",
        commands: ["ban", "timeout", "purge", "warn"]
    },
    {
        icon: Settings,
        title: "Utility",
        description: "Essential server management features",
        commands: ["userinfo", "role", "embed", "poll"]
    },
    {
        icon: Music,
        title: "Audio",
        description: "High quality music with filters & effects",
        commands: ["play", "queue", "filter", "247"]
    },
    {
        icon: MessageSquare,
        title: "Social",
        description: "Engage your community with social features",
        commands: ["profile", "rep", "marry", "daily"]
    },
    {
        icon: Gamepad2,
        title: "Fun",
        description: "Interactive games and entertainment",
        commands: ["meme", "8ball", "rps", "slots"]
    },
    {
        icon: HeartHandshake,
        title: "Roleplay",
        description: "Express yourself with roleplay actions",
        commands: ["hug", "pat", "kiss", "slap"]
    },
    {
        icon: FaLastfm,
        title: "LastFM",
        description: "Track and share your music taste",
        commands: ["fm", "taste", "artist", "top"]
    },
    {
        icon: Sparkles,
        title: "Economy",
        description: "Virtual currency and trading system",
        commands: ["balance", "work", "shop", "inv"]
    }
]

export default function FeaturesSection() {
    return (
        <Section>
            <Container>
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Core Features
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 text-xl">
                        Everything you need in one bot
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <Card key={i} className="group">
                            <div className="mb-4">
                                <feature.icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-white/60 text-sm mb-4">{feature.description}</p>
                            <div className="grid grid-cols-2 gap-2">
                                {feature.commands.map((cmd, j) => (
                                    <div
                                        key={j}
                                        className="text-sm bg-black/20 rounded px-3 py-2 text-white/40 group-hover:text-white/50 transition-colors">
                                        ,{cmd}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <motion.a
                        href="/commands"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}>
                        <span>Explore all commands</span>
                        <span className="text-lg">→</span>
                    </motion.a>
                </div>
            </Container>
        </Section>
    )
}
