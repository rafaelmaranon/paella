// Validation script for allergen detection accuracy
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { detectAllergens } from "../src/lib/allergens.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test cases for allergen detection
const allergenTestCases = [
  {
    ingredients: ["jamón ibérico", "olive oil"],
    expectedAllergens: [],
    description: "Jamón Ibérico should have no allergens"
  },
  {
    ingredients: ["potatoes", "eggs", "onion", "olive oil"],
    expectedAllergens: ["egg"],
    description: "Tortilla Española should detect eggs"
  },
  {
    ingredients: ["shrimp", "garlic", "olive oil", "chili pepper"],
    expectedAllergens: ["shellfish"],
    description: "Gambas al Ajillo should detect shellfish"
  },
  {
    ingredients: ["jamón", "flour", "milk", "eggs", "breadcrumbs"],
    expectedAllergens: ["wheat_gluten", "milk", "egg"],
    description: "Croquetas should detect gluten, milk, and eggs"
  },
  {
    ingredients: ["anchovies", "vinegar", "garlic", "parsley"],
    expectedAllergens: ["fish"],
    description: "Boquerones should detect fish"
  },
  {
    ingredients: ["padrón peppers", "olive oil", "sea salt"],
    expectedAllergens: [],
    description: "Pimientos de Padrón should have no allergens"
  },
  {
    ingredients: ["almond", "honey", "olive oil"],
    expectedAllergens: ["tree_nut"],
    description: "Almond-based dish should detect tree nuts"
  },
  {
    ingredients: ["peanut butter", "chocolate", "milk"],
    expectedAllergens: ["peanut", "milk"],
    description: "Peanut butter dish should detect peanuts and milk"
  }
];

function validateAllergenDetection() {
  console.log("⚠️ Validating Allergen Detection Accuracy...\n");
  
  let totalTests = 0;
  let passedTests = 0;
  let falsePositives = 0;
  let falseNegatives = 0;
  
  for (const testCase of allergenTestCases) {
    console.log(`Testing: ${testCase.description}`);
    console.log(`Ingredients: ${testCase.ingredients.join(', ')}`);
    
    const detectedAllergens = detectAllergens(testCase.ingredients);
    const expectedAllergens = testCase.expectedAllergens;
    
    console.log(`Expected: [${expectedAllergens.join(', ')}]`);
    console.log(`Detected: [${detectedAllergens.join(', ')}]`);
    
    // Check for exact match
    const expectedSet = new Set(expectedAllergens);
    const detectedSet = new Set(detectedAllergens);
    
    const hasAllExpected = expectedAllergens.every(allergen => detectedSet.has(allergen));
    const hasNoUnexpected = detectedAllergens.every(allergen => expectedSet.has(allergen));
    
    if (hasAllExpected && hasNoUnexpected) {
      console.log("✅ Perfect match");
      passedTests++;
    } else {
      if (!hasAllExpected) {
        console.log("❌ Missing expected allergens");
        falseNegatives++;
      }
      if (!hasNoUnexpected) {
        console.log("❌ False positive allergens detected");
        falsePositives++;
      }
    }
    
    console.log("");
    totalTests++;
  }
  
  // Calculate metrics
  const accuracy = (passedTests / totalTests) * 100;
  const precision = passedTests / (passedTests + falsePositives) * 100;
  const recall = passedTests / (passedTests + falseNegatives) * 100;
  
  console.log("📊 Allergen Detection Results:");
  console.log(`Accuracy: ${accuracy.toFixed(1)}% (${passedTests}/${totalTests})`);
  console.log(`Precision: ${precision.toFixed(1)}%`);
  console.log(`Recall: ${recall.toFixed(1)}%`);
  console.log(`False Positives: ${falsePositives}`);
  console.log(`False Negatives: ${falseNegatives}`);
  
  if (accuracy >= 90) {
    console.log("🎉 Excellent allergen detection!");
  } else if (accuracy >= 75) {
    console.log("👍 Good allergen detection, minor improvements needed");
  } else {
    console.log("⚠️ Allergen detection needs significant improvement");
  }
}

// Run validation
validateAllergenDetection();
