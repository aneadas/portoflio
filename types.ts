export interface MatchHistoryItem {
  id: string;
  map: string;
  score: string;
  result: 'WIN' | 'LOSS';
  kri: string; // Kills per Round Impact
  kills: number;
  deaths: number;
  date: string;
}

export interface PlayerStats {
  elo: number;
  matchesPlayed: number;
  winRate: number;
  kda: string;
  headshotPercentage: number;
  adr: number; // Average Damage per Round
  recentMatches?: string; // e.g. "WWLLW"
  longestWinStreak?: number;
  history: MatchHistoryItem[];
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  placement: string;
  tournament: string;
}

export interface PlayerProfile {
  firstName: string;
  lastName: string;
  nickname: string;
  role: string;
  age: number;
  country: string;
  bio: string;
  avatarUrl?: string; // New field for player avatar
  stats: PlayerStats;
  achievements: Achievement[];
  socials: {
    twitter?: string;
    discord?: string;
    steam?: string;
    faceit?: string;
  };
}

export enum ChatStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}