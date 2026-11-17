const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { after, before, test } = require("node:test");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "test-secret-that-is-long-enough-for-server-tests";
process.env.DATABASE_PROVIDER = "mongodb"; // dotenv never overrides an existing value

const { dataStore } = require("./config/dataStore");
const { LOCAL_COVER_DIR } = require("./config/coverStorage");
const app = require("./server");

// No database in tests: stub the connection check and the editor lookup.
dataStore.connect = async () => {};
dataStore.findEditorById = async (id) =>
  id === "editor-1" ? { _id: "editor-1", name: "Chief", email: "c@example.com", role: "chief_editor" } : null;

const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP4z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==",
  "base64"
);

let server;
let baseUrl;
const createdFiles = [];
const dirExistedBefore = fs.existsSync(LOCAL_COVER_DIR);

const token = () =>
  jwt.sign({ id: "editor-1" }, process.env.JWT_SECRET, { expiresIn: "5m" });

before(async () => {
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  for (const file of createdFiles) fs.rmSync(file, { force: true });
  if (!dirExistedBefore) {
    // Remove only directories this run created, and only if empty.
    for (const dir of [LOCAL_COVER_DIR, path.dirname(LOCAL_COVER_DIR)]) {
      try {
        fs.rmdirSync(dir);
      } catch {
        // Not empty or already gone.
      }
    }
  }
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

const upload = (body, headers) =>
  fetch(`${baseUrl}/api/books/cover`, { method: "POST", body, headers });

test("cover upload without a token returns 401", async () => {
  const response = await upload(PNG, { "Content-Type": "image/png" });
  assert.equal(response.status, 401);
});

test("cover upload with a wrong magic number returns 400", async () => {
  const response = await upload(Buffer.from("this is not a png at all"), {
    "Content-Type": "image/png",
    Authorization: `Bearer ${token()}`,
  });
  const data = await response.json();
  assert.equal(response.status, 400);
  assert.equal(data.success, false);
  assert.match(data.message, /do not match/);
});

test("cover upload with an unsupported type returns 400", async () => {
  const response = await upload(PNG, {
    "Content-Type": "image/gif",
    Authorization: `Bearer ${token()}`,
  });
  assert.equal(response.status, 400);
});

test("oversize cover upload returns 413 with a usable message", async () => {
  const response = await upload(Buffer.alloc(4 * 1024 * 1024 + 1, 0xff), {
    "Content-Type": "image/jpeg",
    Authorization: `Bearer ${token()}`,
  });
  const data = await response.json();
  assert.equal(response.status, 413);
  assert.match(data.message, /4 MB/);
});

test("a valid PNG is stored locally and served back", async () => {
  const response = await upload(PNG, {
    "Content-Type": "image/png",
    Authorization: `Bearer ${token()}`,
  });
  const data = await response.json();
  assert.equal(response.status, 201);
  assert.equal(data.success, true);
  assert.match(data.url, /^\/api\/uploads\/covers\/[0-9a-f-]{36}\.png$/);
  createdFiles.push(path.join(LOCAL_COVER_DIR, path.basename(data.url)));

  const served = await fetch(`${baseUrl}${data.url}`);
  assert.equal(served.status, 200);
  assert.deepEqual(Buffer.from(await served.arrayBuffer()), PNG);
});

test("Supabase mode uploads to the covers path and returns the public URL", async () => {
  const { storeCover } = require("./config/coverStorage");
  const calls = [];
  const client = {
    storage: {
      from: (bucket) => ({
        upload: async (objectPath, body, options) => {
          calls.push({ bucket, objectPath, options });
          return { error: null };
        },
        getPublicUrl: (objectPath) => ({ data: { publicUrl: `https://example.supabase.co/${bucket}/${objectPath}` } }),
      }),
    },
  };
  process.env.DATABASE_PROVIDER = "supabase";
  try {
    const url = await storeCover(PNG, "image/png", { client });
    assert.equal(calls[0].bucket, "book-covers");
    assert.match(calls[0].objectPath, /^covers\/[0-9a-f-]{36}\.png$/);
    assert.deepEqual(calls[0].options, { contentType: "image/png", upsert: false });
    assert.equal(url, `https://example.supabase.co/book-covers/${calls[0].objectPath}`);
  } finally {
    process.env.DATABASE_PROVIDER = "mongodb";
  }
});
