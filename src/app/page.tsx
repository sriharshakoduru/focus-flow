"use client";

import { useState, useMemo } from "react";
import { Plus, Zap, Target, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KPIGrid } from "@/components/kpi-grid";
import { ActivityLog } from "@/components/activity-log";
import { DatePicker } from "@/components/date-picker";
import { InlineSessionForm } from "@/components/inline-session-form";
import { isSameDay, parseISO, format } from "date-fns";

export default function Home() {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const CATEGORIES = ["All", "CCS Cases", "Research", "Design", "Learning"];

  /* Mock Data with Dates */
  const DATA = [
    // Today
    {
      id: 1,
      title: "Case 23: Shortness of Breath",
      notes: "Reviewing patient history and labs",
      category: "CCS Cases",
      duration: "39m",
      status: "Done",
      focusScore: "Focused",
      focusValue: 100,
      date: format(new Date(), "yyyy-MM-dd"), // Dynamic today
      startTime: "09:00",
      endTime: "09:39"
    },
    {
      id: 2,
      title: "Research: Indian Shipbuilding Stocks",
      notes: "Analyzing market trends and major players.",
      category: "Research",
      duration: "45m",
      status: "In Progress",
      focusScore: "Neutral",
      focusValue: 50,
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "10:00",
      endTime: "10:45"
    },
    {
      id: 3,
      title: "UX Design: Pet Clinic Website",
      notes: "Wireframing the appointment booking flow.",
      category: "Design",
      duration: "2h 10m",
      status: "Done",
      focusScore: "Distracted",
      focusValue: 25,
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "11:00",
      endTime: "13:10"
    },
    // Yesterday
    {
      id: 4,
      title: "Learning: Next.js 14 Pattern",
      notes: "Watched tutorial on Server Actions.",
      category: "Learning",
      duration: "1h 30m",
      status: "Done",
      focusScore: "Focused",
      focusValue: 90,
      date: format(new Date(Date.now() - 86400000), "yyyy-MM-dd"), // Yesterday
      startTime: "14:00",
      endTime: "15:30"
    },
    {
      id: 5,
      title: "Design System Update",
      notes: "Refining color palette.",
      category: "Design",
      duration: "45m",
      status: "Done",
      focusScore: "Neutral",
      focusValue: 60,
      date: format(new Date(Date.now() - 86400000), "yyyy-MM-dd"),
      startTime: "16:00",
      endTime: "16:45"
    }
  ];

  // Logic: 1. Filter by Date -> 2. Filter by Category
  const dateFilteredItems = useMemo(() => {
    if (!selectedDate) return [];
    return DATA.filter(item => isSameDay(parseISO(item.date), selectedDate));
  }, [selectedDate]);

  const finalFilteredItems = useMemo(() => {
    if (selectedCategory === "All") return dateFilteredItems;
    return dateFilteredItems.filter(item => item.category === selectedCategory);
  }, [dateFilteredItems, selectedCategory]);

  // Dynamic Stats Calculation
  const stats = useMemo(() => {
    let totalMinutes = 0;
    let focusScoreSum = 0;

    finalFilteredItems.forEach(item => {
      // Parse "39m", "1h 30m"
      let mins = 0;
      const hMatch = item.duration.match(/(\d+)h/);
      const mMatch = item.duration.match(/(\d+)m/);
      if (hMatch) mins += parseInt(hMatch[1]) * 60;
      if (mMatch) mins += parseInt(mMatch[1]);
      if (!mins) mins = 30; // fallback

      totalMinutes += mins;
      focusScoreSum += item.focusValue || 50;
    });

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const totalTimeStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    const avgFocus = finalFilteredItems.length ? Math.round(focusScoreSum / finalFilteredItems.length) : 0;
    const avgSessionMins = finalFilteredItems.length ? Math.round(totalMinutes / finalFilteredItems.length) : 0;

    return [
      {
        title: "Total Focus",
        value: totalTimeStr,
        trend: "+12%",
        trendUp: true,
        icon: Zap,
        description: "vs. average",
      },
      {
        title: "Efficiency",
        value: `${avgFocus}%`,
        trend: avgFocus > 75 ? "+5%" : "-2%",
        trendUp: avgFocus > 75,
        icon: Target,
        description: "Focus score avg",
      },
      {
        title: "Sessions",
        value: finalFilteredItems.length.toString(),
        trend: "+1",
        trendUp: true,
        icon: Target,
        description: `Filter: ${selectedCategory}`,
      },
      {
        title: "Avg Session",
        value: `${avgSessionMins}m`,
        trend: "+8m",
        trendUp: true,
        icon: Clock,
        description: "Deep work duration",
      },
    ];
  }, [finalFilteredItems, selectedCategory]);

  return (
    <div className="flex flex-col h-[calc(100vh)] bg-white overflow-hidden">
      {/* Top Header: Date & Filters */}
      <header className="h-16 px-6 border-b border-gray-100 bg-white flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg text-gray-900">Dashboard</h1>
            <span className="text-gray-300">|</span>
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          </div>

          <div className="h-6 w-px bg-gray-200" />

          {/* Categories */}
          <div className="flex items-center gap-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                                px-3 py-1.5 rounded-md text-sm font-medium transition-all
                                ${selectedCategory === cat
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"}
                            `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={() => setIsAdding(true)} size="sm" className="bg-gray-900 text-white shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Session
        </Button>
      </header>

      {/* Content Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Analysis */}
        <aside className="w-[380px] flex-shrink-0 bg-gray-50/50 border-r border-gray-200 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-gray-400" />
              <h2 className="font-semibold text-gray-900">Daily Analysis</h2>
            </div>

            <KPIGrid stats={stats} />

            {/* Placeholder for chart */}
            <div className="p-4 bg-white rounded-xl border border-gray-100 h-64 flex items-center justify-center">
              <p className="text-sm text-gray-400 italic">Focus Trend Chart Placeholder</p>
            </div>
          </div>
        </aside>

        {/* Right Column: Timeline */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Sessions <span className="text-gray-400 font-normal text-base ml-2">({finalFilteredItems.length})</span>
              </h2>
            </div>

            {isAdding && (
              <div className="mb-8 animate-in slide-in-from-top-4 fade-in duration-200">
                <InlineSessionForm
                  onCancel={() => setIsAdding(false)}
                  onSave={() => setIsAdding(false)}
                />
              </div>
            )}

            {finalFilteredItems.length > 0 ? (
              <ActivityLog items={finalFilteredItems} />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Filter className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-gray-900 font-medium">No sessions found</h3>
                <p className="text-gray-500 text-sm mt-1">Try changing the date or category filter.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
