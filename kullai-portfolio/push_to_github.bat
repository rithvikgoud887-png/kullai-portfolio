@echo off
title Push Kullai Portfolio with Charts to GitHub
echo ========================================================
echo       Kullai Portfolio (with ML Charts) - Push to GitHub
echo ========================================================
echo.

set DEFAULT_URL=https://github.com/rithvikgoud887-png/kullai-portfolio.git
set /p REPO_URL="Enter GitHub repository URL [%DEFAULT_URL%]: "
if "%REPO_URL%"=="" set REPO_URL=%DEFAULT_URL%

set GIT_BIN=git

echo.
echo Step 1: Initializing git and committing files...
%GIT_BIN% init
%GIT_BIN% add .
%GIT_BIN% commit -m "Initial commit: AI & Machine Learning engineer portfolio with interactive charts"

echo.
echo Step 2: Configuring remote origin to %REPO_URL%...
%GIT_BIN% remote remove origin 2>nul
%GIT_BIN% remote add origin %REPO_URL%

echo.
echo Step 3: Setting branch to main...
%GIT_BIN% branch -M main

echo.
echo Step 4: Pushing to GitHub...
echo (If prompted, please authenticate in your browser or paste your Personal Access Token)
echo.
%GIT_BIN% push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESS! Your portfolio with charts is now on GitHub!
    echo ========================================================
) else (
    echo.
    echo If push failed, make sure you created the repo on github.com first!
    echo Or create it at https://github.com/new
)
echo.
pause
