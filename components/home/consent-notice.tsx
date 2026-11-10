"use client";

import { BUILDER } from "@/lib/portfolio";

// 신청 폼 동의 두 개 — 둘 다 기본 해제, 둘 다 필수 (2026-11-10 지시서 9번).
// 시공사 제공 동의는 상담 내용을 협력 시공사가 함께 보기 때문에 따로 받는다.
export function ConsentNotice({
  privacy,
  partner,
  onPrivacy,
  onPartner,
}: {
  privacy: boolean;
  partner: boolean;
  onPrivacy: (v: boolean) => void;
  onPartner: (v: boolean) => void;
}) {
  return (
    <div className="grid gap-4 rounded-md bg-secondary/60 p-5 text-[0.9375rem] leading-relaxed">
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent_privacy"
            checked={privacy}
            onChange={(e) => onPrivacy(e.target.checked)}
            required
            className="mt-1 h-5 w-5 shrink-0 accent-[hsl(var(--primary))]"
          />
          <span>[필수] 개인정보 수집·이용 동의</span>
        </label>
        <details className="ml-8 mt-1.5">
          <summary className="cursor-pointer text-sm text-foreground/60 underline underline-offset-4">보기</summary>
          <dl className="mt-2 grid gap-1 text-sm text-foreground/70">
            <div><dt className="inline font-medium">항목: </dt><dd className="inline">이름, 연락처, 업종, 지역, 오픈 예정, 평수, 예산, 문의 내용</dd></div>
            <div><dt className="inline font-medium">목적: </dt><dd className="inline">상담 연락과 상담 진행</dd></div>
            <div><dt className="inline font-medium">보유: </dt><dd className="inline">상담 종료 후 1년</dd></div>
            <p>동의하지 않으실 수 있습니다. 다만 동의가 없으면 상담 신청을 받을 수 없습니다.</p>
          </dl>
        </details>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent_partner"
            checked={partner}
            onChange={(e) => onPartner(e.target.checked)}
            required
            className="mt-1 h-5 w-5 shrink-0 accent-[hsl(var(--primary))]"
          />
          <span>[필수] 상담 진행을 위한 시공사 제공 동의</span>
        </label>
        <dl className="ml-8 mt-1.5 grid gap-1 text-sm text-foreground/70">
          <div><dt className="inline font-medium">제공받는 자: </dt><dd className="inline">{BUILDER} 등 브랜드각 협력 시공사</dd></div>
          <div><dt className="inline font-medium">항목: </dt><dd className="inline">이름, 연락처, 문의 내용</dd></div>
          <div><dt className="inline font-medium">목적: </dt><dd className="inline">상담·견적</dd></div>
          <div><dt className="inline font-medium">보유: </dt><dd className="inline">상담 종료 후 1년</dd></div>
        </dl>
      </div>
    </div>
  );
}
