// =========================================================================
// IMONOKE CUP 3X3 - EVENT CONFIGURATION & CONSTANTS
// File pusat pengaturan nama event, venue, kontak WhatsApp, harga tiket, dan storage keys
// =========================================================================

import { PAYMENT_CREDENTIALS } from '../credentials/paymentCredentials';

// 1. Informasi Utama Turnamen
export const EVENT_CONFIG = {
  NAME: 'IMONOKE CUP 3X3',
  SUBTITLE: 'Turnamen Basket 3x3 Se-Jawa Timur',
  EDITION: 'Battle of Colosseum 2026',
  YEAR: 2026,
  FORMAT: '3x3 FIBA Official Rules (Sudden Death 21 Pts / 10 Mins)',
  CATEGORIES: ['SMA Putra', 'SMA Putri', 'Umum'] as const,
  TOTAL_TEAMS: 84,
  TOTAL_MATCHES: 84
};

// 2. Lokasi & Venue Pertandingan
export const VENUE_CONFIG = {
  NAME: 'GKB FIP UM',
  FULL_NAME: 'GKB FIP Universitas Negeri Malang (UM)',
  ADDRESS: 'Jl. Semarang No. 5, Sumbersari, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145',
  COURTS: ['Lapangan A', 'Lapangan B'],
  MAPS_QUERY: 'GKB+FIP+Universitas+Negeri+Malang'
};

// 3. Jadwal Tanggal Pertandingan
export const SCHEDULE_CONFIG = {
  START_DATE: '2026-11-14',
  END_DATE: '2026-11-15',
  DATES_LABEL: 'Sabtu - Minggu, 14 - 15 November 2026',
  DAY_1: {
    DATE: '2026-11-14',
    LABEL: 'Day 1 &bull; Sabtu, 14 Nov 2026',
    ROUNDS: 'Babak 32 Besar & 16 Besar',
    TICKET_PRICE: 15000
  },
  DAY_2: {
    DATE: '2026-11-15',
    LABEL: 'Day 2 &bull; Minggu, 15 Nov 2026 (Championship)',
    ROUNDS: 'Perempat Final, Semifinal, 3rd Place & Grand Final',
    TICKET_PRICE: 25000
  }
};

// 4. Kontak Panitia Resmi & WhatsApp Gateway (Dikelola di src/credentials/paymentCredentials.ts)
export const CONTACT_CONFIG = {
  PANITIA_WHATSAPP: PAYMENT_CREDENTIALS.PANITIA_WHATSAPP,
  WHATSAPP_INTL: PAYMENT_CREDENTIALS.PANITIA_WHATSAPP_INTL,
  HELP_DESK_LABEL: '0857-5701-6933',
  ORGANIZER: 'Imonoke Sports Entertainment x Universitas Negeri Malang (UM)',
  BANK_NAME: PAYMENT_CREDENTIALS.BANK_NAME,
  ACCOUNT_NUMBER: PAYMENT_CREDENTIALS.ACCOUNT_NUMBER,
  ACCOUNT_NAME: PAYMENT_CREDENTIALS.ACCOUNT_NAME
};

// Helper URL Asset Statis yang kompatibel dengan Localhost & GitHub Pages Subpath
export const getAssetUrl = (fileName: string): string => {
  const clean = fileName.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || './';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
};

export const APP_ASSETS = {
  LOGO_IMOCUP: getAssetUrl('Logo_IMOCUP.png'),
  LOGO_UM: getAssetUrl('Logo_Um.png'),
  LOGO_IMONOKE: getAssetUrl('Logo_Imonoke.jpeg'),
  QRIS_OFFICIAL: getAssetUrl('qris-official.jpg'),
  BACKGROUND: getAssetUrl('background.jpg'),
  FRAME_SCORE: getAssetUrl('frame_score.png'),
  FRAME_FOUL: getAssetUrl('frame_foul.png'),
  SHIELD: getAssetUrl('shield.svg'),
};

// Helper URL WhatsApp Konfirmasi Tiket
export const getTicketVerificationWhatsAppUrl = (purchase: {
  id: string;
  buyerName: string;
  tierName: string;
  quantity: number;
  totalAmount: number;
}): string => {
  const message = encodeURIComponent(
    `Halo Admin Imonoke Cup 3x3,\n\nSaya telah melakukan pembayaran tiket via QRIS dengan rincian:\n- Kode Transaksi: ${purchase.id}\n- Nama: ${purchase.buyerName}\n- Tiket: ${purchase.tierName} (${purchase.quantity}x)\n- Total Transfer: Rp ${purchase.totalAmount.toLocaleString('id-ID')}\n\nBerikut saya lampirkan bukti transfernya. Mohon untuk diverifikasi dan dikirimkan Kode Tiket Resmi. Terima kasih!`
  );
  return `https://wa.me/${CONTACT_CONFIG.WHATSAPP_INTL}?text=${message}`;
};

// Helper URL WhatsApp Panitia Menyetujui Tiket ke Customer
export const getApprovalNoticeWhatsAppUrl = (purchase: {
  buyerName: string;
  buyerWhatsapp: string;
  tierName: string;
  id: string;
  ticketCode: string;
}): string => {
  const cleanPhone = purchase.buyerWhatsapp.replace(/[^0-9]/g, '').replace(/^0/, '62');
  const message = encodeURIComponent(
    `Halo ${purchase.buyerName}!\n\nPembayaran tiket Anda (${purchase.tierName}) dengan Kode Transaksi ${purchase.id} telah BERHASIL DIVERIFIKASI oleh Panitia Imonoke Cup 3x3.\n\nBerikut Kode Tiket Resmi Anda:\n🎟️ *${purchase.ticketCode}*\n\nSilakan tunjukkan kode tiket ini pada menu "Tiket Saya" saat registrasi offline di venue GKB FIP UM untuk penukaran gelang festival fisik.\n\nHelpdesk Panitia WA: ${CONTACT_CONFIG.PANITIA_WHATSAPP}\nSampai jumpa di GKB FIP UM!`
  );
  return `https://wa.me/${cleanPhone}?text=${message}`;
};

// 5. Konfigurasi Tiket & QRIS
export const TICKET_CONFIG = {
  CURRENCY: 'IDR',
  DAY_1_QUOTA: 100,
  DAY_2_QUOTA: 100,
  QRIS_MERCHANT_NAME: PAYMENT_CREDENTIALS.QRIS_MERCHANT_NAME,
  QRIS_NMID: PAYMENT_CREDENTIALS.QRIS_NMID,
  QRIS_IMAGE_URL: PAYMENT_CREDENTIALS.QRIS_IMAGE_URL,
  QRIS_PROVIDER: 'QRIS Standar Pembayaran Nasional (GPN)',
  MAX_PER_ORDER: 5,
  POLICY_NOTE: '1 tiket berlaku khusus untuk 1 hari pertandingan di GKB FIP UM. Kuota dibatasi 100 tiket/hari dan hanya berkurang setelah pembayaran dikonfirmasi panitia.'
};

// 6. Centralized Storage Keys (localStorage & sessionStorage)
export const STORAGE_KEYS = {
  ADMIN_AUTH: 'imonoke_admin_auth',
  ADMIN_USER: 'imonoke_admin_user',
  CUSTOMER_SESSION: 'imonoke_customer_session',
  SUPABASE_URL: 'imonoke_supabase_url',
  SUPABASE_KEY: 'imonoke_supabase_key',
  MATCHES_CACHE: 'imonoke_matches_v13',
  BRACKETS_CACHE: 'imonoke_brackets_v13',
  TICKETS_CACHE: 'imonoke_tickets_v13',
  PURCHASES_CACHE: 'imonoke_purchases_v13',
  LOGS_CACHE: 'imonoke_logs_v13'
};

// 7. Supabase Table Names
export const SUPABASE_TABLES = {
  CUSTOMERS: 'customers',
  TICKET_PURCHASES: 'ticket_purchases',
  MATCH_RESULTS: 'match_results',
  TOURNAMENT_BRACKETS: 'tournament_brackets'
};
