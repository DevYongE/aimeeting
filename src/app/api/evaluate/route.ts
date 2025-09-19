import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { interviewQuestions } from "@/data/questions";

const DEFAULT_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type RequestBody = {
  questionId: string;
  answer: string;
};

type AiFeedback = {
  score: number;
  label: "excellent" | "strong" | "developing" | "needs-improvement";
  summary: string;
  strengths: string[];
  improvements: string[];
  followUpQuestions: string[];
};

type ApiSuccess = {
  ok: true;
  feedback: AiFeedback;
};

type ApiError = {
  ok: false;
  error: string;
};

const buildPrompt = (
  question: { prompt: string; expectations: (typeof interviewQuestions)[number]["expectations"] },
  answer: string
) => {
  return `다음은 기술 및 인성 면접에서 지원자가 한 답변입니다. 면접관 시점에서 답변을 평가하고 JSON으로 정리하세요.

면접 질문: ${question.prompt}
핵심 기대 포인트: ${question.expectations.coreTopics.join(", ")}
추가 언급 시 가산점 요소: ${(question.expectations.bonusTopics ?? []).join(", ") || "없음"}
요구 역량: ${question.expectations.competencies.join(", ")}
권장 분량(단어): ${question.expectations.minWordCount}

지원자 답변:
"""
${answer}
"""

아래 JSON 스키마를 정확히 따르세요.
{
  "score": number(0~100),
  "label": "excellent" | "strong" | "developing" | "needs-improvement",
  "summary": string,
  "strengths": string[],
  "improvements": string[],
  "followUpQuestions": string[]
}

- 점수 기준: 핵심 포인트 충족도, 구조, 깊이, 협업/태도 표현을 종합적으로 고려하세요.
- label은 score에 기반하되 일관성 있게 선택하세요.
- summary는 2~3문장으로 답변의 전체 인상을 요약하세요.
- strengths와 improvements는 각각 2~3개의 bullet을 제시하세요.
- followUpQuestions는 면접관이 이어서 물어볼 수 있는 질문을 1~2개 작성하세요.
- JSON 외 텍스트를 아무것도 작성하지 마세요.`;
};

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    const error: ApiError = {
      ok: false,
      error: "OPENAI_API_KEY 환경 변수가 설정되어 있지 않습니다."
    };
    return NextResponse.json(error, { status: 500 });
  }

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ApiError>(
      {
        ok: false,
        error: "잘못된 요청 형식입니다. questionId와 answer를 JSON으로 전달하세요."
      },
      { status: 400 }
    );
  }

  const { questionId, answer } = body;

  if (!questionId || typeof questionId !== "string") {
    return NextResponse.json<ApiError>(
      { ok: false, error: "questionId가 필요합니다." },
      { status: 400 }
    );
  }

  if (!answer || typeof answer !== "string") {
    return NextResponse.json<ApiError>(
      { ok: false, error: "answer가 필요합니다." },
      { status: 400 }
    );
  }

  const question = interviewQuestions.find((item) => item.id === questionId);

  if (!question) {
    return NextResponse.json<ApiError>(
      { ok: false, error: "해당 questionId를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "당신은 면접관 보조 AI입니다. 답변을 공정하고 구체적으로 평가하고, JSON 결과만 반환해야 합니다"
        },
        {
          role: "user",
          content: buildPrompt(question, answer)
        }
      ]
    });

    const message = completion.choices[0]?.message?.content;

    if (!message) {
      throw new Error("OpenAI가 응답을 반환하지 않았습니다.");
    }

    let parsed: AiFeedback;
    try {
      parsed = JSON.parse(message);
    } catch {
      throw new Error("OpenAI 응답을 JSON으로 해석할 수 없습니다.");
    }

    const success: ApiSuccess = { ok: true, feedback: parsed };
    return NextResponse.json(success);
  } catch (error) {
    console.error("AI 평가 실패", error);
    const message =
      error instanceof Error
        ? error.message
        : "AI 평가 도중 알 수 없는 오류가 발생했습니다.";
    const response: ApiError = {
      ok: false,
      error: message
    };
    return NextResponse.json(response, { status: 500 });
  }
}
