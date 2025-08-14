// 한 페이지 설문: (1) DISC 5문항 (D/I/S/C)  (2) 스트레스 대처 10문항 (P/A/M/S/E)
// UI에는 유형 라벨을 절대 노출하지 않음. +1(가장 가까움) / -1(가장 멀음)

const SURVEY_PAGE = {
  sections: [
    {
      name: "DISC",
      typeOrder: ["D","I","S","C"],
      mapLabel: { D:"주도형", I:"사교형", S:"안정형", C:"신중형" },
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
    {
      name: "COPING",
      typeOrder: ["P","A","M","S","E"], // 문제/회피/의미/사회/감정
      mapLabel: { P:"문제 중심", A:"회피 중심", M:"의미 중심", S:"사회적 지지", E:"감정 중심" },
      questions: [
        {
          id: "COP1",
          title: "1. 예상치 못한 일정 변경이 생기면",
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
          title: "2. 큰 실수를 했을 때",
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
          title: "3. 마감 기한이 촉박할 때",
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
          title: "4. 중요한 시험이나 평가 전",
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
          title: "5. 동료와 의견이 엇갈릴 때",
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
          title: "6. 계획이 틀어졌을 때",
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
          title: "7. 기대에 미치지 못한 결과를 받았을 때",
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
          title: "8. 갑작스러운 요청을 받았을 때",
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
          title: "9. 반복되는 어려움이 있을 때",
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
          title: "10. 중요한 발표를 앞두고 긴장될 때",
          options: [
            { text: "자료를 점검하고 리허설을 한다.", type: "P" },
            { text: "준비를 잠시 멈추고 시야를 넓히는 활동을 한다.", type: "A" },
            { text: "발표 경험이 내 성장에 주는 의미를 생각한다.", type: "M" },
            { text: "피드백을 줄 수 있는 사람에게 연습을 부탁한다.", type: "S" },
            { text: "스트레칭과 호흡으로 긴장을 푼다.", type: "E" },
          ]
        },
      ]
    }
  ]
};

(function renderSurvey() {
  const $root = document.getElementById("surveyQuestions");
  SURVEY_PAGE.sections.forEach((sec, sidx) => {
    sec.questions.forEach((q, qidx) => {
      const div = document.createElement("div");
      div.className = "q-card";
      div.innerHTML = `
        <div class="q-title">${q.title}</div>
        <div class="grid-head"><div>항목</div><div>가장 가깝다 (+1)</div><div>가장 멀다 (-1)</div></div>
        <div>
          ${q.options.map((opt, i) => `
            <div class="option-row">
              <div>${opt.text}</div>
              <div><input type="radio" name="${q.id}_close" value="${i}"></div>
              <div><input type="radio" name="${q.id}_far" value="${i}"></div>
            </div>
          `).join("")}
        </div>
      `;
      $root.appendChild(div);
    });
    // 섹션 간 여백
    const spacer = document.createElement('div');
    spacer.style.height = '8px';
    $root.appendChild(spacer);
  });
  document.getElementById("submitSurvey").addEventListener("click", submitSurvey);
})();

function getCheckedIndex(name) {
  const nodes = document.querySelectorAll(`input[name="${name}"]`);
  for (const n of nodes) if (n.checked) return parseInt(n.value,10);
  return null;
}

async function submitSurvey() {
  // (설명형 문항이 있다면 여기서 수집. 현재는 인덱스에서 기본정보/생년월일 입력)
  const openText = (document.getElementById("openText")?.value || "").trim();

  const result = { 
    id: Date.now(),
    openText,
    createdAt: new Date().toISOString(),
    // 두 섹션 결과를 분리 저장
    disc: null,
    coping: null
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
      scores,                 // {D/I/S/C} 또는 {P/A/M/S/E}
      topType: top.t, topScore: top.v,
      lowType: low.t, lowScore: low.v,
      answers
    };

    if (sec.name === "DISC")   result.disc   = packed;
    if (sec.name === "COPING") result.coping = packed;
  }

  // 사용자 컨텍스트 (index에서 저장한 이름/이메일/생년월과 합쳐 사용)
  const userRaw = localStorage.getItem("macarong_user");
  let userCtx = {};
  try { userCtx = userRaw ? JSON.parse(userRaw) : {}; } catch(e){}

  const payload = {
    ...result,
    name: userCtx.name || "",
    email: userCtx.email || "",
    birth: userCtx.birth || "",       // index에서 yyyymmdd
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

  // 쿠키/LS 플래그로 시뮬 시작 허용
  localStorage.setItem("macarong_user", JSON.stringify({
    ...userCtx, surveyCompleted:true
  }));

  alert("수고하셨습니다. 이어서 시뮬레이션 검사가 진행됩니다.");
  location.href = "simulator.html";
}
