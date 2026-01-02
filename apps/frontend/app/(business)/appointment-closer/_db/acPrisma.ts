// apps/frontend/app/(business)/appointment-closer/_db/acPrisma.ts

import "server-only";
import { PrismaClient } from "./generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

function getAcDbConfig() {
  const url = process.env.APPOINTMENT_CLOSER_DATABASE_URL;
  if (!url) throw new Error("Missing APPOINTMENT_CLOSER_DATABASE_URL");

  const u = new URL(url);
  const host = u.hostname || "127.0.0.1";
  const port = u.port ? Number(u.port) : 3306;
  const user = decodeURIComponent(u.username || "root");
  const password = decodeURIComponent(u.password || "");
  const database = u.pathname.replace(/^\//, "");
  if (!database) throw new Error("DB name missing in APPOINTMENT_CLOSER_DATABASE_URL");

  return { host, port, user, password, database };
}

const globalForPrisma = globalThis as unknown as { acPrisma?: PrismaClient };

export const acPrisma =
  globalForPrisma.acPrisma ??
  new PrismaClient({
    adapter: new PrismaMariaDb({
      ...getAcDbConfig(),
      connectionLimit: 5,
    }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.acPrisma = acPrisma;
