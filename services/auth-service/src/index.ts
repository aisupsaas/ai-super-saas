// services/auth-service/src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

app.use(express.json());

// Log every request (keep for now; later we can make it conditional)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

/**
 * CORS
 * - In production, allow your deployed frontend origin(s)
 * - In dev, allow localhost:3000
 *
 * Set ALLOWED_ORIGINS as a comma-separated list, e.g.
 * ALLOWED_ORIGINS="http://localhost:3000,https://your-frontend.vercel.app"
 *
 * (We support BOTH env names: ALLOWED_ORIGINS (preferred) and CORS_ORIGIN (legacy))
 */
const allowedOrigins: string[] = (process.env.ALLOWED_ORIGINS || process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow non-browser requests (curl/postman) and same-origin/no-origin
      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin)) return cb(null, true);

      // In Express, throwing here can look like a 500. Returning an error is correct.
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Explicit preflight (safe)
app.options("*", cors());

// Health check (so Railway domain test works)
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "auth-service", ts: Date.now() });
});

// Mount /auth routes
app.use("/auth", authRoutes);

// ✅ Railway injects PORT. Always listen on it.
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// ✅ bind to 0.0.0.0 in containers
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Auth service running on port ${PORT}`);
});
