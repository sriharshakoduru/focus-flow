"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const DATA = [
    { day: "Mon", minutes: 120 },
    { day: "Tue", minutes: 240 },
    { day: "Wed", minutes: 180 },
    { day: "Thu", minutes: 320 },
    { day: "Fri", minutes: 290 },
    { day: "Sat", minutes: 150 },
    { day: "Sun", minutes: 210 },
];

export function AnalyticsChart() {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Focus Trend</CardTitle>
                <CardDescription>Deep work minutes over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#18181b" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#18181b" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#6B7280" }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                            cursor={{ stroke: "#9CA3AF", strokeDasharray: "4 4" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="minutes"
                            stroke="#18181b"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorFocus)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
