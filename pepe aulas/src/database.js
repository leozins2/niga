import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_PATH = './data/users.json';
const TOKENS_PATH = './data/tokens.json';

// Criar diretório data se não existir
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

// Inicializar arquivos se não existirem
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

if (!fs.existsSync(TOKENS_PATH)) {
    fs.writeFileSync(TOKENS_PATH, JSON.stringify([]));
}

export class Database {
    static getUsers() {
        try {
            const data = fs.readFileSync(DB_PATH, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    static saveUsers(users) {
        fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
    }

    static getTokens() {
        try {
            const data = fs.readFileSync(TOKENS_PATH, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    static saveTokens(tokens) {
        fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens, null, 2));
    }

    static findUserByEmail(email) {
        const users = this.getUsers();
        return users.find(user => user.email === email);
    }

    static createUser(userData) {
        const users = this.getUsers();
        const newUser = {
            id: crypto.randomUUID(),
            name: userData.name,
            email: userData.email,
            password: this.hashPassword(userData.password),
            confirmed: false,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    }

    static confirmUser(email) {
        const users = this.getUsers();
        const userIndex = users.findIndex(user => user.email === email);
        if (userIndex !== -1) {
            users[userIndex].confirmed = true;
            this.saveUsers(users);
            return users[userIndex];
        }
        return null;
    }

    static createConfirmationToken(email) {
        const tokens = this.getTokens();
        const token = crypto.randomBytes(32).toString('hex');
        const confirmationToken = {
            token,
            email,
            type: 'confirmation',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
        };
        tokens.push(confirmationToken);
        this.saveTokens(tokens);
        return token;
    }

    static validateToken(token) {
        const tokens = this.getTokens();
        const tokenData = tokens.find(t => t.token === token && new Date(t.expiresAt) > new Date());
        return tokenData;
    }

    static removeToken(token) {
        const tokens = this.getTokens();
        const filteredTokens = tokens.filter(t => t.token !== token);
        this.saveTokens(filteredTokens);
    }

    static hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    static validatePassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    }
}