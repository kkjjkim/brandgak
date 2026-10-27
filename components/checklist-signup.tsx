"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { track } from "@/lib/track";
import { CHECKLIST_COUNT, CHECKLIST_TITLE } from "@/lib/checklist";

// 글 끝 "체크리스트 받기" — 이메일 하나만 받는다.
// 왜(2026-10-27): 글로 들어온 사람은 정보 검색 단계라 전화번호를 남기지 않는다(28일 신청 0건).
// 이메일은 문턱이 낮고, 받은 명단에 새 글·자료를 보내 자리 계약·공사 단계가 됐을 때 상담으로 잇는다.
// 홈에는 두지 않는다 — 대표 결정(2026-10-11 "문의 창 두 개 별로"), 자료 받기는 글 끝에만.
export function ChecklistSignup({ slug }: { slug: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: `insight:${slug}`,
          company_website: honeypotRef.current?.value || "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setState("error");
        setMessage(data.error || "잠시 후 다시 시도해 주세요.");
        return;
      }
      track("checklist_submit", { slug });
      setState("done");
    } catch {
      setState("error");
      setMessage("연결이 끊겼어요. 잠시 후 다시 시도해 주세요.");
    }
  }

  return (
    <aside className="mx-auto mt-14 max-w-2xl rounded-lg border border-border bg-secondary/40 p-6 md:p-8">
      <p className="text-lg font-semibold leading-snug">{CHECKLIST_TITLE}, 메일로 보내드립니다</p>
      <p className="mt-2 text-sm leading-[1.7] text-foreground/70">
        자리 보러 가기 전부터 계약 직후까지 {CHECKLIST_COUNT}가지. 인쇄해서 들고 가면 됩니다. 새 글이 나오면 가끔 같이 보내드리고, 언제든 끊을 수 있습니다.
      </p>
      {state === "done" ? (
        <div className="mt-5 rounded-md border border-primary/30 bg-background p-4 text-sm leading-[1.7]">
          <p className="font-semibold">보냈습니다. 메일함(스팸함도)을 확인해 주세요.</p>
          <p className="mt-1 text-foreground/70">
            지금 바로 보시려면{" "}
            <Link href="/checklist" className="font-medium text-primary underline">
              여기서 열기
            </Link>
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row" noValidate>
          <label htmlFor={`checklist-email-${slug}`} className="sr-only">
            이메일
          </label>
          <Input
            id={`checklist-email-${slug}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => track("checklist_start", { slug })}
            className="h-11 flex-1 bg-background"
          />
          {/* 봇 방지용 숨은 칸 — 사람 눈에 안 보인다 */}
          <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
            <label htmlFor={`checklist-company-${slug}`}>회사명 (입력하지 마세요)</label>
            <input id={`checklist-company-${slug}`} ref={honeypotRef} type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <Button type="submit" className="h-11" disabled={state === "loading"} data-cta="checklist_submit">
            {state === "loading" ? "보내는 중…" : "체크리스트 받기"}
          </Button>
        </form>
      )}
      {state === "error" && message && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {message}
        </p>
      )}
    </aside>
  );
}
