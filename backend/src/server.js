const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

const path = require("node:path");

const app = express();

const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!process.env.JWT_SECRET || Buffer.byteLength(process.env.JWT_SECRET) < 32) {
  throw new Error("JWT_SECRET must be configured with at least 32 bytes.");
}

// On Vercel the platform proxy sets X-Forwarded-For, so trust it for req.ip
// (used by the sign-in rate limit). Locally the API is reached directly.
if (process.env.VERCEL) {
  app.set("trust proxy", true);
}

// Connect once per process. Vercel never calls startServer, so the first
// request on each instance connects; a failure is retried next request.
let connection;
const ensureConnected = () => {
  connection ||= connectDB().catch((error) => {
    connection = undefined;
    throw error;
  });
  return connection;
};

app.use((req, res, next) => {
  const origin = req.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host === req.get("host")) {
        return next();
      }
    } catch {
      // Invalid origins are rejected by the CORS middleware below.
    }
  }

  return cors({
    origin(requestOrigin, callback) {
      if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed."));
    },
  })(req, res, next);
});
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Veda Publications API is running 🚀",
  });
});

// Locally stored cover images (Supabase mode serves them from Storage instead).
app.use(
  "/api/uploads/covers",
  express.static(path.join(__dirname, "..", "uploads", "covers"), {
    fallthrough: false,
    index: false,
  })
);

app.use("/api", async (_req, _res, next) => {
  try {
    await ensureConnected();
    return next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return next(Object.assign(new Error("Database unavailable."), { statusCode: 503 }));
  }
});

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found.",
  });
});

app.use((error, _req, res, _next) => {
  console.error("Request failed:", error.message);
  const requestedStatus = Number(error.statusCode || error.status);
  const statusCode = requestedStatus >= 400 && requestedStatus < 600 ? requestedStatus : 500;
  let message = statusCode < 500 ? "Invalid request." : "The request could not be completed.";
  if (statusCode === 413) message = "The file is too large. Cover images can be up to 4 MB.";
  if (statusCode === 404) message = "Endpoint not found.";
  res.status(statusCode).json({ success: false, message });
});

const startServer = async () => {
  try {
    await ensureConnected();
    app.listen(PORT, () => {
      console.log(`🚀 Veda Publications Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exitCode = 1;
  }
};

// `npm start` / Docker run this file directly; Vercel imports the app instead.
if (require.main === module) {
  startServer();
}

module.exports = app;