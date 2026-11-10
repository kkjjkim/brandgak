"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navItems, site } from "@/lib/site";
import { useApplyLink } from "@/components/layout/use-apply-link";

// 머리말 (2026-11-10 B안): 왼쪽 "브랜드각", 오른쪽 "시공 사례"·"상담". 카카오 채널이 있을 때만 "카톡"을 더한다.
// 메뉴가 두 개뿐이라 휴대폰에서도 접지 않고 그대로 보인다. 나머지 페이지는 꼬리말에서 연결.
export function SiteHeader() {
  const apply = useApplyLink();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "상담"은 지금 페이지에 폼이 있으면 그리로 내려간다(진단 결과를 버리지 않게)
  const linkProps = (href: string) =>
    href === "/#apply" ? { href: apply.href, onClick: apply.onClick } : { href };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b bg-background",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="py-2 text-[17px] font-bold tracking-[-0.01em]">
          {site.brandName}
        </Link>

        <nav className="flex items-center gap-1 text-[14px] text-[#555] md:gap-4">
          {navItems.map((item) => (
            <Link key={item.href} {...linkProps(item.href)} className="px-2 py-3 hover:text-foreground">
              {item.label}
            </Link>
          ))}
          {site.kakaoUrl && (
            <a href={site.kakaoUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-3 hover:text-foreground">
              카톡
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
