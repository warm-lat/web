"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Integrations from "@/components/home/Integrations";
import CoreCommands from "@/components/home/CoreCommands";
import CallToAction from "@/components/home/CallToAction";

let cachedStats: any = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

const HomePage = () => {
	const [stats, setStats] = useState({ users: 0, guilds: 0 });

	useEffect(() => {
		const fetchStats = async () => {
			try {
				if (
					cachedStats &&
					lastFetchTime &&
					Date.now() - lastFetchTime < CACHE_DURATION
				) {
					setStats(cachedStats);
					return;
				}

				const response = await fetch(`https://api.warm.lat/bot/status`, {
					headers: {
						"User-Agent": "warm-web/1.0.0",
					},
				});
				if (!response.ok) throw new Error(`API returned ${response.status}`);

				const data = await response.json();
				cachedStats = {
					users: data.total_users,
					guilds: data.total_guilds,
				};
				lastFetchTime = Date.now();
				setStats(cachedStats);
			} catch (error) {
				console.error("Failed to fetch stats:", error);
			}
		};
		fetchStats();
	}, []);

	return (
		<div className="relative w-full overflow-x-hidden">
			
			<Hero stats={stats} />
			<Features />
			<Integrations />
            <CoreCommands />
            <CallToAction />
		</div>
	);
};

export default HomePage;

