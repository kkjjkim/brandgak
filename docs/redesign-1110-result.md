# 홈 개편 결과 (2026-11-10, 브랜치 `redesign-1110`)

지시서: `docs/redesign-1110-spec.md`. main 푸시·배포·외부 발송은 하지 않았다. 브랜치에 커밋만 했다.

## 커밋 (의미 단위 5개 + 이 문서)
1. `1dc1f43` content — 인사이트 5편 문장 덜어냄
2. `a93b476` feat — 직접 시공 8건 데이터 + 포트폴리오 사진
3. `59e23ae` feat — 머리말(메뉴 3개 + 카톡/전화 버튼), 휴대폰 하단 고정 바
4. `a126355` feat — 홈 새 구성, 새 신청 폼, `/portfolio`
5. `3c33a57` fix — 회사소개·서비스 문장 정리, 디자인드비 실명화

## 바뀐 파일
**새로 만든 것**
- `lib/portfolio.ts` — 직접 시공 8건(지시서 표 그대로). Yellow Basket은 13·14쪽 사진 2장.
- `public/portfolio/*.webp` — PDF 5·6·7·9·10·11·12·13·14쪽에서 가장 큰 사진만 잘라 폭 1600·960으로 저장(18개). 로고·글자 영역은 넣지 않았다.
  sharp가 프로젝트에 깔려 있지 않아, 새 라이브러리를 깔지 않고 이 맥의 Python(PIL)으로 잘랐다. 결과는 같다(webp, 폭 1600·960).
- `components/home/photo-hero.tsx` 첫 화면 / `two-sheets.tsx` 두 장 / `portfolio-list.tsx` 시공 사례 / `different-question.tsx` 다른 점 /
  `budget-line.tsx` 예산 한 문장 / `steps.tsx` 진행 / `apply-form.tsx`·`choice-chips.tsx`·`consent-notice.tsx` 신청 폼
- `components/portfolio-card.tsx` — 홈과 `/portfolio`가 같이 쓰는 카드
- `lib/use-turnstile.ts` — 홈 폼용 봇 방지 훅(기존 `lead-form.tsx`와 같은 동작. 진단·업종 페이지의 기존 폼은 손대지 않음)
- `app/portfolio/page.tsx` — 시공 사례 전체(9장, 담당 범위 포함)

**고친 것**
- `app/page.tsx` — 지시서 순서(첫 화면 → 두 장 → 시공 사례 → 다른 점 → 예산 → 진행 → FAQ 5개 → 신청 폼)로 바꿈. FAQ 구조화 데이터도 새 5개로.
- `lib/site.ts` — `kakaoUrl: ""`, `showLicense: false` 추가. 머리말 메뉴 = 시공 사례 · 인사이트 · 상담. 바닥글 메뉴는 따로(`footerNavItems`).
- `components/layout/site-header.tsx` — 오른쪽 버튼: kakaoUrl 있으면 "카톡 문의", 없으면 "전화 문의"(tel:010-8533-0140).
- `components/layout/floating-cta.tsx` — 휴대폰: 하단 고정 바 전화 | 카톡(없으면 문자) | 상담 신청. PC: 기존처럼 스크롤 뒤 상담 버튼.
- `app/layout.tsx`(하단 바 높이만큼 아래 여백), `components/recent-leads-toast.tsx`(휴대폰에서 하단 바 위로 올림), `components/layout/site-footer.tsx`, `app/sitemap.ts`(/portfolio 추가)
- `app/company/page.tsx` — "숫자가 맞지 않으면 공사를 권하지 않습니다" 삭제, "상담 전에 약속드리는 것" 블록(대금 분할 포함) 삭제, "인사이트 N편" 숫자 삭제,
  공간·시공 소개를 "(주)디자인드비"로 실명화(직접 시공 8곳, 시공 사례 링크).
- `app/service/page.tsx`·`components/home/two-experts.tsx`·`components/home/process-flow.tsx` — "평당 가격으로 견적부터…" 비교 줄, "서면 견적과 공정표", "대금은 공정 단계에 맞춰 나눠 받습니다" 삭제. 빈 자리는 "매장 가구 제작"(사례의 담당 범위)으로.
- 인사이트 5편(`updated: 2026-11-10`):
  - `choose-interior-company.md` — 하자담보책임기간(별표 4, 1년 등), 잔금 보류, FAQ "하자보수 기간은 얼마나", 점수표 하자보수 줄과 "0점이면 다시 생각", 보증서 청구 단계 삭제.
    제목이 "7가지"라 7번 자리에는 원래 글에 있던 "돈은 공사가 진행된 만큼 나눠 낸다" 단락을 옮겨 넣었다(새 사실 없음).
  - `interior-timeline.md`, `interior-site-checklist.md`, `interior-quote-guide.md`, `interior-contract.md` — 하자 보수 기간·잔금 보류·보증 요구 문장 삭제.
  - 금지어에 걸리던 일반 표현은 뜻을 유지한 채 바꿨다: "평당 얼마" → "면적 곱하기 단가"/"한 평에 얼마", "하자 목록" → "고칠 곳 목록", "오늘 계약하면 할인" → "오늘 계약해야 이 금액", "시작하자는"(동사) → "시작하려는".

**빼기만 하고 지우지 않은 파일**: `blueprint-hero`, `manifesto`, `square-up`, `concept-boards`, `promises` 등 예전 홈 컴포넌트는 홈에서 안 쓰지만 파일은 남겼다(삭제 금지). `/diagnosis`·`/concepts` 페이지도 그대로 있다. 진단은 인사이트 글과 서브 페이지 끝 CTA에서만 연결된다.

## 확인 결과
- 타입체크(`tsc --noEmit`) 통과, 린트(`next lint`) 경고·오류 0, 빌드(`next build`) 성공(64페이지, `/portfolio` 포함).
  이 셸에 pnpm이 없어 `node_modules/.bin`의 같은 명령으로 돌렸다.
- 금지어 grep(`하자|보증|잔금|더 싸|저렴|할인|절감|평당|2~4주|1년 무상`) — 실제 서버(`next start`)가 내보낸 페이지 글 기준:
  `/`, `/company`, `/service`, `/portfolio`, 인사이트 5편 **모두 0건**.
  예외 2곳: `interior-site-checklist.md`·`interior-contract.md`의 frontmatter `keywords`(화면에 안 보이는 SEO 메타, "매장 인테리어 하자"·"인테리어 하자"·"하자보수"). 지시서의 "SEO 키워드는 유지"를 따라 남겼다. 빼려면 이 두 줄만 고치면 된다.
- 홈 HTML에 "포트폴리오만 봐서는", "직접 시공한 매장 8곳", "전화로 먼저 물어보기", "전화 문의"가 들어간 것 확인. "실내건축공사업", "1분 컨셉 진단", "상담 전에 약속"은 홈에 없음.
- **390px·1280px 화면 직접 확인은 못 했다.** Playwright 도구 권한이 없었고, 직접 띄운 헤드리스 크롬은 이 환경 샌드박스에서 페이지를 열 때마다 죽었다(5번 시도 후 중단).
  코드상 가로 넘침 위험 요소는 없다(사례 카드의 가로 스크롤은 그 줄 안에서만 넘치게 `overflow-x-auto`). 대표님 확인 또는 Playwright 권한을 주시면 바로 찍어 보겠다.

## 확인해 주실 것
1. **카카오 채널 주소** — `lib/site.ts`의 `kakaoUrl`에 넣으면 머리말·첫 화면·하단 바가 자동으로 "카톡"으로 바뀐다.
2. **실내건축공사업 등록** — Aside가 KISCON에서 (주)디자인드비 확인 후 `showLicense: true`.
3. **개인정보 수집·이용 동의의 보유 기간** — 지시서에 시공사 제공 쪽만 "상담 종료 후 1년"이 있어, 수집·이용 쪽도 같게 "상담 종료 후 1년"으로 적었다. 다르면 `components/home/consent-notice.tsx` 한 줄.
4. **진행 단계 한 줄 문구**(`components/home/steps.tsx`) — 지시서에 단계 이름만 있어 짧게 새로 썼다(숫자·조건 없음). 예: "시공 — 도면대로 짓고 가구까지 만듭니다."
5. 신청 폼은 서버 변경 없이 `/api/leads`로 보낸다. 오픈 예정·하고 싶은 가게·동의 기록(시각 포함)은 메일·DB의 "하고 싶은 가게(message)" 칸에, 지역·평수는 "위치·평수" 칸에 합쳐 들어간다. 실제 제출 시험은 외부 발송(운영자 메일)이 생겨 하지 않았다.

## 남은 것 (이번 범위 밖, 참고)
- `lib/diagnosis.ts`(진단 결과 문구)에 "잔금은 준공 확인 후", "하자보수", "비용 절감"이 남아 있다. 진단 페이지는 이번 점검 대상이 아니라 그대로 뒀다.
- `components/lead-form.tsx`(진단·업종 페이지 폼)의 "영업 전화 없음 · 상담 후 결정은 자유"와 동의 체크 없음 — 홈 폼과 맞출지 결정 필요.

DONE
