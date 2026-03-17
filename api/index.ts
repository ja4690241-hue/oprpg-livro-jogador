import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Servir arquivos estáticos do build
const publicPath = join(__dirname, '../dist/public');
app.use(express.static(publicPath));

// Rota raiz
app.get('/', (req, res) => {
  res.sendFile(join(publicPath, 'index.html'));
});

// Fallback para SPA
app.get('*', (req, res) => {
  res.sendFile(join(publicPath, 'index.html'));
});

export default app;
