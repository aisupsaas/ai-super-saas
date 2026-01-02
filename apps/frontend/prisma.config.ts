import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "app/(business)/appointment-closer/prisma/schema.prisma",
  datasource: {
    url: env("APPOINTMENT_CLOSER_DATABASE_URL"),
  },
  migrations: {
    path: "app/(business)/appointment-closer/prisma/migrations",
  },
});
