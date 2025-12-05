"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Hero = ({ stats }: { stats: { users: number; guilds: number } }) => {
	return (
		<div className="relative flex items-center justify-center mb-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-16">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
				>
					<motion.div
						className="md:col-span-1 flex justify-center md:justify-start"
						initial={{ scale: 0, opacity: -30 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.8 }}
					>
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
							className="relative w-44 h-44 md:w-56 md:h-56 rounded-3xl overflow-hidden drop-shadow-2xl ring-1 ring-white/6 bg-gradient-to-br from-white/3 to-transparent"
						>
							<Image
								src="https://r2.warm.lat/pfp.jpg"
								alt="Warm"
								fill
								sizes="176px"
								className="object-cover"
								priority
							/>
						</motion.div>
					</motion.div>

					<motion.div
						className="md:col-span-2 text-center md:text-left"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.1 }}
					>
						<motion.div
							initial={{ scale: 0.98 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.6 }}
						>
							<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
								<span className="text-white">The Ultimate</span>
								<br />
								<span className="text-white/60">Discord Experience</span>
							</h1>
							<p className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed">
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

							<div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
								<a
									href="/invite"
									className="px-8 py-3.5 bg-white text-black rounded-xl font-semibold hover:bg-white/90 transition-all text-center shadow-lg hover:shadow-xl"
								>
									Add to Discord
								</a>
								<a
									href="/commands"
									className="px-8 py-3.5 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 border border-white/10 transition-all text-center"
								>
									View Commands
								</a>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default Hero;
