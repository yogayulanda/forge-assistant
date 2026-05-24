import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    return Response.json({
      text: response.text,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    return Response.json(
      { error: "Failed to generate AI response." },
      { status: 500 }
    );
  }
}