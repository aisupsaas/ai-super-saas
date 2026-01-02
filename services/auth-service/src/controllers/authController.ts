import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../db";

type JwtPayload = {
  userId: string;
  email: string;
  isTokenHolder: boolean;
};

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

/** Small helper: extract Bearer token */
function getBearerToken(req: Request) {
  const auth = req.headers.authorization || "";
  return auth.startsWith("Bearer ") ? auth.slice(7) : "";
}

/** Small helper: verify token safely */
function verifyToken(token: string): JwtPayload {
  const payload = jwt.verify(token, JWT_SECRET) as any;
  return {
    userId: String(payload?.userId || ""),
    email: String(payload?.email || ""),
    isTokenHolder: Boolean(payload?.isTokenHolder),
  };
}

// POST /auth/signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ success: false, error: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        // isTokenHolder defaults to false in DB schema
      },
      select: {
        id: true,
        email: true,
        isTokenHolder: true,
        createdAt: true,
      },
    });

    // Optional: issue token at signup too
    const token = jwt.sign(
      { userId: user.id, email: user.email, isTokenHolder: user.isTokenHolder } satisfies JwtPayload,
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, isTokenHolder: user.isTokenHolder },
    });
  } catch (err) {
    console.error("Signup error", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// POST /auth/login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        isTokenHolder: true,
      },
    });

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // ✅ Include isTokenHolder in token payload (for gating)
    const token = jwt.sign(
      { userId: user.id, email: user.email, isTokenHolder: user.isTokenHolder } satisfies JwtPayload,
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, isTokenHolder: user.isTokenHolder },
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// GET /auth/me
export const me = async (req: Request, res: Response) => {
  try {
    const token = getBearerToken(req);
    if (!token) return res.status(401).json({ success: false, error: "Missing token" });

    const payload = verifyToken(token);
    if (!payload.userId) return res.status(401).json({ success: false, error: "Invalid token" });

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, isTokenHolder: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    return res.json({ success: true, user });
  } catch (err) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

// PATCH /auth/users/:userId/token-holder
// body: { isTokenHolder: boolean }
// requires header: x-admin-secret: <ADMIN_SECRET>
export const setTokenHolder = async (req: Request, res: Response) => {
  try {
    const adminSecret = process.env.ADMIN_SECRET || "";
    const provided = String(req.headers["x-admin-secret"] || "");
    if (!adminSecret || provided !== adminSecret) {
      return res.status(403).json({ success: false, error: "Forbidden" });
    }

    const userId = req.params.userId;
    const isTokenHolder = req.body?.isTokenHolder;

    if (!userId) {
      return res.status(400).json({ success: false, error: "Missing userId param" });
    }
    if (typeof isTokenHolder !== "boolean") {
      return res.status(400).json({ success: false, error: "isTokenHolder(boolean) is required" });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { isTokenHolder },
      select: { id: true, email: true, isTokenHolder: true, createdAt: true },
    });

    return res.json({ success: true, user: updated });
  } catch (err: any) {
    console.error("setTokenHolder error", err);
    return res.status(500).json({ success: false, error: err?.message ?? "Internal server error" });
  }
};
