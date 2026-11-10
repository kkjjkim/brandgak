"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CTA_LABEL, site } from "@/lib/site";
import { useApplyLink } from "@/components/layout/use-apply-link";

// 스크롤을 따라다니는 고정 CTA. AvroKO식 약한 링크로 숨기지 말고 또렷하게.
export function FloatingCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  // 지금 페이지에 신청 폼(#apply)이 있으면 그리로, 없으면 홈 폼으로 (진단 결과를 버리지 않게)
  const apply = useApplyLink();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 신청 완료 페이지에서는 숨김
  if (pathname?.startsWith("/complete")) return null;

  // 카카오 채널이 생기기 전까지는 문자로 대신한다(2026-11-10 지시서)
  const chat = site.kakaoUrl
    ? { href: site.kakaoUrl, label: "카톡", external: true }
    : { href: `sms:${site.business.phone}`, label: "문자", external: false };

  return (
    <>
      {/* 휴대폰 — 하단 고정 바(전화 | 카톡 | 상담 신청). 첫 화면부터 늘 보인다. */}
      <nav
        data-print-hide
        aria-label="빠른 연락"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.4fr] bg-foreground pb-[env(safe-area-inset-bottom)] text-[0.9375rem] font-semibold md:hidden"
      >
        <a href={`tel:${site.business.phone}`} className="flex h-14 items-center justify-center text-background active:bg-background/10">
          전화
        </a>
        <a
          href={chat.href}
          className="flex h-14 items-center justify-center text-background active:bg-background/10"
          {...(chat.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {chat.label}
        </a>
        <Link
          href={apply.href}
          onClick={apply.onClick}
          className="flex h-14 items-center justify-center bg-primary text-primary-foreground active:bg-primary/85"
        >
          상담 신청
        </Link>
      </nav>

      {/* PC — 스크롤을 내리면 오른쪽 아래에 나타나는 상담 버튼 */}
      <div
        data-print-hide
        className={cn(
          "fixed bottom-6 right-6 z-40 hidden transition-[opacity,transform] duration-300 ease-out md:block",
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <Link
          href={apply.href}
          onClick={apply.onClick}
          className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
        >
          {CTA_LABEL}
        </Link>
      </div>
    </>
  );
}
