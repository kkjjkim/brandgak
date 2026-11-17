import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PortfolioCard } from "@/components/portfolio-card";
import { breadcrumbLd } from "@/lib/seo";
import { INDUSTRIES } from "@/lib/industries";
import { BUILDER, PORTFOLIO, portfolioImage } from "@/lib/portfolio";
import { CTA_LABEL, site } from "@/lib/site";

// 2026-11-17 다시 씀: 예전 서비스 페이지는 "창업 컨설팅·브랜드 컨설팅·공간 설계" 세 가지를 따로 팔아
// 권리금·정책자금·사업계획서 상담까지 끌어왔고, 번호 카드·만든 이미지(대표가 11/10 "AI 티"로 지적한 요소)가 남아 있었다.
// 이제 "매장 인테리어 디자인·시공" 하나만, 홈 B안과 같은 흰 바탕·사진·글 단락으로 보여준다.
export const metadata: Metadata = {
  title: "서비스 — 매장 인테리어 디자인·시공",
  description:
    "카페·식당·뷰티·리테일 매장의 인테리어 디자인과 시공. 상담부터 디자인, 시공까지 한 팀이 이어서 맡습니다. 시공 (주)디자인드비(실내건축공사업 등록).",
  alternates: { canonical: "/service" },
};

const HERO = portfolioImage("bbw-centum");
const P = "text-[15px] leading-[1.8] text-[#333]";
const H2 = "text-[20px] font-bold tracking-[-0.02em] md:text-[26px]";

export default function ServicePage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "서비스", path: "/service" }])} />

      <section className="pt-16 md:pt-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO.src}
          srcSet={HERO.srcSet}
          sizes="100vw"
          alt="Bath & Body Works 신세계 센텀시티 매장"
          fetchPriority="high"
          className="block h-[320px] w-full object-cover md:h-[56vh]"
        />
        <div className="container pt-7 md:pt-14">
          <p className="mb-2 text-[13px] text-[#666]">서비스</p>
          <h1 className="text-[25px] font-bold leading-[1.4] tracking-[-0.03em] md:text-[40px]">
            매장 인테리어를
            <br />
            디자인하고 시공합니다
          </h1>
          <p className={`mt-3 max-w-2xl ${P}`}>
            카페·식당·뷰티·리테일 매장. 상담부터 디자인, 시공까지 한 팀이 이어서 맡습니다.
          </p>
          <p className="mt-2 text-[12.5px] text-[#888]">사진: Bath &amp; Body Works 신세계 센텀시티 · 시공 {BUILDER}</p>
        </div>
      </section>

      <section className="container mt-12 md:mt-20">
        <div className="max-w-2xl border-t border-border pt-8 md:pt-12">
          <h2 className={H2}>맡는 일</h2>
          <dl className="mt-5 grid gap-6">
            <div>
              <dt className="text-[15px] font-bold">상담</dt>
              <dd className={`mt-1 ${P}`}>
                업종과 평수, 자리, 오픈 일정을 듣고 매장의 방향을 같이 잡습니다. 국가공인 경영지도사가 함께해서, 어떤 손님이 오는
                매장인지까지 놓고 이야기합니다.
              </dd>
            </div>
            <div>
              <dt className="text-[15px] font-bold">디자인</dt>
              <dd className={`mt-1 ${P}`}>평면과 동선, 재료, 조명, 간판까지 매장 하나의 방향으로 그립니다.</dd>
            </div>
            <div>
              <dt className="text-[15px] font-bold">시공</dt>
              <dd className={`mt-1 ${P}`}>
                백화점 브랜드 매장을 지어 온 {BUILDER}
                {site.showLicense && "(실내건축공사업 등록)"}가 짓고, 매장 가구도 만듭니다.
              </dd>
            </div>
          </dl>
          <p className={`mt-8 ${P}`}>
            진행은 상담, 현장 확인, 디자인, 계약, 시공, 오픈 순서입니다. 필요한 부분만 맡기셔도 됩니다.
          </p>
        </div>
      </section>

      <section className="container mt-12 md:mt-20">
        <div className="border-t border-border pt-8 md:pt-12">
          <h2 className={H2}>직접 시공한 매장</h2>
          <ul className="mt-6 grid gap-y-[34px] md:grid-cols-3 md:gap-x-6">
            {PORTFOLIO.filter((p) => p.slug !== "bbw-centum").slice(1, 4).map((p) => (
              <li key={p.slug}>
                <PortfolioCard item={p} sizes="(min-width: 768px) 33vw, 100vw" />
              </li>
            ))}
          </ul>
          <Link href="/portfolio" className="mt-6 inline-block py-2 text-[14px] underline underline-offset-4">
            시공 사례 전체 보기
          </Link>
        </div>
      </section>

      {/* 업종별 안내 — "미용실 인테리어"처럼 좁은 검색어로 들어온 사람이 자기 업종으로 바로 가게 한다. */}
      <section className="container mt-12 md:mt-20">
        <div className="max-w-2xl border-t border-border pt-8 md:pt-12">
          <h2 className={H2}>업종별 안내</h2>
          <ul className="mt-5 grid gap-3">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <Link href={`/interior/${i.slug}`} className="group block">
                  <span className="text-[15px] font-bold underline-offset-4 group-hover:underline">{i.keyword}</span>
                  <span className="mt-0.5 block text-[14px] leading-[1.7] text-[#666]">{i.headline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container mt-12 md:mt-20">
        <div className="max-w-sm border-t border-border pt-8">
          <p className="text-[20px] font-bold tracking-[-0.02em]">어떤 매장을 준비하세요?</p>
          <Link
            href="/#apply"
            className="mt-5 block bg-primary py-[15px] text-center text-[15px] font-semibold text-primary-foreground hover:bg-primary/85"
          >
            {CTA_LABEL}
          </Link>
          <p className="mt-2 text-center text-[13px] text-muted-foreground">상담은 무료입니다.</p>
        </div>
      </section>
    </>
  );
}
