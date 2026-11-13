import React from 'react';
import { Team } from '../../types/tournament';

interface TeamBadgeProps {
  team?: Team | null;
  size?: 'sm' | 'md' | 'lg';
  showOrigin?: boolean;
  className?: string;
}

export const TeamBadge: React.FC<TeamBadgeProps> = ({ 
  team, 
  size = 'md',
  showOrigin = false,
  className = '' 
}) => {
  if (!team) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-6 h-6 rounded-md bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-[10px] font-mono text-zinc-500">
          ?
        </div>
        <span className="text-xs text-zinc-500 italic">Menunggu Pemenang</span>
      </div>
    );
  }

  // Derive crisp 2-3 letter monogram
  const getMonogram = (name: string, short: string) => {
    if (short && short.length <= 4) return short.toUpperCase();
    const words = name.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(Boolean);
    if (words.length >= 3) {
      return (words[0][0] + words[1][0] + words[2][0]).toUpperCase();
    }
    if (words.length === 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 3).toUpperCase();
  };

  const monogram = getMonogram(team.name, team.shortName);

  const sizeClasses = {
    sm: 'w-5 h-5 text-[9px]',
    md: 'w-7 h-7 text-[11px]',
    lg: 'w-9 h-9 text-xs'
  }[size];

  // Subtle tonal tint based on category
  const badgeColor = team.category === 'SMA Putri'
    ? 'bg-rose-950/60 border-rose-800/40 text-rose-300'
    : team.category === 'Umum'
    ? 'bg-amber-950/60 border-amber-800/40 text-amber-300'
    : 'bg-zinc-800/80 border-zinc-700/50 text-zinc-200';

  return (
    <div className={`flex items-center gap-2.5 min-w-0 ${className}`}>
      <div 
        className={`${sizeClasses} shrink-0 rounded-md font-mono font-bold flex items-center justify-center border shadow-xs tracking-wider select-none ${badgeColor}`}
        title={team.name}
      >
        {monogram}
      </div>
      <div className="min-w-0 truncate">
        <p className="text-xs sm:text-sm font-semibold text-zinc-100 truncate leading-snug">
          <span className="sm:hidden">{team.shortName || team.name}</span>
          <span className="hidden sm:inline">{team.name}</span>
        </p>
        {showOrigin && team.origin && team.origin !== '-' && (
          <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate">
            {team.origin}
          </p>
        )}
      </div>
    </div>
  );
};
