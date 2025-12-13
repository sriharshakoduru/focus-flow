import { ArrowUpRight, ArrowDownRight, Zap, Target, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const METRICS = [
    {
        title: "Total Focus",
        value: "3h 12m",
        trend: "+12%",
        trendUp: true,
        icon: Zap,
        description: "vs. yesterday",
    },
    {
        title: "Efficiency",
        value: "92%",
        trend: "+5%",
        trendUp: true,
        icon: Target,
        description: "Focus score avg",
    },
    {
        title: "Sessions",
        value: "4",
        trend: "+1",
        trendUp: true,
        icon: Target,
        description: "Daily goal: 6",
    },
    {
        title: "Avg Focus/Session",
        value: "45m",
        trend: "+8m",
        trendUp: true,
        icon: Clock,
        description: "Deep work duration",
    },
];

export function KPIGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map((metric) => (
                <Card key={metric.title} className="shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">
                            {metric.title}
                        </CardTitle>
                        <metric.icon className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline justify-between">
                            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                            <Badge variant="secondary" className={`flex items-center gap-1 ${metric.trendUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                {metric.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {metric.trend}
                            </Badge>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{metric.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
