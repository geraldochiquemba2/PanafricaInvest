import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Recommendations from "@/pages/recommendations";
import Questionnaire from "@/pages/questionnaire";
import Reinvest from "@/pages/reinvest";
import Markets from "@/pages/markets";
import InvestmentSimulator from "@/pages/investment-simulator";
import News from "@/pages/news";
import AIChat from "@/pages/ai-chat";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/questionnaire" component={Questionnaire} />
        <Route path="/markets" component={Markets} />
        <Route path="/simulator" component={InvestmentSimulator} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/news" component={News} />
        <Route path="/ask-ai" component={AIChat} />
        <Route path="/recommendations" component={Recommendations} />
        <Route path="/reinvest" component={Reinvest} />
        <Route path="/portfolio" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
