@echo off
echo ========================================
echo BidAlert - Build for Server Deployment
echo ========================================
echo.

REM Clean previous builds
echo Cleaning previous builds...
if exist "dist" rmdir /s /q dist
if exist "bidalert-frontend.zip" del /f bidalert-frontend.zip
if exist "bidalert-backend.zip" del /f bidalert-backend.zip
echo.

REM ============================================
REM STEP 1: Build Frontend (Next.js)
REM ============================================
echo [1/4] Building Frontend (Next.js)...
echo ----------------------------------------
cd bid2alert-nextjs

echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend dependencies installation failed!
    pause
    exit /b 1
)

echo Building Next.js application...
set SKIP_TYPE_CHECK=true
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Frontend build failed!
    pause
    exit /b 1
)

cd ..
echo ✓ Frontend build completed successfully
echo.

REM ============================================
REM STEP 2: Prepare Backend
REM ============================================
echo [2/4] Preparing Backend...
echo ----------------------------------------
cd backend

echo Installing production dependencies...
call npm install --production
if %errorlevel% neq 0 (
    echo ERROR: Backend dependencies installation failed!
    pause
    exit /b 1
)

cd ..
echo ✓ Backend prepared successfully
echo.

REM ============================================
REM STEP 3: Create Distribution Folders
REM ============================================
echo [3/4] Creating distribution packages...
echo ----------------------------------------

REM Create dist directories
mkdir dist
mkdir dist\frontend
mkdir dist\backend

REM Copy Frontend files
echo Copying frontend files...
xcopy /E /I /Y bid2alert-nextjs\.next dist\frontend\.next
xcopy /E /I /Y bid2alert-nextjs\public dist\frontend\public
copy /Y bid2alert-nextjs\package.json dist\frontend\
copy /Y bid2alert-nextjs\package-lock.json dist\frontend\
if exist "bid2alert-nextjs\.env.local" copy /Y bid2alert-nextjs\.env.local dist\frontend\

REM Create a start script for frontend
echo { > dist\frontend\package.json
echo   "name": "bidalert-frontend", >> dist\frontend\package.json
echo   "version": "1.0.0", >> dist\frontend\package.json
echo   "scripts": { >> dist\frontend\package.json
echo     "start": "next start" >> dist\frontend\package.json
echo   }, >> dist\frontend\package.json
echo   "dependencies": { >> dist\frontend\package.json
echo     "next": "^16.1.1", >> dist\frontend\package.json
echo     "react": "^19.2.3", >> dist\frontend\package.json
echo     "react-dom": "^19.2.3" >> dist\frontend\package.json
echo   } >> dist\frontend\package.json
echo } >> dist\frontend\package.json

echo ✓ Frontend files copied to dist\frontend
echo.

REM Copy Backend files
echo Copying backend files...
xcopy /E /I /Y backend\*.js dist\backend\
xcopy /E /I /Y backend\routes dist\backend\routes
xcopy /E /I /Y backend\middleware dist\backend\middleware
if exist "backend\utils" xcopy /E /I /Y backend\utils dist\backend\utils
if exist "backend\models" xcopy /E /I /Y backend\models dist\backend\models
copy /Y backend\package.json dist\backend\
copy /Y backend\package-lock.json dist\backend\
copy /Y backend\.env dist\backend\.env.example

REM Create .env template for backend
echo # Update these values for your server > dist\backend\.env
echo DB_HOST=localhost >> dist\backend\.env
echo DB_USER=bidalert_bidalert2 >> dist\backend\.env
echo DB_PASSWORD=Bidalert@123vcs >> dist\backend\.env
echo DB_NAME=bidalert_bidalert2 >> dist\backend\.env
echo DB_PORT=3306 >> dist\backend\.env
echo. >> dist\backend\.env
echo PORT=5000 >> dist\backend\.env
echo NODE_ENV=production >> dist\backend\.env
echo. >> dist\backend\.env
echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2024 >> dist\backend\.env
echo. >> dist\backend\.env
echo FRONTEND_URL=http://localhost:3000 >> dist\backend\.env

echo ✓ Backend files copied to dist\backend
echo.

REM ============================================
REM STEP 4: Create ZIP Files
REM ============================================
echo [4/4] Creating ZIP files...
echo ----------------------------------------

echo Creating frontend ZIP...
powershell Compress-Archive -Path dist\frontend\* -DestinationPath bidalert-frontend.zip -Force
if %errorlevel% equ 0 (
    echo ✓ Frontend ZIP created: bidalert-frontend.zip
) else (
    echo ERROR: Failed to create frontend ZIP
)
echo.

echo Creating backend ZIP...
powershell Compress-Archive -Path dist\backend\* -DestinationPath bidalert-backend.zip -Force
if %errorlevel% equ 0 (
    echo ✓ Backend ZIP created: bidalert-backend.zip
) else (
    echo ERROR: Failed to create backend ZIP
)
echo.

REM ============================================
REM SUMMARY
REM ============================================
echo ========================================
echo BUILD COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo Created files:
echo   📦 bidalert-frontend.zip  (Upload to server frontend folder)
echo   📦 bidalert-backend.zip   (Upload to server backend folder)
echo.
echo File sizes:
for %%A in (bidalert-frontend.zip) do echo   Frontend: %%~zA bytes
for %%A in (bidalert-backend.zip) do echo   Backend:  %%~zA bytes
echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo.
echo 1. Upload bidalert-frontend.zip to your server
echo    Example: /home/bidalert/frontend/
echo.
echo 2. Upload bidalert-backend.zip to your server
echo    Example: /home/bidalert/backend/
echo.
echo 3. On server, extract the files:
echo    unzip bidalert-frontend.zip
echo    unzip bidalert-backend.zip
echo.
echo 4. Install dependencies on server:
echo    cd backend ^&^& npm install --production
echo    cd frontend ^&^& npm install --production
echo.
echo 5. Update backend/.env with correct DB_HOST
echo.
echo 6. Start the applications:
echo    pm2 start backend/server.js --name bidalert-backend
echo    pm2 start frontend/package.json --name bidalert-frontend
echo.
echo See DEPLOYMENT_GUIDE.md for detailed instructions
echo.
pause
