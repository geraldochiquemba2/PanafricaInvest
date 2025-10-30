import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, AlertCircle, CheckCircle, ExternalLink, Loader2, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

interface MarketAnalysis {
  country: string;
  requiredAnnualReturn: string;
  feasibility: "High" | "Medium" | "Low";
  topSectors: string[];
  advantages: string[];
  disadvantages: string[];
  economicLinks: {
    name: string;
    url: string;
  }[];
  investmentStrategy: string;
}

export default function InvestmentSimulator() {
  const [, setLocation] = useLocation();
  const [currentAmount, setCurrentAmount] = useState<string>("1000");
  const [targetAmount, setTargetAmount] = useState<string>("10000");
  const [timeHorizon, setTimeHorizon] = useState<number[]>([5]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MarketAnalysis[]>([]);
  const [error, setError] = useState<string>("");

  const calculateRequiredReturn = () => {
    const current = parseFloat(currentAmount);
    const target = parseFloat(targetAmount);
    const years = timeHorizon[0];

    if (!current || !target || current <= 0 || target <= current) {
      return null;
    }

    const requiredReturn = (Math.pow(target / current, 1 / years) - 1) * 100;
    return requiredReturn.toFixed(2);
  };

  const handleSimulate = async () => {
    const current = parseFloat(currentAmount);
    const target = parseFloat(targetAmount);
    const years = timeHorizon[0];

    if (!current || !target || current <= 0) {
      setError("Please enter valid amounts");
      return;
    }

    if (target <= current) {
      setError("Target amount must be greater than current amount");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/simulate-investment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentAmount: current,
          targetAmount: target,
          timeHorizon: years,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate market analysis");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate analysis. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const requiredReturn = calculateRequiredReturn();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="mb-6"
            data-testid="button-back-home"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold mb-2">Investment Goal Simulator</h1>
          <p className="text-muted-foreground">
            Discover the best African markets to reach your financial goals
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Your Investment Goal
                </CardTitle>
                <CardDescription>
                  Enter your current amount and target to see the best markets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-amount">Current Amount (USD)</Label>
                  <Input
                    id="current-amount"
                    type="number"
                    placeholder="1000"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                    data-testid="input-current-amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount (USD)</Label>
                  <Input
                    id="target-amount"
                    type="number"
                    placeholder="10000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    data-testid="input-target-amount"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Time Horizon: {timeHorizon[0]} years</Label>
                  <Slider
                    value={timeHorizon}
                    onValueChange={setTimeHorizon}
                    min={1}
                    max={20}
                    step={1}
                    data-testid="slider-time-horizon"
                  />
                  <p className="text-xs text-muted-foreground">
                    Adjust how many years you have to reach your goal
                  </p>
                </div>

                {requiredReturn && (
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Required Annual Return</p>
                    <p className="text-2xl font-bold text-primary">
                      {requiredReturn}% per year
                    </p>
                  </div>
                )}

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleSimulate}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                  data-testid="button-simulate"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Markets...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Find Best Markets
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {results.length > 0 ? (
              <div className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2">Recommended African Markets</h2>
                  <p className="text-muted-foreground">
                    Based on your goal of ${targetAmount} in {timeHorizon[0]} years
                  </p>
                </div>

                {results.map((market, index) => (
                  <Card key={index} data-testid={`card-market-${index}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{market.country}</CardTitle>
                          <CardDescription className="mt-1">
                            Required return: {market.requiredAnnualReturn} annually
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            market.feasibility === "High"
                              ? "default"
                              : market.feasibility === "Medium"
                              ? "secondary"
                              : "outline"
                          }
                          data-testid={`badge-feasibility-${index}`}
                        >
                          {market.feasibility} Feasibility
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Top Investment Sectors
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {market.topSectors.map((sector, i) => (
                            <Badge key={i} variant="outline">
                              {sector}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
                            <CheckCircle className="h-4 w-4" />
                            Advantages
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {market.advantages.map((advantage, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
                                <span>{advantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2 text-orange-600 dark:text-orange-400">
                            <AlertCircle className="h-4 w-4" />
                            Disadvantages
                          </h4>
                          <ul className="space-y-1 text-sm">
                            {market.disadvantages.map((disadvantage, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-orange-600 dark:text-orange-400 mt-0.5">•</span>
                                <span>{disadvantage}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-2">Investment Strategy</h4>
                        <p className="text-sm text-muted-foreground">{market.investmentStrategy}</p>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-3">Explore This Economy</h4>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {market.economicLinks.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-3 rounded-md border hover-elevate active-elevate-2 text-sm"
                              data-testid={`link-resource-${index}-${i}`}
                            >
                              <ExternalLink className="h-4 w-4 text-primary" />
                              <span>{link.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Find Your Best Markets?</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Enter your investment goal and time horizon to discover the best African markets
                    with detailed analysis, advantages, and resources.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
