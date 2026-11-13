import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft, AlertCircle, KeyRound, Shield } from 'lucide-react';
import { verifyAdminLogin, setAdminSession } from '../../config/adminAccounts';
import { EVENT_CONFIG, APP_ASSETS } from '../../config/eventConfig';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onBackToPublic: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onLoginSuccess, onBackToPublic }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = verifyAdminLogin(username, password);

    if (result.valid && result.account) {
      setAdminSession(result.account, rememberMe);
      onLoginSuccess();
    } else {
      setError(result.error || 'Password atau identitas panitia salah. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-rose-600 selection:text-white">
      
      {/* Top Header Bar */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <img src={APP_ASSETS.LOGO_IMOCUP} alt="IMOCUP Logo" className="w-8 h-8 object-contain" />
          <span className="font-display font-black text-sm text-white uppercase tracking-wider">
            {EVENT_CONFIG.NAME}
          </span>
        </div>

        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website</span>
        </button>
      </header>

      {/* Main Login Card Center */}
      <div className="max-w-md w-full mx-auto px-4 py-8">
        <div className="rounded-2xl p-6 sm:p-8 bg-zinc-900 border border-white/10 shadow-2xl space-y-6">
          
          {/* Title */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center">
              <KeyRound className="w-6 h-6 text-amber-400" />
            </div>

            <div>
              <h1 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                Portal Panitia Turnamen
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Akses terproteksi pengelola bagan, jadwal, dan skor 3x3
              </p>
            </div>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-600/50 text-rose-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            
            <div>
              <label className="block font-bold text-zinc-300 uppercase tracking-wider text-[11px] mb-1">
                Username / Akun
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username panitia..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-sm font-medium transition"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-300 uppercase tracking-wider text-[11px] mb-1">
                Password Panitia
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 text-sm font-mono transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-zinc-400 text-xs">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-zinc-950 border-white/20 text-amber-500 focus:ring-0"
                />
                <span>Ingat sesi login</span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Masuk ke Panel Panitia</span>
              </button>
            </div>

          </form>

          {/* Role Security Notice Box (Tanpa menampilkan password atau akun) */}
          <div className="p-3.5 rounded-xl bg-zinc-950/70 border border-white/5 text-[11px] text-zinc-400 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Area terbatas khusus panitia & operator berwenang. Kredensial akun dikelola secara terproteksi pada file konfigurasi internal dan verifikasi ketat.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 text-center text-xs text-zinc-600 border-t border-white/5">
        &copy; {EVENT_CONFIG.YEAR} {EVENT_CONFIG.NAME} &bull; Universitas Negeri Malang (UM)
      </footer>

    </div>
  );
};
