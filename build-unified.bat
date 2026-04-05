@echo off
echo ========================================
echo BidAlert - Unified Combined Build
echo ========================================
echo.

REM Set directories
set ROOT_DIR=%~dp0
set FRONTEND_DIR=%ROOT_DIR%bid2alert-nextjs
set BACKEND_DIR=%ROOT_DIR%backend
set DIST_DIR=%ROOT_DIR%dist_unified

echo [1/5] Cleaning previous builds...
if exist "%DIST_DIR%" rmdir /s /q "%DIST_DIR%"
if exist "%FRONTEND_DIR%\out" rmdir /s /q "%FRONTEND_DIR%\out"
if exist "%FRONTEND_DIR%\.next" rmdir /s /q "%FRONTEND_DIR%\.next"
if exist "%BACKEND_DIR%\public" rmdir /s /q "%BACKEND_DIR%\public"
mkdir "%DIST_DIR%"
echo.

echo [2/5] Building Frontend (Next.js Static Export)...
cd "%FRONTEND_DIR%"
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Frontend build failed!
    pause
    exit /b 1
)
echo.

echo [3/5] Integrating Frontend into Backend...
if not exist "%BACKEND_DIR%\public" mkdir "%BACKEND_DIR%\public"
xcopy /E /I /Y "%FRONTEND_DIR%\out\*" "%BACKEND_DIR%\public\"
echo.

echo [4/5] Preparing Unified Distribution...
echo Copying backend files (excluding node_modules and cache)...
REM Create an exclude file for xcopy
echo .git\ > exclude.txt
echo node_modules\ >> exclude.txt
echo .next\ >> exclude.txt
echo .wwebjs_auth\ >> exclude.txt
echo .wwebjs_cache\ >> exclude.txt
echo dist_unified\ >> exclude.txt
echo bidalert_unified.zip >> exclude.txt

xcopy /E /I /Y /EXCLUDE:exclude.txt "%BACKEND_DIR%\*" "%DIST_DIR%\"
del exclude.txt
echo.

echo [5/5] Creating Final Package...
cd "%ROOT_DIR%"
if exist "bidalert_unified.zip" del "bidalert_unified.zip"
echo Zipping files (this may take a minute)...
powershell -Command "Compress-Archive -Path '%DIST_DIR%\*' -DestinationPath 'bidalert_unified.zip' -Force"
echo.

echo ========================================
echo BUILD COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo Your combined build is ready:
echo 📦 bidalert_unified.zip
echo.
echo To deploy:
echo 1. Upload bidalert_unified.zip to your server.
echo 2. Extract files.
echo 3. Run 'npm install --production'.
echo 4. Start with 'node server.js' or 'pm2 start server.js'.
echo.
echo NOTE: One process serves both Frontend and Backend on the same port!
echo.
pause
