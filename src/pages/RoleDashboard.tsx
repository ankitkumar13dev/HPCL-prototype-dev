import { useState } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  DollarSign,
  Ship,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Users,
  Package,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const roles = [
  { id: "procurement", name: "Procurement Manager", icon: Package },
  { id: "operations", name: "Operations Head", icon: Ship },
  { id: "finance", name: "Finance Controller", icon: DollarSign },
  { id: "executive", name: "Executive Leadership", icon: Target },
];

const roleSpecificData = {
  procurement: {
    kpis: [
      { title: "Pending Orders", value: "24", change: -12, changeLabel: "from last week", icon: Clock, variant: "success" as const },
      { title: "Avg Lead Time", value: "14 Days", change: -8, changeLabel: "improvement", icon: TrendingUp, variant: "success" as const },
      { title: "Supplier Reliability", value: "94%", change: 3, changeLabel: "vs target 90%", icon: CheckCircle, variant: "default" as const },
      { title: "Cost Variance", value: "+2.3%", change: 2.3, changeLabel: "from baseline", icon: AlertTriangle, variant: "warning" as const },
    ],
    tasks: [
      { title: "Review Q1 crude oil contracts", priority: "high", dueDate: "Today", status: "pending" },
      { title: "Approve LNG supplier bids", priority: "high", dueDate: "Tomorrow", status: "pending" },
      { title: "Negotiate Mundra port tariffs", priority: "medium", dueDate: "Jan 22", status: "in-progress" },
      { title: "Update vendor performance scorecards", priority: "medium", dueDate: "Jan 25", status: "pending" },
      { title: "Monthly procurement report", priority: "low", dueDate: "Jan 30", status: "pending" },
    ],
    insights: [
      { type: "opportunity", text: "Saudi Arabia crude prices dropped 3.2%. Consider increasing order volume." },
      { type: "risk", text: "2 suppliers have delivery delays. Activate backup sources." },
      { type: "info", text: "Q4 procurement costs were 4% under budget." },
    ]
  },
  operations: {
    kpis: [
      { title: "Active Vessels", value: "18", change: 12, changeLabel: "vessels this week", icon: Ship, variant: "default" as const },
      { title: "Port Efficiency", value: "87%", change: 5, changeLabel: "improvement", icon: TrendingUp, variant: "success" as const },
      { title: "Turnaround Time", value: "2.8 Days", change: -15, changeLabel: "reduction", icon: Clock, variant: "success" as const },
      { title: "Capacity Utilization", value: "78%", change: 8, changeLabel: "vs last month", icon: BarChart3, variant: "default" as const },
    ],
    tasks: [
      { title: "Coordinate JNPT berth allocation", priority: "high", dueDate: "Today", status: "in-progress" },
      { title: "Review Kandla congestion report", priority: "high", dueDate: "Today", status: "pending" },
      { title: "Schedule Chennai maintenance window", priority: "medium", dueDate: "Jan 23", status: "pending" },
      { title: "Update vessel tracking protocols", priority: "medium", dueDate: "Jan 26", status: "in-progress" },
      { title: "Weekly operations team sync", priority: "low", dueDate: "Jan 20", status: "completed" },
    ],
    insights: [
      { type: "risk", text: "Kandla port congestion at 92%. Consider rerouting to Mundra." },
      { type: "opportunity", text: "JNPT new berth operational. 20% capacity increase available." },
      { type: "info", text: "3 vessels ahead of schedule this week." },
    ]
  },
  finance: {
    kpis: [
      { title: "Monthly Spend", value: "$142M", change: -5, changeLabel: "under forecast", icon: DollarSign, variant: "success" as const },
      { title: "Payment Pending", value: "$28.4M", change: 0, changeLabel: "due in 7 days", icon: Clock, variant: "warning" as const },
      { title: "Cost per TEU", value: "$1,240", change: -3, changeLabel: "optimization", icon: TrendingUp, variant: "success" as const },
      { title: "Budget Variance", value: "-4.2%", change: -4.2, changeLabel: "favorable", icon: CheckCircle, variant: "success" as const },
    ],
    tasks: [
      { title: "Approve Q1 budget allocations", priority: "high", dueDate: "Today", status: "pending" },
      { title: "Process vendor invoices ($12M)", priority: "high", dueDate: "Tomorrow", status: "in-progress" },
      { title: "Review FX hedging strategy", priority: "medium", dueDate: "Jan 24", status: "pending" },
      { title: "Monthly financial reconciliation", priority: "medium", dueDate: "Jan 28", status: "pending" },
      { title: "Prepare board presentation", priority: "low", dueDate: "Jan 31", status: "pending" },
    ],
    insights: [
      { type: "opportunity", text: "Favorable USD/INR rates. Consider early payment for 2% discount." },
      { type: "info", text: "Q4 achieved 96% cost forecast accuracy." },
      { type: "risk", text: "Crude oil price volatility increased 18% this month." },
    ]
  },
  executive: {
    kpis: [
      { title: "Total Trade Value", value: "$1.8B", change: 8.2, changeLabel: "YTD growth", icon: TrendingUp, variant: "default" as const },
      { title: "Strategic Goals", value: "8/10", change: 80, changeLabel: "on track", icon: Target, variant: "success" as const },
      { title: "Risk Score", value: "Medium", change: 0, changeLabel: "2 active risks", icon: AlertTriangle, variant: "warning" as const },
      { title: "Market Share", value: "23.4%", change: 1.2, changeLabel: "vs Q3", icon: BarChart3, variant: "success" as const },
    ],
    tasks: [
      { title: "Review strategic initiatives dashboard", priority: "high", dueDate: "Today", status: "pending" },
      { title: "Board meeting preparation", priority: "high", dueDate: "Jan 21", status: "in-progress" },
      { title: "Approve expansion plans", priority: "medium", dueDate: "Jan 25", status: "pending" },
      { title: "Stakeholder communications", priority: "medium", dueDate: "Jan 27", status: "pending" },
      { title: "Quarterly performance review", priority: "low", dueDate: "Jan 30", status: "pending" },
    ],
    insights: [
      { type: "opportunity", text: "LNG market growth at 24%. Consider increasing capacity investments." },
      { type: "info", text: "All major KPIs tracking above industry benchmarks." },
      { type: "risk", text: "Geopolitical tensions may impact Middle East supply routes." },
    ]
  }
};

export default function RoleDashboard() {
  const [selectedRole, setSelectedRole] = useState("procurement");
  const data = roleSpecificData[selectedRole as keyof typeof roleSpecificData];
  const currentRole = roles.find(r => r.id === selectedRole);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Role Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Personalized insights and tasks for your role
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      <div className="flex items-center gap-2">
                        <role.icon className="w-4 h-4" />
                        {role.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Role Header Card */}
          <Card className="p-6 bg-gradient-to-r from-sidebar-primary/10 to-sidebar-primary/5 border-sidebar-primary/20">
            <div className="flex items-center gap-4">
              {currentRole && <currentRole.icon className="w-12 h-12 text-sidebar-primary" />}
              <div>
                <h2 className="text-2xl font-semibold text-foreground">{currentRole?.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Welcome back! Here's your personalized dashboard
                </p>
              </div>
            </div>
          </Card>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {data.kpis.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Tasks & Action Items */}
            <div className="xl:col-span-2">
              <Card className="p-6 h-full">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                    <div className="w-1 h-5 bg-chart-1 rounded-full"></div>
                    Tasks & Action Items
                  </h3>
                  <Badge variant="secondary">{data.tasks.filter(t => t.status === 'pending').length} Pending</Badge>
                </div>
                <div className="space-y-3">
                  {data.tasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        task.status === 'completed' ? 'bg-success' :
                        task.status === 'in-progress' ? 'bg-warning' :
                        'bg-muted-foreground'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-sm text-foreground">{task.title}</p>
                          <Badge 
                            variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.dueDate}
                          </span>
                          <span className="capitalize">{task.status.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Insights & Alerts */}
            <div className="flex flex-col gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
                  <div className="w-1 h-5 bg-chart-2 rounded-full"></div>
                  Key Insights
                </h3>
                <div className="space-y-3">
                  {data.insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        insight.type === 'opportunity' ? 'bg-success/5 border-success/20' :
                        insight.type === 'risk' ? 'bg-destructive/5 border-destructive/20' :
                        'bg-muted/50 border-border'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {insight.type === 'opportunity' && <TrendingUp className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />}
                        {insight.type === 'risk' && <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />}
                        {insight.type === 'info' && <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />}
                        <p className="text-sm text-foreground">{insight.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
                  <div className="w-1 h-5 bg-chart-3 rounded-full"></div>
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-lg hover:bg-accent/50 transition-colors text-sm font-medium text-foreground">
                    View Detailed Reports →
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-accent/50 transition-colors text-sm font-medium text-foreground">
                    Schedule Team Meeting →
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-accent/50 transition-colors text-sm font-medium text-foreground">
                    Export Dashboard Data →
                  </button>
                  <button className="w-full text-left p-3 rounded-lg hover:bg-accent/50 transition-colors text-sm font-medium text-foreground">
                    Contact Support →
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
