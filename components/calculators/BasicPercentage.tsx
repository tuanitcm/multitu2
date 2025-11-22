import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { NumberInput } from '../ui/Input';
import { Percent, Calculator, RefreshCw } from 'lucide-react';

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 4 }).format(num);
};

export const BasicPercentage = () => {
  const [percent, setPercent] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const p = parseFloat(percent);
  const v = parseFloat(value);
  
  const result = !isNaN(p) && !isNaN(v) ? (v * (p / 100)) : null;

  const handleReset = () => {
    setPercent('');
    setValue('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 text-indigo-200 text-sm">
        Công cụ giúp bạn tính nhanh giá trị của <strong>X%</strong> trong tổng số <strong>Y</strong>.
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NumberInput 
          label="Phần trăm (X)" 
          suffix="%" 
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          placeholder="VD: 20"
        />
        <NumberInput 
          label="Tổng số (Y)" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="VD: 500000"
        />
      </div>

      <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {result !== null ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-medium mb-2 block uppercase tracking-wider">Kết quả</span>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-3">
                {formatNumber(result)}
              </div>
              <div className="text-xs text-slate-400 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700 inline-block font-mono">
                {formatNumber(v)} × ({formatNumber(p)} ÷ 100) = {formatNumber(result)}
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