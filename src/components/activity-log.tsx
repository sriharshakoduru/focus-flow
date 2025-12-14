"use client";

import { TimelineSessionRow } from "@/components/timeline-session-row";

export function ActivityLog({ items }: { items: any[] }) {
    const handleSave = (data: any) => {
        console.log("Saved", data);
    };

    return (
        <div className="pl-2 pt-4">
            {items.map((item, index) => (
                <TimelineSessionRow
                    key={item.id}
                    item={item}
                    onSave={handleSave}
                />
            ))}
        </div>
    );
}
