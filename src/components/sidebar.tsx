"use client";

import { Home, PieChart, Folder, Settings, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { icon: Home, label: "Home", active: true },
    { icon: PieChart, label: "Analytics", active: false },
    { icon: Folder, label: "Projects", active: false },
];

export function Sidebar({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "flex flex-col h-screen w-64 border-r border-gray-200 bg-gray-50/50 p-4 fixed left-0 top-0",
                className
            )}
        >
            <div className="flex items-center gap-2 px-2 mb-8">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="font-semibold text-gray-900 tracking-tight">Focus Flow</span>
            </div>

            <nav className="flex-1 space-y-1">
                {NAV_ITEMS.map((item) => (
                    <Button
                        key={item.label}
                        variant="ghost"
                        className={cn(
                            "w-full justify-start gap-3 h-9 px-2 font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100",
                            item.active && "bg-white text-gray-900 shadow-sm border border-gray-200"
                        )}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </Button>
                ))}
            </nav>

            <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start gap-3 h-9 px-2 text-gray-500 hover:text-gray-900">
                        <Bell className="w-4 h-4" />
                        Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-9 px-2 text-gray-500 hover:text-gray-900">
                        <Settings className="w-4 h-4" />
                        Settings
                    </Button>
                </div>

                <div className="flex items-center gap-3 px-2 pt-2">
                    <Avatar className="w-8 h-8 border border-gray-200">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">Dr. User</span>
                        <span className="text-xs text-gray-500">Pro Plan</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
