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

    res.json({ results: scored });
  } catch (e: any) {
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 AI Spanish Cuisine API running on port ${PORT}`);
  console.log(`📊 Loaded ${RECIPES.length} recipes with ${VECTORS.length} embeddings`);
  console.log(`🔍 Semantic search ready!`);
});
