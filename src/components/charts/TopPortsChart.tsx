import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { topPortsData } from "@/lib/mockData";
import { AIInsightsButton } from "./AIInsightsButton";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function TopPortsChart() {
  return (
    <div className="card-elevated p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
            <div className="w-1 h-5 bg-chart-2 rounded-full"></div>
            Top 5 Ports by Trade Value
          </h3>
          <p className="text-xs text-muted-foreground mt-1">USD millions (FY 2025-26)</p>
        </div>
        <AIInsightsButton 
          chartTitle="Top 5 Ports by Trade Value"
          chartData={topPortsData.slice(0, 5)}
          chartType="bar"
          contextDescription="Top performing ports ranked by trade value with year-over-year growth rates"
        />
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topPortsData.slice(0, 5)}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            barSize={28}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} opacity={0.3} />
            <XAxis
              type="number"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickLine={{ stroke: "hsl(var(--border))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-md)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              formatter={(value: number, name: string, props: any) => [
                `$${value}M (${props.payload.growth > 0 ? "+" : ""}${props.payload.growth}% YoY)`,
                "Trade Value",
              ]}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={35}>
              {topPortsData.slice(0, 5).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
