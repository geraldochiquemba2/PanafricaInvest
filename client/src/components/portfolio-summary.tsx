import { TrendingUp, TrendingDown, DollarSign, PieChart, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const summaryData = [
  {
    title: "Total Portfolio Value",
    value: "$127,450.00",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Total Return",
    value: "+$14,230.00",
    change: "+12.5%",
    positive: true,
    icon: TrendingUp,
  },
  {
    title: "Asset Diversity",
    value: "23 Assets",
    change: "8 Countries",
    positive: true,
    icon: PieChart,
  },
  {
    title: "Monthly Growth",
    value: "+3.2%",
    change: "vs. -1.2% last month",
    positive: true,
    icon: Globe,
  },
];

export function PortfolioSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card
            key={idx}
            className="rounded-xl min-h-[140px]"
            data-testid={`summary-card-${idx}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold font-mono" data-testid={`value-${idx}`}>
                {item.value}
              </div>
              <div className="flex items-center mt-1">
                {item.positive ? (
                  <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-500 mr-1" />
                )}
                <span
                  className={`text-sm ${
                    item.positive
                      ? "text-green-600 dark:text-green-500"
                      : "text-red-600 dark:text-red-500"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
