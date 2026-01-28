
import React, { useState } from 'react';
import { ViewMode, WidgetConfig } from './types';
import VisitorView from './components/VisitorView';
import AdminView from './components/AdminView';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.VISITOR);
  const [config, setConfig] = useState<WidgetConfig>({
    paymentLink: 'https://tips.tips/000462613',
    goalAmount: 5000,
    currentAmount: 1450,
    supportersCount: 24,
    title: 'Безналичные чаевые'
  });

  const handleSaveConfig = (newLink: string) => {
    setConfig(prev => ({ ...prev, paymentLink: newLink }));
  };

  const toggleAdmin = () => setViewMode(ViewMode.ADMIN);
  const toggleVisitor = () => setViewMode(ViewMode.VISITOR);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8 bg-[#f0f2f5]">
      <main className="w-full max-w-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 ring-1 ring-black/5">
        {viewMode === ViewMode.VISITOR ? (
          <VisitorView 
            config={config} 
            onOpenSettings={toggleAdmin}
          />
        ) : (
          <AdminView 
            currentLink={config.paymentLink} 
            onSave={handleSaveConfig} 
            onBack={toggleVisitor}
          />
        )}
      </main>

      <footer className="mt-8 text-gray-500 text-xs flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="opacity-70">Сервис безналичных чаевых</span>
          <div className="flex items-center gap-1">
            <span className="font-bold text-brand-black">Cashless</span>
            <span className="font-bold text-brand-purple">Tips</span>
          </div>
        </div>
        <p className="opacity-40 text-[10px]">
          Виджет для интеграции в сообщества ВКонтакте
        </p>
      </footer>
    </div>
  );
};

export default App;
