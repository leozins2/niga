@echo off
title Instalacao - Site Profissionalidade
color 0B

echo ========================================
echo   INSTALACAO DE DEPENDENCIAS
echo ========================================
echo.

:: Verificar se o Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao encontrado!
    echo.
    echo Por favor, instale o Node.js primeiro:
    echo https://nodejs.org/
    echo.
    echo Recomendamos a versao LTS (Long Term Support)
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js encontrado!
echo.
node --version
echo.

echo [OK] NPM encontrado!
npm --version
echo.

echo ========================================
echo   INSTALANDO DEPENDENCIAS...
echo ========================================
echo.

:: Instalar dependências
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] Falha ao instalar dependencias!
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   INSTALACAO CONCLUIDA COM SUCESSO!
echo ========================================
echo.
echo Voce pode agora:
echo.
echo 1. Executar "start.bat" para iniciar o servidor
echo 2. Executar "start-dev.bat" para modo desenvolvimento
echo.
echo ========================================
echo.
pause
