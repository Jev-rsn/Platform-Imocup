import React, { useState } from 'react';
import { APP_ASSETS } from '../../config/eventConfig';
import { useTournament } from '../../context/TournamentContext';
import { useCustomerAuth } from '../../context/CustomerAuthContext';
import { 
  Flame, 
  Calendar, 
  Trophy, 
  Ticket, 
  Menu, 
  X, 
  UserCheck,
  Lock,
  User,
  LogIn,
  LogOut,
  Database
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onEnterAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab, onEnterAdmin }) => {
  const { matches } = useTournament();
  const { customer, openAuthModal, logout, isSupabaseConnected } = useCustomerAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const liveMatchesCount = matches.filter(m => m.status === 'Sedang Berlangsung').length;

  const navItems = [
    { id: 'home', label: 'Arena Home', icon: Trophy },
    { 
      id: 'live', 
      label: 'Live 3x3', 
      icon: Flame,
      badge: liveMatchesCount > 0 ? `${liveMatchesCount} LIVE` : undefined,
      badgeColor: 'bg-crimson-600'
    },
    { id: 'schedule', label: 'Jadwal Match', icon: Calendar },
    { id: 'results', label: 'Bagan & Hasil', icon: Trophy },
    { id: 'tickets', label: 'Beli Tiket', icon: Ticket },
    { id: 'my-tickets', label: 'Tiket Saya', icon: UserCheck },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    setShowUserDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Title */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 text-left group transition focus:outline-none min-w-0"
          >
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <img 
                src={APP_ASSETS.LOGO_IMOCUP} 
                alt="IMOCUP Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain shrink-0" 
              />
              <img 
                src={APP_ASSETS.LOGO_UM} 
                alt="Universitas Negeri Malang" 
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain shrink-0" 
              />
            </div>
            <div className="min-w-0 truncate">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display font-black text-lg sm:text-xl tracking-wide text-white uppercase truncate">
                  IMONOKE <span className="text-amber-400">CUP</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/40 shrink-0">
                  3X3
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium tracking-wider text-zinc-400 uppercase truncate">
                GKB FIP UM &bull; 2026
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs uppercase tracking-wider font-bold transition ${
                    isActive
                      ? 'bg-zinc-800/90 text-white border border-white/15'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full text-white bg-rose-600">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick CTA, Customer Auth & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Customer Auth Button / Profile Pill (Desktop & Tablet) */}
            {customer ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-amber-400/30 text-white text-xs font-semibold transition"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-black font-black text-[10px] flex items-center justify-center">
                    {customer.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] sm:max-w-[120px] truncate">{customer.fullName}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isSupabaseConnected ? 'bg-emerald-400' : 'bg-amber-400'}`} title={isSupabaseConnected ? 'Tersambung Supabase' : 'Offline / Demo'} />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-zinc-900 border border-white/15 shadow-2xl py-2 z-50">
                    <div className="px-3.5 py-2 border-b border-white/10">
                      <p className="text-xs font-bold text-white truncate">{customer.fullName}</p>
                      <p className="text-[11px] text-zinc-400 truncate">{customer.email}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Database className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] text-zinc-400">
                          {isSupabaseConnected ? 'Supabase Sync Active' : 'Mode Offline Demo'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNavClick('my-tickets')}
                      className="w-full text-left px-3.5 py-2 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-2 transition"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tiket Saya ({customer.fullName.split(' ')[0]})</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserDropdown(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-zinc-800 flex items-center gap-2 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar Akun</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider transition"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Masuk</span>
              </button>
            )}

            {/* Quick Buy Ticket CTA */}
            <button
              onClick={() => handleNavClick('tickets')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Tiket</span>
            </button>

            {/* Discrete Panitia Portal Button */}
            <button
              onClick={onEnterAdmin}
              className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition"
              title="Akses Portal Panitia (Admin)"
              aria-label="Akses Portal Panitia"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 focus:outline-none transition"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-zinc-950 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl">
          
          {/* Customer Profile Banner in Mobile Menu */}
          {customer ? (
            <div className="mb-3 p-3 rounded-xl bg-zinc-900 border border-amber-400/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-black font-black text-xs flex items-center justify-center shrink-0">
                  {customer.fullName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 truncate">
                  <p className="text-xs font-bold text-white truncate">{customer.fullName}</p>
                  <p className="text-[10px] text-zinc-400 truncate">{customer.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-400 hover:text-rose-300 font-bold px-2 py-1 rounded bg-rose-950/60 border border-rose-800/40"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="mb-3 p-3 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Akun Customer / Penonton</p>
                <p className="text-[10px] text-zinc-400">Masuk untuk melacak tiket di database</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-400 text-black font-bold text-xs uppercase tracking-wider"
              >
                Masuk
              </button>
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-zinc-800 text-amber-400 border border-white/10'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onEnterAdmin();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Akses Portal Panitia (Admin)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
