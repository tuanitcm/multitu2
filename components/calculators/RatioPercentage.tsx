import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { PieChart, Calculator, RefreshCw } from 'lucide-react';

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 4 }).format(num);
};

export const RatioPercentage = () => {
  const [part, setPart] = useState<string>('');
  const [total, setTotal] = useState<string>('');

  const p = parseFloat(part);
  const t = parseFloat(total);
  
  const result = !isNaN(p) && !isNaN(t) && t !== 0 ? (p / t) * 100 : null;

  const handleReset = () => {
    setPart('');
    setTotal('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 text-emerald-200 text-sm">
        Tính xem số <strong>X</strong> chiếm bao nhiêu phần trăm của số <strong>Y</strong>.
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NumberInput 
          label="Số thành phần (X)" 
          value={part}
          onChange={(e) => setPart(e.target.value)}
          placeholder="VD: 25"
        />
        <NumberInput 
          label="Tổng số (Y)" 
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          placeholder="VD: 100"
        />
      </div>

      <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {result !== null ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-medium mb-2 block uppercase tracking-wider">Tỷ lệ phần trăm</span>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 mb-3">
                {formatNumber(result)}%
              </div>
              <div className="text-xs text-slate-400 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700 inline-block font-mono">
                ({formatNumber(p)} ÷ {formatNumber(t)}) × 100 = {formatNumber(result)}%
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-600 gap-3 relative z-10">
              <Calculator size={32} className="opacity-50" />
              <span className="text-sm">Nhập số liệu để bắt đầu tính</span>
            </div>
          )}
      </div>

      <div className="flex justify-end">
         <button 
           onClick={handleReset}
           className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors"
         >
           <RefreshCw size={16} /> Làm mới
         </button>
      </div>
    </div>
  );
};