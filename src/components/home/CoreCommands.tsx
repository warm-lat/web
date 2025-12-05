"use client";

import { motion } from "framer-motion";
import {
	Shield,
	Settings,
	Music,
	MessageSquare,
	Gamepad2,
	HeartHandshake,
	Sparkles,
} from "lucide-react";
import { FaLastfm } from "react-icons/fa";

const CoreCommands = () => {
	const categories = [
		{
			icon: Shield,
			title: "Moderation",
			description: "Advanced moderation and auto-moderation tools",
			commands: ["ban", "timeout", "purge", "warn"],
		},
		{
			icon: Settings,
			title: "Utility",
			description: "Essential server management features",
			commands: ["userinfo", "role", "embed", "poll"],
		},
		{
			icon: Music,
			title: "Audio",
			description: "High quality music with filters & effects",
			commands: ["play", "queue", "filter", "247"],
		},
		{
			icon: MessageSquare,
			title: "Social",
			description: "Engage your community with social features",
			commands: ["profile", "rep", "marry", "daily"],
		},
		{
			icon: Gamepad2,
			title: "Fun",
			description: "Interactive games and entertainment",
			commands: ["meme", "8ball", "rps", "slots"],
		},
		{
			icon: HeartHandshake,
			title: "Roleplay",
			description: "Express yourself with roleplay actions",
			commands: ["hug", "pat", "kiss", "slap"],
		},
		{
			icon: FaLastfm,
			title: "LastFM",
			description: "Track and share your music taste",
			commands: ["fm", "taste", "artist", "top"],
		},
		{
			icon: Sparkles,
			title: "Economy",
			description: "Virtual currency and trading system",
			commands: ["balance", "work", "shop", "inv"],
		},
	];

	return (
		<div className="py-32 border-t border-white/10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-4 text-white">Core Features</h2>
					<p className="text-white/50 text-xl">
						Everything you need in one bot
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{categories.map((category, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: i * 0.1 }}
							className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300"
						>
							<div className="relative z-10">
								<div className="mb-4">
									<category.icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors" />
								</div>
								<h3 className="text-xl font-semibold text-white mb-2">
									{category.title}
								</h3>
								<p className="text-white/60 text-sm mb-4">
									{category.description}
								</p>
								<div className="grid grid-cols-2 gap-2">
									{category.commands.map((cmd, j) => (
										<div
											key={j}
											className="text-sm bg-black/20 rounded px-3 py-2 text-white/40 group-hover:text-white/50 transition-colors"
										>
											,{cmd}
										</div>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CoreCommands;
