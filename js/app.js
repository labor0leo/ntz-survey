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
        console.log('🚗 조직 협업 시뮬레이터 시작!');

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
                <h3>🚗 NTZ Fit 시뮬레이터</h3>
                <p>시뮬레이터 시작 전 간단한 정보를 입력해주세요.</p>
                <div class="input-group">
                    <label for="applicantName">이름 *</label>
                    <input type="text" id="applicantName" placeholder="홍길동" required>
                </div>
                <div class="input-group">
                    <label for="applicantEmail">이메일 (선택)</label>
                    <input type="email" id="applicantEmail" placeholder="hong@example.com">
                </div>
                <div class="modal-buttons">
                    <button class="start-button" onclick="window.cultureSimulator.startSimulator()">시뮬레이터 시작</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    startSimulator() {
        const nameInput = document.getElementById('applicantName');
        const emailInput = document.getElementById('applicantEmail');
        if (!nameInput.value.trim()) {
            alert('이름을 입력해주세요.');
            return;
        }
        this.applicantData.name = nameInput.value.trim();
        this.applicantData.email = emailInput.value.trim();
        this.applicantData.startTime = new Date();
        document.querySelector('.modal-overlay').remove();
        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        const welcomeMessage = {
            sender: "NTZ Fit 시뮬레이터",
            avatar: "🚗",
            content: `안녕하세요 ${this.applicantData.name}님! 실제 협업 상황을 체험해보세요. 각 상황에서 핵심가치에 맞는 선택을 해보시기 바랍니다.`,
            isUser: false
        };
        this.addMessage(welcomeMessage);
        setTimeout(() => { this.showIntroScenarioMessage(); }, 800);
    }

    // ✅ 모든 시나리오 메시지를 "완전 직렬"로 보여주고 → 선택지 표시
    async showScenarioWithChoices(scenario) {
        // 헤더 업데이트
        document.querySelector('.time').textContent = scenario.time;
        document.querySelector('.scenario-info').textContent = scenario.title;

        // 메시지들을 순차로 표시
        for (const m of scenario.messages) {
            await this.sleep(m.delay || 800);
            this.addMessage(m);
        }
        await this.sleep(600);
        this.showChoices();
    }

    showIntroScenarioMessage() {
        const scenario = this.scenarioManager.startScenario(this.currentScenarioId);
        const introMessages = [
            { sender: "🚀 조직 소개", avatar: "🚀", content: `우리는 청년 교육과 기업 교육을 연결하는 교육 조직입니다.`, isUser: false },
            { sender: "📱 서비스 소개", avatar: "📱", content: `실전 중심 커리큘럼과 협업 기반 운영으로 현장 적합도를 높입니다.`, isUser: false },
            { sender: "🤝 파트너", avatar: "🤝", content: `지자체/기업 파트너와 협력하여 청년/직무 교육을 공동 운영합니다.`, isUser: false },
            { sender: "👥 학습자", avatar: "👥", content: `수강생들이 바로 적용 가능한 실습형 경험을 제공합니다.`, isUser: false },
            { sender: "시나리오", avatar: "📋", content: `**${scenario.title}**\n\n${scenario.description}`, isUser: false }
        ];

        // 인트로도 완전 직렬
        (async () => {
            for (const m of introMessages) {
                await this.sleep(700);
                this.addMessage(m);
            }
            await this.sleep(700);
            this.showScenarioWithChoices(scenario);
        })();
    }

    startScenario(scenarioId) {
        const scenario = this.scenarioManager.startScenario(scenarioId);
        if (!scenario) return;
        this.showScenarioWithChoices(scenario);
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
        // 사용자 선택 표시
        this.addMessage({
            sender: "나 (Product Designer)",
            avatar: "PD",
            content: choice.text,
            isUser: true
        });

        // 기록 및 점수 반영
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

        // 선택지 숨김
        document.getElementById('choicesContainer').style.display = 'none';

        // 코멘트(해설/피드백) → 다음 시나리오
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
