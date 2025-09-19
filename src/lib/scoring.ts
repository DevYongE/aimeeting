import { InterviewQuestion } from "@/data/questions";

export type ScoreLabel = "excellent" | "strong" | "developing" | "needs-improvement";

export type ScoreBreakdown = {
  keywordScore: number;
  bonusScore: number;
  depthScore: number;
  structureScore: number;
  softSkillScore: number;
  matchedCoreTopics: string[];
  matchedBonusTopics: string[];
  missingCoreTopics: string[];
  wordCount: number;
  toneSignals: string[];
};

export type EvaluationResult = {
  score: number;
  label: ScoreLabel;
  feedback: string[];
  breakdown: ScoreBreakdown;
};

const KEYWORD_WEIGHT = 0.55;
const BONUS_WEIGHT = 0.1;
const DEPTH_WEIGHT = 0.2;
const STRUCTURE_WEIGHT = 0.075;
const SOFT_SKILL_WEIGHT = 0.075;

const STRUCTURE_SIGNALS = [
  "먼저",
  "다음으로",
  "그 다음",
  "이후",
  "마지막으로",
  "결론적으로",
  "예를 들어",
  "결과적으로",
  "because",
  "as a result",
  "outcome"
];

const SOFT_SKILL_SIGNALS = {
  general: [
    "협업",
    "team",
    "이해관계자",
    "stakeholder",
    "소통",
    "communicate",
    "정렬",
    "align",
    "영향",
    "impact",
    "고객",
    "customer",
    "문서화",
    "document",
    "공유",
    "share",
    "학습",
    "learn"
  ],
  personality: [
    "공감",
    "empathy",
    "지원",
    "support",
    "경청",
    "listen",
    "피드백",
    "feedback",
    "신뢰",
    "trust",
    "존중",
    "respect",
    "포용",
    "inclusion",
    "동기부여",
    "motivated",
    "균형",
    "balance",
    "성장",
    "growth"
  ]
};

const POSITIVE_TONE_WORDS = [
  "감사",
  "기쁘",
  "자랑스럽",
  "자신 있",
  "배웠",
  "개선했",
  "성공",
  "뿌듯",
  "excited",
  "proud",
  "confident",
  "learned",
  "improved",
  "successful",
  "grateful"
];

const NEGATIVE_TONE_FLAGS = [
  "탓",
  "아무것도",
  "불가능",
  "막혔",
  "좌절",
  "실패만",
  "포기",
  "blame",
  "nothing",
  "impossible",
  "stuck"
];

const WORD_SPLIT_REGEX = /\s+/g;

const normalize = (value: string) => value.toLowerCase().trim();

const countWords = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return 0;
  }
  return trimmed
    .split(WORD_SPLIT_REGEX)
    .filter((token) => token.length > 0).length;
};

const matchKeywords = (answer: string, keywords: string[]) => {
  const normalizedAnswer = normalize(answer);
  const matches: string[] = [];

  keywords.forEach((keyword) => {
    const normalizedKeyword = keyword.toLowerCase();
    if (normalizedKeyword.length === 0) {
      return;
    }
    if (normalizedAnswer.includes(normalizedKeyword)) {
      matches.push(keyword);
    }
  });

  return matches;
};

const calculateScore = (weight: number, achieved: number, total: number) => {
  if (total === 0) {
    return 0;
  }
  const ratio = Math.min(achieved / total, 1);
  return Math.round(weight * ratio * 100);
};

const detectToneSignals = (answer: string) => {
  const normalizedAnswer = normalize(answer);
  const positives = POSITIVE_TONE_WORDS.filter((word) =>
    normalizedAnswer.includes(word)
  );
  const negatives = NEGATIVE_TONE_FLAGS.filter((word) =>
    normalizedAnswer.includes(word)
  );

  const signals: string[] = [];

  if (positives.length > 0) {
    signals.push(`긍정: ${positives.join(", ")}`);
  }

  if (negatives.length > 0) {
    signals.push(`주의: ${negatives.join(", ")}`);
  }

  return signals;
};

const determineLabel = (score: number): ScoreLabel => {
  if (score >= 85) {
    return "excellent";
  }
  if (score >= 70) {
    return "strong";
  }
  if (score >= 50) {
    return "developing";
  }
  return "needs-improvement";
};

export const evaluateAnswer = (
  answer: string,
  question: InterviewQuestion
): EvaluationResult => {
  const trimmedAnswer = answer.trim();

  if (!trimmedAnswer) {
    return {
      score: 0,
      label: "needs-improvement",
      feedback: [
        "아직 답변이 입력되지 않았습니다. 생각을 적어야 평가와 피드백을 받을 수 있어요."
      ],
      breakdown: {
        keywordScore: 0,
        bonusScore: 0,
        depthScore: 0,
        structureScore: 0,
        softSkillScore: 0,
        matchedCoreTopics: [],
        matchedBonusTopics: [],
        missingCoreTopics: question.expectations.coreTopics,
        wordCount: 0,
        toneSignals: []
      }
    };
  }

  const { coreTopics, bonusTopics = [], minWordCount } = question.expectations;

  const wordCount = countWords(trimmedAnswer);
  const matchedCore = matchKeywords(trimmedAnswer, coreTopics);
  const matchedBonus = matchKeywords(trimmedAnswer, bonusTopics);
  const missingCore = coreTopics.filter(
    (topic) => !matchedCore.includes(topic)
  );

  const keywordScore = calculateScore(
    KEYWORD_WEIGHT,
    matchedCore.length,
    coreTopics.length
  );

  const bonusScore = calculateScore(
    BONUS_WEIGHT,
    matchedBonus.length,
    Math.max(bonusTopics.length, 1)
  );

  const depthRatio = Math.min(wordCount / minWordCount, 1.2);
  const depthScore = Math.round(Math.min(depthRatio, 1) * DEPTH_WEIGHT * 100);

  const matchedStructureSignals = matchKeywords(trimmedAnswer, STRUCTURE_SIGNALS);
  const structureScore = calculateScore(
    STRUCTURE_WEIGHT,
    matchedStructureSignals.length,
    Math.min(6, STRUCTURE_SIGNALS.length)
  );

  const softSignalsPool =
    question.category === "Personality"
      ? [...SOFT_SKILL_SIGNALS.general, ...SOFT_SKILL_SIGNALS.personality]
      : SOFT_SKILL_SIGNALS.general;

  const matchedSoftSignals = matchKeywords(trimmedAnswer, softSignalsPool);
  const softSkillScore = calculateScore(
    SOFT_SKILL_WEIGHT,
    matchedSoftSignals.length,
    Math.min(6, softSignalsPool.length)
  );

  const totalScore = Math.min(
    keywordScore + bonusScore + depthScore + structureScore + softSkillScore,
    100
  );

  const feedback: string[] = [];

  if (matchedCore.length === coreTopics.length) {
    feedback.push("필수 포인트를 모두 다뤘어요. 아주 탄탄한 답변입니다.");
  } else if (matchedCore.length > 0) {
    feedback.push(
      `핵심 포인트 ${matchedCore.length}개를 언급했습니다. 다음 요소도 포함해보세요: ${missingCore.join(", ")}.`
    );
  } else {
    feedback.push(
      `다음 핵심 요소를 꼭 다뤄보세요: ${coreTopics.slice(0, 3).join(", ")}.`
    );
  }

  if (wordCount < minWordCount * 0.75) {
    feedback.push(
      `세부 내용을 조금 더 추가해보세요. 최소 ${minWordCount}단어 이상을 목표로 하고, 현재 ${wordCount}단어입니다.`
    );
  } else if (wordCount > minWordCount * 1.4) {
    feedback.push("핵심 메시지만 남기고 간결하게 다듬으면 더 집중도가 높아집니다.");
  }

  if (structureScore < Math.round(STRUCTURE_WEIGHT * 100 * 0.3)) {
    feedback.push(
      "상황-행동-결과처럼 구조화된 전환어를 추가하면 이야기가 더 명확해집니다."
    );
  }

  if (question.category === "Personality" && softSkillScore < 20) {
    feedback.push(
      "협업이나 감정 표현을 조금 더 드러내면 설득력이 높아집니다."
    );
  }

  if (totalScore >= 85) {
    feedback.push("매우 완성도 높은 답변입니다. 전달 속도를 연습하면 더욱 좋겠습니다.");
  }

  const toneSignals = detectToneSignals(trimmedAnswer);

  if (toneSignals.some((signal) => signal.startsWith("주의"))) {
    feedback.push(
      "부정적으로 들릴 수 있는 표현이 있습니다. 배운 점이나 팀에 준 가치를 강조해보세요."
    );
  }

  if (feedback.length === 0) {
    feedback.push("탄탄한 답변입니다. 스토리텔링을 조금만 다듬으면 더 돋보일 거예요.");
  }

  return {
    score: totalScore,
    label: determineLabel(totalScore),
    feedback,
    breakdown: {
      keywordScore,
      bonusScore,
      depthScore,
      structureScore,
      softSkillScore,
      matchedCoreTopics: matchedCore,
      matchedBonusTopics: matchedBonus,
      missingCoreTopics: missingCore,
      wordCount,
      toneSignals
    }
  };
};
