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
 * Set ALLOWED_ORIGINS as comma-separated list:
 * ALLOWED_ORIGINS="http://localhost:3000,https://your-frontend.vercel.app"
 */
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // allow server-to-server, curl, postman
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle all OPTIONS preflights in one place (Express 5 safe)
app.options("*", cors());

// Health check (Railway will use this)
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "auth-service", ts: Date.now() });
});

// Routes
app.use("/auth", authRoutes);

// ✅ Railway injects PORT; bind to 0.0.0.0 in containers
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Auth service running on port ${PORT}`);
});
