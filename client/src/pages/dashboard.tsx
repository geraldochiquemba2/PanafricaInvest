import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import { PortfolioSummary } from "@/components/portfolio-summary";
import { PerformanceChart } from "@/components/performance-chart";
import { AssetTable } from "@/components/asset-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <WalletConnectButton />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div>
                <h1 className="text-4xl font-semibold font-heading mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                  Track your pan-African investment portfolio
                </p>
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
