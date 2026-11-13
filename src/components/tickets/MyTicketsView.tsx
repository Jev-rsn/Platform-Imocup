import React, { useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { TicketPurchase } from '../../types/tournament';
import { CONTACT_CONFIG, VENUE_CONFIG, SCHEDULE_CONFIG } from '../../config/eventConfig';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Copy,
  Ticket,
  User,
  LogIn,
  RotateCw,
  Database,
  Lock
} from 'lucide-react';

export const MyTicketsView: React.FC<{ onGoToShop: () => void }> = ({ onGoToShop }) => {
  const { purchases, syncFromSupabase } = useTournament();
  const { customer, openAuthModal, isSupabaseConnected } = useCustomerAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualSync = async () => {
    setIsRefreshing(true);
    try {
      await syncFromSupabase();
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  // Hanya tampilkan tiket yang telah dibeli oleh akun yang sedang login.
  // Jika belum login atau belum daftar akun, daftar tiket WAJIB kosong ([]).
  const myPurchases = customer
    ? purchases.filter(p => {
        const isOwner =
          p.customerId === customer.id ||
          (customer.email && p.buyerEmail.toLowerCase() === customer.email.toLowerCase()) ||
          (customer.whatsapp && p.buyerWhatsapp.replace(/[^0-9]/g, '') === customer.whatsapp.replace(/[^0-9]/g, ''));
        return isOwner;
      })
    : [];

  const filteredPurchases = myPurchases.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.id.toLowerCase().includes(q) ||
      p.ticketCode.toLowerCase().includes(q) ||
      p.buyerName.toLowerCase().includes(q) ||
      p.buyerWhatsapp.includes(q) ||
      p.buyerEmail.toLowerCase().includes(q)
    );
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusBadge = (status: TicketPurchase['status']) => {
    switch (status) {
      case 'Terverifikasi':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/50 font-bold text-[11px] sm:text-xs">
            <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi &bull; Siap Ditukar
          </span>
        );
      case 'Sudah Ditukar':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 font-bold text-[11px] sm:text-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" /> Sudah Ditukar (Redeemed)
          </span>
        );
      case 'Ditolak':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-600 font-bold text-[11px] sm:text-xs">
            <XCircle className="w-3.5 h-3.5" /> Pembayaran Ditolak
          </span>
        );
      case 'Menunggu Verifikasi':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-600/50 font-bold text-[11px] sm:text-xs animate-pulse">
            <Clock className="w-3.5 h-3.5" /> Menunggu Verifikasi WA
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-8">
      
      {/* Title & Shop Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            E-Ticket & Akses Arena
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Tiket Saya
          </h1>
        </div>
        <div className="flex items-center gap-2.5">
          {customer && (
            <button
              onClick={handleManualSync}
              disabled={isRefreshing}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 text-xs font-bold transition flex items-center gap-1.5"
              title="Sinkronkan data dengan Supabase Database"
            >
              <RotateCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sinkron Cloud</span>
            </button>
          )}

          <button
            onClick={onGoToShop}
            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shadow-sm"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Beli Tiket &rarr;</span>
          </button>
        </div>
      </div>

      {/* Customer Account Ribbon if Logged In */}
      {customer ? (
        <div className="p-4 rounded-2xl bg-zinc-900 border border-amber-400/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-black font-black text-sm flex items-center justify-center shrink-0">
              {customer.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{customer.fullName}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-bold uppercase">
                  Akun Penonton
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono flex items-center gap-2 mt-0.5">
                <span>{customer.email}</span>
                {customer.whatsapp && (
                  <>
                    <span>&bull;</span>
                    <span>{customer.whatsapp}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-950 border border-white/10 text-xs text-zinc-300 self-start sm:self-auto">
            <Database className={`w-3.5 h-3.5 ${isSupabaseConnected ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className="text-[11px] font-medium">
              {isSupabaseConnected ? 'Supabase Realtime Sync' : 'Local Storage Mode'}
            </span>
          </div>
        </div>
      ) : null}

      {/* CASE 1: JIKA BELUM LOGIN / BELUM DAFTAR AKUN */}
      {!customer ? (
        <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-14 text-center space-y-4 bg-zinc-900 border border-white/10 shadow-xl max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
              Belum Masuk Akun Penonton
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Tiket hanya dapat diakses oleh akun penonton yang melakukan pemesanan. Silakan masuk atau mendaftar terlebih dahulu untuk melihat tiket yang telah Anda beli.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk ke Akun</span>
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition flex items-center justify-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Daftar Akun Baru</span>
            </button>
            <button
              onClick={onGoToShop}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <Ticket className="w-4 h-4" />
              <span>Beli Tiket</span>
            </button>
          </div>
        </div>
      ) : (
        /* CASE 2: SUDAH LOGIN */
        <div className="space-y-6">
          {/* Search by WhatsApp, Email, or Ticket Code (Jika punya tiket) */}
          {myPurchases.length > 1 && (
            <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-zinc-900 border border-white/10 flex items-center gap-2.5">
              <Search className="w-4 h-4 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Kode Tiket (IMO-DAY...) atau ID Pesanan (ORD-IMO...)"
                className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none font-sans"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-xs text-zinc-400 hover:text-white px-2 py-1">
                  Reset
                </button>
              )}
            </div>
          )}

          {/* Ticket Cards List */}
          <div className="space-y-4 sm:space-y-6">
            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((p) => {
                const isVerified = p.status === 'Terverifikasi';
                const isRedeemed = p.status === 'Sudah Ditukar';

                return (
                  <div 
                    key={p.id}
                    className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-lg"
                  >
                    {/* Status Bar */}
                    <div className="bg-zinc-950 border-b border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-zinc-400 text-[11px] sm:text-xs">ID: {p.id}</span>
                        <span className="text-zinc-600">&bull;</span>
                        <span className="text-zinc-400 text-[11px] hidden sm:inline">{p.createdAt}</span>
                        {p.customerId && (
                          <>
                            <span className="text-zinc-600">&bull;</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                              Cloud Synced
                            </span>
                          </>
                        )}
                      </div>
                      {getStatusBadge(p.status)}
                    </div>

                    {/* Ticket Body */}
                    <div className="p-4 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
                      
                      {/* Left Column: Details */}
                      <div className="md:col-span-8 space-y-3.5">
                        <div>
                          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-white/10">
                            {p.tierName} &bull; {p.quantity} Tiket
                          </span>
                          <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wide mt-1.5">
                            Imonoke Cup 3x3 2026
                          </h3>
                          <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                            <span>{VENUE_CONFIG.FULL_NAME}</span>
                          </p>
                        </div>

                        {/* Buyer Specs */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-zinc-950/70 p-3 sm:p-3.5 rounded-xl border border-white/5">
                          <div>
                            <p className="text-zinc-500 text-[10px] uppercase font-bold">Nama Pemegang</p>
                            <p className="font-semibold text-zinc-200 truncate">{p.buyerName}</p>
                          </div>
                          <div>
                            <p className="text-zinc-500 text-[10px] uppercase font-bold">WhatsApp</p>
                            <p className="font-semibold text-zinc-200 font-mono truncate">{p.buyerWhatsapp}</p>
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <p className="text-zinc-500 text-[10px] uppercase font-bold">Total Pembayaran</p>
                            <p className="font-tabular font-bold text-amber-400">Rp {p.totalAmount.toLocaleString('id-ID')}</p>
                          </div>
                        </div>

                        {/* Venue Exchange Warning or Notes */}
                        {isVerified && (
                          <div className="p-3 bg-emerald-950/60 border border-emerald-600/40 rounded-xl text-xs text-emerald-300 leading-relaxed">
                            <strong>Siap Ditukarkan:</strong> Tunjukkan Kode Tiket ini ke panitia di venue {VENUE_CONFIG.NAME} pada {SCHEDULE_CONFIG.DATES_LABEL} untuk ditukar menjadi gelang festival fisik (wristband).
                          </div>
                        )}

                        {isRedeemed && (
                          <div className="p-3 bg-zinc-950 border border-white/10 rounded-xl text-xs text-zinc-400">
                            Tiket ini telah berhasil ditukarkan di venue pada: <strong className="text-white">{p.redeemedAt}</strong>.
                          </div>
                        )}

                        {p.status === 'Menunggu Verifikasi' && (
                          <div className="p-3 bg-amber-950/60 border border-amber-600/40 rounded-xl text-xs text-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                            <p className="leading-relaxed">
                              <strong>Sedang Diverifikasi:</strong> Pastikan Anda telah mengirimkan bukti transfer via WhatsApp ke {CONTACT_CONFIG.PANITIA_WHATSAPP} agar tiket Anda aktif.
                            </p>
                            <a
                              href={`https://wa.me/${CONTACT_CONFIG.WHATSAPP_INTL}?text=${encodeURIComponent(`Halo Admin, konfirmasi pembayaran tiket ${p.id} atas nama ${p.buyerName} (${p.tierName})`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="shrink-0 w-full sm:w-auto text-center px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition text-xs"
                            >
                              Chat Admin (WA)
                            </a>
                          </div>
                        )}

                        {p.status === 'Ditolak' && (
                          <div className="p-3 bg-rose-950/60 border border-rose-600/40 rounded-xl text-xs text-rose-300">
                            <strong>Alasan Penolakan:</strong> {p.rejectionReason || 'Bukti pembayaran tidak sesuai atau tidak terbaca. Silakan hubungi admin panitia.'}
                          </div>
                        )}
                      </div>

                      {/* Right Column: Ticket Code & QR */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl bg-zinc-950 border border-white/5 space-y-2.5 text-center">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                          Kode Tiket Resmi
                        </p>
                        
                        <div className="font-mono font-black text-base sm:text-lg text-amber-400 tracking-wider px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 select-all">
                          {p.ticketCode}
                        </div>

                        <button
                          onClick={() => handleCopy(p.ticketCode)}
                          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedCode === p.ticketCode ? 'Tersalin!' : 'Salin Kode'}</span>
                        </button>

                        {/* QR Preview */}
                        <div className="bg-white p-2 rounded-xl">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(p.ticketCode)}`}
                            alt="QR Code Tiket"
                            className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                          />
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono">
                          Scan di Gate Masuk GKB FIP UM
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl sm:rounded-3xl p-8 sm:p-14 text-center space-y-4 bg-zinc-900 border border-white/10 shadow-lg max-w-2xl mx-auto">
                <Ticket className="w-12 h-12 text-zinc-500 mx-auto" />
                <div className="space-y-1.5">
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                    Belum Ada Tiket yang Dibeli
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Halo <strong className="text-white">{customer.fullName}</strong>, akun Anda belum memiliki riwayat pembelian tiket pertandingan Imonoke Cup 3x3.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={onGoToShop}
                    className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md inline-flex items-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Beli Tiket Masuk Sekarang</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
