import { Course, Unit } from '../types';

export const mockUnits: Unit[] = [
  {
    id: 'americana',
    nome: 'SENAI Prof. João Baptista Suro',
    cidade: 'Americana',
    endereco: 'Av. Brasil, 2800 - Parque Residencial Nardini',
    telefone: '(19) 3471-8400',
  },
  {
    id: 'campinas_zerbini',
    nome: 'SENAI Roberto Mange / Prof. Zerbini',
    cidade: 'Campinas',
    endereco: 'Rua Pastor Cícero Canuto de Lima, 71 - Vila Italia',
    telefone: '(19) 3772-1800',
  },
  {
    id: 'sp_vilamariana',
    nome: 'SENAI Suíço-Brasileira Paulo Ernesto Tolle',
    cidade: 'São Paulo - Vila Mariana',
    endereco: 'Rua Tuiuti, 515 - Tatuapé / Santo Amaro',
    telefone: '(11) 5642-3400',
  },
  {
    id: 'santos',
    nome: 'SENAI Antonio Souza Noschese',
    cidade: 'Santos',
    endereco: 'Av. Mário Covas Júnior, 300 - Estuário',
    telefone: '(13) 3269-8100',
  },
  {
    id: 'sorocaba',
    nome: 'SENAI Gaspar Ricardo Júnior',
    cidade: 'Sorocaba',
    endereco: 'Praça Roberto Mange, 30 - Santa Rosália',
    telefone: '(15) 3212-7400',
  },
  {
    id: 'sjc',
    nome: 'SENAI Santos Dumont',
    cidade: 'São José dos Campos',
    endereco: 'Rua Teresina, 267 - Vila Dutra',
    telefone: '(12) 3943-5200',
  },
];

// Helper generator for vacancy maps with realistic mix of green (disponível), red (ocupada), and orange (em análise)
const generateVacancies = (
  total: number,
  occupiedCount: number,
  inAnalysisCount: number
) => {
  const vacancies = [];
  const statusPool: ('OCUPADA' | 'EM_ANALISE' | 'DISPONIVEL')[] = [];

  for (let i = 0; i < occupiedCount; i++) statusPool.push('OCUPADA');
  for (let i = 0; i < inAnalysisCount; i++) statusPool.push('EM_ANALISE');
  while (statusPool.length < total) statusPool.push('DISPONIVEL');

  // Shuffle deterministic pattern or clean mix
  for (let i = 1; i <= total; i++) {
    const status = statusPool[i - 1] || 'DISPONIVEL';
    vacancies.push({
      numero: i,
      status: status,
      usuarioReserva: status === 'EM_ANALISE' ? 'Candidato Reserva' : null,
      timestampReserva: status === 'EM_ANALISE' ? new Date().toISOString() : null,
    });
  }

  return vacancies;
};

export const mockCourses: Course[] = [
  {
    id: 'c1',
    titulo: 'Eletricista Instalador Predial',
    categoria: 'Eletroeletrônica',
    unidadeId: 'americana',
    unidadeNome: 'SENAI Prof. João Baptista Suro (Americana)',
    cidade: 'Americana',
    gratuito: true,
    cargaHoraria: 160,
    periodo: 'Noite',
    horario: '19h00 às 22h00 (Segunda a Quinta)',
    modalidade: 'Presencial',
    descricao:
      'Capacita o aluno na elaboração de esquemas elétricos, instalação e manutenção de infraestrutura e circuitos elétricos em edificações conforme normas NBR 5410.',
    requisitos: 'Ensino Fundamental completo e idade mínima de 18 anos.',
    dataInicio: '18/08/2026',
    totalVagas: 16,
    mapaVagas: generateVacancies(16, 10, 2),
  },
  {
    id: 'c2',
    titulo: 'Programação de Torno e Centro de Usinagem CNC',
    categoria: 'Metalmecânica',
    unidadeId: 'americana',
    unidadeNome: 'SENAI Prof. João Baptista Suro (Americana)',
    cidade: 'Americana',
    gratuito: false,
    preco: 'R$ 680,00 (ou 4x R$ 170,00)',
    cargaHoraria: 120,
    periodo: 'Tarde',
    horario: '13h30 às 17h30 (Terça e Quinta)',
    modalidade: 'Presencial',
    descricao:
      'Desenvolve competências para programar, operar e realizar o ajuste dimensional em máquinas ferramentas a comando numérico computadorizado (CNC).',
    requisitos: 'Conhecimento prévio em Leitura e Interpretação de Desenho Técnico.',
    dataInicio: '25/08/2026',
    totalVagas: 12,
    mapaVagas: generateVacancies(12, 5, 1),
  },
  {
    id: 'c3',
    titulo: 'Desenvolvedor Front-End Web (React & TypeScript)',
    categoria: 'Tecnologia da Informação',
    unidadeId: 'campinas_zerbini',
    unidadeNome: 'SENAI Roberto Mange (Campinas)',
    cidade: 'Campinas',
    gratuito: true,
    cargaHoraria: 200,
    periodo: 'Noite',
    horario: '18h30 às 22h30 (Segunda a Sexta)',
    modalidade: 'Semipresencial',
    descricao:
      'Formação completa em tecnologias modernas de desenvolvimento web: HTML5, CSS3, Tailwind CSS, JavaScript ES6+, React, consumo de APIs REST e controle de versão.',
    requisitos: 'Conhecimentos básicos de informática e lógica de programação.',
    dataInicio: '01/09/2026',
    totalVagas: 24,
    mapaVagas: generateVacancies(24, 16, 3),
  },
  {
    id: 'c4',
    titulo: 'Automação Industrial com CLP e Pneumática',
    categoria: 'Automação',
    unidadeId: 'campinas_zerbini',
    unidadeNome: 'SENAI Roberto Mange (Campinas)',
    cidade: 'Campinas',
    gratuito: false,
    preco: 'R$ 850,00 (ou 5x R$ 170,00)',
    cargaHoraria: 160,
    periodo: 'Manhã',
    horario: '08h00 às 12h00 (Segunda a Quinta)',
    modalidade: 'Presencial',
    descricao:
      'Treinamento prático em programação de Controladores Lógicos Programáveis (CLP), circuitos eletropneumáticos e sensores industriais aplicados.',
    requisitos: 'Conhecimento em Eletricidade Básica.',
    dataInicio: '10/09/2026',
    totalVagas: 15,
    mapaVagas: generateVacancies(15, 12, 1),
  },
  {
    id: 'c5',
    titulo: 'Soldagem no Processo TIG e MIG/MAG',
    categoria: 'Metalmecânica',
    unidadeId: 'sp_vilamariana',
    unidadeNome: 'SENAI Suíço-Brasileira (São Paulo)',
    cidade: 'São Paulo - Vila Mariana',
    gratuito: true,
    cargaHoraria: 180,
    periodo: 'Integral',
    horario: '08h00 às 17h00 (Segunda a Sexta)',
    modalidade: 'Presencial',
    descricao:
      'Capacitação intensiva em técnicas de soldagem TIG em aço carbono, inox e alumínio, além do manuseio e regulagem de equipamentos MIG/MAG com segurança.',
    requisitos: 'Ensino Fundamental completo e idade mínima de 18 anos.',
    dataInicio: '15/08/2026',
    totalVagas: 12,
    mapaVagas: generateVacancies(12, 11, 0),
  },
  {
    id: 'c6',
    titulo: 'Mecânico de Manutenção de Automóveis',
    categoria: 'Automotiva',
    unidadeId: 'santos',
    unidadeNome: 'SENAI Antonio Souza Noschese (Santos)',
    cidade: 'Santos',
    gratuito: true,
    cargaHoraria: 240,
    periodo: 'Noite',
    horario: '19h00 às 22h30 (Segunda a Sexta)',
    modalidade: 'Presencial',
    descricao:
      'Aprenda a realizar diagnósticos, manutenção preventiva e corretiva nos sistemas de suspensão, direção, freios, injeção eletrônica e motores de veículos leves.',
    requisitos: 'Ensino Fundamental completo e idade mínima de 16 anos.',
    dataInicio: '20/08/2026',
    totalVagas: 20,
    mapaVagas: generateVacancies(20, 14, 2),
  },
  {
    id: 'c7',
    titulo: 'Excel Avançado com Análise de Dados e Dashboard',
    categoria: 'Gestão e Tecnologia',
    unidadeId: 'sorocaba',
    unidadeNome: 'SENAI Gaspar Ricardo Júnior (Sorocaba)',
    cidade: 'Sorocaba',
    gratuito: false,
    preco: 'R$ 420,00 (ou 3x R$ 140,00)',
    cargaHoraria: 60,
    periodo: 'Aos Sábados',
    horario: '08h00 às 13h00 (Sábados)',
    modalidade: 'EAD',
    descricao:
      'Domine fórmulas avançadas, tabelas dinâmicas, gráficos interativos, Power Query e construção de dashboards profissionais para tomada de decisão.',
    requisitos: 'Conhecimento intermediário de Excel.',
    dataInicio: '29/08/2026',
    totalVagas: 30,
    mapaVagas: generateVacancies(30, 18, 4),
  },
  {
    id: 'c8',
    titulo: 'Operador de Logística e Armazenagem',
    categoria: 'Gestão',
    unidadeId: 'sjc',
    unidadeNome: 'SENAI Santos Dumont (São José dos Campos)',
    cidade: 'São José dos Campos',
    gratuito: true,
    cargaHoraria: 160,
    periodo: 'Manhã',
    horario: '08h00 às 12h00 (Segunda a Sexta)',
    modalidade: 'Presencial',
    descricao:
      'Capacitação nas rotinas de recebimento, estocagem, inventários, movimentação de materiais e utilização de sistemas WMS na cadeia de suprimentos.',
    requisitos: 'Ensino Médio em andamento.',
    dataInicio: '05/09/2026',
    totalVagas: 20,
    mapaVagas: generateVacancies(20, 8, 1),
  },
];
