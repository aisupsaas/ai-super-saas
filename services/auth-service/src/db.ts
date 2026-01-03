// services/auth-service/src/db.ts
import "dotenv/config"; // load env FIRST

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

// Create one shared pool + adapter
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// ✅ Export ONE prisma client (this is what the rest of your app should import)
export const prisma = new PrismaClient({ adapter });
