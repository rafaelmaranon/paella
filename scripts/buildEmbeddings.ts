// ts-node scripts/buildEmbeddings.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import 'dotenv/config';
import OpenAI from "openai";
import { normalize } from "../src/lib/cosine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const DATA = path.join(__dirname, "..", "data", "recipes.json");
const OUT = path.join(__dirname, "..", "data", "recipe_vectors.json");

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Please set OPENAI_API_KEY environment variable");
    process.exit(1);
  }

  const recipes = JSON.parse(fs.readFileSync(DATA, "utf-8"));
  const payloads: { id: string; text: string }[] = recipes.map((r: any) => ({
    id: r.id,
    text: `${r.title}\nDescription: ${r.description}\nIngredients:\n${r.ingredients.join("\n")}\nCategory: ${r.category}\nRegion: ${r.region}`
  }));

  const chunks: number = 64; // batch safely
  const vectors: any[] = [];

  console.log(`Building embeddings for ${payloads.length} recipes...`);

  for (let i = 0; i < payloads.length; i += chunks) {
    const slice = payloads.slice(i, i + chunks);
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: slice.map((s) => s.text)
    });
    
    res.data.forEach((e, idx) => {
      const id = slice[idx].id;
      const vec = normalize(e.embedding as number[]);
      vectors.push({ id, vec });
    });
    
    console.log(`Embedded ${Math.min(i + chunks, payloads.length)} / ${payloads.length}`);
  }

  fs.writeFileSync(OUT, JSON.stringify(vectors, null, 2));
  console.log(`Saved ${vectors.length} vectors → ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
