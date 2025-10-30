import { Brain, BarChart3, Coins, RefreshCw, Globe2, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import aiTechImage from "@assets/stock_images/african_technology_f_a0abf7f5.jpg";
import businessImage from "@assets/stock_images/african_business_sky_03b949f0.jpg";
import energyImage from "@assets/stock_images/african_renewable_en_d9ceaaf9.jpg";
import marketImage from "@assets/stock_images/african_stock_market_225ff9c0.jpg";
import infraImage from "@assets/stock_images/african_infrastructu_49ebf27e.jpg";
import secureImage from "@assets/stock_images/african_technology_f_fca086e6.jpg";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Recommendations",
    description:
      "Advanced machine learning analyzes your profile and market data to suggest personalized investment opportunities across Africa.",
    image: aiTechImage,
  },
  {
    icon: Globe2,
    title: "Pan-African Coverage",
    description:
      "Access investment opportunities from all 54 African countries, including stocks, bonds, and real-world assets.",
    image: businessImage,
  },
  {
    icon: Coins,
    title: "Tokenized RWA",
    description:
      "Fractional ownership of real-world assets like agricultural land, infrastructure projects, and renewable energy via Hedera.",
    image: energyImage,
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description:
      "Monitor your portfolio performance with immutable, transparent tracking powered by Hedera Consensus Service.",
    image: marketImage,
  },
  {
    icon: RefreshCw,
    title: "Smart Reinvestment",
    description:
      "Automated alerts when assets hit profit targets, with AI-powered suggestions for your next investment chain.",
    image: infraImage,
  },
  {
    icon: Lock,
    title: "Secure & Transparent",
    description:
      "All transactions secured on Hedera Hashgraph with fast, low-cost settlement and complete transparency.",
    image: secureImage,
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
                className="p-8 rounded-xl hover-elevate overflow-hidden relative"
                data-testid={`feature-card-${idx}`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />
                <CardContent className="p-0 relative z-10">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-6">
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
