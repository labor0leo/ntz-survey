// 설문 문항 스키마 (임시 예시 — 텍스트/타입은 나중에 바꿔도 됨)
const QUESTIONS = [
  {
    id: 1,
    text: "다음 보기 중 본인과 가장 가까운 것 / 먼 것을 선택하세요.",
    options: [
      { text: "항목 A", type: "A" },
      { text: "항목 B", type: "B" },
      { text: "항목 C", type: "C" },
      { text: "항목 D", type: "D" }
    ]
  },
  {
    id: 2,
    text: "다음 보기 중 본인과 가장 가까운 것 / 먼 것을 선택하세요.",
    options: [
      { text: "항목 E", type: "A" },
      { text: "항목 F", type: "B" },
      { text: "항목 G", type: "C" },
      { text: "항목 H", type: "D" }
    ]
  }
];

// 렌더
const container = document.getElementById("questionContainer");
QUESTIONS.forEach(q => {
  const wrap = document.createElement("div");
  wrap.className = "input-group";
  wrap.innerHTML = `<label style="margin-bottom:10px">${q.text}</label>`;
  q.options.forEach((opt, idx) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.justifyContent = "space-between";
    row.style.gap = "8px";
    row.style.padding = "8px 12px";
    row.style.border = "1px solid var(--border-color)";
    row.style.borderRadius = "10px";
    row.style.margin = "6px 0";
    row.innerHTML = `
      <div style="flex:1">${opt.text}</div>
      <div style="display:flex;gap:12px">
        <label><input type="radio" name="q${q.id}_closest" value="${idx}"> 가장 가까움</label>
        <label><input type="radio" name="q${q.id}_farthest" value="${idx}"> 가장 멂</label>
      </div>
    `;
    container.appendChild(row);
  });

  // 라디오 상호 배타 제약: 같은 옵션을 두 그룹에 동시 선택 방지
  container.addEventListener('change', (e) => {
    if (!e.target.matches(`input[name="q${q.id}_closest"], input[name="q${q.id}_farthest"]`)) return;
    const closest = document.querySelector(`input[name="q${q.id}_closest"]:checked`);
    const farthest = document.querySelector(`input[name="q${q.id}_farthest"]:checked`);
    if (closest && farthest && closest.value === farthest.value) {
      // 바로 취소 처리: 방금 바꾼 쪽을 해제
      e.target.checked = false;
      alert('같은 항목을 "가장 가까움"과 "가장 멂"으로 동시에 선택할 수 없습니다.');
    }
  });
});

// 제출
document.getElementById("submitSurveyBtn").addEventListener("click", async () => {
  const name = document.getElementById("userName").value.trim();
  const dob  = document.getElementById("userDob").value;
  const desc = document.getElementById("descQ").value.trim();

  if (!name) { alert("이름을 입력해주세요."); return; }
  if (!dob)  { alert("생년월일을 입력해주세요."); return; }
  if (!desc) { alert("서술형 문항을 작성해주세요."); return; }

  // 모든 문항 필수 체크 + 동일 선택 금지 체크
  const scores = { A:0, B:0, C:0, D:0 };
  const answers = [];

  for (const q of QUESTIONS) {
    const closest = document.querySelector(`input[name="q${q.id}_closest"]:checked`);
    const farthest = document.querySelector(`input[name="q${q.id}_farthest"]:checked`);

    if (!closest || !farthest) {
      alert(`문항 ${q.id}에 응답하지 않았습니다.`);
      return; // ✅ 미응답 시 제출 불가
    }
    if (closest.value === farthest.value) {
      alert(`문항 ${q.id}에서 같은 항목을 동시에 선택할 수 없습니다.`);
      return; // ✅ 동일 선택 시 제출 불가
    }

    const c = q.options[closest.value];
    const f = q.options[farthest.value];

    scores[c.type] += 1;
    scores[f.type] -= 1;
    answers.push({ closest: c, farthest: f });
  }

  // 최고 유형
  const topType = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];

  // 저장 (Firestore 우선, 실패 시 localStorage 백업)
  const payload = {
    name, dob,
    openText: desc,
    scores, topType,
    answers,
    createdAt: new Date().toISOString()
  };

  try{
    if (window.firestoreManager && window.firestoreManager.saveSurvey) {
      await window.firestoreManager.saveSurvey(payload);
    } else if (window.db) {
      await window.db.collection('surveys').add({ ...payload, timestamp: Date.now() });
    } else {
      throw new Error('Firestore not available');
    }
  }catch(e){
    console.warn('Firestore 저장 실패. localStorage 백업 사용', e);
    try{
      const arr = JSON.parse(localStorage.getItem('macarong_surveys') || '[]');
      arr.push(payload);
      localStorage.setItem('macarong_surveys', JSON.stringify(arr));
    }catch(e2){
      console.error('localStorage 백업 실패', e2);
    }
  }

  // 사용자 컨텍스트 저장 → 시뮬레이터 자동시작
  localStorage.setItem('macarong_user', JSON.stringify({
    name, dob, surveyCompleted: true
  }));

  alert("수고하셨습니다. 이어서 시뮬레이션 검사가 진행됩니다.");
  location.href = "index.html";
});
