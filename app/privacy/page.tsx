import type { Metadata } from "next";
import { site } from "@/lib/site";
import { BUILDER, BUILDER_ADDRESS } from "@/lib/portfolio";

// 개인정보처리방침 (개인정보 보호법 제30조). 2026-11-17 추가 — 상담 폼이 이름·연락처를 받는데 방침 페이지가 없었다(/privacy 404).
// 내용은 실제로 쓰는 도구만 적는다. 바뀌면(DB·메일 도구 교체 등) 이 페이지도 같이 고친다.
export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${site.brandName}(${site.business.name}) 개인정보처리방침`,
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE = "2026년 11월 17일";

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-[17px] font-bold tracking-[-0.01em]">{children}</h2>;
}

export default function PrivacyPage() {
  return (
    <section className="container max-w-3xl pb-16 pt-28 text-[14.5px] leading-[1.85] text-[#333] md:pt-36">
      <h1 className="text-[25px] font-bold tracking-[-0.03em] text-foreground md:text-[32px]">개인정보처리방침</h1>
      <p className="mt-4">
        {site.business.name}(이하 &ldquo;{site.brandName}&rdquo;)는 상담 신청과 자료 발송에 필요한 개인정보만 받고,
        「개인정보 보호법」에 따라 다음과 같이 처리합니다.
      </p>

      <H>1. 처리하는 개인정보와 목적</H>
      <ul className="mt-3 list-disc pl-5">
        <li>
          인테리어 상담 신청: 이름, 연락처(휴대폰), 업종, 지역, 공사 구분, 평수, 공사 시작 희망 시기, 문의 내용 — 상담 연락과 상담 진행
        </li>
        <li>체크리스트 받기: 이메일 주소 — 체크리스트 발송과 새 글 안내</li>
        <li>
          자동 수집: 접속 기록, 방문 경로(검색·광고 유입 표시), 기기·브라우저 정보 — 부정 이용 방지와 방문 통계. 통계에는 이름·연락처를 보내지 않습니다.
        </li>
      </ul>

      <H>2. 보유 기간</H>
      <ul className="mt-3 list-disc pl-5">
        <li>상담 신청 정보: 상담 종료 후 1년. 기간이 지나면 지체 없이 파기합니다.</li>
        <li>이메일 주소: 수신을 거부하실 때까지. 메일 아래 링크로 언제든 거부할 수 있습니다.</li>
        <li>다른 법령이 보관을 요구하는 경우에는 그 기간 동안 보관합니다.</li>
      </ul>

      <H>3. 제3자 제공</H>
      <p className="mt-3">
        상담 신청 시 따로 동의하신 경우에만, 상담과 시공 상담을 위해 아래와 같이 제공합니다.
      </p>
      <ul className="mt-3 list-disc pl-5">
        <li>제공받는 자: {BUILDER}({BUILDER_ADDRESS}) 등 {site.brandName} 협력 시공사</li>
        <li>제공 항목: 이름, 연락처, 문의 내용</li>
        <li>목적: 상담·견적</li>
        <li>보유 기간: 상담 종료 후 1년</li>
      </ul>
      <p className="mt-3">동의하지 않으실 수 있으며, 이 경우 온라인 상담 신청은 어렵고 전화로 상담하실 수 있습니다.</p>

      <H>4. 처리 위탁과 국외 이전</H>
      <p className="mt-3">사이트 운영을 위해 아래 업체의 서비스를 씁니다. 이 업체들은 해외(미국) 회사이며, 정보가 해외 서버에 보관될 수 있습니다.</p>
      <ul className="mt-3 list-disc pl-5">
        <li>Vercel Inc.(미국) — 웹사이트 호스팅, 상담 신청 처리</li>
        <li>Resend(미국) — 상담 신청 알림 메일과 체크리스트 메일 발송, 이메일 명단 보관</li>
        <li>Supabase Inc.(미국) — 상담 신청 정보 저장</li>
        <li>Cloudflare, Inc.(미국) — 자동 입력(봇) 방지 확인</li>
        <li>Google LLC(미국) — 방문 통계(Google 애널리틱스, 이름·연락처는 보내지 않음)</li>
      </ul>
      <p className="mt-3">
        정보는 신청하시는 때에 인터넷으로 전송되며, 보유 기간은 2항과 같습니다. 국외 이전을 원하지 않으시면 온라인 신청 대신 전화({site.business.phone})로 상담하실 수 있습니다.
      </p>

      <H>5. 파기 절차와 방법</H>
      <p className="mt-3">보유 기간이 끝난 정보는 복구할 수 없는 방법으로 지웁니다. 종이 문서는 분쇄하거나 소각합니다.</p>

      <H>6. 정보주체의 권리</H>
      <p className="mt-3">
        언제든 자신의 개인정보 열람·정정·삭제·처리정지를 요청하실 수 있습니다. 아래 연락처로 요청하시면 지체 없이 처리합니다.
      </p>

      <H>7. 안전성 확보 조치</H>
      <p className="mt-3">
        전 구간 암호화 전송(HTTPS), 관리 계정 접근 제한, 저장소 접근 권한 분리(공개 폼은 쓰기만 가능), 자동 입력 방지를 적용합니다.
      </p>

      <H>8. 쿠키와 방문 통계</H>
      <p className="mt-3">
        방문 통계를 위해 쿠키를 씁니다. 브라우저 설정에서 쿠키 저장을 거부하실 수 있으며, 거부해도 상담 신청은 가능합니다.
      </p>

      <H>9. 개인정보 보호책임자</H>
      <ul className="mt-3 list-disc pl-5">
        <li>책임자: 김경중({site.business.name} 대표)</li>
        <li>연락처: {site.business.phone}</li>
      </ul>
      <p className="mt-3">
        개인정보 침해에 대한 신고·상담은 개인정보분쟁조정위원회(1833-6972), 개인정보침해신고센터(118),
        대검찰청(1301), 경찰청(182)에 하실 수 있습니다.
      </p>

      <p className="mt-10 text-[13px] text-[#777]">
        시행일: {EFFECTIVE} · {site.business.name} · 사업자등록번호 {site.business.registration}
      </p>
    </section>
  );
}
