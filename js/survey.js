// 한 페이지 설문: (1) DISC 5문항 (D/I/S/C)  (2) 스트레스 대처 10문항 (P/A/M/S/E)  (3) 동기·가치관 8문항 (A/B/C/D)
// UI에는 유형 라벨을 절대 노출하지 않음. +1(가장 가까움) / -1(가장 멀음)

const SURVEY_PAGE = {
  sections: [
    // 1) DISC
    {
      name: "DISC",
      typeOrder: ["D","I","S","C"],
      mapLabel: { D:"주도형", I:"사교형", S:"안정형", C:"신중형" }, // 관리자 전용 라벨
      questions: [
        {
          id: "DISC1",
          title: "새로운 프로젝트를 맡게 되었을 때, 나는",
          options: [
            { text: "목표를 빠르게 설정하고 팀을 주도한다.", type: "D" },
            { text: "팀원들과 친밀하게 소통하며 분위기를 만든다.", type: "I" },
            { text: "절차와 계획을 안정적으로 마련한다.", type: "S" },
            { text: "세부 내용을 철저히 분석하고 정확성을 높인다.", type: "C" },
          ]
        },
        {
          id: "DISC2",
          title: "누군가 내 아이디어에 의문을 제기하면, 나는",
          options: [
            { text: "근거를 들어 설득한다.", type: "D" },
            { text: "상대방의 의견을 긍정적으로 받아들이며 대화를 잇는다.", type: "I" },
            { text: "즉각 반박하지 않고 차분히 들은 뒤 답한다.", type: "S" },
            { text: "추가 자료와 사실로 논리를 보완한다.", type: "C" },
          ]
        },
        {
          id: "DISC3",
          title: "팀 모임에서 나는",
          options: [
            { text: "빠르게 결정을 내리고 방향을 제시한다.", type: "D" },
            { text: "농담이나 사례로 분위기를 유쾌하게 만든다.", type: "I" },
            { text: "모든 사람이 의견을 말할 수 있도록 배려한다.", type: "S" },
            { text: "안건과 진행 순서를 정확히 지킨다.", type: "C" },
          ]
        },
        {
          id: "DISC4",
          title: "새로운 변화를 맞이하면, 나는",
          options: [
            { text: "변화의 장점을 찾고 실행 계획을 세운다.", type: "D" },
            { text: "변화를 흥미롭게 받아들이고 주변에 공유한다.", type: "I" },
            { text: "변화가 모두에게 무리가 없도록 조율한다.", type: "S" },
            { text: "변화에 따른 리스크를 점검한다.", type: "C" },
          ]
        },
        {
          id: "DISC5",
          title: "다른 사람과 협업할 때, 나는",
          options: [
            { text: "명확한 목표와 역할을 제시한다.", type: "D" },
            { text: "대화를 자주 하며 관계를 강화한다.", type: "I" },
            { text: "서로의 속도와 스타일에 맞춘다.", type: "S" },
            { text: "자료와 근거를 공유해 신뢰를 높인다.", type: "C" },
          ]
        },
      ]
    },

    // 2) 스트레스 대처
    {
      name: "COPING",
      typeOrder: ["P","A","M","S","E"], // 문제/회피/의미/사회/감정
      mapLabel: { P:"문제 중심", A:"회피 중심", M:"의미 중심", S:"사회적 지지", E:"감정 중심" },
      questions: [
        {
          id: "COP1",
          title: "예상치 못한 일정 변경이 생기면",
          options: [
            { text: "새로운 일정에 맞춰 우선순위를 다시 조정한다.", type: "P" },
            { text: "상황이 안정될 때까지 일단 다른 일부터 처리한다.", type: "A" },
            { text: "이 변화가 나에게 줄 긍정적인 의미를 생각해본다.", type: "M" },
            { text: "경험이 있는 동료에게 조언을 구한다.", type: "S" },
            { text: "짧게 산책하거나 음악을 듣고 마음을 가라앉힌다.", type: "E" },
          ]
        },
        {
          id: "COP2",
          title: "큰 실수를 했을 때",
          options: [
            { text: "원인을 파악하고 재발 방지 계획을 세운다.", type: "P" },
            { text: "바로 대응하지 않고 상황을 차분히 정리한 뒤 접근한다.", type: "A" },
            { text: "이번 경험이 장기적으로 어떤 의미가 있을지 되돌아본다.", type: "M" },
            { text: "신뢰하는 사람에게 상황을 이야기해 본다.", type: "S" },
            { text: "심호흡이나 명상으로 마음을 안정시킨다.", type: "E" },
          ]
        },
        {
          id: "COP3",
          title: "마감 기한이 촉박할 때",
          options: [
            { text: "해야 할 일을 목록화하고 순서대로 처리한다.", type: "P" },
            { text: "먼저 처리 가능한 부분부터 착수해 흐름을 만든다.", type: "A" },
            { text: "이 경험이 나의 성장에 줄 기회를 떠올린다.", type: "M" },
            { text: "주변에 도움을 요청해 일을 분담한다.", type: "S" },
            { text: "커피 한 잔이나 짧은 휴식으로 긴장을 완화한다.", type: "E" },
          ]
        },
        {
          id: "COP4",
          title: "중요한 시험이나 평가 전",
          options: [
            { text: "예상되는 문제를 분석해 전략적으로 준비한다.", type: "P" },
            { text: "준비가 덜 된 부분은 잠시 두고 자신 있는 부분을 다진다.", type: "A" },
            { text: "결과보다 배움의 과정을 소중히 여긴다.", type: "M" },
            { text: "함께 준비할 사람을 찾아 스터디를 한다.", type: "S" },
            { text: "긍정적인 자기 대화를 통해 자신감을 높인다.", type: "E" },
          ]
        },
        {
          id: "COP5",
          title: "동료와 의견이 엇갈릴 때",
          options: [
            { text: "대안을 제시하며 해결책을 찾는다.", type: "P" },
            { text: "감정이 격해지지 않도록 대화를 잠시 멈춘다.", type: "A" },
            { text: "서로 다른 의견의 가치와 배경을 생각한다.", type: "M" },
            { text: "제3자의 의견을 들어 조율한다.", type: "S" },
            { text: "잠시 자리를 비우고 마음을 진정시킨다.", type: "E" },
          ]
        },
        {
          id: "COP6",
          title: "계획이 틀어졌을 때",
          options: [
            { text: "즉시 대안을 마련해 새 계획을 세운다.", type: "P" },
            { text: "우선 급하지 않은 부분부터 정리하며 방향을 잡는다.", type: "A" },
            { text: "변화가 내게 주는 메시지를 찾는다.", type: "M" },
            { text: "신뢰하는 사람에게 의견을 구한다.", type: "S" },
            { text: "좋아하는 활동으로 스트레스를 완화한다.", type: "E" },
          ]
        },
        {
          id: "COP7",
          title: "기대에 미치지 못한 결과를 받았을 때",
          options: [
            { text: "다음에 보완할 방법을 구체화한다.", type: "P" },
            { text: "잠시 결과를 뒤로 하고 다른 과제에 집중한다.", type: "A" },
            { text: "이번 경험이 장기적으로 어떤 가치가 될지 생각한다.", type: "M" },
            { text: "경험이 있는 사람과 이야기를 나눈다.", type: "S" },
            { text: "혼자만의 시간을 가지며 감정을 정리한다.", type: "E" },
          ]
        },
        {
          id: "COP8",
          title: "갑작스러운 요청을 받았을 때",
          options: [
            { text: "필요한 자료나 방법을 신속히 준비한다.", type: "P" },
            { text: "가능한 범위에서 처리할 수 있는 부분부터 진행한다.", type: "A" },
            { text: "이번 기회가 나에게 어떤 의미를 줄 수 있는지 생각한다.", type: "M" },
            { text: "관련 경험이 있는 사람의 도움을 받는다.", type: "S" },
            { text: "호흡을 가다듬고 차분히 대응한다.", type: "E" },
          ]
        },
        {
          id: "COP9",
          title: "반복되는 어려움이 있을 때",
          options: [
            { text: "문제를 구조적으로 분석해 해결책을 찾는다.", type: "P" },
            { text: "필요한 때까지 잠시 주제를 바꾸며 새로운 시각을 얻는다.", type: "A" },
            { text: "이 과정이 내 가치관과 어떻게 연결되는지 생각한다.", type: "M" },
            { text: "함께 해결할 동료를 찾는다.", type: "S" },
            { text: "음악이나 운동으로 기분을 전환한다.", type: "E" },
          ]
        },
        {
          id: "COP10",
          title: "중요한 발표를 앞두고 긴장될 때",
          options: [
            { text: "자료를 점검하고 리허설을 한다.", type: "P" },
            { text: "준비를 잠시 멈추고 시야를 넓히는 활동을 한다.", type: "A" },
            { text: "발표 경험이 내 성장에 주는 의미를 생각한다.", type: "M" },
            { text: "피드백을 줄 수 있는 사람에게 연습을 부탁한다.", type: "S" },
            { text: "스트레칭과 호흡으로 긴장을 푼다.", type: "E" },
          ]
        },
      ]
    },

    // 3) 동기·가치관 (A/B/C/D)
    {
      name: "MOTIV",
      typeOrder: ["A","B","C","D"], // 안정/관계/성과/성장
      mapLabel: { A:"안정 지향", B:"관계 지향", C:"성과 지향", D:"성장 지향" },
      questions: [
        {
          id: "MOT1",
          title: "상황: 새로운 프로젝트에 합류하게 되었습니다. 가장 먼저 신경 쓰는 것은 무엇입니까?",
          options: [
            { text: "일정과 절차를 명확히 세워두고 진행한다", type: "A" },
            { text: "여러 사람의 아이디어를 모아 방향을 정한다", type: "B" },
            { text: "완성 후 성과를 어떻게 측정할지 기준을 만든다", type: "C" },
            { text: "모르는 분야를 배우기 위해 자료를 찾아본다", type: "D" },
          ]
        },
        {
          id: "MOT2",
          title: "상황: 중요한 보고서를 맡았습니다. 어떤 접근 방식을 선택할 것입니까?",
          options: [
            { text: "마감 전까지 안정적으로 결과물을 유지하는 데 집중한다", type: "A" },
            { text: "팀원 각자의 강점을 파악해 역할을 배분한다", type: "B" },
            { text: "핵심 포인트를 간결하게 전달해 임팩트를 준다", type: "C" },
            { text: "기존 자료를 넘어 새로운 사례나 방법을 찾아 반영한다", type: "D" },
          ]
        },
        {
          id: "MOT3",
          title: "상황: 회사가 새로운 시스템을 도입한다고 합니다. 나는…",
          options: [
            { text: "안정적으로 운영될 때까지 기존 방식을 병행한다", type: "A" },
            { text: "함께 사용하는 사람들의 의견을 먼저 들어본다", type: "B" },
            { text: "시스템을 활용해 업무 속도를 높일 방법을 연구한다", type: "C" },
            { text: "시스템의 기능을 직접 시험하며 최적 활용법을 찾는다", type: "D" },
          ]
        },
        {
          id: "MOT4",
          title: "상황: 장기 프로젝트 초반 단계에서 가장 중요하게 생각하는 것은…",
          options: [
            { text: "계획을 세부적으로 쪼개어 위험 요소를 줄이는 것", type: "A" },
            { text: "모든 구성원이 목표를 동일하게 이해하도록 하는 것", type: "B" },
            { text: "중간 성과를 빠르게 달성해 동력을 확보하는 것", type: "C" },
            { text: "새로운 아이디어를 실험적으로 적용해 보는 것", type: "D" },
          ]
        },
        {
          id: "MOT5",
          title: "상황: 갑작스럽게 다른 부서와 협업하게 되었습니다. 나는…",
          options: [
            { text: "예기치 못한 변수에도 일정이 흔들리지 않게 한다", type: "A" },
            { text: "서로의 방식 차이를 이해하고 조율한다", type: "B" },
            { text: "협업으로 달성할 수 있는 성과를 명확히 제시한다", type: "C" },
            { text: "다른 부서에서 배울 수 있는 점을 적극 찾는다", type: "D" },
          ]
        },
        {
          id: "MOT6",
          title: "상황: 목표를 정할 때, 나는…",
          options: [
            { text: "예측 가능한 자원과 범위 안에서 설정한다", type: "A" },
            { text: "조직 전반에 긍정적인 영향을 줄 수 있는 목표를 세운다", type: "B" },
            { text: "도전적이지만 달성 시 성과가 분명한 목표를 세운다", type: "C" },
            { text: "내 역량을 넓힐 수 있는 새로운 시도를 포함한다", type: "D" },
          ]
        },
        {
          id: "MOT7",
          title: "상황: 성과 발표회를 앞두고 있다면, 나는…",
          options: [
            { text: "발표 자료의 완성도를 안정적으로 유지한다", type: "A" },
            { text: "함께 준비한 사람들의 노고를 드러내는 발표를 한다", type: "B" },
            { text: "주요 수치를 강조해 성과를 부각한다", type: "C" },
            { text: "청중이 새로운 시각을 얻을 수 있도록 구성한다", type: "D" },
          ]
        },
        {
          id: "MOT8",
          title: "상황: 새로운 직무 기회를 제안받았습니다. 나는…",
          options: [
            { text: "현재의 생활 패턴과 조화를 이룰 수 있는지 본다", type: "A" },
            { text: "이 일을 통해 만날 사람들과의 시너지를 상상한다", type: "B" },
            { text: "성과와 보상이 명확히 보장되는지 확인한다", type: "C" },
            { text: "나의 커리어를 확장시킬 수 있는지 살핀다", type: "D" },
          ]
        }
      ]
    }
  ]
};

(function renderSurvey() {
  const $root = document.getElementById("surveyQuestions");
  SURVEY_PAGE.sections.forEach((sec) => {
    // 섹션 제목(사용자에게 유형명은 노출하지 않음)
    const sectionTitle = document.createElement("div");
    sectionTitle.className = "q-card";
    sectionTitle.style.background = "var(--bg-primary)";
    sectionTitle.innerHTML = `<div class="q-title" style="margin:0 0 2px 0;">${sec.name === "DISC" ? "DISC 유형" : sec.name === "COPING" ? "스트레스 대처" : "동기·가치관"}</div>
      <div class="scenario-info" style="margin-bottom:6px">각 문항에서 '가장 가깝다' 1개와 '가장 멀다' 1개를 선택하세요.</div>`;
    $root.appendChild(sectionTitle);

    sec.questions.forEach((q) => {
      const div = document.createElement("div");
      div.className = "q-card";
      div.innerHTML = `
        <div class="q-title">${q.title}</div>
        <div class="grid-head"><div>항목</div><div>가장 가깝다</div><div>가장 멀다</div></div>
        <div>
          ${q.options.map((opt, i) => `
            <div class="option-row">
              <div>${opt.text}</div>
              <div><input type="radio" name="${q.id}_close" value="${i}" data-pair="${q.id}"></div>
              <div><input type="radio" name="${q.id}_far" value="${i}" data-pair="${q.id}"></div>
            </div>
          `).join("")}
        </div>
      `;
      $root.appendChild(div);
    });

    const spacer = document.createElement('div');
    spacer.style.height = '8px';
    $root.appendChild(spacer);
  });

  // 같은 항목에 대해 가장 가깝다/멀다를 동시에 선택 못하게 방지
  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t?.name?.endsWith('_close') || t?.name?.endsWith('_far')) {
      const qid = t.getAttribute('data-pair');
      const closeIdx = getCheckedIndex(`${qid}_close`);
      const farIdx   = getCheckedIndex(`${qid}_far`);
      if (closeIdx !== null && farIdx !== null && closeIdx === farIdx) {
        // 방금 체크한 쪽을 취소
        t.checked = false;
        alert("같은 항목을 동시에 선택할 수 없습니다.");
      }
    }
  });

  document.getElementById("submitSurvey").addEventListener("click", submitSurvey);
})();

function getCheckedIndex(name) {
  const nodes = document.querySelectorAll(`input[name="${name}"]`);
  for (const n of nodes) if (n.checked) return parseInt(n.value,10);
  return null;
}

async function submitSurvey() {
  const openText = (document.getElementById("openText")?.value || "").trim();
  if (!openText) {
    alert("서술 문항을 작성해주세요.");
    return;
  }

  const result = {
    id: Date.now(),
    openText,
    createdAt: new Date().toISOString(),
    disc: null,
    coping: null,
    motiv: null
  };

  for (const sec of SURVEY_PAGE.sections) {
    const scores = {};
    sec.typeOrder.forEach(t => scores[t] = 0);
    const answers = [];

    for (const q of sec.questions) {
      const closeIdx = getCheckedIndex(`${q.id}_close`);
      const farIdx   = getCheckedIndex(`${q.id}_far`);
      if (closeIdx === null || farIdx === null) {
        return alert("모든 문항에서 ‘가장 가깝다’와 ‘가장 멀다’를 각각 선택해주세요.");
      }
      if (closeIdx === farIdx) {
        return alert("같은 항목을 동시에 선택할 수 없습니다.");
      }
      const closeType = q.options[closeIdx].type;
      const farType   = q.options[farIdx].type;
      scores[closeType] += 1;
      scores[farType]   -= 1;
      answers.push({
        questionId: q.id,
        closest: { index: closeIdx, text: q.options[closeIdx].text, type: closeType },
        farthest:{ index: farIdx,  text: q.options[farIdx].text,  type: farType }
      });
    }

    const top = sec.typeOrder
      .map(t => ({t, v:scores[t]}))
      .sort((a,b)=> b.v - a.v || sec.typeOrder.indexOf(a.t)-sec.typeOrder.indexOf(b.t))[0];
    const low = sec.typeOrder
      .map(t => ({t, v:scores[t]}))
      .sort((a,b)=> a.v - b.v || sec.typeOrder.indexOf(a.t)-sec.typeOrder.indexOf(b.t))[0];

    const packed = {
      scores,
      topType: top.t, topScore: top.v,
      lowType: low.t, lowScore: low.v,
      answers
    };

    if (sec.name === "DISC")   result.disc   = packed;
    if (sec.name === "COPING") result.coping = packed;
    if (sec.name === "MOTIV")  result.motiv  = packed;
  }

  // 사용자 컨텍스트
  const userRaw = localStorage.getItem("macarong_user");
  let userCtx = {};
  try { userCtx = userRaw ? JSON.parse(userRaw) : {}; } catch(e){}

  const payload = {
    ...result,
    name: userCtx.name || "",
    email: userCtx.email || "",
    birth: userCtx.birth || "",       // index에서 yyyyMMdd 저장
    surveyCompleted: true
  };

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

  // 플래그 업데이트
  localStorage.setItem("macarong_user", JSON.stringify({
    ...userCtx, surveyCompleted:true
  }));

  alert("수고하셨습니다. 이어서 시뮬레이션 검사가 진행됩니다.");
  location.href = "simulator.html";
}
