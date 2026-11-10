"use client";

import { cn } from "@/lib/utils";

// 버튼처럼 보이는 단일 선택(라디오). 휴대폰에서 드롭다운보다 한 번에 누르기 쉽다.
// 같은 칩을 다시 누르면 선택을 지운다(선택 항목이라 비워 둘 수 있어야 한다).
export function ChoiceChips({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="grid gap-2.5">
      <legend className="mb-2.5 text-sm font-medium leading-none">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = value === o;
          return (
            <label
              key={o}
              className={cn(
                "inline-flex h-11 cursor-pointer select-none items-center rounded-full border px-4 text-[0.9375rem] transition-colors duration-150 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
                checked
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/20 bg-background text-foreground/80 hover:border-foreground/50"
              )}
            >
              <input
                type="radio"
                name={name}
                value={o}
                checked={checked}
                onChange={() => onChange(o)}
                onClick={() => checked && onChange("")}
                className="sr-only"
              />
              {o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
