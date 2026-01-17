import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, AlertTriangle, CheckCircle, ArrowRight, Lightbulb } from "lucide-react";
import { productCategories, originCountries, topPortsData } from "@/lib/mockData";

const products = productCategories.map(p => ({
  id: p.id,
  name: p.name,
}));

const countries = originCountries.map(c => c.name);

const ports = topPortsData.map(p => p.name);

export default function ScenarioPlanner() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [calculatedResults, setCalculatedResults] = useState<any>(null);

  const handleCalculate = () => {
    if (product && quantity && origin && destination) {
      // Calculate realistic costs based on selections
      const selectedProduct = productCategories.find(p => p.id === product);
      const selectedOrigin = originCountries.find(c => c.name === origin);
      const selectedPort = topPortsData.find(p => p.name === destination);
      
      if (selectedProduct && selectedOrigin && selectedPort) {
        const qty = parseFloat(quantity);
        const basePrice = selectedProduct.avgPrice;
        const freightCost = 8 + (selectedOrigin.avgLeadTime * 0.5); // Freight increases with distance
        const portCharges = selectedPort.capacity > 85 ? 10 : 8; // Higher charges for congested ports
        const insuranceCost = basePrice * 0.015; // 1.5% of FOB
        
        const fobCost = basePrice * qty;
        const freight = freightCost * qty;
        const insurance = insuranceCost * qty;
        const port = portCharges * qty;
        const customs = (fobCost + freight) * 0.025; // 2.5% duty
        
        const totalCost = fobCost + freight + insurance + port + customs;
        const landedCostPerUnit = totalCost / qty;
        
        // Historical benchmark (mock)
        const avgPrice = basePrice;
        const lowPrice = basePrice * 0.85;
        const highPrice = basePrice * 1.15;
        const vsAverage = ((landedCostPerUnit - avgPrice) / avgPrice * 100).toFixed(1);
        
        // Risk assessment
        const congestionRisk = selectedPort.congestion === "High" ? "High" : 
                              selectedPort.congestion === "Medium" ? "Medium" : "Low";
        const reliabilityScore = selectedOrigin.reliability;
        const volatility = selectedProduct.volatility;
        
        setCalculatedResults({
          totalCost: (totalCost / 1000000).toFixed(2), // Convert to millions
          landedCostPerUnit: landedCostPerUnit.toFixed(0),
          fobCost: (fobCost / 1000000).toFixed(2),
          freightAndCharges: ((freight + insurance + port + customs) / 1000000).toFixed(2),
          fobPercentage: ((fobCost / totalCost) * 100).toFixed(0),
          freightPercentage: (((freight + insurance + port + customs) / totalCost) * 100).toFixed(0),
          avgPrice: avgPrice.toFixed(0),
          lowPrice: lowPrice.toFixed(0),
          highPrice: highPrice.toFixed(0),
          vsAverage,
          congestionRisk,
          reliabilityScore,
          volatility,
          leadTime: selectedOrigin.avgLeadTime,
        });
      }
      
      setCalculated(true);
    }
  };

  const resetForm = () => {
    setProduct("");
    setQuantity("");
    setOrigin("");
    setDestination("");
    setCalculated(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Scenario Planner</h1>
            <p className="text-sm text-muted-foreground">
              Evaluate hypothetical trade decisions before execution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Form */}
            <div className="lg:col-span-1 card-elevated p-5">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground text-lg">Scenario Inputs</h3>
              </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger id="product">
                  <SelectValue placeholder="Select product" />
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

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (MT)</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="e.g., 50000"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Origin Country</Label>
              <Select value={origin} onValueChange={setOrigin}>
                <SelectTrigger id="origin">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination Port</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger id="destination">
                  <SelectValue placeholder="Select port" />
                </SelectTrigger>
                <SelectContent>
                  {ports.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCalculate} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                Calculate
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {!calculated ? (
            <div className="card-elevated p-12 text-center">
              <Calculator className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Fill in the scenario parameters and click Calculate to see results
              </p>
            </div>
          ) : (
            <>
              {/* Cost Estimate */}
              <div className="card-elevated p-5">
                <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
                  <div className="w-1 h-5 bg-chart-1 rounded-full"></div>
                  Estimated Landed Cost
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Total Estimated Cost</p>
                    <p className="text-2xl font-bold text-foreground mt-1">${calculatedResults?.totalCost || '4.85'}M</p>
                    <p className="text-xs text-muted-foreground mt-1">${calculatedResults?.landedCostPerUnit || '97'}/MT landed</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">FOB Cost</p>
                    <p className="text-2xl font-bold text-foreground mt-1">${calculatedResults?.fobCost || '3.60'}M</p>
                    <p className="text-xs text-muted-foreground mt-1">{calculatedResults?.fobPercentage || '74'}% of total</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Freight + Charges</p>
                    <p className="text-2xl font-bold text-foreground mt-1">${calculatedResults?.freightAndCharges || '1.25'}M</p>
                    <p className="text-xs text-muted-foreground mt-1">{calculatedResults?.freightPercentage || '26'}% of total</p>
                  </div>
                </div>
              </div>

              {/* Historical Benchmark */}
              <div className="card-elevated p-5">
                <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
                  <div className="w-1 h-5 bg-chart-2 rounded-full"></div>
                  Historical Benchmark
                </h3>
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">12M Average</span>
                      <span className="font-medium">${calculatedResults?.avgPrice || '95'}/MT</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">12M Low</span>
                      <span className="font-medium text-success">${calculatedResults?.lowPrice || '82'}/MT</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">12M High</span>
                      <span className="font-medium text-destructive">${calculatedResults?.highPrice || '112'}/MT</span>
                    </div>
                  </div>
                  <div className="text-center px-6 border-l border-border">
                    <p className="text-sm text-muted-foreground">Your Estimate</p>
                    <p className="text-3xl font-bold text-warning">${calculatedResults?.landedCostPerUnit || '97'}/MT</p>
                    <p className="text-xs text-muted-foreground mt-1">{calculatedResults?.vsAverage || '+2'}% vs average</p>
                  </div>
                </div>
              </div>

              {/* Risk Indicators */}
              <div className="card-elevated p-5">
                <h3 className="font-semibold text-foreground mb-4 text-lg flex items-center gap-2">
                  <div className="w-1 h-5 bg-chart-3 rounded-full"></div>
                  Risk Assessment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`flex items-start gap-3 p-4 rounded-lg ${
                    calculatedResults?.volatility === 'High' ? 'bg-destructive/5 border border-destructive/20' : 
                    calculatedResults?.volatility === 'Medium' ? 'bg-warning/5 border border-warning/20' : 
                    'bg-success/5 border border-success/20'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                      calculatedResults?.volatility === 'High' ? 'text-destructive' : 
                      calculatedResults?.volatility === 'Medium' ? 'text-warning' : 
                      'text-success'
                    }`} />
                    <div>
                      <p className="font-medium text-foreground">Price Volatility: {calculatedResults?.volatility || 'Medium'}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {products.find(p => p.id === product)?.name || 'Selected product'} prices have {calculatedResults?.volatility === 'High' ? 'high' : calculatedResults?.volatility === 'Low' ? 'low' : 'medium'} volatility
                      </p>
                    </div>
                  </div>
                  <div className={`flex items-start gap-3 p-4 rounded-lg ${
                    calculatedResults?.congestionRisk === 'High' ? 'bg-destructive/5 border border-destructive/20' : 
                    calculatedResults?.congestionRisk === 'Medium' ? 'bg-warning/5 border border-warning/20' : 
                    'bg-success/5 border border-success/20'
                  }`}>
                    {calculatedResults?.congestionRisk === 'Low' ? (
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    ) : (
                      <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                        calculatedResults?.congestionRisk === 'High' ? 'text-destructive' : 'text-warning'
                      }`} />
                    )}
                    <div>
                      <p className="font-medium text-foreground">Congestion Risk: {calculatedResults?.congestionRisk || 'Low'}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {destination || 'Selected port'} {calculatedResults?.congestionRisk === 'High' ? 'experiencing high congestion' : calculatedResults?.congestionRisk === 'Medium' ? 'at moderate capacity' : 'operating at normal capacity'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternative Suggestion */}
              <div className="card-elevated p-5 border-l-4 border-l-accent">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">Suggested Alternative</h3>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <span className="font-medium">{destination}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-accent">
                        {destination === "JNPT" ? "Mundra" : "JNPT"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Switching to {destination === "JNPT" ? "Mundra" : "JNPT"} could save approximately $1.50/MT 
                      based on lower port charges and freight rates from {origin}. Estimated savings: $75,000 on this shipment.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
