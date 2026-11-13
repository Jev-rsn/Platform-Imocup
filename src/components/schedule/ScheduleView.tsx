import React, { useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import { TournamentCategory, MatchStage, Match } from '../../types/tournament';
import { MatchCard } from './MatchCard';
import { Search, Filter, X, RotateCw } from 'lucide-react';

interface ScheduleViewProps {
  onSelectLive?: (matchId: string) => void;
  onSelectDetail?: (match: Match) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onSelectLive, onSelectDetail }) => {
  const { matches, selectedCategory, setSelectedCategory, syncFromSupabase } = useTournament();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('Semua');
  const [selectedDate, setSelectedDate] = useState<string>('Semua');
  const [selectedCourt, setSelectedCourt] = useState<string>('Semua');
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [isSyncing, setIsSyncing] = useState(false);

  const categories: (TournamentCategory | 'Semua')[] = ['Semua', 'SMA Putra', 'SMA Putri', 'Umum'];
  const stages: (MatchStage | 'Semua')[] = [
    'Semua',
    'Babak 32 Besar',
    'Babak 16 Besar',
    'Perempat Final',
    'Semifinal',
    'Perebutan Juara 3',
    'Grand Final'
  ];
  const dates = [
    { value: 'Semua', label: 'Semua Tanggal' },
    { value: '2026-11-14', label: 'Sabtu, 14 Nov (Penyisihan)' },
    { value: '2026-11-15', label: 'Minggu, 15 Nov (Final Day)' }
  ];
  const courts = ['Semua', 'Lapangan A', 'Lapangan B'];
  const statuses = ['Semua', 'Sedang Berlangsung', 'Akan Datang', 'Selesai'];

  // Filtering matches
  const filteredMatches = matches.filter((m) => {
    if (selectedCategory !== 'Semua' && m.category !== selectedCategory) return false;
    if (selectedStage !== 'Semua' && m.stage !== selectedStage) return false;
    if (selectedDate !== 'Semua' && m.date !== selectedDate) return false;
    if (selectedCourt !== 'Semua' && !m.arena.toLowerCase().includes(selectedCourt.toLowerCase())) return false;
    if (selectedStatus !== 'Semua' && m.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTeamA = m.teamA.name.toLowerCase().includes(q) || m.teamA.origin.toLowerCase().includes(q);
      const matchTeamB = m.teamB.name.toLowerCase().includes(q) || m.teamB.origin.toLowerCase().includes(q);
      const matchArena = m.arena.toLowerCase().includes(q);
      const matchCode = m.matchCode?.toLowerCase().includes(q);
      if (!matchTeamA && !matchTeamB && !matchArena && !matchCode) return false;
    }
    return true;
  });

  const clearFilters = () => {
    setSelectedCategory('Semua');
    setSelectedStage('Semua');
    setSelectedDate('Semua');
    setSelectedCourt('Semua');
    setSelectedStatus('Semua');
    setSearchQuery('');
  };

  const hasActiveFilters = 
    selectedCategory !== 'Semua' || 
    selectedStage !== 'Semua' || 
    selectedDate !== 'Semua' || 
    selectedCourt !== 'Semua' || 
    selectedStatus !== 'Semua' || 
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      
      {/* Title & Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Jadwal Resmi GKB FIP UM &bull; Sabtu &ndash; Minggu, 14 &ndash; 15 Nov 2026
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Jadwal Pertandingan
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={async () => {
                setIsSyncing(true);
                await syncFromSupabase();
                setTimeout(() => setIsSyncing(false), 500);
              }}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 text-xs font-bold transition flex items-center gap-1.5 shrink-0"
              title="Segarkan Jadwal & Hasil dari Database Supabase"
            >
              <RotateCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync Cloud</span>
            </button>
          </div>
        </div>

        {/* Category Primary Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
              }`}
            >
              {cat === 'Semua' ? 'Semua Kategori (84)' : cat === 'SMA Putra' ? 'SMA Putra (44 Tim)' : cat === 'SMA Putri' ? 'SMA Putri (24 Tim)' : 'Umum (16 Tim)'}
            </button>
          ))}
        </div>

        {/* Control Bar: Search & Sub-filters */}
        <div className="rounded-2xl p-4 sm:p-5 bg-zinc-900/80 border border-white/10 space-y-3.5 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            
            {/* Search box */}
            <div className="lg:col-span-4 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tim, arena, atau kode (A1, B1)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400/60 transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Babak / Stage */}
            <div className="lg:col-span-3">
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-zinc-200 text-xs sm:text-sm focus:outline-none focus:border-amber-400/60"
              >
                {stages.map((st) => (
                  <option key={st} value={st}>Babak: {st}</option>
                ))}
              </select>
            </div>

            {/* Tanggal / Date */}
            <div className="lg:col-span-2">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-zinc-200 text-xs sm:text-sm focus:outline-none focus:border-amber-400/60"
              >
                {dates.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            {/* Court / Lapangan */}
            <div className="lg:col-span-2">
              <select
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-zinc-200 text-xs sm:text-sm focus:outline-none focus:border-amber-400/60"
              >
                {courts.map((court) => (
                  <option key={court} value={court}>{court === 'Semua' ? 'Semua Lapangan' : court}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="lg:col-span-1">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-zinc-200 text-xs sm:text-sm focus:outline-none focus:border-amber-400/60"
              >
                {statuses.map((st) => (
                  <option key={st} value={st}>{st === 'Semua' ? 'Status' : st === 'Sedang Berlangsung' ? 'LIVE' : st}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Filter Summary & Clear */}
          <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5">
            <span>Menampilkan <strong className="text-amber-400">{filteredMatches.length}</strong> pertandingan resmi</span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-semibold transition"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Semua Filter</span>
              </button>
            )}
          </div>
        </div>

        {/* Match Cards List */}
        <div className="space-y-3.5">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onSelectLive={onSelectLive}
                onSelectDetail={onSelectDetail}
              />
            ))
          ) : (
            <div className="rounded-2xl p-10 text-center space-y-3 bg-zinc-900/60 border border-white/10">
              <Filter className="w-8 h-8 text-zinc-500 mx-auto" />
              <h3 className="font-bold text-base text-zinc-200">
                Tidak Ada Pertandingan yang Sesuai
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Coba sesuaikan kata kunci pencarian, kategori babak, atau filter tanggal di atas.
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 px-3.5 py-1.5 rounded-lg bg-zinc-800 text-amber-400 hover:bg-zinc-700 font-bold text-xs uppercase tracking-wider border border-white/10 transition"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
