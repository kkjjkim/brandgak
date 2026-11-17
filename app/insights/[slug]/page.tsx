import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { InsightWorkCard } from "@/components/insight-work-card";
import { ReadTracker } from "@/components/read-tracker";
import { JsonLd } from "@/components/json-ld";
import { articleLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { InsightKeyPoints } from "@/components/insight-key-points";
import { InsightFaq } from "@/components/insight-faq";
import { RelatedInsights } from "@/components/related-insights";
import { ChecklistSignup } from "@/components/checklist-signup";
import { getAllInsights, getInsight, getRelatedInsights } from "@/lib/insights";

// 예약 글이 날짜가 되면 나타나도록 6시간마다 다시 만든다.
export const revalidate = 21600;

// 빌드 시 모든 글을 정적 생성 (빠르고 SEO 유리).
export function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getInsight(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      images: [{ url: post.cover }],
    },
  };
}

// 글 끝 상담 제안 — 읽은 글의 상황에서 바로 받을 수 있는 것 한 줄. 상담은 원래 무료라 지어낸 약속이 아니다.
// "무료 상담 문의"만으로는 진단 완료 5명 중 제출 0(10/21 실측) → 무엇을 봐 주는지 구체적으로 말한다(2026-10-27).
// 2026-11-17: 제안은 모두 "인테리어 상담"으로 모은다. 예전 문구(권리금·특약 검토, 견적서 검토, 이름 골라드림)는
// 인테리어와 상관없는 문의를 부르고, 견적 검토는 대표가 접은 방향이다(11/10). 상담에서 실제로 하는 일만 적는다.
const OFFER_BY_CATEGORY: Record<string, string> = {
  "창업 컨설팅": "자리를 보고 계시거나 정하셨다면, 그 자리에 맞는 매장 배치와 공사 범위를 상담에서 같이 봅니다.",
  "인테리어": "업종과 평수, 공사 시작 시기만 알려주세요. 그 매장에 맞는 디자인 방향과 진행 순서를 상담에서 같이 잡습니다.",
  "공간 디자인": "도면이나 현장 사진이 있으면 상담 때 같이 보며 좌석·동선·주방 배치를 이야기합니다.",
  "브랜드 컨설팅": "이름과 분위기가 정해졌다면 다음은 그게 보이는 공간입니다. 간판부터 매장 안까지 한 방향으로 디자인하고 시공합니다.",
};
const OFFER_DEFAULT = "업종과 평수만 알려주세요. 그 매장에 맞는 디자인 방향과 진행 순서를 상담에서 같이 잡습니다.";

export default function InsightPage({ params }: { params: { slug: string } }) {
  const post = getInsight(params.slug);
  if (!post) notFound();

  const html = marked.parse(post.content) as string;
  // 두 번째 소제목 앞에서 본문을 나눠 진단 카드를 끼운다(첫 단락만 읽고 나가는 사람도 보게).
  // 소제목이 두 개 미만인 짧은 글은 본문 뒤에 둔다.
  const h2s = [...html.matchAll(/<h2[\s>]/g)];
  const cut = h2s.length >= 2 ? h2s[1].index ?? html.length : html.length;
  const htmlTop = html.slice(0, cut);
  const htmlRest = html.slice(cut);

  return (
    <>
      <PageHero
        image={post.cover}
        eyebrow={post.category}
        title={post.title}
        subtitle={post.description}
        compact
      />

      <Section>
        <InsightKeyPoints points={post.summary} />
        <article
          className="prose-insight mx-auto max-w-2xl"
          dangerouslySetInnerHTML={{ __html: htmlTop }}
        />
        <InsightWorkCard />
        {htmlRest && (
          <article
            className="prose-insight mx-auto max-w-2xl"
            dangerouslySetInnerHTML={{ __html: htmlRest }}
          />
        )}
        <InsightFaq items={post.faq} />
        <ReadTracker slug={post.slug} />

        {/* 자료 받기는 글 끝에만 (대표 결정 2026-10-11). 전화번호 대신 이메일로 명단을 만든다(2026-10-27). */}
        <ChecklistSignup slug={post.slug} />

        <RelatedInsights posts={getRelatedInsights(post.slug)} />

        <div className="mx-auto mt-14 max-w-2xl border-t border-border pt-8">
          <Link
            href="/insights"
            className="text-sm font-medium text-foreground/60 hover:text-primary"
          >
            ← 인사이트 전체 보기
          </Link>
        </div>
      </Section>

      <CtaSection offer={OFFER_BY_CATEGORY[post.category] ?? OFFER_DEFAULT} />

      <JsonLd
        data={articleLd({
          slug: post.slug,
          title: post.title,
          description: post.description,
          cover: post.cover,
          date: post.date,
          updated: post.updated,
        })}
      />
      {post.faq.length > 0 && <JsonLd data={faqLd(post.faq)} />}
      <JsonLd
        data={breadcrumbLd([
          { name: "인사이트", path: "/insights" },
          { name: post.title, path: `/insights/${post.slug}` },
        ])}
      />
    </>
  );
}
