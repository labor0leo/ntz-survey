// 설문 정의(예시 자리표시자) — 오늘 저녁에 실제 텍스트만 교체하면 그대로 동작
// 각 option은 { text, type }이며 type은 A/B/C/D 중 하나(4분류)
const SURVEY_SCHEMA = {
  openTextRequired: true,
  questions: [
    {
      id: "Q1",
      title: "팀에서 나의 강점과 가장 거리가 먼 특성을 고르세요.",
      options: [
        { text: "고객의 목소리를 먼저 듣고 반영한다", type: "A" },
        { text: "파트너와의 신뢰를 최우선으로 한다", type: "B" },
        { text: "새로운 시도를 두려워하지 않는다", type: "C" },
        { text: "지표로 성장을 설계한다", type: "D" },
      ]
    },
    {
      id: "Q2",
      title: "어떤 방식의 문제 해결에 더 (또는 덜) 가깝습니까?",
      options: [
        { text: "고객 여정 관점에서 재구성한다", type: "A" },
        { text: "관계자 합의를 바탕으로 진행한다", type: "B" },
        { text: "프로토타입으로 빠르게 검증한다", type: "C" },
        { text: "리소스 효율을 최우선으로 잡는다", type: "D" },
      ]
    },
    {
      id: "Q3",
      title: "내가 더 (또는 덜) 선호하는 목표 설정 방식을 고르세요.",
      options: [
        { text: "VOC 해결율/만족도 기반", type: "A" },
        { text: "장기 파트너 가치 기반", type: "B" },
        { text: "신규 기능/실험 성공률 기반", type: "C" },
        { text: "매출/전환/비용 지표 기반", type: "D" },
      ]
    }
  ]
};

(function initSurvey() {
  // 렌더
  const $qRoot = document.getElementById("surveyQuestions");
  SURVEY_SCHEMA.questions.forEach((q, idx) => {
    const qDiv = document.createElement("div");
    qDiv.className = "q-card";
    qDiv.innerHTML = `
      <div class="q-title">Q${idx+1}. ${q.title}</div>
      <div class="grid-head"><div>항목</div><div>가장 가깝다 (+1)</div><div>가장 멀다 (-1)</div></div>
      <div>${q.options.map((opt, i) => `
        <div class="option-row">
          <div>${opt.text} <span class="badge ${opt.type}">${opt.type}</span></div>
          <div><input type="radio" name="${q.id}_close" value="${i}" aria-label="closest"></div>
          <div><input type="radio" name="${q.id}_far" value="${i}" aria-label="farthest"></div>
        </div>
      `).join("")}</div>
    `;
    $qRoot.appendChild(qDiv);
  });

  // 제출
  document.getElementById("submitSurvey").addEventListener("click", submitSurvey);
})();

async function submitSurvey() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const openText = document.getElementById("openText").value.trim();

  if (!name) return alert("이름을 입력해주세요.");
  if (SURVEY_SCHEMA.openTextRequired && !openText) return alert("서술형 문항을 작성해주세요.");

  // 점수 집계
  const scores = { A:0, B:0, C:0, D:0 };
  const answers = [];

  for (const q of SURVEY_SCHEMA.questions) {
    const closeIdx = getCheckedIndex(`${q.id}_close`);
    const farIdx   = getCheckedIndex(`${q.id}_far`);

    if (closeIdx === null || farIdx === null) {
      return alert("각 문항마다 ‘가장 가깝다’와 ‘가장 멀다’를 모두 선택해주세요.");
    }
    if (closeIdx === farIdx) {
      return alert("같은 항목을 동시에 선택할 수 없습니다.");
    }

    const closeType = q.options[closeIdx].type;
    const farType   = q.options[farIdx].type;
    scores[closeType] += 1;   // +1
    scores[farType]   -= 1;   // -1

    answers.push({
      questionId: q.id,
      closest: { index: closeIdx, text: q.options[closeIdx].text, type: closeType },
      farthest:{ index: farIdx,  text: q.options[farIdx].text,  type: farType }
    });
  }

  const typeOrder = ["A","B","C","D"]; // 동점일 때 우선순위
  const topType = typeOrder
    .map(t => ({t, v:scores[t]}))
    .sort((a,b)=> b.v - a.v || typeOrder.indexOf(a.t)-typeOrder.indexOf(b.t))[0].t;

  const payload = {
    id: Date.now(),
    name, email,
    openText,
    scores,          // {A,B,C,D}
    topType,         // 최종 유형
    answers,         // 문항별 선택내역
    createdAt: new Date().toISOString(),
  };

  // Firestore 저장 (백업: localStorage)
  try {
    if (window.firestoreManager) {
      await window.firestoreManager.saveSurvey(payload);
      console.log("✅ 설문 Firestore 저장 완료");
    } else {
      throw new Error("firestoreManager not found");
    }
  } catch (e) {
    console.warn("⚠️ Firestore 미사용 → localStorage 백업");
    const arr = JSON.parse(localStorage.getItem("macarong_surveys")||"[]");
    arr.push(payload);
    localStorage.setItem("macarong_surveys", JSON.stringify(arr));
  }

  // 사용자 컨텍스트 저장 → 시뮬 즉시 시작
  localStorage.setItem("macarong_user", JSON.stringify({ name, email, surveyCompleted:true }));

  alert("수고하셨습니다. 이어서 시뮬레이션 검사가 진행됩니다.");
  location.href = "index.html";
}

function getCheckedIndex(name) {
  const nodes = document.querySelectorAll(`input[name="${name}"]`);
  for (const n of nodes) if (n.checked) return parseInt(n.value,10);
  return null;
}
