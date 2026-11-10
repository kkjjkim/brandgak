import { site } from "@/lib/site";
import { portfolioImage } from "@/lib/portfolio";

// 홈 첫 화면 — 직접 시공한 매장 사진 한 장(캡션 없음) + 짧은 소개 (2026-11-10 B안 시안 mockB).
const HERO = portfolioImage("yellowbasket-garosu");

export function PhotoHero() {
  return (
    <section className="pt-16 md:pt-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO.src}
        srcSet={HERO.srcSet}
        sizes="100vw"
        alt="Yellow Basket 가로수길 매장. 나무로 만든 곡선 진열대가 놓인 밝은 매장"
        fetchPriority="high"
        className="block h-[420px] w-full object-cover md:h-[70vh]"
      />

      <div className="container pb-2 pt-7 md:pt-14">
        <h1 className="text-[25px] font-bold leading-[1.4] tracking-[-0.03em] md:text-[40px]">
          포트폴리오만 봐서는
          <br />
          감이 안 오시죠?
        </h1>
        <p className="mb-5 mt-3 text-[15px] leading-[1.7] text-[#444] md:text-[17px]">
          사장님 가게 이야기부터 듣고, 그 가게에 맞는 방향을 같이 잡습니다.
        </p>
        <div className="md:max-w-sm">
          <a
            href="#apply"
            className="block bg-primary py-[15px] text-center text-[15px] font-semibold text-primary-foreground hover:bg-primary/85"
          >
            무료 상담 신청
          </a>
          <a
            href={`tel:${site.business.phone}`}
            className="mx-auto mt-2 block w-fit px-2 py-2.5 text-center text-[14px] underline underline-offset-4"
          >
            전화 {site.business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
