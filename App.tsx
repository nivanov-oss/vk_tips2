
import React, { useState } from 'react';
import { AppRole, WidgetConfig } from './types';
import { INITIAL_CONFIG, COLORS } from './constants';
import VisitorView from './components/VisitorView';
import AdminView from './components/AdminView';

const App: React.FC = () => {
  const [role, setRole] = useState<AppRole>(AppRole.VISITOR);
  const [config, setConfig] = useState<WidgetConfig>(INITIAL_CONFIG);

  const handleUpdateConfig = (newConfig: WidgetConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="min-h-screen p-4 md:p-10">
      {/* Role Switcher (For demo purposes) */}
      <div className="fixed bottom-6 right-6 flex bg-white rounded-full shadow-lg border border-[#e7e8ec] p-1.5 z-50">
        <button
          onClick={() => setRole(AppRole.VISITOR)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            role === AppRole.VISITOR 
              ? 'bg-[#5181b8] text-white' 
              : 'text-[#818c99] hover:bg-[#f2f3f5]'
          }`}
        >
          Как посетитель
        </button>
        <button
          onClick={() => setRole(AppRole.ADMIN)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            role === AppRole.ADMIN 
              ? 'bg-[#5181b8] text-white' 
              : 'text-[#818c99] hover:bg-[#f2f3f5]'
          }`}
        >
          Как админ
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto mt-8 mb-20 animate-in fade-in duration-500">
        <div className="mb-4 flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-[#818c99] tracking-widest">
                {role === AppRole.ADMIN ? 'Панель администратора' : 'Виджет сообщества'}
            </span>
            {role === AppRole.VISITOR && (
                <button className="text-[#447bba] text-xs font-medium hover:underline">Настройка формы</button>
            )}
        </div>

        {role === AppRole.ADMIN ? (
          <AdminView config={config} onSave={handleUpdateConfig} />
        ) : (
          <VisitorView config={config} />
        )}
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-[#f5f6f8] border-t border-[#e7e8ec] py-3 text-center text-[#818c99] text-xs">
          Cashless Tipping Widget &copy; {new Date().getFullYear()} • Powered by VK API
      </footer>
    </div>
  );
};

export default App;
