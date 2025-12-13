import { AnalyticsChart } from "@/components/analytics-chart";
import { Separator } from "@/components/ui/separator";

export default function TrendsPage() {
    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Home</span>
                    <span>/</span>
                    <span className="font-medium text-gray-900">Trends</span>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Analysis</h1>
            </div>
            <Separator className="bg-gray-200" />
            <div className="grid grid-cols-1">
                <AnalyticsChart />
            </div>
        </div>
    );
}
