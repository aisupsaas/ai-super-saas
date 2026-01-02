// services/auth-service/src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// CORS – allow your Next.js dev app
const allowedOrigin = "http://localhost:3000";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Explicit preflight handlers for Express 5
app.options("/auth/signup", cors());
app.options("/auth/login", cors());

// Mount /auth routes
app.use("/auth", authRoutes);

// ⬇️ IMPORTANT: use 5001 instead of 5000
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
