export type VacancyStatus = 'DISPONIVEL' | 'OCUPADA' | 'EM_ANALISE';

export interface Vacancy {
  numero: number;
  status: VacancyStatus;
  usuarioReserva?: string | null;
  timestampReserva?: string | null;
}

export interface Course {
  id: string;
  titulo: string;
  categoria: string; // e.g. Metalmecânica, Tecnologia, Eletroeletrônica, Automação, Gestão
  unidadeId: string;
  unidadeNome: string;
  cidade: string;
  gratuito: boolean;
  preco?: string;
  cargaHoraria: number; // in hours
  periodo: 'Manhã' | 'Tarde' | 'Noite' | 'Integral' | 'Aos Sábados';
  horario: string; // e.g. "19h00 às 22h00"
  modalidade: 'Presencial' | 'EAD' | 'Semipresencial';
  descricao: string;
  requisitos: string;
  dataInicio: string;
  totalVagas: number;
  mapaVagas: Vacancy[];
}

export interface Unit {
  id: string;
  nome: string;
  cidade: string;
  endereco: string;
  telefone: string;
}

export interface FilterState {
  searchQuery: string;
  unidadeId: string;
  periodo: string;
  modalidade: string;
  apenasGratuitos: boolean;
  somenteComVagas: boolean;
}

export interface UserInscription {
  id: string;
  cursoId: string;
  cursoTitulo: string;
  unidadeNome: string;
  numeroVaga: number;
  dataSolicitacao: string;
  status: 'EM_ANALISE' | 'APROVADA' | 'CANCELADA';
  expiraEmTimestamp: number; // ms timestamp for 10 min countdown
}
