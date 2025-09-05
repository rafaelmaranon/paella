#!/bin/bash

echo "🔑 Setting up your OpenAI API key..."
echo ""
echo "Please enter your OpenAI API key (it will be hidden for security):"
read -s API_KEY

if [ -z "$API_KEY" ]; then
    echo "❌ No API key entered. Please try again."
    exit 1
fi

echo "OPENAI_API_KEY=$API_KEY" > .env
echo "PORT=3001" >> .env

echo ""
echo "✅ API key saved to .env file!"
echo "🚀 Ready to build AI embeddings!"
