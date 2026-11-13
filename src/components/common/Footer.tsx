import React from 'react';
import { Shield, MapPin, QrCode, PhoneCall, Lock } from 'lucide-react';
import { EVENT_CONFIG, VENUE_CONFIG, CONTACT_CONFIG, SCHEDULE_CONFIG, APP_ASSETS } from '../../config/eventConfig';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onEnterAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onEnterAdmin }) => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-zinc-950 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column with Logos Trio */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-3">
              <img src={APP_ASSETS.LOGO_IMOCUP} alt="IMOCUP Logo" className="w-10 h-10 object-contain shrink-0" />
              <img src={APP_ASSETS.LOGO_UM} alt="UM Logo" className="w-10 h-10 object-contain shrink-0" />
              <img src={APP_ASSETS.LOGO_IMONOKE} alt="Imonoke" className="w-10 h-10 object-contain rounded-full border border-white/10 shrink-0" />
              <div>
                <span className="font-display font-black text-lg text-white tracking-wider">
                  IMONOKE <span className="text-amber-400">CUP</span>
                </span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500">
                  {EVENT_CONFIG.SUBTITLE}
                </p>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed">
              Platform resmi turnamen basket 3x3 Imonoke Cup &mdash; Battle of Colosseum diselenggarakan bersama Universitas Negeri Malang (UM). 84 tim bertanding dalam sistem gugur resmi FIBA 3x3.
            </p>

            <div className="flex items-center gap-3 text-xs text-zinc-500 pt-1">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Regulasi FIBA 3x3
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <QrCode className="w-3.5 h-3.5 text-rose-400" /> Pembayaran QRIS Resmi
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigasi
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>
                <button onClick={() => onNavigate('live')} className="hover:text-white transition">
                  Live Match 3x3 & Scoreboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('schedule')} className="hover:text-white transition">
                  Jadwal Pertandingan (84 Laga)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-white transition">
                  Bagan Resmi & Braket Gugur
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tickets')} className="hover:text-white transition">
                  Pemesanan Tiket QRIS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('my-tickets')} className="hover:text-white transition">
                  Cek Tiket Saya
                </button>
              </li>
            </ul>
          </div>

          {/* Venue & Panitia Admin Gateway */}
          <div className="space-y-2.5 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Lokasi & Panitia
            </h4>
            <div className="space-y-1.5 text-zinc-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>{VENUE_CONFIG.FULL_NAME}</span>
              </p>
              <a
                href={`https://wa.me/${CONTACT_CONFIG.WHATSAPP_INTL}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-zinc-300 hover:text-emerald-400 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WA Panitia: {CONTACT_CONFIG.PANITIA_WHATSAPP}</span>
              </a>
              
              <div className="pt-2">
                <button
                  onClick={onEnterAdmin}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold transition"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Portal Panitia / Admin</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-2">
          <p>&copy; {EVENT_CONFIG.YEAR} {EVENT_CONFIG.NAME} x Universitas Negeri Malang (UM). All rights reserved.</p>
          <p className="font-mono">{SCHEDULE_CONFIG.DATES_LABEL} &bull; Malang, Jawa Timur</p>
        </div>
      </div>
    </footer>
  );
};
