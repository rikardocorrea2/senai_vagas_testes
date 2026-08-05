import React from 'react';
import { Building2, BookmarkCheck, Search, ShieldAlert, Sparkles, SlidersHorizontal, Menu } from 'lucide-react';

interface HeaderProps {
  activeInscriptionsCount: number;
  onOpenInscriptions: () => void;
  onOpenUnits: () => void;
  onToggleSidebar: () => void;
  totalCoursesCount: number;
  totalAvailableSeats: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeInscriptionsCount,
  onOpenInscriptions,
  onOpenUnits,
  onToggleSidebar,
  totalCoursesCount,
  totalAvailableSeats,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#da251c] text-white shadow-md border-b border-red-700">
      {/* Top Banner / SENAI Strip */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left branding */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
              aria-label="Abrir menu lateral"
              id="btn-toggle-sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="bg-white text-[#da251c] font-black px-3 py-1 rounded-lg text-2xl tracking-tighter uppercase shadow">
                SENAI
              </div>
              <div className="border-l border-white/25 pl-3">
                <h1 className="text-lg sm:text-xl font-black tracking-tight uppercase leading-none text-white">
                  Vagas SENAI
                </h1>
                <p className="text-[10px] text-white/80 font-black uppercase tracking-widest hidden sm:block mt-1">
                  Gestão Visual de Vagas em Tempo Real
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onOpenUnits}
              id="btn-header-unidades"
              className="hidden md:flex items-center space-x-2 text-xs font-black uppercase tracking-wider bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
              <Building2 className="w-4 h-4" />
              <span>Unidades</span>
            </button>

            {/* Total Vagas Available Badge */}
            <div className="hidden sm:flex items-center space-x-2 text-xs font-black uppercase tracking-wider bg-black/20 border border-white/20 text-white px-3.5 py-2 rounded-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse"></span>
              <span>
                <strong>{totalAvailableSeats}</strong> vagas abertas
              </span>
            </div>

            {/* Minhas Inscrições Button */}
            <button
              onClick={onOpenInscriptions}
              id="btn-header-minhas-inscricoes"
              className="relative flex items-center space-x-2 bg-white text-[#da251c] hover:bg-gray-100 font-black text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-md uppercase tracking-tight transition-all active:scale-95"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span className="hidden xs:inline">Minhas Inscrições</span>
              {activeInscriptionsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f97316] text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#da251c] shadow">
                  {activeInscriptionsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-bar with Live Notice */}
      <div className="bg-[#b81d15] border-t border-white/10 text-[11px] py-1.5 px-4 text-center text-white font-bold uppercase tracking-wide">
        <span className="inline-block bg-[#22c55e] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded mr-2">
          AO VIVO
        </span>
        Clique em <strong className="underline">"VER VAGAS"</strong> em qualquer curso para visualizar a matriz interativa de vagas.
      </div>
    </header>
  );
};
