const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");

process.env.JWT_SECRET = "test-secret-that-is-long-enough-for-server-tests";

const app = require("./server");

let server;
let baseUrl;

before(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test("allows same-origin requests without a CORS allowlist entry", async () => {
  const response = await fetch(baseUrl, {
    headers: { Origin: baseUrl },
  });

  assert.equal(response.status, 200);
});

test("keeps configured cross-origin origins allowed", async () => {
  const response = await fetch(baseUrl, {
    headers: { Origin: "http://localhost:3000" },
  });

  assert.equal(response.status, 200);
  assert.equal(
    response.headers.get("access-control-allow-origin"),
    "http://localhost:3000"
  );
});
