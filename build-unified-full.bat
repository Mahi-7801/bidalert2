@echo off
echo ========================================
echo BidAlert - Unified Build (WITH MODULES)
echo ========================================
echo.
echo WARNING: This script includes 'node_modules' in the zip.
echo This allows you to deploy without running 'npm install', BUT...
echo Some libraries (like AI/WhatsApp) might crash on Linux server
echo because they were installed on Windows.
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
echo Copying backend files...
REM Create an exclude file for xcopy - NO node_modules in exclude list this time
echo .git\ > exclude_full.txt
echo .next\ >> exclude_full.txt
echo .wwebjs_auth\ >> exclude_full.txt
echo .wwebjs_cache\ >> exclude_full.txt
echo dist_unified\ >> exclude_full.txt
echo bidalert_unified.zip >> exclude_full.txt
echo bidalert_full.zip >> exclude_full.txt

xcopy /E /I /Y /EXCLUDE:exclude_full.txt "%BACKEND_DIR%\*" "%DIST_DIR%\"
del exclude_full.txt
echo.

echo [5/5] Creating Final Package (This will take time)...
cd "%ROOT_DIR%"
if exist "bidalert_full.zip" del "bidalert_full.zip"
echo Zipping files including node_modules...
powershell -Command "Compress-Archive -Path '%DIST_DIR%\*' -DestinationPath 'bidalert_full.zip' -Force"
echo.

echo ========================================
echo BUILD COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo Your FULL build is ready:
echo 📦 bidalert_full.zip
echo.
echo To deploy (Drag & Drop Flow):
echo 1. Delete old 'backend', 'frontend', 'index.html' on server.
echo 2. Upload 'bidalert_full.zip' to public_html.
echo 3. Extract it.
echo 4. Restart your Node.js server (from Panel or PM2).
echo.
pause
