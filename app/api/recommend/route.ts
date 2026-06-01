import { NextRequest, NextResponse } from "next/server";
import { getCarRecommendations } from "@/lib/gemini";
import cars from "@/data/cars.json";
import { Car } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, history = [] } = body;

    if (!query || typeof query !== "string" || query.trim().length < 3) {
      return NextResponse.json(
        { error: "Please provide a valid search query" },
        { status: 400 },
      );
    }

    const result = await getCarRecommendations(
      query.trim(),
      cars as Car[],
      history,
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Recommendation error:", error);

    const message = error instanceof Error ? error.message : "";

    if (message.toLowerCase().includes("quota")) {
      return NextResponse.json(
        {
          error:
            "Your Gemini key is valid, but the account has insufficient quota. Please check billing or use a key with available credits.",
        },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { error: "Failed to get recommendations. Please try again." },
      { status: 500 },
    );
  }
}
