import React from 'react';
import { Search, MapPin, Clock, Filter, X, Check, Sparkles } from 'lucide-react';
import { FilterState, Unit } from '../types';

interface CourseFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  units: Unit[];
  totalResults: number;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  filters,
  onFilterChange,
  units,
  totalResults,
}) => {
  const handleReset = () => {
    onFilterChange({
      searchQuery: '',
      unidadeId: '',
      periodo: '',
      modalidade: '',
      apenasGratuitos: false,
      somenteComVagas: false,
    });
  };

  const hasActiveFilters =
    filters.searchQuery ||
    filters.unidadeId ||
    filters.periodo ||
    filters.modalidade ||
    filters.apenasGratuitos ||
    filters.somenteComVagas;

  return (
    <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Main Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) =>
              onFilterChange({ ...filters, searchQuery: e.target.value })
            }
            placeholder="PESQUISAR POR CURSO (EX: ELETRICISTA, MECÂNICA, USINAGEM)..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold uppercase tracking-wide text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#da251c] focus:border-transparent transition-all"
            id="input-search-courses"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter por Unidade SENAI */}
        <div className="relative min-w-[200px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <MapPin className="w-4 h-4" />
          </div>
          <select
            value={filters.unidadeId}
            onChange={(e) =>
              onFilterChange({ ...filters, unidadeId: e.target.value })
            }
            className="w-full pl-9 pr-8 py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold uppercase tracking-tight text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#da251c] focus:border-transparent appearance-none cursor-pointer"
            id="select-unit-filter"
          >
            <option value="">TODAS AS UNIDADES SENAI</option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.cidade.toUpperCase()} - {unit.nome.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            <Filter className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Filter por Período / Turno */}
        <div className="relative min-w-[150px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Clock className="w-4 h-4" />
          </div>
          <select
            value={filters.periodo}
            onChange={(e) =>
              onFilterChange({ ...filters, periodo: e.target.value })
            }
            className="w-full pl-9 pr-8 py-3 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold uppercase tracking-tight text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#da251c] focus:border-transparent appearance-none cursor-pointer"
            id="select-period-filter"
          >
            <option value="">TODOS OS PERÍODOS</option>
            <option value="Manhã">MANHÃ</option>
            <option value="Tarde">TARDE</option>
            <option value="Noite">NOITE</option>
            <option value="Integral">INTEGRAL</option>
            <option value="Aos Sábados">AOS SÁBADOS</option>
          </select>
        </div>
      </div>

      {/* Secondary Toggles & Quick Badges */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Apenas Gratuitos Checkbox Button */}
          <button
            onClick={() =>
              onFilterChange({
                ...filters,
                apenasGratuitos: !filters.apenasGratuitos,
              })
            }
            id="btn-filter-gratuitos"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider transition-all ${
              filters.apenasGratuitos
                ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-black'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                filters.apenasGratuitos
                  ? 'bg-emerald-600 text-white'
                  : 'border border-gray-400 bg-white'
              }`}
            >
              {filters.apenasGratuitos && <Check className="w-3 h-3 stroke-[3]" />}
            </span>
            <span>CURSOS 100% GRATUITOS</span>
          </button>

          {/* Somente com Vagas Disponíveis */}
          <button
            onClick={() =>
              onFilterChange({
                ...filters,
                somenteComVagas: !filters.somenteComVagas,
              })
            }
            id="btn-filter-com-vagas"
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider transition-all ${
              filters.somenteComVagas
                ? 'bg-red-100 text-[#da251c] border-red-300 font-black'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            <span
              className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                filters.somenteComVagas
                  ? 'bg-[#da251c] text-white'
                  : 'border border-gray-400 bg-white'
              }`}
            >
              {filters.somenteComVagas && <Check className="w-3 h-3 stroke-[3]" />}
            </span>
            <span>APENAS COM VAGAS ABERTAS</span>
          </button>
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center space-x-3 text-slate-500 ml-auto font-black text-xs uppercase tracking-tight">
          <span className="text-slate-800">
            <strong>{totalResults}</strong> {totalResults === 1 ? 'CURSO ENCONTRADO' : 'CURSOS ENCONTRADOS'}
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              id="btn-reset-filters"
              className="text-[#da251c] hover:underline font-black flex items-center space-x-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>LIMPAR FILTROS</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
