import { KPICard } from "@/components/dashboard/KPICard";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { TradeValueChart } from "@/components/charts/TradeValueChart";
import { TopPortsChart } from "@/components/charts/TopPortsChart";
import { TrendingUp, TrendingDown, Package, AlertTriangle } from "lucide-react";

export default function ExecutiveOverview() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Executive Overview</h1>
            <p className="text-sm text-muted-foreground">
              Real-time trade metrics and intelligence for strategic decision-making
            </p>
          </div>

          {/* KPI Cards - Most Important Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <KPICard
              title="Total Import Value (12M)"
              value="$62.4B"
              change={8.2}
              changeLabel="vs last year"
              icon={TrendingUp}
              variant="default"
            />
            <KPICard
              title="Total Export Value (12M)"
              value="$36.8B"
              change={5.4}
              changeLabel="vs last year"
              icon={TrendingDown}
              variant="success"
            />
            <KPICard
              title="Fastest Growing Category"
              value="LNG"
              change={24}
              changeLabel="YoY growth"
              icon={Package}
              variant="success"
            />
            <KPICard
              title="Congestion Risk Port"
              value="Kandla"
              changeLabel="+18% turnaround time"
              icon={AlertTriangle}
              variant="warning"
            />
          </div>

          {/* Main Content Grid - Fixed Heights for Better Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Side - Charts */}
            <div className="xl:col-span-2 flex flex-col gap-6">
              {/* Trade Value Chart - Takes more space */}
              <div className="h-[400px]">
                <TradeValueChart />
              </div>
              
              {/* Top Ports Chart - Slightly smaller */}
              <div className="h-[320px]">
                <TopPortsChart />
              </div>
            </div>

            {/* Right Sidebar - Matches left side height */}
            <div className="flex flex-col gap-6">
              {/* Alerts Panel - Matches Trade Value Chart height */}
              <div className="h-[400px]">
                <AlertsPanel />
              </div>
              
              {/* Quick Insights - Matches Top Ports Chart height */}
              <div className="h-[320px]">
                <div className="card-elevated p-5 h-full flex flex-col">
                  <h3 className="font-semibold text-foreground mb-3 text-base flex items-center gap-2">
                    <div className="w-1 h-4 bg-accent rounded-full"></div>
                    Quick Insights
                  </h3>
                  <div className="flex-1 flex flex-col justify-center gap-3">
                    <div className="group p-4 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all cursor-pointer hover:shadow-md">
                      <p className="text-xs font-semibold text-accent uppercase tracking-wider">Import Concentration</p>
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <p className="text-3xl font-bold text-foreground">68%</p>
                        <p className="text-xs text-muted-foreground">Top 5 ports</p>
                      </div>
                    </div>
                    <div className="group p-4 rounded-lg bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 hover:border-warning/40 transition-all cursor-pointer hover:shadow-md">
                      <p className="text-xs font-semibold text-warning uppercase tracking-wider">Price Volatility</p>
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <p className="text-3xl font-bold text-foreground">Medium</p>
                        <p className="text-xs text-muted-foreground">30-day avg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
