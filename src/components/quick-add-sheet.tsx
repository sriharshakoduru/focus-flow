"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function QuickAddSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-gray-900 text-white hover:bg-gray-800 shadow-sm">
                    <Plus className="mr-2 h-4 w-4" /> Quick Add
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[540px]">
                <SheetHeader>
                    <SheetTitle>Log Session</SheetTitle>
                    <SheetDescription>
                        Record a new focus block. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-6 py-8">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="e.g., Deep Work: System Architecture" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="work">Deep Work</SelectItem>
                                <SelectItem value="study">Study</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="start-time">Start Time</Label>
                            <Input id="start-time" type="time" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="end-time">End Time</Label>
                            <Input id="end-time" type="time" />
                        </div>
                    </div>
                    <div className="grid gap-3">
                        <Label>Focus Score</Label>
                        <RadioGroup defaultValue="neutral" className="grid grid-cols-3 gap-4">
                            <div>
                                <RadioGroupItem value="focused" id="focused" className="peer sr-only" />
                                <Label
                                    htmlFor="focused"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 [&:has([data-state=checked])]:border-primary"
                                >
                                    <span className="text-xl mb-1">🔥</span>
                                    <span className="text-sm font-medium">Focused</span>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="neutral" id="neutral" className="peer sr-only" />
                                <Label
                                    htmlFor="neutral"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-50 [&:has([data-state=checked])]:border-primary"
                                >
                                    <span className="text-xl mb-1">😐</span>
                                    <span className="text-sm font-medium">Neutral</span>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="distracted" id="distracted" className="peer sr-only" />
                                <Label
                                    htmlFor="distracted"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:bg-red-50 [&:has([data-state=checked])]:border-primary"
                                >
                                    <span className="text-xl mb-1">🌪️</span>
                                    <span className="text-sm font-medium">Distracted</span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea id="notes" placeholder="What did you accomplish?" className="min-h-[100px]" />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button type="submit" className="bg-gray-900 text-white">Save Session</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
