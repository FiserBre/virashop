import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from '../constants';
import { Product } from '../types';

export const suggestOutfit = async (userPrompt: string): Promise<string[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Prepare inventory for the model to choose from
    const inventory = PRODUCTS.map(p => ({
      id: p.id,
      name: p.name,
      type: p.type,
      category: p.category,
      description: p.description
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Jako módní stylista vyber nejlepší outfit z dostupného inventáře pro tuto příležitost: "${userPrompt}". 
      Inventář: ${JSON.stringify(inventory)}. 
      Vyber maximálně jeden produkt od každého typu (headwear, top, bottom, shoes).
      Snaž se vybrat kompletní outfit (alespoň top, bottom a shoes).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            selectedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of product IDs selected for the outfit"
            },
            reasoning: {
              type: Type.STRING,
              description: "Short explanation of why this outfit fits the occasion (in Czech)"
            }
          },
          required: ["selectedProductIds", "reasoning"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result.selectedProductIds || [];
  } catch (error) {
    console.error("Error getting outfit suggestion:", error);
    return [];
  }
};