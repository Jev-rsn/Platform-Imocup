import React, { useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import { TournamentCategory, BracketNode, Team } from '../../types/tournament';
import { INITIAL_TEAMS } from '../../data/mockData';
import { TeamBadge } from '../common/TeamBadge';
import { 
  Trophy, 
  CheckCircle2, 
  RotateCcw, 
  Edit3, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const BracketManagerView: React.FC = () => {
  const { brackets, advanceBracketWinner, resetBracketMatch, assignTeamToBracketSlot } = useTournament();

  const [activeCategory, setActiveCategory] = useState<TournamentCategory>('SMA Putra');
  const [selectedRoundFilter, setSelectedRoundFilter] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);

  // Manual score dialog state
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [inputScoreA, setInputScoreA] = useState<number>(21);
  const [inputScoreB, setInputScoreB] = useState<number>(17);

  // Manual team assign dialog state
  const [assigningSlot, setAssigningSlot] = useState<{ nodeId: string; slot: 'teamA' | 'teamB' } | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');

  const currentNodes = brackets[activeCategory] || [];
  const roundIndices = Array.from(new Set(currentNodes.map(n => n.roundIndex))).sort((a, b) => a - b);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleQualifyTeam = (node: BracketNode, winnerTeam: Team, defaultScoreA?: number, defaultScoreB?: number) => {
    const isTeamA = node.teamA?.id === winnerTeam.id;
    const finalScoreA = defaultScoreA !== undefined ? defaultScoreA : (isTeamA ? 21 : 16);
    const finalScoreB = defaultScoreB !== undefined ? defaultScoreB : (!isTeamA ? 21 : 16);

    advanceBracketWinner(activeCategory, node.id, winnerTeam.id, finalScoreA, finalScoreB);
    showToast(`🏆 ${winnerTeam.name} berhasil DILOLOSKAN ke babak berikutnya! Skor: ${finalScoreA} - ${finalScoreB}`);
  };

  const handleSaveScoreAndQualify = (node: BracketNode, winnerId: string) => {
    advanceBracketWinner(activeCategory, node.id, winnerId, inputScoreA, inputScoreB);
    setEditingNodeId(null);
    showToast(`Hasil laga berhasil disimpan. Tim pemenang telah melaju ke babak selanjutnya.`);
  };

  const handleConfirmAssignTeam = () => {
    if (!assigningSlot || !selectedTeamId) return;
    const team = INITIAL_TEAMS.find(t => t.id === selectedTeamId) || null;
    assignTeamToBracketSlot(activeCategory, assigningSlot.nodeId, assigningSlot.slot, team);
    setAssigningSlot(null);
    setSelectedTeamId('');
    showToast(`Slot tim berhasil diperbarui.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-zinc-900 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-zinc-400 hover:text-white text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(['SMA Putra', 'SMA Putri', 'Umum'] as TournamentCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedRoundFilter(0);
              }}
              className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {cat === 'SMA Putra' ? 'SMA Putra (44 Tim)' : cat === 'SMA Putri' ? 'SMA Putri (24 Tim)' : 'Kategori Umum (16 Tim)'}
            </button>
          ))}
        </div>

        <p className="text-xs text-zinc-400">
          Klik tombol <strong>Loloskan</strong> untuk memajukan tim pemenang ke babak berikutnya secara otomatis.
        </p>
      </div>

      {/* Round Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedRoundFilter(0)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
            selectedRoundFilter === 0
              ? 'bg-amber-400 text-black'
              : 'bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          Semua Babak ({currentNodes.length})
        </button>
        {roundIndices.map((r) => {
          const roundName = currentNodes.find(n => n.roundIndex === r)?.roundName || `Babak ${r}`;
          return (
            <button
              key={r}
              onClick={() => setSelectedRoundFilter(r)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                selectedRoundFilter === r
                  ? 'bg-zinc-800 text-white border border-white/10'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              {roundName}
            </button>
          );
        })}
      </div>

      {/* Match Cards for Qualifying Teams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentNodes
          .filter(n => selectedRoundFilter === 0 || n.roundIndex === selectedRoundFilter)
          .map((node) => {
            const isFinished = node.status === 'Selesai';

            return (
              <div 
                key={node.id}
                className={`rounded-2xl p-5 border space-y-4 transition shadow-xs ${
                  isFinished
                    ? 'border-amber-500/40 bg-zinc-900/90'
                    : 'border-white/10 bg-zinc-900/70 hover:border-white/20'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-white/5 pb-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {node.matchCode && (
                      <span className="font-mono font-black text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {node.matchCode}
                      </span>
                    )}
                    <span className="font-bold text-amber-400">{node.roundName}</span>
                    <span className="text-zinc-500 ml-1 font-mono text-[11px]">&bull; {node.time}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    isFinished 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50' 
                      : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {node.status}
                  </span>
                </div>

                {/* Team A Section */}
                <div className={`p-3 rounded-xl border space-y-2 transition ${
                  node.winnerId === node.teamA?.id
                    ? 'bg-amber-400/10 border-amber-400/30'
                    : 'bg-zinc-950/60 border-white/5'
                }`}>
                  <div className="flex items-center justify-between">
                    <TeamBadge team={node.teamA} size="sm" showOrigin />
                    <span className="font-mono font-black text-sm text-amber-400 ml-2">
                      {node.scoreA !== null && node.scoreA !== undefined ? node.scoreA : '-'}
                    </span>
                  </div>

                  {/* Qualify Team A Button */}
                  {node.teamA && (
                    <div className="pt-1 border-t border-white/5">
                      <button
                        onClick={() => handleQualifyTeam(node, node.teamA!)}
                        className={`w-full py-1.5 px-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                          node.winnerId === node.teamA.id
                            ? 'bg-amber-400 text-black font-extrabold'
                            : 'bg-zinc-800 hover:bg-amber-400 hover:text-black text-amber-300'
                        }`}
                      >
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{node.winnerId === node.teamA.id ? 'Pemenang (Lolos)' : `Loloskan ${node.teamA.shortName}`}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Team B Section */}
                <div className={`p-3 rounded-xl border space-y-2 transition ${
                  node.winnerId === node.teamB?.id
                    ? 'bg-amber-400/10 border-amber-400/30'
                    : 'bg-zinc-950/60 border-white/5'
                }`}>
                  <div className="flex items-center justify-between">
                    <TeamBadge team={node.teamB} size="sm" showOrigin />
                    <span className="font-mono font-black text-sm text-amber-400 ml-2">
                      {node.scoreB !== null && node.scoreB !== undefined ? node.scoreB : '-'}
                    </span>
                  </div>

                  {/* Qualify Team B Button */}
                  {node.teamB && (
                    <div className="pt-1 border-t border-white/5">
                      <button
                        onClick={() => handleQualifyTeam(node, node.teamB!)}
                        className={`w-full py-1.5 px-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
                          node.winnerId === node.teamB.id
                            ? 'bg-amber-400 text-black font-extrabold'
                            : 'bg-zinc-800 hover:bg-amber-400 hover:text-black text-amber-300'
                        }`}
                      >
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{node.winnerId === node.teamB.id ? 'Pemenang (Lolos)' : `Loloskan ${node.teamB.shortName}`}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer Controls: Custom Score & Reset */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setEditingNodeId(node.id);
                      setInputScoreA(node.scoreA ?? 21);
                      setInputScoreB(node.scoreB ?? 17);
                    }}
                    className="text-zinc-400 hover:text-amber-300 flex items-center gap-1 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Skor Kustom</span>
                  </button>

                  {isFinished && (
                    <button
                      onClick={() => resetBracketMatch(activeCategory, node.id)}
                      className="text-rose-400 hover:text-rose-300 flex items-center gap-1 transition"
                      title="Batalkan penetapan pemenang untuk laga ini"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Target Next Slot Info */}
                {node.nextMatchId && (
                  <div className="text-[10px] text-zinc-500 italic flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>Pemenang otomatis maju ke <strong>{node.nextMatchId}</strong></span>
                  </div>
                )}

              </div>
            );
          })}
      </div>

      {/* Manual Score Dialog Modal */}
      {editingNodeId && (() => {
        const node = currentNodes.find(n => n.id === editingNodeId);
        if (!node) return null;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="rounded-2xl p-6 bg-zinc-900 border border-white/10 max-w-md w-full space-y-5 shadow-2xl">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-bold text-base text-white">Input Skor Akhir & Loloskan</h3>
                <p className="text-xs text-zinc-400">{node.roundName} &bull; {node.teamA?.shortName || 'TBD'} vs {node.teamB?.shortName || 'TBD'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-zinc-300 truncate">{node.teamA?.name || 'Tim A'}</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={inputScoreA}
                    onChange={(e) => setInputScoreA(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-center font-mono font-bold text-xl text-amber-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-zinc-300 truncate">{node.teamB?.name || 'Tim B'}</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={inputScoreB}
                    onChange={(e) => setInputScoreB(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-center font-mono font-bold text-xl text-amber-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">Tentukan Tim yang Lolos:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    disabled={!node.teamA}
                    onClick={() => handleSaveScoreAndQualify(node, node.teamA!.id)}
                    className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition disabled:opacity-40"
                  >
                    Loloskan {node.teamA?.shortName || 'Tim A'}
                  </button>
                  <button
                    disabled={!node.teamB}
                    onClick={() => handleSaveScoreAndQualify(node, node.teamB!.id)}
                    className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition disabled:opacity-40"
                  >
                    Loloskan {node.teamB?.shortName || 'Tim B'}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setEditingNodeId(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
};
