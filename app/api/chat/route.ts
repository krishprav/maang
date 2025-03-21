//app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAIResponse } from "@/services/ai-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Invalid question format" },
        { status: 400 }
      );
    }

    const response = await getAIResponse(question);
    if (!response) {
      throw new Error("No response from AI service");
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again later." },
      { status: 500 }
    );
  }
}