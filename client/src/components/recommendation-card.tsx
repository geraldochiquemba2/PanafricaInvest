import { TrendingUp, Sparkles, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecommendationProps {
  name: string;
  ticker: string;
  type: "Stock" | "Bond" | "RWA";
  country: string;
  flag: string;
  expectedReturn: string;
  riskLevel: "Low" | "Medium" | "High";
  horizon: string;
  aiReasoning: string;
  price: string;
}

export function RecommendationCard({
  name,
  ticker,
  type,
  country,
  flag,
  expectedReturn,
  riskLevel,
  horizon,
  aiReasoning,
  price,
}: RecommendationProps) {
  const [showReasoning, setShowReasoning] = useState(false);

  const riskColor = {
    Low: "text-green-600 dark:text-green-500",
    Medium: "text-yellow-600 dark:text-yellow-500",
    High: "text-red-600 dark:text-red-500",
  };

  return (
    <Card className="rounded-xl overflow-hidden hover-elevate" data-testid={`recommendation-${ticker}`}>
      <CardHeader className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">{flag}</span>
              <Badge variant="secondary" className="text-xs">
                {type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Pick
              </Badge>
            </div>
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <div className="font-mono text-sm text-muted-foreground">
              {ticker} • {country}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold font-mono">{price}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Expected Return</div>
            <div className="text-lg font-semibold text-green-600 dark:text-green-500">
              {expectedReturn}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Risk Level</div>
            <div className={`text-lg font-semibold ${riskColor[riskLevel]}`}>
              {riskLevel}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Time Horizon</div>
            <div className="text-lg font-semibold">{horizon}</div>
          </div>
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() => {
              setShowReasoning(!showReasoning);
              console.log(`AI reasoning ${showReasoning ? "hidden" : "shown"}`);
            }}
            className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid={`button-reasoning-${ticker}`}
          >
            <span className="flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              Why this recommendation?
            </span>
            {showReasoning ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {showReasoning && (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {aiReasoning}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button className="w-full" data-testid={`button-invest-${ticker}`}>
          View Investment Guide
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
