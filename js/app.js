// 조직 협업 시뮬레이터 메인 로직
class CultureFitSimulator {
    constructor() {
        this.scenarioManager = new ScenarioManager();
        this.currentScenarioId = 'scenario1';
        this.messageQueue = [];
        this.isProcessing = false;
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
        
        // ✅ 설문 완료여부 확인: 설문 완료 시 모달 없이 바로 시작
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

        // 기본 진입이 simulator.html이라면, 설문 먼저
        if (!location.search.includes("bypassSurvey=true")) {
            location.href = "survey.html";
            return;
        }

        // (fallback) 기존 동작
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
            content: `안녕하세요 ${this.applicantData.name}님! 교육 조직의 프로덕트 디자이너가 되어 실제 협업 상황을 체험해보세요. 각 상황에서 핵심가치에 맞는 선택을 해보시기 바랍니다.`,
            isUser: false
        };
        this.addMessage(welcomeMessage);
        setTimeout(() => { this.showIntroScenarioMessage(); }, 1000);
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
        this.displayMessagesSequentially(introMessages, () => {
            setTimeout(() => { this.displayMessages(scenario.messages); }, 1500);
        });
    }

    startScenario(scenarioId) {
        const scenario = this.scenarioManager.startScenario(scenarioId);
        if (!scenario) return;
        document.querySelector('.time').textContent = scenario.time;
        document.querySelector('.scenario-info').textContent = scenario.title;

        if (scenarioId === 'scenario1') return;
        setTimeout(() => { this.displayMessages(scenario.messages); }, 1000);
    }

    displayMessages(messages) {
        messages.forEach((message, index) => {
            setTimeout(() => {
                this.addMessage(message);
                if (index === messages.length - 1) {
                    setTimeout(() => { this.showChoices(); }, 1500);
                }
            }, message.delay);
        });
    }

    displayMessagesSequentially(messages, callback) {
        let currentIndex = 0;
        const showNextMessage = () => {
            if (currentIndex < messages.length) {
                this.addMessage(messages[currentIndex]);
                currentIndex++;
                setTimeout(showNextMessage, 1500);
            } else {
                if (callback) callback();
            }
        };
        showNextMessage();
    }

    addMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.isUser ? 'user' : ''}`;
        const formattedContent = message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        messageDiv.innerHTML = `
            <div class="message-avatar">${message.avatar}</div>
            <div class="message-content">
                <div class="message-sender">${message.sender}</div>
                <div>${formattedContent}</div>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease';
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

        const shuffledChoices = [...scenario.choices];
        for (let i = shuffledChoices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledChoices[i], shuffledChoices[j]] = [shuffledChoices[j], shuffledChoices[i]];
        }
        
        shuffledChoices.forEach((choice, index) => {
            const choiceButton = document.createElement('button');
            choiceButton.className = 'choice-button';
            choiceButton.innerHTML = `
                <span class="choice-number">${index + 1}</span>
                ${choice.text}
            `;
            choiceButton.onclick = () => this.selectChoice(choice);
            choiceButton.setAttribute('data-key', index + 1);
            choicesContainer.appendChild(choiceButton);
        });
    }

    selectChoice(choice) {
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

        const userMessage = {
            sender: "나 (Product Designer)",
            avatar: "PD",
            content: choice.text,
            isUser: true
        };
        this.addMessage(userMessage);
        
        if (choice.isCultureFit) {
            setTimeout(() => {
                const feedbackMessage = {
                    sender: "조직 협업 분석",
                    avatar: "⭐",
                    content: "훌륭한 선택입니다! 핵심가치에 부합하는 답변이에요.",
                    isUser: false
                };
                this.addMessage(feedbackMessage);
            }, 500);
        }
        
        document.getElementById('choicesContainer').style.display = 'none';
        
        setTimeout(() => {
            if (result.nextMessage) this.addMessage(result.nextMessage);
            setTimeout(() => { this.proceedToNext(); }, 2000);
        }, 1000);
    }

    proceedToNext() {
        const nextScenarioId = this.scenarioManager.getNextScenario();
        if (nextScenarioId) {
            this.currentScenarioId = nextScenarioId;
            const transitionMessage = { sender: "시뮬레이터", avatar: "⏭️", content: "다음 상황으로 넘어갑니다...", isUser: false };
            this.addMessage(transitionMessage);
            setTimeout(() => { this.startScenario(this.currentScenarioId); }, 2000);
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

        const resultMessage = {
            sender: "조직 협업 분석",
            avatar: "🎯",
            content: `
                <h3>🚗 시뮬레이션이 완료되었습니다.</h3>
                <br>
            `,
            isUser: false
        };
        
        setTimeout(() => {
            this.addMessage(resultMessage);
            this.saveApplicantData();
            setTimeout(() => { this.showRestartButton(); }, 2000);
        }, 1000);
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
                console.log('✅ Firestore에 데이터 저장 완료:', applicantResult.id);
            } else {
                console.warn('⚠️ Firestore 매니저가 초기화되지 않음. localStorage만 사용.');
            }
        } catch (error) {
            console.error('❌ Firestore 저장 실패:', error);
            console.log('📦 localStorage에만 저장합니다.');
        }
        try {
            const existingData = JSON.parse(localStorage.getItem('macarong_applicants') || '[]');
            existingData.push(applicantResult);
            localStorage.setItem('macarong_applicants', JSON.stringify(existingData));
            console.log('📦 localStorage 백업 저장 완료');
        } catch (error) {
            console.error('❌ localStorage 저장도 실패:', error);
        }
        console.log('💾 지원자 데이터 저장 완료:', applicantResult);
    }

    getCultureFitComment(percentage) {
        if (percentage >= 85) return "🌟 완벽한 매칭! 핵심가치와 100% 일치합니다.";
        if (percentage >= 70) return "✨ 훌륭한 매칭! 충분한 잠재력을 가지고 있습니다.";
        if (percentage >= 55) return "💪 좋은 잠재력! 문화를 더 이해하면 완벽한 핏이 될 수 있습니다.";
        return "🤔 문화를 더 알아가는 시간이 필요합니다. 도전하는 정신은 이미 갖고 계세요!";
    }

    showRestartButton() {
        const chatMessages = document.getElementById('chatMessages');
        const restartDiv = document.createElement('div');
        restartDiv.className = 'message';
        restartDiv.innerHTML = `
            <div class="message-avatar">🔄</div>
            <div class="message-content">
                <button class="choice-button" onclick="location.reload()" style="margin: 0;">
                    다시 체험해보기
                </button>
            </div>
        `;
        chatMessages.appendChild(restartDiv);
        this.scrollToBottom();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            const choicesContainer = document.getElementById('choicesContainer');
            if (choicesContainer.style.display !== 'none') {
                if (e.key >= '1' && e.key <= '5') {
                    const choices = choicesContainer.querySelectorAll('.choice-button');
                    const choiceIndex = parseInt(e.key) - 1;
                    if (choices[choiceIndex]) choices[choiceIndex].click();
                }
            }
        });

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
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', function() {
    window.cultureSimulator = new CultureFitSimulator();
});
