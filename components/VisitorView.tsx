
import React from 'react';
import { WidgetConfig } from '../types';
import ProgressBar from './ProgressBar';

interface VisitorViewProps {
  config: WidgetConfig;
}

const VisitorView: React.FC<VisitorViewProps> = ({ config }) => {
  const handleDonate = () => {
    if (config.paymentLink) {
      window.open(config.paymentLink, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e7e8ec] p-6 max-w-2xl mx-auto">
      {/* Header section with Title */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-xl font-bold text-black tracking-tight">{config.title}</h1>
          <span className="bg-[#f0f2f5] text-[#818c99] px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider">
            Виджет
          </span>
        </div>
        
        <p className="text-[#2c2d2e] text-[15px] mb-6 leading-relaxed">
          {config.description}
        </p>
        
        <div className="space-y-4 bg-[#f9fafb] p-5 rounded-xl border border-[#f0f2f5]">
          <div className="flex justify-between items-end mb-1">
            <span className="text-[#818c99] text-sm font-medium">Собрано</span>
            <span className="text-black font-bold">{config.collectedAmount.toLocaleString()} ₽ <span className="text-[#818c99] font-normal text-xs">/ {config.goalAmount.toLocaleString()} ₽</span></span>
          </div>
          
          <ProgressBar current={config.collectedAmount} total={config.goalAmount} />
          
          <div className="flex items-center text-[#818c99] text-xs pt-1">
            <svg className="w-4 h-4 mr-1.5 opacity-60" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            Поддержали {config.supportersCount} человек
          </div>
        </div>
      </div>

      {/* Primary CTA Section */}
      <div className="space-y-4">
        <button
          onClick={handleDonate}
          className="w-full bg-[#447bba] hover:bg-[#3b6ba2] text-white font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-sm flex items-center justify-center space-x-2"
        >
          <span>Перевести чаевые</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        
        <div className="text-center">
          <p className="text-[11px] text-[#939393] mb-1">Вас перенаправит по ссылке:</p>
          <a 
            href={config.paymentLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[13px] text-[#447bba] font-medium hover:underline break-all"
          >
            {config.paymentLink}
          </a>
        </div>
      </div>
    </div>
  );
};

export default VisitorView;
