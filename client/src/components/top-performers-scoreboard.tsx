import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PerformerData {
  country: string;
  flag: string;
  performers: {
    ticker: string;
    name: string;
    change: number;
  }[];
}

const mockData: PerformerData[] = [
  {
    country: "Nigeria",
    flag: "🇳🇬",
    performers: [
      { ticker: "DANGCEM", name: "Dangote Cement", change: 12.5 },
      { ticker: "MTNN", name: "MTN Nigeria", change: 8.3 },
      { ticker: "BUACEMENT", name: "BUA Cement", change: 7.1 },
    ],
  },
  {
    country: "South Africa",
    flag: "🇿🇦",
    performers: [
      { ticker: "NPN", name: "Naspers", change: 15.2 },
      { ticker: "AGL", name: "Anglo American", change: 9.8 },
      { ticker: "BHP", name: "BHP Group", change: 6.4 },
    ],
  },
  {
    country: "Kenya",
    flag: "🇰🇪",
    performers: [
      { ticker: "SCOM", name: "Safaricom", change: 11.7 },
      { ticker: "KCB", name: "KCB Group", change: 8.9 },
      { ticker: "EQTY", name: "Equity Bank", change: 5.6 },
    ],
  },
  {
    country: "Egypt",
    flag: "🇪🇬",
    performers: [
      { ticker: "COMI", name: "Commercial Intl Bank", change: 14.3 },
      { ticker: "ETEL", name: "E-Finance", change: 10.2 },
      { ticker: "PHDC", name: "Palm Hills", change: 7.8 },
    ],
  },
];

export function TopPerformersScoreboard() {
  return (
    <div className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
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
              className="min-w-[320px] rounded-xl hover-elevate"
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
      </div>
    </div>
  );
}
