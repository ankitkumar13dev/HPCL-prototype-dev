import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
}

export function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = "default",
}: KPICardProps) {
  const getTrendIcon = () => {
    if (!change) return <Minus className="w-3 h-3" />;
    return change > 0 ? (
      <TrendingUp className="w-3 h-3" />
    ) : (
      <TrendingDown className="w-3 h-3" />
    );
  };

  const getTrendColor = () => {
    if (!change) return "text-muted-foreground";
    return change > 0 ? "text-success" : "text-destructive";
  };

  const getIconBgColor = () => {
    switch (variant) {
      case "success":
        return "bg-success/10 text-success";
      case "warning":
        return "bg-warning/10 text-warning";
      case "destructive":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-accent/10 text-accent";
    }
  };

  const getTrendBorderClass = () => {
    if (change !== undefined) {
      return change > 0 ? "kpi-card-trend-up" : "kpi-card-trend-down";
    }
    // Use variant-based border when no trend
    if (variant === "warning") return "kpi-card-warning";
    if (variant === "destructive") return "kpi-card-destructive";
    return "kpi-card-trend-neutral";
  };

  return (
    <div className={cn("kpi-card group", getTrendBorderClass())}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="stat-label">{title}</p>
          <p className="stat-value mt-2">{value}</p>
          {(change !== undefined || changeLabel) && (
            <div className={cn("flex items-center gap-1 mt-2 text-sm", getTrendColor())}>
              {getTrendIcon()}
              <span className="font-medium">
                {change !== undefined && `${change > 0 ? "+" : ""}${change}%`}
              </span>
              {changeLabel && (
                <span className="text-muted-foreground">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-lg transition-all duration-200 group-hover:scale-105", getIconBgColor())}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
