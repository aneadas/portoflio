import React from 'react';
import { PlayerProfile } from '../types';
import { MessageSquare, Share2, Gamepad2 } from 'lucide-react';

interface ContactProps {
  profile: PlayerProfile;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  return (
    <section className="py-20 bg-[#050505] border-t border-zinc-900 relative overflow-hidden">
       {/* Decorative bg */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Kontakt</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12">
          Jestem aktualnie wolnym agentem. Rozważę poważne oferty.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          
          {profile.socials.discord && (
            <div className="w-full md:w-auto flex items-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-sm font-bold transition-all transform hover:-translate-y-1 cursor-pointer border-b-4 border-[#4752C4] active:border-b-0 active:translate-y-1">
              <MessageSquare className="w-5 h-5" />
              <span>{profile.socials.discord}</span>
            </div>
          )}

          {profile.socials.faceit && (
            <a 
              href={profile.socials.faceit}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto flex items-center gap-3 px-8 py-4 bg-[#ff5500] hover:bg-[#e04b00] text-white rounded-sm font-bold transition-all transform hover:-translate-y-1 border-b-4 border-[#c44100] active:border-b-0 active:translate-y-1"
            >
              <Gamepad2 className="w-5 h-5" />
              FACEIT Profile
            </a>
          )}

          {profile.socials.twitter && (
            <a 
              href="#"
              className="w-full md:w-auto flex items-center gap-3 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-sm font-bold transition-all transform hover:-translate-y-1 border-b-4 border-zinc-900 active:border-b-0 active:translate-y-1"
            >
              <Share2 className="w-5 h-5 text-gray-300" />
              Twitter
            </a>
          )}
        </div>
        
        <footer className="mt-20 pt-8 border-t border-zinc-900 text-zinc-600 text-sm">
          <p>&copy; 2025 zyx portfolio. Designed in Red & Black.</p>
        </footer>
      </div>
    </section>
  );
};