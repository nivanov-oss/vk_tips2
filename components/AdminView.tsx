
import React, { useState } from 'react';
import { WidgetConfig } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AdminViewProps {
  config: WidgetConfig;
  onSave: (newConfig: WidgetConfig) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ config, onSave }) => {
  const [link, setLink] = useState(config.paymentLink);
  const [description, setDescription] = useState(config.description);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const generateAiDescription = async () => {
    if (!process.env.API_KEY) {
      console.error("API Key is missing");
      alert("Ошибка конфигурации: API ключ не найден.");
      return;
    }

    setIsAiLoading(true);
    try {
      // Инициализируем AI прямо перед использованием
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Напиши короткий, дружелюбный и мотивирующий текст для виджета сбора чаевых в сообществе ВК. 
        Тема: поддержка авторов контента. Максимум 150 символов. Текущий текст: ${description}`,
      });
      if (response.text) {
        setDescription(response.text.trim());
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("Не удалось улучшить текст. Попробуйте позже.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSave = () => {
    if (!link.startsWith('http')) {
       alert('Введите корректную ссылку');
       return;
    }
    setStatus('saving');
    setTimeout(() => {
      onSave({ ...config, paymentLink: link, description: description });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    }, 600);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e7e8ec] overflow-hidden max-w-2xl mx-auto">
      <div className="px-8 py-6 border-b border-[#f0f2f5]">
        <h2 className="text-lg font-bold text-black">Настройки виджета</h2>
      </div>

      <div className="p-8 space-y-6">
        <div>
          <label className="block text-[#2c2d2e] text-sm font-semibold mb-2">Ссылка Tips.tips</label>
          <input
            type="text"
            placeholder="https://tips.tips/000462613"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full bg-[#f2f3f5] border border-[#dce1e6] rounded-xl px-4 py-3 focus:outline-none focus:bg-white focus:border-[#447bba] transition-all font-medium"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-[#2c2d2e] text-sm font-semibold">Описание сбора</label>
            <button 
              onClick={generateAiDescription}
              disabled={isAiLoading}
              className="text-[#447bba] text-xs font-medium flex items-center hover:opacity-80 disabled:opacity-50"
            >
              <svg className={`w-3.5 h-3.5 mr-1 ${isAiLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {isAiLoading ? 'Магия AI...' : 'Улучшить через AI'}
            </button>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#f2f3f5] border border-[#dce1e6] rounded-xl px-4 py-3 h-24 resize-none focus:outline-none focus:bg-white focus:border-[#447bba] transition-all text-sm"
          />
        </div>

        <button
          onClick={handleSave}
          className={`w-full ${status === 'success' ? 'bg-[#4bb34b]' : 'bg-[#447bba]'} text-white font-semibold py-3.5 rounded-xl transition-all shadow-sm`}
        >
          {status === 'saving' ? 'Сохранение...' : status === 'success' ? 'Готово!' : 'Сохранить изменения'}
        </button>
      </div>
    </div>
  );
};

export default AdminView;
