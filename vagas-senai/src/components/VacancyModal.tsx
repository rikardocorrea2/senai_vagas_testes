import React, { useState, useEffect } from 'react';
import { Course, Vacancy, VacancyStatus } from '../types';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  UserCheck,
  Info,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface VacancyModalProps {
  course: Course | null;
  onClose: () => void;
  onReserveVacancy: (
    courseId: string,
    vacancyNumber: number,
    candidateName: string,
    cpf: string
  ) => void;
  onCancelReservation?: (courseId: string, vacancyNumber: number) => void;
}

export const VacancyModal: React.FC<VacancyModalProps> = ({
  course,
  onClose,
  onReserveVacancy,
  onCancelReservation,
}) => {
  if (!course) return null;

  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [reservationSuccess, setReservationSuccess] = useState<number | null>(
    null
  );
  const [countdownSeconds, setCountdownSeconds] = useState<number>(600); // 10 minutes = 600s

  // Auto pick first available green vacancy if none selected
  const availableVacancies = course.mapaVagas.filter(
    (v) => v.status === 'DISPONIVEL'
  );
  const firstAvailable = availableVacancies.length > 0 ? availableVacancies[0].numero : null;

  useEffect(() => {
    if (firstAvailable && selectedSeat === null) {
      setSelectedSeat(firstAvailable);
    }
  }, [course, firstAvailable]);

  // Handle seat click
  const handleSeatClick = (vacancy: Vacancy) => {
    if (vacancy.status === 'DISPONIVEL') {
      setSelectedSeat(vacancy.numero);
    } else if (vacancy.status === 'EM_ANALISE') {
      alert(`Vaga #${vacancy.numero} está atualmente 'Em Análise' por outro candidato em processo de inscrição.`);
    } else {
      alert(`Vaga #${vacancy.numero} já está Ocupada/Confirmada.`);
    }
  };

  // Start enrollment process
  const handleStartEnrollment = () => {
    const seatToReserve = selectedSeat || firstAvailable;
    if (!seatToReserve) {
      alert('Não há vagas disponíveis para esta turma.');
      return;
    }
    setIsRegistering(true);
  };

  // Confirm enrollment
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const seatToReserve = selectedSeat || firstAvailable;
    if (!seatToReserve) return;

    if (!candidateName.trim()) {
      alert('Por favor, informe seu nome completo.');
      return;
    }

    onReserveVacancy(course.id, seatToReserve, candidateName, cpf);
    setReservationSuccess(seatToReserve);
    setIsRegistering(false);
  };

  // Countdown timer effect for active reservation
  useEffect(() => {
    let timer: any;
    if (reservationSuccess) {
      timer = setInterval(() => {
        setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [reservationSuccess]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalVagas = course.mapaVagas.length;
  const disponiveisCount = course.mapaVagas.filter(
    (v) => v.status === 'DISPONIVEL'
  ).length;
  const ocupadasCount = course.mapaVagas.filter(
    (v) => v.status === 'OCUPADA'
  ).length;
  const analiseCount = course.mapaVagas.filter(
    (v) => v.status === 'EM_ANALISE'
  ).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      id="vacancy-modal-overlay"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#da251c] text-white p-6 border-b border-red-700 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-white/90 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse"></span>
              <span>MATRIZ VISUAL DE VAGAS EM TEMPO REAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight">
              {course.titulo}
            </h2>
            <p className="text-xs text-white/90 font-bold uppercase tracking-wider mt-1">
              {course.unidadeNome} • {course.periodo} ({course.cargaHoraria}H)
            </p>
          </div>

          <button
            onClick={onClose}
            id="btn-close-vacancy-modal"
            className="p-2 rounded-lg bg-black/20 hover:bg-black/30 text-white transition-colors"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Success Banner if reservation just completed */}
          {reservationSuccess && (
            <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 text-slate-900 shadow-sm animate-bounce-short">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow">
                  #{reservationSuccess}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-amber-950 text-sm sm:text-base">
                      Vaga #{reservationSuccess} alterada para "Em Análise"!
                    </h4>
                    <span className="inline-flex items-center space-x-1 text-xs font-mono font-bold bg-amber-200 text-amber-950 px-2 py-0.5 rounded border border-amber-300">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      <span>{formatTimer(countdownSeconds)}</span>
                    </span>
                  </div>
                  <p className="text-xs text-amber-900 mt-1">
                    Sua solicitação de inscrição foi recebida e a vaga está bloqueada
                    temporariamente na cor <strong>Laranja</strong> para análise dos requisitos.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Real-time Statistics Counter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-3 text-center">
              <span className="text-[10px] text-gray-600 font-black uppercase tracking-wider">
                TOTAL DE VAGAS
              </span>
              <p className="text-2xl font-black text-slate-900 mt-0.5">
                {totalVagas}
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
              <span className="text-[10px] text-[#22c55e] font-black uppercase tracking-wider">
                DISPONÍVEIS
              </span>
              <p className="text-2xl font-black text-[#22c55e] mt-0.5">
                {disponiveisCount}
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
              <span className="text-[10px] text-[#f97316] font-black uppercase tracking-wider">
                EM ANÁLISE
              </span>
              <p className="text-2xl font-black text-[#f97316] mt-0.5">
                {analiseCount}
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
              <span className="text-[10px] text-[#ef4444] font-black uppercase tracking-wider">
                OCUPADAS
              </span>
              <p className="text-2xl font-black text-[#ef4444] mt-0.5">
                {ocupadasCount}
              </p>
            </div>
          </div>

          {/* Legend Guide */}
          <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 text-xs font-bold">
            <p className="font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-2">
              <Info className="w-4 h-4 text-[#da251c]" />
              <span>LEGENDA DAS VAGAS SENAI:</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center space-x-2 bg-white p-2.5 rounded-lg border border-emerald-200">
                <span className="w-4 h-4 rounded bg-[#22c55e] font-black text-[10px] text-white flex items-center justify-center">
                  ✓
                </span>
                <span className="text-slate-900 font-bold uppercase text-[11px]">
                  VERDE: DISPONÍVEL
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-2.5 rounded-lg border border-orange-200">
                <span className="w-4 h-4 rounded bg-[#f97316] font-black text-[10px] text-white flex items-center justify-center">
                  ⌛
                </span>
                <span className="text-slate-900 font-bold uppercase text-[11px]">
                  LARANJA: EM ANÁLISE
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-2.5 rounded-lg border border-red-200">
                <span className="w-4 h-4 rounded bg-[#ef4444] font-black text-[10px] text-white flex items-center justify-center">
                  ✕
                </span>
                <span className="text-slate-900 font-bold uppercase text-[11px]">
                  VERMELHO: OCUPADA
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Seat Matrix / Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center space-x-2">
                <span>MATRIZ DE VAGAS:</span>
                {selectedSeat && (
                  <span className="bg-[#da251c] text-white text-[10px] px-2.5 py-0.5 rounded uppercase font-black tracking-wider">
                    VAGA #{selectedSeat} SELECIONADA
                  </span>
                )}
              </h3>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                CLIQUE NUMA VAGA VERDE
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 p-4 bg-gray-900 rounded-2xl border border-gray-800 shadow-inner">
              {course.mapaVagas.map((vaga) => {
                const isSelected = selectedSeat === vaga.numero;
                let bgClasses = '';
                let borderClasses = '';
                let textClasses = '';
                let labelStatus = '';

                if (vaga.status === 'DISPONIVEL') {
                  bgClasses = isSelected
                    ? 'bg-[#22c55e] scale-105 shadow-lg ring-4 ring-emerald-300'
                    : 'bg-[#22c55e] hover:bg-emerald-400 cursor-pointer active:scale-95';
                  borderClasses = 'border-emerald-300';
                  textClasses = 'text-white font-black';
                  labelStatus = 'Disponível';
                } else if (vaga.status === 'EM_ANALISE') {
                  bgClasses = 'bg-[#f97316] cursor-not-allowed opacity-90';
                  borderClasses = 'border-orange-300';
                  textClasses = 'text-white font-black';
                  labelStatus = 'Em Análise';
                } else {
                  bgClasses = 'bg-[#ef4444] cursor-not-allowed opacity-80';
                  borderClasses = 'border-red-400';
                  textClasses = 'text-white font-black';
                  labelStatus = 'Ocupada';
                }

                return (
                  <button
                    key={vaga.numero}
                    onClick={() => handleSeatClick(vaga)}
                    title={`Vaga #${vaga.numero}: ${labelStatus}`}
                    id={`vacancy-cell-${course.id}-${vaga.numero}`}
                    className={`aspect-square sm:h-16 rounded-xl border-2 ${bgClasses} ${borderClasses} ${textClasses} flex flex-col items-center justify-center transition-all duration-150 relative group`}
                  >
                    <span className="text-sm sm:text-base font-black leading-none tracking-tight">
                      #{vaga.numero}
                    </span>
                    <span className="text-[8px] uppercase font-black mt-1 tracking-wider">
                      {vaga.status === 'DISPONIVEL'
                        ? isSelected
                          ? 'SELECIONADA'
                          : 'LIVRE'
                        : vaga.status === 'EM_ANALISE'
                        ? 'ANÁLISE'
                        : 'OCUPADA'}
                    </span>

                    {/* Active Selected Ring Check */}
                    {isSelected && vaga.status === 'DISPONIVEL' && (
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-[#22c55e] rounded-full flex items-center justify-center font-black text-xs shadow">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enrollment Form Drawer (when clicking "Me inscrever") */}
          {isRegistering ? (
            <form
              onSubmit={handleConfirmReservation}
              className="bg-slate-50 border-2 border-[#E30613] rounded-xl p-4 sm:p-5 space-y-4 animate-fadeIn"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center space-x-2">
                    <UserCheck className="w-5 h-5 text-[#E30613]" />
                    <span>Confirmar Pré-Inscrição na Vaga #{selectedSeat}</span>
                  </h4>
                  <p className="text-xs text-slate-600">
                    A vaga mudará para o status <strong>"Em Análise"</strong> (cor Laranja).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Voltar
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome Completo do Candidato *
                  </label>
                  <input
                    type="text"
                    required
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Ex: João da Silva Santos"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E30613]"
                    id="input-candidate-name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    CPF *
                  </label>
                  <input
                    type="text"
                    required
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    placeholder="000.000.000-00"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E30613]"
                    id="input-candidate-cpf"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsRegistering(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  id="btn-confirm-inscription-submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-lg shadow transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <span>Reservar Vaga (Status "Em Análise")</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Bottom Action Area with "Me inscrever" button */
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-gray-600 font-bold uppercase tracking-wider">
                  VAGA ATUALMENTE SELECIONADA:
                </span>
                <p className="text-base font-black text-slate-900 uppercase tracking-tight">
                  {selectedSeat ? (
                    <span className="text-[#22c55e]">
                      VAGA #{selectedSeat} (LIVRE PARA RESERVA)
                    </span>
                  ) : (
                    <span className="text-[#ef4444]">SEM VAGAS DISPONÍVEIS NESTA TURMA</span>
                  )}
                </p>
              </div>

              <button
                onClick={handleStartEnrollment}
                disabled={disponiveisCount === 0}
                id="btn-me-inscrever-action"
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  disponiveisCount > 0
                    ? 'bg-[#da251c] hover:bg-[#b81d15] active:scale-98 text-white shadow-red-200'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ME INSCREVER NA VAGA #{selectedSeat || '1'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between shrink-0">
          <span className="truncate">
            Unidade: <strong>{course.unidadeNome}</strong>
          </span>
          <button
            onClick={onClose}
            className="text-slate-700 hover:text-slate-900 font-bold underline"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
