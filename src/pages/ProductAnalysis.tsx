import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { productCategories, topPortsData, costTrendData, productComparisonByPort } from "@/lib/mockData";
import { AIInsightsButton } from "@/components/charts/AIInsightsButton";

const products = productCategories.map(p => ({
  id: p.id,
  name: p.name,
  volume: Math.round(p.value * 1.2), // Mock volume calculation
  value: p.value,
  growth: p.growth,
}));

const portDistribution = topPortsData.slice(0, 5).map(p => ({
  name: p.name,
  value: Math.round((p.value / 8500) * 100), // Percentage distribution
}));

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

// Function to get unit value trend based on selected product
const getUnitValueTrend = (productId: string) => {
  const productKey = productId === 'crude' ? 'crude' : 
                     productId === 'lng' ? 'lng' : 
                     productId === 'motor' ? 'motor' : 
                     productId === 'diesel' ? 'diesel' : 'crude';
  
  return costTrendData.map(d => ({
    month: d.month,
    value: d[productKey as keyof typeof d] || d.crude,
  }));
};

// Function to generate comparison data based on selected products using pre-generated static data
const generateComparisonData = (product1Id: string, product2Id: string) => {
  return topPortsData.slice(0, 5).map((p) => ({
    port: p.name,
    product1: productComparisonByPort[p.name as keyof typeof productComparisonByPort]?.[product1Id as keyof typeof productComparisonByPort.JNPT] || 0,
    product2: productComparisonByPort[p.name as keyof typeof productComparisonByPort]?.[product2Id as keyof typeof productComparisonByPort.JNPT] || 0,
  }));
};

export default function ProductAnalysis() {
  const [selectedProduct, setSelectedProduct] = useState("crude");
  const [compareProduct, setCompareProduct] = useState("lng");
  
  // Generate data dynamically based on selected products
  const unitValueTrend = getUnitValueTrend(selectedProduct);
  const comparisonData = generateComparisonData(selectedProduct, compareProduct);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Product Analysis</h1>
              <p className="text-sm text-muted-foreground">
                Analyze product-level trends and port concentration
              </p>
            </div>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className={`kpi-card cursor-pointer transition-all hover:shadow-lg ${
                  selectedProduct === product.id ? "ring-2 ring-accent shadow-lg scale-105" : ""
                }`}
                onClick={() => setSelectedProduct(product.id)}
              >
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{product.name}</p>
                <p className="text-2xl font-bold mt-2">${(product.value / 1000).toFixed(1)}B</p>
                <p className={`text-sm mt-1.5 font-medium ${product.growth > 0 ? "text-success" : "text-destructive"}`}>
                  {product.growth > 0 ? "+" : ""}{product.growth}% YoY
                </p>
              </div>
            ))}
          </div>

          <Tabs defaultValue="distribution" className="space-y-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="distribution">Port Distribution</TabsTrigger>
              <TabsTrigger value="trend">Price Trend</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
            </TabsList>

            <TabsContent value="distribution" className="space-y-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="h-[380px]">
                  <div className="card-elevated p-5 h-full flex flex-col">
                    <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2 flex-shrink-0">
                      <div className="w-1 h-5 bg-chart-1 rounded-full"></div>
                      Volume Share by Port
                    </h3>
                    <div className="flex-1 min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={portDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {portDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                            formatter={(value: number) => [`${value}%`, "Share"]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-4 flex-shrink-0">
                      {portDistribution.map((port, index) => (
                        <div key={port.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="text-sm text-muted-foreground">{port.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Distribution Details */}
                <div className="card-elevated p-5">
                  <h3 className="font-semibold text-foreground mb-4">Port-wise Breakdown</h3>
                  <div className="space-y-4">
                    {portDistribution.map((port, index) => (
                      <div key={port.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{port.name}</span>
                          <span className="text-muted-foreground">{port.value}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${port.value}%`,
                              backgroundColor: COLORS[index],
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

        <TabsContent value="trend" className="space-y-6">
          <div className="card-elevated p-5">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-semibold text-foreground">Unit Value Trend</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Average unit value (USD/MT) over the last 12 months
                </p>
              </div>
              <AIInsightsButton 
                chartTitle="Unit Value Trend"
                chartData={unitValueTrend}
                chartType="line"
                contextDescription="Monthly unit value trends showing price fluctuations over the past year"
              />
            </div>
            <div className="h-[350px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={unitValueTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    domain={["auto", "auto"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}/MT`, "Unit Value"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 0, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compare" className="space-y-6">
          <div className="flex gap-4 mb-4">
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Product 1" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="flex items-center text-muted-foreground">vs</span>
            <Select value={compareProduct} onValueChange={setCompareProduct}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Product 2" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="card-elevated p-5">
            <h3 className="font-semibold text-foreground mb-4">Unit Value Comparison by Port</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
                  <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <YAxis
                    type="category"
                    dataKey="port"
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="product1" fill="hsl(var(--chart-1))" name={products.find(p => p.id === selectedProduct)?.name} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="product2" fill="hsl(var(--chart-2))" name={products.find(p => p.id === compareProduct)?.name} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>
        </div>
      </div>
    </div>
  );
}
