export type TournamentCategory = 'SMA Putra' | 'SMA Putri' | 'Umum';

export type MatchStage = 
  | 'Babak 32 Besar'
  | 'Babak 16 Besar'
  | 'Babak Penyisihan' 
  | 'Perempat Final' 
  | 'Semifinal' 
  | 'Perebutan Juara 3' 
  | 'Grand Final';

export type MatchStatus = 'Akan Datang' | 'Sedang Berlangsung' | 'Selesai';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  category: TournamentCategory;
  logo: string;
  seed?: number;
  origin: string; // Sekolah atau Komunitas / Klub
  stats?: {
    wins: number;
    losses: number;
    pointsScored: number;
  };
}

export interface MatchPeriodScore {
  period: string; // 3x3 Single Period or OT
  scoreA: number;
  scoreB: number;
}

export interface Match {
  id: string;
  matchNumber: number;
  matchCode?: string; // e.g. "A1", "B1", "A24", "FINAL"
  courtName?: 'Lapangan A' | 'Lapangan B' | string;
  duration?: string; // e.g. "20'", "30'", "40'"
  category: TournamentCategory;
  stage: MatchStage;
  arena: string; // e.g. "Lapangan A (GKB FIP UM)", "Lapangan B (GKB FIP UM)"
  date: string; // YYYY-MM-DD
  time: string; // e.g. "08.00 - 08.20 WIB"
  status: MatchStatus;
  teamA: Team;
  teamB: Team;
  scoreA: number; // Max 21 in 3x3 sudden death
  scoreB: number;
  foulsA: number; // 7+ is penalty, 10+ is technical
  foulsB: number;
  currentPeriod?: string; // "10:00 Waktu Berjalan" or "Overtime"
  timeRemaining?: string; // e.g. "06:42" (10 mins countdown)
  shotClock?: number; // 12s in 3x3
  winnerId?: string;
  mvpGladiator?: {
    name: string;
    team: string;
    points: number;
    reboundsOrAssists?: string;
    title: string;
  };
  periodScores?: MatchPeriodScore[];
  streamUrl?: string;
  isStartingSoon?: boolean;
}

export interface BracketNode {
  id: string;
  matchCode?: string; // e.g. "A10", "B1"
  courtName?: 'Lapangan A' | 'Lapangan B' | string;
  duration?: string;
  roundName: MatchStage;
  roundIndex: number; // 1 = R1, 2 = R2, 3 = QF, 4 = SF, 5 = Final
  side?: 'left' | 'right' | 'center';
  matchId?: string;
  matchNumber?: number;
  nextMatchId?: string;
  nextSlot?: 'teamA' | 'teamB';
  loserNextMatchId?: string; // For 3rd place match
  category: TournamentCategory;
  teamA?: Team | null;
  teamB?: Team | null;
  scoreA?: number | null;
  scoreB?: number | null;
  winnerId?: string | null;
  status: MatchStatus;
  date: string;
  time: string;
  arena?: string;
}

export interface TicketTier {
  id: string;
  name: string;
  tagline: string;
  price: number;
  totalQuota: number;
  remainingQuota: number;
  color: 'crimson' | 'gold' | 'bronze';
  perks: string[];
  isPopular?: boolean;
  validDays: string; // "14 - 16 Nov 2026" or "1 Hari"
}

export type TicketStatus = 'Menunggu Verifikasi' | 'Terverifikasi' | 'Sudah Ditukar' | 'Ditolak';

export interface Customer {
  id: string;
  email: string;
  fullName: string;
  whatsapp: string;
  identityNumber?: string;
  createdAt: string;
}

export interface TicketPurchase {
  id: string;
  ticketCode: string; // e.g. "IMO-DAY1-901-A"
  tierId: string;
  tierName: string;
  customerId?: string;
  buyerName: string;
  buyerWhatsapp: string;
  buyerEmail: string;
  buyerIdentityNumber?: string;
  quantity: number;
  totalAmount: number;
  uniqueCode: number; // e.g. 321 -> total 15.321 for verification tracking
  status: TicketStatus;
  createdAt: string;
  verifiedAt?: string;
  redeemedAt?: string;
  rejectionReason?: string;
  adminNotes?: string;
  paymentMethod: 'QRIS';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  operator: string;
  target: string;
  details: string;
}
