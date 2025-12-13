"use client";

import { MoreHorizontal, FileText, Play, CheckCircle2, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DATA = [
    {
        id: 1,
        title: "Case 23: Shortness of Breath",
        notes: "Reviewing patient history and labs",
        category: "CCS Cases",
        duration: "39m",
        status: "Done",
        focusScore: "Focused",
        focusValue: 100,
    },
    {
        id: 2,
        title: "Research: Indian Shipbuilding Stocks",
        notes: "Analyzing market trends and major players",
        category: "Research",
        duration: "45m",
        status: "In Progress",
        focusScore: "Neutral",
        focusValue: 50,
    },
    {
        id: 3,
        title: "UX Design: Pet Clinic Website",
        notes: "Wireframing the appointment booking flow",
        category: "Design",
        duration: "2h 10m",
        status: "Done",
        focusScore: "Distracted",
        focusValue: 25,
    },
];

const CATEGORY_STYLES: Record<string, string> = {
    "CCS Cases": "bg-red-100 text-red-700 border-red-200",
    "Research": "bg-blue-100 text-blue-700 border-blue-200",
    "Design": "bg-purple-100 text-purple-700 border-purple-200",
};

const FOCUS_STYLES: Record<string, string> = {
    "Focused": "text-green-600 bg-green-50",
    "Neutral": "text-yellow-600 bg-yellow-50",
    "Distracted": "text-orange-600 bg-orange-50",
};

export function ActivityLog() {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <Table>
                <TableHeader className="bg-gray-50/50">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[40px]">
                            <Checkbox className="translate-y-[2px]" />
                        </TableHead>
                        <TableHead className="font-medium text-xs uppercase tracking-wider text-gray-500">Task / Notes</TableHead>
                        <TableHead className="font-medium text-xs uppercase tracking-wider text-gray-500 w-[120px]">Category</TableHead>
                        <TableHead className="font-medium text-xs uppercase tracking-wider text-gray-500 w-[100px]">Focus</TableHead>
                        <TableHead className="font-medium text-xs uppercase tracking-wider text-gray-500 w-[100px]">Duration</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {DATA.map((item) => (
                        <TableRow key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                            <TableCell>
                                <Checkbox className="translate-y-[2px]" />
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-semibold text-gray-900">{item.title}</span>
                                    <span className="text-xs text-gray-500 line-clamp-1">{item.notes}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className={cn("font-medium border-0", CATEGORY_STYLES[item.category] || "bg-gray-100 text-gray-700")}>
                                    <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5 currentColor", item.category === "CCS Cases" ? "bg-red-500" : item.category === "Research" ? "bg-blue-500" : "bg-purple-500")}></div>
                                    {item.category}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", FOCUS_STYLES[item.focusScore])}>
                                    {item.focusScore}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1.5 text-sm text-gray-600 font-mono">
                                    {item.status === "In Progress" ? (
                                        <div className="flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                            </span>
                                            {item.duration}
                                        </div>
                                    ) : (
                                        <span>{item.duration}</span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
