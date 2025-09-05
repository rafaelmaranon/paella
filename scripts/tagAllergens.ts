// ts-node scripts/tagAllergens.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { detectAllergens } from "../src/lib/allergens.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA = path.join(__dirname, "..", "data", "recipes.json");

function main() {
  const recipes = JSON.parse(fs.readFileSync(DATA, "utf-8"));
  const updated = recipes.map((r: any) => {
    const detectedAllergens = detectAllergens(r.ingredients || []);
    return { ...r, allergens: detectedAllergens };
  });
  
  fs.writeFileSync(DATA, JSON.stringify(updated, null, 2));
  console.log(`Tagged allergens for ${updated.length} recipes.`);
  
  // Show summary
  const allergenCounts: Record<string, number> = {};
  updated.forEach((recipe: any) => {
    recipe.allergens.forEach((allergen: string) => {
      allergenCounts[allergen] = (allergenCounts[allergen] || 0) + 1;
    });
  });
  
  console.log("\nAllergen summary:");
  Object.entries(allergenCounts).forEach(([allergen, count]) => {
    console.log(`  ${allergen}: ${count} recipes`);
  });
}

main();
