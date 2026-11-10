// 첫 상담에 드리는 두 장 — 상담을 신청하면 무엇을 받는지 먼저 보여준다 (2026-11-10 지시서 3번).
const SHEETS = [
  {
    n: "1",
    t: "컨셉 한 장",
    d: "손님이 이 가게를 한 문장으로 기억하게. 이름·색·재료 방향까지.",
  },
  {
    n: "2",
    t: "예산 한 장",
    d: "정해 주신 예산 안에서 어디에 힘을 줄지.",
  },
];

export function TwoSheets() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <h2 className="font-display text-[1.75rem] font-semibold leading-[1.35] tracking-[-0.02em] sm:text-4xl">
          첫 상담에 두 장을 드립니다.
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          {SHEETS.map((s) => (
            <li key={s.n} className="rounded-lg border border-border bg-card p-7 md:p-9">
              <span className="font-display text-lg text-primary">{s.n}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold">{s.t}</h3>
              <p className="mt-3 text-[1.0625rem] leading-[1.75] text-foreground/75">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[1.0625rem] text-foreground/70">상담만 받고 끝내셔도 됩니다.</p>
      </div>
    </section>
  );
}
