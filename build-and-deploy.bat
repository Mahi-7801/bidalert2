@echo off
echo ========================================
echo BidAlert - Build and Deployment Script
echo ========================================
echo.

echo [1/5] Installing Backend Dependencies...
cd backend
call npm install --production
if %errorlevel% neq 0 (
    echo ERROR: Backend dependencies installation failed!
    pause
    exit /b 1
)
cd ..
echo ✓ Backend dependencies installed
echo.

echo [2/5] Installing Frontend Dependencies...
cd bid2alert-nextjs
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend dependencies installation failed!
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
echo.

echo [3/5] Building Frontend (Next.js)...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Frontend build failed!
    pause
    exit /b 1
)
echo ✓ Frontend built successfully
cd ..
echo.

echo [4/5] Creating deployment package...
if not exist "deployment" mkdir deployment
if not exist "deployment\backend" mkdir deployment\backend
if not exist "deployment\frontend" mkdir deployment\frontend

echo Copying backend files...
xcopy /E /I /Y backend deployment\backend /EXCLUDE:deployment_exclude.txt
echo Copying frontend files...
xcopy /E /I /Y bid2alert-nextjs\.next deployment\frontend\.next
xcopy /E /I /Y bid2alert-nextjs\public deployment\frontend\public
copy /Y bid2alert-nextjs\package.json deployment\frontend\
copy /Y bid2alert-nextjs\package-lock.json deployment\frontend\
copy /Y bid2alert-nextjs\.env.local deployment\frontend\
copy /Y ecosystem.config.js deployment\

echo ✓ Deployment package created
echo.

echo [5/5] Creating deployment archive...
powershell Compress-Archive -Path deployment\* -DestinationPath bidalert-deployment.zip -Force
echo ✓ Deployment archive created: bidalert-deployment.zip
echo.

echo ========================================
echo BUILD COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo Next steps:
echo 1. Upload 'bidalert-deployment.zip' to your server
echo 2. Extract the files on your server
echo 3. Run 'npm install' in both backend and frontend folders
echo 4. Configure your .env files with production credentials
echo 5. Start the application using PM2 or Node.js
echo.
echo See DEPLOYMENT_GUIDE.md for detailed instructions
echo.
pause
