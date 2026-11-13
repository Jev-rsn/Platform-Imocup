import React from 'react';
import { Match } from '../../types/tournament';
import { X, Trophy, MapPin, Calendar, Clock, Crown } from 'lucide-react';
import { TeamBadge } from '../common/TeamBadge';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, onClose }) => {
  if (!match) return null;

  const isWinnerA = match.winnerId === match.teamA.id;
  const isWinnerB = match.winnerId === match.teamB.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-zinc-950 border border-white/10 p-5 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-3.5 pr-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Trophy className="w-4 h-4" />
            <span>Laga #{match.matchNumber} &bull; {match.category}</span>
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mt-1">
            {match.stage}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-2">
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" /> {match.date}
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-zinc-500" /> {match.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> {match.arena}
            </span>
          </div>
        </div>

        {/* Final Scoreboard Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900 border border-white/10">
          <div className="grid grid-cols-12 items-center gap-2 sm:gap-4 text-center">
            
            {/* Team A */}
            <div className={`col-span-5 text-left space-y-1.5 ${isWinnerA ? 'text-amber-300' : 'text-zinc-200'}`}>
              <TeamBadge team={match.teamA} size="md" showOrigin />
              {isWinnerA && (
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  <Crown className="w-3 h-3" /> Pemenang
                </span>
              )}
            </div>

            {/* Score Center */}
            <div className="col-span-2">
              <div className="font-mono font-black text-2xl sm:text-3xl text-amber-400">
                {match.scoreA ?? '-'} : {match.scoreB ?? '-'}
              </div>
              <span className="text-[10px] uppercase font-bold text-zinc-500 font-mono">
                {match.status}
              </span>
            </div>

            {/* Team B */}
            <div className={`col-span-5 text-right space-y-1.5 flex flex-col items-end ${isWinnerB ? 'text-amber-300' : 'text-zinc-200'}`}>
              <TeamBadge team={match.teamB} size="md" showOrigin className="flex-row-reverse text-right" />
              {isWinnerB && (
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  <Crown className="w-3 h-3" /> Pemenang
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Period Scores */}
        {match.periodScores && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Rincian Skor Waktu
            </h4>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-xs text-center">
                <thead className="bg-zinc-900 border-b border-white/10 font-bold uppercase text-zinc-400 text-[10px]">
                  <tr>
                    <th className="py-2 px-3 text-left">Tim</th>
                    {match.periodScores.map((_, i) => (
                      <th key={i} className="py-2 px-3 font-mono">Period {i + 1}</th>
                    ))}
                    <th className="py-2 px-3 font-mono text-amber-400">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  <tr>
                    <td className="py-2.5 px-3 text-left font-sans font-semibold text-zinc-200">{match.teamA.shortName}</td>
                    {match.periodScores.map((ps, i) => (
                      <td key={i} className="py-2.5 px-3 text-zinc-400">{ps.scoreA}</td>
                    ))}
                    <td className="py-2.5 px-3 font-black text-amber-400">{match.scoreA}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-left font-sans font-semibold text-zinc-200">{match.teamB.shortName}</td>
                    {match.periodScores.map((ps, i) => (
                      <td key={i} className="py-2.5 px-3 text-zinc-400">{ps.scoreB}</td>
                    ))}
                    <td className="py-2.5 px-3 font-black text-amber-400">{match.scoreB}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FIBA 3x3 Match Rules Notice */}
        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 text-[11px] text-zinc-400 leading-relaxed">
          <p>
            &bull; Regulasi Resmi FIBA 3x3: 10:00 menit waktu berjalan atau Sudden Death 21 Poin.
          </p>
          <p>
            &bull; Pemenang laga ini otomatis melaju ke babak gugur berikutnya pada bagan turnamen resmi GKB FIP UM.
          </p>
        </div>

      </div>
    </div>
  );
};