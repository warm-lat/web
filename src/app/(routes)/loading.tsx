"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Loading() {
	const pathname = usePathname();

	return (
		<div className="fixed inset-0 flex min-h-screen justify-center flex-col items-center bg-[#776dd4] z-[99]">
			<motion.div
				initial={{ y: 200, opacity: 0 }}
				animate={{ y: -50, opacity: 1 }}
				transition={{
					type: "spring",
					stiffness: 100,
					damping: 20,
					duration: 1,
				}}
				className="rounded-2xl"
			>
				<Image
					src={"https://r2.warm.lat/pfp.jpg"}
					alt="warm"
					width={300}
					height={300}
					className="rounded-2xl"
				/>
			</motion.div>
			<motion.p
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.5, // Delays the text animation until the profile finishes moving
					duration: 0.8,
					ease: "easeInOut",
				}}
				className="mt-6 text-white text-lg font-medium"
			>
				Loading <span className="font-bold">{pathname}</span>...
			</motion.p>
		</div>
	);
}

