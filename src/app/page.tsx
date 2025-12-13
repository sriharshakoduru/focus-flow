"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KPIGrid } from "@/components/kpi-grid";
import { ActivityLog } from "@/components/activity-log";
import { DatePicker } from "@/components/date-picker";
import { Separator } from "@/components/ui/separator";
import { InlineSessionForm } from "@/components/inline-session-form";

export default function Home() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <DatePicker />
        </div>
        {/* Quick Add Removed from Header */}
      </div>

      <Separator className="bg-gray-200" />

      {/* KPI Grid */}
      <section>
        <KPIGrid />
      </section>

      {/* Timeline View */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Session Timeline</h2>
          {!isAdding && (
            <Button
              size="sm"
              className="bg-gray-900 text-white hover:bg-gray-800"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          )}
        </div>

        {isAdding && (
          <div className="mb-4">
            <InlineSessionForm
              onCancel={() => setIsAdding(false)}
              onSave={() => {
                setIsAdding(false);
                // Logic to save would go here
              }}
            />
          </div>
        )}

        <ActivityLog />
      </section>
    </div>
  );
}
