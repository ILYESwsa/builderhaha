import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Matches from "./pages/Matches";
import Nav from "@/components/layout/Nav";
import { CustomizationProvider } from "@/components/theme/CustomizationProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CustomizationProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/matches" element={<Matches />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="border-t border-white/10 py-6 text-sm text-muted-foreground">
              <div className="container max-w-6xl mx-auto flex items-center justify-between">
                <span>© {new Date().getFullYear()} Striker 3D</span>
                <span className="hidden sm:inline">
                  Built for beautiful football.
                </span>
              </div>
            </footer>
          </div>
        </BrowserRouter>
      </CustomizationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
