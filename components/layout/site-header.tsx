"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, site } from "@/lib/site";
import { useApplyLink } from "@/components/layout/use-apply-link";

export function SiteHeader() {
  const apply = useApplyLink();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 홈·서브페이지 모두 상단에 어두운 시네마틱 히어로가 깔린다.
  // 스크롤 전에는 그 위에 떠 있으므로 밝은 글자로 보여야 한다.
  // (히어로가 없는 /complete 등은 제외 → 기본 짙은 글자)
  // 2026-10 개편으로 모든 페이지 머리말이 밝은 종이색이 됐다 → 어두운 머리말 위 흰 글자 처리는 쓰지 않는다.
  const overDarkHero = false;

  // 오른쪽 버튼 — 카카오 채널이 생기기 전까지는 전화로 대신한다(2026-11-10 지시서).
  const quick = site.kakaoUrl
    ? { href: site.kakaoUrl, label: "카톡 문의", external: true }
    : { href: `tel:${site.business.phone}`, label: "전화 문의", external: false };
  const quickClass =
    "inline-flex h-10 items-center justify-center rounded-full border border-foreground/80 px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background active:scale-[0.97]";
  const quickButton = (
    <a
      href={quick.href}
      className={quickClass}
      {...(quick.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {quick.label}
    </a>
  );
  // "상담"은 지금 페이지에 폼이 있으면 그리로 내려간다(진단 결과를 버리지 않게)
  const linkProps = (href: string) =>
    href === "/#apply" ? { href: apply.href, onClick: apply.onClick } : { href };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "container flex h-16 items-center justify-between md:h-20",
          overDarkHero ? "text-background" : "text-foreground"
        )}
      >
        <Link href="/" className="font-serif text-xl font-semibold tracking-[0.12em]">
          {site.brandName}
        </Link>

        {/* 데스크톱 내비 */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              {...linkProps(item.href)}
              className={cn(
                "text-sm transition-colors",
                overDarkHero
                  ? "text-background/80 hover:text-background"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          {quickButton}
        </nav>

        {/* 모바일 — 시안대로 오른쪽 버튼을 먼저 보이고, 메뉴는 그 옆에 접어 둔다 */}
        <div className="flex items-center gap-2 md:hidden">
          {quickButton}
          <button
            className="inline-flex h-10 w-10 items-center justify-center"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <div className="border-t border-border bg-background text-foreground md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href === "/#apply" ? apply.href : item.href}
                onClick={(e) => {
                  setOpen(false);
                  if (item.href === "/#apply") apply.onClick(e);
                }}
                className="rounded-md px-2 py-3 text-base text-foreground/80 hover:bg-foreground/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
