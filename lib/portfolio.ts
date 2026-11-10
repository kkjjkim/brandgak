// 시공 사례 — (주)디자인드비가 직접 시공한 매장만 (2026-11-10 대표 결정).
// 포트폴리오 PDF 19쪽 이후(대표·팀장의 이전 회사 경력)와 설계만 한 CHICOR·JAJU는 넣지 않는다.
// 평수는 PDF의 ㎡ ÷ 3.3058 반올림. 사진은 PDF 페이지에서 큰 사진 영역만 잘라낸 것(로고·글자 제외).
export type PortfolioCase = {
  slug: string;
  brand: string;
  place: string;
  year: number;
  pyeong: number;
  role: string;
  // public/portfolio/{image}-1600.webp · -960.webp. 첫 장이 대표 사진.
  images: string[];
};

export const PORTFOLIO: PortfolioCase[] = [
  { slug: "mofun-ipark", brand: "Mofun", place: "용산 아이파크몰", year: 2025, pyeong: 32, role: "시공·가구 제작", images: ["mofun-ipark"] },
  { slug: "bbw-centum", brand: "Bath & Body Works", place: "신세계 센텀시티", year: 2025, pyeong: 31, role: "시공·가구 제작", images: ["bbw-centum"] },
  { slug: "bbw-parnas", brand: "Bath & Body Works", place: "파르나스몰", year: 2025, pyeong: 29, role: "시공·가구 제작", images: ["bbw-parnas"] },
  { slug: "bbw-ak-hongdae", brand: "Bath & Body Works", place: "AK 홍대 (인숍)", year: 2024, pyeong: 8, role: "시공·가구 제작", images: ["bbw-ak-hongdae"] },
  { slug: "siena-shinsegae-2024", brand: "THE SIENA", place: "신세계 강남 팝업", year: 2024, pyeong: 28, role: "디자인·시공·가구 제작", images: ["siena-shinsegae-2024"] },
  { slug: "siena-lotte-jamsil", brand: "THE SIENA", place: "롯데 잠실", year: 2023, pyeong: 15, role: "디자인·시공·가구 제작", images: ["siena-lotte-jamsil"] },
  { slug: "siena-shinsegae-2023", brand: "THE SIENA", place: "신세계 강남 팝업", year: 2023, pyeong: 28, role: "디자인·시공·가구 제작", images: ["siena-shinsegae-2023"] },
  { slug: "yellowbasket-garosu", brand: "Yellow Basket", place: "가로수길", year: 2022, pyeong: 30, role: "디자인·시공·가구 제작", images: ["yellowbasket-garosu", "yellowbasket-garosu-2"] },
];

// 시공 회사 실명 — 사례 캡션·증거 줄에 같은 표기를 쓴다.
export const BUILDER = "(주)디자인드비";

export function portfolioImage(image: string) {
  return {
    src: `/portfolio/${image}-1600.webp`,
    srcSet: `/portfolio/${image}-960.webp 960w, /portfolio/${image}-1600.webp 1600w`,
  };
}
