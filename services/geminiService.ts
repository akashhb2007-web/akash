import { GoogleGenAI, Type } from "@google/genai";
import { ContentIdea, ContentPlatform } from "../types";

// Helper to get the AI instance. 
// Note: For Veo/Pro Image, we might need to recreate this if the key changes via the selector.
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment.");
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export const generateDailyIdeas = async (niche: string, platform: ContentPlatform): Promise<ContentIdea[]> => {
  const ai = getAIClient();
  
  const prompt = `Generate 3 viral content ideas for a ${niche} creator on ${platform}. 
  Include a title, a short description, estimated engagement score (Low/Medium/High), 
  a short script outline, and 5 relevant hashtags.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              platform: { type: Type.STRING },
              estimatedEngagement: { type: Type.STRING },
              script: { type: Type.STRING },
              hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as ContentIdea[];
  } catch (error) {
    console.error("Error generating ideas:", error);
    throw error;
  }
};

export const generateImage = async (prompt: string, aspectRatio: string = "1:1"): Promise<string> => {
  // Use pro model for better quality as requested by "Visual appealing"
  // This usually requires user selected key if using the preview model
  const ai = getAIClient();

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using flash-image for speed/quota, can swap to gemini-3-pro-image-preview
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
          // imageSize: "1K" // Only for Pro model
        }
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

export const generateVideo = async (prompt: string): Promise<string> => {
  // Using Veo. Requires paid key selection.
  const ai = getAIClient();

  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    // Polling loop
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) throw new Error("Video generation failed or returned no URI");

    // We must append the key to fetch the actual bytes if we were fetching, 
    // but here we likely want to just return the URI to fetch in frontend or display.
    // However, the URI usually needs the key appended to be accessible.
    return `${videoUri}&key=${process.env.API_KEY}`;

  } catch (error) {
    console.error("Error generating video:", error);
    throw error;
  }
};

// Helper to check for trends using Search Grounding
export const analyzeTrends = async (niche: string): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `What are the top 3 trending topics right now specifically for ${niche} on social media? Give a brief analysis of why they are trending.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text || "Unable to fetch trends.";
  } catch (error) {
    console.error("Trend analysis failed", error);
    return "Error analyzing trends.";
  }
};
