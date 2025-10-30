import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import { RecommendationCard } from "@/components/recommendation-card";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const recommendations = [
  {
    name: "Kenya Solar Project",
    ticker: "SOLAR-KE-001",
    type: "RWA" as const,
    country: "Kenya",
    flag: "🇰🇪",
    expectedReturn: "+15-18%",
    riskLevel: "Low" as const,
    horizon: "5-7 years",
    price: "$500",
    aiReasoning:
      "Based on your low-risk profile and interest in renewable energy, this tokenized solar project in Kenya offers stable returns through government-backed power purchase agreements. Kenya's strong solar potential and political stability make this an excellent long-term investment with environmental impact.",
  },
  {
    name: "Dangote Cement",
    ticker: "DANGCEM",
    type: "Stock" as const,
    country: "Nigeria",
    flag: "🇳🇬",
    expectedReturn: "+12-14%",
    riskLevel: "Medium" as const,
    horizon: "3-5 years",
    price: "$2,850",
    aiReasoning:
      "Nigeria's infrastructure boom drives cement demand. Dangote Cement dominates the market with 60% share and strong fundamentals. Your medium-term investment horizon aligns perfectly with Nigeria's projected GDP growth of 3.5% annually.",
  },
  {
    name: "Ghana Green Bonds",
    ticker: "GH-GB-2025",
    type: "Bond" as const,
    country: "Ghana",
    flag: "🇬🇭",
    expectedReturn: "+8-10%",
    riskLevel: "Low" as const,
    horizon: "2-3 years",
    price: "$1,000",
    aiReasoning:
      "Government-backed green bonds funding renewable energy projects. Fixed returns with minimal risk exposure, perfect for portfolio diversification. Ghana's improving economic indicators and commitment to sustainable development ensure bond security.",
  },
  {
    name: "South Africa Tech Fund",
    ticker: "SATECH",
    type: "Stock" as const,
    country: "South Africa",
    flag: "🇿🇦",
    expectedReturn: "+18-22%",
    riskLevel: "Medium" as const,
    horizon: "4-6 years",
    price: "$1,500",
    aiReasoning:
      "Diversified exposure to South Africa's growing fintech and e-commerce sectors. The fund includes leading companies in mobile payments and digital services, positioned to benefit from Africa's digital transformation.",
  },
  {
    name: "Ethiopia Infrastructure Token",
    ticker: "ETH-INFRA-01",
    type: "RWA" as const,
    country: "Ethiopia",
    flag: "🇪🇹",
    expectedReturn: "+16-20%",
    riskLevel: "Medium" as const,
    horizon: "6-8 years",
    price: "$750",
    aiReasoning:
      "Tokenized participation in Ethiopia's Grand Renaissance Dam and related infrastructure projects. Strong government backing and strategic importance ensure project completion. Ideal for impact-focused investors seeking both returns and developmental contribution.",
  },
  {
    name: "Morocco Agriculture RWA",
    ticker: "MA-AGRI-002",
    type: "RWA" as const,
    country: "Morocco",
    flag: "🇲🇦",
    expectedReturn: "+10-13%",
    riskLevel: "Low" as const,
    horizon: "3-5 years",
    price: "$850",
    aiReasoning:
      "Fractional ownership of premium agricultural land in Morocco's fertile regions. Stable returns from crop yields and land appreciation. Morocco's modern farming practices and export markets provide reliable revenue streams.",
  },
];

export default function Recommendations() {
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
                <h1 className="text-4xl font-semibold font-heading mb-2">
                  AI Recommendations
                </h1>
                <p className="text-muted-foreground">
                  Personalized investment opportunities based on your profile
                </p>
              </div>

              <Card className="rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg mb-1">
                        AI Agent 2: Recommendation Engine Active
                      </div>
                      <p className="text-sm text-muted-foreground">
                        We've analyzed your risk profile (Low-Medium), investment goals (Wealth
                        Accumulation), 5-year horizon, and interest in Renewable Energy and
                        Infrastructure sectors. Here are 6 personalized opportunities across your
                        selected African markets.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((rec) => (
                  <RecommendationCard key={rec.ticker} {...rec} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
