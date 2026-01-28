
import React, { useState } from 'react';
import { Link as LinkIcon, Save, CheckCircle2 } from 'lucide-react';

interface AdminViewProps {
  currentLink: string;
  onSave: (link: string) => void;
  onBack: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ currentLink, onSave, onBack }) => {
  const [link, setLink] = useState(currentLink);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(link);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 md:p-12 space-y-10">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-brand-black tracking-tight">Кабинет</h2>
          <p className="text-sm text-gray-500 font-medium">
            Интеграция вашего сервиса чаевых
          </p>
        </div>
        <div className="bg-brand-orange/10 p-3 rounded-2xl text-brand-orange">
           <LinkIcon size={24} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 block ml-1">
            Ваша персональная ссылка
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <span className="text-brand-purple font-bold">@</span>
            </div>
            <input
              type="url"
              required
              placeholder="https://tips.tips/000000000"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full bg-brand-black/5 border-2 border-transparent rounded-2xl py-5 pl-12 pr-6 focus:outline-none focus:border-brand-purple transition-all text-brand-black font-semibold text-lg placeholder:text-gray-300"
            />
          </div>
          <div className="flex items-center gap-2 px-1">
            <div className="w-1 h-1 bg-brand-green rounded-full"></div>
            <p className="text-[11px] text-gray-400 font-medium">
              Пример: https://tips.tips/000462613
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100">
          <button
            type="submit"
            className={`w-full sm:flex-1 flex items-center justify-center gap-3 py-5 px-8 rounded-2xl font-black transition-all shadow-lg active:scale-[0.98] ${
              saved 
              ? 'bg-brand-green text-brand-black' 
              : 'bg-brand-black text-brand-green hover:shadow-brand-green/20'
            }`}
          >
            {saved ? (
              <><CheckCircle2 size={22} strokeWidth={3} /> СОХРАНЕНО</>
            ) : (
              <><Save size={22} strokeWidth={3} /> СОХРАНИТЬ</>
            )}
          </button>
          
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-8 py-5 text-gray-400 font-bold text-sm hover:text-brand-black transition-colors"
          >
            ОТМЕНА
          </button>
        </div>
      </form>

      <div className="bg-brand-pink/5 rounded-3xl p-6 border border-brand-pink/10">
        <div className="flex gap-4">
          <div className="bg-brand-pink/20 p-3 rounded-2xl h-fit">
            <div className="w-5 h-5 bg-brand-pink rounded-full blur-[4px] absolute opacity-40"></div>
            <LinkIcon size={20} className="text-brand-pink relative z-10" />
          </div>
          <div className="text-xs text-gray-600 leading-relaxed font-medium">
            <span className="font-bold text-brand-black block mb-1">Мгновенная оплата</span>
            Введите ссылку, и виджет автоматически подгрузит вашу форму оплаты CashlessTips. Пользователи смогут донатить прямо из ВК.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
