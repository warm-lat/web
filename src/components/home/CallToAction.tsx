"use client";

import { motion } from "framer-motion";
import { RiRobot2Line, RiDiscordLine } from "react-icons/ri";

const CallToAction = () => {
	return (
		<div className="py-32 border-t border-white/10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
						Ready to enhance your Discord server?
					</h2>
					<p className="text-white/50 text-xl mb-10 leading-relaxed">
						Join thousands of users already using Warm
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<motion.a
							href="/invite"
							className="group px-8 py-4 bg-white text-black rounded-xl font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<RiRobot2Line className="w-5 h-5" />
							Add to Discord
							<motion.span
								className="inline-block"
								initial={{ x: 0 }}
								whileHover={{ x: 3 }}
							>
								→
							</motion.span>
						</motion.a>
						<motion.a
							href="https://discord.gg/apply"
							target="_blank"
							className="group px-8 py-4 bg-[#5865F2] text-white rounded-xl font-semibold hover:bg-[#4752C4] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<RiDiscordLine className="w-5 h-5" />
							Join our Discord
						</motion.a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CallToAction;
