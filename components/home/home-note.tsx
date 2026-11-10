import { BUILDER } from "@/lib/portfolio";
import { site } from "@/lib/site";

// 사람이 쓴 글 한 단락 — 소제목·번호·비교표 대신 (2026-11-10 B안 지시서 5번 문구 그대로).
export function HomeNote() {
  return (
    <section className="container mt-12 md:mt-24">
      <div className="max-w-2xl border-t border-border pt-8 text-[15px] leading-[1.8] text-[#333] md:pt-12">
        <p>처음 가게를 여는 분들이 자주 하는 말이 있습니다. &ldquo;포트폴리오만 봐서는 감이 안 와요.&rdquo;</p>
        <p className="mt-[1.8em]">
          그래서 저희는 사진보다 사장님 가게 이야기부터 듣습니다. 어떤 손님이 오는 가게인지, 정해 주신 예산 안에서 어디에 힘을 줄지.
        </p>
        <p className="mt-[1.8em]">
          사업 쪽은 <b className="font-bold text-foreground">국가공인 경영지도사</b>가, 공간은 위 매장들을 지은{" "}
          <b className="font-bold text-foreground">{BUILDER}</b>
          {site.showLicense && "(실내건축공사업 등록)"}가 맡습니다.
        </p>
        <p className="mt-4 text-right text-[13px] text-muted-foreground">— 브랜드각</p>
      </div>
    </section>
  );
}
