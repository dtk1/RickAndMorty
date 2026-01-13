import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.warn(
    "[AI] GEMINI_API_KEY is not set. AI descriptions will fall back to a static message."
  );
}

// Инициализируем клиент Gemini
const client = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

// Список моделей для попыток (в порядке приоритета)
const AVAILABLE_MODELS = [
  process.env.GEMINI_MODEL, // Пользовательская модель из .env
  "gemini-3-flash-preview", // Новая модель из примера
  "gemini-2.0-flash-exp", // Альтернативная модель
  "gemini-1.5-flash", // Стандартная быстрая модель
  "gemini-1.5-pro", // Pro модель
].filter(Boolean) as string[]; // Убираем undefined значения

export interface CharacterAnalysis {
  description: string;
  analysis: {
    personality: string;
    traits: string[];
    relationships: string;
  };
}

export async function generateCharacterAnalysis(
  characterName: string
): Promise<CharacterAnalysis> {
  // Fallback, если ключ не настроен
  if (!client || !API_KEY) {
    return {
      description: `${characterName} — персонаж из вселенной Rick and Morty. Детальный AI‑анализ недоступен, так как переменная окружения GEMINI_API_KEY не настроена на сервере.`,
      analysis: {
        personality:
          "Анализ личности будет доступен после настройки и активации интеграции с Gemini.",
        traits: ["Curious", "Brave", "Unpredictable"],
        relationships:
          "Анализ отношений с другими персонажами будет доступен после интеграции с реальным AI.",
      },
    };
  }

  // Пробуем каждую модель из списка до тех пор, пока одна не сработает
  const prompt = `Ты — эксперт по вселенной «Rick and Morty».
Сгенерируй глубокое и структурированное описание персонажа «${characterName}» на русском языке.
Структура ответа:
1) Краткое общее описание (2–3 предложения).
2) Ключевые черты характера — в виде маркированного списка.
3) Отношения с другими персонажами (1–3 предложения).
Не упоминай, что ты — ИИ. Пиши в третьем лице.`;

  let lastError: Error | null = null;
  
  for (const modelName of AVAILABLE_MODELS) {
    try {
      console.log(`[AI] Trying model: ${modelName}`);
      
      const interaction = await client.interactions.create({
        model: modelName,
        input: prompt,
      });

      if (!interaction.outputs || interaction.outputs.length === 0) {
        throw new Error("Empty outputs from Gemini API");
      }

      // Получаем последний вывод (как в примере)
      const lastOutput = interaction.outputs[interaction.outputs.length - 1];
      
      // Проверяем разные возможные структуры ответа
      const text = 
        (lastOutput as any)?.text || 
        (lastOutput as any)?.content?.text ||
        (lastOutput as any)?.parts?.[0]?.text ||
        String(lastOutput);

      if (!text || (typeof text === 'string' && text.trim().length === 0)) {
        throw new Error("Empty text in Gemini API response");
      }

      console.log(`[AI] Successfully generated description using model: ${modelName}`);
      
      return {
        description: text.trim(),
        analysis: {
          personality:
            "Подробное описание личности и мотивации содержится в основном AI‑тексте.",
          traits: [],
          relationships:
            "Информация об отношениях с другими персонажами содержится в AI‑описании.",
        },
      };
    } catch (error: any) {
      // Если модель не найдена или недоступна, пробуем следующую
      const errorMessage = error?.message || String(error);
      
      if (
        errorMessage.includes("404") ||
        errorMessage.includes("not found") ||
        errorMessage.includes("not available") ||
        errorMessage.includes("invalid model")
      ) {
        console.warn(`[AI] Model ${modelName} not available, trying next model...`);
        lastError = error;
        continue; // Пробуем следующую модель
      }
      
      // Для других ошибок логируем и пробрасываем
      console.error(`[AI] Error with model ${modelName}:`, error);
      lastError = error;
      continue;
    }
  }

  // Если все модели не сработали, возвращаем fallback
  console.error("[AI] All models failed. Last error:", lastError);
  
  return {
    description: `${characterName} — персонаж из вселенной Rick and Morty.\n\nAI‑описание временно недоступно.\nПробовались модели: ${AVAILABLE_MODELS.join(", ")}\nВсе модели недоступны для вашего API ключа.\nПроверьте документацию Gemini API для списка доступных моделей.`,
    analysis: {
      personality:
        "Анализ личности недоступен из-за ошибки при обращении к сервису AI.",
      traits: [],
      relationships:
        "Информация об отношениях недоступна из-за ошибки при обращении к сервису AI.",
    },
  };
}