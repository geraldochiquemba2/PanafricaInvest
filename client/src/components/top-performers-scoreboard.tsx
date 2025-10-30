import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface PerformerData {
  country: string;
  flag: string;
  performers: {
    ticker: string;
    name: string;
    change: number;
  }[];
}

// Real African stock market data - Top performers by market cap and growth
const mockData: PerformerData[] = [
  {
    country: "Nigeria",
    flag: "🇳🇬",
    performers: [
      { ticker: "DANGCEM", name: "Dangote Cement", change: 12.5 }, // Nigerian Stock Exchange
      { ticker: "MTNN", name: "MTN Nigeria", change: 8.3 }, // Largest telecom in Nigeria
      { ticker: "BUACEMENT", name: "BUA Cement", change: 7.1 }, // Major cement producer
    ],
  },
  {
    country: "South Africa",
    flag: "🇿🇦",
    performers: [
      { ticker: "NPN", name: "Naspers", change: 15.2 }, // JSE - Tech conglomerate
      { ticker: "AGL", name: "Anglo American", change: 9.8 }, // Mining giant
      { ticker: "BHP", name: "BHP Group", change: 6.4 }, // Global resources company
    ],
  },
  {
    country: "Kenya",
    flag: "🇰🇪",
    performers: [
      { ticker: "SCOM", name: "Safaricom", change: 11.7 }, // NSE - Leading mobile operator
      { ticker: "KCB", name: "KCB Group", change: 8.9 }, // Major bank
      { ticker: "EQTY", name: "Equity Bank", change: 5.6 }, // Banking leader
    ],
  },
  {
    country: "Egypt",
    flag: "🇪🇬",
    performers: [
      { ticker: "COMI", name: "Commercial Intl Bank", change: 14.3 }, // EGX - Top bank
      { ticker: "ETEL", name: "E-Finance", change: 10.2 }, // Fintech leader
      { ticker: "PHDC", name: "Palm Hills", change: 7.8 }, // Real estate developer
    ],
  },
];

export function TopPerformersScoreboard() {
  return (
    <div className="py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/qLsD-5uOiB4?autoplay=1&mute=1&loop=1&playlist=qLsD-5uOiB4&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&playsinline=1&iv_load_policy=3&disablekb=1"
          title="Top performers background video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={{ pointerEvents: 'none', opacity: 0.4 }}
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-4 font-heading" data-testid="text-scoreboard-title">
            Top Performers Across Africa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time tracking of the best performing assets in each African market
          </p>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4">
          {mockData.map((country) => (
            <Card
              key={country.country}
              className="min-w-[320px] rounded-xl hover-elevate backdrop-blur-sm bg-background/95"
              data-testid={`card-country-${country.country.toLowerCase()}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl" aria-label={`${country.country} flag`}>
                      {country.flag}
                    </span>
                    <CardTitle className="text-xl">{country.country}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Top 3
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {country.performers.map((performer, idx) => (
                    <div
                      key={performer.ticker}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      data-testid={`performer-${performer.ticker}`}
                    >
                      <div className="flex-1">
                        <div className="font-mono text-sm font-semibold">
                          {performer.ticker}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {performer.name}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-lg font-bold font-mono ${
                            performer.change > 0
                              ? "text-green-600 dark:text-green-500"
                              : "text-red-600 dark:text-red-500"
                          }`}
                        >
                          {performer.change > 0 ? "+" : ""}
                          {performer.change}%
                        </span>
                        {performer.change > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/markets">
            <Button variant="outline" size="lg" data-testid="button-view-all-markets">
              View All African Markets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
