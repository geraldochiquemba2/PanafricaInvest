import { RecommendationCard } from "../recommendation-card";

export default function RecommendationCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <RecommendationCard
        name="Kenya Solar Project"
        ticker="SOLAR-KE-001"
        type="RWA"
        country="Kenya"
        flag="🇰🇪"
        expectedReturn="+15-18%"
        riskLevel="Low"
        horizon="5-7 years"
        price="$500"
        aiReasoning="Based on your low-risk profile and interest in renewable energy, this tokenized solar project in Kenya offers stable returns through government-backed power purchase agreements. Kenya's strong solar potential and political stability make this an excellent long-term investment with environmental impact."
      />
      <RecommendationCard
        name="Dangote Cement"
        ticker="DANGCEM"
        type="Stock"
        country="Nigeria"
        flag="🇳🇬"
        expectedReturn="+12-14%"
        riskLevel="Medium"
        horizon="3-5 years"
        price="$2,850"
        aiReasoning="Nigeria's infrastructure boom drives cement demand. Dangote Cement dominates the market with 60% share and strong fundamentals. Your medium-term investment horizon aligns perfectly with Nigeria's projected GDP growth of 3.5% annually."
      />
      <RecommendationCard
        name="Ghana Green Bonds"
        ticker="GH-GB-2025"
        type="Bond"
        country="Ghana"
        flag="🇬🇭"
        expectedReturn="+8-10%"
        riskLevel="Low"
        horizon="2-3 years"
        price="$1,000"
        aiReasoning="Government-backed green bonds funding renewable energy projects. Fixed returns with minimal risk exposure, perfect for portfolio diversification. Ghana's improving economic indicators and commitment to sustainable development ensure bond security."
      />
    </div>
  );
}
