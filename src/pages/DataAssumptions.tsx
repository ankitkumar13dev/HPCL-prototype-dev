import { Database, RefreshCw, FileText, AlertCircle, CheckCircle } from "lucide-react";

const dataSources = [
  {
    name: "Tradestat (DGCI&S)",
    description: "Official import/export statistics from Directorate General of Commercial Intelligence and Statistics",
    coverage: "All ports, all products",
    frequency: "Monthly",
    status: "active",
  },
  {
    name: "PPAC",
    description: "Petroleum Planning & Analysis Cell - petroleum product statistics",
    coverage: "Petroleum products only",
    frequency: "Weekly/Monthly",
    status: "active",
  },
  {
    name: "Port Authority Statistics",
    description: "Individual major port authority traffic and operational data",
    coverage: "12 major ports",
    frequency: "Monthly",
    status: "active",
  },
  {
    name: "Shipping Ministry Reports",
    description: "Aggregate port performance and capacity data",
    coverage: "All major and minor ports",
    frequency: "Quarterly",
    status: "active",
  },
];

const assumptions = [
  {
    category: "Cost Estimation",
    items: [
      "FOB prices derived from unit value calculations (Trade Value / Quantity)",
      "Freight costs estimated using standard voyage routes and vessel size proxies",
      "Port charges based on published tariff schedules from port authorities",
      "Duty calculations use applicable customs tariff rates as of reporting period",
    ],
  },
  {
    category: "Freight Proxies",
    items: [
      "VLCC rates used for crude oil shipments > 100,000 MT",
      "Suezmax rates for 50,000-100,000 MT shipments",
      "Aframax rates for smaller petroleum product shipments",
      "LNG rates based on spot charter market averages",
    ],
  },
  {
    category: "Data Treatment",
    items: [
      "Missing values interpolated using linear methods where appropriate",
      "Outliers flagged but included in analysis with appropriate warnings",
      "Currency conversions use RBI reference rates for the reporting period",
      "Volume data standardized to Metric Tonnes (MT) where applicable",
    ],
  },
];

const limitations = [
  "Unit values are averages and may not reflect actual contract prices",
  "Freight estimates do not account for specific contractual arrangements",
  "Port congestion indicators are derived from publicly available turnaround data",
  "Real-time pricing data is not available; analysis reflects historical patterns",
  "Minor ports may have incomplete or delayed data reporting",
  "Duty exemptions and special economic zone benefits are not individually modeled",
];

export default function DataAssumptions() {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Data & Assumptions</h1>
            <p className="text-sm text-muted-foreground">
              Transparency and methodology documentation
            </p>
          </div>

          {/* Data Freshness */}
          <div className="card-elevated p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground text-lg">Data Freshness</h3>
              </div>
          <span className="badge-status bg-success/10 text-success">
            <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
            Data Current
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">Trade Statistics</p>
            <p className="font-semibold mt-1">December 2025</p>
            <p className="text-xs text-muted-foreground mt-1">Updated monthly</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">Port Performance</p>
            <p className="font-semibold mt-1">January 2026</p>
            <p className="text-xs text-muted-foreground mt-1">Updated weekly</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">Price Indices</p>
            <p className="font-semibold mt-1">Week 2, 2026</p>
            <p className="text-xs text-muted-foreground mt-1">Updated weekly</p>
          </div>
        </div>
      </div>

          {/* Data Sources */}
          <div className="card-elevated p-5">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground text-lg">Data Sources</h3>
            </div>
        <div className="space-y-4">
          {dataSources.map((source) => (
            <div key={source.name} className="p-4 rounded-lg border border-border bg-muted/20">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground">{source.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{source.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Coverage: {source.coverage}</span>
                    <span>Frequency: {source.frequency}</span>
                  </div>
                </div>
                <span className="badge-status bg-success/10 text-success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

          {/* Key Assumptions */}
          <div className="card-elevated p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground text-lg">Key Assumptions</h3>
            </div>
        <div className="space-y-6">
          {assumptions.map((section) => (
            <div key={section.category}>
              <h4 className="text-sm font-semibold text-foreground mb-3">{section.category}</h4>
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

          {/* Disclaimer */}
          <div className="card-elevated p-5 border-l-4 border-l-warning">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground text-lg">Important Disclaimer</h3>
            <p className="text-sm text-muted-foreground mt-2">
              This application provides indicative analysis based on publicly available data. 
              All estimates are for informational purposes only and should not be used as the 
              sole basis for trading or procurement decisions. Actual costs, prices, and 
              operational conditions may differ significantly from estimates shown.
            </p>
            <h4 className="text-sm font-semibold text-foreground mt-4 mb-2">Known Limitations:</h4>
            <ul className="space-y-1">
              {limitations.map((limitation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-warning mt-2 flex-shrink-0" />
                  {limitation}
                </li>
              ))}
            </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="card-elevated p-5 bg-muted/30">
            <p className="text-sm text-muted-foreground text-center">
              For questions about data sources or methodology, please contact the Trade Intelligence Team.
              <br />
              <span className="font-medium text-foreground">trade-intelligence@hpcl.in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
