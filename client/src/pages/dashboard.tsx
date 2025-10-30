import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import { PortfolioSummary } from "@/components/portfolio-summary";
import { PerformanceChart } from "@/components/performance-chart";
import { AssetTable } from "@/components/asset-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, ArrowLeft, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/logout", {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      setLocation("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: "Unable to log out. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center space-x-3">
              {user && (
                <>
                  <Badge variant="secondary" className="text-sm" data-testid="text-user-balance">
                    ${parseFloat(user.balance).toFixed(2)}
                  </Badge>
                  <span className="text-sm font-medium" data-testid="text-username">{user.username}</span>
                </>
              )}
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => logoutMutation.mutate()}
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
              <WalletConnectButton />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-semibold font-heading mb-2">Dashboard</h1>
                  <p className="text-muted-foreground">
                    Track your pan-African investment portfolio
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setLocation("/")}
                  data-testid="button-back-home"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </div>

              <PortfolioSummary />

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PerformanceChart />
                </div>
                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/50 border border-primary/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold">Portfolio Health</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Your portfolio is well-diversified across 8 African countries with balanced
                          risk exposure.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/50 border border-green-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" />
                          <span className="text-sm font-semibold">Opportunity Alert</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Morocco renewable energy sector showing strong momentum. Consider
                          increasing allocation.
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-muted/50">
                        <div className="text-sm font-semibold mb-2">Monthly Summary</div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Transactions</span>
                            <span className="font-mono">12</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Avg. Return</span>
                            <span className="font-mono text-green-600 dark:text-green-500">
                              +3.2%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Gas Fees Saved</span>
                            <span className="font-mono">$142</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl">Your Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <AssetTable />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
