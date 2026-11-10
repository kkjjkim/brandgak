// 시공 사례 — (주)디자인드비가 직접 시공한 매장만 (2026-11-10 대표 결정).
// 포트폴리오 PDF 19쪽 이후(대표·팀장의 이전 회사 경력)와 설계만 한 CHICOR·JAJU는 넣지 않는다.
// 평수는 PDF의 ㎡ ÷ 3.3058 반올림. 사진은 PDF 페이지에서 큰 사진 영역만 잘라낸 것(로고·글자 제외).
export type PortfolioCase = {
  slug: string;
  brand: string;
  kind: string; // 리빙 편집숍·팝업·매장·인숍
  place: string;
  year: number;
  pyeong: number;
  // 캡션 한 줄 — 그 매장에서 실제로 한 일을 구체적으로(2026-11-10 B안 지시서 문구 그대로)
  line: string;
  // public/portfolio/{photo}-1600.webp · -960.webp
  photo: string;
};

// 순서는 B안 지시서 표 그대로. 홈은 앞 6개, /portfolio 는 8개 전부.
export const PORTFOLIO: PortfolioCase[] = [
  { slug: "yellowbasket-garosu", brand: "Yellow Basket", kind: "리빙 편집숍", place: "가로수길", pyeong: 30, year: 2022, photo: "yellowbasket-garosu-2", line: "곡선 원목 테이블이 매장 한가운데를 따라 흐르고, 아치 문 너머로 안쪽 공간이 이어집니다." },
  { slug: "siena-shinsegae-2024", brand: "THE SIENA", kind: "팝업", place: "신세계 강남", pyeong: 28, year: 2024, photo: "siena-shinsegae-2024", line: "회색 체크 바닥 위에 오렌지 벽과 행거를 세워, 멀리서도 브랜드 색이 먼저 보이게 했습니다." },
  { slug: "bbw-centum", brand: "Bath & Body Works", kind: "매장", place: "신세계 센텀시티", pyeong: 31, year: 2025, photo: "bbw-centum", line: "파란 체크 타일 벽과 원목 진열대로 브랜드 색을 그대로 옮겼습니다." },
  { slug: "siena-lotte-jamsil", brand: "THE SIENA", kind: "매장", place: "롯데 잠실", pyeong: 15, year: 2023, photo: "siena-lotte-jamsil", line: "15평 안에 기둥을 감싼 디스플레이와 행거를 나눠 세웠습니다." },
  { slug: "bbw-ak-hongdae", brand: "Bath & Body Works", kind: "인숍", place: "AK 홍대", pyeong: 8, year: 2024, photo: "bbw-ak-hongdae", line: "8평 인숍에 브랜드 벽과 진열대를 모두 담았습니다." },
  { slug: "mofun-ipark", brand: "Mofun", kind: "매장", place: "용산 아이파크몰", pyeong: 32, year: 2025, photo: "mofun-ipark", line: "원형 무대와 색을 입힌 진열대로 통로의 시선을 모았습니다." },
  { slug: "bbw-parnas", brand: "Bath & Body Works", kind: "매장", place: "파르나스몰", pyeong: 29, year: 2025, photo: "bbw-parnas", line: "입구 정면에서 매장 안쪽 진열까지 한눈에 들어오게 열었습니다." },
  { slug: "siena-shinsegae-2023", brand: "THE SIENA", kind: "팝업", place: "신세계 강남", pyeong: 28, year: 2023, photo: "siena-shinsegae-2023", line: "분홍 타일 벽과 흰 커튼으로 입구를 무대처럼 세웠습니다." },
];

export function portfolioMeta(p: PortfolioCase) {
  return `${p.kind} · ${p.place} · ${p.pyeong}평 · ${p.year}`;
}

// 시공 회사 실명 — 사례 캡션·증거 줄에 같은 표기를 쓴다.
export const BUILDER = "(주)디자인드비";
export const BUILDER_ADDRESS = "서울 서초구 강남대로23길 26";

export function portfolioImage(image: string) {
  return {
    src: `/portfolio/${image}-1600.webp`,
    srcSet: `/portfolio/${image}-960.webp 960w, /portfolio/${image}-1600.webp 1600w`,
  };
}
