import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CTA_LABEL } from "@/lib/site";
import { portfolioImage } from "@/lib/portfolio";

// 배경은 실제 시공 사진(2026-11-17). 예전 저녁 장면은 만든 이미지라 "AI 티" 지적(11/10)과 맞지 않았다.
const BG = portfolioImage("bbw-centum");

// 서브 페이지 끝마다 두는 신청 진입점 (모든 페이지에 "무료 상담" 진입점).
// 전환 핵심이라 모션으로 숨기지 않고 항상 노출한다. 홈 첫 화면의 저녁 장면으로 이야기를 닫는다.
// offer: "무료 상담"이라는 막연한 말 대신, 지금 읽은 글의 상황에서 바로 받을 수 있는 구체적인 것 한 줄
// (2026-10-27 대표: "상담 문의를 적극적으로 하게 만들어야" → 글마다 제안을 구체화). 없으면 기본 문구.
export function CtaSection({ offer }: { offer?: string } = {}) {
  return (
    <section className="relative isolate overflow-hidden bg-foreground text-background">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BG.src}
        srcSet={BG.srcSet}
        sizes="100vw"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55"
        style={{ objectPosition: "50% 50%" }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-[#120e0b]/95 via-[#120e0b]/70 to-[#120e0b]/30" />
      <div className="container py-28 md:py-36">
        <div className="max-w-2xl">
          <h2 className="font-display text-[2rem] font-semibold leading-[1.25] tracking-[-0.02em] sm:text-5xl">
            잘되는 가게는,
            <br />
            공사 전에 정해집니다.
          </h2>
          <p className="mt-6 max-w-lg text-[1.0625rem] leading-[1.8] text-background/75">
            {offer ?? "업종과 평수만 알려주세요. 그 매장에 맞는 디자인 방향과 진행 순서를 상담에서 같이 잡습니다."}
          </p>
          {offer && (
            <p className="mt-3 max-w-lg text-[0.9375rem] leading-[1.7] text-background/60">
              상담은 무료입니다. 영업일 하루 안에 직접 전화드리고, 진행 여부는 그다음에 정하시면 됩니다.
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/#apply" // 어두운 사진 위라 B안 검정 버튼 대신 흰 버튼
              className={cn(buttonVariants({ size: "lg" }), "bg-background text-foreground hover:bg-background/85")}>
              {CTA_LABEL}
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-background/90 underline-offset-4 hover:text-background hover:underline"
            >
              시공 사례 보기
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
