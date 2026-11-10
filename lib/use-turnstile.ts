"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/track";

// 봇 방지 캡차(Cloudflare Turnstile) — 홈 신청 폼용. components/lead-form.tsx 와 같은 동작을 훅으로 옮긴 것.
// (lead-form 은 진단·업종 페이지에서 잘 돌고 있어 건드리지 않았다.)
// - 스크립트는 폼이 화면 가까이 오거나 입력을 시작할 때만 불러온다(휴대폰 첫 화면 속도).
// - 위젯은 마운트마다 직접 그린다(자동 렌더링은 페이지 이동 뒤 안 그려져 신청이 막혔다).
// - 손님 브라우저가 Cloudflare 에 닿지 못하면 failed=true → 서버가 [캡차 미확인]으로 받는다.
export const TURNSTILE_SITE_KEY =
  site.analytics.turnstileSiteKey || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function useTurnstile(formRef: React.RefObject<HTMLElement>) {
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [wanted, setWanted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = formRef.current;
    if (!TURNSTILE_SITE_KEY || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWanted(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [formRef]);

  const render = useCallback(() => {
    const el = captchaRef.current;
    if (!TURNSTILE_SITE_KEY || !el || !window.turnstile) return;
    if (widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(el, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "auto",
      "error-callback": () => {
        setFailed(true);
        track("form_error", { form_type: "captcha", reason: "widget_error" });
      },
      callback: () => setFailed(false),
    });
  }, []);

  useEffect(() => {
    render();
    return () => {
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [render]);

  function token() {
    return (widgetIdRef.current && window.turnstile?.getResponse(widgetIdRef.current)) || "";
  }

  function reset() {
    // 토큰은 한 번만 쓸 수 있어서, 실패 후 다시 누르려면 새 토큰이 필요하다.
    if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
  }

  return { enabled: Boolean(TURNSTILE_SITE_KEY), captchaRef, wanted, setWanted, failed, render, token, reset };
}
