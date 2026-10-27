import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { site } from "@/lib/site";
import { CHECKLIST, CHECKLIST_COUNT, CHECKLIST_TITLE } from "@/lib/checklist";

export const runtime = "nodejs";

// 글 끝 "체크리스트 받기" 처리.
// 1) Resend 연락처(명단)에 이메일을 넣고 2) 체크리스트 주소를 메일로 보낸다.
// 명단은 Resend 쪽에 두고(새 글 알림은 Resend 브로드캐스트로 보낸다), Supabase leads 는 전화 상담 신청만 담는다.
// 발신 주소·API 키는 상담 알림과 같은 환경변수를 쓴다 — 새 환경변수를 만들지 않는다.

const schema = z.object({
  email: z.string().trim().toLowerCase().email("이메일 주소를 확인해 주세요.").max(120),
  source: z.string().trim().max(120).optional().or(z.literal("")),
  company_website: z.string().optional(),
});

// 간단 레이트리밋 (인스턴스 메모리) — 같은 IP 에서 10분에 5건 넘으면 거절
const HITS = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (HITS.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  arr.push(now);
  HITS.set(ip, arr);
  return arr.length > 5;
}

function escapeHtml(v: string): string {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function emailHtml(): string {
  const url = `${site.url}/checklist`;
  const groups = CHECKLIST.map(
    (g) =>
      `<p style="margin:14px 0 4px;font-weight:700">${escapeHtml(g.title)}</p>` +
      `<ul style="margin:0;padding-left:18px;color:#333">${g.items
        .map((i) => `<li style="margin:3px 0">${escapeHtml(i)}</li>`)
        .join("")}</ul>`
  ).join("");
  return (
    `<div style="font-family:-apple-system,Pretendard,Arial,sans-serif;max-width:600px;line-height:1.7;color:#111">` +
    `<h2 style="font-size:20px;margin:0 0 8px">${escapeHtml(CHECKLIST_TITLE)}</h2>` +
    `<p style="margin:0 0 16px;color:#555">자리 보러 가기 전부터 계약 직후까지 ${CHECKLIST_COUNT}가지입니다. 인쇄용 화면은 아래 버튼에 있습니다.</p>` +
    `<p style="margin:0 0 24px"><a href="${url}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:600">체크리스트 열기 (인쇄용)</a></p>` +
    groups +
    `<p style="margin:24px 0 0;color:#555">체크하다 막히는 항목이 있으면 계약 전에 같이 봐드립니다. 비용은 없습니다. ` +
    `<a href="${site.url}/#apply" style="color:#111">무료 상담 문의 →</a></p>` +
    `<p style="margin:24px 0 0;font-size:12px;color:#888">브랜드각 · ${escapeHtml(site.business.name)} · ${escapeHtml(site.business.address)}<br>` +
    `새 글 안내 메일은 가끔 보내며, 메일 아래 링크로 언제든 그만 받을 수 있습니다.</p>` +
    `</div>`
  );
}

// 배포 확인용. 코드를 바꾼 뒤 운영에 새 판이 떴는지 이 값으로 본다(Vercel 배포 완료 신호가 따로 없다).
const VERSION = "2026-10-27.2";
export async function GET() {
  return NextResponse.json({ ok: true, version: VERSION }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "이메일 주소를 확인해 주세요." },
      { status: 422 }
    );
  }
  const { email, source, company_website } = parsed.data;

  // 허니팟 — 숨은 칸이 채워지면 봇. 성공처럼 응답하고 버린다.
  if (company_website && company_website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "요청이 너무 많아요. 잠시 후 다시 시도해 주세요." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // 키 없는 로컬·데모: 보내지 않고 성공 처리
    return NextResponse.json({ ok: true, demo: true });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  // 1) 명단에 추가. 이미 있으면 Resend 가 오류를 주는데, 메일은 그래도 보낸다(다시 받고 싶어 눌렀을 수 있다).
  // SDK 4.x 의 contacts.create 는 옛 주소(/audiences/{id}/contacts)를 불러 지금 Resend(세그먼트 방식)에서는 등록이 안 된다
  // (10/27 운영 시험: 메일은 가고 명단은 비어 있었음) → 새 주소 POST /contacts 를 직접 부른다.
  const segmentId = process.env.RESEND_AUDIENCE_ID || site.resendAudienceId;
  if (segmentId) {
    try {
      const r = await fetch("https://api.resend.com/contacts", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          unsubscribed: false,
          segments: [{ id: segmentId }],
          properties: { source: source || "" },
        }),
      });
      if (!r.ok) console.warn("체크리스트 명단 추가 실패:", r.status, (await r.text()).slice(0, 200));
    } catch (err) {
      console.warn("체크리스트 명단 추가 오류:", err);
    }
  }

  // 2) 체크리스트 메일
  try {
    const from = process.env.LEAD_NOTIFY_FROM || "브랜드각 <onboarding@resend.dev>";
    const r = await resend.emails.send({
      from,
      to: email,
      subject: `[브랜드각] ${CHECKLIST_TITLE}`,
      html: emailHtml(),
      headers: { "X-Entity-Ref-ID": `checklist-${Date.now()}` },
    });
    if (r.error) {
      console.error("체크리스트 메일 실패:", r.error.message);
      return NextResponse.json({ error: "메일을 보내지 못했어요. 주소를 확인하고 다시 시도해 주세요." }, { status: 500 });
    }
  } catch (err) {
    console.error("체크리스트 메일 오류:", err);
    return NextResponse.json({ error: "메일을 보내지 못했어요. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
