"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Navbar from "@/components/(global)/navbar/Navbar"
const queryClient = new QueryClient()

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            {children}
        </QueryClientProvider>
    )
} 