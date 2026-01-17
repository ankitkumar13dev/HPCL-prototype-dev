import { AlertTriangle, TrendingUp, AlertCircle, Info, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

interface Alert {
  id: string;
  type: "warning" | "info" | "success" | "error";
  title: string;
  description: string;
  timestamp: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Congestion Alert: Kandla Port",
    description: "Average vessel turnaround time increased by 18% in the last 30 days",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "success",
    title: "Emerging Trend: LNG Imports",
    description: "LNG imports through JNPT grew 24% YoY, indicating strong demand",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    type: "info",
    title: "Price Movement: Crude Oil",
    description: "Brent crude unit value decreased 8% from last month's average",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    type: "error",
    title: "High Volatility: Petroleum Products",
    description: "Motor spirit prices showing 22% volatility above historical average",
    timestamp: "1 day ago",
  },
  {
    id: "5",
    type: "warning",
    title: "Capacity Alert: Chennai Port",
    description: "Port utilization reached 92% capacity, potential delays expected",
    timestamp: "2 days ago",
  },
  {
    id: "6",
    type: "info",
    title: "Trade Route Update",
    description: "New shipping route from Middle East showing 15% increased activity",
    timestamp: "2 days ago",
  },
];

const getAlertIcon = (type: Alert["type"]) => {
  switch (type) {
    case "warning":
      return AlertTriangle;
    case "success":
      return TrendingUp;
    case "error":
      return AlertCircle;
    default:
      return Info;
  }
};

const getAlertStyles = (type: Alert["type"]) => {
  switch (type) {
    case "warning":
      return "bg-warning/5";
    case "success":
      return "bg-success/5";
    case "error":
      return "bg-destructive/5";
    default:
      return "bg-info/5";
  }
};

const getIconStyles = (type: Alert["type"]) => {
  switch (type) {
    case "warning":
      return "text-warning";
    case "success":
      return "text-success";
    case "error":
      return "text-destructive";
    default:
      return "text-info";
  }
};

export function AlertsPanel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopIndicator, setShowTopIndicator] = useState(false);
  const [showBottomIndicator, setShowBottomIndicator] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowTopIndicator(scrollTop > 10);
    setShowBottomIndicator(scrollTop < scrollHeight - clientHeight - 10);
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => scrollEl.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="card-elevated p-5 h-full flex flex-col relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
          <div className="w-1 h-5 bg-warning rounded-full"></div>
          Trade Alerts
        </h3>
        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/50 rounded">Last 7 days</span>
      </div>

      {/* Top Scroll Indicator */}
      {showTopIndicator && (
        <div className="absolute top-[72px] left-0 right-0 h-10 bg-gradient-to-b from-card via-card/90 to-transparent z-10 flex items-start justify-center pt-1.5 pointer-events-none">
          <ChevronUp className="w-4 h-4 text-muted-foreground animate-bounce" />
        </div>
      )}

      {/* Scrollable Content */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 space-y-3 alerts-scrollbar scroll-snap-container"
      >
        {mockAlerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={cn(
                "p-4 rounded-lg border-l-4 transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer scroll-snap-item",
                "min-h-[115px] flex items-center",
                getAlertStyles(alert.type)
              )}
            >
              <div className="flex items-start gap-3 w-full">
                <div className={cn(
                  "p-2.5 rounded-lg flex-shrink-0",
                  alert.type === "warning" && "bg-warning/10",
                  alert.type === "success" && "bg-success/10",
                  alert.type === "error" && "bg-destructive/10",
                  alert.type === "info" && "bg-info/10"
                )}>
                  <Icon className={cn("w-5 h-5", getIconStyles(alert.type))} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight mb-1.5">
                    {alert.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {alert.description}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60"></span>
                    {alert.timestamp}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Scroll Indicator */}
      {showBottomIndicator && (
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card via-card/90 to-transparent z-10 flex items-end justify-center pb-1.5 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
        </div>
      )}
    </div>
  );
}
