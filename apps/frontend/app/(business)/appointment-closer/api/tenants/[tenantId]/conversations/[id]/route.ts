import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

type Context = { params: Promise<{ tenantId: string; id: string }> };

export type ConversationDetailResponse =
  | {
      ok: true;
      tenantId: string;
      conversation: {
        id: string;
        leadId: string;
        channel: string;
        unreadCount: number;
        lastAt: number; // epoch ms
        updatedAt: number; // epoch ms
      };
      lead: {
        id: string;
        name: string;
        phone: string | null;
        email: string | null;
        stage: string;
      };
      messages: Array<{
        id: string;
        at: number; // epoch ms
        from: string; // lead | ai | human
        text: string;
      }>;
      nextOffset: number | null;
    }
  | { ok: false; error: string };

/**
 * GET conversation detail (thread)
 * GET /appointment-closer/api/tenants/:tenantId/conversations/:id?limit=50&offset=0
 *
 * Messages returned newest->oldest by default (at desc).
 */
export async function GET(req: Request, context: Context) {
  try {
    const { tenantId, id } = await context.params;

    if (!tenantId) {
      return NextResponse.json({ ok: false, error: "Missing tenantId" } satisfies ConversationDetailResponse, {
        status: 400,
      });
    }
    if (!id) {
      return NextResponse.json({ ok: false, error: "Missing conversation id" } satisfies ConversationDetailResponse, {
        status: 400,
      });
    }

    const url = new URL(req.url);
    const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);
    const offset = Math.max(Number(url.searchParams.get("offset") ?? 0), 0);

    // 1) Conversation + lead
    const conv = await acPrisma.acConversation.findFirst({
      where: { tenantId, id },
      select: {
        id: true,
        leadId: true,
        channel: true,
        unreadCount: true,
        lastAt: true,
        updatedAt: true,
        lead: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            stage: true,
          },
        },
      },
    });

    if (!conv) {
      return NextResponse.json({ ok: false, error: "Conversation not found" } satisfies ConversationDetailResponse, {
        status: 404,
      });
    }

    // 2) Messages (paged)
    const messages = await acPrisma.acMessage.findMany({
      where: { tenantId, conversationId: conv.id },
      orderBy: [{ at: "desc" }],
      skip: offset,
      take: limit,
      select: {
        id: true,
        at: true,
        from: true,
        text: true,
      },
    });

    const nextOffset = messages.length === limit ? offset + limit : null;

    const body: ConversationDetailResponse = {
      ok: true,
      tenantId,
      conversation: {
        id: conv.id,
        leadId: conv.leadId,
        channel: conv.channel,
        unreadCount: conv.unreadCount,
        lastAt: new Date(conv.lastAt).getTime(),
        updatedAt: new Date(conv.updatedAt).getTime(),
      },
      lead: {
        id: conv.lead.id,
        name: conv.lead.name,
        phone: conv.lead.phone,
        email: conv.lead.email,
        stage: String(conv.lead.stage),
      },
      messages: messages.map((m) => ({
        id: m.id,
        at: new Date(m.at).getTime(),
        from: String(m.from),
        text: m.text,
      })),
      nextOffset,
    };

    return NextResponse.json(body);
  } catch (error) {
    console.error("GET conversation detail error:", error);
    return NextResponse.json({ ok: false, error: "Failed to load conversation" } satisfies ConversationDetailResponse, {
      status: 500,
    });
  }
}
