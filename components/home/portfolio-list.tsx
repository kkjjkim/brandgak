import Link from "next/link";
import { PortfolioCard } from "@/components/portfolio-card";
import { BUILDER, PORTFOLIO } from "@/lib/portfolio";

// 홈 시공 사례 — 앞 6곳을 사진 크게. 휴대폰 1열, PC 2열 (2026-11-10 B안).
export function PortfolioList() {
  return (
    <section id="portfolio" className="container scroll-mt-20 pt-11 md:pt-24">
      <p className="mb-3.5 text-[12px] tracking-[0.02em] text-[#888]">{BUILDER}가 직접 시공한 매장</p>
      <ul className="grid gap-y-[34px] md:grid-cols-2 md:gap-x-8 md:gap-y-14">
        {PORTFOLIO.slice(0, 6).map((p) => (
          <li key={p.slug}>
            <PortfolioCard item={p} sizes="(min-width: 768px) 50vw, 100vw" />
          </li>
        ))}
      </ul>
      <Link
        href="/portfolio"
        className="mt-8 inline-block py-2 text-[14px] underline underline-offset-4 hover:text-muted-foreground md:mt-12"
      >
        시공 사례 전체 보기
      </Link>
    </section>
  );
}
