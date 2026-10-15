const express = require('express');
const app = express();

const VERSION = 'Version 1';

app.get('/', (req, res) => {
  res.send(`<h1>CI/CD Demo App</h1><p>${VERSION}</p>`);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;