import React from 'react';
import { PlayerProfile } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Crosshair, TrendingUp, Shield, Activity, Flame } from 'lucide-react';

interface StatsSectionProps {
  profile: PlayerProfile;
}

const data = [
  { name: 'Jan', elo: 1850 },
  { name: 'Feb', elo: 1890 },
  { name: 'Mar', elo: 1880 },
  { name: 'Apr', elo: 1950 },
  { name: 'May', elo: 1920 },
  { name: 'Jun', elo: 2017 },
];

export const StatsSection: React.FC<StatsSectionProps> = ({ profile }) => {
  const renderRecentMatches = (matches?: string) => {
    if (!matches) return null;
    return matches.split('').map((result, index) => (
      <div 
        key={index}
        className={`w-2 h-8 rounded-sm ${
          result === 'W' ? 'bg-green-500' : 'bg-red-600'
        } hover:scale-125 transition-transform cursor-help shadow-sm`}
        title={result === 'W' ? 'Win' : 'Loss'}
      />
    ));
  };

  return (
    <section className="py-20 bg-zinc-950 relative">
      {/* Red ambient background light */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-12 border-b border-white/5 pb-6">
          <Activity className="text-esports-accent w-8 h-8" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Analityka Gry</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Graph */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-sm flex flex-col relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-esports-accent" />
                Progresja ELO (2024)
              </h3>
              <span className="text-red-400 font-mono text-sm border border-red-500/20 bg-red-500/5 px-2 py-1 rounded">+167 pkt</span>
            </div>
            <div className="h-[250px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorElo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b5563" fontSize={12} domain={['dataMin - 50', 'dataMax + 50']} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#ef4444' }}
                    cursor={{ stroke: '#dc2626', strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="elo" stroke="#dc2626" fillOpacity={1} fill="url(#colorElo)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* Recent Results Bar */}
            {profile.stats.recentMatches && (
              <div className="mt-auto border-t border-zinc-800 pt-4">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-gray-500 text-xs uppercase tracking-wider">Ostatnie 20 meczy</span>
                   <span className="text-gray-500 text-xs uppercase tracking-wider">Win Rate: <span className="text-white">{profile.stats.winRate}%</span></span>
                </div>
                <div className="flex gap-1 items-center justify-between overflow-x-auto pb-2">
                   {renderRecentMatches(profile.stats.recentMatches)}
                </div>
              </div>
            )}
          </div>

          {/* Detail Cards */}
          <div className="grid grid-cols-1 gap-4">
            
            <div className="bg-black p-6 rounded-sm border border-zinc-800 hover:border-esports-accent transition-colors group relative overflow-hidden">
              <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-red-900/10 to-transparent pointer-events-none"></div>
              <div className="flex items-start justify-between mb-2 relative z-10">
                <div>
                  <p className="text-gray-500 text-sm uppercase tracking-wider group-hover:text-red-500 transition-colors">Avg K/R Ratio</p>
                  <p className="text-4xl font-display font-bold text-white mt-1">{profile.stats.kda}</p>
                </div>
                <Crosshair className="w-6 h-6 text-red-600" />
              </div>
              <div className="w-full bg-zinc-900 h-1 rounded-full mt-4">
                <div className="bg-red-600 h-1 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]" style={{ width: '90%' }}></div>
              </div>
            </div>

             <div className="bg-black p-6 rounded-sm border border-zinc-800 hover:border-esports-accent transition-colors group">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-gray-500 text-sm uppercase tracking-wider group-hover:text-red-500 transition-colors">Matches Played</p>
                  <p className="text-4xl font-display font-bold text-white mt-1">{profile.stats.matchesPlayed}</p>
                </div>
                <Shield className="w-6 h-6 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
               <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded bg-zinc-900 text-gray-400 border border-zinc-800 font-mono">
                  HIGH ACTIVITY
                </span>
               </div>
            </div>

            <div className="bg-gradient-to-br from-red-950 to-black p-6 rounded-sm border border-red-900/50 hover:border-red-500 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-red-200 text-sm uppercase tracking-wider">Win Streak</p>
                  <p className="text-4xl font-display font-bold text-white mt-1 drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]">{profile.stats.longestWinStreak}</p>
                </div>
                <Flame className="w-6 h-6 text-red-500 animate-pulse-slow" />
              </div>
              <p className="text-sm text-red-400/60 mt-1">Dominacja</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};