import { useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

const sectors = [
  "Technology",
  "Renewable Energy",
  "Agriculture",
  "Real Estate",
  "Infrastructure",
  "Financial Services",
  "Healthcare",
  "Manufacturing",
];

const countries = [
  "🇳🇬 Nigeria",
  "🇿🇦 South Africa",
  "🇰🇪 Kenya",
  "🇪🇬 Egypt",
  "🇬🇭 Ghana",
  "🇹🇿 Tanzania",
  "🇪🇹 Ethiopia",
  "🇲🇦 Morocco",
];

export function ProfileQuestionnaire() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [riskTolerance, setRiskTolerance] = useState("medium");
  const [investmentGoal, setInvestmentGoal] = useState("");
  const [horizon, setHorizon] = useState([5]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const totalSteps = 4;

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
  };

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
      console.log(`Moving to step ${step + 1}`);
    } else {
      console.log("Questionnaire completed, generating recommendations...");
      
      // Save profile to localStorage for use in recommendations page
      const profile = {
        riskTolerance,
        investmentGoal,
        horizon: horizon[0],
        sectors: selectedSectors,
        countries: selectedCountries.map(c => c.split(" ")[1]), // Remove flag emoji
      };
      localStorage.setItem("userProfile", JSON.stringify(profile));
      
      setLocation("/recommendations");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx < step
                    ? "w-12 bg-primary"
                    : idx === step - 1
                    ? "w-16 bg-primary"
                    : "w-12 bg-muted"
                }`}
                data-testid={`progress-step-${idx + 1}`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Step {step} of {totalSteps}
          </p>
        </div>

        <Card className="rounded-xl p-8">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-3xl font-heading">
              {step === 1 && "What's your risk tolerance?"}
              {step === 2 && "What are your investment goals?"}
              {step === 3 && "Select sectors of interest"}
              {step === 4 && "Which countries interest you?"}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-0 pb-0">
            {step === 1 && (
              <div className="space-y-6">
                <RadioGroup value={riskTolerance} onValueChange={setRiskTolerance}>
                  <div className="flex items-start space-x-3 p-4 rounded-lg border hover-elevate">
                    <RadioGroupItem value="low" id="low" data-testid="radio-risk-low" />
                    <div className="flex-1">
                      <Label htmlFor="low" className="text-base font-semibold cursor-pointer">
                        Conservative (Low Risk)
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Prefer stable, predictable returns with minimal volatility. Focus on
                        bonds and established companies.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border hover-elevate">
                    <RadioGroupItem value="medium" id="medium" data-testid="radio-risk-medium" />
                    <div className="flex-1">
                      <Label htmlFor="medium" className="text-base font-semibold cursor-pointer">
                        Moderate (Medium Risk)
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Balance between growth and stability. Mix of stocks, bonds, and RWA
                        with calculated risks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border hover-elevate">
                    <RadioGroupItem value="high" id="high" data-testid="radio-risk-high" />
                    <div className="flex-1">
                      <Label htmlFor="high" className="text-base font-semibold cursor-pointer">
                        Aggressive (High Risk)
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Seeking maximum returns, comfortable with volatility. Early-stage
                        projects and emerging markets.
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <RadioGroup value={investmentGoal} onValueChange={setInvestmentGoal}>
                  <div className="flex items-start space-x-3 p-4 rounded-lg border hover-elevate">
                    <RadioGroupItem value="wealth" id="wealth" data-testid="radio-goal-wealth" />
                    <div className="flex-1">
                      <Label htmlFor="wealth" className="text-base font-semibold cursor-pointer">
                        Wealth Accumulation
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Long-term growth and compound returns
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border hover-elevate">
                    <RadioGroupItem value="income" id="income" data-testid="radio-goal-income" />
                    <div className="flex-1">
                      <Label htmlFor="income" className="text-base font-semibold cursor-pointer">
                        Regular Income
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Dividends and interest payments for cash flow
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg border hover-elevate">
                    <RadioGroupItem value="impact" id="impact" data-testid="radio-goal-impact" />
                    <div className="flex-1">
                      <Label htmlFor="impact" className="text-base font-semibold cursor-pointer">
                        Social Impact
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Support sustainable development and community projects
                      </p>
                    </div>
                  </div>
                </RadioGroup>

                <div className="pt-6 border-t">
                  <Label className="text-base font-semibold mb-4 block">
                    Investment Horizon: {horizon[0]} years
                  </Label>
                  <Slider
                    value={horizon}
                    onValueChange={setHorizon}
                    min={1}
                    max={20}
                    step={1}
                    className="w-full"
                    data-testid="slider-horizon"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1 year</span>
                    <span>20 years</span>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select all sectors that interest you (minimum 2)
                </p>
                <div className="flex flex-wrap gap-3">
                  {sectors.map((sector) => (
                    <Badge
                      key={sector}
                      variant={selectedSectors.includes(sector) ? "default" : "outline"}
                      className="px-4 py-2 cursor-pointer text-sm hover-elevate"
                      onClick={() => toggleSector(sector)}
                      data-testid={`badge-sector-${sector.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {sector}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Selected: {selectedSectors.length} sector{selectedSectors.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select countries you're interested in investing (minimum 2)
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {countries.map((country) => (
                    <div
                      key={country}
                      onClick={() => toggleCountry(country)}
                      className={`p-4 rounded-lg border cursor-pointer hover-elevate ${
                        selectedCountries.includes(country)
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      data-testid={`country-${country.split(" ")[1].toLowerCase()}`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{country.split(" ")[0]}</div>
                        <div className="text-sm font-medium">{country.split(" ")[1]}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Selected: {selectedCountries.length} countr{selectedCountries.length !== 1 ? "ies" : "y"}
                </p>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t space-x-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                data-testid="button-back"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleNext} data-testid="button-next">
                {step === totalSteps ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Recommendations
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
