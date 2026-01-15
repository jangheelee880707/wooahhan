
import { GoogleGenAI } from "@google/genai";
import { BeefCut, MarblingLevel, GenerationConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHanwooImage = async (config: GenerationConfig): Promise<string> => {
  let cutDescription = config.cut;
  let marblingPrompt = "";
  let composition = "Single premium cut, hero shot.";

  // 1. Marbling Logic based on Cut Type
  if (cutDescription.includes('Mungtigi')) {
    // Mungtigi is traditionally lean, dark red, and sticky.
    marblingPrompt = "Deep, dark ruby red colour with a unique gelatinous, sticky sheen. Very lean meat texture emphasizing freshness and density. Minimal visible fat, focusing on the rich red protein.";
  } else {
    // For all other cuts (especially Platter, Sirloin, Sashimi), we want extreme marbling as requested.
    marblingPrompt = "Korean 1++ BMS No.9 (The Absolute Zenith of Marbling). Intricate, heavy snowflake marbling (Seol-hwa) evenly distributed throughout the red meat. The fat is pure white and crystalline, contrasting beautifully with the vibrant ruby-red meat. Looks like it melts in your mouth.";
  }

  // 2. Composition Logic for Sets/Platters
  if (cutDescription.includes('Platter') || cutDescription.includes('Gift Set') || cutDescription.includes('Modem')) {
      composition = "A luxurious, artfully arranged platter featuring multiple premium cuts (Salchi-sal, Kkot-deungsim, Galbi-sal). Perfectly sliced and fanned out to show the cross-section of the intense marbling. A true visual feast of various textures arranged on a large platter.";
  }

  const basePrompt = `High-end commercial food photography for a luxury Michelin-star butcher shop. 
  Subject: Raw ${cutDescription} Hanwoo beef. 
  Marbling Focus: ${marblingPrompt}
  Composition: ${composition}
  Setting: Placed on a premium dark matte slate or handcrafted black ceramic plate, glistening with freshness. 
  Lighting: Dramatic cinematic lighting, soft high-contrast side-lighting to highlight the depth of the meat's grain and the crystalline fat structures. 
  Atmosphere: Ultra-premium, expensive, sophisticated, cold freshness (subtle mist).
  Technical: 8k resolution, highly detailed, photorealistic, macro photography depth of field, Phase One camera quality.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: basePrompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    throw new Error("No image found in AI response");
  } catch (error) {
    console.error("AI Image Generation Error:", error);
    throw error;
  }
};
