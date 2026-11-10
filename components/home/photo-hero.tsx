import { site } from "@/lib/site";
import { BUILDER, portfolioImage } from "@/lib/portfolio";

// 홈 첫 화면 — 직접 시공한 매장 사진 한 장 + 짧은 문장 (2026-11-10 승인 시안 mock_hero_approved.jpg).
// 연출 이미지가 아니라 실제 시공 사진이라 캡션에 시공사·연도를 밝힌다.
const HERO = portfolioImage("yellowbasket-garosu");

export function PhotoHero() {
  const ask = site.kakaoUrl
    ? { href: site.kakaoUrl, label: "카톡으로 먼저 물어보기", external: true }
    : { href: `tel:${site.business.phone}`, label: "전화로 먼저 물어보기", external: false };

  return (
    <section className="pt-16 md:pt-20">
      <div className="lg:container lg:grid lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16 lg:py-16">
        <figure className="relative lg:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO.src}
            srcSet={HERO.srcSet}
            sizes="(min-width: 1024px) 55vw, 100vw"
            alt="Yellow Basket 가로수길 매장. 나무로 만든 곡선 진열대가 놓인 밝은 매장"
            fetchPriority="high"
            className="aspect-[3/2] w-full object-cover lg:aspect-[4/3] lg:rounded-lg"
          />
          <figcaption className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded bg-foreground/70 px-2.5 py-1 text-[0.8125rem] leading-snug text-background">
            Yellow Basket 가로수길 · 시공 {BUILDER} · 2022
          </figcaption>
        </figure>

        <div className="container pb-14 pt-9 lg:order-1 lg:max-w-none lg:px-0 lg:py-0">
          <h1 className="font-display text-[2.1rem] font-semibold leading-[1.3] tracking-[-0.02em] sm:text-5xl sm:leading-[1.25]">
            포트폴리오만 봐서는
            <br />
            감이 안 오시죠?
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/75">
            첫 상담에 사장님 가게로 그린 컨셉 한 장을 들고 갑니다. 얼마를 어디에 써야 후회가 없는지도 같이 봅니다.
          </p>

          <div className="mt-9 grid gap-3 sm:max-w-md">
            <a
              href="#apply"
              className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-primary/90 active:scale-[0.98]"
            >
              내 가게 컨셉 한 장 받기
            </a>
            <a
              href={ask.href}
              {...(ask.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-14 items-center justify-center rounded-md border border-foreground/20 bg-background px-6 text-base font-medium text-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-foreground/5 active:scale-[0.98]"
            >
              {ask.label}
            </a>
          </div>

          {/* 증거 줄 — 직접 시공한 것만 (PDF 19쪽 이후 이전 회사 경력·설계만 한 곳은 쓰지 않는다) */}
          <dl className="mt-10 space-y-1.5 border-t border-border pt-6 text-[0.9375rem] leading-relaxed text-foreground/60">
            <div>
              <dt className="sr-only">시공</dt>
              <dd>
                <b className="font-semibold text-foreground">시공 {BUILDER}</b>
                {site.showLicense && " · 실내건축공사업 등록"}
              </dd>
            </div>
            <div>
              <dt className="sr-only">시공한 브랜드</dt>
              <dd>Bath &amp; Body Works · THE SIENA · Yellow Basket · Mofun</dd>
            </div>
            <div>
              <dt className="sr-only">규모</dt>
              <dd className="font-semibold text-foreground">직접 시공한 매장 8곳, 8평부터 32평까지</dd>
            </div>
            <div>
              <dt className="sr-only">사업 계획</dt>
              <dd>사업 계획 · 국가공인 경영지도사</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
