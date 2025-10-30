import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { generateRecommendations, generateReinvestmentSuggestion, generateMarketAnalysis } from "./groq-service";
import { insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth: Register
  app.post("/api/register", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid input", details: result.error });
      }

      const { email, username, password } = result.data;

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        email,
        username,
        password: hashedPassword,
      });

      req.session.userId = user.id;
      res.json({ 
        id: user.id,
        email: user.email,
        username: user.username,
        balance: user.balance 
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  // Auth: Login
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json({ 
        id: user.id,
        email: user.email,
        username: user.username,
        balance: user.balance 
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to log in" });
    }
  });

  // Auth: Logout
  app.post("/api/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  // Auth: Get current user
  app.get("/api/user", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ 
      id: user.id,
      email: user.email,
      username: user.username,
      balance: user.balance 
    });
  });

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

  // Generate investment market analysis
  app.post("/api/simulate-investment", async (req, res) => {
    try {
      const { currentAmount, targetAmount, timeHorizon } = req.body;
      
      if (!currentAmount || !targetAmount || !timeHorizon) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const analysis = await generateMarketAnalysis(
        currentAmount,
        targetAmount,
        timeHorizon
      );
      res.json(analysis);
    } catch (error) {
      console.error("Error generating market analysis:", error);
      res.status(500).json({ error: "Failed to generate market analysis" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
