import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { CHECKLIST, CHECKLIST_COUNT, CHECKLIST_SUBTITLE, CHECKLIST_TITLE } from "@/lib/checklist";

// 체크리스트 자료 페이지. 글 끝에서 이메일을 남긴 사람에게 메일로 이 주소를 보낸다.
// 검색에는 내보내지 않는다 — 검색으로 바로 열리면 이메일을 남길 이유가 없어진다.
export const metadata: Metadata = {
  title: `${CHECKLIST_TITLE} | 브랜드각`,
  description: CHECKLIST_SUBTITLE,
  robots: { index: false, follow: true },
};

export default function ChecklistPage() {
  return (
    <>
      <PageHero eyebrow="체크리스트" title={CHECKLIST_TITLE} subtitle={CHECKLIST_SUBTITLE} compact />
      <Section>
        <div className="mx-auto max-w-2xl">
          <p className="text-sm text-foreground/60">
            총 {CHECKLIST_COUNT}가지. 인쇄해서 자리 보러 갈 때 들고 가세요. 항목마다 근거가 되는 글을 아래에 적어 두었습니다.
          </p>
          <ol className="mt-10 space-y-12">
            {CHECKLIST.map((group) => (
              <li key={group.title}>
                <h2 className="font-display text-2xl font-semibold text-foreground">{group.title}</h2>
                <p className="mt-2 text-[0.9375rem] leading-[1.7] text-foreground/70">{group.why}</p>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[1.0625rem] leading-[1.7]">
                      <span
                        aria-hidden
                        className="mt-[0.45rem] h-4 w-4 flex-none rounded-[3px] border border-foreground/40 print:border-foreground"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {group.read && (
                  <p className="mt-4 text-sm">
                    <Link href={`/insights/${group.read.slug}`} className="font-medium text-primary hover:underline">
                      더 읽기: {group.read.title} →
                    </Link>
                  </p>
                )}
              </li>
            ))}
          </ol>
          <div className="mt-14 rounded-lg border border-border bg-secondary/40 p-6 md:p-8 print:hidden">
            <p className="text-lg font-semibold leading-snug">체크하다 막히는 항목이 있으면</p>
            <p className="mt-2 text-sm text-foreground/70">
              그 자리에 내 업종이 되는지, 권리금이 맞는 값인지, 계약서에 뭘 넣어야 하는지 — 계약 전에 같이 봐드립니다. 비용은 없습니다.
            </p>
            <Link href="/#apply" className={buttonVariants({ className: "mt-5" })} data-cta="checklist_apply">
              무료 상담 문의
            </Link>
          </div>
        </div>
      </Section>
      <CtaSection />
    </>
  );
}
