import React, { useState } from 'react';
import { BracketNode, TournamentCategory } from '../../types/tournament';
import { Trophy, Crown } from 'lucide-react';

interface BracketTreeProps {
  category: TournamentCategory;
  nodes: BracketNode[];
  onSelectMatchNode?: (node: BracketNode) => void;
}

export const BracketTree: React.FC<BracketTreeProps> = ({ category, nodes, onSelectMatchNode }) => {
  const [layoutMode, setLayoutMode] = useState<'scroll-tree' | 'rounds'>('scroll-tree');
  const [selectedRoundFilter, setSelectedRoundFilter] = useState<number>(0);

  const roundIndices = Array.from(new Set(nodes.map(n => n.roundIndex))).sort((a, b) => a - b);
  const maxRound = Math.max(...roundIndices, 3);

  const finalNode = nodes.find(n => n.roundName === 'Grand Final') || nodes.find(n => n.roundIndex === maxRound);
  const thirdPlaceNode = nodes.find(n => n.roundName === 'Perebutan Juara 3' || (n.roundName as any) === 'Juara 3');

  const leftWingNodes = nodes.filter(n => n.side === 'left' || (n.roundIndex < maxRound && nodes.indexOf(n) % 2 === 0));
  const rightWingNodes = nodes.filter(n => n.side === 'right' || (n.roundIndex < maxRound && nodes.indexOf(n) % 2 !== 0));

  const renderMatchCard = (node: BracketNode, compact = false) => {
    const isWinnerA = node.winnerId && node.teamA && node.winnerId === node.teamA.id;
    const isWinnerB = node.winnerId && node.teamB && node.winnerId === node.teamB.id;
    const isLive = node.status === 'Sedang Berlangsung';
    const isFinished = node.status === 'Selesai';

    const getMonogram = (name?: string, short?: string) => {
      if (!name) return '?';
      if (short && short.length <= 4) return short.toUpperCase();
      const words = name.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(Boolean);
      if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
      return name.slice(0, 3).toUpperCase();
    };

    return (
      <div
        key={node.id}
        onClick={() => onSelectMatchNode && onSelectMatchNode(node)}
        className={`rounded-xl border transition-all cursor-pointer overflow-hidden ${
          compact ? 'w-56 p-2.5 text-xs' : 'w-64 p-3 text-xs'
        } ${
          isLive
            ? 'bg-zinc-900 border-rose-500 shadow-md'
            : isFinished
            ? 'bg-zinc-900/90 border-amber-500/30 hover:border-amber-500/60'
            : 'bg-zinc-900/60 border-white/10 hover:border-white/20'
        }`}
      >
        {/* Match Header */}
        <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-white/5 pb-1.5 mb-2">
          <div className="flex items-center gap-1.5 truncate max-w-[140px]">
            {node.matchCode && (
              <span className="font-mono font-black text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {node.matchCode}
              </span>
            )}
            <span className="font-semibold uppercase tracking-wider text-amber-400 truncate">
              {node.roundName}
            </span>
          </div>
          {isLive ? (
            <span className="text-rose-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 pulse-live" /> LIVE
            </span>
          ) : isFinished ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
              <Crown className="w-3 h-3 text-amber-400" /> Selesai
            </span>
          ) : (
            <span className="text-zinc-500 font-mono text-[9px]">{node.time || 'TBD'}</span>
          )}
        </div>

        {/* Team A */}
        <div className={`flex items-center justify-between py-1 px-2 rounded-lg transition ${
          isWinnerA 
            ? 'bg-amber-400/10 text-amber-300 font-bold border border-amber-400/30' 
            : 'text-zinc-200 hover:bg-zinc-800/50'
        }`}>
          <div className="flex items-center gap-2 truncate">
            <span className="w-5 h-5 rounded font-mono text-[9px] font-bold bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 border border-white/5">
              {getMonogram(node.teamA?.name, node.teamA?.shortName)}
            </span>
            <span className="truncate leading-tight font-medium text-xs">
              {node.teamA?.name || 'TBD (Menunggu Lolos)'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {isWinnerA && <span className="text-[9px] font-black uppercase text-amber-400 px-1 py-0.2 rounded bg-amber-950">WIN</span>}
            <span className={`font-mono font-bold ${isWinnerA ? 'text-amber-400' : 'text-zinc-400'}`}>
              {node.scoreA !== null && node.scoreA !== undefined ? node.scoreA : '-'}
            </span>
          </div>
        </div>

        {/* Team B */}
        <div className={`flex items-center justify-between py-1 px-2 rounded-lg mt-1 transition ${
          isWinnerB 
            ? 'bg-amber-400/10 text-amber-300 font-bold border border-amber-400/30' 
            : 'text-zinc-200 hover:bg-zinc-800/50'
        }`}>
          <div className="flex items-center gap-2 truncate">
            <span className="w-5 h-5 rounded font-mono text-[9px] font-bold bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 border border-white/5">
              {getMonogram(node.teamB?.name, node.teamB?.shortName)}
            </span>
            <span className="truncate leading-tight font-medium text-xs">
              {node.teamB?.name || 'TBD (Menunggu Lolos)'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {isWinnerB && <span className="text-[9px] font-black uppercase text-amber-400 px-1 py-0.2 rounded bg-amber-950">WIN</span>}
            <span className={`font-mono font-bold ${isWinnerB ? 'text-amber-400' : 'text-zinc-400'}`}>
              {node.scoreB !== null && node.scoreB !== undefined ? node.scoreB : '-'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Control Bar: Dual-Wing Scroll vs Round-by-Round */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/60 p-2.5 rounded-xl border border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-400">Tampilan Braket:</span>
          <button
            onClick={() => setLayoutMode('scroll-tree')}
            className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider text-[11px] transition ${
              layoutMode === 'scroll-tree'
                ? 'bg-zinc-800 text-white border border-white/10'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Pohon Bagan (Dual-Wing)
          </button>
          <button
            onClick={() => setLayoutMode('rounds')}
            className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider text-[11px] transition ${
              layoutMode === 'rounds'
                ? 'bg-zinc-800 text-white border border-white/10'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Daftar Babak
          </button>
        </div>

        <div className="text-[11px] text-zinc-400">
          Target Kemenangan: <strong className="text-amber-400">21 Poin Sudden Death</strong>
        </div>
      </div>

      {/* MODE 1: DUAL-WING SCROLL TREE */}
      {layoutMode === 'scroll-tree' && (
        <div className="space-y-2">
          <div className="md:hidden flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-zinc-900 border border-white/5 text-[11px] text-amber-300 font-medium text-center">
            <span>👈 Geser ke samping untuk menjelajah bagan pohon lengkap 👉</span>
          </div>

          <div className="relative rounded-2xl overflow-x-auto p-4 sm:p-6 bg-zinc-950 border border-white/10 shadow-lg">
            <div className="min-w-[1020px] flex items-center justify-between gap-6 sm:gap-8 px-2 py-4">
            
            {/* LEFT WING */}
            <div className="space-y-5 flex-1">
              <div className="text-center pb-2 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Pool Kiri (Alpha)
                </span>
                <p className="text-[10px] text-zinc-500">Arah Menuju Final</p>
              </div>

              <div className="space-y-3.5">
                {leftWingNodes.map(node => renderMatchCard(node))}
              </div>
            </div>

            {/* CENTER STAGE: GRAND FINAL & 3RD PLACE */}
            <div className="w-80 shrink-0 space-y-6 px-4 py-6 rounded-2xl bg-zinc-900/90 border border-amber-500/40 text-center">
              
              {/* Grand Final Center Card */}
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Grand Final 3x3</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Perebutan Juara 1 Turnamen
                </p>

                {finalNode ? (
                  <div className="pt-2">
                    {renderMatchCard(finalNode)}
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 text-xs text-zinc-500">
                    Menunggu Pemenang Semifinal
                  </div>
                )}
              </div>

              {/* 3rd Place Match Card */}
              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Perebutan Juara 3
                </span>
                {thirdPlaceNode ? (
                  <div>
                    {renderMatchCard(thirdPlaceNode)}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-zinc-950 border border-white/5 text-[11px] text-zinc-500">
                    Menunggu Hasil Semifinal
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT WING */}
            <div className="space-y-5 flex-1">
              <div className="text-center pb-2 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Pool Kanan (Beta)
                </span>
                <p className="text-[10px] text-zinc-500">Arah Menuju Final</p>
              </div>

              <div className="space-y-3.5">
                {rightWingNodes.map(node => renderMatchCard(node))}
              </div>
            </div>

            </div>
          </div>
        </div>
      )}

      {/* MODE 2: ROUND-BY-ROUND BREAKDOWN */}
      {layoutMode === 'rounds' && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedRoundFilter(0)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                selectedRoundFilter === 0
                  ? 'bg-amber-400 text-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              Semua Babak ({nodes.length})
            </button>
            {roundIndices.map((r) => {
              const roundNode = nodes.find(n => n.roundIndex === r);
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRoundFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                    selectedRoundFilter === r
                      ? 'bg-rose-600 text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {roundNode?.roundName || `Babak ${r}`}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {nodes
              .filter(n => selectedRoundFilter === 0 || n.roundIndex === selectedRoundFilter)
              .map(node => renderMatchCard(node))}
          </div>
        </div>
      )}

    </div>
  );
};
