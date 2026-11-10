import { cn } from "@/lib/utils";
import { portfolioImage, type PortfolioCase } from "@/lib/portfolio";

// 시공 사례 카드 — 홈 목록과 /portfolio 가 같은 카드를 쓴다.
// detail: /portfolio 에서만 담당 범위를 함께 보인다.
export function PortfolioCard({
  item,
  image = item.images[0],
  detail = false,
  sizes,
  className,
}: {
  item: PortfolioCase;
  image?: string;
  detail?: boolean;
  sizes: string;
  className?: string;
}) {
  const img = portfolioImage(image);
  return (
    <figure className={cn("flex flex-col", className)}>
      <div className="overflow-hidden rounded-lg bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes={sizes}
          alt={`${item.brand} ${item.place} 매장`}
          loading="lazy"
          className="aspect-[3/2] w-full object-cover"
        />
      </div>
      <figcaption className="mt-3">
        <p className="text-[1.0625rem] font-semibold">{item.brand}</p>
        <p className="mt-0.5 text-[0.9375rem] text-foreground/65">
          {item.place} · {item.pyeong}평 · {item.year}
        </p>
        {detail && <p className="mt-0.5 text-[0.9375rem] text-foreground/65">{item.role}</p>}
      </figcaption>
    </figure>
  );
}
