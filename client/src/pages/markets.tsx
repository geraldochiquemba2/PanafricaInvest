import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, TrendingUp } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

import southAfricaImg from "@assets/stock_images/johannesburg_south_a_ae35c80f.jpg";
import nigeriaImg from "@assets/stock_images/lagos_nigeria_city_s_3e9f7966.jpg";
import egyptImg from "@assets/stock_images/cairo_egypt_pyramids_2b84e9d0.jpg";
import moroccoImg from "@assets/stock_images/casablanca_morocco_h_a40b92f4.jpg";
import kenyaImg from "@assets/stock_images/nairobi_kenya_city_s_f29fc035.jpg";
import ghanaImg from "@assets/stock_images/accra_ghana_city_sky_a60eb02c.jpg";
import botswanaImg from "@assets/stock_images/gaborone_botswana_ci_f0575d20.jpg";
import mauritiusImg from "@assets/stock_images/port_louis_mauritius_d65163d4.jpg";
import tunisiaImg from "@assets/stock_images/tunis_tunisia_citysc_f43d8521.jpg";
import zimbabweImg from "@assets/stock_images/harare_zimbabwe_city_f5eb57af.jpg";
import tanzaniaImg from "@assets/stock_images/dar_es_salaam_tanzan_b4bb7301.jpg";
import ugandaImg from "@assets/stock_images/kampala_uganda_city__741a802f.jpg";
import namibiaImg from "@assets/stock_images/windhoek_namibia_cit_7b4d48a6.jpg";
import rwandaImg from "@assets/stock_images/kigali_rwanda_city_m_9efc59fb.jpg";
import zambiaImg from "@assets/stock_images/lusaka_zambia_city_l_7706d98d.jpg";
import malawiImg from "@assets/stock_images/blantyre_malawi_city_b9d183d5.jpg";
import ethiopiaImg from "@assets/stock_images/addis_ababa_ethiopia_563229bd.jpg";
import algeriaImg from "@assets/stock_images/algiers_algeria_whit_108ea9f8.jpg";
import angolaImg from "@assets/stock_images/luanda_angola_bay_wa_49b7b25a.jpg";
import mozambiqueImg from "@assets/stock_images/maputo_mozambique_ci_807fbacc.jpg";
import eswatiniImg from "@assets/stock_images/mbabane_eswatini_swa_328c1e13.jpg";
import cameroonImg from "@assets/stock_images/douala_cameroon_city_5ca8d22c.jpg";
import ivoryCoastImg from "@assets/stock_images/abidjan_ivory_coast__326aa3d8.jpg";
import defaultImg from "@assets/stock_images/african_stock_exchan_73bd73fe.jpg";

interface AfricanMarket {
  country: string;
  flag: string;
  exchange: string;
  exchangeCode: string;
  website: string;
  region: string;
  active: boolean;
  marketCap?: string;
  founded?: string;
}

const countryImages: Record<string, string> = {
  "South Africa": southAfricaImg,
  "Nigeria": nigeriaImg,
  "Egypt": egyptImg,
  "Morocco": moroccoImg,
  "Kenya": kenyaImg,
  "Ghana": ghanaImg,
  "Botswana": botswanaImg,
  "Mauritius": mauritiusImg,
  "Tunisia": tunisiaImg,
  "Zimbabwe": zimbabweImg,
  "Tanzania": tanzaniaImg,
  "Uganda": ugandaImg,
  "Namibia": namibiaImg,
  "Rwanda": rwandaImg,
  "Zambia": zambiaImg,
  "Malawi": malawiImg,
  "Ethiopia": ethiopiaImg,
  "Algeria": algeriaImg,
  "Angola": angolaImg,
  "Mozambique": mozambiqueImg,
  "Eswatini": eswatiniImg,
  "Cameroon": cameroonImg,
  "Côte d'Ivoire": ivoryCoastImg,
  "Gabon": cameroonImg,
};

const africanMarkets: AfricanMarket[] = [
  {
    country: "South Africa",
    flag: "🇿🇦",
    exchange: "Johannesburg Stock Exchange",
    exchangeCode: "JSE",
    website: "https://www.jse.co.za/",
    region: "Southern Africa",
    active: true,
    marketCap: "$1+ trillion",
    founded: "1887",
  },
  {
    country: "Nigeria",
    flag: "🇳🇬",
    exchange: "Nigerian Exchange Limited",
    exchangeCode: "NGX",
    website: "https://ngxgroup.com/",
    region: "West Africa",
    active: true,
    marketCap: "$49.56 billion",
    founded: "1960",
  },
  {
    country: "Egypt",
    flag: "🇪🇬",
    exchange: "Egyptian Exchange",
    exchangeCode: "EGX",
    website: "https://www.egx.com.eg/en/homepage.aspx",
    region: "North Africa",
    active: true,
    marketCap: "$40.3 billion",
    founded: "1883",
  },
  {
    country: "Morocco",
    flag: "🇲🇦",
    exchange: "Casablanca Stock Exchange",
    exchangeCode: "BVC",
    website: "https://www.casablanca-bourse.com/",
    region: "North Africa",
    active: true,
    marketCap: "$69.8 billion",
    founded: "1929",
  },
  {
    country: "Botswana",
    flag: "🇧🇼",
    exchange: "Botswana Stock Exchange",
    exchangeCode: "BSE",
    website: "https://www.bse.co.bw/",
    region: "Southern Africa",
    active: true,
    marketCap: "$43.94 billion",
    founded: "1989",
  },
  {
    country: "Kenya",
    flag: "🇰🇪",
    exchange: "Nairobi Securities Exchange",
    exchangeCode: "NSE",
    website: "https://www.nse.co.ke/",
    region: "East Africa",
    active: true,
    marketCap: "$13.6 billion",
    founded: "1954",
  },
  {
    country: "Ghana",
    flag: "🇬🇭",
    exchange: "Ghana Stock Exchange",
    exchangeCode: "GSE",
    website: "https://gse.com.gh/",
    region: "West Africa",
    active: true,
    marketCap: "$6.35 billion",
    founded: "1989",
  },
  {
    country: "Mauritius",
    flag: "🇲🇺",
    exchange: "Stock Exchange of Mauritius",
    exchangeCode: "SEM",
    website: "https://www.stockexchangeofmauritius.com/",
    region: "East Africa",
    active: true,
    marketCap: "$7.4 billion",
  },
  {
    country: "Tunisia",
    flag: "🇹🇳",
    exchange: "Bourse de Tunis",
    exchangeCode: "BVMT",
    website: "https://www.bvmt.com.tn/",
    region: "North Africa",
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
    founded: "1946",
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
    country: "Uganda",
    flag: "🇺🇬",
    exchange: "Uganda Securities Exchange",
    exchangeCode: "USE",
    website: "https://www.use.or.ug/",
    region: "East Africa",
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
    country: "Rwanda",
    flag: "🇷🇼",
    exchange: "Rwanda Stock Exchange",
    exchangeCode: "RSE",
    website: "https://www.rse.rw/",
    region: "East Africa",
    active: true,
  },
  {
    country: "Zambia",
    flag: "🇿🇲",
    exchange: "Lusaka Stock Exchange",
    exchangeCode: "LuSE",
    website: "https://www.luse.co.zm/",
    region: "Southern Africa",
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
    website: "https://esx.et/",
    region: "East Africa",
    active: true,
    founded: "2025",
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
    country: "Angola",
    flag: "🇦🇴",
    exchange: "Bolsa de Dívida e Valores de Angola",
    exchangeCode: "BODIVA",
    website: "https://www.bodiva.ao/",
    region: "Southern Africa",
    active: true,
  },
  {
    country: "Mozambique",
    flag: "🇲🇿",
    exchange: "Mozambique Stock Exchange",
    exchangeCode: "BVM",
    website: "https://www.bvm.co.mz/",
    region: "Southern Africa",
    active: true,
  },
  {
    country: "Eswatini",
    flag: "🇸🇿",
    exchange: "Eswatini Stock Exchange",
    exchangeCode: "ESE",
    website: "https://www.ssx.org.sz/",
    region: "Southern Africa",
    active: true,
  },
  {
    country: "Cameroon",
    flag: "🇨🇲",
    exchange: "BVMAC (Central Africa Regional)",
    exchangeCode: "BVMAC",
    website: "https://www.bvm-ac.org/",
    region: "Central Africa",
    active: true,
  },
  {
    country: "Sudan",
    flag: "🇸🇩",
    exchange: "Khartoum Stock Exchange",
    exchangeCode: "KSE",
    website: "https://african-exchanges.org/",
    region: "North Africa",
    active: true,
  },
  {
    country: "Cape Verde",
    flag: "🇨🇻",
    exchange: "Bolsa de Valores de Cabo Verde",
    exchangeCode: "BVC",
    website: "https://www.bvc.cv/",
    region: "West Africa",
    active: true,
  },
  {
    country: "Seychelles",
    flag: "🇸🇨",
    exchange: "Merj Exchange Limited",
    exchangeCode: "MERJ",
    website: "https://merj.exchange/",
    region: "East Africa",
    active: true,
  },
  {
    country: "Libya",
    flag: "🇱🇾",
    exchange: "Libya Stock Market",
    exchangeCode: "LSM",
    website: "https://african-exchanges.org/",
    region: "North Africa",
    active: true,
  },
  {
    country: "Somalia",
    flag: "🇸🇴",
    exchange: "Somali Stock Exchange",
    exchangeCode: "SSE",
    website: "https://african-exchanges.org/",
    region: "East Africa",
    active: false,
  },
  {
    country: "BRVM Regional",
    flag: "🌍",
    exchange: "Bourse Régionale des Valeurs Mobilières",
    exchangeCode: "BRVM",
    website: "https://www.brvm.org/",
    region: "West Africa",
    active: true,
    marketCap: "$13.8 billion",
    founded: "1996",
  },
  {
    country: "Gabon",
    flag: "🇬🇦",
    exchange: "BVMAC (Central Africa Regional)",
    exchangeCode: "BVMAC",
    website: "https://www.bvm-ac.org/",
    region: "Central Africa",
    active: true,
  },
  {
    country: "Côte d'Ivoire",
    flag: "🇨🇮",
    exchange: "BRVM (Headquarters)",
    exchangeCode: "BRVM",
    website: "https://www.brvm.org/",
    region: "West Africa",
    active: true,
  },
];

const regions = ["All", "North Africa", "West Africa", "East Africa", "Southern Africa", "Central Africa"];

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
              Back
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 font-heading" data-testid="text-markets-title">
            African Markets
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore all African stock exchanges. Access real-time information and
            investment opportunities across the continent. Africa now has 30 stock exchanges
            with a combined market capitalization of approximately $1.6 trillion.
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
              {region}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => {
            const backgroundImage = countryImages[market.country] || defaultImg;
            return (
              <Card
                key={market.country}
                className="hover-elevate transition-all overflow-hidden relative"
                data-testid={`card-market-${market.country.toLowerCase().replace(" ", "-")}`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                <div className="absolute inset-0 bg-background/90 dark:bg-background/85" />
                <div className="relative z-10">
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
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Stock Exchange</div>
                      <div className="text-sm text-muted-foreground">{market.exchange}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Region</div>
                      <Badge variant="outline" className="text-xs">
                        {market.region}
                      </Badge>
                    </div>
                    {market.marketCap && (
                      <div>
                        <div className="text-sm font-medium mb-1">Market Cap</div>
                        <div className="text-sm font-mono text-muted-foreground">{market.marketCap}</div>
                      </div>
                    )}
                    {market.founded && (
                      <div>
                        <div className="text-sm font-medium mb-1">Founded</div>
                        <div className="text-sm text-muted-foreground">{market.founded}</div>
                      </div>
                    )}
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
                        Visit Official Website
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </a>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No markets found for this region.
            </p>
          </div>
        )}

        <div className="mt-16 p-6 bg-muted/30 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 font-heading">
            About African Markets
          </h2>
          <div className="text-muted-foreground space-y-3">
            <p>
              Africa has a rapidly growing capital markets ecosystem with 30 active stock exchanges
              across the continent. These markets provide access to diverse sectors including technology,
              mining, telecommunications, financial services, and renewable energy.
            </p>
            <p>
              Leading markets such as JSE (South Africa), NGX (Nigeria), EGX (Egypt), and Casablanca
              Stock Exchange (Morocco) dominate in market capitalization and liquidity, with a combined
              market cap exceeding $1.2 trillion. The newest addition is the Ethiopian Securities Exchange
              (ESX), which began trading in January 2025.
            </p>
            <p>
              Regional exchanges like BRVM serve 8 West African countries, while emerging markets offer
              unique growth opportunities. Africa is home to 6 of the world's 10 fastest-growing economies,
              making it an attractive destination for global investors.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
