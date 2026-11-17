const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");
const { createClient } = require("@supabase/supabase-js");

const EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

// Resolved from this file, not the working directory, so it is the same under
// `npm start`, Docker (/app/uploads) and tests.
const LOCAL_COVER_DIR = path.resolve(__dirname, "..", "..", "uploads", "covers");

let supabaseClient;
const getSupabaseClient = () => {
  if (supabaseClient) return supabaseClient;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
    throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY are required for Supabase.");
  }
  supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
  return supabaseClient;
};

// Stores a validated cover image and returns the URL to save on the book.
// The filename is always generated; the client's filename is never used.
async function storeCover(buffer, contentType, { client } = {}) {
  const extension = EXTENSIONS[contentType];
  if (!extension) throw new Error("Unsupported cover image type.");
  const filename = `${crypto.randomUUID()}.${extension}`;

  if (process.env.DATABASE_PROVIDER === "supabase") {
    const supabase = client || getSupabaseClient();
    const bucket = process.env.COVER_BUCKET || "book-covers";
    const objectPath = `covers/${filename}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(objectPath, buffer, { contentType, upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
    return data.publicUrl;
  }

  await fs.mkdir(LOCAL_COVER_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCAL_COVER_DIR, filename), buffer, { flag: "wx" });
  return `/api/uploads/covers/${filename}`;
}

module.exports = { storeCover, LOCAL_COVER_DIR, EXTENSIONS };
