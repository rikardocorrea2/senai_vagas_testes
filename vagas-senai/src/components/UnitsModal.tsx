import React from 'react';
import { Unit, Course } from '../types';
import { Building2, MapPin, Phone, X, BookOpen } from 'lucide-react';

interface UnitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  units: Unit[];
  courses: Course[];
  onSelectUnitFilter: (unitId: string) => void;
}

export const UnitsModal: React.FC<UnitsModalProps> = ({
  isOpen,
  onClose,
  units,
  courses,
  onSelectUnitFilter,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      id="units-modal-overlay"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-auto flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="bg-[#da251c] text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <Building2 className="w-7 h-7 text-white" />
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">UNIDADES DA REDE SENAI</h2>
              <p className="text-xs font-bold uppercase tracking-wider text-white/90">
                Selecione uma unidade para filtrar os cursos disponíveis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-units-modal"
            className="p-2 rounded-lg bg-black/20 hover:bg-black/30 text-white transition-colors"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {units.map((unit) => {
            const courseCount = courses.filter(
              (c) => c.unidadeId === unit.id
            ).length;

            return (
              <div
                key={unit.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-[#E30613] transition-all"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-black uppercase bg-[#E30613] text-white px-2 py-0.5 rounded">
                      SENAI {unit.cidade}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{courseCount} Cursos</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm mt-2">
                    {unit.nome}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 flex items-start space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E30613] shrink-0 mt-0.5" />
                    <span>{unit.endereco}</span>
                  </p>

                  <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{unit.telefone}</span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectUnitFilter(unit.id);
                    onClose();
                  }}
                  id={`btn-[#unit-${unit.id}]`}
                  className="mt-4 w-full text-center text-xs font-black uppercase tracking-wider bg-white text-[#da251c] hover:bg-[#da251c] hover:text-white border-2 border-[#da251c] py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  VER CURSOS DESTA UNIDADE
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between shrink-0">
          <span>6 Unidades Cadastradas</span>
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
