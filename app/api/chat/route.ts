import { GoogleGenAI } from "@google/genai";
import {
  getPersonalityPrompt,
  isInDeveloperProductivityScope,
  OUT_OF_SCOPE_REPLY,
} from "@/lib/chat";
import { DEFAULT_PERSONALITY, type PersonalityId } from "@/constants/personalities";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message, personality } = (await req.json()) as {
      message?: string;
      personality?: PersonalityId;
    };

    if (!message?.trim()) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    if (!isInDeveloperProductivityScope(message)) {
      return Response.json({ text: OUT_OF_SCOPE_REPLY });
    }

    const systemPrompt = getPersonalityPrompt(personality || DEFAULT_PERSONALITY);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser request:\n${message}` }],
        },
      ],
    });

    return Response.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);

    return Response.json(
      { error: "Failed to generate AI response from Gemini API." },
      { status: 500 }
    );
  }
}
