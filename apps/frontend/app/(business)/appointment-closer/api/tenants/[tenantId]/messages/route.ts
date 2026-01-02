import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

type Context = { params: Promise<{ tenantId: string }> };

// Your Prisma enum values: lead | ai | human
type MessageFrom = "lead" | "ai" | "human";

type PostMessageBody = {
  conversationId: string;
  from: MessageFrom;
  text: string;
  at?: number; // optional epoch ms; if omitted, server uses now()
};

type PostMessageResponse =
  | {
      ok: true;
      tenantId: string;
      message: {
        id: string;
        conversationId: string;
        at: number;
        from: MessageFrom;
        text: string;
      };
      conversation: {
        id: string;
        leadId: string;
        channel: string;
        unreadCount: number;
        lastAt: number;
        updatedAt: number;
      };
    }
  | { ok: false; error: string };

// Extract proposed start time from AI text like: **Fri, Dec 25, 10:00 AM**
function extractProposedStartAtMs(text: string): number | null {
  const m = text.match(/\*\*(.+?)\*\*/); // first **...**
  if (!m?.[1]) return null;

  const parsed = Date.parse(m[1]);
  if (Number.isNaN(parsed)) return null;

  return parsed;
}

// IMPORTANT: Prisma JSON fields want InputJsonValue.
// To avoid TS fighting you, return `any` (runtime is fine because we only store JSON-safe values).
function mergeAiJson(ai: unknown, patch: Record<string, unknown>): any {
  const base = ai && typeof ai === "object" ? (ai as Record<string, unknown>) : {};
  return { ...base, ...patch };
}

export async function POST(req: Request, context: Context) {
  try {
    const { tenantId } = await context.params;
    if (!tenantId) {
      return NextResponse.json({ ok: false, error: "Missing tenantId" } satisfies PostMessageResponse, {
        status: 400,
      });
    }

    const body = (await req.json()) as Partial<PostMessageBody>;

    const conversationId = body.conversationId?.trim();
    const from = body.from;
    const text = body.text?.trim();

    if (!conversationId) {
      return NextResponse.json({ ok: false, error: "Missing conversationId" } satisfies PostMessageResponse, {
        status: 400,
      });
    }
    if (from !== "lead" && from !== "ai" && from !== "human") {
      return NextResponse.json({ ok: false, error: "Invalid from (lead|ai|human)" } satisfies PostMessageResponse, {
        status: 400,
      });
    }
    if (!text) {
      return NextResponse.json({ ok: false, error: "Missing text" } satisfies PostMessageResponse, {
        status: 400,
      });
    }

    const atDate = typeof body.at === "number" ? new Date(body.at) : new Date();
    if (Number.isNaN(atDate.getTime())) {
      return NextResponse.json({ ok: false, error: "Invalid at timestamp" } satisfies PostMessageResponse, {
        status: 400,
      });
    }

    // Ensure conversation belongs to this tenant + fetch lead.ai snapshot
    const conv = await acPrisma.acConversation.findFirst({
      where: { tenantId, id: conversationId },
      select: {
        id: true,
        leadId: true,
        channel: true,
        lead: { select: { ai: true } },
      },
    });

    if (!conv) {
      return NextResponse.json({ ok: false, error: "Conversation not found" } satisfies PostMessageResponse, {
        status: 404,
      });
    }

    // Unread rules:
    // - lead message increments unread
    // - ai followup increments unread (operator should notice)
    // - human message does NOT increment unread
    const incUnread = from === "lead" || from === "ai";

    const convAiSnapshot = conv.lead?.ai ?? null;

    const result = await acPrisma.$transaction(async (tx) => {
      const message = await tx.acMessage.create({
        data: {
          tenantId,
          conversationId: conv.id,
          at: atDate,
          from,
          text,
        },
        select: {
          id: true,
          conversationId: true,
          at: true,
          from: true,
          text: true,
        },
      });

      const updatedConv = await tx.acConversation.update({
        where: { tenantId_id: { tenantId, id: conv.id } },
        data: {
          lastAt: message.at,
          ...(incUnread ? { unreadCount: { increment: 1 } } : {}),
        },
        select: {
          id: true,
          leadId: true,
          channel: true,
          unreadCount: true,
          lastAt: true,
          updatedAt: true,
        },
      });

      // If AI proposed a slot time, persist it on lead.ai.bookingProposal
      if (from === "ai") {
        const proposedStartAt = extractProposedStartAtMs(text);

        const t = text.toLowerCase();
const wantsHuman =
  t.includes("human") ||
  t.includes("agent") ||
  t.includes("manager") ||
  t.includes("refund") ||
  t.includes("complaint") ||
  t.includes("lawsuit") ||
  t.includes("attorney");

if (wantsHuman) {
  await tx.acLead.update({
    where: { tenantId_id: { tenantId, id: conv.leadId } },
    data: {
      nextFollowUpAt: null,
      ai: mergeAiJson(convAiSnapshot, {
        state: "handoff_human",
        handoffEnabled: true,
        handoffReason: "Lead requested human",
        handoffAt: Date.now(),
      }),
    },
  });

  // optional: send acknowledgement as AI (increments unread)
  const ack = "No problem — I’ll have a human take a look and follow up shortly.";
  const ackMsg = await tx.acMessage.create({
    data: { tenantId, conversationId: conv.id, at: new Date(), from: "ai", text: ack },
    select: { at: true },
  });

  await tx.acConversation.update({
    where: { tenantId_id: { tenantId, id: conv.id } },
    data: { lastAt: ackMsg.at, unreadCount: { increment: 1 } },
  });
}


        if (proposedStartAt) {
          await tx.acLead.update({
            where: { tenantId_id: { tenantId, id: conv.leadId } },
            data: {
              // Cast handled by mergeAiJson returning any (JSON-safe object)
              ai: mergeAiJson(convAiSnapshot, {
                bookingProposal: {
                  startAt: proposedStartAt,
                  createdAt: Date.now(),
                  conversationId: conv.id,
                },
              }),
            },
          });
        }
      }

      return { message, updatedConv };
    });

    const resBody: PostMessageResponse = {
      ok: true,
      tenantId,
      message: {
        id: result.message.id,
        conversationId: result.message.conversationId,
        at: new Date(result.message.at).getTime(),
        from: String(result.message.from) as MessageFrom,
        text: result.message.text,
      },
      conversation: {
        id: result.updatedConv.id,
        leadId: result.updatedConv.leadId,
        channel: result.updatedConv.channel,
        unreadCount: result.updatedConv.unreadCount,
        lastAt: new Date(result.updatedConv.lastAt).getTime(),
        updatedAt: new Date(result.updatedConv.updatedAt).getTime(),
      },
    };

    return NextResponse.json(resBody);
  } catch (error) {
    console.error("POST message error:", error);
    return NextResponse.json({ ok: false, error: "Failed to create message" } satisfies PostMessageResponse, {
      status: 500,
    });
  }
}
