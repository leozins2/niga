import nodemailer from 'nodemailer';
import fs from 'fs';

// Carregar configurações do .env
function loadEnv() {
    if (fs.existsSync('.env')) {
        const envContent = fs.readFileSync('.env', 'utf8');
        const lines = envContent.split('\n');
        
        lines.forEach(line => {
            if (line.trim() && !line.startsWith('#')) {
                const [key, value] = line.split('=');
                if (key && value) {
                    process.env[key.trim()] = value.trim();
                }
            }
        });
    }
}

loadEnv();

export class EmailService {
    static createTransporter() {
        // Verificar se as configurações estão definidas
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('⚠️  Configurações de email não encontradas. Usando modo simulação.');
            return null;
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    static async sendConfirmationEmail(email, name, token) {
        const transporter = this.createTransporter();
        const serverUrl = process.env.SERVER_URL || 'http://localhost:3000';
        const confirmUrl = `${serverUrl}/confirm?token=${token}`;

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; background: #0a0f1c; color: #ffffff; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #1a2332; border-radius: 15px; padding: 30px; }
                .logo { text-align: center; margin-bottom: 30px; }
                .logo-icon { background: #34d399; color: #0a0f1c; padding: 15px; border-radius: 15px; font-size: 24px; display: inline-block; }
                .title { font-size: 24px; font-weight: bold; margin: 20px 0; text-align: center; }
                .content { line-height: 1.6; margin: 20px 0; }
                .button { background: linear-gradient(135deg, #34d399 0%, #10b981 100%); color: #0a0f1c; padding: 15px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block; margin: 20px 0; }
                .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #34d399; font-size: 12px; color: #888; text-align: center; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">
                    <span class="logo-icon">📊</span>
                    <div class="title">XGaming</div>
                </div>
                
                <h2>Olá ${name}!</h2>
                
                <div class="content">
                    <p>Bem-vindo ao <strong>XGaming</strong>! 🎉</p>
                    
                    <p>Para ativar sua conta e começar a operar com <strong>R$ 10.000</strong> em saldo demo, clique no botão abaixo:</p>
                    
                    <div style="text-align: center;">
                        <a href="${confirmUrl}" class="button">✅ Confirmar Email</a>
                    </div>
                    
                    <p>Ou copie e cole este link no seu navegador:</p>
                    <p style="background: #2d3748; padding: 10px; border-radius: 5px; word-break: break-all;">
                        ${confirmUrl}
                    </p>
                    
                    <p><strong>⏰ Este link expira em 24 horas.</strong></p>
                    
                    <p>Se você não criou esta conta, pode ignorar este email com segurança.</p>
                </div>
                
                <div class="footer">
                    <p>Atenciosamente,<br>
                    <strong>Equipe XGaming</strong></p>
                    
                    <p>Simulador educacional - Nenhum dinheiro real envolvido</p>
                </div>
            </div>
        </body>
        </html>
        `;

        const textContent = `
Olá ${name}!

Bem-vindo ao XGaming!

Para ativar sua conta e começar a operar com R$ 10.000 em saldo demo, acesse o link abaixo:

${confirmUrl}

Este link expira em 24 horas.

Se você não criou esta conta, ignore este email.

Atenciosamente,
Equipe XGaming

Simulador educacional - Nenhum dinheiro real envolvido
        `;

        if (!transporter) {
            // Modo simulação - mostrar no console
            console.log('='.repeat(60));
            console.log('📧 EMAIL DE CONFIRMAÇÃO (SIMULAÇÃO)');
            console.log('='.repeat(60));
            console.log(`Para: ${email}`);
            console.log(`Nome: ${name}`);
            console.log(`🔗 Link: ${confirmUrl}`);
            console.log('='.repeat(60));
            console.log('');
            console.log('💡 Para enviar emails reais, configure o arquivo .env com suas credenciais do Gmail.');
            console.log('');
            return true;
        }

        try {
            const mailOptions = {
                from: process.env.EMAIL_FROM || 'XGaming <noreply@xgaming.com>',
                to: email,
                subject: '✅ Confirme seu email - XGaming',
                text: textContent,
                html: htmlContent
            };

            const info = await transporter.sendMail(mailOptions);
            
            console.log('✅ Email de confirmação enviado com sucesso!');
            console.log(`📧 Para: ${email}`);
            console.log(`🆔 Message ID: ${info.messageId}`);
            
            return true;
        } catch (error) {
            console.error('❌ Erro ao enviar email:', error.message);
            
            // Fallback para simulação se der erro
            console.log('='.repeat(60));
            console.log('📧 EMAIL DE CONFIRMAÇÃO (FALLBACK)');
            console.log('='.repeat(60));
            console.log(`Para: ${email}`);
            console.log(`🔗 Link: ${confirmUrl}`);
            console.log('='.repeat(60));
            
            return true;
        }
    }

    static async sendWelcomeEmail(email, name) {
        const transporter = this.createTransporter();

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; background: #0a0f1c; color: #ffffff; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #1a2332; border-radius: 15px; padding: 30px; }
                .logo { text-align: center; margin-bottom: 30px; }
                .logo-icon { background: #34d399; color: #0a0f1c; padding: 15px; border-radius: 15px; font-size: 24px; display: inline-block; }
                .title { font-size: 24px; font-weight: bold; margin: 20px 0; text-align: center; }
                .content { line-height: 1.6; margin: 20px 0; }
                .highlight { background: #34d399; color: #0a0f1c; padding: 15px; border-radius: 10px; text-align: center; font-weight: bold; margin: 20px 0; }
                .button { background: linear-gradient(135deg, #34d399 0%, #10b981 100%); color: #0a0f1c; padding: 15px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block; margin: 20px 0; }
                .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #34d399; font-size: 12px; color: #888; text-align: center; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">
                    <span class="logo-icon">🎉</span>
                    <div class="title">Conta Ativada!</div>
                </div>
                
                <h2>Parabéns ${name}!</h2>
                
                <div class="content">
                    <p>Sua conta <strong>XGaming</strong> foi ativada com sucesso! 🚀</p>
                    
                    <div class="highlight">
                        🎁 Você recebeu R$ 10.000 em saldo demo para começar a operar!
                    </div>
                    
                    <p>Agora você pode:</p>
                    <ul>
                        <li>✅ Fazer login na plataforma</li>
                        <li>📊 Analisar probabilidades de eventos</li>
                        <li>🎯 Fazer suas previsões</li>
                        <li>💰 Operar com saldo demo</li>
                    </ul>
                    
                    <div style="text-align: center;">
                        <a href="${process.env.SERVER_URL || 'http://localhost:3000'}/login" class="button">🚀 Fazer Login</a>
                    </div>
                </div>
                
                <div class="footer">
                    <p>Bons investimentos!<br>
                    <strong>Equipe XGaming</strong></p>
                    
                    <p>Simulador educacional - Nenhum dinheiro real envolvido</p>
                </div>
            </div>
        </body>
        </html>
        `;

        if (!transporter) {
            console.log('🎉 Email de boas-vindas (simulação) para:', email);
            return true;
        }

        try {
            const mailOptions = {
                from: process.env.EMAIL_FROM || 'XGaming <noreply@xgaming.com>',
                to: email,
                subject: '🎉 Bem-vindo ao XGaming!',
                html: htmlContent
            };

            await transporter.sendMail(mailOptions);
            console.log('✅ Email de boas-vindas enviado para:', email);
            return true;
        } catch (error) {
            console.error('❌ Erro ao enviar email de boas-vindas:', error.message);
            return true;
        }
    }
}