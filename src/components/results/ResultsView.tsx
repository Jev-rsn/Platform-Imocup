import React, { useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import { TournamentCategory, Match } from '../../types/tournament';
import { MatchDetailModal } from './MatchDetailModal';
import { ListFilter, ChevronRight, Image as ImageIcon, ZoomIn, RotateCw } from 'lucide-react';
import { TeamBadge } from '../common/TeamBadge';

export const ResultsView: React.FC = () => {
  const { matches, syncFromSupabase } = useTournament();

  const [activeCategory, setActiveCategory] = useState<TournamentCategory>('SMA Putra');
  const [viewMode, setViewMode] = useState<'official-sheet' | 'list'>('official-sheet');
  const [selectedMatchForDetail, setSelectedMatchForDetail] = useState<Match | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const categories: TournamentCategory[] = ['SMA Putra', 'SMA Putri', 'Umum'];

  // Map category to the uploaded official image
  const officialBracketImages: Record<TournamentCategory, string> = {
    'SMA Putri': '/1.png',
    'SMA Putra': '/2.png',
    'Umum': '/3.png'
  };

  // Finished matches in selected category
  const finishedMatches = matches.filter(
    m => m.status === 'Selesai' && m.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Sistem Gugur Resmi FIBA 3x3 &bull; GKB FIP UM
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Bagan Resmi Turnamen
          </h1>
        </div>

        {/* View Mode Switcher & Cloud Sync */}
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              setIsSyncing(true);
              await syncFromSupabase();
              setTimeout(() => setIsSyncing(false), 500);
            }}
            disabled={isSyncing}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 text-xs font-bold transition flex items-center gap-1.5 shrink-0"
            title="Segarkan Hasil Pertandingan dari Database Supabase"
          >
            <RotateCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync Cloud</span>
          </button>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-white/10 text-xs font-bold uppercase tracking-wider overflow-x-auto">
            <button
              onClick={() => setViewMode('official-sheet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg transition shrink-0 ${
                viewMode === 'official-sheet'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">Bagan Gambar Resmi</span>
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg transition shrink-0 ${
                viewMode === 'list'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="text-[11px] sm:text-xs">Rekap Hasil Laga</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs (Horizontal Scrollable on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap transition shrink-0 ${
              activeCategory === cat
                ? 'bg-zinc-800 text-amber-400 border border-white/10 shadow-xs'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-white/5'
            }`}
          >
            {cat === 'SMA Putra' ? 'SMA Putra (44 Tim)' : cat === 'SMA Putri' ? 'SMA Putri (24 Tim)' : 'Umum (16 Tim)'}
          </button>
        ))}
      </div>

      {/* VIEW 1: OFFICIAL PERGAMEN BRACKET SHEET VIEWER */}
      {viewMode === 'official-sheet' && (
        <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-7 bg-zinc-900 border border-white/10 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5 text-xs">
            <div>
              <span className="font-display font-black text-sm sm:text-base text-white uppercase tracking-wide">
                Bagan Resmi Panitia &mdash; {activeCategory}
              </span>
              <p className="text-zinc-400 mt-0.5 text-[11px] sm:text-xs">
                Format bagan gugur resmi disahkan oleh panitia Imonoke Cup bersama Universitas Negeri Malang.
              </p>
            </div>
            
            <a
              href={officialBracketImages[activeCategory]}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-bold border border-white/10 transition shrink-0"
            >
              <ZoomIn className="w-4 h-4" />
              <span>Buka Resolusi Penuh</span>
            </a>
          </div>

          {/* High Res Image with zoom hint */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            <img
              src={officialBracketImages[activeCategory]}
              alt={`Official Match Bracket ${activeCategory}`}
              className="w-full h-auto object-contain max-h-[85vh] mx-auto cursor-zoom-in"
              onClick={() => window.open(officialBracketImages[activeCategory], '_blank')}
            />
          </div>

          <div className="text-center text-[11px] sm:text-xs text-zinc-400">
            💡 <em>Ketuk gambar untuk memperbesar detail bagan pertandingan di tab baru.</em>
          </div>
        </div>
      )}

      {/* VIEW: FINISHED MATCHES LIST */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          <div className="text-xs text-zinc-400">
            Menampilkan <strong className="text-amber-400">{finishedMatches.length}</strong> laga selesai di kategori {activeCategory}.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {finishedMatches.length > 0 ? (
              finishedMatches.map((m) => {
                const isWinnerA = m.winnerId === m.teamA.id;
                const isWinnerB = m.winnerId === m.teamB.id;

                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMatchForDetail(m)}
                    className="rounded-2xl p-4 sm:p-5 bg-zinc-900 border border-white/10 hover:border-white/20 transition cursor-pointer space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-white/5 pb-2">
                      <span className="font-semibold text-amber-400">{m.stage}</span>
                      <span className="font-mono text-[11px]">{m.date} &bull; {m.time}</span>
                    </div>

                    <div className="space-y-2">
                      <div className={`flex items-center justify-between p-2 rounded-lg ${
                        isWinnerA ? 'bg-amber-400/10 text-amber-300 font-bold border border-amber-400/20' : 'text-zinc-200'
                      }`}>
                        <div className="truncate">
                          <TeamBadge team={m.teamA} size="sm" />
                        </div>
                        <span className="font-mono font-bold text-base ml-2">{m.scoreA}</span>
                      </div>

                      <div className={`flex items-center justify-between p-2 rounded-lg ${
                        isWinnerB ? 'bg-amber-400/10 text-amber-300 font-bold border border-amber-400/20' : 'text-zinc-200'
                      }`}>
                        <div className="truncate">
                          <TeamBadge team={m.teamB} size="sm" />
                        </div>
                        <span className="font-mono font-bold text-base ml-2">{m.scoreB}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                      <span className="text-[11px]">{m.arena.split('(')[0]}</span>
                      <span className="flex items-center gap-1 text-amber-400 hover:text-amber-300">
                        <span>Rincian</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 rounded-2xl p-10 text-center text-zinc-400 bg-zinc-900/60 border border-white/10">
                Belum ada pertandingan selesai pada kategori ini.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Match Detail Modal */}
      <MatchDetailModal
        match={selectedMatchForDetail}
        onClose={() => setSelectedMatchForDetail(null)}
      />

    </div>
  );
};