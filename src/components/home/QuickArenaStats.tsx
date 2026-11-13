import React from 'react';
import { useTournament } from '../../context/TournamentContext';
import { TeamBadge } from '../common/TeamBadge';
import { ArrowRight, Clock, MapPin, Ticket, Shield } from 'lucide-react';

interface QuickArenaStatsProps {
  onNavigate: (tab: string) => void;
}

export const QuickArenaStats: React.FC<QuickArenaStatsProps> = ({ onNavigate }) => {
  const { matches, tickets } = useTournament();
  
  const upcomingMatches = matches.filter(m => m.status === 'Akan Datang').slice(0, 3);
  const liveMatches = matches.filter(m => m.status === 'Sedang Berlangsung');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Matches Spotlight */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-rose-500 uppercase">
              Jadwal Arena 3x3
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {liveMatches.length > 0 ? 'Pertandingan Berlangsung' : 'Pertandingan Pembuka Hari 1'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {liveMatches.length > 0 && (
              <button
                onClick={() => onNavigate('live')}
                className="text-xs font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition"
              >
                Scoreboard Live ({liveMatches.length}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => onNavigate('schedule')}
              className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition"
            >
              Lihat Semua 84 Laga <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live or Upcoming Match Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {liveMatches.map((m) => (
            <div 
              key={m.id}
              onClick={() => onNavigate('live')}
              className="cursor-pointer rounded-2xl p-5 bg-zinc-900/90 border border-rose-600/40 hover:border-rose-500 transition shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/60 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-rose-500 pulse-live" />
                  LIVE &bull; {m.currentPeriod || '10:00'}
                </span>
                <span className="text-zinc-400 font-semibold">{m.category}</span>
              </div>

              {/* Matchup & Score */}
              <div className="grid grid-cols-5 items-center gap-2 py-2 text-center">
                <div className="col-span-2 text-left">
                  <TeamBadge team={m.teamA} size="sm" showOrigin />
                </div>
                <div className="col-span-1 py-1 px-2 rounded-lg bg-zinc-950 border border-white/10 font-mono font-black text-lg text-amber-400">
                  {m.scoreA} : {m.scoreB}
                </div>
                <div className="col-span-2 text-right">
                  <TeamBadge team={m.teamB} size="sm" showOrigin className="flex-row-reverse text-right" />
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {m.arena.split('(')[0]}
                </span>
                <span className="font-semibold text-rose-400">Masuk Court &rarr;</span>
              </div>
            </div>
          ))}

          {upcomingMatches.map((m) => (
            <div 
              key={m.id}
              onClick={() => onNavigate('schedule')}
              className="cursor-pointer rounded-2xl p-5 bg-zinc-900/70 border border-white/10 hover:border-white/20 transition shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono font-semibold text-[11px]">
                  {m.matchCode && <span className="font-bold text-amber-400">[{m.matchCode}]</span>}
                  <Clock className="w-3 h-3 text-amber-400" /> {m.time}
                </span>
                <span className="text-zinc-400 font-medium">{m.category}</span>
              </div>

              {/* Matchup */}
              <div className="space-y-2 py-1">
                <TeamBadge team={m.teamA} size="sm" showOrigin />
                <div className="text-[10px] uppercase font-mono font-bold text-zinc-500 pl-9">
                  VS
                </div>
                <TeamBadge team={m.teamB} size="sm" showOrigin />
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1 text-[11px] truncate">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  {m.arena.split('(')[0]}
                </span>
                <span className="text-amber-400 font-medium shrink-0">Lihat Match &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Ticket Showcase Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-zinc-900/80 border border-white/10 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-800 text-amber-400 border border-white/10">
              Pemesanan Resmi &bull; QRIS
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Tiket Masuk Colosseum 3x3
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
              Dukung tim sekolah & komunitas favoritmu langsung di GKB FIP Universitas Negeri Malang (UM). 1 tiket untuk 1 hari: Tiket Day 1 (Sabtu, 14 Nov) Rp 15.000 & Tiket Day 2 (Minggu, 15 Nov) Rp 25.000.
            </p>

            <div className="flex flex-wrap gap-4 pt-1 text-xs text-zinc-400">
              {tickets.map(t => (
                <div key={t.id} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>
                    <strong className="text-zinc-200">{t.name}:</strong> Rp {t.price.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-end">
            <button
              onClick={() => onNavigate('tickets')}
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm"
            >
              <Ticket className="w-4 h-4" />
              <span>Beli Tiket QRIS</span>
            </button>
            <button
              onClick={() => onNavigate('my-tickets')}
              className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 hover:text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/5 transition"
            >
              <span>Cek E-Ticket Saya</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};
