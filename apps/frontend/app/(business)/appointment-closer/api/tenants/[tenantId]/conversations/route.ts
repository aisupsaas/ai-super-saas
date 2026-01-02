import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

type Context = { params: Promise<{ tenantId: string }> };

export type ConversationsListItem = {
  id: string;
  leadId: string;
  channel: string;
  unreadCount: number;

  lastAt: number; // epoch ms (conversation.lastAt)
  updatedAt: number; // epoch ms

  lead: {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    stage: string;
  };

  lastMessageAt: number | null; // epoch ms (message.at)
  lastMessageFrom: string | null; // lead | ai | human
  lastMessagePreview: string;
};

export type ConversationsListResponse =
  | {
      ok: true;
      tenantId: string;
      items: ConversationsListItem[];
      nextOffset: number | null;
    }
  | { ok: false; error: string };

/**
 * GET conversations list (sidebar)
 * GET /appointment-closer/api/tenants/:tenantId/conversations?limit=30&offset=0
 *
 * Uses OFFSET pagination (skip/take) to avoid cursor typing issues.
 */
export async function GET(req: Request, context: Context) {
  try {
    const { tenantId } = await context.params;

    if (!tenantId) {
      const body: ConversationsListResponse = { ok: false, error: "Missing tenantId" };
      return NextResponse.json(body, { status: 400 });
    }

    const url = new URL(req.url);
    const limit = Math.min(Number(url.searchParams.get("limit") ?? 30), 100);
    const offset = Math.max(Number(url.searchParams.get("offset") ?? 0), 0);

    const conversations = await acPrisma.acConversation.findMany({
      where: { tenantId },
      orderBy: [{ lastAt: "desc" }],
      skip: offset,
      take: limit,
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

        // Latest message for preview
        messages: {
          orderBy: { at: "desc" },
          take: 1,
          select: {
            at: true,
            from: true,
            text: true,
          },
        },
      },
    });

    const items: ConversationsListItem[] = conversations.map((c) => {
      const lastMsg = c.messages?.[0] ?? null;

      return {
        id: c.id,
        leadId: c.leadId,
        channel: c.channel,
        unreadCount: c.unreadCount,
        lastAt: new Date(c.lastAt).getTime(),
        updatedAt: new Date(c.updatedAt).getTime(),

        lead: {
          id: c.lead.id,
          name: c.lead.name,
          phone: c.lead.phone,
          email: c.lead.email,
          stage: String(c.lead.stage),
        },

        lastMessageAt: lastMsg ? new Date(lastMsg.at).getTime() : null,
        lastMessageFrom: lastMsg ? String(lastMsg.from) : null,
        lastMessagePreview: lastMsg?.text ? preview(lastMsg.text) : "",
      };
    });

    // Sidebar ordering by most recent *message* when available, else conversation.lastAt
    items.sort((a, b) => {
      const aT = a.lastMessageAt ?? a.lastAt ?? 0;
      const bT = b.lastMessageAt ?? b.lastAt ?? 0;
      return bT - aT;
    });

    const nextOffset = items.length === limit ? offset + limit : null;

    const body: ConversationsListResponse = {
      ok: true,
      tenantId,
      items,
      nextOffset,
    };

    return NextResponse.json(body);
  } catch (error) {
    console.error("GET conversations list error:", error);
    const body: ConversationsListResponse = { ok: false, error: "Failed to load conversations" };
    return NextResponse.json(body, { status: 500 });
  }
}

function preview(s: string, max = 120) {
  const clean = s.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1) + "…";
}
