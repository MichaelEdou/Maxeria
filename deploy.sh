#!/bin/bash
# Deploy script: force pushes to GitHub and Vercel
# Usage: ./deploy.sh "commit message"

MSG="${1:-chore: update}"

echo "📦 Staging all changes..."
git add .

echo "💾 Committing: $MSG"
git commit -m "$MSG" || echo "Nothing new to commit"

echo "🚀 Force pushing to GitHub (main)..."
git push origin main --force

echo "🌐 Deploying to Vercel (production)..."
vercel --prod --yes

echo "✅ Done!"
