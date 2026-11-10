import Link from "next/link";
import { PortfolioCard } from "@/components/portfolio-card";
import { PORTFOLIO } from "@/lib/portfolio";

// 홈 시공 사례 — 직접 시공한 8곳. 휴대폰에서는 옆으로 넘겨 보고, PC에서는 4열로 한 번에 본다.
export function PortfolioList() {
  return (
    <section id="portfolio" className="scroll-mt-20 bg-secondary/40 py-20 md:py-28">
      <div className="container">
        <h2 className="font-display text-[1.75rem] font-semibold leading-[1.35] tracking-[-0.02em] sm:text-4xl">
          사장님 가게 크기의 매장을, 백화점 기준으로.
        </h2>
      </div>
      {/* 휴대폰: 가로 스크롤(이 줄 안에서만 넘친다). 다음 카드가 살짝 보여 넘길 수 있다는 걸 알린다. */}
      <ul className="container mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible lg:grid-cols-4">
        {PORTFOLIO.map((p) => (
          <li key={p.slug} className="w-[78%] shrink-0 snap-start md:w-auto">
            <PortfolioCard item={p} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 78vw" />
          </li>
        ))}
      </ul>
      <div className="container mt-8">
        <Link
          href="/portfolio"
          className="inline-flex h-12 items-center gap-2 rounded-md border border-foreground/20 px-5 font-medium transition-colors hover:bg-foreground/5"
        >
          시공 사례 전체 보기 <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
