import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Complaints from "./pages/Complaints";
import NewComplaint from "./pages/NewComplaint";
import Notifications from "./pages/Notifications";
import Bills from "./pages/Bills";
import Shop from "./pages/Shop";
import Notices from "./pages/Notices";
import Communities from "./pages/Communities";
import Family from "./pages/Family";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/complaints/new" element={<NewComplaint />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/family" element={<Family />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
