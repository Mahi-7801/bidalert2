@echo off
echo ========================================
echo BidAlert Project - Installation Script
echo ========================================
echo.

echo [1/4] Installing Frontend Dependencies...
cd bid2alert-nextjs
call npm install
if errorlevel 1 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
echo.

echo [2/4] Installing Backend Dependencies...
cd ..\backend
call npm install
if errorlevel 1 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
echo.

echo [3/4] Creating Backend .env file...
if not exist .env (
    copy .env.example .env
    echo ✓ .env file created
) else (
    echo ✓ .env file already exists
)
echo.

echo [4/4] Installation Complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo To run the FRONTEND:
echo   cd bid2alert-nextjs
echo   npm run dev
echo   Open: http://localhost:3000
echo.
echo To run the BACKEND:
echo   cd backend
echo   npm run dev
echo   API: http://localhost:5000
echo.
echo ========================================
echo.
pause
