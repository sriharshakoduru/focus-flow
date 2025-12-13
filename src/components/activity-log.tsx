"use client";

import { useState } from "react";
import { MoreHorizontal, FileText, Play, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InlineSessionForm } from "@/components/inline-session-form";

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
        startTime: "09:00",
        endTime: "09:39"
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
        startTime: "10:00",
        endTime: "10:45"
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
        startTime: "11:00",
        endTime: "13:10"
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
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleSaveEdit = () => {
        // In a real app, you would update the data here
        setEditingId(null);
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-400">
                <div className="flex-1">Task / Notes</div>
                <div className="w-[120px]">Category</div>
                <div className="w-[100px]">Focus</div>
                <div className="w-[100px] text-right">Duration</div>
            </div>

            <div className="space-y-2">
                {DATA.map((item) => (
                    <div key={item.id}>
                        {editingId === item.id ? (
                            <InlineSessionForm
                                initialData={item}
                                onCancel={handleCancelEdit}
                                onSave={handleSaveEdit}
                            />
                        ) : (
                            <div
                                onClick={() => handleEdit(item.id)}
                                className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
                            >
                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-gray-900 truncate">{item.title}</span>
                                        <span className="text-sm text-gray-500 line-clamp-1">{item.notes}</span>
                                    </div>
                                </div>

                                <div className="w-[120px] shrink-0">
                                    <Badge variant="outline" className={cn("font-medium border-0", CATEGORY_STYLES[item.category] || "bg-gray-100 text-gray-700")}>
                                        <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5 currentColor", item.category === "CCS Cases" ? "bg-red-500" : item.category === "Research" ? "bg-blue-500" : "bg-purple-500")}></div>
                                        {item.category}
                                    </Badge>
                                </div>

                                <div className="w-[100px] shrink-0">
                                    <div className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", FOCUS_STYLES[item.focusScore])}>
                                        {item.focusScore === "Focused" && "🔥"}
                                        {item.focusScore === "Neutral" && "😐"}
                                        {item.focusScore === "Distracted" && "🌪️"}
                                        <span className="ml-1">{item.focusScore}</span>
                                    </div>
                                </div>

                                <div className="w-[100px] shrink-0 text-right">
                                    <div className="inline-flex items-center gap-1.5 text-sm text-gray-600 font-mono">
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
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
