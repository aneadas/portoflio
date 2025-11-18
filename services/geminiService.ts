import { GoogleGenAI } from "@google/genai";
import { PlayerProfile } from '../types';

// Initialize Gemini Client
// The API key is guaranteed to be in process.env.API_KEY per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateScoutReport = async (
  question: string, 
  profile: PlayerProfile
): Promise<string> => {
  try {
    const model = "gemini-2.5-flash";
    
    const systemContext = `
      Jesteś zaawansowanym asystentem analitycznym dla profesjonalnego gracza esports o nicku "${profile.nickname}".
      
      Dane gracza:
      Imię: ${profile.firstName} ${profile.lastName}
      ELO: ${profile.stats.elo} (Bardzo wysoki poziom)
      Rola: ${profile.role}
      Win Rate: ${profile.stats.winRate}%
      K/D: ${profile.stats.kda}
      ADR: ${profile.stats.adr}
      
      Twoim celem jest przekonanie skautów (rekruterów) drużyn esports, że ten gracz jest wartościowym nabytkiem.
      Odpowiadaj na pytania skautów krótko, rzeczowo i profesjonalnie, używając terminologii gamingowej/esportowej.
      Bądź pewny siebie, ale opieraj się na faktach (statystykach). Język: Polski.
      
      Pytanie skauta: "${question}"
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: systemContext,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });

    return response.text || "Nie udało się wygenerować raportu. Spróbuj ponownie.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System analityczny jest chwilowo niedostępny. Proszę sprawdzić statystyki ręcznie.";
  }
};