import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, TrendingUp } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface AfricanMarket {
  country: string;
  flag: string;
  exchange: string;
  exchangeCode: string;
  website: string;
  region: string;
  active: boolean;
}

const africanMarkets: AfricanMarket[] = [
  {
    country: "South Africa",
    flag: "🇿🇦",
    exchange: "Johannesburg Stock Exchange",
    exchangeCode: "JSE",
    website: "https://www.jse.co.za/",
    region: "Southern Africa",
    active: true,
  },
  {
    country: "Nigeria",
    flag: "🇳🇬",
    exchange: "Nigerian Exchange Group",
    exchangeCode: "NGX",
    website: "https://ngxgroup.com/",
    region: "West Africa",
    active: true,
  },
  {
    country: "Egypt",
    flag: "🇪🇬",
    exchange: "Egyptian Exchange",
    exchangeCode: "EGX",
    website: "https://www.egx.com.eg/en/homepage.aspx",
    region: "North Africa",
    active: true,
  },
  {
    country: "Kenya",
    flag: "🇰🇪",
    exchange: "Nairobi Securities Exchange",
    exchangeCode: "NSE",
    website: "https://www.nse.co.ke/",
    region: "East Africa",
    active: true,
  },
  {
    country: "Morocco",
    flag: "🇲🇦",
    exchange: "Casablanca Stock Exchange",
    exchangeCode: "CSE",
    website: "https://www.casablanca-bourse.com/",
    region: "North Africa",
    active: true,
  },
  {
    country: "Ghana",
    flag: "🇬🇭",
    exchange: "Ghana Stock Exchange",
    exchangeCode: "GSE",
    website: "https://gse.com.gh/",
    region: "West Africa",
    active: true,
  },
  {
    country: "Tunisia",
    flag: "🇹🇳",
    exchange: "Tunis Stock Exchange",
    exchangeCode: "BVMT",
    website: "https://www.bvmt.com.tn/",
    region: "North Africa",
    active: true,
  },
  {
    country: "Botswana",
    flag: "🇧🇼",
    exchange: "Botswana Stock Exchange",
    exchangeCode: "BSE",
    website: "https://www.bse.co.bw/",
    region: "Southern Africa",
    active: true,
  },
  {
    country: "Uganda",
    flag: "🇺🇬",
    exchange: "Uganda Securities Exchange",
    exchangeCode: "USE",
    website: "https://www.use.or.ug/",
    region: "East Africa",
    active: true,
  },
  {
    country: "Tanzania",
    flag: "🇹🇿",
    exchange: "Dar es Salaam Stock Exchange",
    exchangeCode: "DSE",
    website: "https://www.dse.co.tz/",
    region: "East Africa",
    active: true,
  },
  {
    country: "Mauritius",
    flag: "🇲🇺",
    exchange: "Stock Exchange of Mauritius",
    exchangeCode: "SEM",
    website: "https://www.stockexchangeofmauritius.com/",
    region: "East Africa",
    active: true,
  },
  {
    country: "Zimbabwe",
    flag: "🇿🇼",
    exchange: "Zimbabwe Stock Exchange",
    exchangeCode: "ZSE",
    website: "https://www.zse.co.zw/",
    region: "Southern Africa",
    active: true,
  },
  {
    country: "Namibia",
    flag: "🇳🇦",
    exchange: "Namibian Stock Exchange",
    exchangeCode: "NSX",
    website: "https://nsx.com.na/",
    region: "Southern Africa",
    active: true,
  },
  {
    country: "Zambia",
    flag: "🇿🇲",
    exchange: "Lusaka Securities Exchange",
    exchangeCode: "LuSE",
    website: "https://www.luse.co.zm/",
    region: "Southern Africa",
    active: true,
  },
  {
    country: "Ivory Coast",
    flag: "🇨🇮",
    exchange: "BRVM",
    exchangeCode: "BRVM",
    website: "https://www.brvm.org/",
    region: "West Africa",
    active: true,
  },
  {
    country: "Rwanda",
    flag: "🇷🇼",
    exchange: "Rwanda Stock Exchange",
    exchangeCode: "RSE",
    website: "https://www.rse.rw/",
    region: "East Africa",
    active: true,
  },
  {
    country: "Malawi",
    flag: "🇲🇼",
    exchange: "Malawi Stock Exchange",
    exchangeCode: "MSE",
    website: "https://mse.co.mw/",
    region: "Southern Africa",
    active: true,
  },
  {
    country: "Ethiopia",
    flag: "🇪🇹",
    exchange: "Ethiopian Securities Exchange",
    exchangeCode: "ESX",
    website: "https://www.ethiopiansc.com/",
    region: "East Africa",
    active: false,
  },
  {
    country: "Algeria",
    flag: "🇩🇿",
    exchange: "Algiers Stock Exchange",
    exchangeCode: "SGBV",
    website: "https://www.sgbv.dz/",
    region: "North Africa",
    active: true,
  },
  {
    country: "Senegal",
    flag: "🇸🇳",
    exchange: "BRVM (Regional)",
    exchangeCode: "BRVM",
    website: "https://www.brvm.org/",
    region: "West Africa",
    active: true,
  },
];

const regions = ["All", "North Africa", "West Africa", "East Africa", "Southern Africa"];

export default function Markets() {
  const [selectedRegion, setSelectedRegion] = useState("All");

  const filteredMarkets = selectedRegion === "All" 
    ? africanMarkets 
    : africanMarkets.filter(m => m.region === selectedRegion);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 font-heading" data-testid="text-markets-title">
            Mercados Africanos
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore todas as bolsas de valores da África. Acesse informações em tempo real e
            oportunidades de investimento em todo o continente.
          </p>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {regions.map((region) => (
            <Button
              key={region}
              variant={selectedRegion === region ? "default" : "outline"}
              onClick={() => setSelectedRegion(region)}
              data-testid={`button-filter-${region.toLowerCase().replace(" ", "-")}`}
            >
              {region === "All" ? "Todos" : region}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
            <Card
              key={market.country}
              className="hover-elevate transition-all"
              data-testid={`card-market-${market.country.toLowerCase().replace(" ", "-")}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-5xl" aria-label={`${market.country} flag`}>
                      {market.flag}
                    </span>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl mb-1">{market.country}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {market.exchangeCode}
                      </Badge>
                    </div>
                  </div>
                  {market.active && (
                    <Badge variant="outline" className="text-green-600 border-green-600 dark:text-green-500 dark:border-green-500">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Ativo
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-1">Bolsa de Valores</div>
                  <div className="text-sm text-muted-foreground">{market.exchange}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Região</div>
                  <Badge variant="outline" className="text-xs">
                    {market.region}
                  </Badge>
                </div>
                <a
                  href={market.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full"
                    data-testid={`button-visit-${market.country.toLowerCase().replace(" ", "-")}`}
                  >
                    Visitar Site Oficial
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhum mercado encontrado para esta região.
            </p>
          </div>
        )}

        <div className="mt-16 p-6 bg-muted/30 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 font-heading">
            Sobre os Mercados Africanos
          </h2>
          <div className="text-muted-foreground space-y-3">
            <p>
              A África possui um ecossistema de mercados de capitais em rápido crescimento, com mais
              de 20 bolsas de valores ativas em todo o continente. Esses mercados oferecem acesso a
              diversos setores, incluindo tecnologia, mineração, telecomunicações, serviços
              financeiros e energia renovável.
            </p>
            <p>
              Os principais mercados como JSE (África do Sul), NGX (Nigéria), EGX (Egito) e NSE
              (Quênia) lideram em capitalização de mercado e liquidez, enquanto mercados emergentes
              oferecem oportunidades únicas de crescimento.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
