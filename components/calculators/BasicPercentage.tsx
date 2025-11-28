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
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800 text-sm">
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

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {result !== null ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-bold mb-2 block uppercase tracking-wider">Kết quả</span>
              <div className="text-4xl font-bold text-blue-600 mb-3">
                {formatNumber(result)}
              </div>
              <div className="text-xs text-slate-500 bg-white px-4 py-1.5 rounded-full border border-slate-200 inline-block font-mono shadow-sm">
                {formatNumber(v)} × ({formatNumber(p)} ÷ 100) = {formatNumber(result)}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400 gap-3 relative z-10">
              <Calculator size={32} className="opacity-50" />
              <span className="text-sm">Nhập số liệu để bắt đầu tính</span>
            </div>
          )}
      </div>

      <div className="flex justify-end">
         <button 
           onClick={handleReset}
           className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors"
         >
           <RefreshCw size={16} /> Làm mới
         </button>
      </div>
    </div>
  );
};