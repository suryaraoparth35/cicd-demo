const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('./app');

test('GET /health returns status ok', async () => {
  const server = app.listen(0);

  try {
    const port = server.address().port;
    const res = await fetch(`http://127.0.0.1:${port}/health`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.status, 'ok');
  } finally {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
});

test('GET / returns the home page', async () => {
  const server = app.listen(0);

  try {
    const port = server.address().port;
    const res = await fetch(`http://127.0.0.1:${port}/`);
    const text = await res.text();

    assert.equal(res.status, 200);
    assert.ok(text.includes('CI/CD Demo App'));
  } finally {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
});