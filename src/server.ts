import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import 'dotenv/config';
import OpenAI from "openai";
import { cosineSim } from "./lib/cosine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Load data
const RECIPES = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "recipes.json"), "utf-8"));
const VECTORS: { id: string; vec: number[] }[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "recipe_vectors.json"), "utf-8")
);

const VEC_BY_ID = new Map(VECTORS.map((v) => [v.id, v.vec]));
const RECIPE_BY_ID = new Map(RECIPES.map((r: any) => [r.id, r]));

async function embed(text: string): Promise<number[]> {
  const res = await openai.embeddings.create({ 
    model: "text-embedding-3-small", 
    input: text 
  });
  const v = res.data[0].embedding as number[];
  // Normalize the vector
  const mag = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
  return v.map((x) => x / mag);
}

// AI-powered semantic search
app.post("/search", async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { query, excludeAllergens = [], maxTime, diet = [], category } = req.body || {};
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "query required" });
    }

    console.log(`Searching for: "${query}"`);

    const qv = await embed(query);

    // Filter then score
    const candidates = RECIPES.filter((r: any) => {
      if (maxTime && r.time_minutes && r.time_minutes > Number(maxTime)) return false;
      if (excludeAllergens.length && (r.allergens || []).some((a: string) => excludeAllergens.includes(a))) return false;
      if (diet.length && !diet.every((d: string) => (r.diet_tags || []).includes(d))) return false;
      if (category && r.category !== category) return false;
      return true;
    });

    const scored = candidates
      .map((r: any) => ({ 
        id: r.id, 
        score: cosineSim(qv, VEC_BY_ID.get(r.id)!) 
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ id, score }) => ({ 
        ...RECIPE_BY_ID.get(id), 
        score 
      }));

    // Track metrics
    const latency = Date.now() - startTime;
    searchMetrics.totalSearches++;
    searchMetrics.successfulSearches++;
    searchMetrics.totalLatency += latency;
    searchMetrics.searchHistory.push({
      query,
      latency,
      resultCount: scored.length,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 100 searches
    if (searchMetrics.searchHistory.length > 100) {
      searchMetrics.searchHistory = searchMetrics.searchHistory.slice(-100);
    }

    res.json({ results: scored });
  } catch (e: any) {
    // Track failed searches
    const latency = Date.now() - startTime;
    searchMetrics.totalSearches++;
    searchMetrics.totalLatency += latency;
    
    console.error(e);
    res.status(500).json({ error: e.message || "server error" });
  }
});

// Get specific recipe
app.get("/recipes/:id", (req, res) => {
  const r = RECIPE_BY_ID.get(req.params.id);
  if (!r) return res.status(404).json({ error: "not found" });
  res.json(r);
});

// Get all recipes (for browsing)
app.get("/recipes", (req, res) => {
  const { category, region } = req.query;
  let filtered = RECIPES;
  
  if (category) {
    filtered = filtered.filter((r: any) => r.category === category);
  }
  
  if (region) {
    filtered = filtered.filter((r: any) => r.region === region);
  }
  
  res.json(filtered);
});

// AI-powered recipe suggestions
app.post("/suggest", async (req, res) => {
  try {
    const { preferences, dietary_restrictions, time_available } = req.body || {};
    
    const prompt = `Based on these preferences: ${preferences}, dietary restrictions: ${dietary_restrictions}, time available: ${time_available} minutes, suggest 3 Spanish recipes (paella or tapas) that would be perfect. Be specific about why each recipe fits their needs.`;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a Spanish cuisine expert. Suggest authentic Spanish recipes based on user preferences, dietary restrictions, and time constraints. Always recommend specific recipes from Spanish cuisine."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500
    });

    res.json({ 
      suggestions: completion.choices[0].message.content,
      timestamp: new Date().toISOString()
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message || "server error" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    recipes: RECIPES.length,
    vectors: VECTORS.length,
    timestamp: new Date().toISOString()
  });
});

// Track real metrics
let searchMetrics = {
  totalSearches: 0,
  successfulSearches: 0,
  totalLatency: 0,
  searchHistory: []
};

// Track user feedback
let feedbackData = {
  totalFeedback: 0,
  helpfulFeedback: 0,
  notHelpfulFeedback: 0,
  feedbackHistory: []
};

// Metrics endpoint for dashboard
app.get("/metrics", (req, res) => {
  const avgLatency = searchMetrics.totalSearches > 0 
    ? Math.round(searchMetrics.totalLatency / searchMetrics.totalSearches)
    : 0;
  
  const successRate = searchMetrics.totalSearches > 0
    ? Math.round((searchMetrics.successfulSearches / searchMetrics.totalSearches) * 100)
    : 100;

  // Calculate feedback quality
  const feedbackQuality = feedbackData.totalFeedback > 0
    ? Math.round((feedbackData.helpfulFeedback / feedbackData.totalFeedback) * 100)
    : 0;

  res.json({
    searchQuality: 25, // From real test results
    allergenAccuracy: 62.5, // From real test results  
    avgLatency: avgLatency,
    successRate: successRate,
    feedbackQuality: feedbackQuality,
    totalSearches: searchMetrics.totalSearches,
    totalFeedback: feedbackData.totalFeedback,
    recipes: RECIPES.length,
    vectors: VECTORS.length,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Recent searches endpoint
app.get("/recent-searches", (req, res) => {
  // Return real search history (last 10 searches)
  const recentSearches = searchMetrics.searchHistory
    .slice(-10)
    .reverse()
    .map(search => ({
      query: search.query,
      timestamp: search.timestamp,
      results: search.resultCount,
      latency: search.latency
    }));
  
  res.json(recentSearches);
});

// User feedback endpoint
app.post("/feedback", (req, res) => {
  try {
    const { recipeId, feedback, query, timestamp, userAgent } = req.body;
    
    if (!recipeId || !feedback || !query) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    if (!['helpful', 'not_helpful'].includes(feedback)) {
      return res.status(400).json({ error: "Invalid feedback type" });
    }
    
    // Store feedback
    feedbackData.totalFeedback++;
    if (feedback === 'helpful') {
      feedbackData.helpfulFeedback++;
    } else {
      feedbackData.notHelpfulFeedback++;
    }
    
    feedbackData.feedbackHistory.push({
      recipeId,
      feedback,
      query,
      timestamp: timestamp || new Date().toISOString(),
      userAgent: userAgent || 'unknown'
    });
    
    // Keep only last 100 feedback entries
    if (feedbackData.feedbackHistory.length > 100) {
      feedbackData.feedbackHistory = feedbackData.feedbackHistory.slice(-100);
    }
    
    console.log(`📝 Feedback received: ${feedback} for recipe ${recipeId} (query: "${query}")`);
    
    res.json({ 
      success: true, 
      message: "Feedback recorded",
      feedbackQuality: Math.round((feedbackData.helpfulFeedback / feedbackData.totalFeedback) * 100)
    });
    
  } catch (error: any) {
    console.error('Error processing feedback:', error);
    res.status(500).json({ error: "Failed to process feedback" });
  }
});

// Get feedback analytics
app.get("/feedback-analytics", (req, res) => {
  const recentFeedback = feedbackData.feedbackHistory.slice(-20);
  
  res.json({
    totalFeedback: feedbackData.totalFeedback,
    helpfulFeedback: feedbackData.helpfulFeedback,
    notHelpfulFeedback: feedbackData.notHelpfulFeedback,
    feedbackQuality: feedbackData.totalFeedback > 0 
      ? Math.round((feedbackData.helpfulFeedback / feedbackData.totalFeedback) * 100)
      : 0,
    recentFeedback: recentFeedback
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 AI Spanish Cuisine API running on port ${PORT}`);
  console.log(`📊 Loaded ${RECIPES.length} recipes with ${VECTORS.length} embeddings`);
  console.log(`🔍 Semantic search ready!`);
});
