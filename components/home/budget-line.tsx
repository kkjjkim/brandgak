// 예산 한 문장 — 가격·할인 이야기 대신, 정한 예산을 어디에 쓰는지만 말한다 (2026-11-10 지시서 6번).
export function BudgetLine() {
  return (
    <section className="bg-foreground py-20 text-background md:py-28">
      <div className="container">
        <p className="max-w-3xl font-display text-[1.6rem] font-semibold leading-[1.5] tracking-[-0.01em] sm:text-[2.2rem]">
          예산은 정해 주시면 됩니다.
          <br />
          그 안에서 손님 눈에 닿는 곳에 힘을 줍니다.
        </p>
      </div>
    </section>
  );
}
