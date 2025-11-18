import React from 'react';
import { PlayerProfile } from './types';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { About } from './components/About';
import { Contact } from './components/Contact';

function App() {
  // Static data profile - no fetching required
  const playerProfile: PlayerProfile = {
    firstName: 'Grzegorz',
    lastName: 'Dziduch',
    nickname: 'zyx',
    role: 'Rifler / Entry',
    age: 21,
    country: 'Szczecin, PL',
    bio: 'Młody, ambitny zawodnik ze Szczecina z wysokim sufitem umiejętności. Cechuję się niesamowitą precyzją oraz wysokim współczynnikiem impactu. Poszukuję drużyny, która pozwoli mi przenieść moje umiejętności na poziom turniejowy.',
    // POPRAWIONY LINK: Używamy bezpośredniego linku do obrazka (i.imgur.com) zamiast galerii
    avatarUrl: 'https://i.imgur.com/xZQVhLI.jpeg',
    stats: {
      elo: 2017,
      matchesPlayed: 77,
      winRate: 75,
      kda: '1.26',
      headshotPercentage: 64,
      adr: 84.2,
      recentMatches: 'WWWWWWWWWPWWWPWPPPWW',
      longestWinStreak: 11,
      history: [] // Detailed history table removed
    },
    achievements: [],
    socials: {
      discord: 'gkl_tiktok_38120',
      faceit: 'https://www.faceit.com/pl/players/o----l----o/stats/cs2'
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-esports-accent selection:text-white">
      
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-display font-bold tracking-tighter text-white group cursor-pointer">
            ZYX<span className="text-esports-accent group-hover:text-white transition-colors">.gg</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors hover:underline decoration-esports-accent underline-offset-4">Start</a>
            <a href="#" className="hover:text-white transition-colors hover:underline decoration-esports-accent underline-offset-4">Statystyki</a>
            <a href="#" className="hover:text-white transition-colors hover:underline decoration-esports-accent underline-offset-4">O Mnie</a>
            <a href="#" className="px-4 py-2 bg-esports-accent text-white rounded font-bold hover:bg-red-700 transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]">
              Pobierz Config
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <Hero profile={playerProfile} />
        <StatsSection profile={playerProfile} />
        <About profile={playerProfile} />
        <Contact profile={playerProfile} />
      </main>
    </div>
  );
}

export default App;