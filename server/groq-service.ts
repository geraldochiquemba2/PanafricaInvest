import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface UserProfile {
  riskTolerance: "low" | "medium" | "high";
  investmentGoal: "wealth" | "income" | "impact";
  horizon: number;
  sectors: string[];
  countries: string[];
}

export interface InvestmentRecommendation {
  name: string;
  ticker: string;
  type: "Stock" | "Bond" | "RWA";
  country: string;
  expectedReturn: string;
  riskLevel: "Low" | "Medium" | "High";
  horizon: string;
  price: string;
  reasoning: string;
}

export async function generateRecommendations(
  profile: UserProfile
): Promise<InvestmentRecommendation[]> {
  const prompt = `You are an expert financial advisor specializing in African markets. Generate 6 personalized investment recommendations based on this investor profile:

Risk Tolerance: ${profile.riskTolerance}
Investment Goal: ${profile.investmentGoal}
Time Horizon: ${profile.horizon} years
Sectors of Interest: ${profile.sectors.join(", ")}
Countries of Interest: ${profile.countries.join(", ")}

For each recommendation, provide:
1. Asset name (real company or project type)
2. Ticker symbol (format: TICKER for stocks, PROJECT-COUNTRY for RWA)
3. Type (Stock, Bond, or RWA)
4. Country
5. Expected annual return range (e.g., "+12-15%")
6. Risk level (Low, Medium, or High)
7. Recommended time horizon (e.g., "3-5 years")
8. Current price (USD, realistic for the asset type)
9. Detailed reasoning (2-3 sentences explaining why this matches their profile)

Focus on real, investable opportunities in African markets. For RWA (Real World Assets), suggest realistic tokenized projects like renewable energy, agriculture, or infrastructure.

Return ONLY a valid JSON array with this exact structure:
[
  {
    "name": "string",
    "ticker": "string",
    "type": "Stock" | "Bond" | "RWA",
    "country": "string",
    "expectedReturn": "string",
    "riskLevel": "Low" | "Medium" | "High",
    "horizon": "string",
    "price": "string",
    "reasoning": "string"
  }
]`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a financial advisor expert in African markets. Always respond with valid JSON only, no additional text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = completion.choices[0]?.message?.content || "[]";
    
    // Extract JSON from the response (in case there's extra text)
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? jsonMatch[0] : content;
    
    const recommendations = JSON.parse(jsonStr);
    return recommendations;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw new Error("Failed to generate recommendations");
  }
}

export async function generateReinvestmentSuggestion(
  currentAsset: string,
  portfolioContext: string,
  profile: UserProfile
): Promise<InvestmentRecommendation> {
  const prompt = `You are an expert financial advisor. An investor's asset "${currentAsset}" has reached its profit target. Based on their portfolio and profile, suggest the next optimal investment for their reinvestment chain.

Portfolio Context: ${portfolioContext}
Risk Tolerance: ${profile.riskTolerance}
Investment Goal: ${profile.investmentGoal}
Preferred Sectors: ${profile.sectors.join(", ")}
Preferred Countries: ${profile.countries.join(", ")}

Suggest ONE new investment that:
1. Maintains portfolio diversification
2. Aligns with their risk profile
3. Complements existing holdings
4. Offers good growth potential

Return ONLY valid JSON with this structure:
{
  "name": "string",
  "ticker": "string",
  "type": "Stock" | "Bond" | "RWA",
  "country": "string",
  "expectedReturn": "string",
  "riskLevel": "Low" | "Medium" | "High",
  "horizon": "string",
  "price": "string",
  "reasoning": "string (explain why this is the next optimal investment)"
}`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a financial advisor. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content || "{}";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : content;
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating reinvestment suggestion:", error);
    throw new Error("Failed to generate reinvestment suggestion");
  }
}

export interface MarketAnalysis {
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

export async function generateMarketAnalysis(
  currentAmount: number,
  targetAmount: number,
  timeHorizon: number
): Promise<MarketAnalysis[]> {
  const requiredReturn = ((Math.pow(targetAmount / currentAmount, 1 / timeHorizon) - 1) * 100).toFixed(2);

  const prompt = `You are an expert on African financial markets and economies. An investor wants to grow $${currentAmount} to $${targetAmount} in ${timeHorizon} years, requiring ${requiredReturn}% annual returns.

Analyze and recommend the TOP 5 African countries/markets that could realistically achieve this goal. For each country, provide:

1. Country name
2. Required annual return (${requiredReturn}%)
3. Feasibility level (High/Medium/Low) based on market potential
4. Top 3-4 investment sectors in that country
5. 3-4 key advantages of investing in this market
6. 3-4 key disadvantages or risks
7. 3-4 real, functional URLs to explore the economy:
   - Central bank website
   - Stock exchange website
   - Investment authority or economic statistics portal
   - World Bank or IMF country data page
8. A brief investment strategy (2-3 sentences) for this market

Focus on realistic, current information. Provide REAL, WORKING URLs to official sources like central banks, stock exchanges, government investment portals, World Bank, IMF, African Development Bank pages.

Return ONLY valid JSON array with this structure:
[
  {
    "country": "string",
    "requiredAnnualReturn": "${requiredReturn}%",
    "feasibility": "High" | "Medium" | "Low",
    "topSectors": ["sector1", "sector2", "sector3"],
    "advantages": ["advantage1", "advantage2", "advantage3"],
    "disadvantages": ["disadvantage1", "disadvantage2", "disadvantage3"],
    "economicLinks": [
      {"name": "Central Bank", "url": "https://..."},
      {"name": "Stock Exchange", "url": "https://..."},
      {"name": "Investment Portal", "url": "https://..."}
    ],
    "investmentStrategy": "string"
  }
]`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an African markets expert. Always respond with valid JSON only, no additional text. Use real, functional URLs from official sources.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = completion.choices[0]?.message?.content || "[]";
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? jsonMatch[0] : content;

    const analysis = JSON.parse(jsonStr);
    return analysis;
  } catch (error) {
    console.error("Error generating market analysis:", error);
    throw new Error("Failed to generate market analysis");
  }
}
