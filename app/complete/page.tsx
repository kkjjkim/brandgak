import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ConversionTracker } from "@/components/conversion-tracker";

export const metadata: Metadata = {
  title: "신청 완료",
  robots: { index: false },
};

export default function CompletePage() {
  return (
    <section className="flex min-h-[80vh] items-center">
      <ConversionTracker />
      <div className="container max-w-xl py-32 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mt-8 font-display text-3xl font-semibold md:text-4xl">
          신청 완료됐습니다.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/70">
          영업일 하루 안에 직접 전화드릴게요. 매장 도면이나 현장 사진, 참고하는 매장 사진이 있으면 통화 때 같이 보면 더 구체적으로 이야기할 수 있습니다.
        </p>
        <Link
          href="/"
          className={buttonVariants({ variant: "outline", className: "mt-10" })}
        >
          홈으로 돌아가기
        </Link>
        <Link href="/portfolio" className="ml-3 mt-10 inline-block py-2 text-[14px] underline underline-offset-4">
          시공 사례 보기
        </Link>
      </div>
    </section>
  );
}
