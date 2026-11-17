import Link from "next/link";
import { BUILDER, PORTFOLIO, portfolioImage } from "@/lib/portfolio";
import { CTA_LABEL } from "@/lib/site";

// 인사이트 글 중간에 끼우는 "우리가 지은 매장" 띠 (2026-11-17, 컨셉 진단 카드를 대신한다).
// 왜: 글 독자 대부분이 상호·배달 창업 같은 일반 창업 검색으로 들어온다(네이버 30일 클릭 상위).
// 진단 카드는 이들을 "무료 컨셉 상담"으로 보내서 인테리어와 상관없는 문의(매출 고민 등)가 들어왔다.
// 이제 글 중간에서 브랜드각이 매장 인테리어를 짓는 곳이라는 걸 실제 사진으로 보여주고, 인테리어 상담으로만 잇는다.
const PICKS = ["yellowbasket-garosu", "bbw-centum", "siena-lotte-jamsil"];

export function InsightWorkCard() {
  const items = PICKS.map((slug) => PORTFOLIO.find((p) => p.slug === slug)).filter(
    (p): p is (typeof PORTFOLIO)[number] => Boolean(p)
  );
  return (
    <aside className="mx-auto my-12 max-w-2xl border-y border-border py-7" aria-label="브랜드각 시공 사례">
      <p className="text-[17px] font-bold leading-snug tracking-[-0.02em]">
        브랜드각은 매장 인테리어를 디자인하고 시공합니다
      </p>
      <p className="mt-1 text-[13px] text-[#777]">{BUILDER}가 직접 시공한 매장</p>
      <ul className="mt-4 grid grid-cols-3 gap-2">
        {items.map((p) => {
          const img = portfolioImage(p.photo);
          return (
            <li key={p.slug}>
              <Link href="/portfolio" className="block" data-cta="insight_mid_portfolio">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="(min-width: 768px) 220px, 33vw"
                  alt={`${p.brand} ${p.place} ${p.kind}`}
                  loading="lazy"
                  className="block aspect-square w-full bg-secondary object-cover"
                />
                <span className="mt-1.5 block truncate text-[12px] text-[#555]">{p.brand}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href="/#apply"
          className="inline-block bg-primary px-5 py-3 text-[14px] font-semibold text-primary-foreground hover:bg-primary/85"
          data-cta="insight_mid_apply"
        >
          {CTA_LABEL}
        </Link>
        <Link href="/portfolio" className="py-2 text-[14px] underline underline-offset-4" data-cta="insight_mid_portfolio_link">
          시공 사례 보기
        </Link>
      </div>
    </aside>
  );
}
