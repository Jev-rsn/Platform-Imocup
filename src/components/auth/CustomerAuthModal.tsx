import React, { useState } from 'react';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { 
  X, 
  LogIn, 
  UserPlus, 
  CheckCircle2,
  AlertCircle, 
  KeyRound, 
  Mail, 
  Phone, 
  User 
} from 'lucide-react';

export const CustomerAuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    setAuthModalMode, 
    login, 
    register
  } = useCustomerAuth();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regWhatsapp, setRegWhatsapp] = useState('');
  const [regPassword, setRegPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginEmail || !loginPassword) {
      setErrorMessage('Harap isi email dan kata sandi.');
      return;
    }

    setLoading(true);
    const res = await login(loginEmail, loginPassword);
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Gagal masuk akun.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regFullName || !regEmail || !regWhatsapp || !regPassword) {
      setErrorMessage('Harap isi semua kolom wajib.');
      return;
    }

    setLoading(true);
    const res = await register({
      fullName: regFullName,
      email: regEmail,
      whatsapp: regWhatsapp,
      identityNumber: '',
      password: regPassword
    });
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Gagal mendaftar.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-white/15 rounded-2xl w-full max-w-md max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-zinc-900/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white tracking-wide uppercase">
                {authModalMode === 'login' ? 'Masuk Penonton' : 'Daftar Akun Penonton'}
              </h3>
              <p className="text-[11px] text-zinc-400">
                Akses & Pelacakan Tiket Imonoke Cup 3x3
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 p-1.5 bg-zinc-900/60 border-b border-white/10 shrink-0">
          <button
            onClick={() => {
              setAuthModalMode('login');
              setErrorMessage(null);
            }}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-2 ${
              authModalMode === 'login'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/10'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5 text-amber-400" />
            <span>Masuk</span>
          </button>

          <button
            onClick={() => {
              setAuthModalMode('register');
              setErrorMessage(null);
            }}
            className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-2 ${
              authModalMode === 'register'
                ? 'bg-zinc-800 text-white shadow-sm border border-white/10'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-amber-400" />
            <span>Daftar Baru</span>
          </button>
        </div>

        {/* Form Body with Scroll */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {authModalMode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email Terdaftar</span>
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kata Sandi</span>
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-display font-bold uppercase tracking-wider text-sm transition shadow-lg mt-2 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{loading ? 'Memproses...' : 'Masuk ke Akun'}</span>
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nama Lengkap *</span>
                </label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={e => setRegFullName(e.target.value)}
                  placeholder="Contoh: Muhammad Fikri"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/15 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email Aktif *</span>
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="email@gmail.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/15 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nomor WhatsApp Aktif *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={regWhatsapp}
                  onChange={e => setRegWhatsapp(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/15 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
                <p className="text-[10px] text-zinc-500 mt-0.5">Digunakan panitia untuk validasi e-tiket QRIS</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>Kata Sandi Baru *</span>
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/15 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-display font-bold uppercase tracking-wider text-sm transition shadow-lg mt-3 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{loading ? 'Mendaftarkan...' : 'Daftar Akun Penonton'}</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
