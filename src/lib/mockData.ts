// Centralized Mock Data for HPCL Trade Intelligence Prototype

// Trade Value Time Series Data
export const tradeValueData = [
  { month: "Jan", imports: 4200, exports: 2400, year: "2025" },
  { month: "Feb", imports: 3800, exports: 2210, year: "2025" },
  { month: "Mar", imports: 5100, exports: 2900, year: "2025" },
  { month: "Apr", imports: 4700, exports: 2780, year: "2025" },
  { month: "May", imports: 5300, exports: 3100, year: "2025" },
  { month: "Jun", imports: 4900, exports: 2890, year: "2025" },
  { month: "Jul", imports: 5600, exports: 3200, year: "2025" },
  { month: "Aug", imports: 5200, exports: 3050, year: "2025" },
  { month: "Sep", imports: 4800, exports: 2920, year: "2025" },
  { month: "Oct", imports: 5400, exports: 3300, year: "2025" },
  { month: "Nov", imports: 5800, exports: 3450, year: "2025" },
  { month: "Dec", imports: 6100, exports: 3600, year: "2025" },
];

// Top Ports by Trade Volume
export const topPortsData = [
  { name: "JNPT", value: 8500, growth: 12, capacity: 88, congestion: "Low" },
  { name: "Mundra", value: 7200, growth: 18, capacity: 75, congestion: "Low" },
  { name: "Kandla", value: 5800, growth: -3, capacity: 92, congestion: "High" },
  { name: "Chennai", value: 4200, growth: 8, capacity: 85, congestion: "Medium" },
  { name: "Visakhapatnam", value: 3900, growth: 5, capacity: 68, congestion: "Low" },
  { name: "Paradip", value: 3500, growth: 11, capacity: 62, congestion: "Low" },
  { name: "Mangalore", value: 2800, growth: -2, capacity: 71, congestion: "Medium" },
  { name: "Kochi", value: 2100, growth: 6, capacity: 58, congestion: "Low" },
];

// Product Categories
export const productCategories = [
  { 
    id: "crude", 
    name: "Crude Oil", 
    value: 32400, 
    growth: 8, 
    volatility: "Low",
    avgPrice: 82.5,
    unit: "$/barrel"
  },
  { 
    id: "lng", 
    name: "LNG", 
    value: 18200, 
    growth: 24, 
    volatility: "Medium",
    avgPrice: 12.8,
    unit: "$/MMBtu"
  },
  { 
    id: "motor", 
    name: "Motor Spirit", 
    value: 12600, 
    growth: 6, 
    volatility: "High",
    avgPrice: 95.2,
    unit: "$/barrel"
  },
  { 
    id: "diesel", 
    name: "High Speed Diesel", 
    value: 15800, 
    growth: 4, 
    volatility: "Medium",
    avgPrice: 88.7,
    unit: "$/barrel"
  },
  { 
    id: "naphtha", 
    name: "Naphtha", 
    value: 8900, 
    growth: 15, 
    volatility: "High",
    avgPrice: 72.3,
    unit: "$/barrel"
  },
];

// Origin Countries
export const originCountries = [
  { id: "saudi", name: "Saudi Arabia", share: 28, reliability: 95, avgLeadTime: 12 },
  { id: "iraq", name: "Iraq", share: 22, reliability: 88, avgLeadTime: 14 },
  { id: "uae", name: "UAE", share: 18, reliability: 92, avgLeadTime: 10 },
  { id: "kuwait", name: "Kuwait", share: 12, reliability: 90, avgLeadTime: 11 },
  { id: "nigeria", name: "Nigeria", share: 8, reliability: 78, avgLeadTime: 22 },
  { id: "qatar", name: "Qatar", share: 6, reliability: 93, avgLeadTime: 13 },
  { id: "russia", name: "Russia", share: 4, reliability: 75, avgLeadTime: 28 },
  { id: "usa", name: "USA", share: 2, reliability: 94, avgLeadTime: 35 },
];

// Product Comparison Data by Port
export const productComparisonByPort = {
  "JNPT": {
    crude: 84.2,
    lng: 13.1,
    motor: 97.5,
    diesel: 90.3,
    naphtha: 74.8
  },
  "Mundra": {
    crude: 81.8,
    lng: 12.5,
    motor: 94.8,
    diesel: 88.1,
    naphtha: 71.9
  },
  "Kandla": {
    crude: 83.5,
    lng: 13.3,
    motor: 96.2,
    diesel: 89.5,
    naphtha: 73.6
  },
  "Chennai": {
    crude: 82.9,
    lng: 12.9,
    motor: 95.8,
    diesel: 89.2,
    naphtha: 73.1
  },
  "Visakhapatnam": {
    crude: 80.7,
    lng: 12.2,
    motor: 93.5,
    diesel: 86.9,
    naphtha: 70.8
  }
};

// Trade Corridors
export const tradeCorridors = [
  { 
    origin: "Saudi Arabia", 
    port: "JNPT", 
    volume: 3500, 
    trend: "stable",
    avgCost: 850,
    avgTime: 12
  },
  { 
    origin: "Iraq", 
    port: "Mundra", 
    volume: 2800, 
    trend: "growing",
    avgCost: 920,
    avgTime: 14
  },
  { 
    origin: "UAE", 
    port: "Kandla", 
    volume: 2200, 
    trend: "growing",
    avgCost: 780,
    avgTime: 10
  },
  { 
    origin: "Nigeria", 
    port: "Chennai", 
    volume: 1800, 
    trend: "declining",
    avgCost: 1450,
    avgTime: 22
  },
  { 
    origin: "Kuwait", 
    port: "JNPT", 
    volume: 1500, 
    trend: "stable",
    avgCost: 880,
    avgTime: 11
  },
  { 
    origin: "Qatar", 
    port: "Visakhapatnam", 
    volume: 1200, 
    trend: "growing",
    avgCost: 920,
    avgTime: 13
  },
];

// Port Performance Metrics
export const portPerformanceData = [
  {
    port: "JNPT",
    location: { lat: 18.95, lng: 72.95 },
    metrics: {
      totalVolume: 8500,
      imports: 5800,
      exports: 2700,
      avgTurnaroundTime: 2.8,
      capacityUtilization: 88,
      efficiency: 92,
    },
    topProducts: ["Crude Oil", "LNG", "Motor Spirit"],
    congestionRisk: "Low",
    infrastructure: "Excellent",
  },
  {
    port: "Mundra",
    location: { lat: 22.84, lng: 69.72 },
    metrics: {
      totalVolume: 7200,
      imports: 4900,
      exports: 2300,
      avgTurnaroundTime: 2.4,
      capacityUtilization: 75,
      efficiency: 95,
    },
    topProducts: ["LNG", "Naphtha", "Diesel"],
    congestionRisk: "Low",
    infrastructure: "Excellent",
  },
  {
    port: "Kandla",
    location: { lat: 23.03, lng: 70.22 },
    metrics: {
      totalVolume: 5800,
      imports: 4200,
      exports: 1600,
      avgTurnaroundTime: 3.6,
      capacityUtilization: 92,
      efficiency: 78,
    },
    topProducts: ["Crude Oil", "Diesel"],
    congestionRisk: "High",
    infrastructure: "Good",
  },
  {
    port: "Chennai",
    location: { lat: 13.08, lng: 80.29 },
    metrics: {
      totalVolume: 4200,
      imports: 2800,
      exports: 1400,
      avgTurnaroundTime: 3.1,
      capacityUtilization: 85,
      efficiency: 85,
    },
    topProducts: ["Crude Oil", "Motor Spirit"],
    congestionRisk: "Medium",
    infrastructure: "Good",
  },
  {
    port: "Visakhapatnam",
    location: { lat: 17.69, lng: 83.22 },
    metrics: {
      totalVolume: 3900,
      imports: 2600,
      exports: 1300,
      avgTurnaroundTime: 2.9,
      capacityUtilization: 68,
      efficiency: 88,
    },
    topProducts: ["LNG", "Diesel"],
    congestionRisk: "Low",
    infrastructure: "Good",
  },
];

// Cost Intelligence Data
export const costTrendData = [
  { month: "Jan", crude: 78.5, lng: 11.2, motor: 92.1, diesel: 85.3 },
  { month: "Feb", crude: 82.1, lng: 12.8, motor: 95.4, diesel: 88.7 },
  { month: "Mar", crude: 79.8, lng: 11.9, motor: 93.2, diesel: 86.9 },
  { month: "Apr", crude: 83.4, lng: 13.2, motor: 96.8, diesel: 89.4 },
  { month: "May", crude: 81.2, lng: 12.4, motor: 94.1, diesel: 87.8 },
  { month: "Jun", crude: 84.7, lng: 13.8, motor: 98.2, diesel: 91.2 },
  { month: "Jul", crude: 82.9, lng: 12.9, motor: 95.6, diesel: 88.9 },
  { month: "Aug", crude: 80.5, lng: 11.8, motor: 92.8, diesel: 86.2 },
  { month: "Sep", crude: 85.3, lng: 14.1, motor: 99.5, diesel: 92.4 },
  { month: "Oct", crude: 83.7, lng: 13.4, motor: 97.1, diesel: 90.1 },
  { month: "Nov", crude: 81.8, lng: 12.6, motor: 94.8, diesel: 88.3 },
  { month: "Dec", crude: 82.5, lng: 12.8, motor: 95.2, diesel: 88.7 },
];

// Freight Cost by Route
export const freightCostData = [
  { route: "Saudi Arabia - JNPT", freight: 850, insurance: 45, handling: 120, total: 1015 },
  { route: "Iraq - Mundra", freight: 920, insurance: 52, handling: 115, total: 1087 },
  { route: "UAE - Kandla", freight: 780, insurance: 38, handling: 110, total: 928 },
  { route: "Nigeria - Chennai", freight: 1450, insurance: 85, handling: 130, total: 1665 },
  { route: "Kuwait - JNPT", freight: 880, insurance: 48, handling: 118, total: 1046 },
];

// Landed Cost Breakdown
export const landedCostData = [
  { category: "Product Cost", value: 8250, percentage: 82.5 },
  { category: "Freight", value: 850, percentage: 8.5 },
  { category: "Insurance", value: 120, percentage: 1.2 },
  { category: "Port Charges", value: 280, percentage: 2.8 },
  { category: "Customs & Duties", value: 350, percentage: 3.5 },
  { category: "Handling & Storage", value: 150, percentage: 1.5 },
];

// Price Volatility Data
export const volatilityData = [
  { product: "Motor Spirit", volatility: 22, trend: "High", impact: "Critical" },
  { product: "Naphtha", volatility: 18, trend: "High", impact: "Moderate" },
  { product: "LNG", volatility: 15, trend: "Medium", impact: "Moderate" },
  { product: "High Speed Diesel", volatility: 12, trend: "Medium", impact: "Low" },
  { product: "Crude Oil", volatility: 8, trend: "Low", impact: "Low" },
];

// Opportunity Matrix Data
export const opportunityMatrix = [
  { name: "LNG via Mundra", growth: 24, stability: 85, size: 180, category: "High Potential", score: 92 },
  { name: "Crude via JNPT", growth: 8, stability: 90, size: 320, category: "Stable Core", score: 85 },
  { name: "Naphtha via Kandla", growth: 15, stability: 60, size: 120, category: "Monitor", score: 68 },
  { name: "Diesel via Chennai", growth: 6, stability: 75, size: 150, category: "Stable", score: 72 },
  { name: "Motor Spirit via Paradip", growth: 18, stability: 70, size: 95, category: "Emerging", score: 78 },
  { name: "LNG via Visakhapatnam", growth: 20, stability: 82, size: 110, category: "High Potential", score: 88 },
  { name: "Crude via Mundra", growth: 12, stability: 88, size: 280, category: "Stable", score: 83 },
];

// Underutilized Ports
export const underutilizedPorts = [
  {
    port: "Paradip",
    currentUtilization: 62,
    potentialCapacity: 95,
    savings: "12-15%",
    reason: "Growing capacity, competitive rates, underutilized for petroleum products",
    potential: "High",
    advantages: ["Lower congestion", "Modern infrastructure", "Competitive pricing"],
  },
  {
    port: "Mangalore",
    currentUtilization: 71,
    potentialCapacity: 90,
    savings: "8-11%",
    reason: "Strategic location for West Asia sourcing, lower congestion",
    potential: "Medium",
    advantages: ["West coast advantage", "Efficient operations", "Good connectivity"],
  },
  {
    port: "Kochi",
    currentUtilization: 58,
    potentialCapacity: 85,
    savings: "10-13%",
    reason: "Excellent connectivity to South India demand centers",
    potential: "Medium",
    advantages: ["South India access", "Modern facilities", "Lower turnaround time"],
  },
];

// Emerging Opportunities
export const emergingOpportunities = [
  { 
    type: "Product", 
    name: "LNG", 
    metric: "+24% YoY", 
    score: 92,
    description: "Strong demand growth, favorable policy environment, infrastructure expansion",
    recommendation: "Expand capacity and diversify suppliers"
  },
  { 
    type: "Port", 
    name: "Mundra", 
    metric: "+18% capacity", 
    score: 88,
    description: "Infrastructure expansion, competitive tariffs, excellent efficiency ratings",
    recommendation: "Increase allocation for high-growth products"
  },
  { 
    type: "Corridor", 
    name: "UAE → Mundra", 
    metric: "+32% volume", 
    score: 85,
    description: "Established logistics, favorable freight rates, reliable delivery",
    recommendation: "Optimize this corridor for time-sensitive shipments"
  },
  { 
    type: "Product", 
    name: "Naphtha", 
    metric: "+15% YoY", 
    score: 78,
    description: "Growing petrochemical demand, stable pricing improving",
    recommendation: "Monitor closely and consider expanding"
  },
];

// Scenario Planning Templates
export const scenarioTemplates = [
  {
    id: "cost-optimization",
    name: "Cost Optimization",
    description: "Find the most cost-effective trade route",
    parameters: ["product", "volume", "origin", "timeframe"],
  },
  {
    id: "risk-mitigation",
    name: "Risk Mitigation",
    description: "Evaluate alternative routes for supply chain resilience",
    parameters: ["product", "volume", "primary-route", "alternatives"],
  },
  {
    id: "capacity-planning",
    name: "Capacity Planning",
    description: "Plan for seasonal demand variations",
    parameters: ["product", "seasonal-pattern", "buffer-percentage"],
  },
];

// Risk Factors
export const riskFactors = [
  { 
    category: "Port Congestion", 
    ports: ["Kandla", "Chennai"], 
    severity: "High", 
    mitigation: "Use alternative ports: Paradip, Visakhapatnam" 
  },
  { 
    category: "Price Volatility", 
    products: ["Motor Spirit", "Naphtha"], 
    severity: "High", 
    mitigation: "Implement hedging strategies, diversify suppliers" 
  },
  { 
    category: "Geopolitical", 
    regions: ["Middle East", "Russia"], 
    severity: "Medium", 
    mitigation: "Diversify sourcing geography, maintain strategic reserves" 
  },
  { 
    category: "Weather/Seasonal", 
    impact: "Monsoon delays", 
    severity: "Medium", 
    mitigation: "Adjust schedules, increase buffer inventory" 
  },
];

// KPI Benchmarks
export const kpiBenchmarks = {
  totalImportValue: { current: 62.4, target: 68.0, unit: "B USD", growth: 8.2 },
  totalExportValue: { current: 36.8, target: 40.0, unit: "B USD", growth: 5.4 },
  avgTurnaroundTime: { current: 2.9, target: 2.5, unit: "days", improvement: -13.8 },
  portEfficiency: { current: 87, target: 92, unit: "%", improvement: 5.7 },
  costPerUnit: { current: 102.4, target: 98.0, unit: "USD", improvement: -4.3 },
  supplierReliability: { current: 89, target: 95, unit: "%", improvement: 6.7 },
};
