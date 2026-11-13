import React, { useState, useEffect } from 'react';
import { TournamentProvider } from './context/TournamentContext';
import { CustomerAuthProvider } from './context/CustomerAuthContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { QuickArenaStats } from './components/home/QuickArenaStats';
import { ScheduleView } from './components/schedule/ScheduleView';
import { LiveMatchView } from './components/live/LiveMatchView';
import { ResultsView } from './components/results/ResultsView';
import { TicketShopView } from './components/tickets/TicketShopView';
import { MyTicketsView } from './components/tickets/MyTicketsView';
import { AdminPortal } from './components/admin/AdminPortal';
import { AdminLoginView } from './components/admin/AdminLoginView';
import { MatchDetailModal } from './components/results/MatchDetailModal';
import { CustomerAuthModal } from './components/auth/CustomerAuthModal';
import { Match } from './types/tournament';
import { ADMIN_SESSION_STORAGE_KEY, clearAdminSession } from './config/adminAccounts';
import { Trophy, Flame, Calendar, GitBranch, Ticket } from 'lucide-react';

export function App() {
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return (
      localStorage.getItem(ADMIN_SESSION_STORAGE_KEY) === 'true' ||
      sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY) === 'true'
    );
  });

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedMatchForDetail, setSelectedMatchForDetail] = useState<Match | null>(null);

  const handleSelectLive = (_matchId: string) => {
    setCurrentTab('live');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDetail = (match: Match) => {
    setSelectedMatchForDetail(match);
  };

  const handleEnterAdmin = () => {
    setIsAdminMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsAdminAuthenticated(false);
  };

  return (
    <CustomerAuthProvider>
      <TournamentProvider>
        {isAdminMode ? (
          isAdminAuthenticated ? (
            /* Dedicated, Authenticated Admin Command Center */
            <AdminPortal 
              onExitAdmin={() => setIsAdminMode(false)} 
              onLogout={handleLogout}
            />
          ) : (
            /* Dedicated Admin Login Page with Password Protection */
            <AdminLoginView
              onLoginSuccess={() => {
                setIsAdminAuthenticated(true);
              }}
              onBackToPublic={() => {
                setIsAdminMode(false);
              }}
            />
          )
        ) : (
          /* Public Visitor Website */
          <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 selection:bg-amber-400 selection:text-black pb-16 lg:pb-0">
            
            {/* Public Navigation Bar */}
            <Header 
              currentTab={currentTab} 
              setCurrentTab={setCurrentTab} 
              onEnterAdmin={handleEnterAdmin}
            />

            {/* Main Routed Content */}
            <main className="flex-1">
              {currentTab === 'home' && (
                <div>
                  <HeroSection onNavigate={setCurrentTab} />
                  <QuickArenaStats onNavigate={setCurrentTab} />
                </div>
              )}

              {currentTab === 'schedule' && (
                <ScheduleView
                  onSelectLive={handleSelectLive}
                  onSelectDetail={handleSelectDetail}
                />
              )}

              {currentTab === 'live' && (
                <LiveMatchView />
              )}

              {currentTab === 'results' && (
                <ResultsView />
              )}

              {currentTab === 'tickets' && (
                <TicketShopView onGoToMyTickets={() => setCurrentTab('my-tickets')} />
              )}

              {currentTab === 'my-tickets' && (
                <MyTicketsView onGoToShop={() => setCurrentTab('tickets')} />
              )}
            </main>

            {/* Public Footer */}
            <Footer 
              onNavigate={setCurrentTab} 
              onEnterAdmin={handleEnterAdmin}
            />

            {/* Mobile Bottom Navigation Bar for Handphones */}
            <nav 
              className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-bottom"
              aria-label="Navigasi Bawah Mobile"
            >
              {[
                { id: 'home', label: 'Home', icon: Trophy },
                { id: 'live', label: 'Live 3x3', icon: Flame },
                { id: 'schedule', label: 'Jadwal', icon: Calendar },
                { id: 'results', label: 'Bagan', icon: GitBranch },
                { id: 'tickets', label: 'Tiket', icon: Ticket },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setCurrentTab(tab.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
                      isActive
                        ? 'text-amber-400 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                    <span className="text-[10px] mt-0.5 uppercase tracking-wider">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Global Match Detail Modal */}
            <MatchDetailModal
              match={selectedMatchForDetail}
              onClose={() => setSelectedMatchForDetail(null)}
            />

            {/* Customer Authentication & Registration Modal */}
            <CustomerAuthModal />

          </div>
        )}
      </TournamentProvider>
    </CustomerAuthProvider>
  );
}

export default App;
