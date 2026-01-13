import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// ✅ import the generated client
import { PrismaClient } from "./generated/prisma";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
