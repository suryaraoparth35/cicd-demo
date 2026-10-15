const test = require('node:test');
const assert = require('node:assert');
const app = require('./app');

test('GET /health returns status ok', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}/health`);
  const body = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(body.status, 'ok');
  server.close();
});

test('GET / returns the home page', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  const res = await fetch(`http://localhost:${port}/`);
  const text = await res.text();
  assert.strictEqual(res.status, 200);
  assert.ok(text.includes('CI/CD Demo App'));
  server.close();
});