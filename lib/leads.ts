import { z } from "zod";

// 예산대 드롭다운 선택지 (선택 항목)
export const BUDGET_OPTIONS = [
  "5천만원 이하",
  "5천만 ~ 1억원",
  "1억 ~ 3억원",
  "3억원 이상",
  "아직 모르겠어요",
] as const;

// 2026-11-17 대표: "무료 컨셉 상담은 애매하다, 인테리어 디자인 문의가 들어와야 한다".
// 신청 폼은 인테리어 상담에 필요한 것만 한 번 누르는 칩으로 묻는다(공사 구분·평수·시작 시기).
// 값은 message 에 합쳐 보내 DB 스키마를 바꾸지 않는다.
export const WORK_TYPES = ["새 매장", "리뉴얼"] as const;
export const SIZE_OPTIONS = ["10평 이하", "10~20평", "20~50평", "50평 이상", "모름"] as const;
export const START_TIMING = ["1~2개월 안", "3~6개월 안", "미정"] as const;

// 상담 신청 폼 = Supabase leads 테이블 입력 스키마.
// PRD 폼 항목: 이름 / 연락처 / 업종 / 매장 위치·평수 / 예산대(선택) / 하고 싶은 가게 한 줄
export const leadSchema = z.object({
  name: z.string().trim().min(1, "이름을 적어주세요.").max(50),
  phone: z
    .string()
    .trim()
    .min(9, "연락처를 정확히 적어주세요.")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "숫자와 - 만 넣어주세요. 예: 010-1234-5678"),
  industry: z.string().trim().max(60).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  // 유입 참고용 (선택)
  source: z.string().trim().max(200).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
