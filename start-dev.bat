@echo off
title Site Profissionalidade - Modo Desenvolvimento
color 0A

echo ========================================
echo   MODO DESENVOLVIMENTO - NODEMON
echo ========================================
echo.

:: Verificar se o Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale o Node.js em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js encontrado: 
node --version
echo.

:: Verificar se as dependências estão instaladas
if not exist "node_modules\" (
    echo [AVISO] Dependencias nao encontradas. Instalando...
    echo.
    call npm install
    echo.
    if %ERRORLEVEL% NEQ 0 (
        echo [ERRO] Falha ao instalar dependencias!
        pause
        exit /b 1
    )
    echo [OK] Dependencias instaladas com sucesso!
    echo.
)

:: Iniciar o servidor em modo desenvolvimento
echo ========================================
echo   INICIANDO SERVIDOR EM MODO DEV...
echo ========================================
echo.
echo [INFO] O site estara disponivel em:
echo        http://localhost:3000
echo.
echo [INFO] O servidor reiniciara automaticamente
echo        quando voce editar os arquivos
echo.
echo [INFO] Pressione Ctrl+C para parar o servidor
echo.
echo ========================================
echo.

:: Abrir navegador automaticamente após 2 segundos
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"

:: Iniciar o servidor com nodemon
call npm run dev

:: Se o servidor parar, mostrar mensagem
echo.
echo ========================================
echo   SERVIDOR ENCERRADO
echo ========================================
pause
