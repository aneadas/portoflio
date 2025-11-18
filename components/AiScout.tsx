import React, { useState } from 'react';
import { PlayerProfile, ChatStatus } from '../types';
import { generateScoutReport } from '../services/geminiService';
import { Bot, Send, Loader2, ChevronRight } from 'lucide-react';

interface AiScoutProps {
  profile: PlayerProfile;
}

export const AiScout: React.FC<AiScoutProps> = ({ profile }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.IDLE);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus(ChatStatus.LOADING);
    const result = await generateScoutReport(query, profile);
    setResponse(result);
    setStatus(ChatStatus.SUCCESS);
  };

  const predefinedQuestions = [
    "Jakie są jego mocne strony?",
    "Jak radzi sobie pod presją (clutch)?",
    "Czy pasuje do agresywnego stylu gry?"
  ];

  return (
    <section className="py-20 relative overflow-hidden">
       {/* Gradient glow behind */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-esports-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-full mb-4 ring-1 ring-white/10">
              <Bot className="w-8 h-8 text-esports-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">AI Scout Assistant</h2>
            <p className="text-gray-400">
              Wykorzystaj moc Gemini AI, aby wygenerować szybki raport skautingowy na temat gracza {profile.nickname}.
              Zadaj pytanie lub wybierz z listy.
            </p>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/30">
            <div className="p-6 md:p-8 bg-slate-900/80 min-h-[200px] flex flex-col justify-center items-center text-center">
              
              {status === ChatStatus.IDLE && (
                <div className="text-gray-500 italic">
                  "Czekam na Twoje zapytanie dotyczące zawodnika..."
                </div>
              )}

              {status === ChatStatus.LOADING && (
                <div className="flex flex-col items-center gap-3 animate-pulse">
                  <Loader2 className="w-8 h-8 text-esports-accent animate-spin" />
                  <span className="text-sm text-esports-accent font-medium">Analizuję statystyki i generuję raport...</span>
                </div>
              )}

              {status === ChatStatus.SUCCESS && response && (
                <div className="text-left w-full animate-[fadeIn_0.5s_ease-out]">
                   <div className="bg-indigo-500/10 border-l-4 border-esports-accent p-4 rounded-r-lg">
                      <h4 className="text-esports-accent font-bold text-sm mb-2 uppercase tracking-wider flex items-center gap-2">
                        <Bot size={16} /> Raport Gemini
                      </h4>
                      <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                        {response}
                      </p>
                   </div>
                </div>
              )}
              
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800">
              
              {/* Predefined chips */}
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {predefinedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setQuery(q); }}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-gray-300 px-3 py-1.5 rounded-full transition-colors border border-slate-700 flex items-center gap-1"
                  >
                    {q} <ChevronRight size={12} />
                  </button>
                ))}
              </div>

              <form onSubmit={handleAsk} className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Zapytaj o styl gry, potencjał, statystyki..."
                  className="w-full bg-slate-900 text-white pl-4 pr-12 py-4 rounded-xl border border-slate-700 focus:border-esports-accent focus:ring-1 focus:ring-esports-accent outline-none transition-all placeholder-gray-600"
                />
                <button 
                  type="submit"
                  disabled={status === ChatStatus.LOADING || !query.trim()}
                  className="absolute right-2 p-2 bg-esports-accent hover:bg-indigo-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};