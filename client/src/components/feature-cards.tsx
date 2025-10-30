import { Brain, BarChart3, Coins, RefreshCw, Globe2, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Recommendations",
    description:
      "Advanced machine learning analyzes your profile and market data to suggest personalized investment opportunities across Africa.",
  },
  {
    icon: Globe2,
    title: "Pan-African Coverage",
    description:
      "Access investment opportunities from all 54 African countries, including stocks, bonds, and real-world assets.",
  },
  {
    icon: Coins,
    title: "Tokenized RWA",
    description:
      "Fractional ownership of real-world assets like agricultural land, infrastructure projects, and renewable energy via Hedera.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description:
      "Monitor your portfolio performance with immutable, transparent tracking powered by Hedera Consensus Service.",
  },
  {
    icon: RefreshCw,
    title: "Smart Reinvestment",
    description:
      "Automated alerts when assets hit profit targets, with AI-powered suggestions for your next investment chain.",
  },
  {
    icon: Lock,
    title: "Secure & Transparent",
    description:
      "All transactions secured on Hedera Hashgraph with fast, low-cost settlement and complete transparency.",
  },
];

export function FeatureCards() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4 font-heading" data-testid="text-features-title">
            Why Panafrica Invest?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform combining AI intelligence with blockchain security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="p-8 rounded-xl hover-elevate"
                data-testid={`feature-card-${idx}`}
              >
                <CardContent className="p-0">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
