"use client";

import { TimelineSessionRow } from "@/components/timeline-session-row";

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
        notes: "Analyzing market trends and major players. Also looked into order books for Cochin Shipyard.",
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
        notes: "Wireframing the appointment booking flow. Need to revise the mobile view.",
        category: "Design",
        duration: "2h 10m",
        status: "Done",
        focusScore: "Distracted",
        focusValue: 25,
        startTime: "11:00",
        endTime: "13:10"
    },
];

export function ActivityLog() {
    const handleSave = (data: any) => {
        console.log("Saved", data);
    };

    return (
        <div className="pl-2 pt-4">
            {DATA.map((item, index) => (
                <TimelineSessionRow
                    key={item.id}
                    item={item}
                    isLast={index === DATA.length - 1}
                    onSave={handleSave}
                />
            ))}
        </div>
    );
}
