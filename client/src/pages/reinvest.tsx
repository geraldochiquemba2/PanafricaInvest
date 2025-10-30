import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ReinvestmentAlert } from "@/components/reinvestment-alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Reinvest() {
  const [, setLocation] = useLocation();
  
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
          </header>
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-semibold font-heading mb-2">Reinvestment</h1>
                  <p className="text-muted-foreground">
                    Smart reinvestment chain powered by AI Agent 3
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setLocation("/dashboard")}
                  data-testid="button-back"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </div>

              <Card className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <RefreshCw className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-1">
                        AI Agent 3: Reinvestment Monitor Active
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Continuously tracking your portfolio performance on Hedera Consensus
                        Service. When assets reach profit targets, AI automatically suggests
                        optimized reinvestment opportunities to keep your investment chain growing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <ReinvestmentAlert
                  assetName="Kenya Solar Project"
                  currentValue="$18,750"
                  gainAmount="+$3,750"
                  gainPercentage="+25%"
                  targetReached="Target: +20%"
                  suggestedAsset="Ethiopia Infrastructure Fund"
                  suggestedCountry="Ethiopia"
                  suggestedFlag="🇪🇹"
                />

                <ReinvestmentAlert
                  assetName="Ghana Farmland Token"
                  currentValue="$22,500"
                  gainAmount="+$4,500"
                  gainPercentage="+25%"
                  targetReached="Target: +20%"
                  suggestedAsset="Morocco Agriculture RWA"
                  suggestedCountry="Morocco"
                  suggestedFlag="🇲🇦"
                />
              </div>

              <Card className="rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">How the Reinvestment Chain Works</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold text-primary">1</span>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Real-time Monitoring</div>
                        <p className="text-sm text-muted-foreground">
                          All portfolio updates are tracked immutably on Hedera Consensus Service,
                          ensuring transparent performance monitoring.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold text-primary">2</span>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Target Detection</div>
                        <p className="text-sm text-muted-foreground">
                          When an asset reaches your predefined profit milestone, AI Agent 3
                          instantly triggers a notification.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold text-primary">3</span>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Smart Suggestion</div>
                        <p className="text-sm text-muted-foreground">
                          AI analyzes current market conditions and your evolving portfolio to
                          suggest the next optimal investment, maintaining diversification and
                          alignment with your goals.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm font-bold text-primary">4</span>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Seamless Execution</div>
                        <p className="text-sm text-muted-foreground">
                          Approve the recommendation and execute the transaction directly on
                          Hedera with minimal fees and instant settlement.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
