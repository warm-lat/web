"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
	return (
		<motion.div
			key="splash"
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="fixed inset-0 flex items-center justify-center bg-[#0A0A0A] z-[100]"
		>
			<div className="flex flex-col items-center">
				<motion.h1
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="text-5xl font-black tracking-tighter bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 bg-clip-text text-transparent"
				>
					warm
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.6,
						delay: 0.3,
						ease: "easeInOut",
					}}
					className="mt-4 text-lg text-yellow-400"
				>
					Loading...
				</motion.p>
			</div>
		</motion.div>
	);
}

