import { NextResponse } from "next/server";
import { acPrisma } from "../../_db/acPrisma";

console.log("AC DB URL:", process.env.APPOINTMENT_CLOSER_DATABASE_URL);

export async function GET() {
  try {
    await acPrisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
