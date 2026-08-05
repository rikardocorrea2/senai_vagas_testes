import React from 'react';
import {
  GraduationCap,
  Building2,
  BarChart3,
  BookmarkCheck,
  HelpCircle,
  Settings,
  X,
  ChevronRight,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
  inscriptionsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeSection,
  onSelectSection,
  inscriptionsCount,
}) => {
  const menuItems = [
    {
      id: 'catalogo',
      label: 'Catálogo de Cursos',
      icon: GraduationCap,
      functional: true,
      badge: 'Ativo',
    },
    {
      id: 'unidades',
      label: 'Unidades SENAI',
      icon: Building2,
      functional: true,
      badge: '6 Unidades',
    },
    {
      id: 'inscricoes',
      label: 'Minhas Inscrições',
      icon: BookmarkCheck,
      functional: true,
      badge: inscriptionsCount > 0 ? `${inscriptionsCount}` : undefined,
      badgeColor: 'bg-amber-500 text-slate-950 font-bold',
    },
    {
      id: 'relatorio',
      label: 'Relatório de Vagas',
      icon: BarChart3,
      functional: false,
      badge: 'Em breve',
    },
    {
      id: 'ajuda',
      label: 'Ajuda & Dúvidas',
      icon: HelpCircle,
      functional: true,
      badge: 'FAQ',
    },
    {
      id: 'configuracoes',
      label: 'Configurações',
      icon: Settings,
      functional: false,
      badge: 'Em breve',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-[#da251c] text-white flex flex-col justify-between border-r border-red-700 transition-transform duration-300 ease-in-out shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        id="sidebar-navigation"
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-white text-[#da251c] font-black flex items-center justify-center text-lg shadow-sm">
                S
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tighter uppercase leading-none text-white">
                  SENAI
                </h1>
                <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-80 mt-0.5 text-white">
                  Portal de Vagas
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-md hover:bg-white/10 text-white"
              aria-label="Fechar menu"
              id="btn-close-sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            <p className="px-3 text-[10px] font-black text-white/60 uppercase tracking-widest mb-3">
              Navegação
            </p>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.functional) {
                      onSelectSection(item.id);
                      onClose();
                    }
                  }}
                  id={`sidebar-item-${item.id}`}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-bold uppercase tracking-tight transition-all ${
                    isActive
                      ? 'bg-white/20 text-white shadow-sm font-black border border-white/30'
                      : item.functional
                      ? 'text-white/90 hover:bg-white/10 hover:text-white'
                      : 'text-white/40 cursor-not-allowed hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-white' : 'text-white/80'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                        item.badgeColor ||
                        (isActive
                          ? 'bg-white text-[#da251c]'
                          : item.functional
                          ? 'bg-black/20 text-white'
                          : 'bg-black/10 text-white/40')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Legend Box in Sidebar */}
        <div className="p-4 m-4 bg-black/20 rounded-xl border border-white/15 text-white">
          <div className="flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider mb-2.5">
            <Info className="w-3.5 h-3.5 text-white" />
            <span>Legenda de Vagas</span>
          </div>
          <div className="space-y-2 text-[11px] font-bold">
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-[#22c55e] shrink-0 border border-white/30"></span>
              <span className="uppercase tracking-tight text-white/90">
                Disponível (Verde)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-[#ef4444] shrink-0 border border-white/30"></span>
              <span className="uppercase tracking-tight text-white/90">
                Ocupada (Vermelho)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded bg-[#f97316] shrink-0 border border-white/30"></span>
              <span className="uppercase tracking-tight text-white/90">
                Em Análise (Laranja)
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
