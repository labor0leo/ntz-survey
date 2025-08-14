// 조직 협업 시뮬레이터 시나리오 데이터 (교육 도메인 버전)
// 점수 키: customer(고객중심), partnership(파트너십), worklife(회사생활), innovation(혁신), efficiency(효율성)

const scenarios = {
    // 1
    scenario1: {
        id: 1,
        title: "교육 후 피드백",
        time: "09:30 AM",
        description: "최근 ‘취업 준비생 커리어 설계 과정’을 마친 뒤, 참가자 설문에서 60%가 “이론은 이해했지만 실전 적용이 어렵다”는 의견을 남겼습니다. 다음 기수 개강까지 3주 남았으며, 추가 예산은 없습니다.",
        messages: [
            { id: 1, sender: "정우 (프로젝트 매니저)", avatar: "PO",  content: "피드백이 특히 취업을 앞둔 수강생에게서 많았어요. 다음 기수 커리큘럼에 어떻게 반영할까요?", isUser: false, delay: 800 },
            { id: 2, sender: "지원 (교육운영 매니저)",   avatar: "DEV", content: "예산 증액은 불가하지만 시간표 조정은 가능합니다.", isUser: false, delay: 800 },
            { id: 3, sender: "유진진 (콘텐츠 디자이너)", avatar: "DEV", content: "이론을 줄이고 실습을 늘리거나 외부 전문가 초청은 어떨까요?", isUser: false, delay: 800 }
        ],
        choices: [
            {
                id: "1a",
                text: "현업 전문가 2명을 초청해 해당 분야에서 실제로 사용되는 사례와 경험을 강의에 포함시키겠습니다. 수강생들이 바로 활용할 수 있도록 실습 자료와 예시 문서를 제작하고, 강의 후 질의응답 시간을 충분히 마련해 현장에서 겪는 어려움까지 해결해 주겠습니다.",
                points: { customer: 6, partnership: 5, worklife: 3, innovation: 4, efficiency: 2 },
                isCultureFit: true,
                nextMessage: { sender: "정우", avatar: "PO", content: "수강생 체감 실전성을 빠르게 높일 수 있겠네요.", isUser: false }
            },
            {
                id: "1b",
                text: "기존 강의 틀은 유지하되, 과제를 실제 채용 프로세스를 그대로 시뮬레이션하는 방식으로 전환하겠습니다. 모의 직무 분석, 자기소개서 작성, 면접 프레젠테이션까지 이어지는 실전형 과제를 통해 교육과 실제 취업 준비 과정 간의 간극을 줄이겠습니다.",
                points: { customer: 5, partnership: 4, worklife: 4, innovation: 5, efficiency: 2 },
                isCultureFit: false,
                nextMessage: { sender: "유진", avatar: "DEV", content: "실습 흐름이 좋아요. 룹 피드백 구조만 잘 잡으면 되겠네요.", isUser: false }
            },
            {
                id: "1c",
                text: "교육이 끝난 후에도 참가자들이 활용할 수 있도록 인턴십·현장 체험처 목록과 지원 가이드북을 제작해 제공하겠습니다. 이를 통해 프로그램의 교육 효과를 장기적으로 이어가고, 수강생들이 교육 이후에도 성장할 수 있는 기반을 마련하겠습니다.",
                points: { customer: 4, partnership: 4, worklife: 5, innovation: 3, efficiency: 4 },
                isCultureFit: false,
                nextMessage: { sender: "지원", avatar: "DEV", content: "사후 지원 보강 접근이네요. 제작 범위와 품질관리 중요합니다.", isUser: false }
            }
        ]
    },

    // 2
    scenario2: {
        id: 2,
        title: "지자체 협력 예산 축소",
        time: "10:45 AM",
        description: "뉴팀즈는 서울시와 ‘청년 면접 역량 강화 프로그램’을 공동 기획하고 있습니다. 그러나 예산 삭감으로 ‘1:1 커리어 상담’ 세션 삭제 제안이 들어왔습니다. 이 세션은 참가자 만족도 1위 모듈입니다.",
        messages: [
            { id: 1, sender: "정우", avatar: "PO", content: "1:1 상담 세션을 빼자는 제안이 왔습니다.", isUser: false, delay: 800 },
            { id: 2, sender: "은혜 (파트너십)", avatar: "DEV", content: "그 세션이 빠지면 차별성이 줄어요.", isUser: false, delay: 800 },
            { id: 3, sender: "효주 (운영팀)", avatar: "DEV", content: "예산 범위 내 운영 조건을 고수하네요.", isUser: false, delay: 800 }
        ],
        choices: [
            {
                id: "2a",
                text: "1:1 코칭 세션이 참가자 만족도와 교육 성과에 미치는 영향을 수치와 사례로 정리해 서울시에 제시하겠습니다. 이 데이터를 기반으로 핵심 모듈 유지를 설득하고, 그 대신 홍보물 제작이나 부가 프로그램 일부를 축소하는 절충안을 제안하겠습니다.",
                points: { customer: 5, partnership: 6, worklife: 3, innovation: 4, efficiency: 2 },
                isCultureFit: true,
                nextMessage: { sender: "은혜", avatar: "DEV", content: "핵심 가치를 지키면서 현실적 절충안이네요.", isUser: false }
            },
            {
                id: "2b",
                text: "예산 축소를 수용하되, 코칭 방식을 그룹 세션으로 전환하겠습니다. 동일 인력과 예산으로 더 많은 참가자에게 혜택을 제공할 수 있도록 운영 방식을 바꾸고, 그룹 내 상호 피드백 시간을 강화하겠습니다.",
                points: { customer: 4, partnership: 5, worklife: 4, innovation: 4, efficiency: 3 },
                isCultureFit: false,
                nextMessage: { sender: "효주", avatar: "DEV", content: "운영 효율은 올라가겠지만 1:1 품질 보완이 관건이겠어요.", isUser: false }
            },
            {
                id: "2c",
                text: "외부 멘토 재능기부와 온라인 상담 플랫폼을 병행해, 추가 예산 없이 1:1 상담의 효과를 유지하겠습니다. 이를 통해 예산 제약 속에서도 교육의 핵심 가치를 지키고 파트너와의 신뢰를 유지하겠습니다.",
                points: { customer: 4, partnership: 4, worklife: 5, innovation: 3, efficiency: 4 },
                isCultureFit: false,
                nextMessage: { sender: "정우", avatar: "PO", content: "대안 자원 동원 좋습니다. 품질/책임소재 명확히 하죠.", isUser: false }
            }
        ]
    },

    // 3
    scenario3: {
        id: 3,
        title: "AI 학습 피드백 시스템 도입",
        time: "14:30 PM",
        description: "AI 기반 학습 피드백 시스템 도입이 제안됐습니다. 이 시스템은 과제·퀴즈 결과를 분석해 개인별 취약 역량을 진단하고, 맞춤형 자료를 추천합니다. 초기 개발비는 1천만 원이며, 강사 교육과 매뉴얼 개편이 필요합니다.",
        messages: [
            { id: 1, sender: "정우", avatar: "PO", content: "맞춤형 경험을 제공하지만 초기 비용과 리소스가 큽니다.", isUser: false, delay: 800 },
            { id: 2, sender: "지원", avatar: "DEV", content: "외주 가능하지만 강사 교육은 필수입니다.", isUser: false, delay: 800 },
            { id: 3, sender: "효주", avatar: "DEV", content: "기존 일정에 영향이 있을 듯합니다.", isUser: false, delay: 800 }
        ],
        choices: [
            {
                id: "3a",
                text: "이번 분기에 전 과정에 AI 시스템을 도입하겠습니다. 수강생 개인별 맞춤형 피드백을 제공해 차별화를 만들고, 마케팅 자료에도 이 내용을 강조해 신규 수강생 유입 효과를 노리겠습니다.",
                points: { customer: 4, partnership: 3, worklife: 4, innovation: 6, efficiency: 3 },
                isCultureFit: false,
                nextMessage: { sender: "효주", avatar: "DEV", content: "도전적입니다. 일정/전환 부담 감수해야 합니다.", isUser: false }
            },
            {
                id: "3b",
                text: "20명 규모의 파일럿 과정을 운영해 시스템 효과와 만족도를 먼저 검증하겠습니다. 검증 데이터를 기반으로 차기 기수부터 확대 적용하는 로드맵을 세우겠습니다.",
                points: { customer: 3, partnership: 4, worklife: 4, innovation: 5, efficiency: 4 },
                isCultureFit: true,
                nextMessage: { sender: "정우", avatar: "PO", content: "리스크 관리와 혁신 균형이 좋네요. 파일럿 설계부터 하죠.", isUser: false }
            },
            {
                id: "3c",
                text: "올해는 기존 프로그램 안정화에 집중하겠습니다. 대신 AI 시스템은 내년 사업 계획에 포함해 준비 기간을 확보하고, 강사 교육과 매뉴얼 개편을 사전에 진행하겠습니다.",
                points: { customer: 4, partnership: 4, worklife: 5, innovation: 4, efficiency: 3 },
                isCultureFit: false,
                nextMessage: { sender: "지원", avatar: "DEV", content: "충실한 준비가 되겠네요. 관성으로 기회를 놓치지 않게 체크.", isUser: false }
            }
        ]
    },

    // 4
    scenario4: {
        id: 4,
        title: "기업 교육 제안 대응",
        time: "16:00 PM",
        description: "뉴팀즈는 청년 교육 외에 기업 맞춤형 교육 진출을 검토 중입니다. 내년 상반기에 대기업 2곳에서 제안이 들어왔지만, 인력과 예산이 분산될 수 있습니다.",
        messages: [
            { id: 1, sender: "정우", avatar: "PO", content: "B2B는 단가가 높지만 리소스가 분산될 수 있어요.", isUser: false, delay: 800 },
            { id: 2, sender: "지원", avatar: "DEV", content: "청년 과정 품질 저하가 생길 수도 있겠네요.", isUser: false, delay: 800 },
            { id: 3, sender: "은혜", avatar: "DEV", content: "협업과 역할 분담이 중요해집니다.", isUser: false, delay: 800 }
        ],
        choices: [
            {
                id: "4a",
                text: "기업 교육을 우선 추진해 매출 기반을 넓히겠습니다. 확보한 수익을 청년 교육 콘텐츠 강화와 신규 강사 영입에 재투자하여 양쪽 모두의 경쟁력을 확보하겠습니다.",
                points: { customer: 4, partnership: 4, worklife: 6, innovation: 3, efficiency: 3 },
                isCultureFit: false,
                nextMessage: { sender: "은혜", avatar: "DEV", content: "단기성과/팀 피로도 균형이 핵심이겠네요.", isUser: false }
            },
            {
                id: "4b",
                text: "청년 교육과 기업 교육 비중을 절반씩 운영하겠습니다. 각 교육별 전담 인력을 배정해 품질 저하를 방지하고, 업무 분장을 명확히 하겠습니다.",
                points: { customer: 5, partnership: 3, worklife: 5, innovation: 4, efficiency: 3 },
                isCultureFit: true,
                nextMessage: { sender: "정우", avatar: "PO", content: "균형 전략, 역할/성과 지표 명확히 하죠.", isUser: false }
            },
            {
                id: "4c",
                text: "청년 교육에 집중하겠습니다. 기업 교육은 시범사업 형태로만 진행해 시장 반응을 확인하고, 필요한 경우 향후 확대를 검토하겠습니다.",
                points: { customer: 4, partnership: 4, worklife: 5, innovation: 4, efficiency: 3 },
                isCultureFit: false,
                nextMessage: { sender: "지원", avatar: "DEV", content: "핵심 사업 집중입니다. 기회비용을 정기적으로 점검하죠.", isUser: false }
            }
        ]
    },

    // 5
    scenario5: {
        id: 5,
        title: "회의 효율성 개선",
        time: "17:15 PM",
        description: "교육 기획팀은 주 5회, 회당 90분 이상의 회의를 하고 있습니다. 안건이 광범위해 결론이 늦어지고, 런칭 일정이 지연되는 경우가 많습니다.",
        messages: [
            { id: 1, sender: "효주", avatar: "DEV", content: "회의가 너무 길어 다른 업무에 지장이 있어요.", isUser: false, delay: 800 },
            { id: 2, sender: "유진", avatar: "DEV", content: "비동기 협업 툴을 적극 쓰면 좋겠습니다.", isUser: false, delay: 800 },
            { id: 3, sender: "정우", avatar: "PO", content: "다음 분기부터 회의 방식을 바꿔봅시다.", isUser: false, delay: 800 }
        ],
        choices: [
            {
                id: "5a",
                text: "회의 횟수를 주 2~3회로 줄이고, 안건·목표·참석자를 사전 공지하겠습니다. 회의 자료는 최소 하루 전에 공유해 준비도를 높이겠습니다.",
                points: { customer: 4, partnership: 3, worklife: 4, innovation: 3, efficiency: 6 },
                isCultureFit: true,
                nextMessage: { sender: "정우", avatar: "PO", content: "명확하고 실천 가능한 가이드네요. 바로 시범 적용합시다.", isUser: false }
            },
            {
                id: "5b",
                text: "회의는 유지하되, 안건별 발언 시간을 제한하고, 자료 검토는 온라인 협업 툴로 대체하겠습니다. 회의 집중도와 결론 도출 속도를 높이겠습니다.",
                points: { customer: 3, partnership: 4, worklife: 4, innovation: 3, efficiency: 6 },
                isCultureFit: false,
                nextMessage: { sender: "효주", avatar: "DEV", content: "집중도가 오를 것 같아요. 툴 사용 규칙 합의가 필요하겠어요.", isUser: false }
            },
            {
                id: "5c",
                text: "공유 문서 기반으로 업무를 진행하고, 꼭 필요한 경우에만 회의를 소집하겠습니다. 긴급 사안은 메신저나 화상회의로 신속히 대응하겠습니다.",
                points: { customer: 4, partnership: 4, worklife: 3, innovation: 3, efficiency: 6 },
                isCultureFit: false,
                nextMessage: { sender: "유진", avatar: "DEV", content: "회의 피로도가 줄겠네요. 온보딩 가이드 준비합시다.", isUser: false }
            }
        ]
    }
};

// 시나리오 매니저
class ScenarioManager {
    constructor() {
        this.scenarios = scenarios;
        this.currentScenario = null;
        this.currentStep = 0;
        this.completedScenarios = [];
        this.totalScore = {
            customer: 0,
            partnership: 0,
            worklife: 0,
            innovation: 0,
            efficiency: 0
        };
    }

    startScenario(scenarioId) {
        this.currentScenario = scenarios[scenarioId];
        this.currentStep = 0;
        return this.currentScenario;
    }

    selectChoice(choiceId) {
        const scenario = this.currentScenario;
        const choice = scenario.choices.find(c => c.id === choiceId);
        if (choice) {
            Object.keys(choice.points).forEach(k => { this.totalScore[k] += choice.points[k]; });
            return { choice, nextMessage: choice.nextMessage, isCultureFit: choice.isCultureFit };
        }
        return null;
    }

    getNextScenario() {
        const keys = Object.keys(scenarios);
        const idx = keys.findIndex(k => scenarios[k].id === this.currentScenario?.id);
        if (idx < keys.length - 1) return keys[idx + 1];
        return null;
    }

    getTotalScore() { return this.totalScore; }

    getCultureFitPercentage() {
        const total = Object.values(this.totalScore).reduce((s, v) => s + v, 0);
        const maxPossible = this.completedScenarios.length * 15 * 5;
        return Math.round((total / maxPossible) * 100) || 0;
    }

    async saveResultToFirestore(applicantData) {
        try {
            if (window.firestoreManager) {
                const data = {
                    ...applicantData,
                    scores: this.totalScore,
                    finalPercentage: this.getCultureFitPercentage(),
                    responses: this.completedScenarios,
                    startTime: Date.now(),
                    endTime: Date.now()
                };
                const id = await window.firestoreManager.saveApplicant(data);
                console.log('Firestore 저장:', id);
                return id;
            }
            console.warn('Firestore 매니저 미초기화');
            return null;
        } catch (e) {
            console.error('Firestore 저장 오류:', e);
            return null;
        }
    }
}
