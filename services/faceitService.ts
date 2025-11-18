import { PlayerProfile, PlayerStats, MatchHistoryItem } from '../types';

// KONFIGURACJA API FACEIT
// Aby pobierać prawdziwe dane:
// 1. Zarejestruj aplikację na https://developers.faceit.com
// 2. Skopiuj "Client Side" lub "Server Side" API Key
// 3. Wklej go poniżej w cudzysłowie.
const FACEIT_API_KEY = ''; 

// CORS Proxy jest wymagane, aby przeglądarka pozwoliła na połączenie z API Faceit
// W środowisku produkcyjnym zalecany jest własny backend proxy.
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const FACEIT_NICKNAME = 'o----l----o';

// --- FALLBACK DATA (Używane gdy brak klucza API lub błąd połączenia) ---
const MOCK_PROFILE: PlayerProfile = {
  firstName: 'Grzegorz',
  lastName: 'Dziduch',
  nickname: 'zyx', // Display nickname requested by user
  role: 'Rifler / Entry',
  age: 21,
  country: 'Szczecin, PL',
  bio: 'Młody, ambitny zawodnik ze Szczecina z wysokim sufitem umiejętności. Cechuję się niesamowitą precyzją oraz wysokim współczynnikiem impactu. Poszukuję drużyny, która pozwoli mi przenieść moje umiejętności na poziom turniejowy.',
  stats: {
    elo: 2017,
    matchesPlayed: 77,
    winRate: 75,
    kda: '1.26',
    headshotPercentage: 64,
    adr: 84.2,
    recentMatches: 'WWWWWWWWWPWWWPWPPPWW',
    longestWinStreak: 11,
    history: [
      { id: '1', map: 'Mirage', score: '13 - 5', result: 'WIN', kri: '1.42', kills: 24, deaths: 12, date: '2 godz. temu' },
      { id: '2', map: 'Anubis', score: '13 - 11', result: 'WIN', kri: '1.15', kills: 19, deaths: 18, date: '5 godz. temu' },
      { id: '3', map: 'Ancient', score: '13 - 2', result: 'WIN', kri: '2.10', kills: 18, deaths: 4, date: '1 dzień temu' },
      { id: '4', map: 'Vertigo', score: '9 - 13', result: 'LOSS', kri: '0.85', kills: 14, deaths: 19, date: '1 dzień temu' },
      { id: '5', map: 'Nuke', score: '13 - 8', result: 'WIN', kri: '1.33', kills: 22, deaths: 15, date: '2 dni temu' },
    ]
  },
  achievements: [],
  socials: {
    discord: 'gkl_tiktok_38120',
    steam: 'steamcommunity.com/id/zyx',
    faceit: 'https://www.faceit.com/pl/players/o----l----o/stats/cs2'
  }
};

// --- REAL API FETCHING LOGIC ---

const fetchWithAuth = async (url: string) => {
  if (!FACEIT_API_KEY) throw new Error("No API Key");
  
  // Encode URL for Proxy
  const targetUrl = encodeURIComponent(url);
  const finalUrl = `${CORS_PROXY}${targetUrl}`;

  const response = await fetch(finalUrl, {
    headers: {
      'Authorization': `Bearer ${FACEIT_API_KEY}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response.json();
};

export const fetchPlayerData = async (): Promise<PlayerProfile> => {
  // If no key is provided, return mock data immediately
  if (!FACEIT_API_KEY) {
    console.warn("Brak klucza API Faceit. Używam danych przykładowych.");
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate loading
    return MOCK_PROFILE;
  }

  try {
    // 1. Get Player Details (ELO, ID)
    const playerDetails = await fetchWithAuth(`https://open.faceit.com/data/v4/players?nickname=${FACEIT_NICKNAME}`);
    const playerId = playerDetails.player_id;

    // 2. Get Lifetime Stats (Winrate, KD, HS)
    const playerStats = await fetchWithAuth(`https://open.faceit.com/data/v4/players/${playerId}/stats/cs2`);

    // 3. Get Match History (Recent games)
    const historyData = await fetchWithAuth(`https://open.faceit.com/data/v4/players/${playerId}/history?game=cs2&offset=0&limit=20`);

    // 4. Map Data to our Interface
    const mappedStats: PlayerStats = {
      elo: playerDetails.games.cs2.faceit_elo,
      matchesPlayed: parseInt(playerStats.lifetime.Matches) || 0,
      winRate: parseInt(playerStats.lifetime['Win Rate %']) || 0,
      kda: playerStats.lifetime['Average K/R Ratio'] || '0.00',
      headshotPercentage: parseInt(playerStats.lifetime['Average Headshots %']) || 0,
      adr: 0, // Faceit API doesn't always provide global ADR in simple stats, defaulting
      longestWinStreak: parseInt(playerStats.lifetime['Longest Win Streak']) || 0,
      recentMatches: playerStats.lifetime['Recent Results'] ? playerStats.lifetime['Recent Results'].join('') : '',
      history: historyData.items.map((match: any) => {
        // Helper to find stats in the complex history object if available, 
        // Note: History endpoint has limited stats. Detailed stats require per-match fetch.
        // We will approximate or parse what is available.
        const isWinner = match.results.winner === match.teams.faction1.faction_id && match.teams.faction1.roster.some((p:any) => p.player_id === playerId) 
                      || match.results.winner === match.teams.faction2.faction_id && match.teams.faction2.roster.some((p:any) => p.player_id === playerId);
        
        return {
          id: match.match_id,
          map: (match.teams.faction1.nickname === 'Map' ? match.teams.faction1.avatar : 'Map') || 'CS2 Map', // Usually map is in voting or derived
          score: match.results.score?.cs2 || 'N/A',
          result: isWinner ? 'WIN' : 'LOSS',
          kri: '-', // History V4 doesn't give individual KRI without extra calls
          kills: 0, // Placeholder as V4 history summary doesn't have K/D
          deaths: 0,
          date: new Date(match.started_at * 1000).toLocaleDateString('pl-PL')
        };
      })
    };

    // For detailed map/score history, we would ideally fetch /matches/{id}/stats for the last 5 games.
    // For this demo, to keep it fast, we return the mapped structure. 
    // If you add a key, the ELO/WR/KD will be 100% real.
    
    return {
      ...MOCK_PROFILE,
      stats: {
        ...mappedStats,
        // Merge history with mock data structure if API data is missing details (like specific kills per match in summary)
        history: mappedStats.history.length > 0 ? mappedStats.history : MOCK_PROFILE.stats.history 
      }
    };

  } catch (error) {
    console.error("Failed to fetch real Faceit data:", error);
    return MOCK_PROFILE;
  }
};