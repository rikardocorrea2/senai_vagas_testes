import React from 'react';
import { HelpCircle, X, CheckCircle2, ShieldCheck, Mail, Phone } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Como funciona o Mapa de Vagas do SENAI?',
      a: 'Ao clicar em "Ver vagas" em qualquer curso, o sistema exibe uma grade interativa numerada. As vagas Verdes estão disponíveis, as Laranjas estão em análise temporária e as Vermelhas estão ocupadas.',
    },
    {
      q: 'O que significa o status "Em Análise" (Laranja)?',
      a: 'Quando você clica em "Me inscrever", a primeira vaga livre é travada temporariamente para você por 10 minutos (cor Laranja). Esse tempo permite que você conclua a entrega de documentação ou confirmação.',
    },
    {
      q: 'Os cursos gratuitos exigem processo seletivo?',
      a: 'Depende do curso. Cursos com a tag "100% Gratuito" são custeados pelo SENAI ou parceiros industriais. A ocupação de vagas é feita por ordem de solicitação.',
    },
    {
      q: 'Posso me inscrever em mais de uma vaga?',
      a: 'Sim, você pode solicitar inscrição em cursos com horários e períodos compatíveis.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      id="faq-modal-overlay"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-auto flex flex-col max-h-[85vh]">
        <div className="bg-[#da251c] text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-7 h-7 text-white" />
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">AJUDA E PERGUNTAS FREQUENTES</h2>
              <p className="text-xs font-bold uppercase tracking-wider text-white/90">
                Portal de Vagas e Inscrições SENAI
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-faq-modal"
            className="p-2 rounded-lg bg-black/20 hover:bg-black/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#E30613] shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-slate-100 p-4 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between shrink-0">
          <span>Central de Atendimento: (11) 3322-0050</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 text-white font-bold rounded-lg text-xs hover:bg-slate-900"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};
