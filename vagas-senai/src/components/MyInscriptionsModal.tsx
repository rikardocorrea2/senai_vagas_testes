import React, { useState, useEffect } from 'react';
import { UserInscription } from '../types';
import {
  X,
  Clock,
  BookmarkCheck,
  CheckCircle2,
  Trash2,
  FileText,
  Building2,
  AlertTriangle,
} from 'lucide-react';

interface MyInscriptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  inscriptions: UserInscription[];
  onCancelInscription: (inscriptionId: string) => void;
}

export const MyInscriptionsModal: React.FC<MyInscriptionsModalProps> = ({
  isOpen,
  onClose,
  inscriptions,
  onCancelInscription,
}) => {
  if (!isOpen) return null;

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getRemainingTime = (expiraEmTimestamp: number) => {
    const diff = Math.max(0, Math.floor((expiraEmTimestamp - now) / 1000));
    const m = Math.floor(diff / 60);
    const s = diff % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      id="inscriptions-modal-overlay"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-auto flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="bg-[#da251c] text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <BookmarkCheck className="w-7 h-7 text-white" />
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">MINHAS INSCRIÇÕES SENAI</h2>
              <p className="text-xs font-bold uppercase tracking-wider text-white/90">
                Acompanhe o status e a reserva temporária das suas vagas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-inscriptions-modal"
            className="p-2 rounded-lg bg-black/20 hover:bg-black/30 text-white transition-colors"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {inscriptions.length === 0 ? (
            <div className="text-center py-12 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-800">
                Nenhuma inscrição ativa no momento
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Ao clicar em <strong>"Me inscrever"</strong> em um curso, sua vaga será
                reservada temporariamente com status <strong>"Em Análise"</strong> e aparecerá listada aqui.
              </p>
            </div>
          ) : (
            inscriptions.map((item) => {
              const remaining = getRemainingTime(item.expiraEmTimestamp);
              const isExpired = item.expiraEmTimestamp <= now;

              return (
                <div
                  key={item.id}
                  className="bg-white border-2 border-amber-300 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  id={`inscription-item-${item.id}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-md border border-amber-300">
                        Vaga #{item.numeroVaga} • Em Análise
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.dataSolicitacao}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {item.cursoTitulo}
                    </h4>

                    <p className="text-xs text-slate-600 flex items-center space-x-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.unidadeNome}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4 shrink-0">
                    <div className="flex items-center space-x-1 text-xs font-mono font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
                      <Clock className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                      <span>Tempo de Reserva: {remaining}</span>
                    </div>

                    <button
                      onClick={() => onCancelInscription(item.id)}
                      className="text-xs text-red-600 hover:text-red-800 hover:underline font-semibold flex items-center space-x-1 mt-2"
                      title="Desistir da vaga e liberar no mapa"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancelar Reserva</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between shrink-0">
          <span>
            Total: <strong>{inscriptions.length}</strong> inscrição(ões) em análise
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 text-white font-bold rounded-lg text-xs hover:bg-slate-900"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
