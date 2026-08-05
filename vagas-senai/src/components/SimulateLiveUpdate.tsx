import React, { useState } from 'react';
import { RefreshCw, Zap, Users, ShieldAlert } from 'lucide-react';

interface SimulateLiveUpdateProps {
  onSimulateBooking: () => void;
  onResetVacancies: () => void;
}

export const SimulateLiveUpdate: React.FC<SimulateLiveUpdateProps> = ({
  onSimulateBooking,
  onResetVacancies,
}) => {
  const [lastActionText, setLastActionText] = useState<string | null>(null);

  const handleSimulate = () => {
    onSimulateBooking();
    setLastActionText('Simulou reserva concorrente ao vivo!');
    setTimeout(() => setLastActionText(null), 3000);
  };

  const handleReset = () => {
    onResetVacancies();
    setLastActionText('Quadro de vagas restaurado!');
    setTimeout(() => setLastActionText(null), 3000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 max-w-xs animate-fadeIn">
      <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-wider border-b border-slate-800 pb-2 mb-2 text-amber-400">
        <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
        <span>Simulador em Tempo Real</span>
      </div>

      <p className="text-[11px] font-medium text-slate-300 mb-2.5 leading-snug">
        Testar concorrência de inscritos no mapa de vagas em tempo real.
      </p>

      {lastActionText && (
        <div className="text-[10px] bg-amber-500/20 text-amber-300 font-black uppercase tracking-wider p-1.5 rounded mb-2 text-center border border-amber-500/30">
          {lastActionText}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleSimulate}
          id="btn-simulate-live-booking"
          className="flex items-center justify-center space-x-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-black text-[10px] uppercase tracking-wider py-2 px-2 rounded-lg transition-all cursor-pointer"
        >
          <Users className="w-3.5 h-3.5" />
          <span>+1 RESERVA</span>
        </button>

        <button
          onClick={handleReset}
          id="btn-reset-all-vacancies"
          className="flex items-center justify-center space-x-1 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-black text-[10px] uppercase tracking-wider py-2 px-2 rounded-lg border border-slate-700 transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>RESTAURAR</span>
        </button>
      </div>
    </div>
  );
};
