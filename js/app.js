// 조직 협업 시뮬레이터 메인 로직
class CultureFitSimulator {
    constructor() {
        this.scenarioManager = new ScenarioManager();
        this.currentScenarioId = 'scenario1';
        this.applicantData = {
            name: "",
            email: "",
            startTime: new Date(),
            endTime: null,
            responses: [],
            scores: {},
            finalPercentage: 0
        };
        this.initializeApp();
    }

    initializeApp() {
        console.log('🚗 New Way NTZ 시작!');

        // 설문 완료 여부 확인: 완료 시 바로 시작
        try {
            const raw = localStorage.getItem("macarong_user");
            if (raw) {
                const u = JSON.parse(raw);
                if (u?.surveyCompleted && u?.name) {
                    this.applicantData.name = u.name;
                    this.applicantData.email = u.email || "";
                    this.applicantData.startTime = new Date();
                    this.showWelcomeMessage();
                    this.setupEventListeners();
                    return;
                }
            }
        } catch(e){ console.warn("user context parse fail", e); }

        // simulator.html 진입인데 설문 미완료 → 설문 먼저
        if (!location.search.includes("bypassSurvey=true")) {
            location.href = "survey.html";
            return;
        }

        // (fallback)
        this.showApplicantInfoModal();
        this.setupEventListeners();
    }

    showApplicantInfoModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🚗 New Way NTZ 채용 검사</h3>
                <p>검사 시작 전 간단한 정보를 입력해주세요.</p>
                <div class="input-group">
                    <label for="applicantName">이름 *</label>
                    <input type="text" id="applicantName" placeholder="홍길동" required>
                </div>
                <div class="input-group">
                    <label for="applicantEmail">이메일 (선택)</label>
                    <input type="email" i다.`, isUser: false },
            { sender: "👥 학습자", avatar: "👥", content: `수강생들이 바로 적용 가능한 실습형 경험을 제공합니다.`, isUser: false }
        ];

        (async () => {
            for (const m of introMessages) {
                await this.sleep(700);
                this.addMessage(m);
            }
            await this.sleep(700);

            // ✅ 시나리오1도 동일 흐름: 디스크립션부터 시작
            this.showScenarioWithChoices(scenario, true);
        })();
    }

    startScenario(scenarioId) {
        const scenario = this.scenarioManager.startScenario(scenarioId);
        if (!scenario) return;
        // ✅ 항상 디스크립션을 먼저 보여줌
        this.showScenarioWithChoices(scenario, true);
    }

    addMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.isUser ? 'user' : ''}`;
        const formattedContent = (message.content || '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        messageDiv.innerHTML = `
            <div class="message-avatar">${message.avatar || '💬'}</div>
            <div class="message-content">
                <div class="message-sender">${message.sender || ''}</div>
                <div>${formattedContent}</div>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.25s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        });
        this.scrollToBottom();
    }

    showChoices() {
        const scenario = this.scenarioManager.currentScenario;
        const choicesContainer = document.getElementById('choicesContainer');
        choicesContainer.innerHTML = '';
        choicesContainer.style.display = 'block';

        const shuffled = [...scenario.choices];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        shuffled.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-button';
            btn.innerHTML = `<span class="choice-number">${index + 1}</span>${choice.text}`;
            btn.onclick = () => this.selectChoice(choice);
            btn.setAttribute('data-key', index + 1);
            choicesContainer.appendChild(btn);
        });
    }

    async selectChoice(choice) {
        // 사용자 선택
        this.addMessage({ sender: "나 (Product Designer)", avatar: "PD", content: choice.text, isUser: true });

        // 기록/점수
        this.applicantData.responses.push({
            scenarioId: this.currentScenarioId,
            scenarioTitle: this.scenarioManager.currentScenario.title,
            choiceId: choice.id,
            choiceText: choice.text,
            isCultureFit: choice.isCultureFit,
            points: choice.points,
            timestamp: new Date()
        });
        const result = this.scenarioManager.selectChoice(choice.id);

        // 선택지 닫기
        document.getElementById('choicesContainer').style.display = 'none';

        // 코멘트 → 다음
        await this.sleep(600);
        if (choice.isCultureFit) {
            this.addMessage({
                sender: "조직 협업 분석",
                avatar: "⭐",
                content: "핵심가치에 부합하는 좋은 선택입니다.",
                isUser: false
            });
            await this.sleep(800);
        }
        if (result?.nextMessage) {
            this.addMessage(result.nextMessage);
            await this.sleep(1200);
        }
        this.proceedToNext();
    }

    proceedToNext() {
        const nextScenarioId = this.scenarioManager.getNextScenario();
        if (nextScenarioId) {
            this.currentScenarioId = nextScenarioId;
            this.addMessage({ sender: "시뮬레이터", avatar: "⏭️", content: "다음 상황으로 넘어갑니다...", isUser: false });
            setTimeout(() => { this.startScenario(this.currentScenarioId); }, 1000);
        } else {
            this.showFinalResult();
        }
    }

    showFinalResult() {
        this.applicantData.endTime = new Date();
        this.applicantData.scores = this.scenarioManager.getTotalScore();

        const cultureFitCount = this.applicantData.responses.filter(r => r.isCultureFit).length;
        const totalScenarios = 5;
        const culturePercentage = Math.round((cultureFitCount / totalScenarios) * 100);
        this.applicantData.finalPercentage = culturePercentage;

        this.addMessage({
            sender: "조직 협업 분석",
            avatar: "🎯",
            content: `<h3>🚗 시뮬레이션이 완료되었습니다.</h3>`,
            isUser: false
        });

        setTimeout(() => {
            this.saveApplicantData();
            setTimeout(() => { this.showRestartButton(); }, 1000);
        }, 600);
    }

    async saveApplicantData() {
        const applicantResult = {
            id: Date.now(),
            ...this.applicantData,
            duration: this.applicantData.endTime - this.applicantData.startTime,
            createdAt: new Date().toISOString()
        };
        try {
            if (window.firestoreManager) {
                await window.firestoreManager.saveApplicant(applicantResult);
                console.log('✅ Firestore 저장 완료:', applicantResult.id);
            } else {
                console.warn('⚠️ Firestore 미초기화. localStorage 백업만 수행');
            }
        } catch (e) {
            console.error('❌ Firestore 저장 실패:', e);
        }
        try {
            const arr = JSON.parse(localStorage.getItem('macarong_applicants') || '[]');
            arr.push(applicantResult);
            localStorage.setItem('macarong_applicants', JSON.stringify(arr));
        } catch (e) {
            console.error('❌ localStorage 저장 실패:', e);
        }
    }

    showRestartButton() {
        const chatMessages = document.getElementById('chatMessages');
        const restartDiv = document.createElement('div');
        restartDiv.className = 'message';
        restartDiv.innerHTML = `
            <div class="message-avatar">🔄</div>
            <div class="message-content">
                <button class="choice-button" onclick="location.reload()" style="margin: 0;">다시 체험해보기</button>
            </div>
        `;
        chatMessages.appendChild(restartDiv);
        this.scrollToBottom();
    }

    setupEventListeners() {
        // 숫자키 단축
        document.addEventListener('keydown', (e) => {
            const choicesContainer = document.getElementById('choicesContainer');
            if (choicesContainer.style.display !== 'none') {
                if (e.key >= '1' && e.key <= '5') {
                    const choices = choicesContainer.querySelectorAll('.choice-button');
                    const idx = parseInt(e.key) - 1;
                    if (choices[idx]) choices[idx].click();
                }
            }
        });
        // 터치 피드백
        document.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('choice-button')) e.target.style.transform = 'scale(0.98)';
        });
        document.addEventListener('touchend', (e) => {
            if (e.target.classList.contains('choice-button')) e.target.style.transform = '';
        });
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        requestAnimationFrame(() => { chatMessages.scrollTop = chatMessages.scrollHeight; });
    }

    sleep(ms){ return new Promise(r => setTimeout(r, ms)); }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', function() {
    window.cultureSimulator = new CultureFitSimulator();
});
