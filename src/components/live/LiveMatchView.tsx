import React, { useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import { ScoreboardDisplay } from './ScoreboardDisplay';
import { Flame, Settings2, Target, RotateCcw } from 'lucide-react';

export const LiveMatchView: React.FC = () => {
  const { matches, updateMatchScore } = useTournament();
  
  const liveMatches = matches.filter(m => m.status === 'Sedang Berlangsung');
  const [selectedMatchId, setSelectedMatchId] = useState<string>(
    liveMatches[0]?.id || ''
  );
  const [showSimControls, setShowSimControls] = useState(false);

  const activeMatch = liveMatches.find(m => m.id === selectedMatchId) || liveMatches[0];

  const handleScoreChange = (team: 'A' | 'B', delta: number) => {
    if (!activeMatch) return;
    const newScoreA = team === 'A' ? Math.min(21, Math.max(0, activeMatch.scoreA + delta)) : activeMatch.scoreA;
    const newScoreB = team === 'B' ? Math.min(21, Math.max(0, activeMatch.scoreB + delta)) : activeMatch.scoreB;
    
    updateMatchScore(
      activeMatch.id,
      newScoreA,
      newScoreB,
      activeMatch.foulsA,
      activeMatch.foulsB,
      activeMatch.currentPeriod || '10:00 Waktu Berjalan',
      activeMatch.timeRemaining || '02:14'
    );
  };

  const handleFoulChange = (team: 'A' | 'B', delta: number) => {
    if (!activeMatch) return;
    const newFoulA = team === 'A' ? Math.max(0, activeMatch.foulsA + delta) : activeMatch.foulsA;
    const newFoulB = team === 'B' ? Math.max(0, activeMatch.foulsB + delta) : activeMatch.foulsB;
    updateMatchScore(
      activeMatch.id,
      activeMatch.scoreA,
      activeMatch.scoreB,
      newFoulA,
      newFoulB,
      activeMatch.currentPeriod || '10:00 Waktu Berjalan',
      activeMatch.timeRemaining || '02:14'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 pulse-live" />
            <span className="text-xs font-bold uppercase tracking-widest text-crimson-400">
              Pusat Siaran Court 3x3 Colosseum
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-colosseum-50 uppercase tracking-tight">
            Live Match 3x3 Scoreboard
          </h1>
        </div>

        {/* Live Arena Multi-Court Tabs */}
        {liveMatches.length > 1 && (
          <div className="flex items-center gap-2 bg-colosseum-900/90 p-1.5 rounded-2xl border border-colosseum-800">
            {liveMatches.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMatchId(m.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition ${
                  (activeMatch && activeMatch.id === m.id)
                    ? 'bg-crimson-800 text-gold-300 shadow-md border border-gold-500/40'
                    : 'text-colosseum-400 hover:text-white'
                }`}
              >
                {m.arena.includes('Lapangan A') ? 'Lapangan A' : m.arena.includes('Lapangan B') ? 'Lapangan B' : m.arena}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Live Display */}
      {activeMatch ? (
        <div className="space-y-6">
          <ScoreboardDisplay match={activeMatch} />

          {/* Quick Operator / Simulator Widget with 3x3 FIBA Rules */}
          <div className="border border-colosseum-800 rounded-2xl p-4 bg-colosseum-950/60 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-colosseum-300">
                <Settings2 className="w-4 h-4 text-gold-400" />
                <span className="font-semibold">Operator Skor Cepat 3x3 (1-Pt / 2-Pt & Fouls):</span>
              </div>
              <button
                onClick={() => setShowSimControls(!showSimControls)}
                className="text-gold-400 hover:text-gold-300 font-bold uppercase tracking-wider"
              >
                {showSimControls ? 'Sembunyikan Panel' : 'Buka Kontrol Poin 3x3'}
              </button>
            </div>

            {showSimControls && (
              <div className="mt-4 pt-4 border-t border-colosseum-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Team A Controls */}
                <div className="p-3 bg-colosseum-900 rounded-xl border border-colosseum-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-colosseum-100">{activeMatch.teamA.name}</p>
                    <span className="font-tabular font-black text-gold-400 text-sm">Skor: {activeMatch.scoreA} / 21</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleScoreChange('A', 1)} className="px-3 py-1.5 bg-colosseum-800 hover:bg-gold-600 hover:text-black rounded text-gold-300 font-bold transition">+1 Poin (Dalam Arc / FT)</button>
                    <button onClick={() => handleScoreChange('A', 2)} className="px-3 py-1.5 bg-colosseum-800 hover:bg-gold-600 hover:text-black rounded text-gold-300 font-bold transition">+2 Poin (Luar Arc)</button>
                    <button onClick={() => handleScoreChange('A', -1)} className="px-2 py-1.5 bg-crimson-950 text-crimson-400 rounded hover:bg-crimson-900 transition">-1</button>
                    <button onClick={() => handleFoulChange('A', 1)} className="px-2.5 py-1.5 bg-colosseum-800 text-crimson-300 rounded hover:bg-colosseum-700 transition">+Foul ({activeMatch.foulsA})</button>
                  </div>
                </div>

                {/* Team B Controls */}
                <div className="p-3 bg-colosseum-900 rounded-xl border border-colosseum-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-colosseum-100">{activeMatch.teamB.name}</p>
                    <span className="font-tabular font-black text-gold-400 text-sm">Skor: {activeMatch.scoreB} / 21</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <button onClick={() => handleScoreChange('B', 1)} className="px-3 py-1.5 bg-colosseum-800 hover:bg-gold-600 hover:text-black rounded text-gold-300 font-bold transition">+1 Poin (Dalam Arc / FT)</button>
                    <button onClick={() => handleScoreChange('B', 2)} className="px-3 py-1.5 bg-colosseum-800 hover:bg-gold-600 hover:text-black rounded text-gold-300 font-bold transition">+2 Poin (Luar Arc)</button>
                    <button onClick={() => handleScoreChange('B', -1)} className="px-2 py-1.5 bg-crimson-950 text-crimson-400 rounded hover:bg-crimson-900 transition">-1</button>
                    <button onClick={() => handleFoulChange('B', 1)} className="px-2.5 py-1.5 bg-colosseum-800 text-crimson-300 rounded hover:bg-colosseum-700 transition">+Foul ({activeMatch.foulsB})</button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="arena-card rounded-2xl p-16 text-center space-y-4 border-roman">
          <Flame className="w-12 h-12 text-colosseum-600 mx-auto" />
          <h3 className="font-display font-bold text-xl text-colosseum-200">
            Tidak Ada Match 3x3 yang Sedang Berlangsung Saat Ini
          </h3>
          <p className="text-sm text-colosseum-400 max-w-md mx-auto">
            Pertandingan berikutnya akan dimulai sesuai jadwal resmi. Silakan cek menu Jadwal Match.
          </p>
        </div>
      )}

    </div>
  );
};
