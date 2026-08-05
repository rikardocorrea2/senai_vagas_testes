import React from 'react';
import { Course } from '../types';
import {
  MapPin,
  Clock,
  Calendar,
  Grid,
  CheckCircle2,
  Users,
  AlertCircle,
  Tag,
  ChevronRight,
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onViewVacancies: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onViewVacancies,
}) => {
  // Calculate current real-time counts from mapaVagas
  const totalVagas = course.mapaVagas.length;
  const disponiveis = course.mapaVagas.filter(
    (v) => v.status === 'DISPONIVEL'
  ).length;
  const ocupadas = course.mapaVagas.filter((v) => v.status === 'OCUPADA').length;
  const emAnalise = course.mapaVagas.filter(
    (v) => v.status === 'EM_ANALISE'
  ).length;

  // Percentage for vacancy bar
  const disponivelPct = (disponiveis / totalVagas) * 100;
  const ocupadaPct = (ocupadas / totalVagas) * 100;
  const analisePct = (emAnalise / totalVagas) * 100;

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
      id={`course-card-${course.id}`}
    >
      <div>
        {/* Card Header & Badges */}
        <div className="p-5 pb-3 border-b border-gray-100">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
              {course.categoria}
            </span>

            {course.gratuito ? (
              <span className="inline-flex items-center space-x-1 text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded border border-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>100% GRATUITO</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-1 rounded border border-amber-300">
                <Tag className="w-3 h-3 text-amber-700" />
                <span>{course.preco}</span>
              </span>
            )}
          </div>

          <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 group-hover:text-[#da251c] transition-colors leading-snug">
            {course.titulo}
          </h3>

          {/* Unidade SENAI */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-600 mt-2 font-bold">
            <MapPin className="w-4 h-4 text-[#da251c] shrink-0" />
            <span className="truncate">{course.unidadeNome}</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-5 py-3.5 bg-gray-50 text-xs space-y-2 border-b border-gray-100 font-medium">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-1.5 text-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                CARGA: <strong>{course.cargaHoraria}H</strong>
              </span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                PERÍODO: <strong>{course.periodo}</strong>
              </span>
            </div>
          </div>

          <div className="text-slate-600 text-[11px] bg-white p-2 rounded border border-gray-200 flex items-center justify-between font-bold">
            <span className="truncate">{course.horario}</span>
            <span className="ml-2 font-black text-slate-800 bg-gray-100 px-2 py-0.5 rounded text-[10px] uppercase shrink-0">
              {course.modalidade}
            </span>
          </div>
        </div>

        {/* Vacancies Section & Color Bar */}
        <div className="p-5 pt-3.5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-black text-slate-800 uppercase tracking-wider flex items-center space-x-1 text-[11px]">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>QUADRO DE VAGAS</span>
            </span>
            <span className="text-[11px] font-black uppercase text-slate-600">
              TOTAL: <strong>{totalVagas}</strong>
            </span>
          </div>

          {/* Visual Mini Vacancy Progress Bar */}
          <div className="w-full h-3 bg-gray-200 rounded overflow-hidden flex mb-2 border border-gray-300">
            <div
              style={{ width: `${disponivelPct}%` }}
              className="bg-[#22c55e] h-full transition-all duration-300"
              title={`${disponiveis} vagas disponíveis (Verde)`}
            />
            <div
              style={{ width: `${analisePct}%` }}
              className="bg-[#f97316] h-full transition-all duration-300"
              title={`${emAnalise} vagas em análise (Laranja)`}
            />
            <div
              style={{ width: `${ocupadaPct}%` }}
              className="bg-[#ef4444] h-full transition-all duration-300"
              title={`${ocupadas} vagas ocupadas (Vermelho)`}
            />
          </div>

          {/* Vacancy Breakdown Pills */}
          <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center font-black uppercase tracking-wider">
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 py-1 rounded">
              <span className="text-[#22c55e] font-black">{disponiveis}</span> LIVRES
            </div>
            <div className="bg-orange-50 text-orange-900 border border-orange-200 py-1 rounded">
              <span className="text-[#f97316] font-black">{emAnalise}</span> ANÁLISE
            </div>
            <div className="bg-red-50 text-red-900 border border-red-200 py-1 rounded">
              <span className="text-[#ef4444] font-black">{ocupadas}</span> OCUPADAS
            </div>
          </div>
        </div>
      </div>

      {/* Button "Ver vagas" */}
      <div className="p-5 pt-0">
        <button
          onClick={() => onViewVacancies(course)}
          id={`btn-ver-vagas-${course.id}`}
          className="w-full flex items-center justify-center space-x-2 bg-[#da251c] hover:bg-[#b81d15] active:bg-[#9c1811] text-white font-black text-xs py-3 px-4 rounded-lg uppercase tracking-wider shadow transition-all duration-150 cursor-pointer"
        >
          <Grid className="w-4 h-4" />
          <span>VER VAGAS</span>
          <ChevronRight className="w-4 h-4 ml-auto opacity-70" />
        </button>
      </div>
    </div>
  );
};
