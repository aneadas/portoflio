import React from 'react';
import { PlayerProfile } from '../types';
import { Medal, Star, Gamepad2, TrendingUp, Info } from 'lucide-react';

interface AboutProps {
  profile: PlayerProfile;
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  return (
    <section className="py-20 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Bio */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Info className="text-esports-accent w-8 h-8" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Profil Gracza</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-400 text-lg leading-relaxed mb-6 border-l-4 border-zinc-800 pl-4">
                {profile.bio}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-zinc-900/50 rounded-sm border border-zinc-800 hover:border-red-500 transition-colors">
                  <span className="block text-red-500 text-xs uppercase mb-1 font-bold">Wiek</span>
                  <span className="text-xl font-bold text-white">{profile.age} Lat</span>
                </div>
                <div className="p-4 bg-zinc-900/50 rounded-sm border border-zinc-800 hover:border-red-500 transition-colors">
                  <span className="block text-red-500 text-xs uppercase mb-1 font-bold">Rola</span>
                  <span className="text-xl font-bold text-white">{profile.role}</span>
                </div>
                <div className="p-4 bg-zinc-900/50 rounded-sm border border-zinc-800 hover:border-red-500 transition-colors">
                   <span className="block text-red-500 text-xs uppercase mb-1 font-bold">Język</span>
                   <span className="text-xl font-bold text-white">PL / ENG</span>
                </div>
                <div className="p-4 bg-zinc-900/50 rounded-sm border border-zinc-800 hover:border-red-500 transition-colors">
                   <span className="block text-red-500 text-xs uppercase mb-1 font-bold">Poziom</span>
                   <span className="text-xl font-bold text-white">Faceit Lvl 10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
             <div className="flex items-center gap-3 mb-8">
              <Medal className="text-red-500 w-8 h-8" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Osiągnięcia</h2>
            </div>
            
            <div className="space-y-4">
              {profile.achievements.length > 0 ? (
                profile.achievements.map((ach) => (
                  <div key={ach.id} className="group flex items-center gap-4 bg-zinc-900/30 border border-zinc-800 p-4 rounded-sm hover:border-red-500 transition-all hover:bg-zinc-900">
                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-lg group-hover:text-red-400 transition-colors">{ach.placement}</h4>
                      <p className="text-gray-500 text-sm">{ach.tournament}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-zinc-500 font-mono border border-zinc-800 px-2 py-1 rounded">{ach.date}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-zinc-900/20 border border-zinc-800 border-dashed p-8 rounded-sm text-center flex flex-col items-center">
                  <TrendingUp className="w-12 h-12 text-zinc-700 mb-4" />
                  <h4 className="text-gray-300 font-bold text-lg mb-2">Historia Turniejowa</h4>
                  <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                    Aktualnie brak oficjalnych osiągnięć. Zawodnik skupia się na rozwoju w trybie rankingowym.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};