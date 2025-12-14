"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Shell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            {/* Sidebar with Toggle */}
            <div
                className={cn(
                    "fixed bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out h-full overflow-hidden",
                    isSidebarOpen ? "w-64" : "w-16"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header/Toggle Area */}
                    <div className="flex items-center p-4 h-16 border-b border-gray-100 justify-between">
                        <div className={cn("flex items-center gap-2 overflow-hidden whitespace-nowrap", !isSidebarOpen && "hidden")}>
                            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-lg">F</span>
                            </div>
                            <span className="font-semibold text-gray-900 tracking-tight">Focus Flow</span>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("text-gray-400 hover:text-gray-900", !isSidebarOpen && "mx-auto")}
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        >
                            {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
                        </Button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-y-auto">
                        <Sidebar collapsed={!isSidebarOpen} />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main
                className={cn(
                    "flex-1 transition-all duration-300 ease-in-out w-full pl-0",
                    isSidebarOpen ? "ml-64" : "ml-16"
                )}
            >
                {children}
            </main>
        </div>
    );
}
