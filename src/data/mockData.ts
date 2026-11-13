import { Team, Match, BracketNode, TicketTier, TicketPurchase, AuditLog } from '../types/tournament';

// ==========================================
// 84 OFFICIAL TEAMS (SMA PUTRA, SMA PUTRI, UMUM)
// ==========================================

export const INITIAL_TEAMS: Team[] = [
  // --- SMA PUTRA (BOYS) - 44 TEAMS ---
  { id: 'b-1', name: 'SMA TARUNA NUSANTARA (A)', shortName: 'Taruna (A)', category: 'SMA Putra', logo: '🛡️', origin: 'Magelang' },
  { id: 'b-2', name: 'SMAN 1 GONDANGLEGI (B)', shortName: 'SMAN 1 Gondanglegi (B)', category: 'SMA Putra', logo: '⚔️', origin: 'Kab. Malang' },
  { id: 'b-3', name: 'SMAN 5 SURABAYA (GALAKSI)', shortName: 'SMAN 5 SBY (Galaksi)', category: 'SMA Putra', logo: '🌌', origin: 'Surabaya' },
  { id: 'b-4', name: 'SMAN 1 MALANG (C)', shortName: 'SMAN 1 Malang (C)', category: 'SMA Putra', logo: '🏛️', origin: 'Kota Malang' },
  { id: 'b-5', name: 'SMAN 3 MALANG (B)', shortName: 'SMAN 3 Malang (B)', category: 'SMA Putra', logo: '⚡', origin: 'Kota Malang' },
  { id: 'b-6', name: 'SMKN 11 MALANG (B)', shortName: 'SMKN 11 Malang (B)', category: 'SMA Putra', logo: '🦅', origin: 'Kota Malang' },
  { id: 'b-7', name: 'SMKN 8 MALANG (B)', shortName: 'SMKN 8 Malang (B)', category: 'SMA Putra', logo: '🦁', origin: 'Kota Malang' },
  { id: 'b-8', name: 'SMAN 1 MALANG (A)', shortName: 'SMAN 1 Malang (A)', category: 'SMA Putra', logo: '🏛️', origin: 'Kota Malang' },
  { id: 'b-9', name: 'SMA 3 MUHAMMADIYAH (A)', shortName: 'SMA 3 Muhammadiyah (A)', category: 'SMA Putra', logo: '🔥', origin: 'Malang' },
  { id: 'b-10', name: 'SMA TARUNA NUSANTARA (B)', shortName: 'Taruna (B)', category: 'SMA Putra', logo: '🛡️', origin: 'Magelang' },
  { id: 'b-11', name: 'SMA ISLAM SABILILLAH (A)', shortName: 'Sabilillah (A)', category: 'SMA Putra', logo: '🌙', origin: 'Kota Malang' },
  { id: 'b-12', name: 'SMAN 1 JEMBER', shortName: 'SMAN 1 Jember', category: 'SMA Putra', logo: '🏹', origin: 'Jember' },
  { id: 'b-13', name: 'SMA ISLAM SABILILLAH (B)', shortName: 'Sabilillah (B)', category: 'SMA Putra', logo: '🌙', origin: 'Kota Malang' },
  { id: 'b-14', name: 'SMKN 1 PURWOSARI (A)', shortName: 'SMKN 1 Purwosari (A)', category: 'SMA Putra', logo: '⚙️', origin: 'Pasuruan' },
  { id: 'b-15', name: 'SMKN 1 PURWOSARI (B)', shortName: 'SMKN 1 Purwosari (B)', category: 'SMA Putra', logo: '⚙️', origin: 'Pasuruan' },
  { id: 'b-16', name: 'SMA BSS (B)', shortName: 'SMA BSS (B)', category: 'SMA Putra', logo: '🦉', origin: 'Kota Malang' },
  { id: 'b-17', name: 'SMAN 1 GENDING (A)', shortName: 'SMAN 1 Gending (A)', category: 'SMA Putra', logo: '🌊', origin: 'Probolinggo' },
  { id: 'b-18', name: 'SMAN 4 SIDOARJO', shortName: 'SMAN 4 Sidoarjo', category: 'SMA Putra', logo: '🌟', origin: 'Sidoarjo' },
  { id: 'b-19', name: 'SMA AR ROHMAH (C)', shortName: 'Ar Rohmah (C)', category: 'SMA Putra', logo: '🏰', origin: 'Kab. Malang' },
  { id: 'b-20', name: 'SMAN 5 SURABAYA', shortName: 'SMAN 5 Surabaya', category: 'SMA Putra', logo: '🌌', origin: 'Surabaya' },
  { id: 'b-21', name: 'SMA AR ROHMAH (B)', shortName: 'Ar Rohmah (B)', category: 'SMA Putra', logo: '🏰', origin: 'Kab. Malang' },
  { id: 'b-22', name: 'SMAN 3 MALANG (A)', shortName: 'SMAN 3 Malang (A)', category: 'SMA Putra', logo: '⚡', origin: 'Kota Malang' },
  // Right side boys
  { id: 'b-23', name: 'SMKN 8 MALANG (A)', shortName: 'SMKN 8 Malang (A)', category: 'SMA Putra', logo: '🦁', origin: 'Kota Malang' },
  { id: 'b-24', name: 'CHARIS NATIONAL ACADEMIC', shortName: 'Charis Academic', category: 'SMA Putra', logo: '👑', origin: 'Kota Malang' },
  { id: 'b-25', name: 'SMAN 1 GONDANGLEGI (A)', shortName: 'SMAN 1 Gondanglegi (A)', category: 'SMA Putra', logo: '⚔️', origin: 'Kab. Malang' },
  { id: 'b-26', name: 'SMA NLS', shortName: 'SMA NLS', category: 'SMA Putra', logo: '💎', origin: 'Malang' },
  { id: 'b-27', name: 'SMKN 11 MALANG (A)', shortName: 'SMKN 11 Malang (A)', category: 'SMA Putra', logo: '🦅', origin: 'Kota Malang' },
  { id: 'b-28', name: 'SMAN 1 TUREN (B)', shortName: 'SMAN 1 Turen (B)', category: 'SMA Putra', logo: '🎯', origin: 'Kab. Malang' },
  { id: 'b-29', name: 'SMAN 1 MALANG (B)', shortName: 'SMAN 1 Malang (B)', category: 'SMA Putra', logo: '🏛️', origin: 'Kota Malang' },
  { id: 'b-30', name: 'SMAN 8 MALANG (C)', shortName: 'SMAN 8 Malang (C)', category: 'SMA Putra', logo: '🔥', origin: 'Kota Malang' },
  { id: 'b-31', name: 'SMAN 1 GRATI', shortName: 'SMAN 1 Grati', category: 'SMA Putra', logo: '🌾', origin: 'Pasuruan' },
  { id: 'b-32', name: 'SMA BSS (A)', shortName: 'SMA BSS (A)', category: 'SMA Putra', logo: '🦉', origin: 'Kota Malang' },
  { id: 'b-33', name: 'SMAN 1 TALUN', shortName: 'SMAN 1 Talun', category: 'SMA Putra', logo: '🌲', origin: 'Blitar' },
  { id: 'b-34', name: 'SMAN 1 KEDIRI', shortName: 'SMAN 1 Kediri', category: 'SMA Putra', logo: '🗼', origin: 'Kediri' },
  { id: 'b-35', name: 'SMAN 8 MALANG (A)', shortName: 'SMAN 8 Malang (A)', category: 'SMA Putra', logo: '🔥', origin: 'Kota Malang' },
  { id: 'b-36', name: 'SMAN 1 TUREN (A)', shortName: 'SMAN 1 Turen (A)', category: 'SMA Putra', logo: '🎯', origin: 'Kab. Malang' },
  { id: 'b-37', name: 'SMAN 1 KEDIRI (CEMAST)', shortName: 'Kediri (Cemast)', category: 'SMA Putra', logo: '🗼', origin: 'Kediri' },
  { id: 'b-38', name: 'SMA AR ROHMAH (A)', shortName: 'Ar Rohmah (A)', category: 'SMA Putra', logo: '🏰', origin: 'Kab. Malang' },
  { id: 'b-39', name: 'SMA LABORATORIUM UM', shortName: 'SMA Lab UM', category: 'SMA Putra', logo: '🎓', origin: 'Kota Malang' },
  { id: 'b-40', name: 'SMAN 8 MALANG (B)', shortName: 'SMAN 8 Malang (B)', category: 'SMA Putra', logo: '🔥', origin: 'Kota Malang' },
  { id: 'b-41', name: 'SMKN 1 SUKOREJO', shortName: 'SMKN 1 Sukorejo', category: 'SMA Putra', logo: '🏭', origin: 'Pasuruan' },
  { id: 'b-42', name: 'SMA AL IZZAH BATU', shortName: 'SMA Al Izzah Batu', category: 'SMA Putra', logo: '⛰️', origin: 'Kota Batu' },
  { id: 'b-43', name: 'SMAN 1 PANDAAN (A)', shortName: 'SMAN 1 Pandaan (A)', category: 'SMA Putra', logo: '🎋', origin: 'Pasuruan' },
  { id: 'b-44', name: 'SMA 3 MUHAMMADIYAH (B)', shortName: 'SMA 3 Muhammadiyah (B)', category: 'SMA Putra', logo: '🔥', origin: 'Malang' },

  // --- SMA PUTRI (GIRLS) - 24 TEAMS ---
  { id: 'g-1', name: 'SMAN 1 LAWANG (B)', shortName: 'SMAN 1 Lawang (B)', category: 'SMA Putri', logo: '🌸', origin: 'Kab. Malang' },
  { id: 'g-2', name: 'SMAN 8 MALANG (B)', shortName: 'SMAN 8 Malang (B)', category: 'SMA Putri', logo: '🔥', origin: 'Kota Malang' },
  { id: 'g-3', name: 'SMAN 1 LAWANG (A)', shortName: 'SMAN 1 Lawang (A)', category: 'SMA Putri', logo: '🌸', origin: 'Kab. Malang' },
  { id: 'g-4', name: 'SMAN 1 TUREN (A)', shortName: 'SMAN 1 Turen (A)', category: 'SMA Putri', logo: '🎯', origin: 'Kab. Malang' },
  { id: 'g-5', name: 'SMAN 21 SURABAYA', shortName: 'SMAN 21 Surabaya', category: 'SMA Putri', logo: '🐬', origin: 'Surabaya' },
  { id: 'g-6', name: 'SMAN 4 MALANG (B)', shortName: 'SMAN 4 Malang (B)', category: 'SMA Putri', logo: '🌹', origin: 'Kota Malang' },
  { id: 'g-7', name: 'SMAN 1 MALANG (A)', shortName: 'SMAN 1 Malang (A)', category: 'SMA Putri', logo: '🏛️', origin: 'Kota Malang' },
  { id: 'g-8', name: 'SMAN 3 MALANG', shortName: 'SMAN 3 Malang', category: 'SMA Putri', logo: '⚡', origin: 'Kota Malang' },
  { id: 'g-9', name: 'SMAN 1 MALANG (B)', shortName: 'SMAN 1 Malang (B)', category: 'SMA Putri', logo: '🏛️', origin: 'Kota Malang' },
  { id: 'g-10', name: 'SMAN 2 NGANJUK', shortName: 'SMAN 2 Nganjuk', category: 'SMA Putri', logo: '🌾', origin: 'Nganjuk' },
  { id: 'g-11', name: 'SMAN 4 MALANG (A)', shortName: 'SMAN 4 Malang (A)', category: 'SMA Putri', logo: '🌹', origin: 'Kota Malang' },
  { id: 'g-12', name: 'SMAN 9 MALANG (A)', shortName: 'SMAN 9 Malang (A)', category: 'SMA Putri', logo: '🌻', origin: 'Kota Malang' },
  // Right side girls
  { id: 'g-13', name: 'SMAN 1 TUREN (B)', shortName: 'SMAN 1 Turen (B)', category: 'SMA Putri', logo: '🎯', origin: 'Kab. Malang' },
  { id: 'g-14', name: 'SMAN TARUNA NUSANTARA (B)', shortName: 'Taruna (B)', category: 'SMA Putri', logo: '🛡️', origin: 'Magelang' },
  { id: 'g-15', name: 'SMAN 1 GRATI', shortName: 'SMAN 1 Grati', category: 'SMA Putri', logo: '🌾', origin: 'Pasuruan' },
  { id: 'g-16', name: 'SMAN 1 PANDAAN', shortName: 'SMAN 1 Pandaan', category: 'SMA Putri', logo: '🎋', origin: 'Pasuruan' },
  { id: 'g-17', name: 'SMAN TARUNA NUSANTARA (A)', shortName: 'Taruna (A)', category: 'SMA Putri', logo: '🛡️', origin: 'Magelang' },
  { id: 'g-18', name: 'SMAN 1 MALANG (C)', shortName: 'SMAN 1 Malang (C)', category: 'SMA Putri', logo: '🏛️', origin: 'Kota Malang' },
  { id: 'g-19', name: 'SMAN 1 BATU', shortName: 'SMAN 1 Batu', category: 'SMA Putri', logo: '🍎', origin: 'Kota Batu' },
  { id: 'g-20', name: 'SMAK FRATERAN MALANG', shortName: 'SMAK Frateran', category: 'SMA Putri', logo: '✝️', origin: 'Kota Malang' },
  { id: 'g-21', name: 'SMAN 8 MALANG (A)', shortName: 'SMAN 8 Malang (A)', category: 'SMA Putri', logo: '🔥', origin: 'Kota Malang' },
  { id: 'g-22', name: 'SMAN 4 SIDOARJO', shortName: 'SMAN 4 Sidoarjo', category: 'SMA Putri', logo: '🌟', origin: 'Sidoarjo' },
  { id: 'g-23', name: 'SMAN 8 MALANG (C)', shortName: 'SMAN 8 Malang (C)', category: 'SMA Putri', logo: '🔥', origin: 'Kota Malang' },
  { id: 'g-24', name: 'SMAN 9 MALANG (B)', shortName: 'SMAN 9 Malang (B)', category: 'SMA Putri', logo: '🌻', origin: 'Kota Malang' },

  // --- KATEGORI UMUM - 16 TEAMS ---
  { id: 'u-1', name: 'TAHU TEK', shortName: 'Tahu Tek', category: 'Umum', logo: '🥢', origin: 'Malang' },
  { id: 'u-2', name: 'BHAP TEAM', shortName: 'Bhap Team', category: 'Umum', logo: '💣', origin: 'Surabaya' },
  { id: 'u-3', name: 'APEX', shortName: 'Apex', category: 'Umum', logo: '🔺', origin: 'Malang' },
  { id: 'u-4', name: 'LAWAX', shortName: 'Lawax', category: 'Umum', logo: '🃏', origin: 'Batu' },
  { id: 'u-5', name: 'YOK COLL', shortName: 'Yok Coll', category: 'Umum', logo: '☕', origin: 'Malang' },
  { id: 'u-6', name: 'UWIKA', shortName: 'Uwika', category: 'Umum', logo: '🏛️', origin: 'Surabaya' },
  { id: 'u-7', name: 'BROTOSENO', shortName: 'Brotoseno', category: 'Umum', logo: '🛡️', origin: 'Jawa Timur' },
  { id: 'u-8', name: 'RED TEAM', shortName: 'Red Team', category: 'Umum', logo: '🔴', origin: 'Sidoarjo' },
  { id: 'u-9', name: 'KECAP KECUP', shortName: 'Kecap Kecup', category: 'Umum', logo: '🥫', origin: 'Malang' },
  { id: 'u-10', name: 'JOMBANG THUNDER', shortName: 'Jombang Thunder', category: 'Umum', logo: '⚡', origin: 'Jombang' },
  { id: 'u-11', name: 'RED FLAG BOYS', shortName: 'Red Flag Boys', category: 'Umum', logo: '🚩', origin: 'Surabaya' },
  { id: 'u-12', name: 'SEDUHLUR', shortName: 'Seduhlur', category: 'Umum', logo: '🤝', origin: 'Malang Raya' },
  { id: 'u-13', name: 'EYWAN', shortName: 'Eywan', category: 'Umum', logo: '👁️', origin: 'Pasuruan' },
  { id: 'u-14', name: 'ALIEN JAHAT', shortName: 'Alien Jahat', category: 'Umum', logo: '👽', origin: 'Kediri' },
  { id: 'u-15', name: 'EAST SIDE', shortName: 'East Side', category: 'Umum', logo: '🧭', origin: 'Malang Timur' },
  { id: 'u-16', name: 'UNIK', shortName: 'Unik', category: 'Umum', logo: '✨', origin: 'Malang' },
];

// Helper to look up team by id
const getTeam = (id: string) => INITIAL_TEAMS.find(t => t.id === id)!;

// ==========================================
// ==========================================
// 1. FULL OFFICIAL BRACKETS (1.png, 2.png, 3.png)
// Semua pertandingan belum main (status: Akan Datang)
// Mulai 14 November 2026, Selesai 15 November 2026
// ==========================================

export const INITIAL_BRACKETS: Record<string, BracketNode[]> = {
  // === SMA PUTRA (BOYS) - 44 TEAMS (2.png) ===
  'SMA Putra': [
    // --- Left Wing Round 1: Babak 32 Besar (11 Matches - 14 Nov 2026) ---
    { id: 'b-m1', matchCode: 'A10', courtName: 'Lapangan A', duration: "20'", matchNumber: 1, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'left', category: 'SMA Putra', teamA: getTeam('b-1'), teamB: getTeam('b-2'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '11.00 - 11.20 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-m12', nextSlot: 'teamA' },
    { id: 'b-m2', matchCode: 'B10', courtName: 'Lapangan B', duration: "20'", matchNumber: 2, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'left', category: 'SMA Putra', teamA: getTeam('b-3'), teamB: getTeam('b-4'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '11.00 - 11.20 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m12', nextSlot: 'teamB' },
    { id: 'b-m3', matchCode: 'A4', courtName: 'Lapangan A', duration: "20'", matchNumber: 3, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'left', category: 'SMA Putra', teamA: getTeam('b-5'), teamB: getTeam('b-6'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '09.00 - 09.20 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-m13', nextSlot: 'teamA' },
    { id: 'b-m4', matchCode: 'B15', courtName: 'Lapangan B', duration: "20'", matchNumber: 4, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'left', category: 'SMA Putra', teamA: getTeam('b-7'), teamB: getTeam('b-8'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '13.10 - 13.30 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m13', nextSlot: 'teamB' },
    { id: 'b-m5', matchCode: 'A12', courtName: 'Lapangan A', duration: "20'", matchNumber: 5, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'left', category: 'SMA Putra', teamA: getTeam('b-9'), teamB: getTeam('b-10'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '12.10 - 12.30 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-m14', nextSlot: 'teamA' },
    { id: 'b-m6', matchCode: 'B12', courtName: 'Lapangan B', duration: "20'", matchNumber: 6, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'left', category: 'SMA Putra', teamA: getTeam('b-11'), teamB: getTeam('b-12'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '12.10 - 12.30 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m15', nextSlot: 'teamB' },
    { id: 'b-m7', matchCode: 'A8', courtName: 'Lapangan A', duration: "20'", matchNumber: 7, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'left', category: 'SMA Putra', teamA: getTeam('b-13'), teamB: getTeam('b-14'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '10.20 - 10.40 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-m15', nextSlot: 'teamA' },
    { id: 'b-m8', matchCode: 'B13', courtName: 'Lapangan B', duration: "20'", matchNumber: 8, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'left', category: 'SMA Putra', teamA: getTeam('b-15'), teamB: getTeam('b-16'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '12.30 - 12.50 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m14', nextSlot: 'teamB' },
    { id: 'b-m9', matchCode: 'A13', courtName: 'Lapangan A', duration: "20'", matchNumber: 9, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'left', category: 'SMA Putra', teamA: getTeam('b-17'), teamB: getTeam('b-18'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '12.30 - 12.50 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-m16', nextSlot: 'teamA' },
    { id: 'b-m10', matchCode: 'B14', courtName: 'Lapangan B', duration: "20'", matchNumber: 10, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'left', category: 'SMA Putra', teamA: getTeam('b-19'), teamB: getTeam('b-20'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '12.50 - 13.10 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m16', nextSlot: 'teamB' },
    { id: 'b-m11', matchCode: 'A14', courtName: 'Lapangan A', duration: "20'", matchNumber: 11, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'left', category: 'SMA Putra', teamA: getTeam('b-21'), teamB: getTeam('b-22'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '12.50 - 13.10 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-m17', nextSlot: 'teamB' },

    // --- Right Wing Round 1: Babak 32 Besar (11 Matches - 14 Nov 2026) ---
    { id: 'b-m18', matchCode: 'B6', courtName: 'Lapangan B', duration: "20'", matchNumber: 12, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'right', category: 'SMA Putra', teamA: getTeam('b-23'), teamB: getTeam('b-24'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '09.40 - 10.00 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m30', nextSlot: 'teamB' },
    { id: 'b-m19', matchCode: 'A17', courtName: 'Lapangan A', duration: "20'", matchNumber: 13, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'right', category: 'SMA Putra', teamA: getTeam('b-25'), teamB: getTeam('b-26'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '13.50 - 14.10 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-m29', nextSlot: 'teamB' },
    { id: 'b-m20', matchCode: 'A5', courtName: 'Lapangan A', duration: "20'", matchNumber: 14, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'right', category: 'SMA Putra', teamA: getTeam('b-27'), teamB: getTeam('b-28'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '09.20 - 09.40 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-m30', nextSlot: 'teamA' },
    { id: 'b-m21', matchCode: 'B2', courtName: 'Lapangan B', duration: "20'", matchNumber: 15, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'right', category: 'SMA Putra', teamA: getTeam('b-29'), teamB: getTeam('b-30'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '08.20 - 08.40 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m33', nextSlot: 'teamA' },
    { id: 'b-m22', matchCode: 'B16', courtName: 'Lapangan B', duration: "20'", matchNumber: 16, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'right', category: 'SMA Putra', teamA: getTeam('b-31'), teamB: getTeam('b-32'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '13.30 - 13.50 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m31', nextSlot: 'teamA' },
    { id: 'b-m23', matchCode: 'A16', courtName: 'Lapangan A', duration: "20'", matchNumber: 17, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'right', category: 'SMA Putra', teamA: getTeam('b-33'), teamB: getTeam('b-34'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '13.30 - 13.50 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-m31', nextSlot: 'teamB' },
    { id: 'b-m24', matchCode: 'B4', courtName: 'Lapangan B', duration: "20'", matchNumber: 18, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'right', category: 'SMA Putra', teamA: getTeam('b-35'), teamB: getTeam('b-36'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '09.00 - 09.20 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m32', nextSlot: 'teamA' },
    { id: 'b-m25', matchCode: 'B17', courtName: 'Lapangan B', duration: "20'", matchNumber: 19, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'right', category: 'SMA Putra', teamA: getTeam('b-37'), teamB: getTeam('b-38'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '13.50 - 14.10 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m32', nextSlot: 'teamB' },
    { id: 'b-m26', matchCode: 'B1', courtName: 'Lapangan B', duration: "20'", matchNumber: 20, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'right', category: 'SMA Putra', teamA: getTeam('b-39'), teamB: getTeam('b-40'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '08.00 - 08.20 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m34', nextSlot: 'teamA' },
    { id: 'b-m27', matchCode: 'B18', courtName: 'Lapangan B', duration: "20'", matchNumber: 21, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'right', category: 'SMA Putra', teamA: getTeam('b-41'), teamB: getTeam('b-42'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '14.10 - 14.30 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-m33', nextSlot: 'teamB' },
    { id: 'b-m28', matchCode: 'A15', courtName: 'Lapangan A', duration: "20'", matchNumber: 22, roundName: 'Babak 32 Besar', roundIndex: 1, side: 'right', category: 'SMA Putra', teamA: getTeam('b-43'), teamB: getTeam('b-44'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '13.10 - 13.30 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-m34', nextSlot: 'teamB' },

    // --- Left Wing Round 2: Babak 16 Besar (14 Nov 2026) ---
    { id: 'b-m12', matchCode: 'A22', courtName: 'Lapangan A', duration: "20'", matchNumber: 23, roundName: 'Babak 16 Besar', roundIndex: 2, side: 'left', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '15.30 - 15.50 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-qf1', nextSlot: 'teamA' },
    { id: 'b-m13', matchCode: 'A23', courtName: 'Lapangan A', duration: "20'", matchNumber: 24, roundName: 'Babak 16 Besar', roundIndex: 2, side: 'left', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '15.50 - 16.10 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-qf1', nextSlot: 'teamB' },
    { id: 'b-m14', matchCode: 'A24', courtName: 'Lapangan A', duration: "20'", matchNumber: 25, roundName: 'Babak 16 Besar', roundIndex: 2, side: 'left', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '16.10 - 16.30 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-qf2', nextSlot: 'teamA' },
    { id: 'b-m15', matchCode: 'A25', courtName: 'Lapangan A', duration: "20'", matchNumber: 26, roundName: 'Babak 16 Besar', roundIndex: 2, side: 'left', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '16.30 - 16.50 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-qf2', nextSlot: 'teamB' },
    { id: 'b-m16', matchCode: 'A26', courtName: 'Lapangan A', duration: "20'", matchNumber: 27, roundName: 'Babak 16 Besar', roundIndex: 2, side: 'left', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '16.50 - 17.10 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-qf3', nextSlot: 'teamA' },
    { id: 'b-m17', matchCode: 'A27', courtName: 'Lapangan A', duration: "20'", matchNumber: 28, roundName: 'Babak 16 Besar', roundIndex: 2, side: 'left', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '17.10 - 17.30 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-qf4', nextSlot: 'teamA' },

    // --- Right Wing Round 2: Babak 16 Besar (14 Nov 2026) ---
    { id: 'b-m29', matchCode: 'B22', courtName: 'Lapangan B', duration: "20'", matchNumber: 29, roundName: 'Babak 16 Besar', roundIndex: 2, side: 'right', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '15.30 - 15.50 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-qf3', nextSlot: 'teamB' },
    { id: 'b-m30', matchCode: 'B23', courtName: 'Lapangan B', duration: "20'", matchNumber: 30, roundName: 'Babak 16 Besar', roundIndex: 2, side: 'right', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '15.50 - 16.10 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-qf1', nextSlot: 'teamB' },
    { id: 'b-m31', matchCode: 'B24', courtName: 'Lapangan B', duration: "20'", matchNumber: 31, roundName: 'Babak 16 Besar', roundIndex: 2, side: 'right', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '16.10 - 16.30 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-qf4', nextSlot: 'teamB' },
    { id: 'b-m32', matchCode: 'B25', courtName: 'Lapangan B', duration: "20'", matchNumber: 32, roundName: 'Babak 16 Besar', roundIndex: 2, side: 'right', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '16.30 - 16.50 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-qf2', nextSlot: 'teamB' },

    // --- Perempat Final / 8 Besar (14 Nov 2026 Malam) ---
    { id: 'b-qf1', matchCode: 'B28', courtName: 'Lapangan B', duration: "20'", matchNumber: 33, roundName: 'Perempat Final', roundIndex: 3, side: 'left', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '18.00 - 18.20 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-sf1', nextSlot: 'teamB' },
    { id: 'b-qf2', matchCode: 'B30', courtName: 'Lapangan B', duration: "20'", matchNumber: 34, roundName: 'Perempat Final', roundIndex: 3, side: 'left', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '18.40 - 19.00 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-x1', nextSlot: 'teamA' },
    { id: 'b-qf3', matchCode: 'B31', courtName: 'Lapangan B', duration: "20'", matchNumber: 35, roundName: 'Perempat Final', roundIndex: 3, side: 'right', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '19.00 - 19.20 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-x1', nextSlot: 'teamB' },
    { id: 'b-qf4', matchCode: 'B29', courtName: 'Lapangan B', duration: "20'", matchNumber: 36, roundName: 'Perempat Final', roundIndex: 3, side: 'right', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '18.20 - 18.40 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-x2', nextSlot: 'teamA' },
    { id: 'b-qf5', matchCode: 'A32', courtName: 'Lapangan A', duration: "20'", matchNumber: 37, roundName: 'Perempat Final', roundIndex: 3, side: 'right', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '19.20 - 19.40 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-x2', nextSlot: 'teamB' },
    { id: 'b-qf6', matchCode: 'B32', courtName: 'Lapangan B', duration: "20'", matchNumber: 38, roundName: 'Perempat Final', roundIndex: 3, side: 'right', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '19.20 - 19.40 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-sf2', nextSlot: 'teamA' },

    // --- Day 2 Putra: Playoff X1 & X2 serta Semifinal (15 Nov 2026 Pagi) ---
    { id: 'b-x1', matchCode: 'X1 (B30 vs B31)', courtName: 'Lapangan A', duration: "30'", matchNumber: 39, roundName: 'Perempat Final', roundIndex: 3, side: 'left', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '09.30 - 10.00 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-sf1', nextSlot: 'teamA' },
    { id: 'b-x2', matchCode: 'X2 (B29 vs A32)', courtName: 'Lapangan B', duration: "30'", matchNumber: 40, roundName: 'Perempat Final', roundIndex: 3, side: 'right', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '09.30 - 10.00 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-sf2', nextSlot: 'teamB' },
    { id: 'b-sf1', matchCode: 'WINNER X1 VS B28', courtName: 'Lapangan A', duration: "30'", matchNumber: 41, roundName: 'Semifinal', roundIndex: 4, side: 'left', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '11.00 - 11.30 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'b-final', nextSlot: 'teamA', loserNextMatchId: 'b-3rd' },
    { id: 'b-sf2', matchCode: 'WINNER B32 VS X2', courtName: 'Lapangan B', duration: "30'", matchNumber: 42, roundName: 'Semifinal', roundIndex: 4, side: 'right', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '11.00 - 11.30 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'b-final', nextSlot: 'teamB', loserNextMatchId: 'b-3rd' },

    // --- Center Stage: Perebutan Juara 3 & Grand Final (15 Nov 2026 Sore) ---
    { id: 'b-3rd', matchCode: 'JUARA 3', courtName: 'Lapangan B', duration: "30'", matchNumber: 43, roundName: 'Perebutan Juara 3', roundIndex: 5, side: 'center', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '14.30 - 15.00 WIB', arena: 'Lapangan B (GKB FIP UM)' },
    { id: 'b-final', matchCode: 'GRAND FINAL', courtName: 'Lapangan B', duration: "40'", matchNumber: 44, roundName: 'Grand Final', roundIndex: 5, side: 'center', category: 'SMA Putra', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '17.20 - 18.00 WIB', arena: 'Lapangan B (GKB FIP UM)' }
  ],

  // === SMA PUTRI (GIRLS) - 24 TEAMS (1.png) ===
  'SMA Putri': [
    // --- Babak 16 Besar (12 Matches - 14 Nov 2026) ---
    { id: 'g-m1', matchCode: 'A2', courtName: 'Lapangan A', duration: "20'", matchNumber: 45, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'left', category: 'SMA Putri', teamA: getTeam('g-1'), teamB: getTeam('g-2'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '08.20 - 08.40 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-qf1', nextSlot: 'teamA' },
    { id: 'g-m2', matchCode: 'A6', courtName: 'Lapangan A', duration: "20'", matchNumber: 46, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'left', category: 'SMA Putri', teamA: getTeam('g-3'), teamB: getTeam('g-4'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '09.40 - 10.00 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-qf1', nextSlot: 'teamB' },
    { id: 'g-m3', matchCode: 'A11', courtName: 'Lapangan A', duration: "20'", matchNumber: 47, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'left', category: 'SMA Putri', teamA: getTeam('g-5'), teamB: getTeam('g-6'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '11.50 - 12.10 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-qf2', nextSlot: 'teamA' },
    { id: 'g-m4', matchCode: 'B5', courtName: 'Lapangan B', duration: "20'", matchNumber: 48, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'left', category: 'SMA Putri', teamA: getTeam('g-7'), teamB: getTeam('g-8'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '09.20 - 09.40 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'g-qf2', nextSlot: 'teamB' },
    { id: 'g-m5', matchCode: 'A9', courtName: 'Lapangan A', duration: "20'", matchNumber: 49, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'left', category: 'SMA Putri', teamA: getTeam('g-9'), teamB: getTeam('g-10'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '10.40 - 11.00 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-qf3', nextSlot: 'teamA' },
    { id: 'g-m6', matchCode: 'B3', courtName: 'Lapangan B', duration: "20'", matchNumber: 50, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'left', category: 'SMA Putri', teamA: getTeam('g-11'), teamB: getTeam('g-12'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '08.40 - 09.00 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'g-qf3', nextSlot: 'teamB' },

    // --- Right Wing Round 1: Babak 16 Besar (6 Matches - 14 Nov 2026) ---
    { id: 'g-m7', matchCode: 'A7', courtName: 'Lapangan A', duration: "20'", matchNumber: 51, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'right', category: 'SMA Putri', teamA: getTeam('g-13'), teamB: getTeam('g-14'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '10.00 - 10.20 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-qf4', nextSlot: 'teamA' },
    { id: 'g-m8', matchCode: 'B8', courtName: 'Lapangan B', duration: "20'", matchNumber: 52, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'right', category: 'SMA Putri', teamA: getTeam('g-15'), teamB: getTeam('g-16'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '10.20 - 10.40 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'g-qf4', nextSlot: 'teamB' },
    { id: 'g-m9', matchCode: 'B7', courtName: 'Lapangan B', duration: "20'", matchNumber: 53, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'right', category: 'SMA Putri', teamA: getTeam('g-17'), teamB: getTeam('g-18'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '10.00 - 10.20 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'g-qf5', nextSlot: 'teamA' },
    { id: 'g-m10', matchCode: 'B9', courtName: 'Lapangan B', duration: "20'", matchNumber: 54, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'right', category: 'SMA Putri', teamA: getTeam('g-19'), teamB: getTeam('g-20'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '10.40 - 11.00 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'g-qf5', nextSlot: 'teamB' },
    { id: 'g-m11', matchCode: 'A3', courtName: 'Lapangan A', duration: "20'", matchNumber: 55, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'right', category: 'SMA Putri', teamA: getTeam('g-21'), teamB: getTeam('g-22'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '08.40 - 09.00 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-qf6', nextSlot: 'teamA' },
    { id: 'g-m12', matchCode: 'A1', courtName: 'Lapangan A', duration: "20'", matchNumber: 56, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'right', category: 'SMA Putri', teamA: getTeam('g-23'), teamB: getTeam('g-24'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '08.00 - 08.20 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-qf6', nextSlot: 'teamB' },

    // --- Perempat Final SMA Putri (14 Nov 2026 Sore / Malam) ---
    { id: 'g-qf1', matchCode: 'A28', courtName: 'Lapangan A', duration: "20'", matchNumber: 57, roundName: 'Perempat Final', roundIndex: 2, side: 'left', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '18.00 - 18.20 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-y1', nextSlot: 'teamA' },
    { id: 'g-qf2', matchCode: 'A29', courtName: 'Lapangan A', duration: "20'", matchNumber: 58, roundName: 'Perempat Final', roundIndex: 2, side: 'left', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '18.20 - 18.40 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-y1', nextSlot: 'teamB' },
    { id: 'g-qf3', matchCode: 'A30', courtName: 'Lapangan A', duration: "20'", matchNumber: 59, roundName: 'Perempat Final', roundIndex: 2, side: 'left', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '18.40 - 19.00 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-sf1', nextSlot: 'teamB' },
    { id: 'g-qf4', matchCode: 'B26', courtName: 'Lapangan B', duration: "20'", matchNumber: 60, roundName: 'Perempat Final', roundIndex: 2, side: 'right', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '16.50 - 17.10 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'g-y2', nextSlot: 'teamA' },
    { id: 'g-qf5', matchCode: 'A31', courtName: 'Lapangan A', duration: "20'", matchNumber: 61, roundName: 'Perempat Final', roundIndex: 2, side: 'right', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '19.00 - 19.20 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-y2', nextSlot: 'teamB' },
    { id: 'g-qf6', matchCode: 'B27', courtName: 'Lapangan B', duration: "20'", matchNumber: 62, roundName: 'Perempat Final', roundIndex: 2, side: 'right', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '17.10 - 17.30 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'g-sf2', nextSlot: 'teamB' },

    // --- Day 2 Putri: Semifinal (15 Nov 2026 Pagi) ---
    { id: 'g-y1', matchCode: 'Y1 (A28 vs A29)', courtName: 'Lapangan A', duration: "30'", matchNumber: 63, roundName: 'Semifinal', roundIndex: 3, side: 'left', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '10.00 - 10.30 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-sf1', nextSlot: 'teamA' },
    { id: 'g-y2', matchCode: 'Y2 (B26 vs A31)', courtName: 'Lapangan B', duration: "30'", matchNumber: 64, roundName: 'Semifinal', roundIndex: 3, side: 'right', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '10.00 - 10.30 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'g-sf2', nextSlot: 'teamA' },
    { id: 'g-sf1', matchCode: 'WINNER Y1 vs A30', courtName: 'Lapangan A', duration: "30'", matchNumber: 65, roundName: 'Semifinal', roundIndex: 4, side: 'left', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '11.30 - 12.00 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'g-final', nextSlot: 'teamA', loserNextMatchId: 'g-3rd' },
    { id: 'g-sf2', matchCode: 'WINNER Y2 vs B27', courtName: 'Lapangan B', duration: "30'", matchNumber: 66, roundName: 'Semifinal', roundIndex: 4, side: 'right', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '11.30 - 12.00 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'g-final', nextSlot: 'teamB', loserNextMatchId: 'g-3rd' },

    // --- Center Stage: Perebutan Juara 3 & Grand Final (15 Nov 2026 Sore) ---
    { id: 'g-3rd', matchCode: 'JUARA 3', courtName: 'Lapangan B', duration: "30'", matchNumber: 67, roundName: 'Perebutan Juara 3', roundIndex: 5, side: 'center', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '13.30 - 14.00 WIB', arena: 'Lapangan B (GKB FIP UM)' },
    { id: 'g-final', matchCode: 'GRAND FINAL', courtName: 'Lapangan B', duration: "40'", matchNumber: 68, roundName: 'Grand Final', roundIndex: 5, side: 'center', category: 'SMA Putri', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '15.20 - 16.00 WIB', arena: 'Lapangan B (GKB FIP UM)' }
  ],

  // === KATEGORI UMUM - 16 TEAMS (3.png) ===
  'Umum': [
    // --- Babak 16 Besar (8 Matches - 14 Nov 2026 Siang/Sore) ---
    { id: 'u-m1', matchCode: 'A18', courtName: 'Lapangan A', duration: "20'", matchNumber: 69, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'left', category: 'Umum', teamA: getTeam('u-1'), teamB: getTeam('u-2'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '14.10 - 14.30 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'u-qf1', nextSlot: 'teamA' },
    { id: 'u-m2', matchCode: 'A19', courtName: 'Lapangan A', duration: "20'", matchNumber: 70, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'left', category: 'Umum', teamA: getTeam('u-3'), teamB: getTeam('u-4'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '14.30 - 14.50 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'u-qf1', nextSlot: 'teamB' },
    { id: 'u-m3', matchCode: 'B19', courtName: 'Lapangan B', duration: "20'", matchNumber: 71, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'left', category: 'Umum', teamA: getTeam('u-5'), teamB: getTeam('u-6'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '14.30 - 14.50 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'u-qf2', nextSlot: 'teamA' },
    { id: 'u-m4', matchCode: 'A20', courtName: 'Lapangan A', duration: "20'", matchNumber: 72, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'left', category: 'Umum', teamA: getTeam('u-7'), teamB: getTeam('u-8'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '14.50 - 15.10 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'u-qf2', nextSlot: 'teamB' },

    { id: 'u-m5', matchCode: 'B20', courtName: 'Lapangan B', duration: "20'", matchNumber: 73, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'right', category: 'Umum', teamA: getTeam('u-9'), teamB: getTeam('u-10'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '14.50 - 15.10 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'u-qf3', nextSlot: 'teamA' },
    { id: 'u-m6', matchCode: 'A21', courtName: 'Lapangan A', duration: "20'", matchNumber: 74, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'right', category: 'Umum', teamA: getTeam('u-11'), teamB: getTeam('u-12'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '15.10 - 15.30 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'u-qf3', nextSlot: 'teamB' },
    { id: 'u-m7', matchCode: 'B21', courtName: 'Lapangan B', duration: "20'", matchNumber: 75, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'right', category: 'Umum', teamA: getTeam('u-13'), teamB: getTeam('u-14'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '15.10 - 15.30 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'u-qf4', nextSlot: 'teamA' },
    { id: 'u-m8', matchCode: 'B11', courtName: 'Lapangan B', duration: "20'", matchNumber: 76, roundName: 'Babak 16 Besar', roundIndex: 1, side: 'right', category: 'Umum', teamA: getTeam('u-15'), teamB: getTeam('u-16'), scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '11.50 - 12.10 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'u-qf4', nextSlot: 'teamB' },

    // --- Perempat Final Kategori Umum (14 Nov 2026 Malam) ---
    { id: 'u-qf1', matchCode: 'A33', courtName: 'Lapangan A', duration: "20'", matchNumber: 77, roundName: 'Perempat Final', roundIndex: 2, side: 'left', category: 'Umum', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '19.40 - 20.00 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'u-sf1', nextSlot: 'teamA' },
    { id: 'u-qf2', matchCode: 'A34', courtName: 'Lapangan A', duration: "20'", matchNumber: 78, roundName: 'Perempat Final', roundIndex: 2, side: 'left', category: 'Umum', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '20.00 - 20.20 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'u-sf1', nextSlot: 'teamB' },
    { id: 'u-qf3', matchCode: 'B33', courtName: 'Lapangan B', duration: "20'", matchNumber: 79, roundName: 'Perempat Final', roundIndex: 2, side: 'right', category: 'Umum', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '19.40 - 20.00 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'u-sf2', nextSlot: 'teamA' },
    { id: 'u-qf4', matchCode: 'B34', courtName: 'Lapangan B', duration: "20'", matchNumber: 80, roundName: 'Perempat Final', roundIndex: 2, side: 'right', category: 'Umum', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-14', time: '20.00 - 20.20 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'u-sf2', nextSlot: 'teamB' },

    // --- Semifinal Kategori Umum (15 Nov 2026 Pagi) ---
    { id: 'u-sf1', matchCode: 'Z1 (A33 vs A34)', courtName: 'Lapangan A', duration: "30'", matchNumber: 81, roundName: 'Semifinal', roundIndex: 3, side: 'left', category: 'Umum', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '10.30 - 11.00 WIB', arena: 'Lapangan A (GKB FIP UM)', nextMatchId: 'u-final', nextSlot: 'teamA', loserNextMatchId: 'u-3rd' },
    { id: 'u-sf2', matchCode: 'Z2 (B33 vs B34)', courtName: 'Lapangan B', duration: "30'", matchNumber: 82, roundName: 'Semifinal', roundIndex: 3, side: 'right', category: 'Umum', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '10.30 - 11.00 WIB', arena: 'Lapangan B (GKB FIP UM)', nextMatchId: 'u-final', nextSlot: 'teamB', loserNextMatchId: 'u-3rd' },

    // --- Center Stage: Perebutan Juara 3 & Grand Final (15 Nov 2026 Sore) ---
    { id: 'u-3rd', matchCode: 'JUARA 3', courtName: 'Lapangan B', duration: "30'", matchNumber: 83, roundName: 'Perebutan Juara 3', roundIndex: 4, side: 'center', category: 'Umum', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '14.00 - 14.30 WIB', arena: 'Lapangan B (GKB FIP UM)' },
    { id: 'u-final', matchCode: 'GRAND FINAL', courtName: 'Lapangan B', duration: "40'", matchNumber: 84, roundName: 'Grand Final', roundIndex: 4, side: 'center', category: 'Umum', teamA: null, teamB: null, scoreA: null, scoreB: null, winnerId: null, status: 'Akan Datang', date: '2026-11-15', time: '16.20 - 17.00 WIB', arena: 'Lapangan B (GKB FIP UM)' }
  ]
};

// ==========================================
// 2. FULL OFFICIAL SCHEDULE (JADWAL MATCH)
// ==========================================

export const INITIAL_MATCHES: Match[] = [
  ...INITIAL_BRACKETS['SMA Putra'].map(b => ({
    id: b.id,
    matchNumber: b.matchNumber || 1,
    matchCode: b.matchCode,
    courtName: b.courtName,
    duration: b.duration,
    category: b.category,
    stage: b.roundName,
    arena: b.arena || (b.courtName ? `${b.courtName} (GKB FIP UM)` : 'Lapangan A (GKB FIP UM)'),
    date: b.date,
    time: b.time,
    status: b.status,
    teamA: b.teamA || { id: `tbd-${b.id}-a`, name: 'Menunggu Pemenang', shortName: 'TBD', category: b.category, logo: '🛡️', origin: 'Penyisihan' },
    teamB: b.teamB || { id: `tbd-${b.id}-b`, name: 'Menunggu Pemenang', shortName: 'TBD', category: b.category, logo: '🛡️', origin: 'Penyisihan' },
    scoreA: 0,
    scoreB: 0,
    foulsA: 0,
    foulsB: 0,
    currentPeriod: undefined,
    timeRemaining: undefined,
    shotClock: undefined,
    winnerId: undefined,
    streamUrl: undefined,
    isStartingSoon: b.matchCode === 'A10' || b.matchCode === 'B1'
  })),

  ...INITIAL_BRACKETS['SMA Putri'].map(b => ({
    id: b.id,
    matchNumber: b.matchNumber || 1,
    matchCode: b.matchCode,
    courtName: b.courtName,
    duration: b.duration,
    category: b.category,
    stage: b.roundName,
    arena: b.arena || (b.courtName ? `${b.courtName} (GKB FIP UM)` : 'Lapangan A (GKB FIP UM)'),
    date: b.date,
    time: b.time,
    status: b.status,
    teamA: b.teamA || { id: `tbd-${b.id}-a`, name: 'Menunggu Pemenang', shortName: 'TBD', category: b.category, logo: '🌸', origin: 'Penyisihan' },
    teamB: b.teamB || { id: `tbd-${b.id}-b`, name: 'Menunggu Pemenang', shortName: 'TBD', category: b.category, logo: '🌸', origin: 'Penyisihan' },
    scoreA: 0,
    scoreB: 0,
    foulsA: 0,
    foulsB: 0,
    currentPeriod: undefined,
    timeRemaining: undefined,
    shotClock: undefined,
    winnerId: undefined,
    streamUrl: undefined,
    isStartingSoon: b.matchCode === 'A1'
  })),

  ...INITIAL_BRACKETS['Umum'].map(b => ({
    id: b.id,
    matchNumber: b.matchNumber || 1,
    matchCode: b.matchCode,
    courtName: b.courtName,
    duration: b.duration,
    category: b.category,
    stage: b.roundName,
    arena: b.arena || (b.courtName ? `${b.courtName} (GKB FIP UM)` : 'Lapangan A (GKB FIP UM)'),
    date: b.date,
    time: b.time,
    status: b.status,
    teamA: b.teamA || { id: `tbd-${b.id}-a`, name: 'Menunggu Pemenang', shortName: 'TBD', category: b.category, logo: '⚡', origin: 'Penyisihan' },
    teamB: b.teamB || { id: `tbd-${b.id}-b`, name: 'Menunggu Pemenang', shortName: 'TBD', category: b.category, logo: '⚡', origin: 'Penyisihan' },
    scoreA: 0,
    scoreB: 0,
    foulsA: 0,
    foulsB: 0,
    currentPeriod: undefined,
    timeRemaining: undefined,
    shotClock: undefined,
    winnerId: undefined,
    streamUrl: undefined,
    isStartingSoon: false
  }))
].sort((a, b) => {
  // Sort by date first, then by time start
  if (a.date !== b.date) return a.date.localeCompare(b.date);
  return a.time.localeCompare(b.time);
});

// ==========================================
// 3. TICKET TIERS & PURCHASES
// ==========================================

export const INITIAL_TICKETS: TicketTier[] = [
  {
    id: 't-day1',
    name: 'Tiket Day 1 (Sabtu, 14 Nov 2026)',
    tagline: '1 Tiket untuk 1 Hari: Babak Penyisihan & 16 Besar',
    price: 15000,
    totalQuota: 100,
    remainingQuota: 99,
    color: 'bronze',
    validDays: '1 Hari (Sabtu, 14 November 2026)',
    perks: [
      '1 Tiket berlaku khusus 1 hari penuh pada Sabtu, 14 Nov 2026',
      'Akses Masuk Seluruh Pertandingan Day 1 (Babak 32 Besar & 16 Besar)',
      'Akses Lapangan A & Lapangan B GKB FIP Universitas Negeri Malang',
      'Gelang Wristband Resmi Hari ke-1 (14 Nov)'
    ]
  },
  {
    id: 't-day2',
    name: 'Tiket Day 2 (Minggu, 15 Nov 2026)',
    tagline: '1 Tiket untuk 1 Hari: Perempat Final s/d Grand Final',
    price: 25000,
    totalQuota: 100,
    remainingQuota: 98,
    color: 'gold',
    isPopular: true,
    validDays: '1 Hari (Minggu, 15 November 2026)',
    perks: [
      '1 Tiket berlaku khusus 1 hari penuh pada Minggu, 15 Nov 2026',
      'Akses Seluruh Pertandingan Penentuan (Perempat Final, Semifinal, Final)',
      'Akses Lapangan A & Lapangan B GKB FIP Universitas Negeri Malang',
      'Menyaksikan Grand Final & Closing Awarding Ceremony',
      'Gelang Wristband Resmi Hari ke-2 (15 Nov)'
    ]
  }
];

export const INITIAL_PURCHASES: TicketPurchase[] = [];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-11-13 18:00:00',
    operator: 'Panitia Turnamen (Imonoke x UM)',
    action: 'PENGESAHAN_BAGAN',
    target: 'Bagan Resmi 84 Tim (Putra 44, Putri 24, Umum 16)',
    details: 'Bagan pertandingan 3x3 resmi disahkan. Seluruh pertandingan dijadwalkan mulai Sabtu, 14 Nov 2026 dan selesai Minggu, 15 Nov 2026.'
  },
  {
    id: 'log-2',
    timestamp: '2026-11-13 17:30:15',
    operator: 'Operator Jadwal',
    action: 'PUBLISH_SCHEDULE',
    target: 'Jadwal 84 Laga 3x3 Arena GKB FIP Universitas Negeri Malang',
    details: '84 Jadwal pertandingan resmi dipublikasikan ke situs turnamen.'
  },
  {
    id: 'log-3',
    timestamp: '2026-11-13 10:22:15',
    operator: 'Admin Tiket (Siti)',
    action: 'VERIFY_TICKET',
    target: 'ORD-IMO-901 (Fajar Nugraha)',
    details: 'Pembayaran QRIS Rp 85.324 disetujui. Kode IMO-GLD-901-A diterbitkan.'
  }
];

// ==========================================
// 4. OFFICIAL TIMETABLE & RUNDOWN HARIAN RESMI
// Sesuai Surat Jadwal Resmi Panitia Turnamen
// ==========================================

export interface RundownItem {
  court: 'Lap : A' | 'Lap : B' | 'Final Lap : B';
  time: string;
  duration: string;
  code?: string;
  activity: string;
  category?: 'SMA Putra' | 'SMA Putri' | 'Umum' | 'Acara';
  highlight?: boolean;
}

export const OFFICIAL_RUNDOWN_DAY1_COURT_A: RundownItem[] = [
  { court: 'Lap : A', time: '07.15 - 07.45', duration: "30'", activity: 'Pembukaan', category: 'Acara' },
  { court: 'Lap : A', time: '07.45 - 08.00', duration: "15'", activity: 'Steril Area', category: 'Acara' },
  { court: 'Lap : A', time: '08.00 - 08.20', duration: "20'", code: 'A1', activity: 'W: SMAN 8 MALANG (C) vs SMAN 9 MALANG (B)', category: 'SMA Putri' },
  { court: 'Lap : A', time: '08.20 - 08.40', duration: "20'", code: 'A2', activity: 'A: SMAN 1 LAWANG (B) vs SMAN 8 MALANG (B)', category: 'SMA Putri' },
  { court: 'Lap : A', time: '08.40 - 09.00', duration: "20'", code: 'A3', activity: 'U: SMAN 8 MALANG (A) vs SMAN 4 SIDOARJO', category: 'SMA Putri' },
  { court: 'Lap : A', time: '09.00 - 09.20', duration: "20'", code: 'A4', activity: 'E: SMAN 3 MALANG (B) vs SMKN 11 MALANG (B)', category: 'SMA Putra' },
  { court: 'Lap : A', time: '09.20 - 09.40', duration: "20'", code: 'A5', activity: 'A1: SMKN 11 MALANG (A) vs SMAN 1 TUREN (B)', category: 'SMA Putra' },
  { court: 'Lap : A', time: '09.40 - 10.00', duration: "20'", code: 'A6', activity: 'C: SMAN 1 LAWANG (A) vs SMAN 1 TUREN (A)', category: 'SMA Putri' },
  { court: 'Lap : A', time: '10.00 - 10.20', duration: "20'", code: 'A7', activity: 'M: SMAN 1 TUREN (B) vs SMAN TARUNA NUSANTARA (B)', category: 'SMA Putri' },
  { court: 'Lap : A', time: '10.20 - 10.40', duration: "20'", code: 'A8', activity: 'M: SMA ISLAM SABILILLAH (B) vs SMKN 1 PURWOSARI (A)', category: 'SMA Putra' },
  { court: 'Lap : A', time: '10.40 - 11.00', duration: "20'", code: 'A9', activity: 'I: SMAN 1 MALANG (B) vs SMAN 2 NGANJUK', category: 'SMA Putri' },
  { court: 'Lap : A', time: '11.00 - 11.20', duration: "20'", code: 'A10', activity: 'A: SMA TARUNA NUSANTARA (A) vs SMAN 1 GONDANGLEGI (B)', category: 'SMA Putra' },
  { court: 'Lap : A', time: '11.20 - 11.50', duration: "30'", activity: 'BREAK', category: 'Acara' },
  { court: 'Lap : A', time: '11.50 - 12.10', duration: "20'", code: 'A11', activity: 'E: SMAN 21 SURABAYA vs SMAN 4 MALANG (B)', category: 'SMA Putri' },
  { court: 'Lap : A', time: '12.10 - 12.30', duration: "20'", code: 'A12', activity: 'I: SMA 3 MUHAMMADIYAH (A) vs SMA TARUNA NUSANTARA (B)', category: 'SMA Putra' },
  { court: 'Lap : A', time: '12.30 - 12.50', duration: "20'", code: 'A13', activity: 'Q: SMAN 1 GENDING (A) vs SMAN 4 SIDOARJO', category: 'SMA Putra' },
  { court: 'Lap : A', time: '12.50 - 13.10', duration: "20'", code: 'A14', activity: 'U: SMA AR ROHMAH (B) vs SMAN 3 MALANG (A)', category: 'SMA Putra' },
  { court: 'Lap : A', time: '13.10 - 13.30', duration: "20'", code: 'A15', activity: 'Q1: SMAN 1 PANDAAN (A) vs SMA 3 MUHAMMADIYAH (B)', category: 'SMA Putra' },
  { court: 'Lap : A', time: '13.30 - 13.50', duration: "20'", code: 'A16', activity: 'G1: SMAN 1 TALUN vs SMAN 1 KEDIRI', category: 'SMA Putra' },
  { court: 'Lap : A', time: '13.50 - 14.10', duration: "20'", code: 'A17', activity: 'Y: SMAN 1 GONDANGLEGI (A) vs SMA NLS', category: 'SMA Putra' },
  { court: 'Lap : A', time: '14.10 - 14.30', duration: "20'", code: 'A18', activity: '1: TAHU TEK vs BHAP TEAM', category: 'Umum' },
  { court: 'Lap : A', time: '14.30 - 14.50', duration: "20'", code: 'A19', activity: '3: APEX vs LAWAX', category: 'Umum' },
  { court: 'Lap : A', time: '14.50 - 15.10', duration: "20'", code: 'A20', activity: '7: BROTOSENO vs RED TEAM', category: 'Umum' },
  { court: 'Lap : A', time: '15.10 - 15.30', duration: "20'", code: 'A21', activity: '11: RED FLAG BOYS vs SEDUHLUR', category: 'Umum' },
  { court: 'Lap : A', time: '15.30 - 15.50', duration: "20'", code: 'A22', activity: 'WINNER MATCH A10 VS WINNER MATCH B10', category: 'SMA Putra', highlight: true },
  { court: 'Lap : A', time: '15.50 - 16.10', duration: "20'", code: 'A23', activity: 'WINNER MATCH A4 VS WINNER MATCH B15', category: 'SMA Putra', highlight: true },
  { court: 'Lap : A', time: '16.10 - 16.30', duration: "20'", code: 'A24', activity: 'WINNER MATCH A12 VS WINNER MATCH B12', category: 'SMA Putra', highlight: true },
  { court: 'Lap : A', time: '16.30 - 16.50', duration: "20'", code: 'A25', activity: 'WINNER MATCH A8 VS WINNER MATCH B13', category: 'SMA Putra', highlight: true },
  { court: 'Lap : A', time: '16.50 - 17.10', duration: "20'", code: 'A26', activity: 'WINNER MATCH A13 VS WINNER MATCH B14', category: 'SMA Putra', highlight: true },
  { court: 'Lap : A', time: '17.10 - 17.30', duration: "20'", code: 'A27', activity: 'WINNER MATCH B6 VS WINNER MATCH A17', category: 'SMA Putra', highlight: true },
  { court: 'Lap : A', time: '17.30 - 18.00', duration: "30'", activity: 'BREAK', category: 'Acara' },
  { court: 'Lap : A', time: '18.00 - 18.20', duration: "20'", code: 'A28', activity: 'WINNER MATCH A2 VS WINNER MATCH A6', category: 'SMA Putri', highlight: true },
  { court: 'Lap : A', time: '18.20 - 18.40', duration: "20'", code: 'A29', activity: 'WINNER MATCH A11 VS WINNER MATCH B5', category: 'SMA Putri', highlight: true },
  { court: 'Lap : A', time: '18.40 - 19.00', duration: "20'", code: 'A30', activity: 'WINNER MATCH A9 VS WINNER MATCH B3', category: 'SMA Putri', highlight: true },
  { court: 'Lap : A', time: '19.00 - 19.20', duration: "20'", code: 'A31', activity: 'WINNER MATCH B7 VS WINNER MATCH B9', category: 'SMA Putri', highlight: true },
  { court: 'Lap : A', time: '19.20 - 19.40', duration: "20'", code: 'A32', activity: 'WINNER MATCH B25 VS WINNER MATCH B22', category: 'SMA Putra', highlight: true },
  { court: 'Lap : A', time: '19.40 - 20.00', duration: "20'", code: 'A33', activity: 'WINNER MATCH A18 VS WINNER MATCH A19', category: 'Umum', highlight: true },
  { court: 'Lap : A', time: '20.00 - 20.20', duration: "20'", code: 'A34', activity: 'WINNER MATCH B19 VS WINNER MATCH A20', category: 'Umum', highlight: true }
];

export const OFFICIAL_RUNDOWN_DAY1_COURT_B: RundownItem[] = [
  { court: 'Lap : B', time: '07.15 - 07.45', duration: "30'", activity: 'Pembukaan', category: 'Acara' },
  { court: 'Lap : B', time: '07.45 - 08.00', duration: "15'", activity: 'Steril Area', category: 'Acara' },
  { court: 'Lap : B', time: '08.00 - 08.20', duration: "20'", code: 'B1', activity: 'M1: SMA LABORATORIUM UM vs SMAN 8 MALANG (B)', category: 'SMA Putra' },
  { court: 'Lap : B', time: '08.20 - 08.40', duration: "20'", code: 'B2', activity: 'C1: SMAN 1 MALANG (B) vs SMAN 8 MALANG (C)', category: 'SMA Putra' },
  { court: 'Lap : B', time: '08.40 - 09.00', duration: "20'", code: 'B3', activity: 'K: SMAN 4 MALANG (A) vs SMAN 9 MALANG (A)', category: 'SMA Putri' },
  { court: 'Lap : B', time: '09.00 - 09.20', duration: "20'", code: 'B4', activity: 'I1: SMAN 8 MALANG (A) vs SMAN 1 TUREN (A)', category: 'SMA Putra' },
  { court: 'Lap : B', time: '09.20 - 09.40', duration: "20'", code: 'B5', activity: 'G: SMAN 1 MALANG (A) vs SMAN 3 MALANG', category: 'SMA Putri' },
  { court: 'Lap : B', time: '09.40 - 10.00', duration: "20'", code: 'B6', activity: 'W: SMKN 8 MALANG (A) vs CHARIS INTERNATIONAL ACADEMIC', category: 'SMA Putra' },
  { court: 'Lap : B', time: '10.00 - 10.20', duration: "20'", code: 'B7', activity: 'Q: SMAN TARUNA NUSANTARA (A) vs SMAN 1 MALANG (C)', category: 'SMA Putri' },
  { court: 'Lap : B', time: '10.20 - 10.40', duration: "20'", code: 'B8', activity: 'O: SMAN 1 GRATI vs SMAN 1 PANDAAN', category: 'SMA Putri' },
  { court: 'Lap : B', time: '10.40 - 11.00', duration: "20'", code: 'B9', activity: 'S: SMAN 1 BATU vs SMAK FRATERAN MALANG', category: 'SMA Putri' },
  { court: 'Lap : B', time: '11.00 - 11.20', duration: "20'", code: 'B10', activity: 'C: SMAN 5 SURABAYA (GALAKSI) vs SMAN 1 MALANG (C)', category: 'SMA Putra' },
  { court: 'Lap : B', time: '11.20 - 11.50', duration: "30'", activity: 'BREAK', category: 'Acara' },
  { court: 'Lap : B', time: '11.50 - 12.10', duration: "20'", code: 'B11', activity: '15: EAST SIDE vs UNIK', category: 'Umum' },
  { court: 'Lap : B', time: '12.10 - 12.30', duration: "20'", code: 'B12', activity: 'K: SMA ISLAM SABILILLAH (A) vs SMAN 1 JEMBER', category: 'SMA Putra' },
  { court: 'Lap : B', time: '12.30 - 12.50', duration: "20'", code: 'B13', activity: 'O: SMKN 1 PURWOSARI (B) vs SMA BSS (B)', category: 'SMA Putra' },
  { court: 'Lap : B', time: '12.50 - 13.10', duration: "20'", code: 'B14', activity: 'S: SMA AR ROHMAH (C) vs SMAN 5 SURABAYA', category: 'SMA Putra' },
  { court: 'Lap : B', time: '13.10 - 13.30', duration: "20'", code: 'B15', activity: 'G: SMKN 8 MALANG (B) vs SMAN 1 MALANG (A)', category: 'SMA Putra' },
  { court: 'Lap : B', time: '13.30 - 13.50', duration: "20'", code: 'B16', activity: 'E1: SMAN 1 GRATI vs SMA BSS (A)', category: 'SMA Putra' },
  { court: 'Lap : B', time: '13.50 - 14.10', duration: "20'", code: 'B17', activity: 'K1: SMAN 1 KEDIRI (CEMAST) vs SMA AR ROHMAH (A)', category: 'SMA Putra' },
  { court: 'Lap : B', time: '14.10 - 14.30', duration: "20'", code: 'B18', activity: 'O1: SMKN 1 SUKOREJO vs SMA AL IZZAH BATU', category: 'SMA Putra' },
  { court: 'Lap : B', time: '14.30 - 14.50', duration: "20'", code: 'B19', activity: '5: YOK COLL vs UWIKA', category: 'Umum' },
  { court: 'Lap : B', time: '14.50 - 15.10', duration: "20'", code: 'B20', activity: '9: KECAP KECUP vs JOMBANG THUNDER', category: 'Umum' },
  { court: 'Lap : B', time: '15.10 - 15.30', duration: "20'", code: 'B21', activity: '13: EYWAN vs ALIEN JAHAT', category: 'Umum' },
  { court: 'Lap : B', time: '15.30 - 15.50', duration: "20'", code: 'B22', activity: 'WINNER MATCH B4 VS WINNER MATCH B17', category: 'SMA Putra', highlight: true },
  { court: 'Lap : B', time: '15.50 - 16.10', duration: "20'", code: 'B23', activity: 'WINNER MATCH B1 VS WINNER MATCH B18', category: 'SMA Putra', highlight: true },
  { court: 'Lap : B', time: '16.10 - 16.30', duration: "20'", code: 'B24', activity: 'WINNER MATCH A5 VS WINNER MATCH B2', category: 'SMA Putra', highlight: true },
  { court: 'Lap : B', time: '16.30 - 16.50', duration: "20'", code: 'B25', activity: 'WINNER MATCH B16 VS WINNER MATCH A16', category: 'SMA Putra', highlight: true },
  { court: 'Lap : B', time: '16.50 - 17.10', duration: "20'", code: 'B26', activity: 'WINNER MATCH A7 VS WINNER MATCH B8', category: 'SMA Putri', highlight: true },
  { court: 'Lap : B', time: '17.10 - 17.30', duration: "20'", code: 'B27', activity: 'WINNER MATCH A3 VS WINNER MATCH A1', category: 'SMA Putri', highlight: true },
  { court: 'Lap : B', time: '17.30 - 18.00', duration: "30'", activity: 'BREAK', category: 'Acara' },
  { court: 'Lap : B', time: '18.00 - 18.20', duration: "20'", code: 'B28', activity: 'WINNER MATCH A22 VS WINNER MATCH A23', category: 'SMA Putra', highlight: true },
  { court: 'Lap : B', time: '18.20 - 18.40', duration: "20'", code: 'B29', activity: 'WINNER MATCH B23 VS WINNER MATCH A15', category: 'SMA Putra', highlight: true },
  { court: 'Lap : B', time: '18.40 - 19.00', duration: "20'", code: 'B30', activity: 'WINNER MATCH A24 VS WINNER MATCH A25', category: 'SMA Putra', highlight: true },
  { court: 'Lap : B', time: '19.00 - 19.20', duration: "20'", code: 'B31', activity: 'WINNER MATCH A26 VS WINNER MATCH A14', category: 'SMA Putra', highlight: true },
  { court: 'Lap : B', time: '19.20 - 19.40', duration: "20'", code: 'B32', activity: 'WINNER MATCH A27 VS WINNER MATCH B24', category: 'SMA Putra', highlight: true },
  { court: 'Lap : B', time: '19.40 - 20.00', duration: "20'", code: 'B33', activity: 'WINNER MATCH B20 VS WINNER MATCH A21', category: 'Umum', highlight: true },
  { court: 'Lap : B', time: '20.00 - 20.20', duration: "20'", code: 'B34', activity: 'WINNER MATCH B21 VS WINNER MATCH B11', category: 'Umum', highlight: true }
];

export const OFFICIAL_RUNDOWN_DAY2_COURT_A: RundownItem[] = [
  { court: 'Lap : A', time: '09.30 - 10.00', duration: "30'", code: 'X1', activity: 'WINNER MATCH B30 VS WINNER MATCH B31', category: 'SMA Putra', highlight: true },
  { court: 'Lap : A', time: '10.00 - 10.30', duration: "30'", code: 'Y1', activity: 'WINNER MATCH A28 VS WINNER MATCH A29', category: 'SMA Putri', highlight: true },
  { court: 'Lap : A', time: '10.30 - 11.00', duration: "30'", code: 'Z1', activity: 'WINNER MATCH A33 VS WINNER MATCH A34', category: 'Umum', highlight: true },
  { court: 'Lap : A', time: '11.00 - 11.30', duration: "30'", code: 'SF', activity: 'WINNER MATCH X1 VS WINNER MATCH B28', category: 'SMA Putra', highlight: true },
  { court: 'Lap : A', time: '11.30 - 12.00', duration: "30'", code: 'SF', activity: 'WINNER MATCH Y1 VS WINNER MATCH A30', category: 'SMA Putri', highlight: true },
  { court: 'Lap : A', time: '12.00 - 13.30', duration: "90'", activity: 'Ada break 90 menit untuk istirahat dan steril area', category: 'Acara' }
];

export const OFFICIAL_RUNDOWN_DAY2_COURT_B: RundownItem[] = [
  { court: 'Lap : B', time: '09.30 - 10.00', duration: "30'", code: 'X2', activity: 'WINNER MATCH B29 VS WINNER MATCH A32', category: 'SMA Putra', highlight: true },
  { court: 'Lap : B', time: '10.00 - 10.30', duration: "30'", code: 'Y2', activity: 'WINNER MATCH B26 VS WINNER MATCH A31', category: 'SMA Putri', highlight: true },
  { court: 'Lap : B', time: '10.30 - 11.00', duration: "30'", code: 'Z2', activity: 'WINNER MATCH B33 VS WINNER MATCH B34', category: 'Umum', highlight: true },
  { court: 'Lap : B', time: '11.00 - 11.30', duration: "30'", code: 'SF', activity: 'WINNER MATCH B32 VS WINNER MATCH X2', category: 'SMA Putra', highlight: true },
  { court: 'Lap : B', time: '11.30 - 12.00', duration: "30'", code: 'SF', activity: 'WINNER MATCH Y2 VS WINNER MATCH B27', category: 'SMA Putri', highlight: true },
  { court: 'Lap : B', time: '12.00 - 13.30', duration: "90'", activity: 'Ada break 90 menit untuk istirahat dan steril area', category: 'Acara' }
];

export const OFFICIAL_RUNDOWN_DAY2_FINALS: RundownItem[] = [
  { court: 'Final Lap : B', time: '13.30 - 14.00', duration: "30'", code: '3RD', activity: 'JUARA 3 (SMA Putri)', category: 'SMA Putri', highlight: true },
  { court: 'Final Lap : B', time: '14.00 - 14.30', duration: "30'", code: '3RD', activity: 'JUARA 3 (Kategori Umum)', category: 'Umum', highlight: true },
  { court: 'Final Lap : B', time: '14.30 - 15.00', duration: "30'", code: '3RD', activity: 'JUARA 3 (SMA Putra)', category: 'SMA Putra', highlight: true },
  { court: 'Final Lap : B', time: '15.00 - 15.20', duration: "20'", activity: 'STERIL AREA', category: 'Acara' },
  { court: 'Final Lap : B', time: '15.20 - 16.00', duration: "40'", code: 'FINAL', activity: 'FINAL (SMA Putri)', category: 'SMA Putri', highlight: true },
  { court: 'Final Lap : B', time: '16.00 - 16.20', duration: "20'", activity: 'STERIL AREA', category: 'Acara' },
  { court: 'Final Lap : B', time: '16.20 - 17.00', duration: "40'", code: 'FINAL', activity: 'FINAL (Kategori Umum)', category: 'Umum', highlight: true },
  { court: 'Final Lap : B', time: '17.00 - 17.20', duration: "20'", activity: 'STERIL AREA', category: 'Acara' },
  { court: 'Final Lap : B', time: '17.20 - 18.00', duration: "40'", code: 'FINAL', activity: 'FINAL (SMA Putra)', category: 'SMA Putra', highlight: true }
];
