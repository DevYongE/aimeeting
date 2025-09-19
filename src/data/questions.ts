export type InterviewCategory = "IT" | "Personality";

export type EvaluationExpectations = {
  coreTopics: string[];
  bonusTopics?: string[];
  minWordCount: number;
  competencies: string[];
  guidance: string;
};

export type InterviewQuestion = {
  id: string;
  category: InterviewCategory;
  prompt: string;
  expectations: EvaluationExpectations;
};

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "it-01",
    category: "IT",
    prompt: "모놀리식 아키텍처와 마이크로서비스 아키텍처의 장단점을 비교하고, 언제 각각을 선택하겠습니까?",
    expectations: {
      coreTopics: [
        "배포 독립성",
        "서비스 경계",
        "운영 복잡도",
        "팀 자율성"
      ],
      bonusTopics: ["관측성", "API 계약", "도메인 주도 설계"],
      minWordCount: 140,
      competencies: ["아키텍처 사고", "트레이드오프 분석", "시스템 사고"],
      guidance: "배포와 팀 운영 측면에서 두 구조의 차이를 설명하고, 상황별 추천 시나리오로 마무리하세요."
    }
  },
  {
    id: "it-02",
    category: "IT",
    prompt: "배포 이후 프로덕션 API 엔드포인트에 타임아웃이 발생했습니다. 어떻게 원인을 진단하고 해결하겠습니까?",
    expectations: {
      coreTopics: [
        "로그 분석",
        "기준 비교",
        "롤백 전략",
        "모니터링 지표"
      ],
      bonusTopics: ["부하 테스트", "피처 플래그", "사후 회고"],
      minWordCount: 140,
      competencies: ["장애 대응", "구조화된 디버깅", "커뮤니케이션"],
      guidance: "우선순위를 정한 트리아지 계획, 살펴볼 데이터 소스, 진행 상황을 어떻게 공유할지 단계별로 설명하세요."
    }
  },
  {
    id: "it-03",
    category: "IT",
    prompt: "JavaScript 이벤트 루프가 어떻게 동작하는지, 그리고 React나 Next.js 애플리케이션 성능에 어떤 영향을 주는지 설명해보세요.",
    expectations: {
      coreTopics: [
        "콜 스택",
        "태스크 큐",
        "렌더링 영향",
        "비동기 작업"
      ],
      bonusTopics: ["마이크로태스크", "웹 워커"],
      minWordCount: 130,
      competencies: ["언어 내부 이해", "성능 인지", "프런트엔드 최적화"],
      guidance: "동기 코드와 큐에 쌓인 콜백의 흐름을 설명하고, UI 반응성과 어떻게 연결되는지 사례로 보여주세요."
    }
  },
  {
    id: "it-04",
    category: "IT",
    prompt: "CRUD 트래픽이 많으면서 분석 쿼리도 실행되는 서비스에서 데이터베이스 인덱스를 어떻게 설계하겠습니까?",
    expectations: {
      coreTopics: [
        "읽기 쓰기 균형",
        "복합 인덱스",
        "쿼리 패턴",
        "인덱스 모니터링"
      ],
      bonusTopics: ["커버링 인덱스", "파티셔닝"],
      minWordCount: 135,
      competencies: ["데이터 모델링", "성능 튜닝", "용량 계획"],
      guidance: "주요 쿼리를 분석하는 방법과 인덱스가 쓰기 부하에 미치는 영향을 설명하며, 모니터링 전략까지 제시하세요."
    }
  },
  {
    id: "it-05",
    category: "IT",
    prompt: "느린 서버 사이드 렌더링(SSR) 페이지의 성능을 어떻게 개선하겠습니까?",
    expectations: {
      coreTopics: [
        "병목 측정",
        "데이터 패칭 전략",
        "캐싱",
        "번들 최적화"
      ],
      bonusTopics: ["엣지 렌더링", "스트리밍"],
      minWordCount: 130,
      competencies: ["웹 성능", "총체적 최적화", "측정"],
      guidance: "측정에서 출발해 블로킹 작업을 줄이고 캐싱과 번들링을 최적화하는 과정을 설명한 뒤, 효과 검증 방법을 언급하세요."
    }
  },
  {
    id: "it-06",
    category: "IT",
    prompt: "서드파티 API와 연동되는 서비스를 위한 자동화 테스트를 어떻게 설계하겠습니까?",
    expectations: {
      coreTopics: [
        "테스트 피라미드",
        "계약 테스트",
        "모킹 전략",
        "장애 대응 시나리오"
      ],
      bonusTopics: ["샌드박스 환경", "결함 주입"],
      minWordCount: 130,
      competencies: ["품질 관점", "위험 관리", "테스트 용이성 설계"],
      guidance: "단위·통합 테스트의 역할을 나누고 외부 시스템을 분리하는 방법, 실패 처리 검증 방식을 이야기하세요."
    }
  },
  {
    id: "it-07",
    category: "IT",
    prompt: "클라우드 애플리케이션을 위한 최신 CI/CD 파이프라인에는 어떤 단계와 안전장치가 포함되어야 합니까?",
    expectations: {
      coreTopics: [
        "빌드와 테스트",
        "보안 스캐닝",
        "점진 배포",
        "롤백 전략"
      ],
      bonusTopics: ["코드형 인프라", "관측성 게이트"],
      minWordCount: 140,
      competencies: ["데브옵스", "자동화", "신뢰성"],
      guidance: "커밋에서 프로덕션까지의 흐름을 단계별로 설명하고, 품질과 안전을 보장하는 체크포인트를 제시하세요."
    }
  },
  {
    id: "it-08",
    category: "IT",
    prompt: "기술 부채를 관리하면서 기능 개발 속도를 유지하려면 어떤 방식으로 우선순위를 정하고 실행하겠습니까?",
    expectations: {
      coreTopics: [
        "부채 목록화",
        "영향 평가",
        "이해관계자 정렬",
        "점진적 리팩터링"
      ],
      bonusTopics: ["OKR 연계", "리스크 스코어링"],
      minWordCount: 130,
      competencies: ["제품 협업", "전략적 사고", "커뮤니케이션"],
      guidance: "부채의 비용과 영향을 계량화하고, 로드맵과 스프린트에 어떻게 녹여내는지 구체적인 사례로 이야기하세요."
    }
  },
  {
    id: "it-09",
    category: "IT",
    prompt: "공개 REST API를 안전하게 운영하기 위해 적용해야 할 구체적인 보안 조치를 설명해보세요.",
    expectations: {
      coreTopics: [
        "인증",
        "인가",
        "속도 제한",
        "입력 검증"
      ],
      bonusTopics: ["감사 로그", "위협 모델링"],
      minWordCount: 125,
      competencies: ["보안 사고", "심층 방어", "베스트 프랙티스"],
      guidance: "레이어드 보안을 강조하며 인증·인가부터 악용 탐지까지 어떻게 설계할지 순차적으로 설명하세요."
    }
  },
  {
    id: "it-10",
    category: "IT",
    prompt: "중요한 결제를 처리하는 분산 백엔드를 위한 관측성을 어떻게 구축하겠습니까?",
    expectations: {
      coreTopics: [
        "구조화 로그",
        "메트릭",
        "트레이싱",
        "알림"
      ],
      bonusTopics: ["서비스 수준 목표", "런북"],
      minWordCount: 140,
      competencies: ["운영 우수성", "위험 완화", "측정"],
      guidance: "어떤 데이터를 수집하고 어떤 알림을 설정하며 팀이 정보를 활용하는지 전사적 관점에서 설명하세요."
    }
  },
  {
    id: "it-11",
    category: "IT",
    prompt: "바이러스 스캔과 지역 규제를 충족하는 확장 가능한 파일 업로드 기능을 설계해보세요.",
    expectations: {
      coreTopics: [
        "스토리지 선택",
        "스캔 워크플로",
        "비동기 처리",
        "규제 준수"
      ],
      bonusTopics: ["프리사인 URL", "다중 리전 복제"],
      minWordCount: 140,
      competencies: ["시스템 설계", "보안", "규제 이해"],
      guidance: "업로드 흐름과 스캔 격리 전략을 설명하고, 지역별 요구 사항을 어떻게 충족하는지 포함하세요."
    }
  },
  {
    id: "it-12",
    category: "IT",
    prompt: "여러 마이크로서비스와 데이터베이스에 걸친 데이터 무결성을 어떻게 보장하겠습니까?",
    expectations: {
      coreTopics: [
        "트랜잭션 경계",
        "멱등성",
        "사가 패턴",
        "최종 일관성"
      ],
      bonusTopics: ["아웃박스 패턴", "체인지 데이터 캡처"],
      minWordCount: 135,
      competencies: ["분산 시스템", "탄력성 설계", "일관성 모델"],
      guidance: "조정 전략과 보상 작업, 중복 방지를 위한 설계를 사례와 함께 설명하세요."
    }
  },
  {
    id: "it-13",
    category: "IT",
    prompt: "ACID 트랜잭션과 최종 일관성을 비교하고, 각각이 적합한 상황을 설명해보세요.",
    expectations: {
      coreTopics: [
        "원자성",
        "일관성 보장",
        "지연 트레이드오프",
        "비즈니스 요구"
      ],
      bonusTopics: ["CAP 정리", "멱등 설계"],
      minWordCount: 130,
      competencies: ["데이터 전략", "위험 평가", "설명 능력"],
      guidance: "정확성이 필요한 시나리오와 고가용성이 필요한 시나리오를 대비시키고, 보완 전략을 언급하세요."
    }
  },
  {
    id: "it-14",
    category: "IT",
    prompt: "빠르게 변하는 콘텐츠와 정적인 콘텐츠를 모두 제공하는 API의 캐싱 전략을 어떻게 세우겠습니까?",
    expectations: {
      coreTopics: [
        "캐시 계층",
        "무효화",
        "TTL 선택",
        "캐시 버스팅"
      ],
      bonusTopics: ["콘텐츠 협상", "클라이언트 힌트"],
      minWordCount: 130,
      competencies: ["성능 최적화", "상태 관리", "전략적 사고"],
      guidance: "다층 캐시를 설명하고 데이터를 신선하게 유지하는 방법, 클라이언트 협력을 활용하는 방법을 제시하세요."
    }
  },
  {
    id: "it-15",
    category: "IT",
    prompt: "컨테이너화와 오케스트레이션(Docker와 Kubernetes)이 서비스 배포 방식을 어떻게 바꾸는지 설명하세요.",
    expectations: {
      coreTopics: [
        "환경 일관성",
        "스케일링",
        "자가치유",
        "코드형 인프라"
      ],
      bonusTopics: ["관측성 기본", "비용 관리"],
      minWordCount: 130,
      competencies: ["배포 자동화", "클라우드 아키텍처", "운영 규율"],
      guidance: "컨테이너 도입의 이점과 오케스트레이션이 제공하는 운영 기능, 팀 프로세스 변화를 연결지어 설명하세요."
    }
  },
  {
    id: "it-16",
    category: "IT",
    prompt: "클라우드 비용을 최적화하기 위해 어떤 지표를 추적하고 어떤 전략을 적용하겠습니까?",
    expectations: {
      coreTopics: [
        "비용 모니터링",
        "리소스 태깅",
        "오토스케일링",
        "예약 인스턴스 최적화"
      ],
      bonusTopics: ["재무 협업", "비용 경보"],
      minWordCount: 120,
      competencies: ["재무 감각", "운영 최적화", "데이터 기반 의사결정"],
      guidance: "사용량 데이터에서 절감 기회를 찾고, 실행 계획과 검증 방법을 단계적으로 설명하세요."
    }
  },
  {
    id: "it-17",
    category: "IT",
    prompt: "실시간 분석 파이프라인을 설계할 때 필요한 구성 요소와 핵심 고려 사항을 설명해보세요.",
    expectations: {
      coreTopics: [
        "데이터 수집",
        "스트림 처리",
        "저장소 선택",
        "지연시간 관리"
      ],
      bonusTopics: ["스키마 관리", "재처리 전략"],
      minWordCount: 135,
      competencies: ["데이터 아키텍처", "확장성 설계", "신뢰성"],
      guidance: "데이터 흐름을 단계별로 설명하고, 장애나 트래픽 증가에 대비하는 전략을 포함하세요."
    }
  },
  {
    id: "it-18",
    category: "IT",
    prompt: "멀티 테넌트 SaaS에서 접근 제어와 데이터 격리를 어떻게 설계하겠습니까?",
    expectations: {
      coreTopics: [
        "테넌트 분리",
        "권한 체계",
        "데이터 격리",
        "감사 로그"
      ],
      bonusTopics: ["행 수준 보안", "키 관리"],
      minWordCount: 130,
      competencies: ["보안 설계", "확장성", "규제 이해"],
      guidance: "테넌트별 데이터 경계를 정의하고, 권한 모델과 감사 메커니즘을 어떻게 구현할지 설명하세요."
    }
  },
  {
    id: "it-19",
    category: "IT",
    prompt: "시간대가 다른 분산 팀에서 코드 리뷰 프로세스를 효과적으로 운영하려면 무엇이 필요합니까?",
    expectations: {
      coreTopics: [
        "리뷰 기준",
        "자동화 도구",
        "실용적 피드백",
        "시간대 협업"
      ],
      bonusTopics: ["실험 기록", "합의 규칙"],
      minWordCount: 125,
      competencies: ["커뮤니케이션", "품질 문화", "리더십"],
      guidance: "체계적인 체크리스트와 자동화를 활용하는 방법, 신뢰를 유지하는 피드백 방식과 핸드오프 전략을 이야기하세요."
    }
  },
  {
    id: "it-20",
    category: "IT",
    prompt: "레거시 모놀리식 시스템을 클라우드 네이티브 구조로 현대화하는 전략을 설명해보세요.",
    expectations: {
      coreTopics: [
        "현황 진단",
        "점진적 분리",
        "데이터 마이그레이션",
        "위험 관리"
      ],
      bonusTopics: ["스트랭글러 패턴", "비즈니스 커뮤니케이션"],
      minWordCount: 140,
      competencies: ["변화 관리", "시스템 설계", "비즈니스 정렬"],
      guidance: "서비스를 분해하는 로드맵, 데이터 이전 계획, 이해관계자와의 소통 방식을 사례로 제시하세요."
    }
  },
  {
    id: "it-21",
    category: "IT",
    prompt: "조직 전반의 시크릿과 인증 정보를 안전하게 관리하는 체계를 어떻게 구축하겠습니까?",
    expectations: {
      coreTopics: [
        "중앙화 관리",
        "주기적 로테이션",
        "권한 최소화",
        "감사 추적"
      ],
      bonusTopics: ["환경 하드닝", "비상 절차"],
      minWordCount: 125,
      competencies: ["보안 운영", "정책 설계", "위험 완화"],
      guidance: "시크릿 수명주기를 정의하고, 접근 통제와 감사 방식을 결합한 운영 모델을 설명하세요."
    }
  },
  {
    id: "it-22",
    category: "IT",
    prompt: "대규모 제품에서 피처 플래그 플랫폼을 설계할 때 고려해야 할 요소를 설명하세요.",
    expectations: {
      coreTopics: [
        "롤아웃 전략",
        "구성 관리",
        "실험 추적",
        "성능 오버헤드"
      ],
      bonusTopics: ["롤백 계획", "데이터 분석 연동"],
      minWordCount: 130,
      competencies: ["실험 문화", "시스템 설계", "운영 안정성"],
      guidance: "플래그 생명주기 관리와 모니터링 방식을 설명하고, 실패 시 빠르게 되돌리는 방법을 포함하세요."
    }
  },
  {
    id: "it-23",
    category: "IT",
    prompt: "메시지 큐 소비자를 장애에 강하게 만들기 위한 설계와 운영 전략을 설명하세요.",
    expectations: {
      coreTopics: [
        "멱등성",
        "재시도 전략",
        "모니터링",
        "수평 확장"
      ],
      bonusTopics: ["데드레터 큐", "백프레셔 제어"],
      minWordCount: 130,
      competencies: ["분산 시스템", "신뢰성", "운영 자동화"],
      guidance: "메시지 중복과 실패를 처리하는 패턴, 지표 기반 확장과 경보 설정을 상세히 설명하세요."
    }
  },
  {
    id: "it-24",
    category: "IT",
    prompt: "데이터베이스 스키마를 무중단으로 마이그레이션하려면 어떤 절차를 밟아야 합니까?",
    expectations: {
      coreTopics: [
        "버전 전략",
        "데이터 백필",
        "롤백 계획",
        "관측"
      ],
      bonusTopics: ["블루그린 배포", "스키마 비교 자동화"],
      minWordCount: 135,
      competencies: ["데이터 엔지니어링", "리스크 관리", "자동화 설계"],
      guidance: "점진적 변경과 백필, 모니터링을 조합해 가용성을 지키는 절차를 순서대로 설명하세요."
    }
  },
  {
    id: "it-25",
    category: "IT",
    prompt: "핵심 서비스의 SLO와 SLI를 정의하고 운영하는 방법을 설명해보세요.",
    expectations: {
      coreTopics: [
        "서비스 정의",
        "지표 선택",
        "에러 버짓",
        "알림 기준"
      ],
      bonusTopics: ["운영 캘린더", "사후 분석"],
      minWordCount: 130,
      competencies: ["신뢰성 엔지니어링", "데이터 분석", "팀 정렬"],
      guidance: "고객 영향 기반 지표를 설정하고, 버짓을 활용한 의사결정과 사례 공유 방식을 소개하세요."
    }
  },
  {
    id: "it-26",
    category: "IT",
    prompt: "모바일 네트워크 환경에서 웹 성능을 높이기 위한 전략은 무엇입니까?",
    expectations: {
      coreTopics: [
        "핵심 지표 측정",
        "이미지 최적화",
        "코드 분할",
        "네트워크 튜닝"
      ],
      bonusTopics: ["프리캐싱", "지연 로딩"],
      minWordCount: 120,
      competencies: ["웹 성능", "사용자 경험", "측정 문화"],
      guidance: "측정을 통해 병목을 파악하고, 자산 최적화와 네트워크 개선을 어떻게 검증하는지 설명하세요."
    }
  },
  {
    id: "it-27",
    category: "IT",
    prompt: "인프라를 코드로 관리하기 위한 기본 원칙과 구현 전략을 설명하세요.",
    expectations: {
      coreTopics: [
        "상태 관리",
        "모듈화",
        "검증 파이프라인",
        "권한 설계"
      ],
      bonusTopics: ["코드 리뷰 규칙", "테스트 인프라"],
      minWordCount: 130,
      competencies: ["인프라 자동화", "거버넌스", "확장성"],
      guidance: "IaC 도구 선택 근거와 모듈 구조, 배포 전 검증과 접근 통제 방식을 구체적으로 이야기하세요."
    }
  },
  {
    id: "it-28",
    category: "IT",
    prompt: "조직의 취약점 패치 관리를 체계화하기 위한 절차를 설명해보세요.",
    expectations: {
      coreTopics: [
        "취약점 분류",
        "배포 일정",
        "테스트 검증",
        "의사소통"
      ],
      bonusTopics: ["SBOM 관리", "자동화 배포"],
      minWordCount: 125,
      competencies: ["보안 운영", "프로그램 관리", "품질 보증"],
      guidance: "리스크 기반 우선순위와 배포 파이프라인, 이해관계자 공지를 포함한 엔드투엔드 흐름을 설명하세요."
    }
  },
  {
    id: "it-29",
    category: "IT",
    prompt: "대규모 이벤트 스트리밍 플랫폼에서 백프레셔와 트래픽 스파이크를 어떻게 제어하겠습니까?",
    expectations: {
      coreTopics: [
        "부하 예측",
        "큐 모니터링",
        "스케일링 정책",
        "페일오버 처리"
      ],
      bonusTopics: ["서킷 브레이커", "적응형 쓰로틀링"],
      minWordCount: 130,
      competencies: ["실시간 시스템", "신뢰성 설계", "위기 대응"],
      guidance: "백프레셔 탐지 지표와 자동 조정 전략, 실패 시 완화 패턴을 구체적으로 설명하세요."
    }
  },
  {
    id: "it-30",
    category: "IT",
    prompt: "LLM 기반 추론 API를 안정적으로 운영하기 위한 설계와 운영 전략은 무엇입니까?",
    expectations: {
      coreTopics: [
        "모델 서빙 전략",
        "캐시 계층",
        "GPU 활용도",
        "사용량 관측"
      ],
      bonusTopics: ["프롬프트 버전 관리", "비용 대비 성능"],
      minWordCount: 135,
      competencies: ["AI 운영", "성능 최적화", "운영 분석"],
      guidance: "지연과 비용을 균형 있게 관리하는 구조를 설명하고, 모델 업데이트와 실험을 어떻게 통제할지 포함하세요."
    }
  },
  {
    id: "per-01",
    category: "Personality",
    prompt: "팀 내 갈등을 해결했던 경험을 들려주세요. 어떻게 접근했나요?",
    expectations: {
      coreTopics: [
        "능동적 경청",
        "공감",
        "공동 목표",
        "후속 조치"
      ],
      bonusTopics: ["측정 가능한 결과", "코칭"],
      minWordCount: 130,
      competencies: ["커뮤니케이션", "협업", "감정 지능"],
      guidance: "상황-행동-결과 흐름으로 이야기하고, 신뢰를 유지한 방법을 강조하세요."
    }
  },
  {
    id: "per-02",
    category: "Personality",
    prompt: "실패를 경험했을 때 배운 점과 이후에 어떻게 변화했는지 이야기해보세요.",
    expectations: {
      coreTopics: [
        "책임감",
        "근본 원인 분석",
        "학습 적용",
        "재발 방지"
      ],
      bonusTopics: ["피드백 요청", "타인 지원"],
      minWordCount: 125,
      competencies: ["성장 마인드셋", "회복 탄력성", "자기 인식"],
      guidance: "실패의 맥락을 솔직하게 공유하고, 배운 점이 성과로 이어진 사례를 제시하세요."
    }
  },
  {
    id: "per-03",
    category: "Personality",
    prompt: "동료나 리더에게 피드백을 받는 방식과 이를 실행에 옮기는 방법을 설명해보세요.",
    expectations: {
      coreTopics: [
        "열린 소통",
        "구체적인 예시",
        "행동 계획",
        "후속 확인"
      ],
      bonusTopics: ["피드백 의식", "감사 표현"],
      minWordCount: 120,
      competencies: ["코치 가능성", "협업", "지속적 개선"],
      guidance: "피드백을 요청하고 처리하는 루틴, 변화가 있었는지 어떻게 확인하는지 공유하세요."
    }
  },
  {
    id: "per-04",
    category: "Personality",
    prompt: "직접적인 권한 없이 리더십을 발휘했던 사례를 들려주세요.",
    expectations: {
      coreTopics: [
        "영향력 발휘",
        "정렬",
        "지원",
        "결과"
      ],
      bonusTopics: ["멘토링", "이해관계자 맵"],
      minWordCount: 125,
      competencies: ["리더십", "주도성", "협업"],
      guidance: "어떻게 동기부여하고 방향을 명확히 했는지, 어떤 결과를 냈는지 구체적으로 설명하세요."
    }
  },
  {
    id: "per-05",
    category: "Personality",
    prompt: "매우 촉박한 마감 속에서도 결과를 냈던 경험을 알려주세요.",
    expectations: {
      coreTopics: [
        "우선순위화",
        "소통",
        "집중",
        "결과"
      ],
      bonusTopics: ["위험 관리", "회고"],
      minWordCount: 120,
      competencies: ["시간 관리", "책임감", "압박 대응"],
      guidance: "기대치를 어떻게 조정하고 범위를 다듬었는지, 품질을 확보한 방법을 설명하세요."
    }
  },
  {
    id: "per-06",
    category: "Personality",
    prompt: "불명확한 요구사항이나 변하는 목표를 어떻게 다루는지 이야기해보세요.",
    expectations: {
      coreTopics: [
        "명확화 질문",
        "가정 정렬",
        "반복적 진행",
        "이해관계자 업데이트"
      ],
      bonusTopics: ["실험", "문서화"],
      minWordCount: 125,
      competencies: ["적응력", "제품 사고", "커뮤니케이션"],
      guidance: "모호함을 구조화하는 방법과 정기적인 정렬 방식, 결과를 측정한 방법을 공유하세요."
    }
  },
  {
    id: "per-07",
    category: "Personality",
    prompt: "디자인이나 제품팀 등 다른 조직과 협업했던 방식에 대해 설명하세요.",
    expectations: {
      coreTopics: [
        "공동 목표",
        "피드백 루프",
        "존중",
        "의사결정"
      ],
      bonusTopics: ["공동 워크숍", "아이디어 공동 제작"],
      minWordCount: 120,
      competencies: ["팀워크", "커뮤니케이션", "고객 중심"],
      guidance: "협업 리듬과 의견 충돌을 해결한 방법, 고객 가치에 대한 정렬 과정을 이야기하세요."
    }
  },
  {
    id: "per-08",
    category: "Personality",
    prompt: "팀 동료를 멘토링하거나 코칭했던 경험을 공유해주세요.",
    expectations: {
      coreTopics: [
        "목표 설정",
        "경청",
        "가이드 제공",
        "진척 측정"
      ],
      bonusTopics: ["커리어 개발", "심리적 안정감"],
      minWordCount: 120,
      competencies: ["멘토십", "공감", "지원"],
      guidance: "어떻게 맞춤형 지원을 제공했고, 어떤 변화를 이끌었는지 결과와 함께 설명하세요."
    }
  },
  {
    id: "per-09",
    category: "Personality",
    prompt: "지속 가능한 워크라이프 밸런스를 유지하기 위해 어떤 습관을 가지고 있나요?",
    expectations: {
      coreTopics: [
        "경계 설정",
        "우선순위화",
        "자기 관리",
        "소통"
      ],
      bonusTopics: ["팀 규범", "롤모델링"],
      minWordCount: 115,
      competencies: ["자기 관리", "웰빙", "팀 배려"],
      guidance: "루틴과 도구, 팀과의 대화를 통해 균형을 유지하는 방법을 구체적인 예로 공유하세요."
    }
  },
  {
    id: "per-10",
    category: "Personality",
    prompt: "고압적인 상황에서 스트레스를 어떻게 관리하는지 설명해보세요.",
    expectations: {
      coreTopics: [
        "자기 인식",
        "대처 전략",
        "소통",
        "지원 체계"
      ],
      bonusTopics: ["마음챙김", "팀 회복력"],
      minWordCount: 120,
      competencies: ["감정 조절", "회복 탄력성", "리더십"],
      guidance: "스트레스를 감지하는 신호와 대처 방법, 팀을 어떻게 안정시키는지 이야기하세요."
    }
  },
  {
    id: "per-11",
    category: "Personality",
    prompt: "전문성을 최신으로 유지하기 위해 어떤 방식으로 학습하고 적용하나요?",
    expectations: {
      coreTopics: [
        "학습 주기",
        "학습 자원",
        "실전 적용",
        "지식 공유"
      ],
      bonusTopics: ["커뮤니티 참여", "사이드 프로젝트"],
      minWordCount: 120,
      competencies: ["지속적 학습", "주도성", "성장 마인드셋"],
      guidance: "학습 계획과 실제 업무에 적용한 사례, 팀에 확산한 방법을 설명하세요."
    }
  },
  {
    id: "per-12",
    category: "Personality",
    prompt: "업무 중 윤리적 딜레마에 직면했을 때 어떤 결정을 내렸는지 이야기해보세요.",
    expectations: {
      coreTopics: [
        "원칙",
        "이해관계자 영향",
        "의사결정 과정",
        "용기"
      ],
      bonusTopics: ["회사 가치", "적절한 보고"],
      minWordCount: 135,
      competencies: ["윤리성", "판단력", "책임감"],
      guidance: "상황의 위험도를 설명하고, 어떤 기준으로 결정을 내렸는지와 결과를 공유하세요."
    }
  },
  {
    id: "per-13",
    category: "Personality",
    prompt: "큰 방향 전환에 빠르게 적응했던 경험을 공유해주세요.",
    expectations: {
      coreTopics: [
        "변화 감지",
        "정렬",
        "실행 계획",
        "결과"
      ],
      bonusTopics: ["회고", "타인 지원"],
      minWordCount: 125,
      competencies: ["적응력", "커뮤니케이션", "리더십"],
      guidance: "변화에 어떻게 대응했는지와 팀이 집중력을 유지하도록 도운 방법을 설명하세요."
    }
  },
  {
    id: "per-14",
    category: "Personality",
    prompt: "포용적인 팀 문화를 만들기 위해 어떤 기여를 했는지 말씀해주세요.",
    expectations: {
      coreTopics: [
        "포용 실천",
        "동료 배려",
        "경청",
        "측정 가능한 행동"
      ],
      bonusTopics: ["ERG 참여", "접근성 향상"],
      minWordCount: 130,
      competencies: ["다양성 옹호", "리더십", "공감"],
      guidance: "구체적인 행동과 팀에 미친 영향을 이야기하고, 지속성을 어떻게 확보했는지 설명하세요."
    }
  },
  {
    id: "per-15",
    category: "Personality",
    prompt: "이 역할과 우리 회사에 대해 어떤 점이 동기부여가 되나요?",
    expectations: {
      coreTopics: [
        "미션 공감",
        "역할 임팩트",
        "강점",
        "미래 비전"
      ],
      bonusTopics: ["회사 사례 조사", "장기 성장"],
      minWordCount: 120,
      competencies: ["동기 부여", "리서치", "자기 인식"],
      guidance: "회사의 목표와 자신의 가치·강점을 연결하고, 앞으로의 기여 계획을 제시하세요."
    }
  },
  {
    id: "per-16",
    category: "Personality",
    prompt: "시간대가 다른 팀을 이끌거나 협업했던 경험을 들려주세요.",
    expectations: {
      coreTopics: [
        "공유 리듬",
        "명확한 소통",
        "도구 활용",
        "신뢰 구축"
      ],
      bonusTopics: ["핸드오프 체크리스트", "문화적 배려"],
      minWordCount: 125,
      competencies: ["글로벌 협업", "조정 능력", "리더십"],
      guidance: "소통 규칙과 책임 분담을 어떻게 세웠는지, 협업 품질을 측정한 방법을 설명하세요."
    }
  },
  {
    id: "per-17",
    category: "Personality",
    prompt: "요구가 까다로운 이해관계자를 설득하거나 협상한 경험을 공유해주세요.",
    expectations: {
      coreTopics: [
        "욕구 파악",
        "데이터 기반 설득",
        "합의 도출",
        "관계 유지"
      ],
      bonusTopics: ["대안 제시", "후속 관리"],
      minWordCount: 125,
      competencies: ["설득력", "비즈니스 감각", "감정 지능"],
      guidance: "상대를 이해하기 위해 어떤 질문을 했는지, 어떻게 공통 목표를 찾아냈는지 구체적으로 이야기하세요."
    }
  },
  {
    id: "per-18",
    category: "Personality",
    prompt: "팀의 심리적 안전감을 높이기 위해 어떤 행동을 했나요?",
    expectations: {
      coreTopics: [
        "경청",
        "실수 공유",
        "포용적 언행",
        "피드백 루프"
      ],
      bonusTopics: ["실험 장려", "리추얼 설계"],
      minWordCount: 125,
      competencies: ["팀 케어", "신뢰 구축", "리더십"],
      guidance: "구체적인 사례와 그 결과, 팀 분위기가 어떻게 변화했는지 측정 지표와 함께 이야기하세요."
    }
  },
  {
    id: "per-19",
    category: "Personality",
    prompt: "고객의 목소리를 대변해 제품이나 프로세스를 개선했던 경험을 알려주세요.",
    expectations: {
      coreTopics: [
        "고객 인사이트",
        "문제 정의",
        "솔루션 실행",
        "영향 측정"
      ],
      bonusTopics: ["사용자 인터뷰", "고객 여정 지도"],
      minWordCount: 125,
      competencies: ["고객 집착", "주도성", "협업"],
      guidance: "데이터와 정성적 인사이트를 사용해 변화를 이끌고, 결과를 어떻게 검증했는지 설명하세요."
    }
  },
  {
    id: "per-20",
    category: "Personality",
    prompt: "동료와 피드백을 주고받는 과정에서 갈등이 생겼을 때 어떻게 해결했는지 이야기해주세요.",
    expectations: {
      coreTopics: [
        "관점 이해",
        "감정 관리",
        "공동 해결책",
        "후속 합의"
      ],
      bonusTopics: ["중재 요청", "학습 공유"],
      minWordCount: 125,
      competencies: ["갈등 해결", "커뮤니케이션", "자기 인식"],
      guidance: "상대의 의도를 파악하고 공동으로 해결책을 마련한 과정과 결과를 설명하세요."
    }
  },
  {
    id: "per-21",
    category: "Personality",
    prompt: "번아웃에 가까운 동료를 지원한 경험이 있다면 공유해주세요.",
    expectations: {
      coreTopics: [
        "상태 파악",
        "공감 표현",
        "자원 연결",
        "진행 점검"
      ],
      bonusTopics: ["리더십 협력", "팀 규범 개선"],
      minWordCount: 120,
      competencies: ["공감", "지원", "팀 케어"],
      guidance: "어떻게 상황을 인지했고, 구체적으로 어떤 도움을 제공하여 변화가 있었는지 이야기하세요."
    }
  },
  {
    id: "per-22",
    category: "Personality",
    prompt: "조직 개편 이후 팀을 다시 정렬시킨 경험을 설명해주세요.",
    expectations: {
      coreTopics: [
        "비전 재정의",
        "역할 명확화",
        "커뮤니케이션",
        "성과 추적"
      ],
      bonusTopics: ["팀 헌장", "워크숍"],
      minWordCount: 130,
      competencies: ["변화 리더십", "전략적 사고", "팀 빌딩"],
      guidance: "새로운 방향성을 설정하고 팀이 따라오도록 만든 과정, 정량·정성 결과를 공유하세요."
    }
  },
  {
    id: "per-23",
    category: "Personality",
    prompt: "팀의 지식 공유 문화를 만들거나 강화한 경험이 있나요?",
    expectations: {
      coreTopics: [
        "필요성 인식",
        "형태 설계",
        "참여 유도",
        "지속성 확보"
      ],
      bonusTopics: ["실패 공유", "도구 자동화"],
      minWordCount: 125,
      competencies: ["학습 문화", "주도성", "협업"],
      guidance: "어떻게 참여를 이끌어냈고, 지식 공유가 성과와 연결된 지표를 소개하세요."
    }
  },
  {
    id: "per-24",
    category: "Personality",
    prompt: "성과가 정체됐을 때 동기부여를 회복한 경험을 이야기해주세요.",
    expectations: {
      coreTopics: [
        "원인 분석",
        "새 목표 설정",
        "습관 조정",
        "결과 확인"
      ],
      bonusTopics: ["멘토 상담", "회복 계획"],
      minWordCount: 120,
      competencies: ["자기 성찰", "회복 탄력성", "주도성"],
      guidance: "정체의 신호를 어떻게 인지했는지, 전략을 바꿔 성과를 낸 사례를 공유하세요."
    }
  },
  {
    id: "per-25",
    category: "Personality",
    prompt: "팀에서 실험과 혁신을 장려하기 위해 어떤 행동을 했나요?",
    expectations: {
      coreTopics: [
        "문제 정의",
        "실험 설계",
        "리스크 관리",
        "학습 공유"
      ],
      bonusTopics: ["작은 성공 축하", "실패 허용"],
      minWordCount: 125,
      competencies: ["창의성 촉진", "리더십", "협업"],
      guidance: "실험을 안전하게 진행할 수 있는 환경을 만들고, 학습을 확산한 방법을 설명하세요."
    }
  },
  {
    id: "per-26",
    category: "Personality",
    prompt: "팀에 새로운 도구나 프로세스를 도입했던 경험을 들려주세요.",
    expectations: {
      coreTopics: [
        "문제 진단",
        "도구 평가",
        "도입 계획",
        "채택 지원"
      ],
      bonusTopics: ["교육 자료", "효과 측정"],
      minWordCount: 125,
      competencies: ["변화 관리", "분석력", "커뮤니케이션"],
      guidance: "도입 배경과 선택 이유, 팀이 안착하도록 도운 활동과 결과를 구체적으로 이야기하세요."
    }
  },
  {
    id: "per-27",
    category: "Personality",
    prompt: "원격 환경에서 신규 구성원을 온보딩시킨 경험이 있다면 설명해주세요.",
    expectations: {
      coreTopics: [
        "준비된 자료",
        "페어링",
        "피드백 루프",
        "성과 확인"
      ],
      bonusTopics: ["커뮤니티 빌딩", "멘토 프로그램"],
      minWordCount: 120,
      competencies: ["조직화", "멘토십", "공감"],
      guidance: "온보딩 계획과 일정, 새 구성원이 빠르게 기여하도록 한 방법을 사례로 공유하세요."
    }
  },
  {
    id: "per-28",
    category: "Personality",
    prompt: "개인 목표와 팀 목표가 충돌했을 때 어떻게 균형을 맞췄는지 이야기해주세요.",
    expectations: {
      coreTopics: [
        "충돌 파악",
        "우선순위 협상",
        "투명한 소통",
        "결과 점검"
      ],
      bonusTopics: ["OKR 조정", "멘토 상담"],
      minWordCount: 125,
      competencies: ["우선순위 설정", "커뮤니케이션", "윤리성"],
      guidance: "이해관계자와 대화를 통해 합의를 만든 과정과, 이후 성과에 어떤 변화가 있었는지 설명하세요."
    }
  },
  {
    id: "per-29",
    category: "Personality",
    prompt: "팀 회고를 주도하거나 개선한 경험을 공유해주세요.",
    expectations: {
      coreTopics: [
        "안전한 분위기",
        "데이터 수집",
        "실행 항목",
        "후속 추적"
      ],
      bonusTopics: ["다양한 포맷", "성과 공유"],
      minWordCount: 120,
      competencies: ["촉진력", "문제 해결", "팀 문화"],
      guidance: "회고를 설계한 방식과 실행 항목이 실제로 반영되도록 추적한 과정을 이야기하세요."
    }
  },
  {
    id: "per-30",
    category: "Personality",
    prompt: "팀이나 조직 문화를 개선하기 위해 제안한 아이디어를 실행한 경험이 있나요?",
    expectations: {
      coreTopics: [
        "문제 인식",
        "아이디어 제안",
        "실행 계획",
        "영향 측정"
      ],
      bonusTopics: ["리더십 설득", "확산 전략"],
      minWordCount: 125,
      competencies: ["문화 구축", "주도성", "협업"],
      guidance: "변화가 필요한 이유를 어떻게 설득했고, 실행 후 어떤 변화를 측정했는지 구체적으로 설명하세요."
    }
  }
];
