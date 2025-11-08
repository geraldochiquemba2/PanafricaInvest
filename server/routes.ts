import type { Express } from "express";
import { createServer, type Server } from "http";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import { generateRecommendations, generateReinvestmentSuggestion, generateMarketAnalysis, generateChatResponse } from "./groq-service";
import { insertUserSchema } from "@shared/schema";

// News cache to reduce API calls
let newsCache: { articles: any[], timestamp: number } | null = null;
const CACHE_DURATION = 10 * 60 * 60 * 1000; // 10 hours

// Fallback news data for when API fails
const fallbackNews = [
  {
    title: "African Stock Markets Show Strong Growth in 2024",
    url: "https://www.worldbank.org/en/region/afr",
    source: "World Bank Africa",
    publishedAt: new Date().toISOString(),
    language: "en",
    country: "Multiple",
    imageUrl: null,
  },
  {
    title: "Nigerian Stock Exchange Reaches New Milestone",
    url: "https://www.ngxgroup.com/",
    source: "NGX Group",
    publishedAt: new Date().toISOString(),
    language: "en",
    country: "Nigeria",
    imageUrl: null,
  },
  {
    title: "South African Economy Shows Resilience",
    url: "https://www.jse.co.za/",
    source: "JSE",
    publishedAt: new Date().toISOString(),
    language: "en",
    country: "South Africa",
    imageUrl: null,
  },
  {
    title: "Kenya Leads in Mobile Banking Innovation",
    url: "https://www.nse.co.ke/",
    source: "Nairobi Securities Exchange",
    publishedAt: new Date().toISOString(),
    language: "en",
    country: "Kenya",
    imageUrl: null,
  },
  {
    title: "Egyptian Market Attracts Foreign Investment",
    url: "https://www.egx.com.eg/",
    source: "Egyptian Exchange",
    publishedAt: new Date().toISOString(),
    language: "en",
    country: "Egypt",
    imageUrl: null,
  },
];

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint (lightweight for keep-alive)
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Health check endpoint for Render.com (with z)
  app.get("/healthz", (_req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

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

      // Validate inputs
      if (typeof currentAmount !== 'number' || currentAmount <= 0) {
        return res.status(400).json({ error: "Current amount must be a positive number" });
      }
      if (typeof targetAmount !== 'number' || targetAmount <= currentAmount) {
        return res.status(400).json({ error: "Target amount must be greater than current amount" });
      }
      if (typeof timeHorizon !== 'number' || timeHorizon < 1 || timeHorizon > 50) {
        return res.status(400).json({ error: "Time horizon must be between 1 and 50 years" });
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

  // AI Chat endpoint (public - no auth required)
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await generateChatResponse(message, conversationHistory || []);
      res.json({ response });
    } catch (error) {
      console.error("Error in AI chat:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Fetch African financial news from GDELT API (with cache)
  app.get("/api/news", async (_req, res) => {
    try {
      // Check cache first
      const now = Date.now();
      if (newsCache && (now - newsCache.timestamp) < CACHE_DURATION) {
        console.log("Serving news from cache");
        return res.json({ articles: newsCache.articles, cached: true });
      }

      // Try to fetch from GDELT API
      const query = encodeURIComponent('(africa OR african) AND (finance OR economy OR market OR investment OR stock OR GDP OR banking OR currency)');
      const mode = 'artlist';
      const maxRecords = 30;
      const timespan = '7d';
      
      const gdeltUrl = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=${mode}&maxrecords=${maxRecords}&timespan=${timespan}&format=json&sort=datedesc`;
      
      const response = await fetch(gdeltUrl, {
        headers: {
          'User-Agent': 'PanafricaInvest/1.0',
        },
      });
      
      if (!response.ok) {
        console.warn(`GDELT API returned ${response.status}, using fallback news`);
        
        // Update cache with fallback news
        newsCache = {
          articles: fallbackNews,
          timestamp: now,
        };
        
        return res.json({ articles: fallbackNews, fallback: true });
      }
      
      const data = await response.json();
      
      const articles = data.articles?.map((article: any) => ({
        title: article.title || 'Untitled',
        url: article.url || '#',
        source: article.domain || 'Unknown',
        publishedAt: article.seendate || new Date().toISOString(),
        language: article.language || 'en',
        country: article.sourcecountry || 'Unknown',
        imageUrl: article.socialimage || null,
      })) || fallbackNews;
      
      // Update cache
      newsCache = {
        articles,
        timestamp: now,
      };
      
      console.log(`Fetched ${articles.length} news articles from GDELT`);
      res.json({ articles });
    } catch (error) {
      console.error("Error fetching news:", error);
      
      // Return cached data if available, otherwise fallback
      if (newsCache) {
        console.log("Serving stale cache due to error");
        return res.json({ articles: newsCache.articles, cached: true, stale: true });
      }
      
      res.json({ articles: fallbackNews, fallback: true });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
