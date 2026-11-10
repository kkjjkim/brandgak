// 다른 점 — 흔한 방식과 브랜드각의 첫 질문을 나란히 (2026-11-10 지시서 5번).
const ROWS = [
  { usual: "“몇 평이세요?”", ours: "“어떤 손님이 오는 가게를 원하세요?”" },
  { usual: "디자인 시안부터", ours: "손님이 올 이유 한 문장부터" },
  { usual: "공사만", ours: "예산과 자금 계획까지 경영지도사가 같이" },
];

export function DifferentQuestion() {
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="container">
        <h2 className="font-display text-[1.75rem] font-semibold leading-[1.35] tracking-[-0.02em] sm:text-4xl">
          시작하는 질문이 다릅니다.
        </h2>
        <div className="mt-10 max-w-3xl">
          <div className="grid grid-cols-[0.8fr_1.2fr] gap-4 border-b border-foreground/15 pb-3 text-sm text-foreground/55">
            <span>흔히</span>
            <span className="font-semibold text-primary">브랜드각</span>
          </div>
          <ul>
            {ROWS.map((r) => (
              <li
                key={r.usual}
                className="grid grid-cols-[0.8fr_1.2fr] gap-4 border-b border-foreground/10 py-5 text-[1.0625rem] leading-relaxed"
              >
                <span className="text-foreground/50">{r.usual}</span>
                <span className="font-medium text-foreground">{r.ours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
