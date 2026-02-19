#!/bin/bash
# Deploy script: force pushes to GitHub and Vercel
# Usage: ./deploy.sh "commit message"

MSG="${1:-chore: update}"

echo "🔧 Setting git identity..."
git config user.email "jackmichael628@gmail.com"
git config user.name "MichaelEdou"

echo "📦 Staging all changes..."
git add .

echo "💾 Committing: $MSG"
git commit -m "$MSG" || git commit --allow-empty -m "$MSG"

echo "🚀 Force pushing to GitHub (main)..."
git push origin main --force

echo "🌐 Deploying to Vercel (production)..."
vercel --prod --yes

echo "✅ Done! Live at https://maxeria-three.vercel.app"
