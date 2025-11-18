import React from 'react';
import { PlayerProfile } from '../types';
import { Trophy, Target, Zap, MapPin } from 'lucide-react';

interface HeroProps {
  profile: PlayerProfile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-black">
      {/* Background abstract elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-[0.08] z-0 grayscale"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/90 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/10 to-transparent z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-20 flex flex-col md:flex-row items-center justify-between">
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-red-400 text-xs font-bold tracking-wider uppercase">LFT / Open to Offers</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm text-gray-400 text-xs uppercase tracking-wider">
              <MapPin size={12} /> {profile.country}
            </div>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-display font-bold text-white mb-2 tracking-tighter leading-none">
            {profile.nickname}
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-500 font-light mb-8 uppercase tracking-widest">
            {profile.firstName} <span className="text-esports-accent font-bold">{profile.lastName}</span>
          </h2>
          
          <p className="max-w-lg text-gray-400 mb-8 leading-relaxed text-lg border-l-2 border-esports-accent pl-6">
            Profesjonalny zawodnik specjalizujący się w roli <span className="text-white font-semibold">{profile.role}</span>. 
            Dominacja na serwerze i wysoka skuteczność ({profile.stats.winRate}% WR).
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="glass-panel px-6 py-4 rounded-sm flex items-center gap-3 hover:border-red-500 transition-colors group">
              <Trophy className="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider group-hover:text-red-400">ELO</p>
                <p className="text-2xl font-display font-bold text-white">{profile.stats.elo}</p>
              </div>
            </div>
            <div className="glass-panel px-6 py-4 rounded-sm flex items-center gap-3 hover:border-red-500 transition-colors group">
              <Target className="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider group-hover:text-red-400">HS %</p>
                <p className="text-2xl font-display font-bold text-white">{profile.stats.headshotPercentage}%</p>
              </div>
            </div>
             <div className="glass-panel px-6 py-4 rounded-sm flex items-center gap-3 hover:border-red-500 transition-colors group">
              <Zap className="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider group-hover:text-red-400">K/R</p>
                <p className="text-2xl font-display font-bold text-white">{profile.stats.kda}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 mt-12 md:mt-0 flex justify-center relative">
          <div className="relative w-64 h-64 md:w-96 md:h-96 group">
            {/* Rotating Rings */}
            <div className="absolute inset-0 border border-red-600/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute -inset-4 border border-dashed border-red-600/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            
            <img 
              src={profile.avatarUrl || "https://picsum.photos/500/500?grayscale"} 
              alt={profile.nickname}
              className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full border-2 border-red-500/50 group-hover:border-red-500 transition-colors shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            />
            
            {/* Decorative Badge */}
            {profile.stats.longestWinStreak && profile.stats.longestWinStreak > 5 && (
              <div className="absolute bottom-0 -right-4 bg-black border border-red-600 p-4 rounded-sm shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                  <p className="text-xs text-gray-400 text-center uppercase tracking-wider">Win Streak</p>
                  <p className="text-2xl font-display font-bold text-white text-center text-red-500 drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]">{profile.stats.longestWinStreak} W</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};