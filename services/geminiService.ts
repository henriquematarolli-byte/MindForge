
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PRODUCT_DESCRIPTION_CONTEXT } from "../constants";
import { ChatMessage, GeolocationPosition } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function runChat(prompt: string, location: GeolocationPosition | null): Promise<ChatMessage> {
  try {
    const model = 'gemini-2.5-flash';

    const toolConfig: any = {};
    if (location) {
        toolConfig.retrievalConfig = {
            latLng: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }
        };
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: {
            role: 'user',
            parts: [{ text: prompt }]
        },
        config: {
            systemInstruction: PRODUCT_DESCRIPTION_CONTEXT,
            tools: [{ googleMaps: {} }],
        },
        toolConfig: Object.keys(toolConfig).length > 0 ? toolConfig : undefined,
    });
    
    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return {
      role: 'model',
      text: text,
      groundingChunks: groundingChunks || [],
    };
  } catch (error) {
    console.error("Error running chat with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
}
