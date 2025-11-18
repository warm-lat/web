"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchInvokeHistory } from "@/libs/dashboard/invokes";
import { format, parseISO } from "date-fns";
import {
	BarChart,
	ChevronLeft,
	ChevronRight,
	Hash,
	Search,
	Server,
	Users,
} from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import {
	Area,
	AreaChart,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const TIME_PERIODS = [
	{ label: "7 Days", value: 7 },
	{ label: "14 Days", value: 14 },
	{ label: "30 Days", value: 30 },
];

export default function AdminDashboard() {
	const router = useRouter();
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			router.push("/login");
		},
	});

	const [selectedDays, setSelectedDays] = useState(7);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedGuild, setSelectedGuild] = useState<any>(null);
	const itemsPerPage = 30;

	const {
		data: invokeHistory,
		isPending,
		error,
	} = useQuery({
		queryKey: ["invoke-history"],
		queryFn: fetchInvokeHistory,
		staleTime: 1000 * 60 * 5,
		retry: false,
		enabled: status === "authenticated" && !!session?.user,
	});

	useEffect(() => {
		if (error) {
			console.error("Query error:", error);
			router.push("/");
		}
	}, [error, router]);

	const getTotalCommands = (days: number) => {
		if (!invokeHistory?.statistics.daily) return 0;
		return invokeHistory.statistics.daily
			.slice(0, days)
			.reduce(
				(total, day) =>
					total +
					Object.values(day.commands).reduce((sum, count) => sum + count, 0),
				0
			);
	};

	const calculateChange = (current: number, previous: number) => {
		if (previous === 0) return 0;
		return ((current - previous) / previous) * 100;
	};

	const commandsChange = calculateChange(
		getTotalCommands(7),
		getTotalCommands(14) - getTotalCommands(7)
	);

	const chartData = invokeHistory?.statistics.daily
		.map((day) => ({
			date: day.date,
			total: Object.values(day.commands).reduce((sum, count) => sum + count, 0),
			...day.commands,
		}))
		.reverse();

	const filteredData =
		invokeHistory?.items.filter((item) => {
			const matchesSearch =
				searchQuery === "" ||
				item.command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.guild.name.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesCategory =
				selectedCategory === "" ||
				item.command.category.toLowerCase() === selectedCategory.toLowerCase();

			const matchesGuild =
				!selectedGuild || item.guild.id === selectedGuild.value;

			return matchesSearch && matchesCategory && matchesGuild;
		}) || [];

	const totalPages = Math.ceil(filteredData.length / itemsPerPage);
	const paginatedData = filteredData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const categoryOptions = Array.from(
		new Set(invokeHistory?.items.map((item) => item.command.category))
	).map((category) => ({
		value: category.toLowerCase(),
		label: category,
	}));

	const guildOptions = Array.from(
		new Set(invokeHistory?.items.map((item) => item.guild))
	).map((guild) => ({
		value: guild.id,
		label: guild.name,
	}));

	if (status === "loading" || isPending) {
		return (
			<div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-white border-r-2 border-b-2 border-transparent mb-4"></div>
					<h2 className="text-xl font-semibold text-white">
						Loading command history...
					</h2>
					<p className="text-white/60 mt-2">
						Please wait while we fetch your data
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-[1920px] mx-auto">
			<div className="mb-8 md:mb-12">
				<h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
				<p className="text-sm md:text-base text-white/60">
					Manage and monitor your bot&apos;s performance and analytics
				</p>
			</div>

			<div className="space-y-6 md:space-y-8">
				<div className="flex gap-2 p-1 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl w-fit">
					{TIME_PERIODS.map((period) => (
						<button
							key={period.value}
							onClick={() => setSelectedDays(period.value)}
							className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
								selectedDays === period.value
									? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-white/10"
									: "text-white/60 hover:text-white hover:bg-white/5"
							}`}
						>
							{period.label}
						</button>
					))}
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
					<StatCard
						title="Total Commands"
						value={getTotalCommands(selectedDays)}
						change={commandsChange}
						icon={<Hash className="w-5 h-5" />}
					/>
					<StatCard
						title="Unique Users"
						value={invokeHistory?.statistics.unique_users || 0}
						change={0}
						icon={<Users className="w-5 h-5" />}
					/>
					<StatCard
						title="Active Servers"
						value={invokeHistory?.statistics.active_guilds || 0}
						change={0}
						icon={<Server className="w-5 h-5" />}
					/>
					<StatCard
						title="Categories"
						value={
							Object.keys(invokeHistory?.statistics.by_category || {}).length
						}
						change={0}
						icon={<BarChart className="w-5 h-5" />}
					/>
				</div>

				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
					<div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
						<h3 className="text-base md:text-lg font-semibold text-white mb-6">
							Command Usage Trends
						</h3>
						<div className="h-[250px] md:h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={chartData}>
									<XAxis
										dataKey="date"
										stroke="#666"
										tickFormatter={(date) => format(parseISO(date), "MMM d")}
									/>
									<YAxis stroke="#666" />
									<Tooltip
										contentStyle={{
											backgroundColor: "#1a1a1a",
											border: "1px solid rgba(255,255,255,0.1)",
											borderRadius: "8px",
										}}
										labelStyle={{ color: "#fff" }}
									/>
									<Line
										type="monotone"
										dataKey="total"
										stroke="#8884d8"
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>

					<div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
						<h3 className="text-base md:text-lg font-semibold text-white mb-6">
							Category Distribution
						</h3>
						<div className="h-[250px] md:h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={chartData}>
									<XAxis
										dataKey="date"
										stroke="#666"
										tickFormatter={(date) => format(parseISO(date), "MMM d")}
									/>
									<YAxis stroke="#666" />
									<Tooltip
										contentStyle={{
											backgroundColor: "#1a1a1a",
											border: "1px solid rgba(255,255,255,0.1)",
											borderRadius: "8px",
										}}
										labelStyle={{ color: "#fff" }}
									/>
									{Object.keys(invokeHistory?.statistics.by_category || {})
										.slice(0, 5)
										.map((category, index) => (
											<Area
												key={category}
												type="monotone"
												dataKey={category}
												stackId="1"
												stroke={`hsl(${index * 60}, 70%, 60%)`}
												fill={`hsl(${index * 60}, 70%, 60%, 0.3)`}
											/>
										))}
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>

				<div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
					<div className="p-4 md:p-6 border-b border-white/10 flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
							<input
								type="text"
								placeholder="Search commands or servers..."
								className="w-full bg-white/[0.02] text-sm rounded-xl pl-9 pr-4 h-[42px] border border-white/10 focus:outline-none focus:border-white/20 placeholder-white/40 text-white transition-colors"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<div className="flex flex-col sm:flex-row gap-2">
							<Select
								className="w-full sm:w-[180px]"
								classNames={{
									control: () =>
										"bg-[#0A0A0B] border border-white/5 rounded-lg !min-h-0 h-[38px] !cursor-pointer hover:border-white/10",
									menu: () =>
										"bg-[#0A0A0B] border border-white/5 rounded-lg mt-1",
									option: (state) =>
										`px-3 py-2 hover:bg-white/5 ${
											state.isFocused ? "bg-white/5" : ""
										} text-white`,
									placeholder: () => "text-white/40",
									singleValue: () => "text-white",
									input: () => "text-white",
									menuList: () => "py-2",
								}}
								styles={{
									control: (base) => ({
										...base,
										minHeight: "38px",
										backgroundColor: "#0A0A0B",
										borderColor: "rgba(255, 255, 255, 0.05)",
										boxShadow: "none",
										"&:hover": {
											borderColor: "rgba(255, 255, 255, 0.1)",
										},
									}),
									menu: (base) => ({
										...base,
										backgroundColor: "#0A0A0B",
										overflow: "hidden",
									}),
									option: (base) => ({
										...base,
										backgroundColor: "transparent",
									}),
								}}
								options={categoryOptions}
								value={categoryOptions.find(
									(opt) => opt.value === selectedCategory
								)}
								onChange={(option: any) =>
									setSelectedCategory(option?.value || "")
								}
								placeholder="All Categories"
								isClearable
								components={{
									IndicatorSeparator: () => null,
								}}
							/>
							<Select
								className="w-full sm:w-[180px]"
								classNames={{
									control: () =>
										"bg-[#0A0A0B] border border-white/5 rounded-lg !min-h-0 h-[38px] !cursor-pointer hover:border-white/10",
									menu: () =>
										"bg-[#0A0A0B] border border-white/5 rounded-lg mt-1",
									option: (state) =>
										`px-3 py-2 hover:bg-white/5 ${
											state.isFocused ? "bg-white/5" : ""
										} text-white`,
									placeholder: () => "text-white/40",
									singleValue: () => "text-white",
									input: () => "text-white",
									menuList: () => "py-2",
								}}
								styles={{
									control: (base) => ({
										...base,
										minHeight: "38px",
										backgroundColor: "#0A0A0B",
										borderColor: "rgba(255, 255, 255, 0.05)",
										boxShadow: "none",
										"&:hover": {
											borderColor: "rgba(255, 255, 255, 0.1)",
										},
									}),
									menu: (base) => ({
										...base,
										backgroundColor: "#0A0A0B",
										overflow: "hidden",
									}),
									option: (base) => ({
										...base,
										backgroundColor: "transparent",
									}),
								}}
								options={guildOptions}
								value={selectedGuild}
								onChange={setSelectedGuild}
								placeholder="All Servers"
								isClearable
								components={{
									IndicatorSeparator: () => null,
								}}
							/>
						</div>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-white/5 bg-black/20">
									<th className="text-left py-3 px-4 font-medium text-white/60 text-sm">
										Command
									</th>
									<th className="text-left py-3 px-4 font-medium text-white/60 text-sm">
										Category
									</th>
									<th className="text-left py-3 px-4 font-medium text-white/60 text-sm">
										Server
									</th>
									<th className="text-left py-3 px-4 font-medium text-white/60 text-sm">
										User ID
									</th>
									<th className="text-left py-3 px-4 font-medium text-white/60 text-sm">
										Timestamp
									</th>
								</tr>
							</thead>
							<tbody>
								{paginatedData.map((invoke, index) => (
									<tr
										key={index}
										className="border-t border-white/5 hover:bg-white/[0.02]"
									>
										<td className="py-3 px-4 text-white text-sm">
											{invoke.command.name}
										</td>
										<td className="py-3 px-4">
											<span className="px-2 py-1 rounded text-xs bg-white/5 text-white">
												{invoke.command.category}
											</span>
										</td>
										<td className="py-3 px-4 text-white text-sm">
											{invoke.guild.name}
										</td>
										<td className="py-3 px-4 text-white text-sm">
											{invoke.user_id}
										</td>
										<td className="py-3 px-4 text-white/60 text-sm">
											{new Date(invoke.timestamp).toLocaleString("en-GB")}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 px-4 py-3 gap-4">
						<div>
							<p className="text-sm text-white/60 text-center sm:text-left">
								Showing{" "}
								<span className="font-medium text-white">
									{paginatedData.length > 0
										? (currentPage - 1) * itemsPerPage + 1
										: 0}
								</span>{" "}
								to{" "}
								<span className="font-medium text-white">
									{Math.min(currentPage * itemsPerPage, filteredData.length)}
								</span>{" "}
								of{" "}
								<span className="font-medium text-white">
									{filteredData.length}
								</span>{" "}
								results
							</p>
						</div>
						{totalPages > 1 && (
							<div className="flex justify-center sm:justify-end w-full sm:w-auto">
								<nav
									className="inline-flex rounded-lg border border-white/5 overflow-hidden"
									aria-label="Pagination"
								>
									<button
										onClick={() =>
											setCurrentPage((page) => Math.max(1, page - 1))
										}
										disabled={currentPage === 1}
										className="px-3 py-2 text-sm text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed border-r border-white/5"
									>
										<ChevronLeft className="h-4 w-4" />
									</button>
									<button
										onClick={() =>
											setCurrentPage((page) => Math.min(totalPages, page + 1))
										}
										disabled={currentPage === totalPages}
										className="px-3 py-2 text-sm text-white hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<ChevronRight className="h-4 w-4" />
									</button>
								</nav>
							</div>
						)}
					</div>

					{error && !invokeHistory && (
						<div className="text-center py-8 text-red-400">{error.message}</div>
					)}
				</div>
			</div>
		</div>
	);
}

interface StatCardProps {
	title: string;
	value: number;
	change: number;
	icon: React.ReactNode;
}

function StatCard({ title, value, change, icon }: StatCardProps) {
	return (
		<div className="relative group">
			<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			<div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
				<div className="flex items-center justify-between mb-4">
					<div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3 rounded-xl border border-white/10">
						{icon}
					</div>
					{change !== 0 && (
						<div
							className={`flex items-center gap-1 text-sm font-medium ${
								change > 0 ? "text-green-400" : "text-red-400"
							}`}
						>
							{change > 0 ? "+" : ""}
							{change.toFixed(1)}%
						</div>
					)}
				</div>
				<div>
					<div className="text-2xl md:text-3xl font-bold text-white mb-1">
						{value.toLocaleString()}
					</div>
					<div className="text-sm text-white/60">{title}</div>
				</div>
			</div>
		</div>
	);
}

