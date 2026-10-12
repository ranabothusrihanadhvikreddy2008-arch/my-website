import React from 'react';
import { useGold } from '../../context/GoldContext';
import { X, CheckCircle, Info, AlertTriangle, AlertCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useGold();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const iconMap = {
          success: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />,
          info: <Info className="w-5 h-5 text-[#E5B544] shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        };

        const borderMap = {
          success: 'border-emerald-600/50',
          info: 'border-[#8A6D3B]/60',
          warning: 'border-amber-600/50',
          error: 'border-rose-600/50'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-[#18130F] border ${borderMap[toast.type]} rounded-sm p-4 shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-300`}
          >
            {iconMap[toast.type]}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#FBF7F0] uppercase tracking-wider">
                {toast.title}
              </h4>
              <p className="text-xs text-[#B3A696] mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8A7E70] hover:text-[#FBF7F0] transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
