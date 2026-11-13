// =========================================================================
// IMONOKE CUP 3X3 - ADMIN & PANITIA CREDENTIALS CONFIGURATION
// File khusus pengelolaan akun kredensial, username, dan password panitia.
// Nilai kredensial dimuat dari file .env dan TIDAK dicampur dalam komponen tampilan.
// =========================================================================

export type AdminRole = 'SUPER_ADMIN' | 'SCOREKEEPER' | 'GATE_OPERATOR' | 'PANITIA';

export interface AdminAccount {
  username: string;
  password?: string;
  name: string;
  role: AdminRole;
  roleLabel: string;
  canEditScores: boolean;
  canEditBrackets: boolean;
  canVerifyTickets: boolean;
  canRedeemTickets: boolean;
  canManageSettings: boolean;
}

export const ADMIN_CREDENTIALS: AdminAccount[] = [
  {
    username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'imonoke2026',
    name: 'Super Admin Panitia',
    role: 'SUPER_ADMIN',
    roleLabel: 'Ketua / Koordinator Panitia',
    canEditScores: true,
    canEditBrackets: true,
    canVerifyTickets: true,
    canRedeemTickets: true,
    canManageSettings: true
  },
  {
    username: import.meta.env.VITE_OPERATOR_USERNAME || 'operator',
    password: import.meta.env.VITE_OPERATOR_PASSWORD || 'operator3x3',
    name: 'Operator Meja & Scorekeeper',
    role: 'SCOREKEEPER',
    roleLabel: 'Operator Lapangan (Lap A & B)',
    canEditScores: true,
    canEditBrackets: true,
    canVerifyTickets: false,
    canRedeemTickets: false,
    canManageSettings: false
  },
  {
    username: import.meta.env.VITE_PANITIA_USERNAME || 'panitia',
    password: import.meta.env.VITE_PANITIA_PASSWORD || 'gladiator2026',
    name: 'Panitia Registrasi & Tiket',
    role: 'PANITIA',
    roleLabel: 'Divisi Tiket & Verifikasi WA',
    canEditScores: false,
    canEditBrackets: false,
    canVerifyTickets: true,
    canRedeemTickets: true,
    canManageSettings: false
  },
  {
    username: import.meta.env.VITE_GATE_USERNAME || 'gate',
    password: import.meta.env.VITE_GATE_PASSWORD || 'gate2026',
    name: 'Petugas Pintu Masuk (Scanner)',
    role: 'GATE_OPERATOR',
    roleLabel: 'Gate Scanner Wristband',
    canEditScores: false,
    canEditBrackets: false,
    canVerifyTickets: false,
    canRedeemTickets: true,
    canManageSettings: false
  }
];
