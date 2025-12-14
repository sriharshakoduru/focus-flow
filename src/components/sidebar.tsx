
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PieChart, Folder, Settings, Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const NAV_ITEMS = [
    { icon: Home, label: "Home", href: "/" },
    { icon: PieChart, label: "Trends", href: "/trends" },
    { icon: Folder, label: "Categories", href: "/categories" },
];

export function Sidebar({ className, collapsed }: { className?: string, collapsed?: boolean }) {
    const pathname = usePathname();

    return (
        <div className={cn("flex flex-col h-full bg-white p-3", className)}>
            <nav className="space-y-1">
                {/* Optional: Add Search if not collapsed */}
                {!collapsed && (
                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            placeholder="Search..."
                            className="w-full h-9 pl-9 pr-4 text-sm bg-gray-50 border-none rounded-md focus:ring-1 focus:ring-gray-200"
                        />
                    </div>
                )}

                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.label} href={item.href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full h-10 mb-1",
                                    collapsed ? "justify-center px-0" : "justify-start px-3 gap-3",
                                    isActive && "bg-gray-100 text-gray-900 font-medium"
                                )}
                                title={collapsed ? item.label : undefined}
                            >
                                <item.icon className="w-5 h-5 text-gray-500" />
                                {!collapsed && <span className="text-gray-600">{item.label}</span>}
                            </Button>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-4 space-y-4">
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full h-10",
                            collapsed ? "justify-center px-0" : "justify-start px-3 gap-3"
                        )}
                        title={collapsed ? "Notifications" : undefined}
                    >
                        <Bell className="w-5 h-5 text-gray-400" />
                        {!collapsed && <span className="text-gray-500">Notifications</span>}
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full h-10",
                            collapsed ? "justify-center px-0" : "justify-start px-3 gap-3"
                        )}
                        title={collapsed ? "Settings" : undefined}
                    >
                        <Settings className="w-5 h-5 text-gray-400" />
                        {!collapsed && <span className="text-gray-500">Settings</span>}
                    </Button>
                </div>

                <Separator />

                <div className={cn("flex items-center gap-3 pt-2", collapsed && "justify-center")}>
                    <Avatar className="w-9 h-9 border border-gray-100 flex-shrink-0">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>SR</AvatarFallback>
                    </Avatar>

                    {!collapsed && (
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium text-gray-900 truncate">Sri Koduru</span>
                            <span className="text-xs text-gray-500 truncate">Pro Plan</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
