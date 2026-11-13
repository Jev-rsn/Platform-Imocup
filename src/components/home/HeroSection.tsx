import React from 'react';
import { APP_ASSETS } from '../../config/eventConfig';
import { useTournament } from '../../context/TournamentContext';
import { Calendar, Trophy, Ticket, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { matches } = useTournament();
  const liveMatch = matches.find(m => m.status === 'Sedang Berlangsung');

  return (
    <div className="relative overflow-hidden bg-zinc-950 border-b border-white/10">
      
      {/* Subtle athletic texture background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 grayscale pointer-events-none"
        style={{ backgroundImage: `url('${APP_ASSETS.BACKGROUND}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/90 to-zinc-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 sm:pt-16 sm:pb-20">
        
        {/* Top Status Bar: Official sanctioned event with UM */}
        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
          {liveMatch ? (
            <button 
              onClick={() => onNavigate('live')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-950/80 border border-rose-700/60 text-white text-xs font-semibold hover:bg-rose-900 transition"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 pulse-live shrink-0" />
              <span className="font-bold uppercase tracking-wider text-rose-300">LIVE:</span>
              <span className="text-zinc-200 truncate max-w-[200px] sm:max-w-none">
                {liveMatch.teamA.shortName} vs {liveMatch.teamB.shortName} ({liveMatch.scoreA} - {liveMatch.scoreB})
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-300 shrink-0" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span>Turnamen Resmi FIBA 3x3 &bull; 14 &ndash; 15 Nov 2026</span>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-xs text-zinc-400">
            <span className="text-zinc-400">Venue:</span>
            <span className="text-amber-300 font-bold">GKB FIP UM</span>
            <span className="text-zinc-600">&bull;</span>
            <div className="flex items-center gap-1.5">
              <img src={APP_ASSETS.LOGO_IMOCUP} alt="IMOCUP" className="w-4 h-4 object-contain" />
              <img src={APP_ASSETS.LOGO_UM} alt="UM" className="w-4 h-4 object-contain" />
            </div>
            <span className="text-zinc-200 font-medium hidden sm:inline">Universitas Negeri Malang</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Title & Action Area */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            <div className="space-y-1">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-rose-500">
                Battle of Colosseum 2026 &bull; GKB FIP UM
              </p>
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[0.95]">
                IMONOKE <br />
                <span className="text-amber-400">CUP 3X3</span>
              </h1>
            </div>

            <p className="text-xs sm:text-base text-zinc-300 max-w-xl leading-relaxed">
              Kejuaraan bola basket 3x3 resmi Jawa Timur bertempat di <strong className="text-white">GKB FIP Universitas Negeri Malang</strong>. Mempertemukan <strong className="text-white">84 Tim</strong> dalam sistem gugur &mdash; 10 menit waktu berjalan atau menembus <strong className="text-amber-300">21 Poin Sudden Death</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              <button
                onClick={() => onNavigate('schedule')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Jadwal 84 Match</span>
              </button>

              <button
                onClick={() => onNavigate('results')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 transition"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Bagan Pertandingan</span>
              </button>

              <button
                onClick={() => onNavigate('tickets')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-500/30 transition"
              >
                <Ticket className="w-4 h-4 text-amber-400" />
                <span>Pesan Tiket (14 & 15 Nov)</span>
              </button>
            </div>

            {/* Tournament Metrics Strip */}
            <div className="pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-white/10 max-w-lg">
              <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-white/5 sm:border-0 sm:bg-transparent sm:p-0">
                <p className="font-mono text-xl sm:text-2xl font-bold text-white">84</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Total Tim</p>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-white/5 sm:border-0 sm:bg-transparent sm:p-0">
                <p className="font-mono text-xl sm:text-2xl font-bold text-amber-400">3</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Kategori</p>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-white/5 sm:border-0 sm:bg-transparent sm:p-0">
                <p className="font-mono text-xl sm:text-2xl font-bold text-rose-400">21</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Target Poin</p>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-white/5 sm:border-0 sm:bg-transparent sm:p-0">
                <p className="font-mono text-xl sm:text-2xl font-bold text-zinc-300">12s</p>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Shot Clock</p>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Tournament Bracket Categories & FIBA Rules */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl p-6 bg-zinc-900/80 border border-white/10 space-y-5 shadow-xl">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-bold text-sm text-white uppercase tracking-wider">
                      Distribusi Bagan Resmi
                    </h3>
                    <p className="text-[11px] text-zinc-400">Sesuai Bagan Pengesahan Panitia</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/10">
                  SINGLE ELIM
                </span>
              </div>

              {/* Category Breakdown */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-100">SMA Putra (Boys)</h4>
                    <p className="text-[11px] text-zinc-400">Taruna Nusantara, SMAN 1 Malang, Kosayu, Dempo, dll.</p>
                  </div>
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-amber-400">
                    44 Tim
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-100">SMA Putri (Girls)</h4>
                    <p className="text-[11px] text-zinc-400">SMAN 1 Lawang, SMAN 8 Malang, Turen, Frateran, dll.</p>
                  </div>
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-rose-400">
                    24 Tim
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-100">Kategori Umum</h4>
                    <p className="text-[11px] text-zinc-400">Tahu Tek, Apex, Kecap Kecup, Red Flag, UM Warriors, dll.</p>
                  </div>
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-zinc-200">
                    16 Tim
                  </span>
                </div>
              </div>

              {/* Clean Rules Summary */}
              <div className="pt-2 text-[11px] text-zinc-400 border-t border-white/10 space-y-1.5 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-zinc-300">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Regulasi Resmi FIBA 3x3 Colosseum</span>
                </div>
                <p>
                  &bull; 1 Poin di dalam busur &bull; 2 Poin di luar busur. <br />
                  &bull; Tim pertama mencetak <strong>21 Poin</strong> langsung menang (Sudden Death). <br />
                  &bull; Foul ke-7 s/d 9 bernilai 2 Free Throw; Foul 10+ mendapat 2 FT + Penguasaan Bola.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
