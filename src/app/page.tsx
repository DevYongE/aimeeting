"use client";

import { useMemo, useState } from "react";
import { interviewQuestions } from "@/data/questions";
import {
  EvaluationResult,
  ScoreLabel,
  evaluateAnswer
} from "@/lib/scoring";

type AiFeedback = {
  score: number;
  label: ScoreLabel;
  summary: string;
  strengths: string[];
  improvements: string[];
  followUpQuestions: string[];
};

type AiApiResponse =
  | { ok: true; feedback: AiFeedback }
  | { ok: false; error: string };

const LABEL_META: Record<ScoreLabel, { title: string; tone: string; badge: string }> = {
  excellent: {
    title: "준비 완료",
    tone: "면접관이 듣고 싶은 포인트가 모두 담겨 있어요.",
    badge: "bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/40"
  },
  strong: {
    title: "매우 좋음",
    tone: "핵심은 충실합니다. 몇 가지 디테일을 보강하면 완벽해요.",
    badge: "bg-sky-500/10 text-sky-200 ring-1 ring-inset ring-sky-500/40"
  },
  developing: {
    title: "다듬는 중",
    tone: "구조는 잡혔으니 사례와 근거를 조금 더 채워보세요.",
    badge: "bg-amber-500/10 text-amber-200 ring-1 ring-inset ring-amber-500/40"
  },
  "needs-improvement": {
    title: "시작하기",
    tone: "핵심 포인트와 경험을 더 드러내면 훨씬 좋아집니다.",
    badge: "bg-rose-500/10 text-rose-200 ring-1 ring-inset ring-rose-500/40"
  }
};

const categoryStyles: Record<string, string> = {
  IT: "bg-indigo-500/10 text-indigo-200 border-indigo-400/40",
  Personality: "bg-fuchsia-500/10 text-fuchsia-200 border-fuchsia-400/40"
};

const categoryLabels: Record<string, string> = {
  IT: "기술",
  Personality: "인성"
};

const countWords = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) {
    return 0;
  }
  return trimmed.split(/\s+/).length;
};

type SessionState = {
  answers: Record<string, string>;
  evaluations: Record<string, EvaluationResult>;
  aiEvaluations: Record<string, AiFeedback>;
};

const INITIAL_SESSION: SessionState = {
  answers: {},
  evaluations: {},
  aiEvaluations: {}
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [session, setSession] = useState<SessionState>(INITIAL_SESSION);
  const [draftAnswer, setDraftAnswer] = useState("");
  const [showGuidance, setShowGuidance] = useState(true);
  const [aiRequesting, setAiRequesting] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const currentQuestion = interviewQuestions[currentIndex];
  const currentResult = session.evaluations[currentQuestion.id];
  const aiFeedback = session.aiEvaluations[currentQuestion.id];
  const draftWordCount = countWords(draftAnswer);

  const summary = useMemo(() => {
    const entries = Object.entries(session.evaluations);
    if (entries.length === 0) {
      return {
        answered: 0,
        averageScore: 0,
        best: null as null | { id: string; score: number },
        needsReview: [] as { id: string; score: number }[]
      };
    }

    const averageScore = Math.round(
      entries.reduce((acc, [, result]) => acc + result.score, 0) / entries.length
    );

    const sorted = [...entries].sort((a, b) => b[1].score - a[1].score);
    const best = { id: sorted[0][0], score: sorted[0][1].score };
    const needsReview = sorted
      .slice(-3)
      .filter(([, result]) => result.score < 70)
      .map(([id, result]) => ({ id, score: result.score }));

    return { answered: entries.length, averageScore, best, needsReview };
  }, [session.evaluations]);

  const navigateToQuestion = (index: number) => {
    const target = Math.max(0, Math.min(interviewQuestions.length - 1, index));
    const targetId = interviewQuestions[target].id;
    setCurrentIndex(target);
    setDraftAnswer(session.answers[targetId] ?? "");
    setAiError(null);
  };

  const requestAiFeedback = async (answer: string, questionId: string) => {
    if (!answer.trim()) {
      return;
    }

    setAiRequesting(true);
    setAiError(null);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, answer })
      });

      const data = (await response.json()) as AiApiResponse;

      if (!response.ok || !data.ok) {
        const message = !data.ok ? data.error : "AI 평가 요청이 실패했습니다.";
        throw new Error(message);
      }

      setSession((prev) => ({
        answers: prev.answers,
        evaluations: prev.evaluations,
        aiEvaluations: {
          ...prev.aiEvaluations,
          [questionId]: data.feedback
        }
      }));
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : "AI 평가 요청 중 오류가 발생했습니다."
      );
    } finally {
      setAiRequesting(false);
    }
  };

  const handleEvaluate = async () => {
    const result = evaluateAnswer(draftAnswer, currentQuestion);
    setSession((prev) => ({
      answers: { ...prev.answers, [currentQuestion.id]: draftAnswer },
      evaluations: { ...prev.evaluations, [currentQuestion.id]: result },
      aiEvaluations: prev.aiEvaluations
    }));

    await requestAiFeedback(draftAnswer, currentQuestion.id);
  };

  const handleResetAnswer = () => {
    setDraftAnswer("");
    setSession((prev) => {
      const updatedAnswers = { ...prev.answers };
      const updatedEvaluations = { ...prev.evaluations };
      const updatedAiEvaluations = { ...prev.aiEvaluations };
      delete updatedAnswers[currentQuestion.id];
      delete updatedEvaluations[currentQuestion.id];
      delete updatedAiEvaluations[currentQuestion.id];
      return {
        answers: updatedAnswers,
        evaluations: updatedEvaluations,
        aiEvaluations: updatedAiEvaluations
      };
    });
    setAiError(null);
  };

  const handleNext = () => navigateToQuestion(currentIndex + 1);
  const handlePrevious = () => navigateToQuestion(currentIndex - 1);

  const questionProgress = `${currentIndex + 1} / ${interviewQuestions.length}`;
  const aiLabelMeta = aiFeedback ? LABEL_META[aiFeedback.label] ?? LABEL_META.developing : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/40">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              AI 면접 코치 워크스페이스
            </h1>
            <span className="rounded-full border border-slate-700 bg-slate-800/80 px-4 py-1 text-sm font-medium text-slate-300">
              진행도 {questionProgress}
            </span>
          </div>
          <p className="text-sm text-slate-300 sm:text-base">
            기술 및 인성 면접 질문 60개에 답변하고 즉시 점수와 피드백을 받아보세요.
            답변 초안을 작성한 뒤 평가하면, 보완해야 할 포인트를 한눈에 확인할 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-slate-400 sm:text-sm">
            <span className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1">
              실시간 키워드·구조 평가
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1">
              높은 점수/보완 필요한 질문 추적
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1">
              AI 코치 JSON 피드백
            </span>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <section className="flex flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/40">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  질문 {currentIndex + 1}
                </p>
                <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
                  {currentQuestion.prompt}
                </h2>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-sm font-medium ${
                  categoryStyles[currentQuestion.category] ??
                  "border-slate-600 bg-slate-800"
                }`}
              >
                {categoryLabels[currentQuestion.category] ?? currentQuestion.category}
              </span>
            </div>

            <div className="grid gap-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <button
                type="button"
                onClick={() => setShowGuidance((value) => !value)}
                className="flex items-center justify-between gap-4 text-left text-sm font-medium text-slate-200 hover:text-slate-100"
              >
                <span>
                  면접관이 기대하는 포인트
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    (클릭하면 {showGuidance ? "숨겨집니다" : "열립니다"})
                  </span>
                </span>
                <span className="text-xs text-slate-400">
                  {showGuidance ? "−" : "+"}
                </span>
              </button>

              {showGuidance ? (
                <div className="grid gap-3 text-sm text-slate-300">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      필수 포인트
                    </p>
                    <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                      {currentQuestion.expectations.coreTopics.map((topic) => (
                        <li
                          key={topic}
                          className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-slate-200"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {currentQuestion.expectations.bonusTopics && (
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-400">
                        추가로 언급하면 좋은 요소
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {currentQuestion.expectations.bonusTopics.map((topic) => (
                          <span
                            key={topic}
                            className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid gap-1">
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      평가 역량
                    </p>
                    <p className="text-slate-300">
                      {currentQuestion.expectations.competencies.join(", ")}
                    </p>
                  </div>
                  <p className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 text-slate-200">
                    {currentQuestion.expectations.guidance}
                  </p>
                  <p className="text-xs font-medium text-slate-400">
                    권장 분량: {currentQuestion.expectations.minWordCount}+ 단어
                  </p>
                </div>
              ) : null}
            </div>

            <div className="grid gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span>
                  단어 수(공백 기준): {draftWordCount} /{" "}
                  {currentQuestion.expectations.minWordCount}
                </span>
                {currentResult ? (
                  <span className="text-slate-300">
                    최근 점수: {currentResult.score}
                  </span>
                ) : null}
              </div>
              <textarea
                value={draftAnswer}
                onChange={(event) => setDraftAnswer(event.target.value)}
                placeholder="상황, 행동, 결과, 배운 점 순으로 답변을 구성해보세요. 구체적인 수치나 사례를 추가하면 좋습니다."
                className="min-h-[220px] w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm leading-6 text-slate-100 shadow-inner shadow-black/40 focus:border-sky-500 focus:outline-none focus:ring focus:ring-sky-500/30"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    이전 질문
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={currentIndex === interviewQuestions.length - 1}
                    className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    다음 질문
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleResetAnswer}
                    className="rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-600"
                  >
                    초기화
                  </button>
                  <button
                    type="button"
                    onClick={handleEvaluate}
                    disabled={aiRequesting}
                    className="rounded-lg bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400 disabled:cursor-wait disabled:opacity-70"
                  >
                    {aiRequesting ? "AI 분석 중..." : "답변 평가하기"}
                  </button>
                </div>
              </div>
            </div>

            {currentResult ? (
              <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-semibold text-slate-50">
                      {currentResult.score}
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        전체 점수
                      </p>
                      <p className="text-sm text-slate-300">
                        {LABEL_META[currentResult.label].tone}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${LABEL_META[currentResult.label].badge}`}
                  >
                    {LABEL_META[currentResult.label].title}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <BreakdownCard
                    label="핵심 주제 커버"
                    value={currentResult.breakdown.keywordScore}
                    details={`${currentResult.breakdown.matchedCoreTopics.length}/${currentQuestion.expectations.coreTopics.length}개 인식됨`}
                  />
                  <BreakdownCard
                    label="보너스 심화"
                    value={currentResult.breakdown.bonusScore}
                    details={`${currentResult.breakdown.matchedBonusTopics.length}개 키워드 감지`}
                  />
                  <BreakdownCard
                    label="답변 깊이"
                    value={currentResult.breakdown.depthScore}
                    details={`${currentResult.breakdown.wordCount} 단어`}
                  />
                  <BreakdownCard
                    label="구조·톤"
                    value={
                      currentResult.breakdown.structureScore +
                      currentResult.breakdown.softSkillScore
                    }
                    details={`신호: ${
                      currentResult.breakdown.toneSignals.join(", ") || "없음"
                    }`}
                  />
                </div>

                <div className="grid gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    개선 피드백
                  </p>
                  <ul className="grid gap-2">
                    {currentResult.feedback.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm text-slate-200"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {currentResult || aiRequesting || aiFeedback || aiError ? (
              <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      AI 코치 피드백
                    </p>
                    <p className="text-sm text-slate-300">
                      OpenAI API를 통해 생성된 맞춤 피드백입니다.
                    </p>
                  </div>
                  {aiFeedback && aiLabelMeta ? (
                    <span
                      className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${aiLabelMeta.badge}`}
                    >
                      {aiLabelMeta.title}
                    </span>
                  ) : null}
                </div>

                {aiRequesting ? (
                  <p className="text-sm text-slate-300">AI가 답변을 분석하는 중입니다...</p>
                ) : null}

                {aiError ? (
                  <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">
                    {aiError}
                  </p>
                ) : null}

                {aiFeedback && !aiRequesting ? (
                  <div className="grid gap-4 text-sm text-slate-200">
                    <div>
                      <p className="text-base font-semibold text-slate-100">
                        AI 요약
                      </p>
                      <p className="mt-2 text-slate-300">{aiFeedback.summary}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                          강점으로 본 부분
                        </p>
                        <ul className="mt-2 grid gap-2">
                          {aiFeedback.strengths.map((item) => (
                            <li
                              key={item}
                              className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-emerald-100"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">
                          개선하면 좋은 부분
                        </p>
                        <ul className="mt-2 grid gap-2">
                          {aiFeedback.improvements.map((item) => (
                            <li
                              key={item}
                              className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-amber-100"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {aiFeedback.followUpQuestions.length > 0 ? (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          이어질 수 있는 질문
                        </p>
                        <ul className="mt-2 grid gap-2">
                          {aiFeedback.followUpQuestions.map((item) => (
                            <li
                              key={item}
                              className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-slate-200"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {!aiFeedback && !aiRequesting && !aiError ? (
                  <p className="text-sm text-slate-400">
                    &quot;답변 평가하기&quot; 버튼을 누르면 AI가 구조, 강점, 개선점을 분석해줍니다.
                  </p>
                ) : null}
              </div>
            ) : null}
          </section>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/40">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                연습 요약
              </h3>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <div className="flex items-center justify-between">
                  <span>평가한 질문</span>
                  <span className="font-semibold text-slate-50">
                    {summary.answered} / {interviewQuestions.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>평균 점수</span>
                  <span className="font-semibold text-slate-50">
                    {summary.answered ? summary.averageScore : "—"}
                  </span>
                </div>
                {summary.best ? (
                  <div className="flex items-center justify-between">
                    <span>최고 점수 질문</span>
                    <button
                      type="button"
                      onClick={() =>
                        navigateToQuestion(
                          interviewQuestions.findIndex(
                            (question) => question.id === summary.best?.id
                          )
                        )
                      }
                      className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200 transition hover:border-emerald-400"
                    >
                      {summary.best.score}점 보기 →
                    </button>
                  </div>
                ) : null}
                {summary.needsReview.length > 0 ? (
                  <div className="grid gap-2">
                    <span className="text-xs uppercase tracking-wide text-slate-400">
                      다시 도전하면 좋은 질문
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {summary.needsReview.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            navigateToQuestion(
                              interviewQuestions.findIndex(
                                (question) => question.id === item.id
                              )
                            )
                          }
                          className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-200 transition hover:border-rose-400"
                        >
                          {item.score}점
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/40">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                질문 탐색기
              </h3>
              <ul className="mt-4 grid max-h-[440px] gap-2 overflow-y-auto pr-1 text-sm">
                {interviewQuestions.map((question, index) => {
                  const result = session.evaluations[question.id];
                  const isActive = index === currentIndex;
                  return (
                    <li key={question.id}>
                      <button
                        type="button"
                        onClick={() => navigateToQuestion(index)}
                        className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition ${
                          isActive
                            ? "border-sky-500/60 bg-sky-500/20 text-slate-50"
                            : "border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex flex-col text-xs sm:text-sm">
                          <span className="font-semibold">Q{index + 1}</span>
                          <span className="truncate text-slate-400">
                            {categoryLabels[question.category] ?? question.category}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-slate-200">
                          {result ? `${result.score}점` : "—"}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

type BreakdownCardProps = {
  label: string;
  value: number;
  details: string;
};

function BreakdownCard({ label, value, details }: BreakdownCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-slate-50">{value}</span>
        <span className="text-xs text-slate-400">/ 100</span>
      </div>
      <p className="mt-2 text-xs text-slate-400">{details}</p>
    </div>
  );
}
