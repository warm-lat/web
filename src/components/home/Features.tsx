"use client";

import { motion } from "framer-motion";
import {
	HiOutlineShieldCheck,
	HiOutlineMusicNote,
	IoTerminal,
} from "react-icons/hi";

const Features = () => {
	return (
		<div className="relative py-32 -mx-[calc((100vw-100%)/2)]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-20">
					<h2 className="text-5xl font-bold mb-6 text-white tracking-tight">
						Why Choose Warm?
					</h2>
					<p className="text-xl text-white/50">
						Experience the next generation of Discord bots
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full">
					{/* Feature 1 */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-10 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
					>
						<div className="relative z-10 h-full flex flex-col">
							<div className="flex items-center gap-4 mb-6">
								<motion.div
									className="p-4 rounded-xl bg-white/[0.02]"
									whileHover={{ scale: 1.1 }}
									transition={{
										type: "spring",
										stiffness: 400,
										damping: 10,
									}}
								>
									<HiOutlineShieldCheck className="w-10 h-10" />
								</motion.div>
								<h3 className="text-2xl font-semibold text-white">
									Advanced Moderation
								</h3>
							</div>
							<p className="text-white/60 leading-relaxed text-lg">
								Keep your server safe with powerful moderation tools and
								auto-moderation features.
							</p>
						</div>
					</motion.div>

					{/* Feature 2 */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-10 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
					>
						<div className="relative z-10 h-full flex flex-col">
							<div className="flex items-center gap-4 mb-6">
								<motion.div
									className="p-4 rounded-xl bg-white/[0.02]"
									whileHover={{ scale: 1.1 }}
									transition={{
										type: "spring",
										stiffness: 400,
										damping: 10,
									}}
								>
									<HiOutlineMusicNote className="w-10 h-10" />
								</motion.div>
								<h3 className="text-2xl font-semibold text-white">
									Premium Music
								</h3>
							</div>
							<p className="text-white/60 leading-relaxed text-lg">
								High-quality music playback with support for multiple platforms
								including Spotify, YouTube, and SoundCloud.
							</p>
						</div>
					</motion.div>

					{/* Feature 3 */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-10 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
					>
						<div className="relative z-10 h-full flex flex-col">
							<div className="flex items-center gap-4 mb-6">
								<motion.div
									className="p-4 rounded-xl bg-white/[0.02]"
									whileHover={{ scale: 1.1 }}
									transition={{
										type: "spring",
										stiffness: 400,
										damping: 10,
									}}
								>
									<IoTerminal className="w-10 h-10" />
								</motion.div>
								<h3 className="text-2xl font-semibold text-white">
									Smart Commands
								</h3>
							</div>
							<p className="text-white/60 leading-relaxed text-lg">
								Intuitive command system with smart suggestions and
								auto-completion.
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Features;
