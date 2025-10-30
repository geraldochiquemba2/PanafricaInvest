import { ArrowRight, TrendingUp, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/nZoaZDOe6bg?autoplay=1&mute=1&loop=1&playlist=nZoaZDOe6bg&controls=0&showinfo=0&rel=0&modestbranding=1&start=331&enablejsapi=1&playsinline=1"
          title="Background video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          style={{ pointerEvents: 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative h-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-6 animate-fade-in">
        <h1 className="text-6xl font-bold text-white mb-6 font-heading" data-testid="text-hero-title">
          Invest in Africa's Future
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8" data-testid="text-hero-subtitle">
          AI-powered investment recommendations connecting you to the best
          opportunities across all African markets. Tokenized assets, real-time
          tracking, transparent on Hedera.
        </p>

        <div className="flex space-x-4 mb-12">
          <Link href="/questionnaire">
            <Button
              size="lg"
              className="h-14 px-8 rounded-full text-base"
              data-testid="button-get-started"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-full text-base bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              data-testid="button-explore"
            >
              Explore Markets
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-8 opacity-90">
          <a
            href="https://en.wikipedia.org/wiki/List_of_African_stock_exchanges"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover-elevate rounded-lg p-3 transition-all"
          >
            <Globe className="h-8 w-8 text-white mb-2" />
            <span className="text-sm text-white font-medium">54 Countries</span>
          </a>
          <a
            href="https://groq.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover-elevate rounded-lg p-3 transition-all"
          >
            <TrendingUp className="h-8 w-8 text-white mb-2" />
            <span className="text-sm text-white font-medium">Groq AI</span>
          </a>
          <a
            href="https://hedera.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover-elevate rounded-lg p-3 transition-all"
          >
            <Shield className="h-8 w-8 text-white mb-2" />
            <span className="text-sm text-white font-medium">Hedera Network</span>
          </a>
          <a
            href="https://hedera.com/users/tokenization"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover-elevate rounded-lg p-3 transition-all"
          >
            <div className="h-8 w-8 text-white mb-2 flex items-center justify-center text-xl font-bold">
              RWA
            </div>
            <span className="text-sm text-white font-medium">Tokenization</span>
          </a>
        </div>
      </div>
    </div>
  );
}
