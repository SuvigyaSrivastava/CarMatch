import { GoogleGenAI } from "@google/genai";
import { Car, RecommendResponse } from "@/types";

export async function getCarRecommendations(
  userQuery: string,
  cars: Car[],
  conversationHistory: { role: "user" | "assistant"; content: string }[],
): Promise<RecommendResponse> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const systemPrompt = `You are CarMatch, an expert Indian car buying advisor. You help confused buyers find the right car based on their needs, budget, and lifestyle.

You have access to a dataset of ${cars.length} cars available in India. Here is the complete dataset:

${JSON.stringify(cars, null, 2)}

Your job:
1. Understand what the buyer actually needs, even if they express it vaguely
2. Filter and rank the dataset to find the best 3-5 matches
3. Explain clearly why each car fits their needs
4. Be honest about trade-offs

Rules:
- ONLY recommend cars from the dataset above. Never invent cars.
- If budget is mentioned, strictly filter by price_lakh.
- If fuel type is mentioned, filter by fuel_type.
- Prioritize safety_rating_ncap highly if the user mentions family or children.
- If query is too vague, include a clarifying_question.
- Match score should reflect how well the car fits the specific query, not general quality.
- match_reason must directly reference what the user asked for.
- Keep trade_offs honest and specific.

You MUST respond with ONLY valid JSON matching this exact schema:
{
  "recommendations": [
    {
      "car": { "full": "car object from dataset" },
      "match_score": 87,
      "match_reason": "2-3 sentence explanation tailored to the user's query",
      "trade_offs": "What they are giving up by picking this car"
    }
  ],
  "summary": "Based on your needs, here are your top picks...",
  "clarifying_question": "Optional follow-up if query was vague"
}`;

  const historyText = conversationHistory
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n\n");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${systemPrompt}

Conversation history:
${historyText || "No previous conversation."}

Current user query:
${userQuery}`,
    config: {
      responseMimeType: "application/json",
    },
  });

  const raw = response.text ?? "{}";
  return JSON.parse(raw) as RecommendResponse;
}
