"use client";

import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SessionData {
    id: number;
    title: string;
    notes?: string;
    category: string;
    duration: string;
    status: string;
    focusScore: string;
    focusValue: number;
    startTime: string;
    endTime: string;
}

interface TimelineSessionRowProps {
    item: SessionData;
    onSave: (data: SessionData) => void;
}



export function TimelineSessionRow({ item, onSave }: TimelineSessionRowProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(item);

    const handleSave = (e: React.FormEvent) => {
        e.stopPropagation();
        onSave(formData);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            handleSave(e as any);
        }
        if (e.key === 'Escape') {
            setIsEditing(false);
            setFormData(item);
        }
    };

    // Parse duration to minutes for bar height
    // Format examples: "39m", "2h 10m", "1h"
    const getDurationMinutes = (dur: string) => {
        let minutes = 0;
        const hMatch = dur.match(/(\d+)h/);
        const mMatch = dur.match(/(\d+)m/);
        if (hMatch) minutes += parseInt(hMatch[1]) * 60;
        if (mMatch) minutes += parseInt(mMatch[1]);
        return minutes || 30; // default to 30 if parse fails/empty
    };

    // Category Color Mapping
    const CATEGORY_COLORS: Record<string, string> = {
        "CCS Cases": "bg-rose-500",
        "Research": "bg-blue-500",
        "Design": "bg-purple-500",
        "Learning": "bg-emerald-500"
    };

    // Fallback color
    const barColor = CATEGORY_COLORS[formData.category] || "bg-gray-500";
    const minutes = getDurationMinutes(formData.duration);
    const barHeight = Math.max(minutes * 0.5, 24); // 0.5px per minute, min 24px

    return (
        <div className="flex gap-4 group mb-6 items-start">
            {/* Proportional Colored Bar */}
            <div
                className={cn("w-1.5 rounded-full flex-shrink-0", barColor)}
                style={{ height: `${barHeight}px` }}
            />

            {/* Content */}
            <div
                className={cn("flex-1 cursor-pointer", isEditing ? "" : "")}
                onClick={() => !isEditing && setIsEditing(true)}
            >
                {isEditing ? (
                    <div className="space-y-3 p-4 bg-gray-50/50 rounded-lg border border-gray-100" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
                        {/* Edit Mode */}
                        <div className="flex gap-2">
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="h-8 font-semibold text-gray-900"
                                autoFocus
                            />
                        </div>
                        <Textarea
                            value={formData.notes || ""}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="text-sm resize-none"
                            placeholder="Add notes..."
                        />
                        <div className="flex items-center gap-3">
                            <Input
                                type="time"
                                value={formData.startTime}
                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                className="h-7 w-24 text-xs"
                            />
                            <span className="text-gray-400">-</span>
                            <Input
                                type="time"
                                value={formData.endTime}
                                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                className="h-7 w-24 text-xs"
                            />
                            <div className="flex-1" />

                            <Select
                                value={formData.focusScore}
                                onValueChange={(val) => setFormData({ ...formData, focusScore: val })}
                            >
                                <SelectTrigger className="h-7 w-[100px] text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Focused">Focused</SelectItem>
                                    <SelectItem value="Neutral">Neutral</SelectItem>
                                    <SelectItem value="Distracted">Distracted</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button size="sm" onClick={handleSave} className="h-7 text-xs bg-gray-900 text-white ml-2">Save</Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {/* Read Mode */}
                        <div className="flex items-start justify-between">
                            <h3 className="font-bold text-gray-900 text-base">{formData.title}</h3>

                            <div className="flex gap-2">
                                <Badge variant="outline" className="rounded-full pl-1.5 pr-2.5 py-0.5 h-6 gap-1.5 border-gray-200 text-gray-600 font-medium">
                                    <div className={cn("w-1.5 h-1.5 rounded-full", barColor)} />
                                    {formData.category}
                                </Badge>
                                <Badge variant="secondary" className="rounded-full h-6 px-2 text-gray-500 font-normal bg-gray-100">
                                    {formData.focusScore}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mt-0.5">
                            <span className="uppercase tracking-wider opacity-70">
                                {formData.startTime} <span className="mx-1">→</span> {formData.endTime}
                            </span>
                            <span className="ml-auto font-bold text-gray-900 text-sm">{formData.duration}</span>
                        </div>

                        {formData.notes && (
                            <p className="text-sm text-gray-600 leading-relaxed mt-2">
                                {formData.notes}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
