import { HeroSection } from "@/components/hero-section";
import { TopPerformersScoreboard } from "@/components/top-performers-scoreboard";
import { FeatureCards } from "@/components/feature-cards";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">PA</span>
              </div>
              <span className="font-heading font-bold text-lg">Panafrica Invest</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/dashboard">
              <a className="hover:text-primary transition-colors">Markets</a>
            </Link>
            <a href="#features" className="hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">
              How It Works
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <WalletConnectButton />
          </div>
        </div>
      </header>

      <main className="pt-16">
        <HeroSection />
        <TopPerformersScoreboard />
        <FeatureCards />

        <div id="how-it-works" className="py-24 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-semibold mb-4 font-heading">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three AI agents working together for your investment success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-2xl font-semibold mb-3">Profile Analysis</h3>
                <p className="text-muted-foreground mb-4">
                  AI Agent 1 analyzes your risk tolerance, goals, and preferences through an
                  intelligent questionnaire
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-2xl font-semibold mb-3">Smart Recommendations</h3>
                <p className="text-muted-foreground mb-4">
                  AI Agent 2 generates personalized investment opportunities across African
                  markets matching your profile
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-2xl font-semibold mb-3">Reinvestment Chain</h3>
                <p className="text-muted-foreground mb-4">
                  AI Agent 3 monitors your portfolio and suggests optimal reinvestment
                  opportunities when targets are reached
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/questionnaire">
                <Button size="lg" className="h-14 px-8 rounded-full">
                  Start Your Investment Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <footer className="py-16 px-6 border-t">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <Link href="/dashboard">Markets</Link>
                  </div>
                  <div>
                    <a href="#features">Features</a>
                  </div>
                  <div>
                    <a href="#how-it-works">How It Works</a>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Technology</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Hedera Hashgraph</div>
                  <div>AI Engine</div>
                  <div>Security</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Documentation</div>
                  <div>FAQ</div>
                  <div>Support</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Terms of Service</div>
                  <div>Privacy Policy</div>
                  <div>Disclaimer</div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
              © 2025 Panafrica Invest. Powered by Hedera Hashgraph.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
