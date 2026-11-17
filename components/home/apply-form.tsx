"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChoiceChips } from "@/components/home/choice-chips";
import { ConsentNotice } from "@/components/home/consent-notice";
import { readSource } from "@/lib/attribution";
import { SIZE_OPTIONS, START_TIMING, WORK_TYPES } from "@/lib/leads";
import { CTA_LABEL, site } from "@/lib/site";
import { track } from "@/lib/track";
import { useTurnstile } from "@/lib/use-turnstile";
import { cn } from "@/lib/utils";

// B안 입력칸 — 상자 없이 아래 선만(시안 mockB). 라벨은 작은 회색 글씨.
const LABEL = "text-[13px] font-normal text-[#555]";
const LINE =
  "h-auto border-0 border-b border-input bg-transparent px-0 py-2.5 text-[15px] placeholder:text-[#999] focus-visible:border-foreground focus-visible:shadow-[0_1px_0_0_hsl(var(--foreground))] focus-visible:ring-0";

// 홈 신청 폼. 서버는 기존 /api/leads 그대로 쓴다.
// 2026-11-17: "인테리어 상담" 폼으로 바꿨다. 공사 구분·평수·시작 시기를 칩으로 묻는다 —
// 막연한 "컨셉 상담"(장사·매출 고민 등)이 아니라 공사를 앞둔 문의가 들어오게.
// 새 칸은 message 에 합쳐 보내 DB 스키마를 바꾸지 않는다.
const INDUSTRIES = ["카페", "식당", "뷰티", "리테일", "기타"] as const;

type Form = {
  name: string;
  phone: string;
  workType: string;
  industry: string;
  size: string;
  region: string;
  start: string;
  dream: string;
};

const initial: Form = { name: "", phone: "", workType: "", industry: "", size: "", region: "", start: "", dream: "" };

// 같은 분석 흐름을 이어 보려고 예전 홈 폼과 같은 form_type 을 쓴다.
const FORM_TYPE = "direct";

function buildMessage(f: Form) {
  const when = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  return [
    f.workType && `[공사 구분] ${f.workType}`,
    f.size && `[평수] ${f.size}`,
    f.start && `[공사 시작 희망] ${f.start}`,
    f.dream.trim() && `[원하는 분위기·참고 매장] ${f.dream.trim()}`,
    `[동의] 개인정보 수집·이용(필수), 시공사 제공(필수) — (주)디자인드비 등 브랜드각 협력 시공사 · ${when}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function ApplyForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);
  const [form, setForm] = useState<Form>(initial);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentPartner, setConsentPartner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const captcha = useTurnstile(formRef);

  // 폼이 실제로 화면에 보였는지 한 번만 남긴다.
  useEffect(() => {
    const el = formRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("form_view", { form_type: FORM_TYPE });
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function onFirstInput() {
    captcha.setWanted(true);
    if (startedRef.current) return;
    startedRef.current = true;
    track("form_start", { form_type: FORM_TYPE });
  }

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!consentPrivacy || !consentPartner) {
      setError("필수 동의 두 곳에 표시해 주세요.");
      return;
    }
    setLoading(true);
    track("form_submit", { form_type: FORM_TYPE });
    try {
      const captchaToken = captcha.token();
      // 위젯이 연결 실패로 확정된 손님은 캡차 없이 접수(서버가 [캡차 미확인]으로 표시) — 2026-10-11 대표 결정
      const captchaUnavailable = Boolean(captcha.enabled && !captchaToken && captcha.failed);
      if (captcha.enabled && !captchaToken && !captchaUnavailable) {
        track("form_error", { form_type: FORM_TYPE, reason: "captcha_missing" });
        setError("잠시만요, 봇 방지 확인이 끝나면 다시 눌러주세요.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          industry: form.industry,
          location: form.region.trim(),
          message: buildMessage(form),
          source: readSource(),
          company_website: honeypotRef.current?.value || "", // 허니팟
          captchaToken,
          captchaUnavailable,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        track("form_error", { form_type: FORM_TYPE, reason: `http_${res.status}` });
        throw new Error(data.error || "신청 중 문제가 생겼어요. 잠시 뒤 다시 눌러 주세요.");
      }
      router.push("/complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "잠시 뒤 다시 눌러 주세요.");
      setLoading(false);
      captcha.reset();
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onInput={onFirstInput} className="grid gap-5">
      {/* 허니팟 — 사람 눈에 안 보이는 칸. 봇이 채우면 서버가 폐기한다. */}
      <div aria-hidden className="pointer-events-none absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">회사명 (입력하지 마세요)</label>
        <input ref={honeypotRef} id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="apply-name" className={LABEL}>
            이름<span aria-hidden>*</span>
          </Label>
          <Input id="apply-name" name="name" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="홍길동" required className={LINE} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="apply-phone" className={LABEL}>
            연락처<span aria-hidden>*</span>
          </Label>
          <Input
            id="apply-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="010-1234-5678"
            required
            className={LINE}
          />
        </div>
      </div>

      <ChoiceChips name="work_type" legend="공사 구분" options={WORK_TYPES} value={form.workType} onChange={(v) => set("workType", v)} />

      <ChoiceChips name="industry" legend="업종" options={INDUSTRIES} value={form.industry} onChange={(v) => set("industry", v)} />

      <ChoiceChips name="size" legend="평수" options={SIZE_OPTIONS} value={form.size} onChange={(v) => set("size", v)} />

      <div className="grid gap-1.5">
        <Label htmlFor="apply-region" className={LABEL}>지역</Label>
        <Input id="apply-region" name="region" autoComplete="address-level2" value={form.region} onChange={(e) => set("region", e.target.value)} placeholder="예: 서울 성수동" className={LINE} />
      </div>

      <ChoiceChips name="start" legend="공사 시작 희망" options={START_TIMING} value={form.start} onChange={(v) => set("start", v)} />

      <div className="grid gap-1.5">
        <Label htmlFor="apply-dream" className={LABEL}>원하는 분위기나 참고하는 매장 (선택)</Label>
        <Textarea
          id="apply-dream"
          name="dream"
          rows={1}
          maxLength={700}
          value={form.dream}
          onChange={(e) => set("dream", e.target.value)}
          placeholder="예: 원목에 밝은 톤, 오래 머무는 카페"
          className={cn(LINE, "min-h-[46px] resize-y py-2.5")}
        />
      </div>

      <ConsentNotice
        privacy={consentPrivacy}
        partner={consentPartner}
        onPrivacy={setConsentPrivacy}
        onPartner={setConsentPartner}
      />

      {/* 봇 방지 캡차 (사이트 키 있을 때만 표시) */}
      {captcha.enabled && (
        <>
          {captcha.wanted && (
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={captcha.render} />
          )}
          <div ref={captcha.captchaRef} />
          {captcha.failed && (
            <p className="border-l-2 border-foreground py-1 pl-4 text-sm leading-relaxed text-foreground/80">
              봇 방지 확인이 이 브라우저에서 연결되지 않고 있어요. 그대로 신청하셔도 접수됩니다. 불편하시면{" "}
              <a href={`tel:${site.business.phone}`} className="font-semibold text-foreground underline underline-offset-4">
                {site.business.phone}
              </a>
              로 전화·문자 주시면 바로 연락드립니다.
            </p>
          )}
        </>
      )}

      {error && (
        <p role="alert" className="border-l-2 border-destructive py-1 pl-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-1">
        <Button type="submit" className="h-auto w-full py-[15px] text-[15px] font-semibold hover:bg-primary/85" disabled={loading}>
          {loading ? "보내는 중…" : CTA_LABEL}
        </Button>
        <p className="mt-2 text-center text-[13px] text-muted-foreground">상담은 무료입니다. 영업일 하루 안에 직접 전화드립니다.</p>
      </div>
    </form>
  );
}
