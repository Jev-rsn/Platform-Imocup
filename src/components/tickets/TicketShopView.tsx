import React, { useState } from 'react';
import { useTournament } from '../../context/TournamentContext';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { TicketTier, TicketPurchase } from '../../types/tournament';
import { TicketCheckoutModal } from './TicketCheckoutModal';
import { VENUE_CONFIG, SCHEDULE_CONFIG, CONTACT_CONFIG } from '../../config/eventConfig';
import { Ticket, Check, HelpCircle, Lock, UserCheck, LogIn, UserPlus } from 'lucide-react';

export const TicketShopView: React.FC<{ onGoToMyTickets: () => void }> = ({ onGoToMyTickets }) => {
  const { tickets } = useTournament();
  const { customer, openAuthModal } = useCustomerAuth();
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);

  const handleOrderSuccess = (purchase: TicketPurchase) => {
    onGoToMyTickets();
  };

  const handleTierSelect = (tier: TicketTier) => {
    if (!customer) {
      openAuthModal('login');
      return;
    }
    setSelectedTier(tier);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Ticket className="w-3.5 h-3.5" />
          <span>Tiket Resmi &bull; Pembayaran QRIS</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Tiket Masuk Arena 3x3
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          1 tiket berlaku khusus untuk 1 hari pertandingan di {VENUE_CONFIG.FULL_NAME}. Kuota dibatasi ketat 100 tiket per hari (Sabtu & Minggu, 14 & 15 Nov 2026). Tiket Day 1 (Sabtu, 14 Nov) Rp {SCHEDULE_CONFIG.DAY_1.TICKET_PRICE.toLocaleString('id-ID')} dan Tiket Day 2 Final (Minggu, 15 Nov) Rp {SCHEDULE_CONFIG.DAY_2.TICKET_PRICE.toLocaleString('id-ID')}. Kuota tiket resmi hanya berkurang setelah pembayaran diverifikasi panitia (WA {CONTACT_CONFIG.PANITIA_WHATSAPP}).
        </p>
      </div>

      {/* Mandatory Customer Auth Banner */}
      <div className="max-w-4xl mx-auto">
        {customer ? (
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white font-bold text-sm flex items-center gap-2">
                  <span>Akun Aktif: {customer.fullName}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    Database Connected
                  </span>
                </p>
                <p className="text-zinc-400 text-[11px] mt-0.5">
                  Email: {customer.email} &bull; Tiket yang dipesan akan otomatis tersimpan lengkap di database akun Anda.
                </p>
              </div>
            </div>

            <button
              onClick={onGoToMyTickets}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-semibold text-xs border border-white/10 transition self-start sm:self-auto shrink-0"
            >
              Lihat Tiket Saya &rarr;
            </button>
          </div>
        ) : (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-lg">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold shrink-0 mt-0.5 sm:mt-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-amber-300 font-bold text-sm sm:text-base">
                  Wajib Masuk / Daftar Akun Sebelum Membeli Tiket
                </h3>
                <p className="text-zinc-300 text-xs mt-0.5 max-w-xl leading-relaxed">
                  Agar seluruh data tiket, kode QR masuk, dan riwayat verifikasi pembayaran QRIS Anda tersimpan secara lengkap di database resmi turnamen, silakan masuk ke akun penonton terlebih dahulu.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => openAuthModal('login')}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk Akun</span>
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Baru</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ticket Cards Grid (2 Tiers: Day 1 & Day 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
        {tickets.map((t) => {
          const isSoldOut = t.remainingQuota <= 0;
          const quotaPercentage = Math.round((t.remainingQuota / t.totalQuota) * 100);

          return (
            <div
              key={t.id}
              className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all bg-zinc-900/80 border ${
                t.isPopular
                  ? 'border-amber-500/50 shadow-md ring-1 ring-amber-500/30'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Popular Badge */}
              {t.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-black font-extrabold text-[10px] uppercase tracking-wider shadow">
                  Paling Diminati &bull; Best View
                </div>
              )}

              <div className="space-y-5">
                
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span className="font-semibold uppercase tracking-wider">{t.validDays}</span>
                    <span className="text-amber-400 font-mono font-bold">{t.remainingQuota} sisa</span>
                  </div>
                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                    {t.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">{t.tagline}</p>
                </div>

                {/* Price Display */}
                <div className="py-4 border-y border-white/5 space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-zinc-400">Rp</span>
                    <span className="font-mono font-black text-3xl sm:text-4xl text-white">
                      {t.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-zinc-400">/ tiket</span>
                  </div>
                  
                  {/* Quota Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          quotaPercentage < 20 ? 'bg-rose-500' : 'bg-amber-400'
                        }`}
                        style={{ width: `${quotaPercentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                      <span className="text-[10px] text-zinc-500">Kuota Resmi 100/Hari</span>
                      <span className="font-bold text-amber-400">{t.remainingQuota} sisa dari {t.totalQuota}</span>
                    </div>
                  </div>
                </div>

                {/* Perks Checklist */}
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Fasilitas Termasuk:
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-400">
                    {t.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-snug text-zinc-300">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Purchase Action Button */}
              <div className="pt-6">
                <button
                  disabled={isSoldOut}
                  onClick={() => handleTierSelect(t)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                    isSoldOut
                      ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                      : !customer
                      ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-md'
                      : t.isPopular
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-white/5'
                  }`}
                >
                  {isSoldOut ? (
                    <span>Tiket Habis</span>
                  ) : !customer ? (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Masuk Akun untuk Beli Tiket</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Pesan Tiket Sekarang</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Verification & Offline Redemption Flow Guide */}
      <div className="rounded-2xl p-6 sm:p-7 bg-zinc-900/70 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-sm text-white uppercase tracking-wider">
            Alur Pembelian & Penukaran Tiket
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5 p-4 rounded-xl bg-zinc-950/60 border border-white/5">
            <span className="font-mono font-bold text-xs text-amber-400">01</span>
            <h4 className="font-bold text-white text-sm">Pembayaran via QRIS</h4>
            <p className="text-zinc-400 leading-relaxed">
              Pilih tiket, isi identitas, dan lakukan transfer tepat sesuai kode unik menggunakan aplikasi mobile banking atau e-wallet.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-zinc-950/60 border border-white/5">
            <span className="font-mono font-bold text-xs text-amber-400">02</span>
            <h4 className="font-bold text-white text-sm">Konfirmasi WhatsApp</h4>
            <p className="text-zinc-400 leading-relaxed">
              Kirimkan bukti transfer ke WhatsApp panitia turnamen. Panitia memverifikasi dan sistem langsung mengaktifkan kode tiket Anda.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-zinc-950/60 border border-white/5">
            <span className="font-mono font-bold text-xs text-amber-400">03</span>
            <h4 className="font-bold text-white text-sm">Check-in Wristband di Venue</h4>
            <p className="text-zinc-400 leading-relaxed">
              Tunjukkan Kode Tiket pada menu &ldquo;Tiket Saya&rdquo; di Booth Panitia GKB FIP UM untuk ditukar gelang wristband fisik.
            </p>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <TicketCheckoutModal
        tier={selectedTier}
        onClose={() => setSelectedTier(null)}
        onSuccess={handleOrderSuccess}
      />

    </div>
  );
};
