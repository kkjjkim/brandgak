import type { Metadata } from "next";
import { PhotoHero } from "@/components/home/photo-hero";
import { PortfolioList } from "@/components/home/portfolio-list";
import { HomeNote } from "@/components/home/home-note";
import { ApplyForm } from "@/components/home/apply-form";
import { site } from "@/lib/site";

// 2026-11-10 B안(docs/redesign-1110-b-spec.md): 사진이 화면 대부분, 프로젝트마다 이름·메타·한 줄, 글 한 단락, 폼.
// 두 장·질문·예산·단계·FAQ 블록은 "AI로 만든 티"의 원인이라 홈에서 뺐다(컴포넌트 파일은 되돌릴 때를 위해 남김).
// FAQ 구조화 데이터도 같이 뺐다 — 화면에 없는 질문을 데이터로만 내보내면 검색 지침 위반이다.

export const metadata: Metadata = {
  title: "창업 컨설팅·브랜드 컨설팅·공간 디자인 | 브랜드각",
  description:
    "국가공인 경영지도사가 창업·사업 전략부터 브랜드 컨셉, 공간 디자인·인테리어 시공까지 한 흐름으로 함께합니다. 창업 첫걸음부터 오픈까지, 전국 상담.",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
};

export default function HomePage() {
  return (
    <>
      <PhotoHero />
      <PortfolioList />
      <HomeNote />

      <section id="apply" className="container scroll-mt-20 pt-9 md:pt-24">
        <div className="max-w-2xl">
          <h2 className="mb-[18px] text-[20px] font-bold tracking-[-0.02em] md:text-[28px]">어떤 가게를 준비하세요?</h2>
          <ApplyForm />
        </div>
      </section>
    </>
  );
}
