"use client";

import { X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface InlineSessionFormProps {
    onCancel: () => void;
    onSave: () => void;
}

export function InlineSessionForm({ onCancel, onSave }: InlineSessionFormProps) {
    return (
        <Card className="mb-4 border-gray-200 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
            <CardHeader className="pb-3 border-b border-gray-100 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-900">New Session</CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400" onClick={onCancel}>
                    <X className="w-4 h-4" />
                </Button>
            </CardHeader>
            <CardContent className="grid gap-4 py-4">
                {/* Row 1: Title & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="title" className="text-xs font-medium text-gray-500">Title</Label>
                        <Input id="title" placeholder="What did you work on?" className="h-9" autoFocus />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="category" className="text-xs font-medium text-gray-500">Category</Label>
                        <Select>
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="work">Deep Work</SelectItem>
                                <SelectItem value="study">Study</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Row 2: Times & Focus Score */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="start" className="text-xs font-medium text-gray-500">Start</Label>
                            <Input id="start" type="time" className="h-9" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="end" className="text-xs font-medium text-gray-500">End</Label>
                            <Input id="end" type="time" className="h-9" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-gray-500 block mb-1.5">Focus Score</Label>
                        <RadioGroup defaultValue="neutral" className="flex items-center gap-2">
                            <div className="flex-1">
                                <RadioGroupItem value="focused" id="focused-in" className="peer sr-only" />
                                <Label
                                    htmlFor="focused-in"
                                    className="flex items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 peer-data-[state=checked]:text-green-700 cursor-pointer transition-all"
                                >
                                    <span>🔥</span> Focused
                                </Label>
                            </div>
                            <div className="flex-1">
                                <RadioGroupItem value="neutral" id="neutral-in" className="peer sr-only" />
                                <Label
                                    htmlFor="neutral-in"
                                    className="flex items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-50 peer-data-[state=checked]:text-yellow-700 cursor-pointer transition-all"
                                >
                                    <span>😐</span> Neutral
                                </Label>
                            </div>
                            <div className="flex-1">
                                <RadioGroupItem value="distracted" id="distracted-in" className="peer sr-only" />
                                <Label
                                    htmlFor="distracted-in"
                                    className="flex items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:bg-red-50 peer-data-[state=checked]:text-red-700 cursor-pointer transition-all"
                                >
                                    <span>🌪️</span> Distracted
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                {/* Row 3: Notes */}
                <div className="space-y-1.5">
                    <Label htmlFor="notes" className="text-xs font-medium text-gray-500">Notes</Label>
                    <Textarea id="notes" placeholder="Notes..." className="min-h-[60px] resize-none" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 py-3 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
                <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
                <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800" onClick={onSave}>
                    <Save className="w-3.5 h-3.5 mr-2" />
                    Save Session
                </Button>
            </CardFooter>
        </Card>
    );
}
