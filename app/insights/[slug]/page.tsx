import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { InsightDiagnosisCard } from "@/components/insight-diagnosis-card";
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
const OFFER_BY_CATEGORY: Record<string, string> = {
  "창업 컨설팅": "보고 계신 자리가 있으면 계약 전에 봐드립니다. 이 자리에서 내 업종이 되는지, 권리금이 맞는 값인지, 특약에 뭘 넣어야 하는지.",
  "인테리어": "받으신 견적서나 계약서를 보내 주시면 빠진 항목과 위험한 조항을 짚어드립니다. 업체를 아직 못 정했어도 됩니다.",
  "공간 디자인": "평수와 도면(또는 사진)만 있어도 주방·좌석·동선을 같이 그려봅니다. 공사 전에 바꾸면 돈이 안 듭니다.",
  "브랜드 컨설팅": "이름·컨셉 후보가 있으면 손님 눈으로 같이 골라드립니다. 아직 막연해도 한 줄이면 시작됩니다.",
};
const OFFER_DEFAULT = "머릿속 구상만 들고 오세요. 자리·예산·컨셉부터 같이 잡고, 진행 여부는 그다음에 정하시면 됩니다.";

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
        <InsightDiagnosisCard />
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
