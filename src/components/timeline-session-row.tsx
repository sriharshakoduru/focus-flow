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
    isLast: boolean;
    onSave: (data: SessionData) => void;
}

const FOCUS_COLORS: Record<string, string> = {
    "Focused": "bg-green-500",
    "Neutral": "bg-yellow-500",
    "Distracted": "bg-red-500",
};

export function TimelineSessionRow({ item, isLast, onSave }: TimelineSessionRowProps) {
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

    return (
        <div className="flex gap-4 group">
            {/* Timeline Visuals */}
            <div className="flex flex-col items-center">
                <div
                    className={cn(
                        "w-3 h-3 rounded-full border-2 border-white shadow-sm z-10",
                        FOCUS_COLORS[formData.focusScore] || "bg-gray-400"
                    )}
                />
                {!isLast && <div className="w-0.5 flex-1 bg-gray-200 my-1" />}
            </div>

            {/* Content */}
            <div
                className={cn("flex-1 pb-8 cursor-pointer", isEditing ? "" : "")}
                onClick={() => !isEditing && setIsEditing(true)}
            >
                {isEditing ? (
                    <div className="space-y-3" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
                        {/* Edit Mode: Inline Inputs */}
                        <div className="flex gap-2">
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="h-8 font-semibold text-gray-900 border-transparent hover:border-gray-200 focus:border-gray-900 px-0 shadow-none bg-transparent focus:bg-white transition-all"
                                autoFocus
                            />
                        </div>

                        <Textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="min-h-[40px] text-sm text-gray-600 border-transparent hover:border-gray-200 focus:border-gray-900 px-0 shadow-none bg-transparent focus:bg-white transition-all resize-none"
                            placeholder="Add notes..."
                        />

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
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
                            </div>

                            <Select
                                value={formData.focusScore}
                                onValueChange={(val) => setFormData({ ...formData, focusScore: val })}
                            >
                                <SelectTrigger className="h-7 w-[110px] text-xs">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Focused">Focused</SelectItem>
                                    <SelectItem value="Neutral">Neutral</SelectItem>
                                    <SelectItem value="Distracted">Distracted</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex-1" />

                            <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} className="h-7 text-xs">Cancel</Button>
                            <Button size="sm" onClick={handleSave} className="h-7 text-xs bg-gray-900 text-white">Save</Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {/* Read Mode: Clean Text */}
                        <div className="flex items-baseline justify-between">
                            <h3 className="font-semibold text-gray-900 text-sm">{formData.title}</h3>
                            <span className="text-xs font-mono text-gray-400">{formData.duration}</span>
                        </div>

                        {formData.notes && (
                            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                                {formData.notes}
                            </p>
                        )}

                        <div className="flex items-center gap-3 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="text-xs text-gray-400 font-mono">
                                {formData.startTime} - {formData.endTime}
                            </span>
                            <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal text-gray-500 bg-gray-100 hover:bg-gray-200">
                                {formData.category}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal text-gray-500 bg-gray-100 hover:bg-gray-200">
                                {formData.focusScore}
                            </Badge>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
