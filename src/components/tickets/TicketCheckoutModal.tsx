import React, { useState, useEffect } from 'react';
import { TicketTier, TicketPurchase } from '../../types/tournament';
import { useTournament } from '../../context/TournamentContext';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { 
  getTicketVerificationWhatsAppUrl, 
  CONTACT_CONFIG, 
  TICKET_CONFIG,
  EVENT_CONFIG
} from '../../config/eventConfig';
import { X, CheckCircle2, Copy, Send, ArrowRight, Clock, User, LogIn, Database, Lock, UserPlus, Download } from 'lucide-react';

interface TicketCheckoutModalProps {
  tier: TicketTier | null;
  onClose: () => void;
  onSuccess: (purchase: TicketPurchase) => void;
}

export const TicketCheckoutModal: React.FC<TicketCheckoutModalProps> = ({ tier, onClose, onSuccess }) => {
  const { purchaseTicket } = useTournament();
  const { customer, openAuthModal, isSupabaseConnected } = useCustomerAuth();

  const [step, setStep] = useState<'form' | 'payment' | 'done'>('form');
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: ''
  });
  const [createdPurchase, setCreatedPurchase] = useState<TicketPurchase | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill form data if customer is logged in
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.fullName || '',
        whatsapp: customer.whatsapp || '',
        email: customer.email || ''
      });
    }
  }, [customer]);

  if (!tier) return null;

  const handleSubmitData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) {
      openAuthModal('login');
      return;
    }
    if (!formData.name || !formData.whatsapp || !formData.email) return;

    setIsSubmitting(true);
    try {
      const purchase = await purchaseTicket({
        tierId: tier.id,
        buyerName: formData.name,
        buyerWhatsapp: formData.whatsapp,
        buyerEmail: formData.email,
        quantity,
        customerId: customer.id
      });

      setCreatedPurchase(purchase);
      setStep('payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waUrl = createdPurchase ? getTicketVerificationWhatsAppUrl(createdPurchase) : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl bg-zinc-950 border border-white/10 p-5 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-8">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
            Pemesanan Tiket Resmi 3x3
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight mt-0.5">
            {tier.name}
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">{tier.tagline}</p>
        </div>

        {/* Customer Account Indicator if Logged In */}
        {customer && (
          <div className="p-3 rounded-xl bg-zinc-900 border border-emerald-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
                {customer.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <span>{customer.fullName}</span>
                  <span className="text-[10px] text-zinc-400 font-normal">({customer.email})</span>
                </p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <Database className="w-3 h-3 text-emerald-400" />
                  Tiket akan otomatis terhubung & tersimpan ke database akun Anda
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 shrink-0">
              Akun Aktif
            </span>
          </div>
        )}

        {/* MANDATORY LOGIN GATE (Jika belum login) */}
        {!customer ? (
          <div className="p-6 rounded-2xl bg-zinc-900/90 border border-amber-500/30 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                Wajib Masuk / Daftar Akun Penonton
              </h3>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                Setiap pemesan tiket wajib login terlebih dahulu agar kode tiket, riwayat pembayaran QRIS, dan status verifikasi tersimpan lengkap di database akun Anda.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk ke Akun</span>
              </button>
              <button
                type="button"
                onClick={() => openAuthModal('register')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Akun Baru</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* STEP 1: FORM */}
            {step === 'form' && (
          <form onSubmit={handleSubmitData} className="space-y-4">
            
            {/* Quantity Selector */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-zinc-200 uppercase">Jumlah Tiket</label>
                <p className="text-[11px] text-zinc-400">Maks. 5 tiket per pesanan</p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-black text-lg transition flex items-center justify-center border border-white/5"
                >
                  -
                </button>
                <span className="font-mono font-black text-lg text-amber-400 px-2">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(5, tier.remainingQuota, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-black text-lg transition flex items-center justify-center border border-white/5"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buyer Contact Fields */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Nama Lengkap Pemesan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Arya Bintang Nugraha"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Alamat Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="Contoh: arya@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition"
                />
              </div>
            </div>

            {/* Price Total & Submit */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <p className="text-[11px] text-zinc-400">Total Pembayaran</p>
                <p className="font-mono font-black text-xl text-amber-400">
                  Rp {(tier.price * quantity).toLocaleString('id-ID')}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md"
              >
                <span>{isSubmitting ? 'Memproses ke Database...' : 'Lanjut Bayar QRIS'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

        {/* STEP 2: QRIS PAYMENT */}
        {step === 'payment' && createdPurchase && (
          <div className="space-y-4 text-center">
            
            <div className="p-3 bg-amber-950/60 border border-amber-600/40 rounded-xl text-xs text-amber-300 text-left flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Transfer Tepat Nominal:</span> Mohon transfer tepat <strong className="text-white">Rp {createdPurchase.totalAmount.toLocaleString('id-ID')}</strong> (termasuk kode unik) agar verifikasi cepat.
              </div>
            </div>

            {/* Official QRIS Code Box */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl mx-auto inline-block border-2 border-white/20 shadow-xl max-w-[280px] sm:max-w-[320px]">
              <div className="text-black font-extrabold text-[11px] uppercase tracking-wider mb-2 border-b border-gray-200 pb-1.5 flex items-center justify-between">
                <span>{TICKET_CONFIG.QRIS_MERCHANT_NAME}</span>
                <span className="text-[9px] bg-rose-600 text-white font-black px-1.5 py-0.5 rounded">QRIS GPN</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-inner">
                <img
                  src={TICKET_CONFIG.QRIS_IMAGE_URL}
                  alt={`QRIS Resmi ${TICKET_CONFIG.QRIS_MERCHANT_NAME}`}
                  className="w-full max-h-[320px] object-contain mx-auto"
                />
              </div>
              <div className="mt-2 text-center">
                <p className="text-[10px] text-gray-700 font-mono font-bold">
                  NMID: {TICKET_CONFIG.QRIS_NMID}
                </p>
                <a
                  href={TICKET_CONFIG.QRIS_IMAGE_URL}
                  download="QRIS-IMOCUP-26-Resmi.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold mt-1"
                >
                  <Download className="w-3 h-3" /> Unduh Barcode QRIS
                </a>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="bg-zinc-900 rounded-xl p-3.5 border border-white/10 text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-zinc-400">ID Pesanan:</span>
                <span className="font-mono font-bold text-zinc-200">{createdPurchase.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Nama Pembeli:</span>
                <span className="font-semibold text-zinc-200 truncate max-w-[200px]">{createdPurchase.buyerName}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-zinc-300 font-bold">Total Transfer:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-black text-amber-400 text-base">
                    Rp {createdPurchase.totalAmount.toLocaleString('id-ID')}
                  </span>
                  <button
                    onClick={() => handleCopyCode(createdPurchase.totalAmount.toString())}
                    className="p-1 rounded bg-zinc-800 text-zinc-300 hover:text-white"
                    title="Salin Nominal"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons (WhatsApp Verification & Done) */}
            <div className="space-y-2.5 pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setStep('done')}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Bukti ke WA Admin ({CONTACT_CONFIG.PANITIA_WHATSAPP})</span>
              </a>

              <button
                onClick={() => {
                  setStep('done');
                  onSuccess(createdPurchase);
                }}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-white/5 transition"
              >
                Sudah Bayar, Buka Tiket Saya
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: DONE */}
        {step === 'done' && createdPurchase && (
          <div className="space-y-4 text-center py-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display font-black text-xl text-white uppercase">
                Pesanan Berhasil Dicatat!
              </h3>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                Bukti transfer Anda sedang diverifikasi panitia melalui WhatsApp. Tiket Anda dapat diakses di menu <strong className="text-amber-400">Tiket Saya</strong>.
              </p>
            </div>

            {/* Database Sync Notice */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-emerald-500/30 text-[11px] text-emerald-300">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>
                {isSupabaseConnected ? 'Data tersinkron otomatis ke Supabase Database' : 'Tersimpan aman di sesi perangkat Anda'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/10 text-left text-xs space-y-1 font-mono">
              <p className="text-zinc-400">ID Pesanan: <strong className="text-white">{createdPurchase.id}</strong></p>
              <p className="text-zinc-400">Kode Tiket: <strong className="text-amber-400">{createdPurchase.ticketCode}</strong></p>
              <p className="text-zinc-400">Status: <span className="text-amber-400 font-bold">{createdPurchase.status}</span></p>
            </div>

            <button
              onClick={() => {
                onSuccess(createdPurchase);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
            >
              Lihat Tiket Saya Sekarang &rarr;
            </button>
          </div>
        )}
        </>
      )}

      </div>
    </div>
  );
};
