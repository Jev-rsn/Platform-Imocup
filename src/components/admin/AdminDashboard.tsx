import React, { useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Send, 
  RotateCcw, 
  Flame, 
  Trophy, 
  History, 
  Search, 
  UserCheck, 
  DollarSign, 
  QrCode,
  Users,
  Plus
} from 'lucide-react';
import { TournamentCategory, Match } from '../../types/tournament';

export const AdminDashboard: React.FC = () => {
  const { 
    purchases, 
    verifyTicketPayment, 
    redeemTicketAtVenue, 
    tickets, 
    matches, 
    updateMatchScore, 
    setMatchStatus,
    brackets,
    advanceBracketWinner,
    auditLogs,
    resetAllData
  } = useTournament();

  const [activeTab, setActiveTab] = useState<'tickets' | 'live' | 'brackets' | 'logs'>('tickets');
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

  // Bracket category
  const [bracketCategory, setBracketCategory] = useState<TournamentCategory>('SMA Putra');

  // Stats calculation
  const totalRevenue = purchases
    .filter(p => p.status === 'Terverifikasi' || p.status === 'Sudah Ditukar')
    .reduce((acc, p) => acc + p.totalAmount, 0);

  const totalSold = purchases
    .filter(p => p.status === 'Terverifikasi' || p.status === 'Sudah Ditukar')
    .reduce((acc, p) => acc + p.quantity, 0);

  const pendingVerificationCount = purchases.filter(p => p.status === 'Menunggu Verifikasi').length;

  // Filtered tickets
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

    // Create WhatsApp confirmation url
    const message = encodeURIComponent(
      `Halo ${purchase.buyerName}!\n\nPembayaran tiket Anda (${purchase.tierName}) dengan Kode Transaksi ${purchase.id} telah BERHASIL DIVERIFIKASI oleh Panitia Imonoke Cup (Battle of Colosseum).\n\nBerikut Kode Tiket Resmi Anda:\n🎟️ *${purchase.ticketCode}*\n\nSilakan tunjukkan kode tiket ini atau akses menu "Tiket Saya" pada website kami saat registrasi offline di booth venue untuk penukaran gelang festival fisik (wristband).\n\nSampai jumpa di arena Gladiator!`
    );
    const waUrl = `https://wa.me/${purchase.buyerWhatsapp.replace(/^0/, '62')}?text=${message}`;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-colosseum-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-gold-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Panel Pengelola &bull; Colosseum Command Center
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-colosseum-50 uppercase tracking-tight mt-1">
            Dashboard Panitia & Operator
          </h1>
        </div>

        <button
          onClick={() => {
            if (confirm('Reset seluruh data turnamen, skor, dan tiket kembali ke pengaturan awal (default)?')) {
              resetAllData();
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-colosseum-900 hover:bg-crimson-950 text-colosseum-400 hover:text-crimson-300 text-xs font-semibold border border-colosseum-800 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Data Demo</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="arena-card rounded-2xl p-5 border-roman space-y-1">
          <p className="text-xs uppercase font-bold text-colosseum-400">Total Pendapatan Tiket (QRIS)</p>
          <p className="font-tabular font-black text-2xl text-gold-400">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </p>
          <p className="text-[11px] text-colosseum-500">{totalSold} tiket terverifikasi</p>
        </div>

        <div className="arena-card rounded-2xl p-5 border-roman space-y-1">
          <p className="text-xs uppercase font-bold text-colosseum-400">Menunggu Verifikasi WA</p>
          <p className="font-tabular font-black text-2xl text-amber-400">
            {pendingVerificationCount} <span className="text-sm font-normal text-colosseum-400">Pesanan</span>
          </p>
          <p className="text-[11px] text-colosseum-500">Perlu tindakan persetujuan panitia</p>
        </div>

        <div className="arena-card rounded-2xl p-5 border-roman space-y-1">
          <p className="text-xs uppercase font-bold text-colosseum-400">Pertandingan Aktif</p>
          <p className="font-tabular font-black text-2xl text-crimson-400">
            {matches.filter(m => m.status === 'Sedang Berlangsung').length} <span className="text-sm font-normal text-colosseum-400">Court LIVE</span>
          </p>
          <p className="text-[11px] text-colosseum-500">Dapat dikontrol real-time via Operator</p>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-colosseum-800">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
            activeTab === 'tickets'
              ? 'bg-gradient-to-r from-crimson-800 to-crimson-900 text-gold-300 border border-gold-500/40 shadow-md'
              : 'text-colosseum-400 hover:text-white bg-colosseum-950'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Verifikasi Tiket & Kasir ({pendingVerificationCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('live')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
            activeTab === 'live'
              ? 'bg-gradient-to-r from-crimson-800 to-crimson-900 text-gold-300 border border-gold-500/40 shadow-md'
              : 'text-colosseum-400 hover:text-white bg-colosseum-950'
          }`}
        >
          <Flame className="w-4 h-4 text-crimson-400" />
          <span>Operator Skor Live</span>
        </button>

        <button
          onClick={() => setActiveTab('brackets')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
            activeTab === 'brackets'
              ? 'bg-gradient-to-r from-crimson-800 to-crimson-900 text-gold-300 border border-gold-500/40 shadow-md'
              : 'text-colosseum-400 hover:text-white bg-colosseum-950'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Manajemen Babak Gugur</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
            activeTab === 'logs'
              ? 'bg-gradient-to-r from-crimson-800 to-crimson-900 text-gold-300 border border-gold-500/40 shadow-md'
              : 'text-colosseum-400 hover:text-white bg-colosseum-950'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Audit Log Aktivitas</span>
        </button>
      </div>

      {/* TAB 1: TICKETS VERIFICATION & REDEMPTION */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          
          {/* Fast Venue Check-in / Redemption Bar */}
          <div className="arena-card rounded-2xl p-5 border-roman space-y-3">
            <h3 className="font-display font-bold text-sm text-colosseum-100 uppercase tracking-wide flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Booth Penukaran Fisik di Venue (Check-in Scanner / Input)</span>
            </h3>
            <form onSubmit={handleVenueRedeemSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={redeemInputCode}
                onChange={(e) => setRedeemInputCode(e.target.value)}
                placeholder="Masukkan Kode Tiket (Contoh: IMO-GLD-901-A atau ID: ORD-IMO-901)..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-colosseum-950 border border-colosseum-800 text-sm font-mono text-white focus:outline-none focus:border-gold-500"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition shadow shrink-0"
              >
                Tandai Sudah Ditukar (Klaim Gelang)
              </button>
            </form>

            {redeemFeedback && (
              <div className={`p-3 rounded-xl text-xs font-semibold ${
                redeemFeedback.success 
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50' 
                  : 'bg-crimson-950 text-crimson-300 border border-crimson-600/50'
              }`}>
                {redeemFeedback.message}
              </div>
            )}
          </div>

          {/* Filters & Search */}
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

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-colosseum-400" />
              <input
                type="text"
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
                placeholder="Cari nama, WA, atau ID..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-colosseum-950 border border-colosseum-800 text-xs text-white placeholder-colosseum-500 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Transactions Table */}
          <div className="arena-card rounded-2xl overflow-hidden border-roman">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-colosseum-900/90 text-colosseum-400 uppercase font-bold border-b border-colosseum-800">
                  <tr>
                    <th className="py-3 px-4">Order & Kode</th>
                    <th className="py-3 px-4">Pembeli & Kontak</th>
                    <th className="py-3 px-4">Kategori & Jml</th>
                    <th className="py-3 px-4">Total Transfer</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Aksi Panitia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-colosseum-800/60 bg-colosseum-950/60">
                  {filteredPurchases.length > 0 ? (
                    filteredPurchases.map((p) => (
                      <tr key={p.id} className="hover:bg-colosseum-900/40 transition">
                        <td className="py-3.5 px-4">
                          <p className="font-mono font-bold text-white">{p.id}</p>
                          <p className="font-mono text-gold-400 text-[11px]">{p.ticketCode}</p>
                          <p className="text-[10px] text-colosseum-500">{p.createdAt}</p>
                        </td>

                        <td className="py-3.5 px-4 space-y-0.5">
                          <p className="font-semibold text-colosseum-100">{p.buyerName}</p>
                          <p className="font-mono text-colosseum-400 text-[11px]">{p.buyerWhatsapp}</p>
                          <p className="text-[10px] text-colosseum-500 truncate max-w-[150px]">{p.buyerEmail}</p>
                        </td>

                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-colosseum-200">{p.tierName}</p>
                          <p className="text-[11px] text-colosseum-400">{p.quantity}x Tiket</p>
                        </td>

                        <td className="py-3.5 px-4 font-tabular">
                          <p className="font-bold text-gold-400">
                            Rp {p.totalAmount.toLocaleString('id-ID')}
                          </p>
                          <p className="text-[10px] text-colosseum-500">Kode Unik: {p.uniqueCode}</p>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === 'Terverifikasi'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-600/40'
                              : p.status === 'Sudah Ditukar'
                              ? 'bg-colosseum-900 text-colosseum-400 border border-colosseum-700'
                              : p.status === 'Ditolak'
                              ? 'bg-crimson-950 text-crimson-400 border border-crimson-600/40'
                              : 'bg-amber-950 text-amber-300 border border-amber-600/40 animate-pulse'
                          }`}>
                            {p.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right space-x-2">
                          {p.status === 'Menunggu Verifikasi' && (
                            <>
                              <button
                                onClick={() => handleApproveTicket(p.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] transition shadow"
                                title="Setujui & Buka WhatsApp konfirmasi"
                              >
                                Setujui & WA
                              </button>
                              <button
                                onClick={() => setRejectionModalId(p.id)}
                                className="px-2.5 py-1.5 rounded-lg bg-crimson-950 hover:bg-crimson-900 text-crimson-300 font-bold text-[11px] border border-crimson-700 transition"
                              >
                                Tolak
                              </button>
                            </>
                          )}

                          {p.status === 'Terverifikasi' && (
                            <button
                              onClick={() => redeemTicketAtVenue(p.id)}
                              className="px-3 py-1.5 rounded-lg bg-colosseum-800 hover:bg-emerald-700 text-white font-bold text-[11px] transition"
                            >
                              Klaim Wristband
                            </button>
                          )}

                          {p.status === 'Sudah Ditukar' && (
                            <span className="text-[11px] text-colosseum-500 italic">Selesai Ditukar</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-colosseum-400">
                        Tidak ada transaksi pada filter ini.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: LIVE SCORE OPERATOR */}
      {activeTab === 'live' && activeOperateMatch && (
        <div className="space-y-6">
          {/* Match selector */}
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

          {/* Operator Board */}
          <div className="arena-card rounded-3xl p-6 sm:p-8 border-roman space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-colosseum-800 pb-4">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">{activeOperateMatch.category} &bull; {activeOperateMatch.stage}</span>
                <h3 className="font-display font-black text-2xl text-colosseum-50 uppercase mt-0.5">
                  {activeOperateMatch.teamA.name} VS {activeOperateMatch.teamB.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-colosseum-400">Status Saat Ini:</span>
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

            {/* Scoreboard Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Team A Console */}
              <div className="p-6 rounded-2xl bg-colosseum-900/80 border border-colosseum-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{activeOperateMatch.teamA.logo}</span>
                    <h4 className="font-bold text-lg text-white">{activeOperateMatch.teamA.name}</h4>
                  </div>
                  <span className="font-tabular font-black text-4xl text-gold-400">{activeOperateMatch.scoreA}</span>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-colosseum-400 uppercase">Tambah Poin:</p>
                  <div className="flex gap-2">
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA + 1, activeOperateMatch.scoreB, activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="flex-1 py-2 rounded-lg bg-colosseum-800 hover:bg-gold-600 hover:text-black font-bold text-gold-300 text-xs transition">+1</button>
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA + 2, activeOperateMatch.scoreB, activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="flex-1 py-2 rounded-lg bg-colosseum-800 hover:bg-gold-600 hover:text-black font-bold text-gold-300 text-xs transition">+2</button>
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA + 3, activeOperateMatch.scoreB, activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="flex-1 py-2 rounded-lg bg-colosseum-800 hover:bg-gold-600 hover:text-black font-bold text-gold-300 text-xs transition">+3</button>
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, Math.max(0, activeOperateMatch.scoreA - 1), activeOperateMatch.scoreB, activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="py-2 px-3 rounded-lg bg-crimson-950 text-crimson-400 font-bold text-xs hover:bg-crimson-900 transition">-1</button>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-colosseum-400">Team Fouls ({activeOperateMatch.foulsA}):</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB, activeOperateMatch.foulsA + 1, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="px-2.5 py-1 bg-colosseum-800 hover:bg-crimson-900 text-crimson-300 font-bold rounded">+ Foul</button>
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB, Math.max(0, activeOperateMatch.foulsA - 1), activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="px-2 py-1 bg-colosseum-800 text-colosseum-400 rounded">-</button>
                  </div>
                </div>
              </div>

              {/* Team B Console */}
              <div className="p-6 rounded-2xl bg-colosseum-900/80 border border-colosseum-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{activeOperateMatch.teamB.logo}</span>
                    <h4 className="font-bold text-lg text-white">{activeOperateMatch.teamB.name}</h4>
                  </div>
                  <span className="font-tabular font-black text-4xl text-gold-400">{activeOperateMatch.scoreB}</span>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-colosseum-400 uppercase">Tambah Poin:</p>
                  <div className="flex gap-2">
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB + 1, activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="flex-1 py-2 rounded-lg bg-colosseum-800 hover:bg-gold-600 hover:text-black font-bold text-gold-300 text-xs transition">+1</button>
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB + 2, activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="flex-1 py-2 rounded-lg bg-colosseum-800 hover:bg-gold-600 hover:text-black font-bold text-gold-300 text-xs transition">+2</button>
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB + 3, activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="flex-1 py-2 rounded-lg bg-colosseum-800 hover:bg-gold-600 hover:text-black font-bold text-gold-300 text-xs transition">+3</button>
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, Math.max(0, activeOperateMatch.scoreB - 1), activeOperateMatch.foulsA, activeOperateMatch.foulsB, activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="py-2 px-3 rounded-lg bg-crimson-950 text-crimson-400 font-bold text-xs hover:bg-crimson-900 transition">-1</button>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-colosseum-400">Team Fouls ({activeOperateMatch.foulsB}):</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB, activeOperateMatch.foulsA, activeOperateMatch.foulsB + 1, activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="px-2.5 py-1 bg-colosseum-800 hover:bg-crimson-900 text-crimson-300 font-bold rounded">+ Foul</button>
                    <button onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB, activeOperateMatch.foulsA, Math.max(0, activeOperateMatch.foulsB - 1), activeOperateMatch.currentPeriod || 'Q4', activeOperateMatch.timeRemaining || '02:00')} className="px-2 py-1 bg-colosseum-800 text-colosseum-400 rounded">-</button>
                  </div>
                </div>
              </div>

            </div>

            {/* Quarter & Game Clock Setting */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-colosseum-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-colosseum-300">Babak:</span>
                {['Q1', 'Q2', 'Q3', 'Q4', 'OT'].map((q) => (
                  <button
                    key={q}
                    onClick={() => updateMatchScore(activeOperateMatch.id, activeOperateMatch.scoreA, activeOperateMatch.scoreB, activeOperateMatch.foulsA, activeOperateMatch.foulsB, q, activeOperateMatch.timeRemaining || '02:00')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                      activeOperateMatch.currentPeriod === q
                        ? 'bg-crimson-800 text-gold-300 border border-gold-500/40'
                        : 'bg-colosseum-800 text-colosseum-400 hover:text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 text-xs">
                <button
                  onClick={() => setMatchStatus(activeOperateMatch.id, 'Selesai')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-crimson-700 to-crimson-800 hover:from-crimson-600 hover:to-crimson-700 text-white font-bold uppercase tracking-wider transition shadow"
                >
                  Tutup Pertandingan (Finalize Result)
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: BRACKET MANAGEMENT & ADVANCE WINNERS (FR-5.5, FR-5.6) */}
      {activeTab === 'brackets' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-colosseum-800 pb-3">
            <div className="flex items-center gap-2">
              {(['SMA Putra', 'SMA Putri', 'Umum'] as TournamentCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setBracketCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
                    bracketCategory === cat
                      ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                      : 'text-colosseum-400 hover:text-white bg-colosseum-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="text-xs text-colosseum-400 hidden sm:inline">
              Pilih tim pemenang untuk meloloskannya otomatis ke bagan babak berikutnya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(brackets[bracketCategory] || []).map((node) => {
              const isFinished = node.status === 'Selesai';

              return (
                <div key={node.id} className="arena-card rounded-2xl p-5 border-roman space-y-4">
                  <div className="flex items-center justify-between text-xs text-colosseum-400 border-b border-colosseum-800 pb-2">
                    <span className="font-bold text-gold-400">{node.roundName}</span>
                    <span>{node.date} &bull; {node.time}</span>
                  </div>

                  <div className="space-y-2">
                    {/* Team A Slot */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-colosseum-900 border border-colosseum-800">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base">{node.teamA?.logo || '🛡️'}</span>
                        <span className="text-xs font-bold text-white truncate">{node.teamA?.name || 'TBD'}</span>
                      </div>
                      {node.teamA && (
                        <button
                          onClick={() => advanceBracketWinner(bracketCategory, node.id, node.teamA!.id)}
                          className={`text-[10px] font-black uppercase px-2 py-1 rounded transition ${
                            node.winnerId === node.teamA.id
                              ? 'bg-gold-500 text-black font-extrabold'
                              : 'bg-colosseum-800 text-gold-400 hover:bg-gold-600 hover:text-black'
                          }`}
                        >
                          {node.winnerId === node.teamA.id ? 'Juara / Lolos' : 'Tandai Lolos'}
                        </button>
                      )}
                    </div>

                    {/* Team B Slot */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-colosseum-900 border border-colosseum-800">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base">{node.teamB?.logo || '🛡️'}</span>
                        <span className="text-xs font-bold text-white truncate">{node.teamB?.name || 'TBD'}</span>
                      </div>
                      {node.teamB && (
                        <button
                          onClick={() => advanceBracketWinner(bracketCategory, node.id, node.teamB!.id)}
                          className={`text-[10px] font-black uppercase px-2 py-1 rounded transition ${
                            node.winnerId === node.teamB.id
                              ? 'bg-gold-500 text-black font-extrabold'
                              : 'bg-colosseum-800 text-gold-400 hover:bg-gold-600 hover:text-black'
                          }`}
                        >
                          {node.winnerId === node.teamB.id ? 'Juara / Lolos' : 'Tandai Lolos'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-[11px] text-colosseum-500 flex justify-between items-center">
                    <span>Status: <strong className="text-colosseum-300">{node.status}</strong></span>
                    {node.winnerId && <span className="text-gold-400 font-bold">Lolos ke Tahap Lanjutan</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="arena-card rounded-2xl p-6 border-roman space-y-4">
          <div className="flex items-center justify-between border-b border-colosseum-800 pb-3">
            <h3 className="font-display font-bold text-sm text-colosseum-100 uppercase tracking-wide">
              Riwayat Aktivitas & Perubahan (Audit Trail)
            </h3>
            <span className="text-xs text-colosseum-400">Total {auditLogs.length} Entri</span>
          </div>

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

      {/* Rejection Modal */}
      {rejectionModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-colosseum-950 border-2 border-crimson-600/60 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-display font-bold text-lg text-white uppercase">
              Tolak Pembayaran Tiket
            </h3>
            <p className="text-xs text-colosseum-300">
              Silakan tuliskan alasan penolakan bukti pembayaran. Catatan ini akan dicatat di status pemesan.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Contoh: Nominal transfer kurang dari total tagihan / Bukti transfer buram..."
              rows={3}
              className="w-full p-3 rounded-xl bg-colosseum-900 border border-colosseum-800 text-xs text-white placeholder-colosseum-500 focus:outline-none focus:border-crimson-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectionModalId(null)}
                className="px-4 py-2 rounded-xl bg-colosseum-900 text-colosseum-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-crimson-700 hover:bg-crimson-600 text-white font-bold text-xs uppercase transition"
              >
                Konfirmasi Penolakan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
