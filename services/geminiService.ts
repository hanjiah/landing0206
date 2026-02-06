
import { GoogleGenAI, Type } from "@google/genai";
import { LuckyMessageResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateLuckyMessage = async (userName: string, couponTitle: string): Promise<LuckyMessageResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `사용자 '${userName}'가 '${couponTitle}' 쿠폰을 받았습니다. 이 사용자에게 줄 따뜻하고 행운이 가득한 짧은 응원 메시지와 오늘의 행운의 숫자, 그리고 쇼핑 팁을 JSON 형식으로 작성해주세요. 한국어로 작성해주세요.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING, description: "A warm lucky message" },
            luckyNumber: { type: Type.NUMBER, description: "A lucky number between 1 and 99" },
            recommendation: { type: Type.STRING, description: "A short shopping recommendation" },
          },
          required: ["message", "luckyNumber", "recommendation"],
        },
      },
    });

    return JSON.parse(response.text.trim()) as LuckyMessageResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      message: "오늘 하루도 행복 가득한 쇼핑 되세요!",
      luckyNumber: Math.floor(Math.random() * 99) + 1,
      recommendation: "장바구니에 담아둔 물건을 확인해보세요!",
    };
  }
};
