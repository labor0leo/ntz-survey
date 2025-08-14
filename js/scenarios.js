// 조직 협업 시뮬레이터 시나리오 데이터 (교육 도메인 버전)
// 점수 키: customer(고객중심), partnership(파트너십), worklife(회사생활), innovation(혁신), efficiency(효율성)

const scenarios = {
    // 문항 1 – 교육 후 피드백 반영 (고객중심)
    scenario1: {
        id: 1,
        title: "교육 후 피드백 반영 (고객중심)",
        time: "09:30 AM",
        description: "‘취업 준비생 커리어 설계 과정’ 설문에서 60%가 ‘이론은 이해했지만 실전 적용이 어렵다’고 답했습니다. 다음 기수까지 3주, 추가 예산 없음.",
        messages: [
            {
                id: 1,
                sender: "정우 (프로젝트 매니저)",
                avatar: "PO",
                content: "해당 피드백이 특히 취업을 앞둔 수강생들에게서 많이 나왔어요. 다음 기수 커리큘럼에 어떻게 반영할까요?",
                isUser: false,
                delay: 1000
            },
            {
                id: 2,
                sender: "지원 (교육운영 매니저)",
                avatar: "DEV",
                content: "예산 증액은 불가능하지만, 시간표 조정은 가능합니다.",
                isUser: false,
                delay: 2000
            },
            {
                id: 3,
                sender: "유진진 (콘텐츠 디자이너)",
                avatar: "DEV",
                content: "이론을 줄이고 실습 비중을 늘리면 해결될까요? 아니면 외부 전문가를 초청할까요?",
                isUser: false,
                delay: 3000
            }
        ],
        choices: [
            {
                id: "1a",
                text: "현업 전문가 2명을 초청해 실제 사례/경험을 강의에 포함하고, 바로 활용 가능한 실습 자료/예시 문서를 제작, 충분한 Q&A로 현장 어려움까지 해결하겠습니다.",
                points: { customer: 6, partnership: 5, worklife: 3, innovation: 4, efficiency: 2 },
                isCultureFit: true,
                nextMessage: {
                    sender: "정우 (프로젝트 매니저)",
                    avatar: "PO",
                    content: "좋습니다. 수강생들이 체감할 실전성을 빠르게 높일 수 있겠네요!",
                    isUser: false
                }
            },
            {
                id: "1b",
                text: "기존 강의 틀은 유지하되, 과제를 실제 채용 프로세스 시뮬레이션으로 전환하겠습니다. 모의 직무분석→자소서→면접 PT까지 이어지는 실전형 과제로 간극을 줄이겠습니다.",
                points: { customer: 5, partnership: 4, worklife: 4, innovation: 5, efficiency: 2 },
                isCultureFit: false,
                nextMessage: {
                    sender: "유진진 (콘텐츠 디자이너)",
                    avatar: "DEV",
                    content: "실습 흐름이 좋아요. 일정 배분과 룹 피드백 구조만 잘 잡으면 되겠네요.",
                    isUser: false
                }
            },
            {
                id: "1c",
                text: "교육 종료 후에도 활용 가능한 인턴십/현장 체험처 목록과 지원 가이드북을 제작해 제공하겠습니다. 장기적 교육 효과와 성장 기반을 마련하겠습니다.",
                points: { customer: 4, partnership: 4, worklife: 5, innovation: 3, efficiency: 4 },
                isCultureFit: false,
                nextMessage: {
                    sender: "지원 (교육운영 매니저)",
                    avatar: "DEV",
                    content: "사후 지원 체계를 보강하는 접근이네요. 제작 범위와 품질 관리가 핵심이겠어요.",
                    isUser: false
                }
            }
        ]
    },

    // 문항 2 – 지자체 협력 예산 축소 (파트너십)
    scenario2: {
        id: 2,
        title: "지자체 협력 예산 축소 (파트너십)",
        time: "10:45 AM",
        description: "서울시와 공동 기획 중인 ‘청년 면접 역량 강화 프로그램’에서 예산 삭감으로 1:1 상담 세션 삭제 제안. 해당 세션은 만족도 1위 모듈.",
        messages: [
            {
                id: 1,
                sender: "정우 (프로젝트 매니저)",
                avatar: "PO",
                content: "서울시 측에서 예산 삭감안을 들고 왔어요. 1:1 상담 세션을 빼자는 제안입니다.",
                isUser: false,
                delay: 1000
            },
            {
                id: 2,
                sender: "은혜 (파트너십 매니저)",
                avatar: "DEV",
                content: "그 세션이 빠지면 교육 차별성이 줄어들 텐데요.",
                isUser: false,
                delay: 2000
            },
            {
                id: 3,
                sender: "효주 (운영팀)",
                avatar: "DEV",
                content: "예산 범위 내에서 운영하라는 조건을 고수하고 있네요.",
                isUser: false,
                delay: 3000
            }
        ],
        choices: [
            {
                id: "2a",
                text: "1:1 코칭 효과를 수치/사례로 정리해 서울시에 제시하겠습니다. 핵심 모듈 유지를 설득하고, 대신 홍보물/부가 프로그램 일부 축소를 제안하겠습니다.",
                points: { customer: 5, partnership: 6, worklife: 3, innovation: 4, efficiency: 2 },
                isCultureFit: true,
                nextMessage: {
                    sender: "은혜 (파트너십 매니저)",
                    avatar: "DEV",
                    content: "핵심 가치를 지키면서도 현실적인 절충안이네요. 파트너 신뢰에도 긍정적이에요.",
                    isUser: false
                }
            },
            {
                id: "2b",
                text: "예산 축소를 수용하되, 코칭을 그룹 세션으로 전환하겠습니다. 동일 인력/예산으로 더 많은 참가자가 혜택을 보도록 하고 상호 피드백을 강화하겠습니다.",
                points: { customer: 4, partnership: 5, worklife: 4, innovation: 4, efficiency: 3 },
                isCultureFit: false,
                nextMessage: {
                    sender: "효주 (운영팀)",
                    avatar: "DEV",
                    content: "운영 효율은 올라가겠지만, 1:1 품질을 얼마나 보완할 수 있는지가 관건이겠습니다.",
                    isUser: false
                }
            },
            {
                id: "2c",
                text: "외부 멘토 재능기부와 온라인 상담 플랫폼을 병행해 추가 예산 없이 1:1 효과를 유지하겠습니다. 핵심 가치를 지키며 파트너 신뢰도 유지하겠습니다.",
                points: { customer: 4, partnership: 4, worklife: 5, innovation: 3, efficiency: 4 },
                isCultureFit: false,
                nextMessage: {
                    sender: "정우 (프로젝트 매니저)",
                    avatar: "PO",
                    content: "대안 자원 동원은 좋습니다. 품질관리와 책임소재를 명확히 하죠.",
                    isUser: false
                }
            }
        ]
    },

    // 문항 3 – AI 학습 피드백 시스템 도입 (혁신)
    scenario3: {
        id: 3,
        title: "AI 학습 피드백 시스템 도입 (혁신)",
        time: "14:30 PM",
        description: "과제/퀴즈 분석 기반 개인별 취약 역량 진단 및 맞춤 자료 추천 시스템 제안. 초기 개발비 1천만 원, 강사 교육/매뉴얼 개편 필요.",
        messages: [
            {
                id: 1,
                sender: "정우 (프로젝트 매니저)",
                avatar: "PO",
                content: "도입하면 맞춤형 교육 경험을 제공할 수 있지만, 초기 비용과 리소스가 크네요.",
                isUser: false,
                delay: 1000
            },
            {
                id: 2,
                sender: "지원 (교육운영 매니저)",
                avatar: "DEV",
                content: "외주로 가능하지만 강사 교육은 필수일 것 같아요.",
                isUser: false,
                delay: 2000
            },
            {
                id: 3,
                sender: "효주 (운영팀)",
                avatar: "DEV",
                content: "기존 커리큘럼 일정에도 영향이 있을 듯합니다.",
                isUser: false,
                delay: 3000
            }
        ],
        choices: [
            {
                id: "3a",
                text: "이번 분기에 전 과정 전면 도입하겠습니다. 개인별 맞춤 피드백으로 차별화를 만들고, 마케팅에서도 강조해 신규 유입을 노리겠습니다.",
                points: { customer: 4, partnership: 3, worklife: 4, innovation: 6, efficiency: 3 },
                isCultureFit: false,
                nextMessage: {
                    sender: "효주 (운영팀)",
                    avatar: "DEV",
                    content: "도전적이네요. 일정과 교육 전환 부담을 감수해야 합니다.",
                    isUser: false
                }
            },
            {
                id: "3b",
                text: "20명 규모 파일럿을 먼저 운영해 효과/만족도를 검증하고, 데이터 기반으로 차기 기수 확대 로드맵을 세우겠습니다.",
                points: { customer: 3, partnership: 4, worklife: 4, innovation: 5, efficiency: 4 },
                isCultureFit: true,
                nextMessage: {
                    sender: "정우 (프로젝트 매니저)",
                    avatar: "PO",
                    content: "리스크 관리와 혁신의 균형이 좋네요. 파일럿 설계안부터 만들죠.",
                    isUser: false
                }
            },
            {
                id: "3c",
                text: "올해는 기존 프로그램 안정화에 집중하고, AI 도입은 내년 계획에 포함해 준비 기간을 확보하겠습니다. 강사 교육/매뉴얼 개편을 사전에 진행하죠.",
                points: { customer: 4, partnership: 4, worklife: 5, innovation: 4, efficiency: 3 },
                isCultureFit: false,
                nextMessage: {
                    sender: "지원 (교육운영 매니저)",
                    avatar: "DEV",
                    content: "보수적이지만 충실한 준비가 되겠네요. 관성으로 기회를 놓치지 않도록 체크해야겠습니다.",
                    isUser: false
                }
            }
        ]
    },

    // 문항 4 – 기업 교육 제안 대응 (회사생활)
    scenario4: {
        id: 4,
        title: "기업 교육 제안 대응 (회사생활)",
        time: "16:00 PM",
        description: "내년 상반기 대기업 2곳에서 기업 맞춤형 교육 제안. 다만 팀 리소스 분산으로 청년 교육 품질 저하 우려.",
        messages: [
            {
                id: 1,
                sender: "정우 (프로젝트 매니저)",
                avatar: "PO",
                content: "B2B 교육은 단가가 높습니다. 하지만 청년 교육 리소스가 줄 수 있겠어요.",
                isUser: false,
                delay: 1000
            },
            {
                id: 2,
                sender: "지원 (교육운영 매니저)",
                avatar: "DEV",
                content: "리소스를 나누면 청년 과정 품질 저하가 생길 수도 있겠네요.",
                isUser: false,
                delay: 2000
            },
            {
                id: 3,
                sender: "은혜 (파트너십 매니저)",
                avatar: "DEV",
                content: "팀 내 협업과 역할 분담이 중요해질 것 같습니다.",
                isUser: false,
                delay: 3000
            }
        ],
        choices: [
            {
                id: "4a",
                text: "기업 교육을 우선 추진해 매출 기반을 넓히고, 수익을 청년 교육 강화/신규 강사 영입에 재투자하겠습니다.",
                points: { customer: 4, partnership: 4, worklife: 6, innovation: 3, efficiency: 3 },
                isCultureFit: false,
                nextMessage: {
                    sender: "은혜 (파트너십 매니저)",
                    avatar: "DEV",
                    content: "재투자 계획이 핵심이겠네요. 단기 성과와 팀 피로도의 균형을 봐야 합니다.",
                    isUser: false
                }
            },
            {
                id: "4b",
                text: "청년/기업 교육 비중을 절반으로 운영하고 전담 인력을 배정해 품질 저하를 방지, 업무 분장을 명확히 하겠습니다.",
                points: { customer: 5, partnership: 3, worklife: 5, innovation: 4, efficiency: 3 },
                isCultureFit: true,
                nextMessage: {
                    sender: "정우 (프로젝트 매니저)",
                    avatar: "PO",
                    content: "균형 전략이네요. 역할/성과 지표를 명확히 하죠.",
                    isUser: false
                }
            },
            {
                id: "4c",
                text: "청년 교육에 집중하고 기업 교육은 시범사업 형태로만 진행해 시장 반응을 확인, 필요시 확대를 검토하겠습니다.",
                points: { customer: 4, partnership: 4, worklife: 5, innovation: 4, efficiency: 3 },
                isCultureFit: false,
                nextMessage: {
                    sender: "지원 (교육운영 매니저)",
                    avatar: "DEV",
                    content: "핵심 사업 집중입니다. 단, 기회비용을 정기적으로 점검해야겠어요.",
                    isUser: false
                }
            }
        ]
    },

    // 문항 5 – 회의 효율성 개선 (효율성)
    scenario5: {
        id: 5,
        title: "회의 효율성 개선 (효율성)",
        time: "17:15 PM",
        description: "주 5회, 90분 이상 회의로 일정 지연이 잦음. 비동기 협업 도입과 회의 구조 재설계를 고려.",
        messages: [
            {
                id: 1,
                sender: "효주 (운영팀)",
                avatar: "DEV",
                content: "회의가 너무 길어 다른 업무에 지장이 있어요.",
                isUser: false,
                delay: 1000
            },
            {
                id: 2,
                sender: "유진 (콘텐츠 디자이너)",
                avatar: "DEV",
                content: "비동기 협업 툴을 적극 쓰면 좋겠습니다.",
                isUser: false,
                delay: 2000
            },
            {
                id: 3,
                sender: "정우 (프로젝트 매니저)",
                avatar: "PO",
                content: "다음 분기부터 회의 방식을 바꿔봅시다.",
                isUser: false,
                delay: 3000
            }
        ],
        choices: [
            {
                id: "5a",
                text: "주 2~3회로 줄이고, 안건/목표/참석자를 사전 공지하겠습니다. 자료는 최소 하루 전에 공유해 준비도를 높이겠습니다.",
                points: { customer: 4, partnership: 3, worklife: 4, innovation: 3, efficiency: 6 },
                isCultureFit: true,
                nextMessage: {
                    sender: "정우 (프로젝트 매니저)",
                    avatar: "PO",
                    content: "명확하고 실천 가능한 가이드네요. 바로 시범 적용해 봅시다.",
                    isUser: false
                }
            },
            {
                id: "5b",
                text: "회의는 유지하되 안건별 발언 시간을 제한하고, 자료 검토는 온라인 협업 툴로 대체해 집중도와 결론 도출 속도를 높이겠습니다.",
                points: { customer: 3, partnership: 4, worklife: 4, innovation: 3, efficiency: 6 },
                isCultureFit: false,
                nextMessage: {
                    sender: "효주 (운영팀)",
                    avatar: "DEV",
                    content: "집중도가 오를 것 같아요. 툴 사용 규칙만 합의하면 되겠습니다.",
                    isUser: false
                }
            },
            {
                id: "5c",
                text: "공유 문서 기반 비동기 협업으로 전환하고, 꼭 필요한 경우만 회의를 소집하겠습니다. 긴급 사안은 메신저/화상회의로 대응하겠습니다.",
                points: { customer: 4, partnership: 4, worklife: 3, innovation: 3, efficiency: 6 },
                isCultureFit: false,
                nextMessage: {
                    sender: "유진 (콘텐츠 디자이너)",
                    avatar: "DEV",
                    content: "회의 피로도가 크게 줄겠어요. 온보딩 가이드가 필요하겠습니다.",
                    isUser: false
                }
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
            worklife: 0,   // ← 회사생활
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
            // 점수 업데이트
            Object.keys(choice.points).forEach(key => {
                this.totalScore[key] += choice.points[key];
            });
            
            return {
                choice: choice,
                nextMessage: choice.nextMessage,
                isCultureFit: choice.isCultureFit
            };
        }
        return null;
    }

    getNextScenario() {
        const scenarioKeys = Object.keys(scenarios);
        const currentIndex = scenarioKeys.findIndex(key => scenarios[key].id === this.currentScenario?.id);
        if (currentIndex < scenarioKeys.length - 1) {
            return scenarioKeys[currentIndex + 1];
        }
        return null;
    }

    getTotalScore() {
        return this.totalScore;
    }

    getCultureFitPercentage() {
        const total = Object.values(this.totalScore).reduce((sum, score) => sum + score, 0);
        const maxPossible = this.completedScenarios.length * 15 * 5; // 최대 15점 * 5개 영역(참고용)
        return Math.round((total / maxPossible) * 100) || 0;
    }

    async saveResultToFirestore(applicantData) {
        try {
            if (window.firestoreManager) {
                const resultData = {
                    ...applicantData,
                    scores: this.totalScore,
                    finalPercentage: this.getCultureFitPercentage(),
                    responses: this.completedScenarios,
                    startTime: Date.now(),
                    endTime: Date.now()
                };
                const docId = await window.firestoreManager.saveApplicant(resultData);
                console.log('결과가 Firestore에 저장되었습니다:', docId);
                return docId;
            } else {
                console.warn('Firestore 매니저가 초기화되지 않았습니다.');
                return null;
            }
        } catch (error) {
            console.error('Firestore 저장 중 오류:', error);
            return null;
        }
    }
}
