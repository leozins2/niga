@echo off
title XGaming - Analise de Probabilidades
color 5

echo ===============================
echo   Starting XGaming Platform
echo ===============================
echo.

echo [1/2] Installing dependencies
call npm install
if errorlevel 1 (
  echo.
  echo Failed to install dependencies
  pause
  exit /b
)

echo.
echo Dependencies installed successfully
echo.

echo [2/3] Building project
call npm run build
if errorlevel 1 (
  echo.
  echo Build failed. Fix errors and try again
  pause
  exit /b
)

echo.
echo Build completed successfully
echo.

echo [3/3] Starting server
call npm start
if errorlevel 1 (
  echo.
  echo Server failed to start
  pause
  exit /b
)

pause