import React from 'react';
import { Match } from '../../types/tournament';
import { TeamBadge } from '../common/TeamBadge';
import { Clock, MapPin, Trophy, Flame, AlertCircle } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onSelectLive?: (matchId: string) => void;
  onSelectDetail?: (match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onSelectLive, onSelectDetail }) => {
  const isLive = match.status === 'Sedang Berlangsung';
  const isFinished = match.status === 'Selesai';
  const isWinnerA = isFinished && match.winnerId === match.teamA.id;
  const isWinnerB = isFinished && match.winnerId === match.teamB.id;

  return (
    <div className={`rounded-2xl p-5 transition-all bg-zinc-900/80 border ${
      isLive ? 'border-rose-600/50 shadow-md' : 'border-white/10 hover:border-white/20 shadow-xs'
    }`}>
      
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          {match.matchCode && (
            <span className="font-mono font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs tracking-wider">
              {match.matchCode}
            </span>
          )}
          <span className="font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-white/5 text-[11px] uppercase tracking-wider">
            {match.category}
          </span>
          <span className="text-zinc-600">&bull;</span>
          <span className="text-zinc-300 font-medium text-xs">
            {match.stage}
          </span>
          {match.duration && (
            <>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-zinc-400 font-mono text-[11px] bg-zinc-950 px-1.5 py-0.5 rounded">
                Durasi {match.duration}
              </span>
            </>
          )}
        </div>

        <div>
          {isLive && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950 text-white font-bold tracking-wider border border-rose-600/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 pulse-live" />
              LIVE {match.currentPeriod || '10:00'}
            </span>
          )}
          {isFinished && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/10 text-xs font-semibold">
              <Trophy className="w-3 h-3 text-amber-400" /> Selesai
            </span>
          )}
          {!isLive && !isFinished && match.isStartingSoon && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 font-bold text-xs">
              <AlertCircle className="w-3 h-3 text-amber-400" /> Laga Pembuka
            </span>
          )}
          {!isLive && !isFinished && !match.isStartingSoon && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-zinc-800 text-zinc-200 font-mono text-xs border border-white/5">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> {match.time}
            </span>
          )}
        </div>
      </div>

      {/* Main Matchup Arena */}
      <div className="py-4 grid grid-cols-12 items-center gap-2 sm:gap-4">
        
        {/* Team A */}
        <div className="col-span-5">
          <TeamBadge team={match.teamA} size="md" showOrigin />
        </div>

        {/* Center Score / VS */}
        <div className="col-span-2 text-center">
          {isLive || isFinished ? (
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950 border border-white/10 font-mono font-black text-lg sm:text-xl text-amber-400">
              <span className={isWinnerA ? 'text-amber-400 font-black' : 'text-zinc-300'}>{match.scoreA}</span>
              <span className="text-zinc-600 text-sm">:</span>
              <span className={isWinnerB ? 'text-amber-400 font-black' : 'text-zinc-300'}>{match.scoreB}</span>
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-zinc-400">
              VS
            </div>
          )}
        </div>

        {/* Team B */}
        <div className="col-span-5 flex justify-end">
          <TeamBadge team={match.teamB} size="md" showOrigin className="flex-row-reverse text-right" />
        </div>

      </div>

      {/* Footer Info & Actions */}
      <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-zinc-400">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            {match.arena}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-mono">
            <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            {match.date} &bull; {match.time}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isLive && onSelectLive && (
            <button
              onClick={() => onSelectLive(match.id)}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Scoreboard Live</span>
            </button>
          )}

          {isFinished && onSelectDetail && (
            <button
              onClick={() => onSelectDetail(match)}
              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs flex items-center gap-1 border border-white/10 transition"
            >
              <span>Statistik Match</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
