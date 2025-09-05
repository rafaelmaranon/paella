// Validation script for AI search quality
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test queries with expected results
const testCases = [
  {
    query: "quick vegetarian tapas",
    expectedCategories: ["tapas"],
    expectedAllergens: [], // Should exclude meat/seafood
    expectedMaxTime: 30,
    description: "Should return vegetarian tapas under 30 minutes"
  },
  {
    query: "seafood paella for beginners",
    expectedCategories: ["paella"],
    expectedAllergens: ["shellfish"],
    expectedMaxTime: 60,
    description: "Should return seafood paella recipes"
  },
  {
    query: "nut-free 20 minute recipes",
    expectedAllergens: ["peanut", "tree_nut"],
    expectedMaxTime: 20,
    description: "Should exclude nut-containing recipes"
  },
  {
    query: "traditional Spanish potato dish",
    expectedKeywords: ["potato", "tortilla", "patatas"],
    description: "Should return potato-based Spanish dishes"
  }
];

async function validateSearchQuality() {
  console.log("🔍 Validating AI Search Quality...\n");
  
  let totalTests = 0;
  let passedTests = 0;
  
  for (const testCase of testCases) {
    console.log(`Testing: "${testCase.query}"`);
    console.log(`Expected: ${testCase.description}`);
    
    try {
      const response = await fetch('http://localhost:3001/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: testCase.query })
      });
      
      const data = await response.json();
      const results = data.results || [];
      
      // Validate results
      let testPassed = true;
      
      // Check if we got results
      if (results.length === 0) {
        console.log("❌ No results returned");
        testPassed = false;
      }
      
      // Check categories
      if (testCase.expectedCategories) {
        const hasExpectedCategory = results.some(r => 
          testCase.expectedCategories.includes(r.category)
        );
        if (!hasExpectedCategory) {
          console.log(`❌ Missing expected category: ${testCase.expectedCategories.join(', ')}`);
          testPassed = false;
        }
      }
      
      // Check allergens
      if (testCase.expectedAllergens && testCase.expectedAllergens.length > 0) {
        const hasExcludedAllergens = results.some(r => 
          r.allergens && r.allergens.some(a => testCase.expectedAllergens.includes(a))
        );
        if (hasExcludedAllergens) {
          console.log(`❌ Results contain excluded allergens: ${testCase.expectedAllergens.join(', ')}`);
          testPassed = false;
        }
      }
      
      // Check time constraints
      if (testCase.expectedMaxTime) {
        const exceedsTime = results.some(r => r.time_minutes > testCase.expectedMaxTime);
        if (exceedsTime) {
          console.log(`❌ Some results exceed max time: ${testCase.expectedMaxTime} minutes`);
          testPassed = false;
        }
      }
      
      // Check keywords
      if (testCase.expectedKeywords) {
        const hasKeywords = results.some(r => 
          testCase.expectedKeywords.some(keyword => 
            r.title.toLowerCase().includes(keyword) || 
            r.description.toLowerCase().includes(keyword) ||
            r.ingredients.some(ing => ing.toLowerCase().includes(keyword))
          )
        );
        if (!hasKeywords) {
          console.log(`❌ Missing expected keywords: ${testCase.expectedKeywords.join(', ')}`);
          testPassed = false;
        }
      }
      
      if (testPassed) {
        console.log("✅ Test passed");
        passedTests++;
      }
      
      // Show top results
      console.log(`Top results: ${results.slice(0, 3).map(r => r.title).join(', ')}`);
      console.log(`Relevance scores: ${results.slice(0, 3).map(r => (r.score * 100).toFixed(1) + '%').join(', ')}\n`);
      
    } catch (error) {
      console.log(`❌ Test failed with error: ${error.message}\n`);
    }
    
    totalTests++;
  }
  
  const successRate = (passedTests / totalTests) * 100;
  console.log(`📊 Validation Results:`);
  console.log(`Passed: ${passedTests}/${totalTests} tests (${successRate.toFixed(1)}%)`);
  
  if (successRate >= 80) {
    console.log("🎉 Excellent search quality!");
  } else if (successRate >= 60) {
    console.log("👍 Good search quality, room for improvement");
  } else {
    console.log("⚠️ Search quality needs improvement");
  }
}

// Run validation
validateSearchQuality().catch(console.error);
