import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioCard } from "@/components/portfolio-card";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbLd } from "@/lib/seo";
import { BUILDER, PORTFOLIO } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "시공 사례 — 직접 시공한 매장 8곳",
  description: `${BUILDER}가 직접 시공한 매장 8곳. Bath & Body Works, THE SIENA, Yellow Basket, Mofun. 8평부터 32평까지.`,
  alternates: { canonical: "/portfolio" },
};

// 시공 사례 — 홈 목록과 같은 데이터·캡션 형식(lib/portfolio.ts). 여기서는 8곳 전부 (2026-11-10 B안).
export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "시공 사례", path: "/portfolio" }])} />
      <section className="container pt-24 md:pt-36">
        <h1 className="text-[25px] font-bold leading-[1.4] tracking-[-0.03em] md:text-[40px]">시공 사례</h1>
        <p className="mt-2 text-[15px] text-[#444]">{BUILDER}가 직접 시공한 매장입니다.</p>

        <ul className="mt-8 grid gap-y-[34px] md:mt-14 md:grid-cols-2 md:gap-x-8 md:gap-y-14">
          {PORTFOLIO.map((p) => (
            <li key={p.slug}>
              <PortfolioCard item={p} sizes="(min-width: 768px) 50vw, 100vw" />
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-sm border-t border-border pt-8 md:mt-20">
          <p className="text-[20px] font-bold tracking-[-0.02em]">어떤 가게를 준비하세요?</p>
          <Link
            href="/#apply"
            className="mt-5 block bg-primary py-[15px] text-center text-[15px] font-semibold text-primary-foreground hover:bg-primary/85"
          >
            무료 상담 신청
          </Link>
        </div>
      </section>
    </>
  );
}
