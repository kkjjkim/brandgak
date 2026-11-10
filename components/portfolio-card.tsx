import { cn } from "@/lib/utils";
import { portfolioImage, portfolioMeta, type PortfolioCase } from "@/lib/portfolio";

// 시공 사례 한 장 — 홈과 /portfolio 가 같은 캡션 형식을 쓴다(2026-11-10 B안 시안 mockB).
// 사진 크게(4:3), 아래에 이름·메타·한 줄. 카드 상자·둥근 모서리 없이.
export function PortfolioCard({
  item,
  sizes,
  className,
}: {
  item: PortfolioCase;
  sizes: string;
  className?: string;
}) {
  const img = portfolioImage(item.photo);
  return (
    <figure className={cn("m-0", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={sizes}
        alt={`${item.brand} ${item.place} ${item.kind}`}
        loading="lazy"
        className="block aspect-[4/3] w-full bg-secondary object-cover"
      />
      <figcaption className="pt-2.5">
        <b className="block text-[15px] font-bold">{item.brand}</b>
        <span className="mb-1.5 mt-0.5 block text-[12.5px] text-[#888]">{portfolioMeta(item)}</span>
        <p className="text-[14px] leading-[1.65] text-[#333]">{item.line}</p>
      </figcaption>
    </figure>
  );
}
