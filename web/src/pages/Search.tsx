import React, { useState } from "react";

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  time_minutes: number;
  difficulty: string;
  allergens: string[];
  category: string;
  region: string;
  image?: string;
  score?: number;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [maxTime, setMaxTime] = useState(60);
  const [excludeAllergens, setExcludeAllergens] = useState<string[]>([]);
  const [diet, setDiet] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const allergens = [
    "peanut", "tree_nut", "milk", "egg", "wheat_gluten", 
    "soy", "fish", "shellfish", "sesame"
  ];

  const dietOptions = ["vegetarian", "vegan", "meat", "seafood"];
  const categories = ["", "paella", "tapas"];

  async function search() {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          query, 
          maxTime, 
          excludeAllergens, 
          diet,
          category: category || undefined
        })
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function toggleAllergen(allergen: string) {
    setExcludeAllergens(prev => 
      prev.includes(allergen) 
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
  }

  function toggleDiet(dietOption: string) {
    setDiet(prev => 
      prev.includes(dietOption) 
        ? prev.filter(d => d !== dietOption)
        : [...prev, dietOption]
    );
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🔍 AI-Powered Spanish Cuisine Search
        </h1>
        <p className="text-gray-600 text-lg">
          Search for paella and tapas recipes using natural language. 
          Ask for "nut-free 30-minute recipes" or "seafood paella for beginners"!
        </p>
      </div>

      {/* Search Interface */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex gap-3 mb-4">
          <input 
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., 'nut-free 20 min kid-friendly chicken paella' or 'quick tapas for vegetarians'"
          />
          <button 
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            onClick={search}
            disabled={loading || !query.trim()}
          >
            {loading ? "🔍 Searching..." : "🔍 Search"}
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Time Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Time (minutes)
            </label>
            <input 
              type="number" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" 
              value={maxTime} 
              onChange={(e) => setMaxTime(Number(e.target.value))} 
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat || "All Categories"}
                </option>
              ))}
            </select>
          </div>

          {/* Diet Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diet Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {dietOptions.map(dietOption => (
                <label key={dietOption} className="flex items-center gap-1 text-sm">
                  <input 
                    type="checkbox" 
                    checked={diet.includes(dietOption)}
                    onChange={() => toggleDiet(dietOption)}
                    className="rounded"
                  />
                  {dietOption}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Allergen Filters */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exclude Allergens
          </label>
          <div className="flex flex-wrap gap-3">
            {allergens.map(allergen => (
              <label key={allergen} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={excludeAllergens.includes(allergen)}
                  onChange={() => toggleAllergen(allergen)}
                  className="rounded"
                />
                <span className="text-sm capitalize">{allergen.replace('_', ' ')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Found {results.length} recipes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((recipe) => (
              <div 
                key={recipe.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                {recipe.image && (
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${recipe.image})` }}
                  />
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                      {recipe.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {recipe.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span>⏱️ {recipe.time_minutes} min</span>
                    <span>💪 {recipe.difficulty}</span>
                    <span>📍 {recipe.region}</span>
                  </div>
                  
                  {recipe.allergens.length > 0 && (
                    <div className="text-xs text-red-600 mb-2">
                      ⚠️ Contains: {recipe.allergens.join(", ")}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    Ingredients: {recipe.ingredients.slice(0, 3).join(", ")}
                    {recipe.ingredients.length > 3 && "..."}
                  </div>
                  
                  {recipe.score && (
                    <div className="text-xs text-blue-600 mt-2">
                      Relevance: {(recipe.score * 100).toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {results.length === 0 && !loading && query && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find more recipes.
          </p>
        </div>
      )}

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedRecipe.title}</h2>
                <button 
                  onClick={() => setSelectedRecipe(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Ingredients</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedRecipe.ingredients.map((ingredient, i) => (
                      <li key={i} className="text-sm">{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>⏱️ Time: {selectedRecipe.time_minutes} minutes</div>
                    <div>💪 Difficulty: {selectedRecipe.difficulty}</div>
                    <div>📍 Region: {selectedRecipe.region}</div>
                    <div>🍽️ Category: {selectedRecipe.category}</div>
                    {selectedRecipe.allergens.length > 0 && (
                      <div>⚠️ Allergens: {selectedRecipe.allergens.join(", ")}</div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-700">{selectedRecipe.description}</p>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    // This would open cooking mode
                    console.log("Open cooking mode for:", selectedRecipe.id);
                  }}
                >
                  🍳 Start Cooking
                </button>
                <button 
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  onClick={() => setSelectedRecipe(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
