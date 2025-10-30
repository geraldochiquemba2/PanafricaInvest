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
