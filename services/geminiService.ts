import { PlayerProfile } from '../types';

// Service disabled as requested. 
// Removed process.env usage to prevent runtime crashes in browser environments.

export const generateScoutReport = async (
  question: string, 
  profile: PlayerProfile
): Promise<string> => {
  return "AI Scout Assistant is currently disabled.";
};