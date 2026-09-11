const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key",
};

// code -> name, for all enrolled students. Kept in sync manually / by the
// monthly badge-recompute pipeline when the roster changes.
const CODE_TO_NAME = {
  "608786732310": "김연호", "657980896301": "김지아", "658362138843": "안다은", "210236802522": "윤은준",
  "480879670093": "김하은", "709574527613": "이윤아", "007718462108": "임승민", "712611170385": "이준원",
  "749686452709": "윤준휘", "108716093647": "김우찬", "955343677368": "윤주원",
  "473795523887": "박나연", "541057517797": "은성준", "782502937015": "신석현", "415536389911": "홍준서",
  "134176315965": "전미경", "797021979497": "이예지", "506953236979": "김성은", "895580638021": "현은지",
  "721434798847": "하성문",
  "036800871806": "문서진", "513132156510": "이규민", "423655667143": "최재혁", "682100449842": "문예원",
  "798718219988": "하지원", "113527289008": "정한", "727210409447": "정서윤", "264420186367": "김민성",
  "540966184961": "곽진우", "570807363400": "김지호", "818092827689": "이서현", "387092852982": "배세진",
  "140521921710": "김건", "009240331789": "이루리", "955391169119": "신재민", "647295535692": "황현수",
};

// Auto badges recomputed from the monthly attendance/homework figures.
// Updated by the badge-recompute pipeline (see gen_students_page.py) each cycle.
const AUTO_RECIPIENTS = {
  dragon: ["임승민", "이준원", "전미경", "김성은", "이서현"],
  tiger: ["전미경", "김성은", "이루리"],
  freedom_sprit: ["이윤아", "윤준휘", "김우찬", "홍준서", "현은지", "하성문", "정서윤", "김지호", "황현수"],
  homework_anhae: ["이윤아", "윤준휘", "김우찬", "윤주원", "은성준", "신석현", "홍준서", "현은지", "하성문", "정한", "정서윤", "김지호", "배세진", "김건", "신재민", "황현수"],
  nanguk: ["김우찬"],
};

const BADGE_DESC = {
  dragon: "직전 1개월 출석율 100%를 달성한 학생에게 부여됩니다.",
  tiger: "직전 1개월 과제를 전부 제출한 학생에게 부여됩니다.",
  hanamaru: "한달에 두번 이상 하나마루를 받으면 수여됩니다.",
  freedom_sprit: "직전 1개월 출석율이 80% 미만인 학생에게 부여됩니다.",
  homework_anhae: "직전 1개월 과제 제출율이 80% 미만인 학생에게 부여됩니다.",
  geungeoeopseulmu: "주장에 대한 근거를 잊어버리고 쓰지 않은 친구에게 수여됩니다.",
  gisungjeoneopmu: "결론을 자꾸 빼먹는 친구에게 수여됩니다.",
  chusacheseyo: "시대가 낳은 명필! 알아볼 수 없는 글자를 뽐낸 친구에게 수여됩니다.",
  redvelvet: "빨간펜맛을 많이 본 친구에게 수여됩니다.",
  nahollojibe: "과제를 쓸쓸하게 집에 홀로 남겨두고 온 친구에게 수여됩니다.",
  hwaksi: "여러가지 경고를 많이 받은 친구에게 수여됩니다.",
  nanguk: "직전 1개월 출석율과 과제 제출율이 모두 60% 미만인 학생에게 부여됩니다.",
  tatoeva: "타토'에'바! 에를 빼먹는 친구에게 수여됩니다.",
  tashikani: "타시'카'니! 카를 빼먹는 친구에게 수여됩니다.",
  mojaram: "글자수가 모자라요! 400자 조차 채우지 못한 친구에게 수여됩니다.",
  aoao: "히라가나 아, 오를 예쁘게 써내지 못하는 친구들에게 수여됩니다.",
  jiugekeeper: "잘못 써도 지우지 않은 친구들에게 수여합니다.",
};

const GROUPS = [
  ["천상계", [
    { id: "dragon", label: "좌청룡", small: true, auto: true },
    { id: "tiger", label: "우백호", small: true, auto: true },
    { id: "hanamaru", label: "하나마루", small: false, auto: false },
  ]],
  ["지옥계", [
    { id: "jiugekeeper", label: "지우개수호자", small: false, auto: false },
    { id: "aoao", label: "아오아오", small: false, auto: false },
    { id: "mojaram", label: "모자람", small: false, auto: false },
    { id: "tashikani", label: "타시'카'니", small: false, auto: false },
    { id: "tatoeva", label: "타토'에'바", small: false, auto: false },
    { id: "chusacheseyo", label: "추사체세요", small: false, auto: false },
    { id: "gisungjeoneopmu", label: "기승전없무", small: false, auto: false },
    { id: "geungeoeopseulmu", label: "근거없을무", small: false, auto: false },
    { id: "redvelvet", label: "레드벨벳", small: false, auto: false },
    { id: "homework_anhae", label: "원고지절약", small: false, auto: true },
    { id: "nahollojibe", label: "나홀로집에", small: false, auto: false },
    { id: "freedom_sprit", label: "자율출석인", small: false, auto: true },
    { id: "hwaksi", label: "MR. HWAK", small: false, auto: false },
    { id: "nanguk", label: "상담필요함", small: false, auto: true },
  ]],
];

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderBadge(b, manualByBadge) {
  const names = b.auto ? (AUTO_RECIPIENTS[b.id] || []) : (manualByBadge[b.id] || []);
  const body = names.length
    ? `<div class="name-list">${names.map((n) => `<span class="name-chip">${escapeHtml(n)}</span>`).join("")}</div>`
    : `<div class="empty">아직 해당 학생이 없습니다.</div>`;
  const imgClass = b.small ? "badge-img small" : "badge-img";
  const desc = BADGE_DESC[b.id] || "";
  return `
  <section class="badge-section">
    <div class="badge-head">
      <img class="${imgClass}" src="/badge-assets/${b.id}.png?v=2" alt="${escapeHtml(b.label)}">
      <div class="badge-headtext">
        <div class="badge-title">${escapeHtml(b.label)} <span class="count">${names.length}명</span></div>
        <div class="badge-desc">${desc}</div>
      </div>
    </div>
    ${body}
  </section>`;
}

async function renderStudentsPage(env) {
  const raw = (await env.BADGES.get("assignments")) || "{}";
  let assignments = {};
  try {
    assignments = JSON.parse(raw);
  } catch (e) {
    assignments = {};
  }
  // assignments: { code: [badgeId, ...] } -> invert to { badgeId: [name, ...] }
  const manualByBadge = {};
  for (const [code, badgeIds] of Object.entries(assignments)) {
    const name = CODE_TO_NAME[code];
    if (!name || !Array.isArray(badgeIds)) continue;
    for (const bid of badgeIds) {
      (manualByBadge[bid] = manualByBadge[bid] || []).push(name);
    }
  }

  const now = new Date();
  const periodLabel = `${now.getFullYear()}년 ${now.getMonth() + 1}월 기준`;
  const groupsHtml = GROUPS.map(
    ([groupName, badges]) => `
  <div class="group">
    <div class="group-head">${groupName}</div>
    ${badges.map((b) => renderBadge(b, manualByBadge)).join("")}
  </div>`
  ).join("");

  const updated = now.toISOString().slice(0, 10);

  return `<!DOCTYPE html>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>이달의 칭호 뱃지</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;900&display=swap">
<style>
  :root{
    --paper:#F4F8FB; --paper-alt:#E4EEF5; --ink:#161B42; --ink-soft:#5B6B8C;
    --accent:#2374A6; --accent-2:#3FB6D3; --accent-soft:#D7ECF3; --line:#CBDCE6;
    --card-bg:#FFFFFF; --shadow: 0 1px 2px rgba(22,27,66,0.07), 0 4px 14px rgba(22,27,66,0.08);
  }
  @media (prefers-color-scheme: dark){
    :root:not([data-theme="light"]){
      --paper:#0E1524; --paper-alt:#172137; --ink:#E7ECF7; --ink-soft:#93A2C2;
      --accent:#5BC6E8; --accent-2:#2E8FBE; --accent-soft:#173547; --line:#2B3852;
      --card-bg:#141D31; --shadow: 0 1px 2px rgba(0,0,0,0.3), 0 6px 18px rgba(0,0,0,0.35);
    }
  }
  :root[data-theme="dark"]{
    --paper:#0E1524; --paper-alt:#172137; --ink:#E7ECF7; --ink-soft:#93A2C2;
    --accent:#5BC6E8; --accent-2:#2E8FBE; --accent-soft:#173547; --line:#2B3852;
    --card-bg:#141D31; --shadow: 0 1px 2px rgba(0,0,0,0.3), 0 6px 18px rgba(0,0,0,0.35);
  }
  *{box-sizing:border-box;}
  body{background:var(--paper);color:var(--ink);font-family:"Noto Sans KR",sans-serif;-webkit-font-smoothing:antialiased;}
  .wrap{max-width:760px;margin:0 auto;padding:48px 24px 90px;}
  .kicker{display:flex;align-items:center;gap:10px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:16px;}
  .kicker .dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,var(--accent-2),var(--accent));flex:none;}
  .brand-bar{height:4px;border-radius:999px;background:linear-gradient(90deg,var(--accent-2),var(--accent));margin-bottom:26px;}
  h1{font-size:26px;font-weight:900;margin:0 0 6px;letter-spacing:-.01em;}
  .period{color:var(--ink-soft);font-size:13.5px;margin-bottom:32px;}
  .group{margin-bottom:32px;}
  .group-head{
    font-size:14px;
    font-weight:900;
    letter-spacing:0.04em;
    color:var(--accent);
    margin-bottom:12px;
    padding-bottom:8px;
    border-bottom:2px solid var(--accent-soft);
  }
  .badge-section{background:var(--card-bg);border:1px solid var(--line);border-radius:14px;padding:18px 20px 20px;box-shadow:var(--shadow);margin-bottom:16px;}
  .badge-head{display:flex;align-items:center;gap:14px;margin-bottom:14px;}
  .badge-img{height:56px;width:auto;flex:none;}
  .badge-img.small{height:64px;}
  .badge-headtext{display:flex;flex-direction:column;gap:3px;}
  .badge-title{font-size:16px;font-weight:700;display:flex;align-items:baseline;gap:8px;}
  .badge-title .count{font-size:12px;font-weight:600;color:var(--ink-soft);}
  .badge-desc{font-size:12px;color:var(--ink-soft);line-height:1.4;}
  .name-list{display:flex;flex-wrap:wrap;gap:8px;}
  .name-chip{padding:5px 12px;border-radius:999px;background:var(--paper-alt);border:1px solid var(--line);font-size:13px;font-weight:600;}
  .empty{font-size:13px;color:var(--ink-soft);font-style:italic;}
  footer{margin-top:36px;padding-top:20px;border-top:1px solid var(--line);font-size:12px;color:var(--ink-soft);display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;}
</style>

<div class="wrap">
  <div class="kicker"><span class="dot"></span>TIS 인터내셔널스쿨 · 학생용</div>
  <div class="brand-bar"></div>
  <h1>이달의 칭호 뱃지</h1>
  <div class="period">${periodLabel} · 뱃지 적용 시 즉시 갱신</div>
  ${groupsHtml}
  <footer>
    <span>업데이트: ${updated}</span>
    <span>TIS 인터내셔널스쿨 · 소논문 리포트</span>
  </footer>
</div>
`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/badges") {
      if (request.method === "OPTIONS") {
        return new Response(null, { headers: CORS_HEADERS });
      }

      if (request.method === "GET") {
        const raw = await env.BADGES.get("assignments");
        return new Response(raw || "{}", {
          headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        });
      }

      if (request.method === "POST") {
        const key = request.headers.get("X-Admin-Key");
        if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) {
          return new Response(JSON.stringify({ error: "unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS },
          });
        }
        const body = await request.text();
        try {
          JSON.parse(body);
        } catch (e) {
          return new Response(JSON.stringify({ error: "invalid_json" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...CORS_HEADERS },
          });
        }
        await env.BADGES.put("assignments", body);
        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        });
      }

      return new Response("Method not allowed", { status: 405, headers: CORS_HEADERS });
    }

    if ((url.pathname === "/students.html" || url.pathname === "/students") && request.method === "GET") {
      const html = await renderStudentsPage(env);
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=UTF-8" },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
