"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaLastfm, FaGlobe } from "react-icons/fa";

const Integrations = () => {
	return (
		<div className="relative py-24 -mx-[calc((100vw-100%)/2)] bg-[#0e0d0d]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold mb-4 text-white">
						Seamless Integrations
					</h2>
					<p className="text-white/50 text-xl">
						Connect your favorite services with Warm
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Spotify Integration */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
					>
						<div className="relative z-10">
							<div className="flex items-center gap-2 mb-3">
								<div className="w-6 h-6 rounded-full overflow-hidden">
									<Image
										src="https://r2.warm.lat/4ceb92e8a8cef28db35b240dae90a4e7.png"
										alt="Spotify"
										width={24}
										height={24}
										className="object-cover"
									/>
								</div>
								<span className="text-white text-sm">Spotify Integration</span>
							</div>
							<p className="text-white/60 text-sm mb-6">
								Control your Spotify playback directly from Discord.
							</p>
						</div>
					</motion.div>

					{/* Last.fm Integration */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
					>
						<div className="relative z-10">
							<div className="flex items-center gap-4 mb-6">
								<FaLastfm className="w-8 h-8 text-white/60" />
								<h3 className="text-xl font-semibold text-white">
									Last.fm Integration
								</h3>
							</div>
							<p className="text-white/60 text-sm mb-6">
								Scrobble tracks and sync your music history.
							</p>
						</div>
					</motion.div>

					{/* Web Dashboard */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="lg:col-span-2 group relative bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
					>
						<div className="relative z-10">
							<div className="flex items-center gap-4 mb-6">
								<FaGlobe className="w-8 h-8 text-white/60" />
								<h3 className="text-xl font-semibold text-white">
									Web Dashboard
								</h3>
							</div>
							<p className="text-white/60 text-sm">
								Manage your server with our beautiful and intuitive web
								dashboard.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Integrations;
