// /appointment-closer/api/tenants/[tenantId]/leads/route.ts

import { NextResponse } from "next/server";
import { acPrisma } from "@/app/(business)/appointment-closer/_db/acPrisma";

type Context = { params: Promise<{ tenantId: string }> };

function preview(s: string, max = 120) {
  const clean = s.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1) + "…";
}

export type LeadsListItem = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  stage: string;
  updatedAt: number;

  channel: string | null;
  conversationId: string | null;
  lastAt: number | null;
  lastMessageAt: number | null;
  lastMessageFrom: "lead" | "ai" | "human" | null;
  lastMessagePreview: string;

  // ✅ Step 3: AI visibility on list rows (snapshot for chips + attention)
  ai?: unknown | null;

  nextAppointment: null | {
    id: string;
    service: string;
    startAt: number;
    durationMin: number;
    status: string;
  };
};

export type LeadsListResponse =
  | {
      ok: true;
      tenantId: string;
      items: LeadsListItem[];
      nextOffset: number | null;
    }
  | { ok: false; error: string };

export async function GET(req: Request, context: Context) {
  try {
    const { tenantId } = await context.params;
    if (!tenantId) {
      return NextResponse.json({ ok: false, error: "Missing tenantId" } satisfies LeadsListResponse, { status: 400 });
    }

    const url = new URL(req.url);
    const limit = Math.min(Math.max(Number(url.searchParams.get("limit") ?? 50), 1), 200);
    const offset = Math.max(Number(url.searchParams.get("offset") ?? 0), 0);

    const leads = await acPrisma.acLead.findMany({
      where: { tenantId },
      orderBy: [{ updatedAt: "desc" }],
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        stage: true,
        updatedAt: true,
        ai: true, // ✅ include ai JSON for CRM list chips / attention
      },
    });

    const items: LeadsListItem[] = [];

    for (const lead of leads) {
      const conv = await acPrisma.acConversation.findFirst({
        where: { tenantId, leadId: lead.id },
        orderBy: [{ lastAt: "desc" }],
        select: { id: true, channel: true, lastAt: true },
      });

      const lastMsg = conv
        ? await acPrisma.acMessage.findFirst({
            where: { tenantId, conversationId: conv.id },
            orderBy: [{ at: "desc" }],
            select: { at: true, from: true, text: true },
          })
        : null;

      const nextAppt = await acPrisma.acAppointment.findFirst({
        where: { tenantId, leadId: lead.id, status: { not: "Canceled" } },
        orderBy: [{ startAt: "asc" }],
        select: { id: true, service: true, startAt: true, durationMin: true, status: true },
      });

      items.push({
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        stage: String(lead.stage),
        updatedAt: lead.updatedAt.getTime(),

        channel: conv?.channel ?? null,
        conversationId: conv?.id ?? null,
        lastAt: conv?.lastAt ? conv.lastAt.getTime() : null,

        lastMessageAt: lastMsg?.at ? lastMsg.at.getTime() : null,
        lastMessageFrom: lastMsg ? (String(lastMsg.from) as any) : null,
        lastMessagePreview: lastMsg?.text ? preview(lastMsg.text) : "",

        // ✅ Step 3: pass through ai snapshot (mode/state/confidence/etc)
        ai: (lead as any).ai ?? null,

        nextAppointment: nextAppt
          ? {
              id: nextAppt.id,
              service: nextAppt.service,
              startAt: nextAppt.startAt.getTime(),
              durationMin: nextAppt.durationMin,
              status: String(nextAppt.status),
            }
          : null,
      });
    }

    const nextOffset = offset + leads.length < offset + limit && leads.length < limit ? null : offset + leads.length;

    return NextResponse.json({ ok: true, tenantId, items, nextOffset } satisfies LeadsListResponse);
  } catch (e) {
    console.error("GET leads error:", e);
    return NextResponse.json({ ok: false, error: "Failed to load leads" } satisfies LeadsListResponse, { status: 500 });
  }
}
