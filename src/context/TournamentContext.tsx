import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Match,
  BracketNode,
  TicketTier,
  TicketPurchase,
  AuditLog,
  TournamentCategory,
  MatchStatus,
  Team
} from '../types/tournament';
import {
  syncTicketToSupabase,
  updateTicketStatusInSupabase,
  fetchTicketsFromSupabase,
  syncMatchToSupabase,
  syncAllMatchesToSupabase,
  fetchMatchesFromSupabase,
  syncBracketNodeToSupabase,
  syncAllBracketsToSupabase,
  fetchBracketsFromSupabase,
  isSupabaseConfigured
} from '../lib/supabase';
import { STORAGE_KEYS } from '../config/eventConfig';
import {
  INITIAL_MATCHES,
  INITIAL_BRACKETS,
  INITIAL_TICKETS,
  INITIAL_PURCHASES,
  INITIAL_AUDIT_LOGS,
  INITIAL_TEAMS
} from '../data/mockData';

interface TournamentContextType {
  matches: Match[];
  brackets: Record<string, BracketNode[]>;
  tickets: TicketTier[];
  purchases: TicketPurchase[];
  auditLogs: AuditLog[];
  selectedCategory: TournamentCategory | 'Semua';
  setSelectedCategory: (cat: TournamentCategory | 'Semua') => void;
  
  // Match & Live actions
  updateMatchScore: (matchId: string, scoreA: number, scoreB: number, foulsA: number, foulsB: number, period: string, timeRemaining: string) => void;
  setMatchStatus: (matchId: string, status: MatchStatus, winnerId?: string) => void;
  addNewMatch: (match: Omit<Match, 'id' | 'matchNumber'>) => void;

  // Bracket actions
  advanceBracketWinner: (category: TournamentCategory, bracketNodeId: string, winnerId: string, scoreA?: number, scoreB?: number) => void;
  assignTeamToBracketSlot: (category: TournamentCategory, bracketNodeId: string, slot: 'teamA' | 'teamB', team: Team | null) => void;
  resetBracketMatch: (category: TournamentCategory, bracketNodeId: string) => void;

  // Ticket actions
  purchaseTicket: (data: {
    tierId: string;
    buyerName: string;
    buyerWhatsapp: string;
    buyerEmail: string;
    buyerIdentityNumber?: string;
    quantity: number;
    customerId?: string;
  }) => Promise<TicketPurchase>;
  verifyTicketPayment: (purchaseId: string, status: 'Terverifikasi' | 'Ditolak', reasonOrNotes?: string) => void;
  redeemTicketAtVenue: (purchaseId: string) => { success: boolean; message: string };
  syncFromSupabase: () => Promise<void>;
  pushAllDataToSupabase: () => Promise<{ success: boolean; message: string }>;

  // Reset demo data
  resetAllData: () => void;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MATCHES_CACHE);
    return saved ? JSON.parse(saved) : INITIAL_MATCHES;
  });

  const [brackets, setBrackets] = useState<Record<string, BracketNode[]>>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BRACKETS_CACHE);
    return saved ? JSON.parse(saved) : INITIAL_BRACKETS;
  });

  const [tickets, setTickets] = useState<TicketTier[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TICKETS_CACHE);
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [purchases, setPurchases] = useState<TicketPurchase[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PURCHASES_CACHE);
    return saved ? JSON.parse(saved) : INITIAL_PURCHASES;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS_CACHE);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [selectedCategory, setSelectedCategory] = useState<TournamentCategory | 'Semua'>('Semua');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MATCHES_CACHE, JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BRACKETS_CACHE, JSON.stringify(brackets));
  }, [brackets]);

  // Recalculate remaining quota dynamically: only confirmed tickets (Terverifikasi / Sudah Ditukar) deduct from 100 total quota
  useEffect(() => {
    setTickets(prev =>
      prev.map(t => {
        const totalQuota = 100; // Kuota resmi: 100 tiket tanggal 14 dan 100 tiket tanggal 15
        const confirmedSold = purchases
          .filter(p => p.tierId === t.id && (p.status === 'Terverifikasi' || p.status === 'Sudah Ditukar'))
          .reduce((sum, p) => sum + p.quantity, 0);

        return {
          ...t,
          totalQuota,
          remainingQuota: Math.max(0, totalQuota - confirmedSold)
        };
      })
    );
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TICKETS_CACHE, JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PURCHASES_CACHE, JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS_CACHE, JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Synchronize matches, brackets, and purchases from Supabase on startup
  const syncFromSupabase = async () => {
    if (!isSupabaseConfigured()) return;
    try {
      // 1. Sync Tickets
      const cloudTickets = await fetchTicketsFromSupabase();
      if (cloudTickets && cloudTickets.length > 0) {
        setPurchases(prev => {
          const map = new Map<string, TicketPurchase>();
          cloudTickets.forEach(t => map.set(t.id, t));
          prev.forEach(t => {
            if (!map.has(t.id)) {
              map.set(t.id, t);
            }
          });
          return Array.from(map.values());
        });
      }

      // 2. Sync Match Results
      const cloudMatches = await fetchMatchesFromSupabase();
      if (cloudMatches && cloudMatches.length > 0) {
        setMatches(cloudMatches);
      }

      // 3. Sync Brackets
      const cloudBrackets = await fetchBracketsFromSupabase();
      if (cloudBrackets && Object.keys(cloudBrackets).length > 0) {
        setBrackets(cloudBrackets);
      }
    } catch (e) {
      console.warn('[TournamentContext] syncFromSupabase error:', e);
    }
  };

  const pushAllDataToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    if (!isSupabaseConfigured()) {
      return { success: false, message: 'Koneksi Supabase belum aktif. Masukkan Project URL dan Anon Key di menu pengaturan.' };
    }
    try {
      const matchOk = await syncAllMatchesToSupabase(matches);
      const bracketOk = await syncAllBracketsToSupabase(brackets);
      let tCount = 0;
      for (const p of purchases) {
        await syncTicketToSupabase(p);
        tCount++;
      }
      return {
        success: matchOk && bracketOk,
        message: `Berhasil mengunggah ${matches.length} pertandingan, bagan bracket, dan ${tCount} tiket ke database Supabase!`
      };
    } catch (err: any) {
      return { success: false, message: err.message || 'Gagal sinkronisasi ke Supabase' };
    }
  };

  useEffect(() => {
    syncFromSupabase();
  }, []);

  const addLog = (action: string, target: string, details: string, operator = 'Admin Colosseum') => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      action,
      operator,
      target,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateMatchScore = (
    matchId: string,
    scoreA: number,
    scoreB: number,
    foulsA: number,
    foulsB: number,
    period: string,
    timeRemaining: string
  ) => {
    let updatedMatch: Match | undefined;

    setMatches(prev =>
      prev.map(m => {
        if (m.id !== matchId) return m;
        updatedMatch = {
          ...m,
          scoreA,
          scoreB,
          foulsA,
          foulsB,
          currentPeriod: period,
          timeRemaining
        };
        return updatedMatch;
      })
    );

    // Sync to Supabase match_results
    if (updatedMatch) {
      syncMatchToSupabase(updatedMatch).catch(e => console.warn('[Supabase] sync match score error:', e));
    }

    // Also sync to bracket if linked
    setBrackets(prev => {
      const nextBrackets = { ...prev };
      for (const cat in nextBrackets) {
        nextBrackets[cat] = nextBrackets[cat].map(b => {
          if (b.matchId === matchId) {
            const updatedB = {
              ...b,
              scoreA,
              scoreB
            };
            syncBracketNodeToSupabase(cat as TournamentCategory, updatedB).catch(e => console.warn('[Supabase] sync bracket error:', e));
            return updatedB;
          }
          return b;
        });
      }
      return nextBrackets;
    });

    addLog(
      'UPDATE_SCORE',
      `Match ${matchId}`,
      `Skor: ${scoreA} - ${scoreB} (${period} ${timeRemaining}) | Fouls: ${foulsA} - ${foulsB}`
    );
  };

  const setMatchStatus = (matchId: string, status: MatchStatus, winnerId?: string) => {
    let updatedMatch: Match | undefined;

    setMatches(prev =>
      prev.map(m => {
        if (m.id !== matchId) return m;
        const winner = winnerId || (m.scoreA > m.scoreB ? m.teamA.id : m.scoreB > m.scoreA ? m.teamB.id : undefined);
        updatedMatch = {
          ...m,
          status,
          winnerId: winner
        };
        return updatedMatch;
      })
    );

    // Sync to Supabase match_results
    if (updatedMatch) {
      syncMatchToSupabase(updatedMatch).catch(e => console.warn('[Supabase] sync match status error:', e));
    }

    // Also update bracket status
    setBrackets(prev => {
      const nextBrackets = { ...prev };
      for (const cat in nextBrackets) {
        nextBrackets[cat] = nextBrackets[cat].map(b => {
          if (b.matchId === matchId) {
            const updatedB = {
              ...b,
              status,
              winnerId: winnerId || b.winnerId
            };
            syncBracketNodeToSupabase(cat as TournamentCategory, updatedB).catch(e => console.warn('[Supabase] sync bracket status error:', e));
            return updatedB;
          }
          return b;
        });
      }
      return nextBrackets;
    });

    addLog('STATUS_CHANGE', `Match ${matchId}`, `Status diubah menjadi: ${status}`);
  };

  const addNewMatch = (newMatchData: Omit<Match, 'id' | 'matchNumber'>) => {
    const newId = `m-custom-${Date.now()}`;
    const nextNum = Math.max(...matches.map(m => m.matchNumber), 100) + 1;
    const created: Match = {
      ...newMatchData,
      id: newId,
      matchNumber: nextNum
    };
    setMatches(prev => [created, ...prev]);
    syncMatchToSupabase(created).catch(e => console.warn('[Supabase] sync new match error:', e));
    addLog('CREATE_MATCH', `Match #${nextNum}`, `${newMatchData.teamA.name} vs ${newMatchData.teamB.name} (${newMatchData.category})`);
  };

  const advanceBracketWinner = (
    category: TournamentCategory, 
    bracketNodeId: string, 
    winnerId: string,
    scoreA?: number,
    scoreB?: number
  ) => {
    setBrackets(prev => {
      const catBrackets = prev[category] || [];
      const currentBracket = catBrackets.find(b => b.id === bracketNodeId);
      if (!currentBracket) return prev;

      const winningTeam = currentBracket.teamA?.id === winnerId ? currentBracket.teamA : currentBracket.teamB;
      const losingTeam = currentBracket.teamA?.id === winnerId ? currentBracket.teamB : currentBracket.teamA;
      if (!winningTeam) return prev;

      const calcScoreA = scoreA !== undefined ? scoreA : (currentBracket.teamA?.id === winnerId ? 21 : 16);
      const calcScoreB = scoreB !== undefined ? scoreB : (currentBracket.teamB?.id === winnerId ? 21 : 16);

      // Update current bracket winner & status & score
      const updatedList = catBrackets.map(b => {
        if (b.id === bracketNodeId) {
          return {
            ...b,
            winnerId,
            scoreA: calcScoreA,
            scoreB: calcScoreB,
            status: 'Selesai' as MatchStatus
          };
        }
        return b;
      });

      let nextTargetBracket: BracketNode | undefined;
      let nextTargetIsSlotA = true;

      // If nextMatchId exists, place the winning team into the next node
      if (currentBracket.nextMatchId) {
        const nextTargetIndex = updatedList.findIndex(b => b.id === currentBracket.nextMatchId);
        if (nextTargetIndex !== -1) {
          const target = updatedList[nextTargetIndex];
          const isSlotA = currentBracket.nextSlot === 'teamA' 
            ? true 
            : currentBracket.nextSlot === 'teamB' 
            ? false 
            : (!target.teamA || target.teamA.id === winningTeam.id);

          nextTargetIsSlotA = isSlotA;
          nextTargetBracket = {
            ...target,
            teamA: isSlotA ? winningTeam : target.teamA,
            teamB: !isSlotA ? winningTeam : target.teamB
          };
          updatedList[nextTargetIndex] = nextTargetBracket;
        }
      }

      // If loserNextMatchId exists (e.g. for Semifinals to 3rd Place match)
      let thirdPlaceTargetBracket: BracketNode | undefined;
      let thirdPlaceIsSlotA = true;
      if (currentBracket.loserNextMatchId && losingTeam) {
        const thirdPlaceIndex = updatedList.findIndex(b => b.id === currentBracket.loserNextMatchId);
        if (thirdPlaceIndex !== -1) {
          const target = updatedList[thirdPlaceIndex];
          const isSlotA = !target.teamA || target.teamA.id === losingTeam.id;
          thirdPlaceIsSlotA = isSlotA;
          thirdPlaceTargetBracket = {
            ...target,
            teamA: isSlotA ? losingTeam : target.teamA,
            teamB: !isSlotA ? losingTeam : target.teamB
          };
          updatedList[thirdPlaceIndex] = thirdPlaceTargetBracket;
        }
      }

      // Sync to matches array for Schedule & Live views
      setMatches(mPrev =>
        mPrev.map(m => {
          // Finished match
          if (m.id === bracketNodeId) {
            const updated = {
              ...m,
              status: 'Selesai' as MatchStatus,
              winnerId,
              scoreA: calcScoreA,
              scoreB: calcScoreB,
              mvpGladiator: {
                name: `Gladiator ${winningTeam.shortName}`,
                team: winningTeam.name,
                points: Math.max(calcScoreA, calcScoreB),
                reboundsOrAssists: 'MVP Match 3x3 Colosseum',
                title: '3x3 Match Winner'
              }
            };
            syncMatchToSupabase(updated).catch(e => console.warn('[Supabase] sync finished match error:', e));
            return updated;
          }
          // Next match target
          if (currentBracket.nextMatchId && m.id === currentBracket.nextMatchId) {
            const updated = {
              ...m,
              teamA: nextTargetIsSlotA ? winningTeam : m.teamA,
              teamB: !nextTargetIsSlotA ? winningTeam : m.teamB
            };
            syncMatchToSupabase(updated).catch(e => console.warn('[Supabase] sync next match error:', e));
            return updated;
          }
          // 3rd place match target
          if (currentBracket.loserNextMatchId && losingTeam && m.id === currentBracket.loserNextMatchId) {
            const updated = {
              ...m,
              teamA: thirdPlaceIsSlotA ? losingTeam : m.teamA,
              teamB: !thirdPlaceIsSlotA ? losingTeam : m.teamB
            };
            syncMatchToSupabase(updated).catch(e => console.warn('[Supabase] sync 3rd place match error:', e));
            return updated;
          }
          return m;
        })
      );

      // Sync updated bracket nodes to Supabase
      const updatedFinishedNode = updatedList.find(b => b.id === bracketNodeId);
      if (updatedFinishedNode) {
        syncBracketNodeToSupabase(category, updatedFinishedNode).catch(e => console.warn('[Supabase] sync bracket error:', e));
      }
      if (nextTargetBracket) {
        syncBracketNodeToSupabase(category, nextTargetBracket).catch(e => console.warn('[Supabase] sync next bracket error:', e));
      }
      if (thirdPlaceTargetBracket) {
        syncBracketNodeToSupabase(category, thirdPlaceTargetBracket).catch(e => console.warn('[Supabase] sync 3rd bracket error:', e));
      }

      addLog(
        'ADVANCE_BRACKET',
        `${category} (${currentBracket.roundName})`,
        `${winningTeam.name} berhasil LOLOS ke babak berikutnya sebagai Gladiator 3x3!`
      );

      return {
        ...prev,
        [category]: updatedList
      };
    });
  };

  const assignTeamToBracketSlot = (
    category: TournamentCategory,
    bracketNodeId: string,
    slot: 'teamA' | 'teamB',
    team: Team | null
  ) => {
    setBrackets(prev => {
      const catBrackets = prev[category] || [];
      const updatedList = catBrackets.map(b => {
        if (b.id === bracketNodeId) {
          const updated = {
            ...b,
            [slot]: team
          };
          syncBracketNodeToSupabase(category, updated).catch(e => console.warn(e));
          return updated;
        }
        return b;
      });

      addLog(
        'MANUAL_ASSIGN',
        `${category} Match (${bracketNodeId})`,
        `Slot ${slot} diisi oleh ${team?.name || 'TBD (Kosong)'}`
      );

      return {
        ...prev,
        [category]: updatedList
      };
    });

    // Also update match if exists
    setMatches(mPrev =>
      mPrev.map(m => {
        if (m.id === bracketNodeId) {
          const updated = {
            ...m,
            [slot]: team || m[slot]
          };
          syncMatchToSupabase(updated).catch(e => console.warn(e));
          return updated;
        }
        return m;
      })
    );
  };

  const resetBracketMatch = (category: TournamentCategory, bracketNodeId: string) => {
    setBrackets(prev => {
      const catBrackets = prev[category] || [];
      const updatedList = catBrackets.map(b => {
        if (b.id === bracketNodeId) {
          const updated = {
            ...b,
            winnerId: null,
            scoreA: null,
            scoreB: null,
            status: 'Akan Datang' as MatchStatus
          };
          syncBracketNodeToSupabase(category, updated).catch(e => console.warn(e));
          return updated;
        }
        return b;
      });

      // Sync to matches array
      setMatches(mPrev =>
        mPrev.map(m => {
          if (m.id === bracketNodeId) {
            const updated = {
              ...m,
              status: 'Akan Datang' as MatchStatus,
              winnerId: undefined,
              scoreA: 0,
              scoreB: 0,
              currentPeriod: undefined,
              timeRemaining: undefined,
              mvpGladiator: undefined
            };
            syncMatchToSupabase(updated).catch(e => console.warn(e));
            return updated;
          }
          return m;
        })
      );

      addLog(
        'RESET_MATCH',
        `${category} (${bracketNodeId})`,
        `Hasil laga dibatalkan/direset ke status Akan Datang`
      );

      return {
        ...prev,
        [category]: updatedList
      };
    });
  };

  const purchaseTicket = async (data: {
    tierId: string;
    buyerName: string;
    buyerWhatsapp: string;
    buyerEmail: string;
    buyerIdentityNumber?: string;
    quantity: number;
    customerId?: string;
  }): Promise<TicketPurchase> => {
    const tier = tickets.find(t => t.id === data.tierId) || tickets[0];
    const uniqueCode = Math.floor(100 + Math.random() * 899);
    const subtotal = tier.price * data.quantity;
    const totalAmount = subtotal + uniqueCode;
    const ticketId = `ORD-IMO-${Date.now().toString().slice(-4)}`;
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const ticketCode = `IMO-${tier.name.slice(0, 3).toUpperCase()}-${randomSuffix}`;

    const newPurchase: TicketPurchase = {
      id: ticketId,
      ticketCode,
      tierId: tier.id,
      tierName: tier.name,
      customerId: data.customerId,
      buyerName: data.buyerName,
      buyerWhatsapp: data.buyerWhatsapp,
      buyerEmail: data.buyerEmail,
      buyerIdentityNumber: data.buyerIdentityNumber || '',
      quantity: data.quantity,
      totalAmount,
      uniqueCode,
      status: 'Menunggu Verifikasi',
      createdAt: new Date().toISOString(),
      paymentMethod: 'QRIS'
    };

    // Simpan ke state dan local storage
    setPurchases(prev => [newPurchase, ...prev]);

    // Push langsung ke Supabase Cloud
    await syncTicketToSupabase(newPurchase);

    addLog(
      'ORDER_CREATED',
      newPurchase.id,
      `${data.buyerName} memesan ${data.quantity}x ${tier.name} (Total: Rp ${totalAmount.toLocaleString('id-ID')}) - Menunggu verifikasi bukti transfer panitia`
    );

    return newPurchase;
  };

  const verifyTicketPayment = (purchaseId: string, status: 'Terverifikasi' | 'Ditolak', reasonOrNotes?: string) => {
    const verifiedTime = status === 'Terverifikasi' ? new Date().toLocaleString('id-ID') : undefined;
    
    setPurchases(prev =>
      prev.map(p => {
        if (p.id !== purchaseId) return p;
        return {
          ...p,
          status,
          verifiedAt: verifiedTime,
          rejectionReason: status === 'Ditolak' ? reasonOrNotes : undefined,
          adminNotes: reasonOrNotes || p.adminNotes
        };
      })
    );

    // Asynchronously update in Supabase
    updateTicketStatusInSupabase(purchaseId, status, {
      verifiedAt: verifiedTime,
      rejectionReason: status === 'Ditolak' ? reasonOrNotes : undefined,
      adminNotes: reasonOrNotes
    }).catch(err => console.warn('[Supabase] verifyTicket error:', err));

    addLog(
      status === 'Terverifikasi' ? 'APPROVE_TICKET' : 'REJECT_TICKET',
      purchaseId,
      `Status diubah menjadi ${status}. Catatan: ${reasonOrNotes || '-'}`
    );
  };

  const redeemTicketAtVenue = (purchaseId: string) => {
    const purchase = purchases.find(p => p.id === purchaseId || p.ticketCode.toLowerCase() === purchaseId.toLowerCase());
    if (!purchase) {
      return { success: false, message: 'Tiket tidak ditemukan dalam sistem.' };
    }

    if (purchase.status === 'Sudah Ditukar') {
      return { success: false, message: `Tiket ini SUDAH DITUKAR sebelumnya pada ${purchase.redeemedAt}.` };
    }

    if (purchase.status !== 'Terverifikasi') {
      return {
        success: false,
        message: `Tiket belum dapat ditukar. Status saat ini: ${purchase.status}. Pembayaran wajib diverifikasi terlebih dahulu.`
      };
    }

    const redeemedTime = new Date().toLocaleString('id-ID') + ' (Booth Utama Colosseum)';
    setPurchases(prev =>
      prev.map(p => {
        if (p.id === purchase.id) {
          return {
            ...p,
            status: 'Sudah Ditukar',
            redeemedAt: redeemedTime
          };
        }
        return p;
      })
    );

    // Asynchronously update in Supabase
    updateTicketStatusInSupabase(purchase.id, 'Sudah Ditukar', {
      redeemedAt: redeemedTime
    }).catch(err => console.warn('[Supabase] redeemTicket error:', err));

    addLog('REDEEM_TICKET', purchase.ticketCode, `Tiket ${purchase.buyerName} (${purchase.tierName}) berhasil ditukar di gate venue.`);

    return { success: true, message: `Berhasil menukarkan tiket untuk ${purchase.buyerName}! Silakan berikan wristband & tiket gelang fisik.` };
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.MATCHES_CACHE);
    localStorage.removeItem(STORAGE_KEYS.BRACKETS_CACHE);
    localStorage.removeItem(STORAGE_KEYS.TICKETS_CACHE);
    localStorage.removeItem(STORAGE_KEYS.PURCHASES_CACHE);
    localStorage.removeItem(STORAGE_KEYS.LOGS_CACHE);
    localStorage.removeItem('imonoke_matches_v5');
    localStorage.removeItem('imonoke_brackets_v5');
    localStorage.removeItem('imonoke_tickets_v5');
    localStorage.removeItem('imonoke_purchases_v5');
    localStorage.removeItem('imonoke_logs_v5');
    localStorage.removeItem('imonoke_matches_v4');
    localStorage.removeItem('imonoke_brackets_v4');
    localStorage.removeItem('imonoke_tickets_v4');
    localStorage.removeItem('imonoke_purchases_v4');
    localStorage.removeItem('imonoke_logs_v4');
    localStorage.removeItem('imonoke_matches_v3');
    localStorage.removeItem('imonoke_brackets_v3');
    localStorage.removeItem('imonoke_tickets_v3');
    localStorage.removeItem('imonoke_purchases_v3');
    localStorage.removeItem('imonoke_logs_v3');
    localStorage.removeItem('imonoke_matches_v1');
    localStorage.removeItem('imonoke_brackets_v1');

    setMatches(INITIAL_MATCHES);
    setBrackets(INITIAL_BRACKETS);
    setTickets(INITIAL_TICKETS);
    setPurchases(INITIAL_PURCHASES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
  };

  return (
    <TournamentContext.Provider
      value={{
        matches,
        brackets,
        tickets,
        purchases,
        auditLogs,
        selectedCategory,
        setSelectedCategory,
        updateMatchScore,
        setMatchStatus,
        addNewMatch,
        advanceBracketWinner,
        assignTeamToBracketSlot,
        resetBracketMatch,
        purchaseTicket,
        verifyTicketPayment,
        redeemTicketAtVenue,
        syncFromSupabase,
        pushAllDataToSupabase,
        resetAllData
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};
