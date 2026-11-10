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

// 시공 사례 — 홈 목록과 같은 데이터(lib/portfolio.ts). 여기서는 사진을 크게, 담당 범위까지 보인다.
export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "시공 사례", path: "/portfolio" }])} />
      <section className="pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="container">
          <h1 className="font-display text-[2rem] font-semibold leading-[1.3] tracking-[-0.02em] sm:text-5xl">
            사장님 가게 크기의 매장을, 백화점 기준으로.
          </h1>
          <p className="mt-5 text-[1.0625rem] text-foreground/70">
            시공 {BUILDER} · 직접 시공한 매장 8곳, 8평부터 32평까지
          </p>

          <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {PORTFOLIO.flatMap((p) =>
              p.images.map((image) => (
                <li key={image}>
                  <PortfolioCard item={p} image={image} detail sizes="(min-width: 768px) 50vw, 100vw" />
                </li>
              ))
            )}
          </ul>

          <div className="mt-16 border-t border-border pt-10">
            <p className="font-display text-2xl font-semibold">어떤 가게를 준비하세요?</p>
            <Link
              href="/#apply"
              className="mt-6 inline-flex h-14 items-center justify-center rounded-md bg-primary px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              내 가게 컨셉 한 장 받기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
