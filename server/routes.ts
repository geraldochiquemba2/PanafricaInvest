import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { generateRecommendations, generateReinvestmentSuggestion } from "./groq-service";
import { insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth: Register
  app.post("/api/register", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid input", details: result.error });
      }

      const { username, password } = result.data;

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
      });

      req.session.userId = user.id;
      res.json({ 
        id: user.id, 
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
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid input", details: result.error });
      }

      const { username, password } = result.data;

      const user = await storage.getUserByUsername(username);
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

  const httpServer = createServer(app);

  return httpServer;
}
