import React from "react";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { topPortsData, landedCostData, volatilityData, costTrendData } from "@/lib/mockData";
import { AIInsightsButton } from "@/components/charts/AIInsightsButton";

const costBreakdown = topPortsData.slice(0, 5).map(p => ({
  port: p.name,
  fob: 72,
  freight: 6 + Math.random() * 3,
  duty: 12,
  portCharges: 6 + Math.random() * 3,
}));

const unitValueComparison = topPortsData.slice(0, 5).map(p => ({
  port: p.name,
  value: 94 + Math.random() * 8,
  volatility: p.congestion === "Low" ? "Low" : p.congestion === "High" ? "High" : "Medium",
}));

const historicalData = topPortsData.slice(0, 5).map(p => ({
  port: p.name,
  avg: 94 + Math.random() * 8,
  min: 78 + Math.random() * 10,
  max: 108 + Math.random() * 15,
}));

const volatilityTrend = costTrendData.slice(0, 6).map(d => ({
  month: d.month,
  jnpt: 8 + Math.random() * 6,
  mundra: 6 + Math.random() * 4,
  kandla: 14 + Math.random() * 8,
}));

const getVolatilityColor = (level: string) => {
  switch (level) {
    case "Low":
      return "bg-success/10 text-success";
    case "Medium":
      return "bg-warning/10 text-warning";
    case "High":
      return "bg-destructive/10 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function CostIntelligence() {
  const [selectedProduct, setSelectedProduct] = React.useState("crude");

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Cost Intelligence</h1>
              <p className="text-sm text-muted-foreground">
                Indicative landed cost comparison using public data proxies
              </p>
            </div>
        <div className="flex gap-3">
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="crude">Crude Oil</SelectItem>
              <SelectItem value="lng">LNG</SelectItem>
              <SelectItem value="motor">Motor Spirit</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-info/5 border border-info/20">
            <AlertCircle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Data Disclaimer</p>
              <p className="text-muted-foreground mt-1">
                Cost estimates are indicative and based on public data sources. Actual costs may vary based on specific contract terms, volume, timing, and market conditions.
              </p>
            </div>
          </div>

          {/* Unit Value Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[380px]">
              <div className="card-elevated p-5 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                    <div className="w-1 h-5 bg-chart-1 rounded-full"></div>
                    Port-wise Unit Value
                  </h3>
                  <AIInsightsButton 
                    chartTitle="Port-wise Unit Value Comparison"
                    chartData={unitValueComparison}
                    chartType="bar"
                    contextDescription="Comparison of unit values across different ports"
                  />
                </div>
                <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={unitValueComparison} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[90, 110]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis type="category" dataKey="port" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`$${value}/MT`, "Unit Value"]}
                />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="h-[380px]">
              <div className="card-elevated p-5 h-full flex flex-col">
                <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
                  <div className="w-1 h-5 bg-chart-2 rounded-full"></div>
                  Price Volatility
                </h3>
                <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            {unitValueComparison.map((port) => (
              <div key={port.port} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium">{port.port}</p>
                  <p className="text-sm text-muted-foreground">${port.value}/MT avg</p>
                </div>
                <span className={`badge-status ${getVolatilityColor(port.volatility)}`}>
                  {port.volatility} Volatility
                </span>
                </div>
              ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cost Breakdown - Multiple Views */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Cost Breakdown Comparison</h2>
                <p className="text-sm text-muted-foreground">Two different ways to visualize the same data</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 1. Stacked Bar Chart */}
              <div className="card-elevated p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <div className="w-1 h-5 bg-chart-1 rounded-full"></div>
                      Stacked View
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">Total cost by port</p>
                  </div>
                  <AIInsightsButton 
                    chartTitle="Cost Breakdown - Stacked Bar"
                    chartData={costBreakdown}
                    chartType="bar"
                    contextDescription="Stacked bar chart showing total cost breakdown"
                  />
                </div>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="port" tick={{ fill: "hsl(var(--foreground))", fontSize: 11 }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="fob" stackId="a" fill="hsl(var(--chart-1))" name="FOB" />
                      <Bar dataKey="freight" stackId="a" fill="hsl(var(--chart-2))" name="Freight" />
                      <Bar dataKey="duty" stackId="a" fill="hsl(var(--chart-3))" name="Duty" />
                      <Bar dataKey="portCharges" stackId="a" fill="hsl(var(--chart-4))" name="Port Charges" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "hsl(var(--chart-1))" }} />
                    <span className="text-xs text-muted-foreground">FOB</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "hsl(var(--chart-2))" }} />
                    <span className="text-xs text-muted-foreground">Freight</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "hsl(var(--chart-3))" }} />
                    <span className="text-xs text-muted-foreground">Duty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "hsl(var(--chart-4))" }} />
                    <span className="text-xs text-muted-foreground">Port Charges</span>
                  </div>
                </div>
              </div>

              {/* 2. Grouped Bar Chart */}
              <div className="card-elevated p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <div className="w-1 h-5 bg-chart-2 rounded-full"></div>
                      Grouped View
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">Compare components</p>
                  </div>
                  <AIInsightsButton 
                    chartTitle="Cost Breakdown - Grouped Bar"
                    chartData={costBreakdown}
                    chartType="bar"
                    contextDescription="Grouped bar chart for component comparison"
                  />
                </div>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="port" tick={{ fill: "hsl(var(--foreground))", fontSize: 11 }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="fob" fill="hsl(var(--chart-1))" name="FOB" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="freight" fill="hsl(var(--chart-2))" name="Freight" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="duty" fill="hsl(var(--chart-3))" name="Duty" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="portCharges" fill="hsl(var(--chart-4))" name="Port Charges" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "hsl(var(--chart-1))" }} />
                    <span className="text-xs text-muted-foreground">FOB</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "hsl(var(--chart-2))" }} />
                    <span className="text-xs text-muted-foreground">Freight</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "hsl(var(--chart-3))" }} />
                    <span className="text-xs text-muted-foreground">Duty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "hsl(var(--chart-4))" }} />
                    <span className="text-xs text-muted-foreground">Port Charges</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Table */}
          <div className="card-elevated overflow-hidden">
            <div className="p-5 border-b border-border">
              <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                <div className="w-1 h-5 bg-chart-4 rounded-full"></div>
                Historical Unit Value
              </h3>
              <p className="text-sm text-muted-foreground">USD/MT over the last 12 months</p>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Port</th>
                <th>Average</th>
                <th>Minimum</th>
                <th>Maximum</th>
                <th>Range</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.map((row) => (
                <tr key={row.port}>
                  <td className="font-medium">{row.port}</td>
                  <td>${row.avg}</td>
                  <td className="text-success">${row.min}</td>
                  <td className="text-destructive">${row.max}</td>
                  <td className="text-muted-foreground">${row.max - row.min}</td>
                </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          {/* Volatility Trend */}
          <div className="card-elevated p-5">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  <div className="w-1 h-5 bg-chart-5 rounded-full"></div>
                  Price Volatility Trend
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Monthly volatility index by port</p>
              </div>
              <AIInsightsButton 
                chartTitle="Price Volatility Trend"
                chartData={volatilityTrend}
                chartType="line"
                contextDescription="Multi-line chart showing monthly volatility index trends across different ports"
              />
            </div>
            <div className="h-[280px] mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={volatilityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="jnpt" stroke="hsl(var(--chart-1))" strokeWidth={2} name="JNPT" />
              <Line type="monotone" dataKey="mundra" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Mundra" />
              <Line type="monotone" dataKey="kandla" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Kandla" />
            </LineChart>
          </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
