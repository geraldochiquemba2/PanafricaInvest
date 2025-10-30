import { HeroSection } from "@/components/hero-section";
import { TopPerformersScoreboard } from "@/components/top-performers-scoreboard";
import { FeatureCards } from "@/components/feature-cards";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Globe, LayoutDashboard, Calculator, Target, Newspaper, MessageCircle } from "lucide-react";
import howItWorksBg from "@assets/stock_images/african_technology_f_4fd6a397.jpg";
import africaMapImage from "@assets/africa_map.png";
import goalImage from "@assets/stock_images/financial_goals_targ_43b90333.jpg";
import analysisImage from "@assets/stock_images/ai_data_analysis_cha_b8d02db4.jpg";
import marketsImage from "@assets/stock_images/global_markets_world_182bfbc9.jpg";
import simulatorBg from "@assets/stock_images/african_business_inv_54b9c5fd.jpg";
import { memo, useRef, useEffect } from "react";

const BackgroundVideo = memo(() => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="absolute inset-0">
      <iframe
        ref={iframeRef}
        className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
        src="https://www.youtube.com/embed/zwUsFN__jtE?autoplay=1&mute=1&loop=1&playlist=zwUsFN__jtE&controls=0&showinfo=0&rel=0&modestbranding=1&enablejsapi=1&playsinline=1&iv_load_policy=3&disablekb=1"
        title="How it works background video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        style={{ pointerEvents: 'none', opacity: 0.5 }}
      />
      <div className="absolute inset-0 bg-background/40 dark:bg-background/50" />
    </div>
  );
});

BackgroundVideo.displayName = "BackgroundVideo";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <img 
                src={africaMapImage} 
                alt="Africa Continent" 
                className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-none">Panafrica Invest</span>
                <span className="text-[10px] text-muted-foreground font-medium">Powered by AI</span>
              </div>
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <Link href="/ask-ai">
              <Button variant="ghost" size="sm" data-testid="button-ask-ai-link">
                <MessageCircle className="h-4 w-4 mr-2" />
                Ask AI
              </Button>
            </Link>
            <Link href="/news">
              <Button variant="ghost" size="sm" data-testid="button-news-link">
                <Newspaper className="h-4 w-4 mr-2" />
                News
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" data-testid="button-go-dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
        <TopPerformersScoreboard />
        <FeatureCards />

        <div className="py-20 px-6 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${simulatorBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-6">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-4xl font-bold mb-4 font-heading">Investment Goal Simulator</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Plan your financial future with AI-powered market analysis. See which African markets can help you reach your goals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="text-center p-6 rounded-lg border overflow-hidden relative group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${goalImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/85 to-background/90" />
                <div className="relative z-10">
                  <Target className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Set Your Goal</h3>
                  <p className="text-sm text-muted-foreground">Enter your current amount and target</p>
                </div>
              </div>
              <div className="text-center p-6 rounded-lg border overflow-hidden relative group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${analysisImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/85 to-background/90" />
                <div className="relative z-10">
                  <TrendingUp className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">Get market recommendations with real data</p>
                </div>
              </div>
              <div className="text-center p-6 rounded-lg border overflow-hidden relative group">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${marketsImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/85 to-background/90" />
                <div className="relative z-10">
                  <Globe className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Explore Markets</h3>
                  <p className="text-sm text-muted-foreground">Access real resources for each country</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/simulator">
                <Button size="lg" className="h-14 px-10 rounded-full" data-testid="button-try-simulator">
                  <Calculator className="mr-2 h-5 w-5" />
                  Try the Simulator
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-4">No registration required</p>
            </div>
          </div>
        </div>

        <div id="how-it-works" className="py-24 px-6 bg-muted/30 relative overflow-hidden">
          <BackgroundVideo />
          <div className="max-w-7xl mx-auto relative z-10">
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
                  <Link href="/dashboard" className="block hover:text-primary transition-colors cursor-pointer">
                    Markets
                  </Link>
                  <a href="#features" className="block hover:text-primary transition-colors cursor-pointer">
                    Features
                  </a>
                  <a href="#how-it-works" className="block hover:text-primary transition-colors cursor-pointer">
                    How It Works
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Technology</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <a
                      href="https://hedera.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      Hedera Hashgraph
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://groq.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      Groq AI Engine
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://hashscan.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      HashScan Explorer
                    </a>
                  </div>
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
