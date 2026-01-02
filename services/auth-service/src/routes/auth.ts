import express from "express";
import {
  signup,
  login,
  me,
  setTokenHolder,
} from "../controllers/authController";

const router = express.Router();

/**
 * AUTH ROUTES
 * Base path: /auth
 */

// POST /auth/signup
router.post("/signup", signup);

// POST /auth/login
router.post("/login", login);

// GET /auth/me
router.get("/me", me);

// PATCH /auth/users/:userId/token-holder
// Requires header: x-admin-secret
router.patch("/users/:userId/token-holder", setTokenHolder);

export default router;
