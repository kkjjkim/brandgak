// 진행 — 단계 이름과 한 줄만. 기간·조건 숫자는 쓰지 않는다 (2026-11-10 지시서 7번, 대표 원칙 1).
const STEPS = [
  { t: "상담", d: "어떤 가게를 열고 싶은지 듣습니다." },
  { t: "컨셉·예산 두 장", d: "사장님 가게로 그린 컨셉과 예산 쓰는 곳을 드립니다." },
  { t: "설계", d: "컨셉을 도면과 재료로 옮깁니다." },
  { t: "시공", d: "도면대로 짓고 가구까지 만듭니다." },
  { t: "오픈", d: "손님을 맞을 준비를 같이 마칩니다." },
];

export function Steps() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <h2 className="font-display text-[1.75rem] font-semibold leading-[1.35] tracking-[-0.02em] sm:text-4xl">
          진행 순서
        </h2>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.t} className="flex gap-4 bg-background p-6 md:flex-col md:gap-3">
              <span className="font-display text-lg text-primary">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold">{s.t}</h3>
                <p className="mt-1.5 leading-relaxed text-foreground/70">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
