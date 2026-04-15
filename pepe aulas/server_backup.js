import http from 'http';
import fs from 'fs';
import path from 'path';
import { ProbabilityAnalyzer } from './src/analyzer.js';
import { exampleEvents } from './src/examples.js';
import { Database } from './src/database.js';
import { EmailService } from './src/emailService.js';

const PORT = 3000;
const analyzer = new ProbabilityAnalyzer();

// Função para gerar HTML da página de reenvio de confirmação
function generateResendHTML() {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XGaming - Reenviar Confirmação</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0a0f1c 0%, #1a2332 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .resend-container {
            background: rgba(26, 35, 50, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(52, 211, 153, 0.2);
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .logo-section {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .logo {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 20px;
        }
        
        .logo i {
            background: #34d399;
            color: #0a0f1c;
            padding: 12px;
            border-radius: 15px;
            font-size: 20px;
        }
        
        .resend-title {
            font-size: 24px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 8px;
        }
        
        .resend-subtitle {
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
            margin-bottom: 20px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 8px;
            color: #ffffff;
            font-size: 14px;
            font-weight: 500;
        }
        
        .form-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(52, 211, 153, 0.3);
            border-radius: 12px;
            padding: 14px 16px;
            color: #ffffff;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .form-input:focus {
            outline: none;
            border-color: #34d399;
            box-shadow: 0 0 20px rgba(52, 211, 153, 0.2);
        }
        
        .form-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }
        
        .resend-button {
            width: 100%;
            background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
            color: #0a0f1c;
            border: none;
            padding: 16px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(52, 211, 153, 0.3);
            margin-bottom: 20px;
        }
        
        .resend-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(52, 211, 153, 0.4);
        }
        
        .resend-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .back-links {
            text-align: center;
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        
        .back-link {
            color: #34d399;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.3s ease;
        }
        
        .back-link:hover {
            color: #10b981;
        }
        
        .success-message {
            background: rgba(52, 211, 153, 0.2);
            border: 1px solid #34d399;
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
            color: #34d399;
            display: none;
        }
        
        .error-message {
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid #ef4444;
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 20px;
            text-align: center;
            color: #ef4444;
            display: none;
        }
    </style>
</head>
<body>
    <div class="resend-container">
        <div class="logo-section">
            <div class="logo">
                <i class="fas fa-chart-line"></i>
                XGaming
            </div>
            <h1 class="resend-title">Reenviar Confirmação</h1>
            <p class="resend-subtitle">Digite seu email para receber um novo link de confirmação</p>
        </div>
        
        <div id="successMessage" class="success-message">
            <i class="fas fa-check-circle"></i>
            Email de confirmação reenviado com sucesso!
        </div>
        
        <div id="errorMessage" class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <span id="errorText">Erro ao reenviar email.</span>
        </div>
        
        <form id="resendForm">
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="email" placeholder="seu@email.com" required>
            </div>
            
            <button type="submit" class="resend-button" id="resendBtn">
                <i class="fas fa-paper-plane"></i>
                Reenviar Email
            </button>
        </form>
        
        <div class="back-links">
            <a href="/login" class="back-link">
                <i class="fas fa-sign-in-alt"></i>
                Fazer Login
            </a>
            <a href="/register" class="back-link">
                <i class="fas fa-user-plus"></i>
                Criar Conta
            </a>
        </div>
    </div>

    <script>
        document.getElementById('resendForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const resendBtn = document.getElementById('resendBtn');
            const successMsg = document.getElementById('successMessage');
            const errorMsg = document.getElementById('errorMessage');
            const errorText = document.getElementById('errorText');
            
            if (!email) {
                errorText.textContent = 'Por favor, digite seu email.';
                errorMsg.style.display = 'block';
                successMsg.style.display = 'none';
                return;
            }
            
            // Desabilitar botão
            resendBtn.disabled = true;
            resendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            try {
                const response = await fetch('/api/resend-confirmation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    successMsg.style.display = 'block';
                    errorMsg.style.display = 'none';
                    document.getElementById('resendForm').style.display = 'none';
                } else {
                    errorText.textContent = result.error || 'Erro ao reenviar email.';
                    errorMsg.style.display = 'block';
                    successMsg.style.display = 'none';
                }
            } catch (error) {
                errorText.textContent = 'Erro de conexão. Tente novamente.';
                errorMsg.style.display = 'block';
                successMsg.style.display = 'none';
            } finally {
                // Reabilitar botão
                resendBtn.disabled = false;
                resendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Reenviar Email';
            }
        });
    </script>
</body>
</html>
  `;
}

// Função para gerar HTML da página de confirmação
function generateConfirmHTML(success = false, message = '') {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XGaming - Confirmação de Email</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0a0f1c 0%, #1a2332 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .confirm-container {
            background: rgba(26, 35, 50, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(52, 211, 153, 0.2);
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            text-align: center;
        }
        
        .logo {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 30px;
        }
        
        .logo i {
            background: #34d399;
            color: #0a0f1c;
            padding: 12px;
            border-radius: 15px;
            font-size: 20px;
        }
        
        .status-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }
        
        .success {
            color: #34d399;
        }
        
        .error {
            color: #ef4444;
        }
        
        .confirm-title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .confirm-message {
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
            color: #0a0f1c;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(52, 211, 153, 0.3);
            text-decoration: none;
            display: inline-block;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(52, 211, 153, 0.4);
        }
    </style>
</head>
<body>
    <div class="confirm-container">
        <div class="logo">
            <i class="fas fa-chart-line"></i>
            XGaming
        </div>
        
        <div class="status-icon ${success ? 'success' : 'error'}">
            <i class="fas fa-${success ? 'check-circle' : 'times-circle'}"></i>
        </div>
        
        <h1 class="confirm-title">
            ${success ? 'Email Confirmado!' : 'Erro na Confirmação'}
        </h1>
        
        <p class="confirm-message">
            ${message}
        </p>
        
        <a href="${success ? '/login' : '/'}" class="btn-primary">
            ${success ? 'Fazer Login' : 'Voltar ao Início'}
        </a>
    </div>
</body>
</html>
  `;
}

// Função para gerar HTML da página de registro
function generateRegisterHTML() {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XGaming - Criar conta grátis</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0a0f1c 0%, #1a2332 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .register-container {
            background: rgba(26, 35, 50, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(52, 211, 153, 0.2);
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 420px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .logo-section {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .logo {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 20px;
        }
        
        .logo i {
            background: #34d399;
            color: #0a0f1c;
            padding: 12px;
            border-radius: 15px;
            font-size: 20px;
        }
        
        .register-title {
            font-size: 24px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 8px;
        }
        
        .register-subtitle {
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 8px;
            color: #ffffff;
            font-size: 14px;
            font-weight: 500;
        }
        
        .form-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(52, 211, 153, 0.3);
            border-radius: 12px;
            padding: 14px 16px;
            color: #ffffff;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .form-input:focus {
            outline: none;
            border-color: #34d399;
            box-shadow: 0 0 20px rgba(52, 211, 153, 0.2);
        }
        
        .form-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }
        
        .password-container {
            position: relative;
        }
        
        .password-toggle {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .password-toggle:hover {
            color: #34d399;
        }
        
        .register-button {
            width: 100%;
            background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
            color: #0a0f1c;
            border: none;
            padding: 16px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(52, 211, 153, 0.3);
            margin-bottom: 20px;
        }
        
        .register-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(52, 211, 153, 0.4);
        }
        
        .login-link {
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
            margin-bottom: 30px;
        }
        
        .login-link a {
            color: #34d399;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .login-link a:hover {
            color: #10b981;
        }
        
        .benefits {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            padding: 20px 0;
            border-top: 1px solid rgba(52, 211, 153, 0.2);
        }
        
        .benefit {
            text-align: center;
            flex: 1;
        }
        
        .benefit i {
            color: #34d399;
            font-size: 16px;
            margin-bottom: 8px;
        }
        
        .benefit-title {
            font-size: 12px;
            color: #ffffff;
            font-weight: 600;
            margin-bottom: 4px;
        }
        
        .benefit-desc {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.6);
        }
        
        .disclaimer {
            text-align: center;
            color: rgba(255, 255, 255, 0.4);
            font-size: 12px;
        }
        
        .back-link {
            position: absolute;
            top: 20px;
            left: 20px;
            color: #34d399;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .back-link:hover {
            color: #10b981;
            transform: translateX(-5px);
        }
        
        @media (max-width: 480px) {
            .register-container {
                margin: 20px;
                padding: 30px 20px;
            }
            
            .back-link {
                position: relative;
                top: auto;
                left: auto;
                margin-bottom: 20px;
            }
            
            .benefits {
                flex-direction: column;
                gap: 15px;
            }
        }
    </style>
</head>
<body>
    <a href="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Voltar ao XGaming
    </a>
    
    <div class="register-container">
        <div class="logo-section">
            <div class="logo">
                <i class="fas fa-chart-line"></i>
                XGaming
            </div>
            <h1 class="register-title">Criar conta grátis</h1>
            <p class="register-subtitle">Comece com R$ 10.000 em saldo demo</p>
        </div>
        
        <form id="registerForm">
            <div class="form-group">
                <label class="form-label">Nome</label>
                <input type="text" class="form-input" id="name" placeholder="Seu nome" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="email" placeholder="seu@email.com" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Senha</label>
                <div class="password-container">
                    <input type="password" class="form-input" id="password" placeholder="Mínimo 6 caracteres" required minlength="6">
                    <i class="fas fa-eye password-toggle" onclick="togglePassword()"></i>
                </div>
            </div>
            
            <button type="submit" class="register-button">
                Criar conta
            </button>
        </form>
        
        <div class="login-link">
            Já tem uma conta? <a href="/login">Entrar</a>
        </div>
        
        <div class="benefits">
            <div class="benefit">
                <i class="fas fa-check-circle"></i>
                <div class="benefit-title">Conta demo grátis</div>
                <div class="benefit-desc">Sem custos</div>
            </div>
            <div class="benefit">
                <i class="fas fa-coins"></i>
                <div class="benefit-title">R$ 10.000 para operar</div>
                <div class="benefit-desc">Saldo inicial</div>
            </div>
            <div class="benefit">
                <i class="fas fa-shield-alt"></i>
                <div class="benefit-title">Acoes reais</div>
                <div class="benefit-desc">Dados reais</div>
            </div>
        </div>
        
        <div class="disclaimer">
            Simulador educacional - Nenhum dinheiro real envolvido
        </div>
    </div>

    <script>
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleIcon = document.querySelector('.password-toggle');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        }
        
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validação básica
            if (!name || !email || !password || password.length < 6) {
                alert('Por favor, preencha todos os campos corretamente.');
                return;
            }
            
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    alert('Conta criada com sucesso! Verifique seu email para confirmar a conta.');
                    window.location.href = '/login';
                } else {
                    alert(result.error || 'Erro ao criar conta.');
                }
            } catch (error) {
                alert('Erro ao criar conta. Tente novamente.');
            }
        });
    </script>
</body>
</html>
  `;
}

// Função para gerar HTML da página de login
function generateLoginHTML() {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XGaming - Entrar na conta</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0a0f1c 0%, #1a2332 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .login-container {
            background: rgba(26, 35, 50, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(52, 211, 153, 0.2);
            border-radius: 20px;
            padding: 40px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .logo-section {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .logo {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            font-size: 28px;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 20px;
        }
        
        .logo i {
            background: #34d399;
            color: #0a0f1c;
            padding: 12px;
            border-radius: 15px;
            font-size: 20px;
        }
        
        .login-title {
            font-size: 24px;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 8px;
        }
        
        .login-subtitle {
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 8px;
            color: #ffffff;
            font-size: 14px;
            font-weight: 500;
        }
        
        .form-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(52, 211, 153, 0.3);
            border-radius: 12px;
            padding: 14px 16px;
            color: #ffffff;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .form-input:focus {
            outline: none;
            border-color: #34d399;
            box-shadow: 0 0 20px rgba(52, 211, 153, 0.2);
        }
        
        .form-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }
        
        .password-container {
            position: relative;
        }
        
        .password-toggle {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .password-toggle:hover {
            color: #34d399;
        }
        
        .login-button {
            width: 100%;
            background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
            color: #0a0f1c;
            border: none;
            padding: 16px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(52, 211, 153, 0.3);
            margin-bottom: 20px;
        }
        
        .login-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(52, 211, 153, 0.4);
        }
        
        .signup-link {
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
        }
        
        .signup-link a {
            color: #34d399;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .signup-link a:hover {
            color: #10b981;
        }
        
        .disclaimer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(52, 211, 153, 0.2);
            color: rgba(255, 255, 255, 0.4);
            font-size: 12px;
        }
        
        .back-link {
            position: absolute;
            top: 20px;
            left: 20px;
            color: #34d399;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .back-link:hover {
            color: #10b981;
            transform: translateX(-5px);
        }
        
        @media (max-width: 480px) {
            .login-container {
                margin: 20px;
                padding: 30px 20px;
            }
            
            .back-link {
                position: relative;
                top: auto;
                left: auto;
                margin-bottom: 20px;
            }
        }
    </style>
</head>
<body>
    <a href="/" class="back-link">
        <i class="fas fa-arrow-left"></i>
        Voltar ao XGaming
    </a>
    
    <div class="login-container">
        <div class="logo-section">
            <div class="logo">
                <i class="fas fa-chart-line"></i>
                XGaming
            </div>
            <h1 class="login-title">Entrar na conta</h1>
            <p class="login-subtitle">Acesse sua conta demo e comece a operar</p>
        </div>
        
        <form id="loginForm">
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="email" placeholder="seu@email.com" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Senha</label>
                <div class="password-container">
                    <input type="password" class="form-input" id="password" placeholder="Sua senha" required>
                    <i class="fas fa-eye password-toggle" onclick="togglePassword()"></i>
                </div>
            </div>
            
            <button type="submit" class="login-button">
                Entrar
            </button>
        </form>
        
        <div class="signup-link">
            Não tem uma conta? <a href="/register">Criar conta grátis</a>
        </div>
        
        <div class="disclaimer">
            Simulador educacional - Nenhum dinheiro real envolvido
        </div>
    </div>

    <script>
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleIcon = document.querySelector('.password-toggle');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        }
        
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    alert('Login realizado com sucesso! Redirecionando...');
                    window.location.href = '/';
                } else {
                    alert(result.error || 'Erro ao fazer login.');
                }
            } catch (error) {
                alert('Erro ao fazer login. Tente novamente.');
            }
        });
    </script>
</body>
</html>
  `;
}

// Função para gerar HTML da página principal
function generateHTML() {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XGaming - Análise de Probabilidades</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0a0f1c 0%, #1a2332 100%);
            color: #ffffff;
            min-height: 100vh;
        }
        
        .header {
            background: rgba(26, 35, 50, 0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(52, 211, 153, 0.2);
            padding: 15px 0;
        }
        
        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 20px;
            font-weight: bold;
            color: #34d399;
        }
        
        .logo i {
            background: #34d399;
            color: #0a0f1c;
            padding: 8px;
            border-radius: 12px;
            font-size: 16px;
        }
        
        .search-bar {
            flex: 1;
            max-width: 400px;
            margin: 0 40px;
            position: relative;
        }
        
        .search-bar input {
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(52, 211, 153, 0.3);
            border-radius: 25px;
            padding: 12px 20px 12px 45px;
            color: #ffffff;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .search-bar input:focus {
            outline: none;
            border-color: #34d399;
            box-shadow: 0 0 20px rgba(52, 211, 153, 0.2);
        }
        
        .search-bar i {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #34d399;
        }
        
        .header-actions {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
            color: #0a0f1c;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(52, 211, 153, 0.3);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(52, 211, 153, 0.4);
        }
        
        .nav-tabs {
            background: rgba(26, 35, 50, 0.6);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(52, 211, 153, 0.1);
            padding: 0 20px;
        }
        
        .nav-tabs-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            gap: 30px;
        }
        
        .nav-tab {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 15px 0;
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
            border-bottom: 2px solid transparent;
            transition: all 0.3s ease;
        }
        
        .nav-tab.active {
            color: #34d399;
            border-bottom-color: #34d399;
        }
        
        .nav-tab:hover {
            color: #34d399;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px 20px;
        }
        
        .main-content {
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 30px;
            margin-top: 20px;
        }
        
        .events-grid {
            display: grid;
            gap: 20px;
        }
        
        .event-card {
            background: rgba(26, 35, 50, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(52, 211, 153, 0.2);
            border-radius: 20px;
            padding: 24px;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .event-card:hover {
            border-color: #34d399;
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(52, 211, 153, 0.2);
        }
        
        .event-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        
        .event-category {
            background: rgba(52, 211, 153, 0.2);
            color: #34d399;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 600;
        }
        
        .event-status {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: #34d399;
        }
        
        .status-live {
            color: #34d399;
        }
        
        .status-upcoming {
            color: #34d399;
        }
        
        .event-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #ffffff;
        }
        
        .event-description {
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            margin-bottom: 16px;
        }
        
        .odds-container {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }
        
        .odd-button {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(52, 211, 153, 0.3);
            border-radius: 15px;
            padding: 12px 16px;
            color: #ffffff;
            cursor: pointer;
            transition: all 0.3s ease;
            flex: 1;
            min-width: 100px;
            text-align: center;
        }
        
        .odd-button:hover {
            background: rgba(52, 211, 153, 0.2);
            border-color: #34d399;
            transform: translateY(-2px);
        }
        
        .odd-label {
            display: block;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 4px;
        }
        
        .odd-value {
            font-weight: bold;
            font-size: 16px;
            color: #34d399;
        }
        
        .sidebar {
            background: rgba(26, 35, 50, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(52, 211, 153, 0.2);
            border-radius: 20px;
            padding: 24px;
            height: fit-content;
        }
        
        .sidebar-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #34d399;
        }
        
        .chat-messages {
            max-height: 350px;
            overflow-y: auto;
            margin-bottom: 20px;
        }
        
        .chat-message {
            margin-bottom: 12px;
            padding: 12px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            font-size: 13px;
            transition: all 0.3s ease;
        }
        
        .chat-message:hover {
            background: rgba(52, 211, 153, 0.1);
        }
        
        .chat-user {
            color: #34d399;
            font-weight: bold;
        }
        
        .form-container {
            background: rgba(26, 35, 50, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(52, 211, 153, 0.2);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
        }
        
        .form-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 25px;
            color: #34d399;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 8px;
            color: #34d399;
            font-size: 14px;
            font-weight: 500;
        }
        
        .form-input, .form-select, .form-textarea {
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(52, 211, 153, 0.3);
            border-radius: 15px;
            padding: 12px 16px;
            color: #ffffff;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: #34d399;
            box-shadow: 0 0 15px rgba(52, 211, 153, 0.2);
        }
        
        .form-textarea {
            resize: vertical;
            min-height: 100px;
        }
        
        .options-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .result-container {
            background: rgba(26, 35, 50, 0.6);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(52, 211, 153, 0.2);
            border-radius: 20px;
            padding: 30px;
            margin-top: 30px;
            display: none;
        }
        
        .result-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #34d399;
        }
        
        .result-content {
            white-space: pre-line;
            font-family: 'Courier New', monospace;
            line-height: 1.8;
            color: #ffffff;
        }
        
        .color-green { color: #34d399; }
        .color-red { color: #ef4444; }
        .color-orange { color: #f59e0b; }
        .color-blue { color: #3b82f6; }
        
        @media (max-width: 768px) {
            .main-content {
                grid-template-columns: 1fr;
            }
            
            .header-content {
                flex-direction: column;
                gap: 15px;
            }
            
            .search-bar {
                margin: 0;
                max-width: none;
            }
            
            .options-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="header-content">
            <div class="logo">
                <i class="fas fa-chart-line"></i>
                XGaming
            </div>
            <div class="search-bar">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Buscar mercados...">
            </div>
            <div class="header-actions">
                <a href="/login" class="btn-primary" style="text-decoration: none;">Entrar</a>
                <a href="/register" class="btn-primary" style="text-decoration: none;">Cadastrar</a>
            </div>
        </div>
    </header>
    
    <nav class="nav-tabs">
        <div class="nav-tabs-content">
            <a href="#" class="nav-tab active" data-category="futebol">
                <i class="fas fa-futbol"></i>
                Futebol
            </a>
            <a href="#" class="nav-tab" data-category="esportes">
                <i class="fas fa-basketball-ball"></i>
                Esportes
            </a>
            <a href="#" class="nav-tab" data-category="entretenimento">
                <i class="fas fa-film"></i>
                Entretenimento
            </a>
            <a href="#" class="nav-tab" data-category="politica">
                <i class="fas fa-flag"></i>
                Política
            </a>
            <a href="#" class="nav-tab" data-category="clima">
                <i class="fas fa-cloud-sun"></i>
                Clima
            </a>
            <a href="#" class="nav-tab" data-category="celebridades">
                <i class="fas fa-users"></i>
                Celebridades
            </a>
            <a href="#" class="nav-tab" data-category="criptomoedas">
                <i class="fas fa-bitcoin"></i>
                Criptomoedas
            </a>
        </div>
    </nav>
    
    <div class="container">
        
        <div class="main-content">
            <div class="events-grid" id="eventsGrid">
                ${exampleEvents.map((event, index) => `
                    <div class="event-card" data-category="${event.categoria}" onclick="loadExample(${index})">
                        <div class="event-header">
                            <span class="event-category">${event.categoria}</span>
                            <div class="event-status status-live">
                                <i class="fas fa-circle"></i>
                                AO VIVO
                            </div>
                        </div>
                        <div class="event-title">${event.titulo}</div>
                        <div class="event-description">${event.descricao}</div>
                        <div class="odds-container">
                            ${event.opcoes.map((opcao, i) => `
                                <div class="odd-button">
                                    <span class="odd-label">${opcao}</span>
                                    <span class="odd-value">${Math.floor(Math.random() * 40 + 60)}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="sidebar">
                <div class="sidebar-title">
                    <i class="fas fa-comments"></i>
                    CHAT AO VIVO
                </div>
                <div class="chat-messages">
                    <div class="chat-message">
                        <span class="chat-user">@palpiteiro123:</span> Flamengo vai ganhar fácil hoje
                    </div>
                    <div class="chat-message">
                        <span class="chat-user">@analista:</span> Cuidado com o Palmeiras, está em boa fase
                    </div>
                    <div class="chat-message">
                        <span class="chat-user">@trader:</span> Bitcoin vai explodir essa semana 🚀
                    </div>
                    <div class="chat-message">
                        <span class="chat-user">@meteorologista:</span> Frente fria chegando em SP
                    </div>
                </div>
                <input type="text" class="form-input" placeholder="Digite sua mensagem..." style="font-size: 12px;">
            </div>
        </div>
    </div>

    <script>
        const examples = ${JSON.stringify(exampleEvents)};
        
        // Função para filtrar eventos por categoria
        function filterEventsByCategory(category) {
            const eventCards = document.querySelectorAll('.event-card');
            const navTabs = document.querySelectorAll('.nav-tab');
            
            // Remover classe active de todas as abas
            navTabs.forEach(tab => tab.classList.remove('active'));
            
            // Adicionar classe active na aba clicada
            const activeTab = document.querySelector('[data-category="' + category + '"]');
            if (activeTab) {
                activeTab.classList.add('active');
            }
            
            // Mostrar/esconder cards baseado na categoria
            eventCards.forEach(card => {
                if (card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // Adicionar event listeners nas abas
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const category = tab.dataset.category;
                filterEventsByCategory(category);
            });
        });
        
        // Mostrar apenas eventos de futebol por padrão
        document.addEventListener('DOMContentLoaded', () => {
            filterEventsByCategory('futebol');
        });
        
        function loadExample(index) {
            // Função removida - apenas para compatibilidade
        }
        
        // Simular chat ao vivo
        const chatMessages = document.querySelector('.chat-messages');
        const mensagens = [
            '@crypto_expert: Ethereum vai superar Bitcoin em 2024',
            '@futebol_fan: Que jogo será esse Fla x Pal!',
            '@weather_pro: Chuva forte prevista para amanhã',
            '@trader_pro: Mercado muito volátil hoje',
            '@palpiteiro: Alguém tem dica boa?'
        ];
        
        setInterval(() => {
            const randomMsg = mensagens[Math.floor(Math.random() * mensagens.length)];
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message';
            msgDiv.innerHTML = '<span class="chat-user">' + randomMsg.split(':')[0] + ':</span>' + randomMsg.split(':')[1];
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Manter apenas 10 mensagens
            if (chatMessages.children.length > 10) {
                chatMessages.removeChild(chatMessages.firstChild);
            }
        }, 5000);
    </script>
</body>
</html>
  `;
}

// Criar servidor HTTP
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (url.pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(generateHTML());
  }
  else if (url.pathname === '/login' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(generateLoginHTML());
  }
  else if (url.pathname === '/register' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(generateRegisterHTML());
  }
  else if (url.pathname === '/confirm' && req.method === 'GET') {
    const token = url.searchParams.get('token');
    
    if (!token) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(generateConfirmHTML(false, 'Token de confirmação não encontrado.'));
      return;
    }
    
    const tokenData = Database.validateToken(token);
    
    if (!tokenData) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(generateConfirmHTML(false, 'Token inválido ou expirado. <a href="/resend-confirmation" style="color: #34d399;">Clique aqui para reenviar o email de confirmação</a>.'));
      return;
    }
    
    const user = Database.confirmUser(tokenData.email);
    
    if (user) {
      Database.removeToken(token);
      EmailService.sendWelcomeEmail(user.email, user.name);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(generateConfirmHTML(true, 'Sua conta foi ativada com sucesso! Você já pode fazer login e começar a usar o XGaming.'));
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(generateConfirmHTML(false, 'Erro ao confirmar a conta. Tente novamente.'));
    }
  }
  else if (url.pathname === '/api/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { name, email, password } = JSON.parse(body);
        
        // Validações
        if (!name || !email || !password) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Todos os campos são obrigatórios.' }));
          return;
        }
        
        if (password.length < 6) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'A senha deve ter pelo menos 6 caracteres.' }));
          return;
        }
        
        // Verificar se email já existe
        const existingUser = Database.findUserByEmail(email);
        if (existingUser) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Este email já está cadastrado.' }));
          return;
        }
        
        // Criar usuário
        const user = Database.createUser({ name, email, password });
        
        // Criar token de confirmação
        const token = Database.createConfirmationToken(email);
        
        // Enviar email de confirmação
        await EmailService.sendConfirmationEmail(email, name, token);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Conta criada com sucesso! Verifique seu email para confirmar.' 
        }));
        
      } catch (error) {
        console.error('Erro no registro:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro interno do servidor.' }));
      }
    });
  }
  else if (url.pathname === '/resend-confirmation' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(generateResendHTML());
  }
  else if (url.pathname === '/api/resend-confirmation' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        const { email } = JSON.parse(body);
        
        if (!email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email é obrigatório.' }));
          return;
        }
        
        // Verificar se usuário existe
        const user = Database.findUserByEmail(email);
        if (!user) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email não encontrado.' }));
          return;
        }
        
        // Verificar se já está confirmado
        if (user.confirmed) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Esta conta já está confirmada. Você pode fazer login.' }));
          return;
        }
        
        // Remover tokens antigos para este email
        const tokens = Database.getTokens();
        const filteredTokens = tokens.filter(t => t.email !== email || t.type !== 'confirmation');
        Database.saveTokens(filteredTokens);
        
        // Criar novo token
        const newToken = Database.createConfirmationToken(email);
        
        // Enviar novo email
        await EmailService.sendConfirmationEmail(email, user.name, newToken);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Email de confirmação reenviado com sucesso!' 
        }));
        
      } catch (error) {
        console.error('Erro ao reenviar confirmação:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro interno do servidor.' }));
      }
    });
  }
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        
        if (!email || !password) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email e senha são obrigatórios.' }));
          return;
        }
        
        const user = Database.findUserByEmail(email);
        
        if (!user) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email não encontrado.' }));
          return;
        }
        
        if (!user.confirmed) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Conta não confirmada. Verifique seu email.' }));
          return;
        }
        
        if (!Database.validatePassword(password, user.password)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Senha incorreta.' }));
          return;
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Login realizado com sucesso!',
          user: { id: user.id, name: user.name, email: user.email }
        }));
        
      } catch (error) {
        console.error('Erro no login:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro interno do servidor.' }));
      }
    });
  } 
  else if (url.pathname === '/analyze' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const evento = JSON.parse(body);
        const result = analyzer.analyze(evento);
        
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(result);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Erro: ' + error.message);
      }
    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página não encontrada');
  }
});

server.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🎯 XGAMING - ANÁLISE DE PROBABILIDADES');
  console.log('='.repeat(50));
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📱 Acesse no navegador para usar a plataforma`);
  console.log('='.repeat(50));
});

// Tratamento de erros
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`❌ Porta ${PORT} já está em uso. Tentando porta ${PORT + 1}...`);
    server.listen(PORT + 1);
  } else {
    console.error('❌ Erro no servidor:', err.message);
  }
});