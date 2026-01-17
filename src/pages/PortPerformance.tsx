import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { portPerformanceData, tradeValueData } from "@/lib/mockData";
import IndiaPortMap from "@/components/maps/IndiaPortMap";
import { AIInsightsButton } from "@/components/charts/AIInsightsButton";

export default function PortPerformance() {
  const [selectedPort, setSelectedPort] = useState<string | undefined>(undefined);
  const [selectedProductFilter, setSelectedProductFilter] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("12m");

  // Filter data based on selected period
  const periodMonths = useMemo(() => {
    switch (selectedPeriod) {
      case "3m": return 3;
      case "6m": return 6;
      case "12m": return 12;
      case "24m": return 12; // We only have 12 months of data
      default: return 12;
    }
  }, [selectedPeriod]);

  const filteredTradeData = useMemo(() => {
    return tradeValueData.slice(-periodMonths);
  }, [periodMonths]);

  const trendData = useMemo(() => {
    // Get multiplier based on selected port
    const portMultipliers: Record<string, number> = {
      "JNPT": 1.2,
      "Mundra": 1.0,
      "Kandla": 0.8,
      "Chennai": 0.7,
      "Visakhapatnam": 0.9,
      "Paradip": 0.6,
      "Mangalore": 0.5,
      "Kochi": 0.4
    };
    
    const multiplier = selectedPort ? (portMultipliers[selectedPort] || 1) : 1;
    
    return filteredTradeData.map(d => ({
      month: d.month,
      imports: Math.round((d.imports / 10) * multiplier),
      exports: Math.round((d.exports / 10) * multiplier),
    }));
  }, [filteredTradeData, selectedPort]);

  const seasonalData = useMemo(() => {
    // Get multiplier based on selected port
    const portMultipliers: Record<string, number> = {
      "JNPT": 1.2,
      "Mundra": 1.0,
      "Kandla": 0.8,
      "Chennai": 0.7,
      "Visakhapatnam": 0.9,
      "Paradip": 0.6,
      "Mangalore": 0.5,
      "Kochi": 0.4
    };
    
    const multiplier = selectedPort ? (portMultipliers[selectedPort] || 1) : 1;
    
    return filteredTradeData.map(d => ({
      month: d.month,
      volume: Math.round(((d.imports + d.exports) / 80) * multiplier),
    }));
  }, [filteredTradeData, selectedPort]);

  // Filter ports based on product (adjust multiplier and rankings based on product)
  const ports = useMemo(() => {
    // Different ports have different strengths for different products
    const productMultipliers: Record<string, Record<string, number>> = {
      "all": {
        "JNPT": 1, "Mundra": 1, "Kandla": 1, "Chennai": 1,
        "Visakhapatnam": 1, "Paradip": 1, "Mangalore": 1, "Kochi": 1
      },
      "crude": {
        "JNPT": 1.3, "Mundra": 0.7, "Kandla": 1.1, "Chennai": 0.9,
        "Visakhapatnam": 1.4, "Paradip": 1.2, "Mangalore": 0.8, "Kochi": 0.6
      },
      "lng": {
        "JNPT": 0.8, "Mundra": 1.5, "Kandla": 1.3, "Chennai": 1.1,
        "Visakhapatnam": 0.7, "Paradip": 0.6, "Mangalore": 1.2, "Kochi": 1.4
      },
      "motor": {
        "JNPT": 1.2, "Mundra": 1.1, "Kandla": 0.9, "Chennai": 1.3,
        "Visakhapatnam": 1.0, "Paradip": 0.8, "Mangalore": 1.1, "Kochi": 0.9
      }
    };

    const multipliers = productMultipliers[selectedProductFilter] || productMultipliers["all"];
    
    return portPerformanceData.map(p => ({
      name: p.port,
      lat: p.location.lat,
      lng: p.location.lng,
      volume: Math.round((p.metrics.totalVolume / 100) * multipliers[p.port]),
      growth: p.metrics.efficiency > 90 ? 12 : p.metrics.efficiency > 85 ? 8 : p.metrics.efficiency > 80 ? 5 : -3,
    })).sort((a, b) => b.volume - a.volume); // Sort by volume descending
  }, [selectedProductFilter]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Port Performance</h1>
              <p className="text-sm text-muted-foreground">
                Compare ports by volume, value, and operational metrics
              </p>
            </div>
            <div className="flex gap-3">
              <Select value={selectedProductFilter} onValueChange={setSelectedProductFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="crude">Crude Oil</SelectItem>
                  <SelectItem value="lng">LNG</SelectItem>
                  <SelectItem value="motor">Motor Spirit</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3m">Last 3 Months</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="12m">Last 12 Months</SelectItem>
                  <SelectItem value="24m">Last 24 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* India Map Placeholder */}
            <div className="xl:col-span-2 h-[450px]">
              <div className="card-elevated p-5 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                    <div className="w-1 h-5 bg-chart-1 rounded-full"></div>
                    Port Distribution Map
                  </h3>
                </div>
                <div className="flex-1 min-h-0 relative">
                  <IndiaPortMap 
                    ports={ports}
                    selectedPort={selectedPort}
                    onPortSelect={setSelectedPort}
                  />
                </div>
              </div>
            </div>

            {/* Port Ranking Table */}
        <div className="h-[450px]">
          <div className="card-elevated p-5 h-full flex flex-col">
            <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
              <div className="w-1 h-5 bg-chart-2 rounded-full"></div>
              Port Rankings
            </h3>
            <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {ports.map((port, index) => (
                <div
                  key={port.name}
                  className={cn(
                    "flex items-center justify-between p-3.5 rounded-lg cursor-pointer transition-all",
                    port.name === selectedPort
                      ? "bg-accent/10 border border-accent/30 shadow-sm"
                      : "hover:bg-muted/50 hover:shadow-sm"
                  )}
                  onClick={() => setSelectedPort(port.name)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-muted text-xs font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-sm">{port.name}</p>
                      <p className="text-xs text-muted-foreground">${port.volume * 100}M</p>
                    </div>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-semibold",
                    port.growth > 0 ? "text-success" : port.growth < 0 ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {port.growth > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : port.growth < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                    {port.growth > 0 ? "+" : ""}{port.growth}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Series */}
        <div className="h-[320px]">
          <div className="card-elevated p-5 h-full flex flex-col">
            <div className="flex-shrink-0 mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  <div className="w-1 h-5 bg-chart-3 rounded-full"></div>
                  {selectedPort || "Port"} Trade Trend
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Import vs Export (USD millions)</p>
              </div>
              <AIInsightsButton 
                chartTitle={`${selectedPort || "Port"} Trade Trend`}
                chartData={trendData}
                chartType="line"
                contextDescription="Import and export trade values over time"
              />
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(value) => `$${value}M`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="imports" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="exports" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Seasonal Pattern */}
        <div className="h-[320px]">
          <div className="card-elevated p-5 h-full flex flex-col">
            <div className="flex-shrink-0 mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                  <div className="w-1 h-5 bg-chart-4 rounded-full"></div>
                  Seasonal Pattern
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Monthly volume distribution index</p>
              </div>
              <AIInsightsButton 
                chartTitle="Seasonal Pattern"
                chartData={seasonalData}
                chartType="bar"
                contextDescription="Monthly trade volume patterns showing seasonal variations"
              />
            </div>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seasonalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}`, "Volume Index"]}
                  />
                  <Bar dataKey="volume" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
