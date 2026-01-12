import { NextRequest, NextResponse } from "next/server";

// Мок-данные для AI описания персонажа
const mockDescriptions: Record<string, string> = {
  "Rick Sanchez": "Гениальный, но циничный ученый с алкогольной зависимостью. Известен своими межгалактическими приключениями и пренебрежением к моральным нормам.",
  "Morty Smith": "Внук Рика, часто попадающий в опасные ситуации. Несмотря на страх, проявляет храбрость и сострадание.",
  "Summer Smith": "Сестра Морти, более уверенная в себе и адаптивная к странностям дедушки.",
  "Beth Smith": "Дочь Рика, ветеринар-хирург. Борется с проблемами самоидентификации.",
  "Jerry Smith": "Зять Рика, часто становится объектом насмешек из-за своей наивности.",
};

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

    // Используем мок-данные или генерируем базовое описание
    const description =
      mockDescriptions[characterName] ||
      `${characterName} - персонаж из мультсериала Rick and Morty. Детальный анализ будет доступен после интеграции с OpenAI/Gemini API.`;

    // Симуляция задержки API
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      characterName,
      description,
      analysis: {
        personality: "Анализ личности будет доступен после интеграции с AI",
        traits: ["Trait 1", "Trait 2", "Trait 3"],
        relationships: "Анализ отношений будет доступен после интеграции с AI",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AI description error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
