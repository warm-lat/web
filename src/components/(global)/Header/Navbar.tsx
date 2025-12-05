"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CgClose } from "react-icons/cg";
import { MdMenu } from "react-icons/md";
import NavItem from "./NavItem";
import UserMenu from "./UserMenu";
import { motion } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";

interface NavbarProps {
	children?: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
	const pathname = usePathname();

	const routes = useMemo(
		() => [
			{
				label: "Features",
				destination: "#",
				isActive: pathname.startsWith("/features"),
			},
			{
				label: "Tools",
				destination: "#",
				isActive: pathname.startsWith("/tools"),
			},
			{
				label: "Commands",
				destination: "/commands",
				isActive: pathname === "/commands",
			},
			{
				label: "Status",
				destination: "/status",
				isActive: pathname === "/status",
			},
		],
		[pathname]
	);

	return (
		<nav className="w-full bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center gap-3 group">
						<div className="relative">
							<Image
								src="https://r2.warm.lat/pfp.jpg"
								alt="warm"
								width={36}
								height={36}
								className="rounded-xl transition-transform group-hover:scale-105"
							/>
						</div>
						<h1 className="text-xl font-semibold text-white">warm</h1>
					</Link>
					<div className="hidden lg:flex items-center gap-1">
						{routes.map((item) => (
							<NavItem
								key={item.label}
								label={item.label}
								destination={item.destination}
								isActive={item.isActive}
							/>
						))}
					</div>
					<UserMenu />
				</div>
			</div>
			{children}
		</nav>
	);
}

const UserMenu = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [mounted, setMounted] = useState(false);
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
	const [showBetaPopup, setShowBetaPopup] = useState(false);

	useEffect(() => {
		setMounted(true);
		if (pathname === "/") {
			setShowBetaPopup(localStorage.getItem("betaPopupDismissed") !== "true");
		}
	}, [pathname]);

	useEffect(() => {
		if (mounted) {
			if (pathname === "/") {
				setShowBetaPopup(localStorage.getItem("betaPopupDismissed") !== "true");
			} else {
				setShowBetaPopup(false);
			}
		}
	}, [pathname, mounted]);

	const dismissPopup = () => {
		setShowBetaPopup(false);
		localStorage.setItem("betaPopupDismissed", "true");
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 1025) {
				setIsBurgerMenuOpen(false);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			{showBetaPopup && (
				<>
					<div
						className="fixed inset-0 bg-black bg-opacity-50 z-[50000] backdrop-blur-sm"
						onClick={dismissPopup}
					/>
					<div className="fixed inset-0 z-[50001] flex items-center justify-center">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className="bg-[#0A0A0B]/95 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-md mx-4"
						>
							<div className="flex justify-between items-start mb-6">
								<div className="bg-white/10 p-3 rounded-xl">
									<Sparkles className="w-6 h-6 text-white" />
								</div>
								<button
									onClick={dismissPopup}
									className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
								>
									<CgClose size={20} />
								</button>
							</div>
							<h2 className="text-2xl font-bold text-white mb-3">
								Dashboard Beta
							</h2>
							<p className="text-white/60 mb-6 leading-relaxed">
								We're excited to announce that our dashboard is currently in
								beta testing! Apply now to be among the first to experience it.
							</p>
							<div className="flex gap-3">
								<button
									onClick={() => {
										dismissPopup();
										router.push("/apply");
									}}
									className="flex-1 bg-white text-black px-5 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg"
								>
									Join Beta
								</button>
								<button
									onClick={dismissPopup}
									className="px-5 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-all rounded-xl font-medium"
								>
									Maybe Later
								</button>
							</div>
						</motion.div>
					</div>
				</>
			)}

			{isBurgerMenuOpen && (
				<>
					<div
						className="fixed inset-0 bg-black bg-opacity-50 z-[50000] backdrop-blur-sm"
						onClick={() => setIsBurgerMenuOpen(false)}
					/>
					<BurgerMenu onClose={() => setIsBurgerMenuOpen(false)} />
				</>
			)}
			<div className="flex flex-row items-center justify-center space-x-4">
				<div className="block lg:hidden">
					<MdMenu
						size={32}
						className="hover:cursor-pointer hover:text-warm-pink"
						onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
					/>
				</div>
				<button
					onClick={() => router.push("/dashboard")}
					className="bg-white/10 hover:bg-white/15 px-4 sm:px-6 py-2.5 flex items-center space-x-2 rounded-xl font-semibold text-sm transition-all duration-200 text-white border border-white/10"
				>
					<Sparkles className="w-4 h-4" />
					<span>Dashboard</span>
				</button>
			</div>
		</>
	);
};

const BurgerMenu = ({ onClose }: { onClose: () => void }) => {
	const pathname = usePathname();
	const routes = useMemo(
		() => [
			{
				label: "Commands",
				destination: "/commands",
				isActive: pathname == "/commands",
			},
			{
				label: "Embeds",
				destination: "/embeds",
				isActive: pathname == "/embeds",
			},
			{
				label: "Docs",
				destination: "https://docs.warm.lat",
				isActive: pathname == "https://docs.warm.lat",
			},
			{
				label: "Invite",
				destination: "/invite",
				isActive: pathname == "/invite",
			},
			{
				label: "Status",
				destination: "/status",
				isActive: pathname == "/status",
			},
		],
		[pathname]
	);
	return (
		<>
			<div className="fixed inset-0 z-[9999999999] flex items-center justify-center">
				<motion.div
					initial={{ opacity: 0, y: 40, scale: 0.9 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{
						ease: "easeOut",
						duration: 0.2,
					}}
					className="bg-[#0A0A0B]/95 backdrop-blur-xl border border-white/10 -mt-40 w-[90%] px-2 rounded-2xl shadow-2xl"
				>
					<div className="flex flex-row justify-between items-center gap-6 pt-8 px-6">
						<h1 className="font-bold text-white text-3xl tracking-tight">
							Menu
						</h1>
						<button
							onClick={onClose}
							className="p-2 hover:bg-white/5 rounded-lg transition-colors"
						>
							<CgClose size={24} className="text-white/60 hover:text-white" />
						</button>
					</div>
					<div className="flex flex-col gap-3 px-6 pt-8 pb-8">
						{routes.map((route) => {
							return (
								<Link
									href={route.destination}
									key={route.label}
									onClick={onClose}
									className={`flex items-center h-14 px-5 rounded-xl transition-all ${
										route.isActive
											? "text-white bg-white/10 border border-white/10"
											: "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
									}`}
								>
									<span className="text-base font-medium">{route.label}</span>
								</Link>
							);
						})}
					</div>
				</motion.div>
			</div>
		</>
	);
};

