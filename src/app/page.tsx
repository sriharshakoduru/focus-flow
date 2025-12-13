import { KPIGrid } from "@/components/kpi-grid";
import { AnalyticsChart } from "@/components/analytics-chart";
import { ActivityLog } from "@/components/activity-log";
import { QuickAddSheet } from "@/components/quick-add-sheet";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Home</span>
            <span>/</span>
            <span className="font-medium text-gray-900">Dashboard</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Overview</h1>
        </div>
        <QuickAddSheet />
      </div>

      <Separator className="bg-gray-200" />

      {/* KPI Grid */}
      <section>
        <KPIGrid />
      </section>

      {/* Analytics & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Focus Output</h2>
          </div>
          <AnalyticsChart />
        </section>

        <section className="lg:col-span-1 space-y-4">
          {/* Placeholder for future widgets or just empty for now, actually let's make Analytics full width or put something else here.
               The user asked for "Visual Analytics (Middle Row): Main Chart".
               And "Detailed Log Table (Bottom Section)".
               
               Let's stacking them vertically as per "Middle Row" and "Bottom Section" description.
               Row 1: KPI
               Row 2: Chart
               Row 3: Table
           */}
        </section>
      </div>

      {/* Re-adjusting layout based on "Row" description which implies full width or major sections */}

    </div>
  );
}
