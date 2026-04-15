# 📧 Como Configurar Email Real no XGaming

Para receber emails reais de confirmação, siga estes passos:

## 🔧 Configuração do Gmail

### 1. Ativar Verificação em 2 Etapas
1. Acesse [myaccount.google.com](https://myaccount.google.com)
2. Vá em **Segurança**
3. Ative a **Verificação em duas etapas**

### 2. Gerar Senha de App
1. Na mesma página de Segurança
2. Clique em **Senhas de app**
3. Selecione **Email** como app
4. Selecione **Outro** como dispositivo
5. Digite "XGaming" como nome
6. **Copie a senha gerada** (16 caracteres)

### 3. Configurar o arquivo .env
Edite o arquivo `.env` na raiz do projeto:

```env
# Configurações de Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu.email@gmail.com
EMAIL_PASS=sua_senha_de_app_de_16_caracteres
EMAIL_FROM=XGaming <seu.email@gmail.com>

# URL do servidor
SERVER_URL=http://localhost:3000
```

**⚠️ IMPORTANTE:**
- Use sua **senha de app**, não sua senha normal do Gmail
- Mantenha o arquivo `.env` seguro (já está no .gitignore)

## 🚀 Testando

1. Salve o arquivo `.env` com suas configurações
2. Reinicie o servidor (`start.bat`)
3. Cadastre uma conta com seu email real
4. Verifique sua caixa de entrada!

## 📱 Outros Provedores de Email

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=seu.email@outlook.com
EMAIL_PASS=sua_senha
```

### Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=seu.email@yahoo.com
EMAIL_PASS=sua_senha_de_app
```

## 🔍 Solução de Problemas

### Email não chega?
1. ✅ Verifique se as configurações estão corretas
2. ✅ Confirme que usou a senha de app (Gmail)
3. ✅ Verifique a pasta de spam
4. ✅ Veja o console do servidor para erros

### Erro de autenticação?
- Gmail: Use senha de app, não senha normal
- Outros: Verifique se permite apps menos seguros

## 💡 Modo Simulação

Se não configurar o `.env`, o sistema funciona em **modo simulação**:
- Emails aparecem no console do servidor
- Links de confirmação funcionam normalmente
- Perfeito para desenvolvimento e testes

---

**🎯 Dica:** Para produção, considere usar serviços como SendGrid, Mailgun ou AWS SES para maior confiabilidade.