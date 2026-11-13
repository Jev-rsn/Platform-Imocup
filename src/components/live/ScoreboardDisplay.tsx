import React from 'react';
import { Match } from '../../types/tournament';
import { ExternalLink, Radio, Volume2, Target, AlertTriangle } from 'lucide-react';
import { TeamBadge } from '../common/TeamBadge';

interface ScoreboardDisplayProps {
  match: Match;
}

export const ScoreboardDisplay: React.FC<ScoreboardDisplayProps> = ({ match }) => {
  const isNear21A = match.scoreA >= 19;
  const isNear21B = match.scoreB >= 19;

  return (
    <div className="space-y-6">
      
      {/* 3x3 Jumbotron Scoreboard */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl">
        
        {/* Top Arena Header Bar */}
        <div className="bg-zinc-900/90 border-b border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 font-extrabold tracking-wider border border-rose-700/60 text-[10px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 pulse-live" />
              LIVE 3X3
            </span>
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] sm:text-xs">
              {match.category} &bull; {match.stage}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-white/10 text-[10px] font-bold">
              <Target className="w-3 h-3 text-amber-400" /> Target 21 Poin Sudden Death
            </span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400 text-xs">
            <span className="text-[11px] sm:text-xs">{match.arena}</span>
            {match.streamUrl && (
              <a
                href={match.streamUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-bold transition text-xs"
              >
                <Radio className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Live Stream</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Main Arena Score Board */}
        <div className="p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-center">
            
            {/* Team A Display */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
              <div className="flex items-center gap-3">
                <TeamBadge team={match.teamA} size="lg" showOrigin />
              </div>

              {/* Team A 3x3 Foul Counter */}
              <div className="flex items-center gap-2.5 bg-zinc-900 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Team Fouls: </span>
                  <span className="font-mono font-black text-rose-400">{match.foulsA}</span>
                </div>
                {match.foulsA >= 7 && match.foulsA < 10 && (
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">
                    PENALTY (2 FT)
                  </span>
                )}
                {match.foulsA >= 10 && (
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700 animate-pulse">
                    2 FT + BOLA
                  </span>
                )}
              </div>
            </div>

            {/* Center Digit Display */}
            <div className="md:col-span-2 flex flex-col items-center justify-center space-y-2.5 order-first md:order-none">
              
              {/* Quarter & Game Clock */}
              <div className="px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-center">
                <span className="text-[11px] font-mono font-bold tracking-wider text-amber-400 uppercase">
                  {match.timeRemaining || '10:00'}
                </span>
              </div>

              {/* Digit Box */}
              <div className="relative w-full max-w-[220px] py-3 px-4 rounded-2xl bg-zinc-900/90 border border-white/15 shadow-inner flex items-center justify-center gap-4">
                <span className={`text-4xl sm:text-5xl font-mono font-black ${
                  isNear21A ? 'text-amber-300 animate-pulse' : 'text-white'
                }`}>
                  {match.scoreA}
                </span>
                <span className="text-zinc-600 font-mono font-black text-2xl">:</span>
                <span className={`text-4xl sm:text-5xl font-mono font-black ${
                  isNear21B ? 'text-amber-300 animate-pulse' : 'text-white'
                }`}>
                  {match.scoreB}
                </span>
              </div>

              {/* 12-Second Shot Clock Box for 3x3 */}
              <div className="flex items-center gap-1.5 bg-rose-950/80 border border-rose-700/60 px-3 py-1 rounded-xl font-mono">
                <span className="text-[10px] uppercase font-bold text-rose-300">SHOT CLOCK:</span>
                <span className="text-sm font-black text-white">
                  {match.shotClock ?? 12}s
                </span>
              </div>

              {(isNear21A || isNear21B) && (
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> MATCH POINT (FIRST TO 21)
                </div>
              )}
            </div>

            {/* Team B Display */}
            <div className="md:col-span-5 flex flex-col items-center md:items-end text-center md:text-right space-y-3">
              <div className="flex items-center justify-end gap-3 flex-row-reverse md:flex-row">
                <TeamBadge team={match.teamB} size="lg" showOrigin className="md:flex-row-reverse md:text-right" />
              </div>

              {/* Team B 3x3 Foul Counter */}
              <div className="flex items-center gap-2.5 bg-zinc-900 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs">
                {match.foulsB >= 7 && match.foulsB < 10 && (
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">
                    PENALTY (2 FT)
                  </span>
                )}
                {match.foulsB >= 10 && (
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700 animate-pulse">
                    2 FT + BOLA
                  </span>
                )}
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">Team Fouls: </span>
                  <span className="font-mono font-black text-rose-400">{match.foulsB}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3x3 Rules Banner */}
        <div className="bg-zinc-900/60 border-t border-white/10 px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span><strong className="text-amber-400">&bull; 1 Poin:</strong> Dalam Arc & FT</span>
            <span><strong className="text-amber-400">&bull; 2 Poin:</strong> Luar Arc (2-Pts)</span>
          </div>
          <div className="text-zinc-300 font-semibold text-center sm:text-right">
            Selesai bila waktu 10:00 habis atau tim mencapai 21 Poin Sudden Death.
          </div>
        </div>

      </div>

      {/* Live Play-by-Play & Arena Ticker */}
      <div className="rounded-2xl p-4 sm:p-6 bg-zinc-900 border border-white/10 space-y-3.5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">
              Live Feed Court 3x3
            </h4>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">GKB FIP UM</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-zinc-950 border border-white/5 flex items-start gap-2.5">
            <span className="font-mono text-amber-400 font-bold shrink-0">10:00</span>
            <p className="text-zinc-300">
              Pertandingan resmi 3x3 sistem gugur dimulai di Court GKB FIP UM. Bola pertama diperebutkan melalui coin toss resmi FIBA.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};