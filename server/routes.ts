import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateRecommendations, generateReinvestmentSuggestion } from "./groq-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate AI-powered investment recommendations
  app.post("/api/recommendations", async (req, res) => {
    try {
      const profile = req.body;
      const recommendations = await generateRecommendations(profile);
      res.json(recommendations);
    } catch (error) {
      console.error("Error generating recommendations:", error);
      res.status(500).json({ error: "Failed to generate recommendations" });
    }
  });

  // Generate reinvestment suggestion
  app.post("/api/reinvestment-suggestion", async (req, res) => {
    try {
      const { currentAsset, portfolioContext, profile } = req.body;
      const suggestion = await generateReinvestmentSuggestion(
        currentAsset,
        portfolioContext,
        profile
      );
      res.json(suggestion);
    } catch (error) {
      console.error("Error generating reinvestment suggestion:", error);
      res.status(500).json({ error: "Failed to generate reinvestment suggestion" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
