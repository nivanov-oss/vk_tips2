
import React from 'react';
import { WidgetConfig } from '../types';
import { Settings2, ExternalLink, ShieldAlert } from 'lucide-react';

interface VisitorViewProps {
  config: WidgetConfig;
  onOpenSettings: () => void;
}

const VisitorView: React.FC<VisitorViewProps> = ({ config, onOpenSettings }) => {
  return (
    <div className="flex flex-col h-[700px] w-full bg-white overflow-hidden">
      {/* Brand Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-purple rounded-xl flex items-center justify-center text-brand-black shadow-sm">
            <span className="text-[12px] font-black">CT</span>
          </div>
          <h1 className="text-sm font-bold text-brand-black truncate max-w-[180px]">
            {config.title}
          </h1>
        </div>
        
        <button 
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 text-brand-black text-[12px] hover:opacity-80 transition-all font-semibold bg-brand-purple px-4 py-2 rounded-xl shadow-sm"
        >
          <Settings2 size={14} />
          Настройка формы
        </button>
      </div>

      {/* Embedded Service Page */}
      <div className="flex-1 relative bg-gray-50">
        {config.paymentLink ? (
          <div className="w-full h-full flex flex-col">
            <iframe 
              src={config.paymentLink}
              title="Tipping Service"
              className="w-full h-full border-none"
              allow="payment; clipboard-write"
            />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
               <a 
                href={config.paymentLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-black text-brand-green px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl"
               >
                 <ExternalLink size={14} />
                 Открыть платеж
               </a>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-5">
            <div className="w-20 h-20 bg-brand-pink/20 rounded-full flex items-center justify-center text-brand-pink">
              <ShieldAlert size={40} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-black">Нужна настройка</h3>
              <p className="text-sm text-gray-500 max-w-[260px] mx-auto mt-2 leading-relaxed">
                Пожалуйста, укажите вашу ссылку CashlessTips в настройках, чтобы начать принимать чаевые.
              </p>
            </div>
            <button 
              onClick={onOpenSettings}
              className="bg-brand-green text-brand-black font-bold text-sm px-8 py-3 rounded-2xl hover:brightness-105 transition-all shadow-lg"
            >
              Настроить сейчас
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorView;
