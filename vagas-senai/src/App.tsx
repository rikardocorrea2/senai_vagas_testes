import React, { useState, useMemo } from 'react';
import { Course, FilterState, Unit, UserInscription } from './types';
import { mockCourses, mockUnits } from './data/mockCourses';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CourseFilters } from './components/CourseFilters';
import { CourseCard } from './components/CourseCard';
import { VacancyModal } from './components/VacancyModal';
import { MyInscriptionsModal } from './components/MyInscriptionsModal';
import { UnitsModal } from './components/UnitsModal';
import { FAQModal } from './components/FAQModal';
import { SimulateLiveUpdate } from './components/SimulateLiveUpdate';
import {
  GraduationCap,
  Building2,
  Sparkles,
  SearchX,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  // Course State (with in-memory mutable vacancies maps)
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [units] = useState<Unit[]>(mockUnits);

  // Active Selected Course for "Ver Vagas" Grid Modal
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  // Modals & Navigation Drawer States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('catalogo');
  const [isInscriptionsOpen, setIsInscriptionsOpen] = useState(false);
  const [isUnitsOpen, setIsUnitsOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  // User Inscriptions
  const [userInscriptions, setUserInscriptions] = useState<UserInscription[]>([]);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    unidadeId: '',
    periodo: '',
    modalidade: '',
    apenasGratuitos: false,
    somenteComVagas: false,
  });

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search query (title, category, unit, city)
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = course.titulo.toLowerCase().includes(query);
        const matchCategory = course.categoria.toLowerCase().includes(query);
        const matchUnit = course.unidadeNome.toLowerCase().includes(query);
        const matchCity = course.cidade.toLowerCase().includes(query);
        if (!matchTitle && !matchCategory && !matchUnit && !matchCity) {
          return false;
        }
      }

      // Unit filter
      if (filters.unidadeId && course.unidadeId !== filters.unidadeId) {
        return false;
      }

      // Period filter
      if (filters.periodo && course.periodo !== filters.periodo) {
        return false;
      }

      // Gratuity
      if (filters.apenasGratuitos && !course.gratuito) {
        return false;
      }

      // Available vacancies filter
      if (filters.somenteComVagas) {
        const disponiveis = course.mapaVagas.filter(
          (v) => v.status === 'DISPONIVEL'
        ).length;
        if (disponiveis === 0) return false;
      }

      return true;
    });
  }, [courses, filters]);

  // Overall Statistics
  const totalAvailableSeats = useMemo(() => {
    return courses.reduce((acc, course) => {
      const free = course.mapaVagas.filter((v) => v.status === 'DISPONIVEL').length;
      return acc + free;
    }, 0);
  }, [courses]);

  // Handle Reserve Vacancy ("Me inscrever")
  const handleReserveVacancy = (
    courseId: string,
    vacancyNumber: number,
    candidateName: string,
    cpf: string
  ) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id === courseId) {
          const updatedMapa = c.mapaVagas.map((v) => {
            if (v.numero === vacancyNumber) {
              return {
                ...v,
                status: 'EM_ANALISE' as const,
                usuarioReserva: candidateName,
                timestampReserva: new Date().toISOString(),
              };
            }
            return v;
          });
          return { ...c, mapaVagas: updatedMapa };
        }
        return c;
      })
    );

    // Keep active course in modal synchronized
    setActiveCourse((prev) => {
      if (!prev || prev.id !== courseId) return prev;
      const updatedMapa = prev.mapaVagas.map((v) => {
        if (v.numero === vacancyNumber) {
          return {
            ...v,
            status: 'EM_ANALISE' as const,
            usuarioReserva: candidateName,
            timestampReserva: new Date().toISOString(),
          };
        }
        return v;
      });
      return { ...prev, mapaVagas: updatedMapa };
    });

    // Add to User Inscriptions list
    const foundCourse = courses.find((c) => c.id === courseId);
    if (foundCourse) {
      const newInscription: UserInscription = {
        id: `insc-${Date.now()}`,
        cursoId: foundCourse.id,
        cursoTitulo: foundCourse.titulo,
        unidadeNome: foundCourse.unidadeNome,
        numeroVaga: vacancyNumber,
        dataSolicitacao: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'EM_ANALISE',
        expiraEmTimestamp: Date.now() + 10 * 60 * 1000, // 10 minutes from now
      };

      setUserInscriptions((prev) => [newInscription, ...prev]);
    }
  };

  // Handle Cancel Inscription
  const handleCancelInscription = (inscriptionId: string) => {
    const target = userInscriptions.find((i) => i.id === inscriptionId);
    if (!target) return;

    // Reset vacancy back to DISPONIVEL (Green)
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id === target.cursoId) {
          const updatedMapa = c.mapaVagas.map((v) => {
            if (v.numero === target.numeroVaga) {
              return {
                ...v,
                status: 'DISPONIVEL' as const,
                usuarioReserva: null,
                timestampReserva: null,
              };
            }
            return v;
          });
          return { ...c, mapaVagas: updatedMapa };
        }
        return c;
      })
    );

    // Sync modal if currently open for that course
    if (activeCourse && activeCourse.id === target.cursoId) {
      setActiveCourse((prev) => {
        if (!prev) return null;
        const updatedMapa = prev.mapaVagas.map((v) => {
          if (v.numero === target.numeroVaga) {
            return {
              ...v,
              status: 'DISPONIVEL' as const,
              usuarioReserva: null,
              timestampReserva: null,
            };
          }
          return v;
        });
        return { ...prev, mapaVagas: updatedMapa };
      });
    }

    // Remove from local inscriptions
    setUserInscriptions((prev) => prev.filter((i) => i.id !== inscriptionId));
  };

  // Simulate Concurrent Live Booking (for testing)
  const handleSimulateLiveBooking = () => {
    // Pick a random course that has available seats
    const eligibleCourses = courses.filter((c) =>
      c.mapaVagas.some((v) => v.status === 'DISPONIVEL')
    );
    if (eligibleCourses.length === 0) return;

    const randomCourse =
      eligibleCourses[Math.floor(Math.random() * eligibleCourses.length)];
    const availableVacancies = randomCourse.mapaVagas.filter(
      (v) => v.status === 'DISPONIVEL'
    );
    const targetVacancy =
      availableVacancies[Math.floor(Math.random() * availableVacancies.length)];

    // Randomly set to OCUPADA (red) or EM_ANALISE (orange)
    const newStatus = Math.random() > 0.5 ? 'EM_ANALISE' : 'OCUPADA';

    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === randomCourse.id) {
          const updated = c.mapaVagas.map((v) => {
            if (v.numero === targetVacancy.numero) {
              return {
                ...v,
                status: newStatus as any,
                usuarioReserva: 'Outro Candidato (Ao Vivo)',
              };
            }
            return v;
          });
          return { ...c, mapaVagas: updated };
        }
        return c;
      })
    );

    if (activeCourse && activeCourse.id === randomCourse.id) {
      setActiveCourse((prev) => {
        if (!prev) return null;
        const updated = prev.mapaVagas.map((v) => {
          if (v.numero === targetVacancy.numero) {
            return {
              ...v,
              status: newStatus as any,
              usuarioReserva: 'Outro Candidato (Ao Vivo)',
            };
          }
          return v;
        });
        return { ...prev, mapaVagas: updated };
      });
    }
  };

  // Reset all course vacancies to initial mock data
  const handleResetVacancies = () => {
    setCourses(mockCourses);
    setUserInscriptions([]);
    if (activeCourse) {
      const resetOne = mockCourses.find((c) => c.id === activeCourse.id);
      if (resetOne) setActiveCourse(resetOne);
    }
  };

  // Navigation handlers from sidebar
  const handleSelectSection = (section: string) => {
    setActiveSection(section);
    if (section === 'unidades') setIsUnitsOpen(true);
    if (section === 'inscricoes') setIsInscriptionsOpen(true);
    if (section === 'ajuda') setIsFAQOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-[#E30613] selection:text-white">
      {/* Header */}
      <Header
        activeInscriptionsCount={userInscriptions.length}
        onOpenInscriptions={() => setIsInscriptionsOpen(true)}
        onOpenUnits={() => setIsUnitsOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        totalCoursesCount={courses.length}
        totalAvailableSeats={totalAvailableSeats}
      />

      {/* Main Container Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Sidebar Navigation */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          inscriptionsCount={userInscriptions.length}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {/* Welcome & Context Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#da251c] rounded-2xl p-6 sm:p-8 text-white shadow-md mb-6 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-md mb-3">
                SENAI SÃO PAULO • VAGAS 2026
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-tight">
                CONSULTE VAGAS E FAÇA SUA INSCRIÇÃO
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-2 leading-relaxed">
                PESQUISE TURMAS DISPONÍVEIS NAS UNIDADES DO SENAI E ACOMPANHE A
                MATRIZ VISUAL DE VAGAS EM TEMPO REAL.
              </p>
            </div>
            {/* Background SENAI Decorative Badge */}
            <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none text-9xl font-black text-white font-mono uppercase">
              SENAI
            </div>
          </div>

          {/* Search & Filter Component */}
          <CourseFilters
            filters={filters}
            onFilterChange={setFilters}
            units={units}
            totalResults={filteredCourses.length}
          />

          {/* Course Cards Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewVacancies={(selected) => setActiveCourse(selected)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-8 shadow-xs">
              <SearchX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">
                Nenhum curso encontrado com estes filtros
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                Tente ajustar os filtros de busca por unidade, palavra-chave ou
                período para encontrar mais opções.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: '',
                    unidadeId: '',
                    periodo: '',
                    modalidade: '',
                    apenasGratuitos: false,
                    somenteComVagas: false,
                  })
                }
                className="inline-flex items-center space-x-1.5 bg-[#E30613] text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-[#c20510] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restaurar Todos os Filtros</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Interactive Vacancy Grid Modal ("Ver vagas") */}
      <VacancyModal
        course={activeCourse}
        onClose={() => setActiveCourse(null)}
        onReserveVacancy={handleReserveVacancy}
      />

      {/* "Minhas Inscrições" Modal */}
      <MyInscriptionsModal
        isOpen={isInscriptionsOpen}
        onClose={() => setIsInscriptionsOpen(false)}
        inscriptions={userInscriptions}
        onCancelInscription={handleCancelInscription}
      />

      {/* SENAI Units Modal */}
      <UnitsModal
        isOpen={isUnitsOpen}
        onClose={() => setIsUnitsOpen(false)}
        units={units}
        courses={courses}
        onSelectUnitFilter={(unitId) => {
          setFilters((prev) => ({ ...prev, unidadeId: unitId }));
        }}
      />

      {/* FAQ & Help Modal */}
      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />

      {/* Real-time Simulator Action Floating Widget */}
      <SimulateLiveUpdate
        onSimulateBooking={handleSimulateLiveBooking}
        onResetVacancies={handleResetVacancies}
      />

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-white font-bold mb-1">
              <span className="bg-[#E30613] text-white font-black px-2 py-0.5 rounded text-xs">
                SENAI
              </span>
              <span>Vagas SENAI • Protótipo de Gestão Visual de Vagas</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Serviço Nacional de Aprendizagem Industrial — Unidades de São Paulo
            </p>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <button
              onClick={() => setIsUnitsOpen(true)}
              className="hover:text-white transition-colors underline"
            >
              Unidades
            </button>
            <button
              onClick={() => setIsFAQOpen(true)}
              className="hover:text-white transition-colors underline"
            >
              Ajuda
            </button>
            <button
              onClick={() => setIsInscriptionsOpen(true)}
              className="hover:text-white transition-colors underline"
            >
              Minhas Inscrições
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
