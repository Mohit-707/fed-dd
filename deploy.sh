#!/bin/bash

# Donation Platform Deployment Script
set -e

echo "🚀 Starting Donation Platform Deployment..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Create production database if it doesn't exist
echo "📦 Setting up production database..."
cd server
if [ ! -f "production.db" ]; then
    echo "Creating new production database..."
    cp dev.db production.db 2>/dev/null || npx prisma migrate deploy --name init-production
else
    echo "Production database already exists, running migrations..."
    npx prisma migrate deploy
fi

# Generate Prisma client for production
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build the application (if not already built)
echo "🏗️ Building application..."
cd ..
npm run build

# Stop any existing process
echo "🛑 Stopping any existing processes..."
pkill -f "node dist/index.js" || true

# Start the production server
echo "🌟 Starting production server..."
cd server
NODE_ENV=production node dist/index.js &
SERVER_PID=$!

echo "✅ Deployment complete!"
echo "📊 Server running with PID: $SERVER_PID"
echo "🌐 Application available at: http://localhost:3000"
echo ""
echo "To stop the server, run: kill $SERVER_PID"
echo "To view logs, run: tail -f /var/log/donation-platform.log (if configured)"