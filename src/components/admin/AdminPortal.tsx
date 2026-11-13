import React, { useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import { BracketManagerView } from './BracketManagerView';
import { 
  ShieldAlert, 
  Trophy, 
  Flame, 
  QrCode, 
  History, 
  ArrowLeft, 
  RotateCcw, 
  Search, 
  UserCheck, 
  CheckCircle2, 
  XCircle,
  Settings,
  DollarSign,
  Database,
  RotateCw
} from 'lucide-react';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { getApprovalNoticeWhatsAppUrl } from '../../config/eventConfig';
import { Match } from '../../types/tournament';

interface AdminPortalProps {
  onExitAdmin: () => void;
  onLogout: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onExitAdmin, onLogout }) => {
  const { 
    purchases, 
    verifyTicketPayment, 
    redeemTicketAtVenue, 
    matches, 
    updateMatchScore, 
    setMatchStatus,
    auditLogs,
    resetAllData,
    syncFromSupabase,
    pushAllDataToSupabase
  } = useTournament();

  const { isSupabaseConnected } = useCustomerAuth();
  const [isRefreshingSync, setIsRefreshingSync] = useState(false);
  const [isPushingSync, setIsPushingSync] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ text: string; isError?: boolean } | null>(null);

  const [activeNav, setActiveNav] = useState<'bracket' | 'live' | 'tickets' | 'checkin' | 'logs'>('bracket');
  const [ticketStatusFilter, setTicketStatusFilter] = useState<string>('Semua');
  const [ticketSearch, setTicketSearch] = useState('');
  const [rejectionModalId, setRejectionModalId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [redeemInputCode, setRedeemInputCode] = useState('');
  const [redeemFeedback, setRedeemFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Live operator selection
  const [selectedLiveMatchId, setSelectedLiveMatchId] = useState<string>(
    matches.find(m => m.status === 'Sedang Berlangsung')?.id || matches[0]?.id || ''
  );
  const activeOperateMatch = matches.find(m => m.id === selectedLiveMatchId) || matches[0];

  // Stats calculation
  const totalRevenue = purchases
    .filter(p => p.status === 'Terverifikasi' || p.status === 'Sudah Ditukar')
    .reduce((acc, p) => acc + p.totalAmount, 0);

  const totalSold = purchases
    .filter(p => p.status === 'Terverifikasi' || p.status === 'Sudah Ditukar')
    .reduce((acc, p) => acc + p.quantity, 0);

  const totalSoldDay1 = purchases
    .filter(p => p.tierId === 't-day1' && (p.status === 'Terverifikasi' || p.status === 'Sudah Ditukar'))
    .reduce((acc, p) => acc + p.quantity, 0);

  const totalSoldDay2 = purchases
    .filter(p => p.tierId === 't-day2' && (p.status === 'Terverifikasi' || p.status === 'Sudah Ditukar'))
    .reduce((acc, p) => acc + p.quantity, 0);

  const pendingVerificationCount = purchases.filter(p => p.status === 'Menunggu Verifikasi').length;

  const filteredPurchases = purchases.filter(p => {
    if (ticketStatusFilter !== 'Semua' && p.status !== ticketStatusFilter) return false;
    if (ticketSearch.trim()) {
      const q = ticketSearch.toLowerCase();
      return (
        p.id.toLowerCase().includes(q) ||
        p.buyerName.toLowerCase().includes(q) ||
        p.buyerWhatsapp.includes(q) ||
        p.ticketCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApproveTicket = (purchaseId: string) => {
    const purchase = purchases.find(p => p.id === purchaseId);
    if (!purchase) return;

    verifyTicketPayment(purchaseId, 'Terverifikasi');

    const waUrl = getApprovalNoticeWhatsAppUrl(purchase);
    window.open(waUrl, '_blank');
  };

  const handleConfirmReject = () => {
    if (!rejectionModalId) return;
    const reason = rejectionReason.trim() || 'Bukti transfer tidak valid atau nominal tidak sesuai';
    verifyTicketPayment(rejectionModalId, 'Ditolak', reason);
    setRejectionModalId(null);
    setRejectionReason('');
  };

  const handleVenueRedeemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!redeemInputCode.trim()) return;
    const result = redeemTicketAtVenue(redeemInputCode.trim());
    setRedeemFeedback(result);
    setRedeemInputCode('');
    setTimeout(() => setRedeemFeedback(null), 6000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-black">
      
      {/* Top Admin Header Bar */}
      <header className="bg-zinc-950 border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Admin Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img src="/Logo_IMOCUP.png" alt="IMOCUP Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0" />
                <img src="/Logo_Um.png" alt="UM Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white uppercase">
                    IMOCUP <span className="text-amber-400">PANEL</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/50">
                    PANITIA
                  </span>
                </div>
                <p className="text-[11px] font-medium tracking-wider text-zinc-400">
                  Panel Pengelola Turnamen Basket 3x3 &bull; GKB FIP UM
                </p>
              </div>
            </div>

            {/* Switch to Public Site */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <button
                onClick={() => {
                  if (confirm('Reset seluruh data turnamen, skor, dan tiket kembali ke default?')) {
                    resetAllData();
                  }
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold border border-white/10 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo</span>
              </button>

              <button
                onClick={onExitAdmin}
                className="px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 border border-white/10 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Web</span>
              </button>

              <button
                onClick={onLogout}
                className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                title="Kunci / Keluar dari Sesi Panitia"
              >
                <span>Logout</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Admin Workspace Container */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 flex-1 w-full space-y-6">
        
        {/* Supabase Cloud Database Sync Status & Action Bar */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
              <Database className={`w-4 h-4 ${isSupabaseConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Database Cloud Supabase</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isSupabaseConnected 
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                }`}>
                  {isSupabaseConnected ? 'Terhubung (Live Sync)' : 'Mode Lokal / Offline'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Skor pertandingan, tim yang lolos di bagan, dan tiket terverifikasi otomatis tersimpan ke tabel Supabase.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={async () => {
                setIsRefreshingSync(true);
                await syncFromSupabase();
                setIsRefreshingSync(false);
                setSyncFeedback({ text: 'Data hasil pertandingan & tiket berhasil ditarik dari Supabase!' });
                setTimeout(() => setSyncFeedback(null), 4000);
              }}
              disabled={isRefreshingSync}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition flex items-center gap-1.5 border border-white/10"
              title="Tarik data terbaru dari Supabase"
            >
              <RotateCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshingSync ? 'animate-spin' : ''}`} />
              <span>Tarik dari Cloud</span>
            </button>

            <button
              onClick={async () => {
                setIsPushingSync(true);
                const res = await pushAllDataToSupabase();
                setIsPushingSync(false);
                setSyncFeedback({ text: res.message, isError: !res.success });
                setTimeout(() => setSyncFeedback(null), 5000);
              }}
              disabled={isPushingSync}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm"
              title="Unggah seluruh data pertandingan, bagan, dan tiket ke Supabase"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{isPushingSync ? 'Mengunggah...' : 'Upload Semua ke Cloud'}</span>
            </button>
          </div>
        </div>

        {/* Sync Feedback Toast */}
        {syncFeedback && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 transition animate-in fade-in ${
            syncFeedback.isError 
              ? 'bg-rose-950/80 border border-rose-700 text-rose-200' 
              : 'bg-emerald-950/80 border border-emerald-600 text-emerald-200'
          }`}>
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{syncFeedback.text}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10">
          <button
            onClick={() => setActiveNav('bracket')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition ${
              activeNav === 'bracket'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white bg-zinc-900 border border-white/5'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Atur Tim Lolos & Bagan</span>
          </button>

          <button
            onClick={() => setActiveNav('live')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition ${
              activeNav === 'live'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white bg-zinc-900 border border-white/5'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Scorekeeper Live 3x3</span>
          </button>

          <button
            onClick={() => setActiveNav('tickets')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition ${
              activeNav === 'tickets'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white bg-zinc-900 border border-white/5'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Verifikasi Tiket ({pendingVerificationCount})</span>
          </button>

          <button
            onClick={() => setActiveNav('checkin')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition ${
              activeNav === 'checkin'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white bg-zinc-900 border border-white/5'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gate Scanner Wristband</span>
          </button>

          <button
            onClick={() => setActiveNav('logs')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition ${
              activeNav === 'logs'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white bg-zinc-900 border border-white/5'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Log Audit ({auditLogs.length})</span>
          </button>
        </div>

        {/* 1. BRACKET & QUALIFIER MANAGER (MAIN REQUESTED FEATURE) */}
        {activeNav === 'bracket' && (
          <BracketManagerView />
        )}

        {/* 2. LIVE OPERATOR */}
        {activeNav === 'live' && activeOperateMatch && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 bg-colosseum-900 p-3 rounded-2xl border border-colosseum-800">
              <span className="text-xs font-bold text-colosseum-400 uppercase">Pilih Pertandingan:</span>
              <select
                value={selectedLiveMatchId}
                onChange={(e) => setSelectedLiveMatchId(e.target.value)}
                className="flex-1 bg-colosseum-950 border border-colosseum-800 text-white text-xs px-3 py-2 rounded-xl focus:outline-none"
              >
                {matches.map((m) => (
                  <option key={m.id} value={m.id}>
                    Match #{m.matchNumber} &bull; {m.category} &bull; {m.teamA.name} vs {m.teamB.name} ({m.status})
                  </option>
                ))}
              </select>
            </div>

            <div className="arena-card rounded-3xl p-6 sm:p-8 border-roman space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-colosseum-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">{activeOperateMatch.category} &bull; {activeOperateMatch.stage}</span>
                  <h3 className="font-display font-black text-2xl text-colosseum-50 uppercase mt-0.5">
                    {activeOperateMatch.teamA.name} VS {activeOperateMatch.teamB.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-colosseum-400">Status Laga:</span>
                  <select
                    value={activeOperateMatch.status}
                    onChange={(e) => setMatchStatus(activeOperateMatch.id, e.target.value as any)}
                    className="bg-colosseum-900 border border-colosseum-700 text-gold-300 text-xs px-3 py-1.5 rounded-lg font-bold"
                  >
                    <option value="Akan Datang">Akan Datang</option>
                    <option value="Sedang Berlangsung">Sedang Berlangsung (LIVE)</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              {/* 3x3 Scoring Console */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Team A */}
                <div className="p-6 rounded-2xl bg-colosseum-900/80 border border-colosseum-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{activeOperateMatch.teamA.logo}</span>
                      <h4 className="font-bold text-lg text-white">{activeOperateMatch.teamA.name}</h4>
                    </div>
                    <span className="font-tabular font-black text-4xl text-gold-400">{activeOperateMatch.scoreA}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-colosseum-400 uppercase">Input Poin 3x3:</p>
                    <div className="flex gap-2">
                      <button onClick={() => updateMatchScore(activeOperateMatch.id, Math.min(21, activeOperateMatch.scoreA + 1), activeOperateMatch.scoreB, activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || '10:00', activeOperateMatch.timeRemaining || '02:00')} className="flex-1 py-2 rounded-lg bg-colosseum-800 hover:bg-gold-600 hover:text-black font-bold text-gold-300 text-xs transition">+1 Poin (Arc/FT)</button>
                      <button onClick={() => updateMatchScore(activeOperateMatch.id, Math.min(21, activeOperateMatch.scoreA + 2), activeOperateMatch.scoreB, activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || '10:00', activeOperateMatch.timeRemaining || '02:00')} className="flex-1 py-2 rounded-lg bg-colosseum-800 hover:bg-gold-600 hover:text-black font-bold text-gold-300 text-xs transition">+2 Poin (Luar Arc)</button>
                      <button onClick={() => updateMatchScore(activeOperateMatch.id, Math.max(0, activeOperateMatch.scoreA - 1), activeOperateMatch.scoreB, activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || '10:00', activeOperateMatch.timeRemaining || '02:00')} className="py-2 px-3 rounded-lg bg-crimson-950 text-crimson-400 font-bold text-xs hover:bg-crimson-900 transition">-1</button>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-colosseum-400">Team Fouls ({activeOperateMatch.foulsA}):</span>
                    <div className="flex gap-1.5">
                      <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB, activeOperateMatch.foulsA + 1, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || '10:00', activeOperateMatch.timeRemaining || '02:00')} className="px-2.5 py-1 bg-colosseum-800 hover:bg-crimson-900 text-crimson-300 font-bold rounded">+ Foul</button>
                      <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB, Math.max(0, activeOperateMatch.foulsA - 1), activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || '10:00', activeOperateMatch.timeRemaining || '02:00')} className="px-2 py-1 bg-colosseum-800 text-colosseum-400 rounded">-</button>
                    </div>
                  </div>
                </div>

                {/* Team B */}
                <div className="p-6 rounded-2xl bg-colosseum-900/80 border border-colosseum-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{activeOperateMatch.teamB.logo}</span>
                      <h4 className="font-bold text-lg text-white">{activeOperateMatch.teamB.name}</h4>
                    </div>
                    <span className="font-tabular font-black text-4xl text-gold-400">{activeOperateMatch.scoreB}</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-colosseum-400 uppercase">Input Poin 3x3:</p>
                    <div className="flex gap-2">
                      <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, Math.min(21, activeOperateMatch.scoreB + 1), activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || '10:00', activeOperateMatch.timeRemaining || '02:00')} className="flex-1 py-2 rounded-lg bg-colosseum-800 hover:bg-gold-600 hover:text-black font-bold text-gold-300 text-xs transition">+1 Poin (Arc/FT)</button>
                      <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, Math.min(21, activeOperateMatch.scoreB + 2), activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || '10:00', activeOperateMatch.timeRemaining || '02:00')} className="flex-1 py-2 rounded-lg bg-colosseum-800 hover:bg-gold-600 hover:text-black font-bold text-gold-300 text-xs transition">+2 Poin (Luar Arc)</button>
                      <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, Math.max(0, activeOperateMatch.scoreB - 1), activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || '10:00', activeOperateMatch.timeRemaining || '02:00')} className="py-2 px-3 rounded-lg bg-crimson-950 text-crimson-400 font-bold text-xs hover:bg-crimson-900 transition">-1</button>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-colosseum-400">Team Fouls ({activeOperateMatch.foulsB}):</span>
                    <div className="flex gap-1.5">
                      <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB, activeOperateMatch.foulsA, activeOperateMatch.foulsB + 1, activeOperateMatch.currentPeriod || '10:00', activeOperateMatch.timeRemaining || '02:00')} className="px-2.5 py-1 bg-colosseum-800 hover:bg-crimson-900 text-crimson-300 font-bold rounded">+ Foul</button>
                      <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB, activeOperateMatch.foulsA, Math.max(0, activeOperateMatch.foulsB - 1), activeOperateMatch.currentPeriod || '10:00', activeOperateMatch.timeRemaining || '02:00')} className="px-2 py-1 bg-colosseum-800 text-colosseum-400 rounded">-</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-colosseum-800 flex justify-end">
                <button
                  onClick={() => setMatchStatus(activeOperateMatch.id, 'Selesai')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-crimson-700 to-crimson-800 text-white font-bold text-xs uppercase"
                >
                  Selesaikan Pertandingan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. TICKET VERIFICATION */}
        {activeNav === 'tickets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="arena-card rounded-2xl p-4 border-roman space-y-1">
                <p className="text-xs uppercase font-bold text-colosseum-400">Total Pembayaran QRIS</p>
                <p className="font-tabular font-black text-2xl text-gold-400">Rp {totalRevenue.toLocaleString('id-ID')}</p>
                <p className="text-[11px] text-colosseum-500">{totalSold} tiket disetujui</p>
              </div>
              <div className="arena-card rounded-2xl p-4 border-roman space-y-1">
                <p className="text-xs uppercase font-bold text-colosseum-400">Antrean Verifikasi WA</p>
                <p className="font-tabular font-black text-2xl text-amber-400">{pendingVerificationCount}</p>
                <p className="text-[11px] text-colosseum-500">Perlu konfirmasi admin</p>
              </div>
              <div className="arena-card rounded-2xl p-4 border-roman space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase font-bold text-colosseum-400">Kuota Day 1 (14 Nov)</p>
                  <span className="text-[10px] font-bold text-crimson-400 bg-crimson-950/60 px-1.5 py-0.5 rounded border border-crimson-800/40">100 Max</span>
                </div>
                <p className="font-tabular font-black text-2xl text-white">
                  {totalSoldDay1} <span className="text-sm font-normal text-colosseum-500">/ 100</span>
                </p>
                <p className="text-[11px] text-colosseum-400">Sisa kuota: <span className="font-bold text-emerald-400">{Math.max(0, 100 - totalSoldDay1)} tiket</span></p>
              </div>
              <div className="arena-card rounded-2xl p-4 border-roman space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase font-bold text-colosseum-400">Kuota Day 2 (15 Nov)</p>
                  <span className="text-[10px] font-bold text-gold-400 bg-gold-950/60 px-1.5 py-0.5 rounded border border-gold-800/40">100 Max</span>
                </div>
                <p className="font-tabular font-black text-2xl text-white">
                  {totalSoldDay2} <span className="text-sm font-normal text-colosseum-500">/ 100</span>
                </p>
                <p className="text-[11px] text-colosseum-400">Sisa kuota: <span className="font-bold text-emerald-400">{Math.max(0, 100 - totalSoldDay2)} tiket</span></p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['Semua', 'Menunggu Verifikasi', 'Terverifikasi', 'Sudah Ditukar', 'Ditolak'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setTicketStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                      ticketStatusFilter === st
                        ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                        : 'bg-colosseum-900 text-colosseum-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={async () => {
                    setIsRefreshingSync(true);
                    await syncFromSupabase();
                    setTimeout(() => setIsRefreshingSync(false), 500);
                  }}
                  disabled={isRefreshingSync}
                  className="px-3 py-1.5 rounded-xl bg-colosseum-900 hover:bg-colosseum-800 border border-colosseum-700 text-xs text-gold-300 font-bold transition flex items-center gap-1.5 shrink-0"
                  title="Sinkronkan database tiket dari Supabase"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRefreshingSync ? 'animate-spin text-emerald-400' : 'text-gold-400'}`} />
                  <span className="hidden sm:inline">Sinkron Supabase</span>
                </button>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-colosseum-400" />
                  <input
                    type="text"
                    value={ticketSearch}
                    onChange={(e) => setTicketSearch(e.target.value)}
                    placeholder="Cari nama, WA, atau kode..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-colosseum-950 border border-colosseum-800 text-xs text-white placeholder-colosseum-500 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            </div>

            <div className="arena-card rounded-2xl overflow-hidden border-roman">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-colosseum-900/90 text-colosseum-400 uppercase font-bold border-b border-colosseum-800">
                    <tr>
                      <th className="py-3 px-4">Order ID & Kode</th>
                      <th className="py-3 px-4">Pembeli</th>
                      <th className="py-3 px-4">Kategori & Jml</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-colosseum-800/60 bg-colosseum-950/60">
                    {filteredPurchases.map((p) => (
                      <tr key={p.id} className="hover:bg-colosseum-900/40">
                        <td className="py-3 px-4">
                          <p className="font-mono font-bold text-white">{p.id}</p>
                          <p className="font-mono text-gold-400 text-[11px]">{p.ticketCode}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-white">{p.buyerName}</p>
                          <p className="font-mono text-colosseum-400 text-[11px]">{p.buyerWhatsapp}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-white font-medium">{p.tierName}</p>
                          <p className="text-colosseum-400">{p.quantity}x Tiket</p>
                        </td>
                        <td className="py-3 px-4 font-tabular font-bold text-gold-400">
                          Rp {p.totalAmount.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === 'Terverifikasi' ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/40' :
                            p.status === 'Sudah Ditukar' ? 'bg-colosseum-900 text-colosseum-400' :
                            p.status === 'Ditolak' ? 'bg-crimson-950 text-crimson-400' : 'bg-amber-950 text-amber-300'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          {p.status === 'Menunggu Verifikasi' && (
                            <>
                              <button onClick={() => handleApproveTicket(p.id)} className="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px]">Setujui & WA</button>
                              <button onClick={() => setRejectionModalId(p.id)} className="px-2 py-1 rounded-lg bg-crimson-950 text-crimson-300 font-bold text-[11px] border border-crimson-700">Tolak</button>
                            </>
                          )}
                          {p.status === 'Terverifikasi' && (
                            <button onClick={() => redeemTicketAtVenue(p.id)} className="px-3 py-1 rounded-lg bg-colosseum-800 hover:bg-emerald-700 text-white font-bold text-[11px]">Klaim Gelang</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. CHECK-IN VENUE */}
        {activeNav === 'checkin' && (
          <div className="arena-card rounded-3xl p-8 border-roman space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 border-b border-colosseum-800 pb-4">
              <UserCheck className="w-6 h-6 text-emerald-400" />
              <div>
                <h3 className="font-display font-black text-lg text-white uppercase">Booth Penukaran Gelang (Venue Check-in)</h3>
                <p className="text-xs text-colosseum-400">Masukkan kode tiket dari HP pengunjung untuk klaim gelang fisik satu kali.</p>
              </div>
            </div>

            <form onSubmit={handleVenueRedeemSubmit} className="space-y-4">
              <input
                type="text"
                value={redeemInputCode}
                onChange={(e) => setRedeemInputCode(e.target.value)}
                placeholder="Masukkan Kode Tiket (Contoh: IMO-GLD-901-A atau ID: ORD-IMO-901)..."
                className="w-full px-4 py-3 rounded-xl bg-colosseum-950 border border-colosseum-800 text-white font-mono text-center text-lg focus:outline-none focus:border-gold-500"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg"
              >
                Tandai Sudah Ditukar (Klaim Gelang Festival)
              </button>
            </form>

            {redeemFeedback && (
              <div className={`p-4 rounded-xl text-xs font-semibold ${
                redeemFeedback.success 
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50' 
                  : 'bg-crimson-950 text-crimson-300 border border-crimson-600/50'
              }`}>
                {redeemFeedback.message}
              </div>
            )}
          </div>
        )}

        {/* 5. AUDIT LOGS */}
        {activeNav === 'logs' && (
          <div className="arena-card rounded-2xl p-6 border-roman space-y-4">
            <h3 className="font-display font-bold text-sm text-colosseum-100 uppercase tracking-wide border-b border-colosseum-800 pb-3">
              Riwayat Aktivitas & Perubahan (Audit Trail)
            </h3>
            <div className="space-y-2.5">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-colosseum-900/60 border border-colosseum-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-gold-400">{log.action}</span>
                      <span className="text-colosseum-600">&bull;</span>
                      <span className="font-semibold text-white">{log.target}</span>
                    </div>
                    <p className="text-colosseum-300">{log.details}</p>
                  </div>
                  <div className="text-right sm:shrink-0 text-[11px] text-colosseum-500 font-mono">
                    <p>{log.operator}</p>
                    <p>{log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Rejection Modal */}
      {rejectionModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-colosseum-950 border-2 border-crimson-600/60 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-display font-bold text-lg text-white uppercase">Tolak Pembayaran Tiket</h3>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Alasan penolakan..."
              rows={3}
              className="w-full p-3 rounded-xl bg-colosseum-900 border border-colosseum-800 text-xs text-white"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setRejectionModalId(null)} className="px-4 py-2 bg-colosseum-900 text-xs">Batal</button>
              <button onClick={handleConfirmReject} className="px-4 py-2 bg-crimson-700 text-white font-bold text-xs">Tolak</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
