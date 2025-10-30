import { CheckCircle2, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    number: 1,
    title: "Connect Your Hedera Wallet",
    description:
      "Connect your HashPack, Blade, or MetaMask wallet to interact with the Hedera network.",
    action: "Connect Wallet",
  },
  {
    number: 2,
    title: "Review Asset Details",
    description:
      "Examine the tokenized asset information, including price, expected returns, and risk assessment.",
    action: "View Details",
  },
  {
    number: 3,
    title: "Enter Investment Amount",
    description:
      "Specify how much you want to invest. Fractional ownership available starting from $100.",
    action: "Enter Amount",
  },
  {
    number: 4,
    title: "Approve Transaction",
    description:
      "Review gas fees (typically less than $0.01 on Hedera) and approve the transaction in your wallet.",
    action: "Approve",
  },
  {
    number: 5,
    title: "Transaction Confirmation",
    description:
      "Your investment is recorded on Hedera Consensus Service. You'll receive a transaction hash for transparency.",
    action: "View on HashScan",
  },
];

export function InvestmentInstructions() {
  const [copied, setCopied] = useState(false);
  const txHash = "0.0.123456@1234567890.123456789";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(txHash);
    setCopied(true);
    console.log("Transaction hash copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="lg:sticky lg:top-24 h-fit">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Asset Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">🇰🇪</span>
                <div>
                  <div className="font-semibold text-lg">Kenya Solar Project</div>
                  <div className="text-sm text-muted-foreground font-mono">SOLAR-KE-001</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Token Price</div>
                  <div className="text-xl font-bold font-mono">$500</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Expected Return</div>
                  <div className="text-xl font-bold text-green-600 dark:text-green-500">
                    +15-18%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Risk Level</div>
                  <Badge variant="secondary">Low</Badge>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Type</div>
                  <Badge variant="outline">RWA Token</Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm font-semibold mb-2">Transaction Hash</div>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 text-xs bg-muted px-3 py-2 rounded font-mono truncate">
                    {txHash}
                  </code>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={copyToClipboard}
                    data-testid="button-copy-hash"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold font-heading mb-2">Investment Guide</h2>
          <p className="text-muted-foreground">
            Follow these steps to complete your investment on Hedera
          </p>
        </div>

        {steps.map((step) => (
          <Card key={step.number} className="rounded-xl" data-testid={`step-${step.number}`}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                  {step.number === 5 ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://hashscan.io/testnet/transaction/${txHash}`, '_blank')}
                      data-testid={`button-${step.action.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {step.action}
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      data-testid={`button-${step.action.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => console.log(`${step.action} clicked`)}
                    >
                      {step.action}
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  )}
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="rounded-xl bg-muted/50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <div className="font-semibold mb-1">Pro Tip</div>
                <p className="text-sm text-muted-foreground">
                  All transactions are tracked immutably on Hedera Consensus Service, ensuring
                  complete transparency. You can verify your investment anytime on HashScan
                  explorer.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
