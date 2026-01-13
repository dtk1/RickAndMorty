import { NextRequest, NextResponse } from "next/server";
import { generateCharacterAnalysis } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { characterName } = body;

    if (!characterName || typeof characterName !== "string") {
      return NextResponse.json(
        { error: "Character name is required" },
        { status: 400 }
      );
    }

    const { description, analysis } = await generateCharacterAnalysis(
      characterName
    );

    return NextResponse.json({
      characterName,
      description,
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("AI description error:", error);
    
    // Более детальная обработка ошибок
    const errorMessage = error?.message || "Failed to generate AI description";
    const statusCode = errorMessage.includes("API_KEY") ? 500 : 500;
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error?.stack : undefined
      },
      { status: statusCode }
    );
  }
}

