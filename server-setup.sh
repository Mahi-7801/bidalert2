#!/bin/bash

echo "========================================="
echo "BidAlert - Server Setup Script"
echo "========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo -e "${RED}ERROR: Node.js is not installed!${NC}"
    echo "Please install Node.js v18 or higher first."
    exit 1
fi

echo -e "${GREEN}✓ Node.js version: $(node -v)${NC}"
echo ""

# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null
then
    echo "Installing PM2..."
    npm install -g pm2
    echo -e "${GREEN}✓ PM2 installed${NC}"
else
    echo -e "${GREEN}✓ PM2 already installed${NC}"
fi
echo ""

# Install backend dependencies
echo "[1/4] Installing backend dependencies..."
cd backend
npm install --production
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Backend dependencies installation failed!${NC}"
    exit 1
fi
cd ..
echo -e "${GREEN}✓ Backend dependencies installed${NC}"
echo ""

# Install frontend dependencies
echo "[2/4] Installing frontend dependencies..."
cd frontend
npm install --production
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Frontend dependencies installation failed!${NC}"
    exit 1
fi
cd ..
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""

# Check database connection
echo "[3/4] Checking database configuration..."
if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓ Backend .env file found${NC}"
    echo -e "${YELLOW}⚠ Please verify database credentials in backend/.env${NC}"
else
    echo -e "${RED}ERROR: backend/.env file not found!${NC}"
    echo "Please create backend/.env with your database credentials"
    exit 1
fi
echo ""

# Start applications with PM2
echo "[4/4] Starting applications..."
pm2 start ecosystem.config.js

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Applications started successfully${NC}"
    echo ""
    echo "========================================="
    echo "DEPLOYMENT SUCCESSFUL!"
    echo "========================================="
    echo ""
    echo "Your applications are now running:"
    echo "  • Backend:  http://localhost:5000"
    echo "  • Frontend: http://localhost:3000"
    echo ""
    echo "Useful PM2 commands:"
    echo "  pm2 status       - Check application status"
    echo "  pm2 logs         - View logs"
    echo "  pm2 restart all  - Restart applications"
    echo "  pm2 stop all     - Stop applications"
    echo "  pm2 monit        - Monitor applications"
    echo ""
    
    # Save PM2 configuration
    pm2 save
    
    # Setup PM2 startup script
    echo "Setting up PM2 to start on boot..."
    pm2 startup
    
else
    echo -e "${RED}ERROR: Failed to start applications${NC}"
    exit 1
fi
