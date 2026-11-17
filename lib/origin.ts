import type { NextRequest } from "next/server";

// 공개 폼 API(/api/leads·/api/checklist)를 다른 사이트에서 대신 호출하지 못하게 출처를 본다 (2026-11-17 보안 점검).
// 브라우저는 POST fetch 에 Origin 을 붙인다. 다른 도메인이 보낸 요청은 거절하고,
// Origin·Referer 가 둘 다 없는 요청(스크립트·봇이 흔함)은 거절하지 않고 "출처 없음"으로 표시만 한다 —
// 일부 앱 내 브라우저가 빼먹을 가능성이 있어 진짜 손님을 잃지 않기 위해서다.
const ALLOWED_HOSTS = new Set(["www.brandgak.com", "brandgak.com", "localhost", "127.0.0.1"]);
// Vercel 미리보기 주소(이 프로젝트 것만)
const PREVIEW_HOST = /^ai-space-design-app(-[a-z0-9-]+)?\.vercel\.app$/;

function hostOf(v: string | null): string | null {
  if (!v) return null;
  try {
    return new URL(v).hostname;
  } catch {
    return "invalid";
  }
}

export type OriginCheck = "ok" | "missing" | "foreign";

export function checkOrigin(req: NextRequest): OriginCheck {
  const host = hostOf(req.headers.get("origin")) ?? hostOf(req.headers.get("referer"));
  if (!host) return "missing";
  if (ALLOWED_HOSTS.has(host) || PREVIEW_HOST.test(host)) return "ok";
  return "foreign";
}
