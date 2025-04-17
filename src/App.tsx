
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArtistDashboard from "./pages/ArtistDashboard";
import AIDiscovery from "./pages/AIDiscovery";
import ListenerFarming from "./pages/ListenerFarming";
import Radio from "./pages/Radio";
import ArtistView from "./pages/ArtistView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/artist-dashboard" element={<ArtistDashboard />} />
          <Route path="/ai-discovery" element={<AIDiscovery />} />
          <Route path="/listener-farming" element={<ListenerFarming />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/artist-view" element={<ArtistView />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
