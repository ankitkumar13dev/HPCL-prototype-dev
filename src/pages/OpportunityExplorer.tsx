import { TrendingUp, Star, MapPin, ArrowRight } from "lucide-react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import { 
  opportunityMatrix, 
  underutilizedPorts, 
  emergingOpportunities, 
  tradeCorridors 
} from "@/lib/mockData";
import { AIInsightsButton } from "@/components/charts/AIInsightsButton";

export default function OpportunityExplorer() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Opportunity Explorer</h1>
            <p className="text-sm text-muted-foreground">
              Identify growth, optimization, and diversification opportunities
            </p>
          </div>

          {/* Opportunity Matrix */}
          <div className="card-elevated p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  <div className="w-1 h-5 bg-chart-1 rounded-full"></div>
                  Opportunity Matrix
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Volume Growth vs Price Stability - Identify high potential opportunities
                </p>
              </div>
              <AIInsightsButton 
                chartTitle="Opportunity Matrix"
                chartData={opportunityMatrix}
                chartType="mixed"
                contextDescription="Scatter plot showing product-port opportunities based on volume growth and price stability, with bubble size representing trade volume"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart */}
              <div className="lg:col-span-2 h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              
              {/* Quadrant Lines */}
              <line x1="15%" y1="0" x2="15%" y2="100%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="5 5" opacity="0.3" />
              <line x1="0" y1="75%" x2="100%" y2="75%" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="5 5" opacity="0.3" />
              
              <XAxis
                type="number"
                dataKey="growth"
                name="Growth %"
                unit="%"
                domain={[0, 30]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                label={{ value: "Volume Growth (%)", position: "bottom", offset: 0, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                type="number"
                dataKey="stability"
                name="Stability"
                domain={[50, 100]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                label={{ value: "Price Stability Index", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))" }}
              />
              <ZAxis type="number" dataKey="size" range={[100, 500]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number, name: string) => {
                  if (name === "Growth %") return [value, "Growth"];
                  if (name === "Stability") return [value, "Stability Index"];
                  return [value, name];
                }}
                labelFormatter={(label) => opportunityMatrix.find(o => o.growth === label)?.name || ""}
              />
              <Scatter
                data={opportunityMatrix}
                fill="hsl(var(--chart-1))"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
              </div>
              
              {/* Quadrant Guide */}
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-success/10 border border-success/30">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <span className="font-semibold text-sm">High Priority</span>
                  </div>
                  <p className="text-xs text-muted-foreground">High Growth + High Stability</p>
                  <p className="text-xs text-foreground mt-1 font-medium">→ Focus & Expand</p>
                </div>
                
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <span className="font-semibold text-sm">Emerging</span>
                  </div>
                  <p className="text-xs text-muted-foreground">High Growth + Lower Stability</p>
                  <p className="text-xs text-foreground mt-1 font-medium">→ Monitor & Hedge Risk</p>
                </div>
                
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                    <span className="font-semibold text-sm">Stable Core</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Lower Growth + High Stability</p>
                  <p className="text-xs text-foreground mt-1 font-medium">→ Maintain & Optimize</p>
                </div>
                
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-warning"></div>
                    <span className="font-semibold text-sm">Watch</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Lower Growth + Lower Stability</p>
                  <p className="text-xs text-foreground mt-1 font-medium">→ Reduce Exposure</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Underutilized Ports */}
            <div className="h-[380px]">
              <div className="card-elevated p-5 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground text-lg">Underutilized Ports</h3>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
            {underutilizedPorts.map((item) => (
              <div key={item.port} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.port}</span>
                  <span className={`badge-status ${
                    item.potential === "High" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>
                    {item.potential} Potential
                  </span>
                </div>
                  <p className="text-sm text-muted-foreground">{item.reason}</p>
                </div>
              ))}
                </div>
              </div>
            </div>

            {/* Emerging Trends */}
            <div className="h-[380px]">
              <div className="card-elevated p-5 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground text-lg">Emerging Opportunities</h3>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar">
            {emergingOpportunities.map((item, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-accent/10 text-accent">
                    {item.type}
                  </span>
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-auto text-sm font-semibold text-success">{item.metric}</span>
                </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trade Corridors */}
          <div className="card-elevated p-5">
            <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
              <div className="w-1 h-5 bg-chart-2 rounded-full"></div>
              Active Trade Corridors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tradeCorridors.map((corridor, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{corridor.origin}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{corridor.port}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{corridor.volume}% of imports</p>
                  </div>
                  <span className={`text-xs font-medium ${
                    corridor.trend === "growing" ? "text-success" : 
                    corridor.trend === "declining" ? "text-destructive" : "text-muted-foreground"
                  }`}>
                    {corridor.trend === "growing" ? "↑" : corridor.trend === "declining" ? "↓" : "→"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunity Score */}
          <div className="card-elevated p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground text-lg">Top Opportunity Score Card</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-success/5 border border-success/20">
            <p className="text-sm font-medium text-foreground">LNG via Mundra</p>
            <p className="text-2xl font-bold text-success mt-1">92/100</p>
            <p className="text-xs text-muted-foreground mt-2">High growth, strong stability, competitive costs</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                <p className="text-sm font-medium text-foreground">Crude via Paradip</p>
                <p className="text-2xl font-bold text-accent mt-1">78/100</p>
                <p className="text-xs text-muted-foreground mt-2">Underutilized capacity, improving infrastructure</p>
              </div>
              <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                <p className="text-sm font-medium text-foreground">Naphtha via Kandla</p>
                <p className="text-2xl font-bold text-warning mt-1">65/100</p>
                <p className="text-xs text-muted-foreground mt-2">Good growth but higher volatility risk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
