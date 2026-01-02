import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

type Context = { params: Promise<{ tenantId: string; id: string }> };

export async function POST(_req: Request, context: Context) {
  try {
    const { tenantId, id } = await context.params;

    if (!tenantId) return NextResponse.json({ ok: false, error: "Missing tenantId" }, { status: 400 });
    if (!id) return NextResponse.json({ ok: false, error: "Missing conversation id" }, { status: 400 });

    // tenant safety check
    const conv = await acPrisma.acConversation.findFirst({
      where: { tenantId, id },
      select: { id: true },
    });
    if (!conv) return NextResponse.json({ ok: false, error: "Conversation not found" }, { status: 404 });

    const updated = await acPrisma.acConversation.update({
      where: { id },
      data: { unreadCount: 0 },
      select: { id: true, unreadCount: true, lastAt: true, updatedAt: true },
    });

    return NextResponse.json({
      ok: true,
      tenantId,
      conversation: {
        id: updated.id,
        unreadCount: updated.unreadCount,
        lastAt: updated.lastAt.getTime(),
        updatedAt: updated.updatedAt.getTime(),
      },
    });
  } catch (e) {
    console.error("mark-read error:", e);
    return NextResponse.json({ ok: false, error: "Failed to mark read" }, { status: 500 });
  }
}
