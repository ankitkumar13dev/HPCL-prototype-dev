import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import RoleDashboard from "./pages/RoleDashboard";
import ExecutiveOverview from "./pages/ExecutiveOverview";
import PortPerformance from "./pages/PortPerformance";
import ProductAnalysis from "./pages/ProductAnalysis";
import CostIntelligence from "./pages/CostIntelligence";
import OpportunityExplorer from "./pages/OpportunityExplorer";
import ScenarioPlanner from "./pages/ScenarioPlanner";
import DataAssumptions from "./pages/DataAssumptions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <MainLayout>
            <Routes>
              <Route path="/" element={<RoleDashboard />} />
              <Route path="/overview" element={<ExecutiveOverview />} />
              <Route path="/ports" element={<PortPerformance />} />
              <Route path="/products" element={<ProductAnalysis />} />
              <Route path="/costs" element={<CostIntelligence />} />
              <Route path="/opportunities" element={<OpportunityExplorer />} />
              <Route path="/scenarios" element={<ScenarioPlanner />} />
              <Route path="/data" element={<DataAssumptions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
