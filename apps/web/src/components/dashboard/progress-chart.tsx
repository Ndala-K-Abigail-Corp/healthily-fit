import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULTS } from "@/lib/constants";

interface WeightDataPoint {
  date: string;
  weight: number;
}

interface ProgressChartProps {
  currentWeight: number;
  data?: WeightDataPoint[];
  title?: string;
}

export function ProgressChart({
  currentWeight,
  data,
  title = "Weight Progress",
}: ProgressChartProps) {
  // Use provided data or generate mock data for visualization
  const chartData: WeightDataPoint[] = data || [
    { date: "Week 1", weight: currentWeight + 2 },
    { date: "Week 2", weight: currentWeight + 1.5 },
    { date: "Week 3", weight: currentWeight + 1 },
    { date: "Week 4", weight: currentWeight },
  ];

  // Calculate trend
  const firstWeight = chartData[0]?.weight || currentWeight;
  const lastWeight = chartData[chartData.length - 1]?.weight || currentWeight;
  const trend = lastWeight - firstWeight;
  const trendPercentage = ((trend / firstWeight) * 100).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-sm">
            {title}
          </CardTitle>
          {trend !== 0 && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                trend < 0 ? "text-success" : "text-warning"
              }`}
            >
              {trend < 0 ? (
                <TrendingDown className="w-4 h-4" />
              ) : (
                <TrendingUp className="w-4 h-4" />
              )}
              {Math.abs(Number(trendPercentage))}%
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ bottom: 5, left: 5, right: 5, top: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
                labelStyle={{ color: "#374151", fontWeight: 600 }}
                formatter={(value: number) => [`${value.toFixed(1)} kg`, "Weight"]}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke={DEFAULTS.CHART_COLORS.SUCCESS}
                strokeWidth={2}
                dot={{ fill: DEFAULTS.CHART_COLORS.SUCCESS, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-neutral-600 text-center mt-md">
          {data
            ? "Your weight progress over time"
            : "Start logging your weight to track progress"}
        </p>
      </CardContent>
    </Card>
  );
}

