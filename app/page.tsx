import type { Metadata } from "next";
import { PhotoHero } from "@/components/home/photo-hero";
import { TwoSheets } from "@/components/home/two-sheets";
import { PortfolioList } from "@/components/home/portfolio-list";
import { DifferentQuestion } from "@/components/home/different-question";
import { BudgetLine } from "@/components/home/budget-line";
import { Steps } from "@/components/home/steps";
import { ApplyForm } from "@/components/home/apply-form";
import { JsonLd } from "@/components/json-ld";
import { faqLd } from "@/lib/seo";
import { site } from "@/lib/site";

// 2026-11-10 홈 개편(docs/redesign-1110-spec.md): 실제 시공 사진 한 장 + 짧은 문장.
// 스케치 히어로·7가지 각·컨셉 보드·약속 블록은 홈에서 뺐다(컴포넌트 파일은 다른 페이지가 쓰거나 되돌릴 때를 위해 남김).

export const metadata: Metadata = {
  title: "창업 컨설팅·브랜드 컨설팅·공간 디자인 | 브랜드각",
  description:
    "국가공인 경영지도사가 창업·사업 전략부터 브랜드 컨셉, 공간 디자인·인테리어 시공까지 한 흐름으로 함께합니다. 창업 첫걸음부터 오픈까지, 전국 상담.",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
};

// 자주 묻는 질문 — 지시서 8번의 다섯 개만. 화면과 구조화 데이터(검색·AI 답변)가 같은 글을 쓴다.
const FAQS = [
  { q: "상담 비용이 있나요?", a: "없습니다." },
  { q: "작은 평수도 하나요?", a: "8평 매장도 지었습니다. 평수보다 어떤 가게인지가 먼저입니다." },
  { q: "지방도 되나요?", a: "상담은 전국, 시공은 현장 지역과 협의합니다." },
  { q: "브랜드 작업은 따로 비용이 드나요?", a: "시공을 맡기시면 컨셉과 이름 방향까지 함께 잡습니다." },
  { q: "정책자금도 볼 수 있나요?", a: "경영지도사가 대상 여부를 같이 봅니다." },
];

export default function HomePage() {
  return (
    <>
      <PhotoHero />
      <TwoSheets />
      <PortfolioList />
      <DifferentQuestion />
      <BudgetLine />
      <Steps />

      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="container">
          <h2 className="font-display text-[1.75rem] font-semibold leading-[1.35] tracking-[-0.02em] sm:text-4xl">
            자주 묻는 질문
          </h2>
          {/* 아코디언(details)은 글이 HTML 에 그대로 있어 검색·AI 답변이 읽을 수 있다 */}
          <div className="mt-10 max-w-3xl divide-y divide-border border-y border-border">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                  {f.q}
                  <span aria-hidden className="shrink-0 text-primary transition-transform duration-200 ease-out group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-foreground/70">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={faqLd(FAQS)} />

      <section id="apply" className="scroll-mt-20 py-20 md:py-28">
        <div className="container max-w-2xl">
          <h2 className="font-display text-[1.75rem] font-semibold leading-[1.35] tracking-[-0.02em] sm:text-4xl">
            어떤 가게를 준비하세요?
          </h2>
          <div className="mt-10">
            <ApplyForm />
          </div>
          <p className="mt-8 text-center text-foreground/70">
            전화가 편하시면{" "}
            <a href={`tel:${site.business.phone}`} className="font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline">
              {site.business.phone}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
