// services/auth-service/src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
app.use(express.json());

// Log every request (keep for now; later make conditional)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

/**
 * CORS
 * ALLOWED_ORIGINS="http://localhost:3000,https://your-frontend.vercel.app"
 */
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsMiddleware = cors({
  origin: (origin, cb) => {
    // allow server-to-server / curl / postman
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.use(corsMiddleware);

// ✅ Express 5 safe preflight handler (no "*" route)
app.use((req, res, next) => {
  if (req.method !== "OPTIONS") return next();
  return corsMiddleware(req, res, () => res.sendStatus(204));
});

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "auth-service", ts: Date.now() });
});

// Routes
app.use("/auth", authRoutes);

// Railway injected PORT
const PORT = process.env.PORT ? Number(process.env.PORT) : 5001;

// bind 0.0.0.0 for containers
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Auth service running on port ${PORT}`);
});
