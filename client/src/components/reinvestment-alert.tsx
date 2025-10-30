import { Bell, TrendingUp, Sparkles, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

interface ReinvestmentAlertProps {
  assetName: string;
  currentValue: string;
  gainAmount: string;
  gainPercentage: string;
  targetReached: string;
  suggestedAsset: string;
  suggestedCountry: string;
  suggestedFlag: string;
}

export function ReinvestmentAlert({
  assetName,
  currentValue,
  gainAmount,
  gainPercentage,
  targetReached,
  suggestedAsset,
  suggestedCountry,
  suggestedFlag,
}: ReinvestmentAlertProps) {
  const [dismissed, setDismissed] = useState(false);
  const [, setLocation] = useLocation();

  if (dismissed) return null;

  return (
    <Card className="rounded-xl border-primary/50 bg-gradient-to-r from-primary/5 to-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Bell className="h-5 w-5 text-primary animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-lg">Profit Target Reached!</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                AI Agent 3: Reinvestment Opportunity
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setDismissed(true);
              console.log("Reinvestment alert dismissed");
            }}
            data-testid="button-dismiss-alert"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 rounded-lg bg-background/50">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Asset</div>
              <div className="font-semibold">{assetName}</div>
              <Badge variant="secondary" className="mt-2 text-xs">
                {targetReached}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Current Value</div>
              <div className="text-xl font-bold font-mono">{currentValue}</div>
              <div className="flex items-center justify-end space-x-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-500" />
                <span className="text-sm font-mono text-green-600 dark:text-green-500">
                  {gainAmount} ({gainPercentage})
                </span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">AI Recommendation: Next Investment Chain</span>
            </div>
            <div className="p-4 rounded-lg bg-background/50 border border-primary/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{suggestedFlag}</span>
                  <div>
                    <div className="font-semibold">{suggestedAsset}</div>
                    <div className="text-xs text-muted-foreground">{suggestedCountry}</div>
                  </div>
                </div>
                <Badge variant="outline">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Personalized
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Based on your portfolio diversification goals and current market conditions, this
                asset offers optimal risk-return balance for your next investment.
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              className="flex-1" 
              onClick={() => setLocation("/recommendations")}
              data-testid="button-view-recommendation"
            >
              View Full Recommendation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setDismissed(true)}
              data-testid="button-maybe-later"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
