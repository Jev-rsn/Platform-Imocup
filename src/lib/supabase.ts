import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { 
  Customer, 
  TicketPurchase, 
  TicketStatus, 
  Match, 
  BracketNode, 
  TournamentCategory 
} from '../types/tournament';
import { STORAGE_KEYS, SUPABASE_TABLES } from '../config/eventConfig';
import { API_CONFIG } from '../credentials/apiKeys';

// 1. Resolve Supabase URL & Anon Key from dedicated credentials module or env vars
export const getSupabaseConfig = () => {
  const envUrl = API_CONFIG.SUPABASE_URL || '';
  const envKey = API_CONFIG.SUPABASE_ANON_KEY || '';

  const localUrl = localStorage.getItem(STORAGE_KEYS.SUPABASE_URL) || '';
  const localKey = localStorage.getItem(STORAGE_KEYS.SUPABASE_KEY) || '';

  const url = (localUrl && localUrl.startsWith('http')) ? localUrl : envUrl;
  const anonKey = localKey ? localKey : envKey;

  return { url: url.trim(), anonKey: anonKey.trim() };
};

export const isSupabaseConfigured = (): boolean => {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey && url.startsWith('http'));
};

let supabaseInstance: SupabaseClient | null = null;
let lastKnownConfig = '';

export const getSupabaseClient = (): SupabaseClient | null => {
  const { url, anonKey } = getSupabaseConfig();
  const configKey = `${url}:${anonKey}`;

  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabaseInstance || lastKnownConfig !== configKey) {
    try {
      supabaseInstance = createClient(url, anonKey);
      lastKnownConfig = configKey;
    } catch (err) {
      console.warn('[Supabase] Failed to initialize client:', err);
      supabaseInstance = null;
    }
  }

  return supabaseInstance;
};

// 2. Local Fallback Mock DB (Ensures 100% offline functionality if Supabase credentials are not set yet)
const getLocalCustomers = (): Array<Customer & { passwordHash?: string }> => {
  try {
    const raw = localStorage.getItem('imonoke_mock_customers');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [
    {
      id: 'cust-demo-1',
      email: 'penonton@imocup.com',
      fullName: 'Bagas Aditya (Demo)',
      whatsapp: '081234567890',
      identityNumber: '3579012345670001',
      passwordHash: 'password123',
      createdAt: new Date().toISOString()
    }
  ];
};

const saveLocalCustomers = (list: Array<Customer & { passwordHash?: string }>) => {
  localStorage.setItem('imonoke_mock_customers', JSON.stringify(list));
};

// 3. Customer Authentication & Registration Functions
export interface RegisterCustomerInput {
  email: string;
  fullName: string;
  whatsapp: string;
  identityNumber: string;
  password: string;
}

export const registerCustomer = async (data: RegisterCustomerInput): Promise<{ customer: Customer; error?: string }> => {
  const emailClean = data.email.trim().toLowerCase();
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      // 1. Check if email already exists
      const { data: existing, error: checkErr } = await supabase
        .from(SUPABASE_TABLES.CUSTOMERS)
        .select('id')
        .eq('email', emailClean)
        .maybeSingle();

      if (checkErr && checkErr.code !== 'PGRST116') {
        console.warn('[Supabase] Customer check error:', checkErr);
      }

      if (existing) {
        return { customer: null as unknown as Customer, error: 'Email sudah terdaftar. Silakan langsung masuk.' };
      }

      // 2. Insert new customer record to Supabase
      const newCustomerPayload = {
        email: emailClean,
        full_name: data.fullName.trim(),
        whatsapp: data.whatsapp.trim(),
        identity_number: (data.identityNumber || '').trim(),
        password_hash: data.password
      };

      const { data: inserted, error: insertErr } = await supabase
        .from(SUPABASE_TABLES.CUSTOMERS)
        .insert([newCustomerPayload])
        .select()
        .single();

      if (insertErr) {
        console.warn('[Supabase] Insert customer error:', insertErr);
        return { customer: null as unknown as Customer, error: `Gagal menyimpan ke database Supabase: ${insertErr.message}` };
      }

      const registered: Customer = {
        id: inserted.id,
        email: inserted.email,
        fullName: inserted.full_name,
        whatsapp: inserted.whatsapp,
        identityNumber: inserted.identity_number,
        createdAt: inserted.created_at
      };

      return { customer: registered };
    } catch (err: any) {
      console.warn('[Supabase] Registration exception:', err.message || err);
      return { customer: null as unknown as Customer, error: `Terjadi kendala koneksi ke database: ${err.message || err}` };
    }
  }

  // Local fallback registration only if Supabase is completely unconfigured
  const localList = getLocalCustomers();
  if (localList.some(c => c.email.toLowerCase() === emailClean)) {
    return { customer: null as unknown as Customer, error: 'Email sudah terdaftar (Penyimpanan Lokal).' };
  }

  const newLocalCustomer: Customer & { passwordHash?: string } = {
    id: `cust-${Date.now()}`,
    email: emailClean,
    fullName: data.fullName.trim(),
    whatsapp: data.whatsapp.trim(),
    identityNumber: (data.identityNumber || '').trim(),
    passwordHash: data.password,
    createdAt: new Date().toISOString()
  };

  localList.push(newLocalCustomer);
  saveLocalCustomers(localList);

  const { passwordHash, ...cleanCustomer } = newLocalCustomer;
  return { customer: cleanCustomer };
};

export const loginCustomer = async (email: string, password: string): Promise<{ customer: Customer | null; error?: string }> => {
  const emailClean = email.trim().toLowerCase();
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from(SUPABASE_TABLES.CUSTOMERS)
        .select('*')
        .eq('email', emailClean)
        .maybeSingle();

      if (error) {
        console.warn('[Supabase] Login query error:', error);
        throw error;
      }

      if (!data) {
        return { customer: null, error: 'Email tidak ditemukan di database Supabase.' };
      }

      if (data.password_hash && data.password_hash !== password) {
        return { customer: null, error: 'Kata sandi salah. Silakan coba lagi.' };
      }

      const customer: Customer = {
        id: data.id,
        email: data.email,
        fullName: data.full_name,
        whatsapp: data.whatsapp,
        identityNumber: data.identity_number,
        createdAt: data.created_at
      };

      return { customer };
    } catch (err: any) {
      console.warn('[Supabase] Falling back to local customer store for login:', err.message || err);
    }
  }

  // Local fallback login
  const localList = getLocalCustomers();
  const found = localList.find(c => c.email.toLowerCase() === emailClean);

  if (!found) {
    return { customer: null, error: 'Akun tidak ditemukan. Silakan mendaftar terlebih dahulu.' };
  }

  if (found.passwordHash && found.passwordHash !== password) {
    return { customer: null, error: 'Kata sandi tidak sesuai.' };
  }

  const { passwordHash, ...cleanCustomer } = found;
  return { customer: cleanCustomer };
};

// 4. Ticket Purchase Sync to Supabase
export const syncTicketToSupabase = async (purchase: TicketPurchase): Promise<{ success: boolean; error?: string }> => {
  const supabase = getSupabaseClient();
  if (!supabase) return { success: false, error: 'Koneksi Supabase belum aktif.' };

  try {
    const isValidUuid = (id?: string | null): boolean => 
      typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    let customerIdToUse = isValidUuid(purchase.customerId) ? purchase.customerId : null;

    // Jika customerId belum UUID (misal session lama), coba hubungkan lewat email di tabel customers
    if (!customerIdToUse && purchase.buyerEmail) {
      try {
        const { data: custRow } = await supabase
          .from(SUPABASE_TABLES.CUSTOMERS)
          .select('id')
          .eq('email', purchase.buyerEmail.trim().toLowerCase())
          .maybeSingle();
        if (custRow && isValidUuid(custRow.id)) {
          customerIdToUse = custRow.id;
        }
      } catch (e) {
        // Fallback jika tidak ditemukan
      }
    }

    const payload = {
      id: purchase.id,
      ticket_code: purchase.ticketCode,
      tier_id: purchase.tierId,
      tier_name: purchase.tierName,
      customer_id: customerIdToUse,
      buyer_name: purchase.buyerName,
      buyer_whatsapp: purchase.buyerWhatsapp,
      buyer_email: purchase.buyerEmail,
      buyer_identity_number: purchase.buyerIdentityNumber || null,
      quantity: purchase.quantity,
      total_amount: purchase.totalAmount,
      unique_code: purchase.uniqueCode,
      status: purchase.status,
      payment_method: purchase.paymentMethod,
      created_at: purchase.createdAt || new Date().toISOString(),
      verified_at: purchase.verifiedAt || null,
      redeemed_at: purchase.redeemedAt || null,
      rejection_reason: purchase.rejectionReason || null,
      admin_notes: purchase.adminNotes || null
    };

    const { error } = await supabase
      .from(SUPABASE_TABLES.TICKET_PURCHASES)
      .upsert([payload], { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] syncTicket error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('[Supabase] syncTicket exception:', err);
    return { success: false, error: err.message || 'Terjadi kesalahan sistem' };
  }
};

export const updateTicketStatusInSupabase = async (
  purchaseId: string, 
  status: TicketStatus, 
  details?: { verifiedAt?: string; redeemedAt?: string; rejectionReason?: string; adminNotes?: string }
): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const updatePayload: Record<string, any> = { status };
    if (details?.verifiedAt !== undefined) updatePayload.verified_at = details.verifiedAt;
    if (details?.redeemedAt !== undefined) updatePayload.redeemed_at = details.redeemedAt;
    if (details?.rejectionReason !== undefined) updatePayload.rejection_reason = details.rejectionReason;
    if (details?.adminNotes !== undefined) updatePayload.admin_notes = details.adminNotes;

    const { error } = await supabase
      .from(SUPABASE_TABLES.TICKET_PURCHASES)
      .update(updatePayload)
      .eq('id', purchaseId);

    if (error) {
      console.warn('[Supabase] updateTicketStatus error:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.warn('[Supabase] updateTicketStatus exception:', err);
    return false;
  }
};

export const fetchTicketsFromSupabase = async (query?: { customerId?: string; email?: string; whatsapp?: string }): Promise<TicketPurchase[]> => {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    let builder = supabase.from(SUPABASE_TABLES.TICKET_PURCHASES).select('*');

    if (query?.customerId) {
      builder = builder.eq('customer_id', query.customerId);
    } else if (query?.email) {
      builder = builder.eq('buyer_email', query.email);
    } else if (query?.whatsapp) {
      builder = builder.eq('buyer_whatsapp', query.whatsapp);
    }

    const { data, error } = await builder.order('created_at', { ascending: false });

    if (error) {
      console.warn('[Supabase] fetchTickets error:', error);
      return [];
    }

    if (!data) return [];

    return data.map((row: any): TicketPurchase => ({
      id: row.id,
      ticketCode: row.ticket_code,
      tierId: row.tier_id,
      tierName: row.tier_name,
      customerId: row.customer_id,
      buyerName: row.buyer_name,
      buyerWhatsapp: row.buyer_whatsapp,
      buyerEmail: row.buyer_email,
      buyerIdentityNumber: row.buyer_identity_number || '',
      quantity: row.quantity,
      totalAmount: row.total_amount,
      uniqueCode: row.unique_code,
      status: row.status as TicketStatus,
      createdAt: row.created_at,
      verifiedAt: row.verified_at,
      redeemedAt: row.redeemed_at,
      rejectionReason: row.rejection_reason,
      adminNotes: row.admin_notes,
      paymentMethod: (row.payment_method as 'QRIS') || 'QRIS'
    }));
  } catch (err) {
    console.warn('[Supabase] fetchTickets exception:', err);
    return [];
  }
};

// =========================================================================
// 5. Match Results & Live Score Sync to Supabase
// =========================================================================

export const syncMatchToSupabase = async (match: Match): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const payload = {
      id: match.id,
      match_number: match.matchNumber,
      category: match.category,
      stage: match.stage,
      arena: match.arena,
      date: match.date,
      time: match.time,
      status: match.status,
      team_a: match.teamA,
      team_b: match.teamB,
      score_a: match.scoreA ?? 0,
      score_b: match.scoreB ?? 0,
      fouls_a: match.foulsA ?? 0,
      fouls_b: match.foulsB ?? 0,
      current_period: match.currentPeriod || null,
      time_remaining: match.timeRemaining || null,
      winner_id: match.winnerId || null,
      mvp_gladiator: match.mvpGladiator || null,
      period_scores: match.periodScores || null,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from(SUPABASE_TABLES.MATCH_RESULTS)
      .upsert([payload], { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] syncMatch error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] syncMatch exception:', err);
    return false;
  }
};

export const syncAllMatchesToSupabase = async (matches: Match[]): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase || matches.length === 0) return false;

  try {
    const payloads = matches.map(match => ({
      id: match.id,
      match_number: match.matchNumber,
      category: match.category,
      stage: match.stage,
      arena: match.arena,
      date: match.date,
      time: match.time,
      status: match.status,
      team_a: match.teamA,
      team_b: match.teamB,
      score_a: match.scoreA ?? 0,
      score_b: match.scoreB ?? 0,
      fouls_a: match.foulsA ?? 0,
      fouls_b: match.foulsB ?? 0,
      current_period: match.currentPeriod || null,
      time_remaining: match.timeRemaining || null,
      winner_id: match.winnerId || null,
      mvp_gladiator: match.mvpGladiator || null,
      period_scores: match.periodScores || null,
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from(SUPABASE_TABLES.MATCH_RESULTS)
      .upsert(payloads, { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] syncAllMatches error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] syncAllMatches exception:', err);
    return false;
  }
};

export const fetchMatchesFromSupabase = async (): Promise<Match[]> => {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from(SUPABASE_TABLES.MATCH_RESULTS)
      .select('*')
      .order('match_number', { ascending: true });

    if (error) {
      console.warn('[Supabase] fetchMatches error:', error);
      return [];
    }

    if (!data || data.length === 0) return [];

    return data.map((row: any): Match => ({
      id: row.id,
      matchNumber: row.match_number,
      category: row.category,
      stage: row.stage,
      arena: row.arena,
      date: row.date,
      time: row.time,
      status: row.status,
      teamA: row.team_a,
      teamB: row.team_b,
      scoreA: row.score_a ?? 0,
      scoreB: row.score_b ?? 0,
      foulsA: row.fouls_a ?? 0,
      foulsB: row.fouls_b ?? 0,
      currentPeriod: row.current_period,
      timeRemaining: row.time_remaining,
      winnerId: row.winner_id,
      mvpGladiator: row.mvp_gladiator,
      periodScores: row.period_scores
    }));
  } catch (err) {
    console.warn('[Supabase] fetchMatches exception:', err);
    return [];
  }
};

// =========================================================================
// 6. Tournament Brackets Sync to Supabase
// =========================================================================

export const syncBracketNodeToSupabase = async (category: TournamentCategory, node: BracketNode): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const payload = {
      id: node.id,
      category,
      round_name: node.roundName,
      round_index: node.roundIndex,
      match_id: node.matchId || null,
      match_number: node.matchNumber || null,
      team_a: node.teamA || null,
      team_b: node.teamB || null,
      score_a: node.scoreA ?? null,
      score_b: node.scoreB ?? null,
      winner_id: node.winnerId || null,
      status: node.status,
      date: node.date,
      time: node.time,
      arena: node.arena || null,
      next_match_id: node.nextMatchId || null,
      next_slot: node.nextSlot || null,
      loser_next_match_id: node.loserNextMatchId || null,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from(SUPABASE_TABLES.TOURNAMENT_BRACKETS)
      .upsert([payload], { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] syncBracketNode error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] syncBracketNode exception:', err);
    return false;
  }
};

export const syncAllBracketsToSupabase = async (brackets: Record<string, BracketNode[]>): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const payloads: any[] = [];
    for (const cat in brackets) {
      const nodes = brackets[cat] || [];
      for (const node of nodes) {
        payloads.push({
          id: node.id,
          category: cat,
          round_name: node.roundName,
          round_index: node.roundIndex,
          match_id: node.matchId || null,
          match_number: node.matchNumber || null,
          team_a: node.teamA || null,
          team_b: node.teamB || null,
          score_a: node.scoreA ?? null,
          score_b: node.scoreB ?? null,
          winner_id: node.winnerId || null,
          status: node.status,
          date: node.date,
          time: node.time,
          arena: node.arena || null,
          next_match_id: node.nextMatchId || null,
          next_slot: node.nextSlot || null,
          loser_next_match_id: node.loserNextMatchId || null,
          updated_at: new Date().toISOString()
        });
      }
    }

    if (payloads.length === 0) return true;

    const { error } = await supabase
      .from(SUPABASE_TABLES.TOURNAMENT_BRACKETS)
      .upsert(payloads, { onConflict: 'id' });

    if (error) {
      console.warn('[Supabase] syncAllBrackets error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] syncAllBrackets exception:', err);
    return false;
  }
};

export const fetchBracketsFromSupabase = async (): Promise<Record<string, BracketNode[]> | null> => {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from(SUPABASE_TABLES.TOURNAMENT_BRACKETS)
      .select('*')
      .order('round_index', { ascending: true });

    if (error) {
      console.warn('[Supabase] fetchBrackets error:', error);
      return null;
    }

    if (!data || data.length === 0) return null;

    const grouped: Record<string, BracketNode[]> = {};
    data.forEach((row: any) => {
      const cat = row.category;
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({
        id: row.id,
        category: row.category as TournamentCategory,
        roundName: row.round_name,
        roundIndex: row.round_index,
        matchId: row.match_id,
        matchNumber: row.match_number,
        teamA: row.team_a,
        teamB: row.team_b,
        scoreA: row.score_a,
        scoreB: row.score_b,
        winnerId: row.winner_id,
        status: row.status,
        date: row.date,
        time: row.time,
        arena: row.arena,
        nextMatchId: row.next_match_id,
        nextSlot: row.next_slot,
        loserNextMatchId: row.loser_next_match_id
      });
    });

    return grouped;
  } catch (err) {
    console.warn('[Supabase] fetchBrackets exception:', err);
    return null;
  }
};
