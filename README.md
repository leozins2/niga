# Site Profissionalidade - Versão Node.js

Site de trading com temática amarela desenvolvido em Node.js com Express e EJS.

## 🚀 Características

- **Node.js + Express**: Servidor web robusto e escalável
- **EJS**: Template engine para renderização dinâmica
- **Design Responsivo**: Funciona perfeitamente em mobile, tablet e desktop
- **API REST**: Endpoint `/api/data` para acesso aos dados em JSON
- **Arquivos estáticos**: CSS otimizado com tema amarelo

## 📁 Estrutura do Projeto

```
.
├── server.js              # Servidor Express principal
├── package.json           # Dependências e scripts
├── views/
│   └── index.ejs         # Template da página principal
├── public/
│   └── css/
│       └── styles.css    # Estilos CSS
└── README.md             # Este arquivo
```

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

## ▶️ Como Executar

### Modo Produção
```bash
npm start
```

### Modo Desenvolvimento (com auto-reload)
```bash
npm run dev
```

O servidor estará disponível em: **http://localhost:3000**

## 🌐 Rotas Disponíveis

- `GET /` - Página principal do site
- `GET /api/data` - Retorna os dados do site em formato JSON

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express**: Framework web minimalista
- **EJS**: Template engine para renderização de HTML
- **CSS3**: Estilização com gradientes e animações

## 🎨 Personalização

Para alterar os dados do site, edite o objeto `siteData` no arquivo `server.js`.

## 📦 Scripts Disponíveis

- `npm start` - Inicia o servidor em modo produção
- `npm run dev` - Inicia o servidor com nodemon (recarrega automaticamente)

## 🌟 Funcionalidades

- Design moderno com tema amarelo
- Efeitos hover interativos
- Cards de estatísticas animados
- Banner com informações dinâmicas
- Botão CTA para WhatsApp
- Totalmente responsivo

## 📄 Licença

ISC
