import Link from "next/link";
import { site, footerNavItems } from "@/lib/site";
import { INDUSTRIES } from "@/lib/industries";
import { BUILDER, BUILDER_ADDRESS } from "@/lib/portfolio";

// 꼬리말 (2026-11-10 B안): 연회색 바탕, 12px 회색 글씨. 사업자·시공사 정보 + 한 줄 메뉴.
export function SiteFooter() {
  return (
    <footer className="mt-10 bg-secondary md:mt-24">
      <div className="container py-6 text-[12px] leading-[1.8] text-[#777] md:py-10">
        <p>
          {site.brandName} · {site.business.name} · 사업자등록번호 {site.business.registration}
          <br />
          {site.business.address} ·{" "}
          <a href={`tel:${site.business.phone}`} className="hover:text-foreground">
            {site.business.phone}
          </a>
          <br />
          시공 {BUILDER} · {BUILDER_ADDRESS}
        </p>

        <nav aria-label="사이트 메뉴" className="mt-3 flex flex-wrap gap-x-4">
          {footerNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="py-1 hover:text-foreground">
              {item.label}
            </Link>
          ))}
          {site.social.instagram && (
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="py-1 hover:text-foreground">
              인스타그램
            </a>
          )}
          {site.social.threads && (
            <a href={site.social.threads} target="_blank" rel="noopener noreferrer" className="py-1 hover:text-foreground">
              스레드
            </a>
          )}
          {site.social.blog && (
            <a href={site.social.blog} target="_blank" rel="noopener noreferrer" className="py-1 hover:text-foreground">
              블로그
            </a>
          )}
        </nav>

        {/* 업종별 랜딩 — 전 페이지에서 링크해야 구글이 크롤링·색인한다.
            (10/8 서치콘솔: /service 에서만 링크돼 5개 전부 "발견됨-색인 안 됨") */}
        <nav aria-label="업종별 인테리어" className="mt-1 flex flex-wrap gap-x-3 text-[11px] text-[#999]">
          {INDUSTRIES.map((i) => (
            <Link key={i.slug} href={`/interior/${i.slug}`} className="py-1 hover:text-foreground">
              {i.keyword}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
