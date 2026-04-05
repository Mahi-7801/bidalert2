@echo off
echo ========================================
echo BidAlert - Database Export Script
echo ========================================
echo.

REM Configuration
set DB_USER=root
set DB_NAME=bidalert_v5
set OUTPUT_FILE=bidalert_database_export.sql

echo Exporting database: %DB_NAME%
echo Output file: %OUTPUT_FILE%
echo.

REM Check if mysqldump is available
where mysqldump >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: mysqldump not found!
    echo Please ensure MySQL is installed and added to PATH
    echo.
    echo Common MySQL bin paths:
    echo   C:\xampp\mysql\bin
    echo   C:\Program Files\MySQL\MySQL Server 8.0\bin
    echo.
    pause
    exit /b 1
)

echo Enter MySQL password for user '%DB_USER%':
mysqldump -u %DB_USER% -p %DB_NAME% > %OUTPUT_FILE%

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo DATABASE EXPORTED SUCCESSFULLY!
    echo ========================================
    echo.
    echo File: %OUTPUT_FILE%
    echo.
    echo Next steps:
    echo 1. Upload this SQL file to your server
    echo 2. Import it using phpMyAdmin or MySQL command line
    echo 3. Update backend/.env with production database credentials
    echo.
) else (
    echo.
    echo ERROR: Database export failed!
    echo Please check your MySQL credentials and try again.
    echo.
)

pause
