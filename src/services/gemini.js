import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDJFaUF2ryOk7PLTCfCSFmYdAxmsBMSrE8";
const PRIMARY_MODEL = "gemini-1.5-flash";
const FALLBACK_MODEL = "gemini-1.5-flash-8b"; // lighter model in case of overload

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateWithModel(modelName, prompt) {
  const model = genAI.getGenerativeModel({ model: modelName });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = typeof response.text === "function" ? response.text() : "";
  return (text || "").trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function askGemini(prompt) {
  const systemPreamble = `You are HealthBot, an AI health assistant embedded in a patient-facing app.
- Provide clear, compassionate, evidence-informed guidance.
- You are NOT a substitute for professional medical care. Include a brief disclaimer.
- If the user describes emergency symptoms (e.g., chest pain, stroke signs, severe breathing difficulty), instruct them to seek emergency care.
- Prefer actionable next steps, possible causes with likelihood language ("might", "could"), and red-flag advice.
- Keep responses under 250 words when possible.`;

  const fullPrompt = `${systemPreamble}\n\nUser symptoms: ${prompt}`;

  // Retry up to 3 times with exponential backoff; then try fallback model once
  const maxRetries = 3;
  let attempt = 0;
  let lastError = null;

  while (attempt < maxRetries) {
    try {
      return await generateWithModel(PRIMARY_MODEL, fullPrompt);
    } catch (err) {
      lastError = err;
      const message = String(err?.message || "");
      const shouldRetry =
        message.includes("429") ||
        message.includes("503") ||
        message.toLowerCase().includes("overloaded");
      if (!shouldRetry) break;
      const backoff = 400 * Math.pow(2, attempt); // 400ms, 800ms, 1600ms
      await sleep(backoff);
      attempt += 1;
    }
  }

  // Fallback model once
  try {
    return await generateWithModel(FALLBACK_MODEL, fullPrompt);
  } catch (fallbackError) {
    console.error(
      "Gemini API error (fallback failed):",
      fallbackError || lastError
    );
    // Friendly fallback guidance
    return (
      "Based on your description, this could be a self‑limited issue like a common cold. " +
      "Try rest, fluids, and over‑the‑counter symptom relief. If you develop high fever, " +
      "shortness of breath, chest pain, severe dehydration, or symptoms lasting >10 days, " +
      "seek medical care. This information is educational and not a medical diagnosis."
    );
  }
}
