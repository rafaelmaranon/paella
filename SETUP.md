# 🚀 Spanish Cuisine AI App Setup Guide

## What's New - AI Features Added! 🧠

Your app now has powerful AI capabilities:

- **🔍 Semantic Search**: Search recipes using natural language (e.g., "nut-free 30-minute paella")
- **⚠️ Allergen Detection**: Automatic detection and filtering of allergens
- **🍳 Enhanced Cooking Mode**: Step-by-step cooking with timers and voice guidance
- **🤖 AI Recipe Suggestions**: Get personalized recipe recommendations

## Quick Start

### 1. Set up OpenAI API Key
```bash
# Copy the example environment file
cp env.example .env

# Edit .env and add your OpenAI API key
# Get your key from: https://platform.openai.com/api-keys
```

### 2. Build Recipe Embeddings (One-time setup)
```bash
# This creates AI embeddings for all recipes
npm run dev:embed
```

### 3. Start the AI Backend
```bash
# Start the AI-powered API server
npm run dev:api
```

### 4. Start the Frontend
```bash
# In another terminal, start the web server
npm run dev:web
```

### 5. Open Your App
Visit: http://localhost:8080

## New AI Features

### 🔍 Semantic Search
- Search with natural language: "quick vegetarian tapas"
- Filter by time, allergens, diet preferences
- Get relevance scores for each result

### 🍳 Enhanced Cooking Mode
- Step-by-step cooking guidance
- Built-in timers for each step
- Voice narration (optional)
- Progress tracking
- Ingredient checklists

### ⚠️ Smart Allergen Detection
- Automatic detection of allergens in ingredients
- Filter out recipes with specific allergens
- Spanish and English allergen recognition

### 🤖 AI Recipe Suggestions
- Get personalized recommendations
- Based on preferences and dietary restrictions
- Powered by GPT-3.5-turbo

## API Endpoints

- `POST /search` - AI-powered semantic search
- `GET /recipes/:id` - Get specific recipe
- `GET /recipes` - Browse all recipes
- `POST /suggest` - Get AI recipe suggestions
- `GET /health` - Health check

## File Structure

```
├── data/
│   ├── recipes.json          # Recipe database
│   └── recipe_vectors.json   # AI embeddings (generated)
├── scripts/
│   ├── buildEmbeddings.ts    # Generate AI embeddings
│   └── tagAllergens.ts       # Tag allergens in recipes
├── src/
│   ├── lib/
│   │   ├── cosine.ts         # Similarity calculations
│   │   └── allergens.ts      # Allergen detection
│   └── server.ts             # AI API server
├── web/
│   └── src/
│       ├── components/
│       │   └── CookingMode.tsx
│       └── pages/
│           └── Search.tsx
└── index.html                # Main app (updated)
```

## Next Steps

1. **Add more recipes**: Edit `data/recipes.json` to add more paella and tapas recipes
2. **Customize allergens**: Modify `src/lib/allergens.ts` for Spanish-specific allergens
3. **Enhance UI**: Update the frontend components for better UX
4. **Add features**: Implement meal planning, shopping lists, etc.

## Troubleshooting

- **API Key Issues**: Make sure your OpenAI API key is set in `.env`
- **Port Conflicts**: Change ports in `package.json` if needed
- **Missing Embeddings**: Run `npm run dev:embed` to generate them

## Cost Considerations

- OpenAI embeddings: ~$0.0001 per 1K tokens
- For 100 recipes: ~$0.01 one-time cost
- Search queries: ~$0.0001 per search

Enjoy your AI-powered Spanish cuisine app! 🇪🇸🍽️
