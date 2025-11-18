"use client";

import { navigation } from "@/libs/dashboard/adminNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserAvatar from "@/components/UserAvatar";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </QueryClientProvider>
    );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#0F0F10] to-[#0A0A0B]">
            <div className="flex">
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 lg:hidden z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <aside
                    className={`fixed lg:static inset-y-0 left-0 w-64 bg-[#0A0A0B]/80 backdrop-blur-xl border-r border-white/10 z-50
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} transition-transform duration-300`}
                >
                    <div className="h-full flex flex-col">
                        <div className="p-6 border-b border-white/10">
                            <Link href="/" className="flex items-center gap-3 group">
                                <Image
                                    src="https://r2.warm.lat/pfp.jpg"
                                    alt="warm"
                                    width={40}
                                    height={40}
                                    className="rounded-xl ring-2 ring-white/10 group-hover:ring-white/20 transition-all"
                                />
                                <span className="text-xl font-semibold text-white">warm</span>
                            </Link>
                            <p className="text-sm text-white/60 mt-2">Admin Dashboard</p>
                        </div>

                        <nav className="flex-1 overflow-y-auto py-6 px-3">
                            {Object.entries(navigation).map(([category, items]) => (
                                <div key={category} className="mb-8">
                                    <h4 className="px-3 mb-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                                        {category}
                                    </h4>
                                    <div className="space-y-1">
                                        {items.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={`/dashboard/admin${item.href}`}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                                                    ${
                                                        pathname === `/dashboard/admin${item.href}`
                                                            ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-white/10"
                                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                                    }`}
                                            >
                                                <item.icon className="w-4 h-4 flex-shrink-0" />
                                                <span>{item.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </nav>

                        <div className="p-4 border-t border-white/10">
                            <UserAvatar />
                        </div>
                    </div>
                </aside>

                <main className="flex-1 min-h-screen">
                    <div className="lg:hidden sticky top-0 z-30 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/10 p-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-white/60 hover:text-white transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="p-6 md:p-8 lg:p-12">{children}</div>
                </main>
            </div>
        </div>
    );
}
