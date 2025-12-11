
import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { Target, Calculator, RefreshCw } from 'lucide-react';

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 4 }).format(num);
};

export const FindWhole = () => {
  const [part, setPart] = useState<string>('');
  const [percent, setPercent] = useState<string>('');

  const p = parseFloat(part);
  const per = parseFloat(percent);
  
  const result = !isNaN(p) && !isNaN(per) && per !== 0 ? (p / (per / 100)) : null;

  const handleReset = () => {
    setPart('');
    setPercent('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-sky-50 border border-sky-100 rounded-lg p-4 text-sky-800 text-sm">
        Tìm số tổng <strong>Y</strong> khi biết <strong>X</strong> tương ứng với <strong>P%</strong>.
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <NumberInput 
          label="Số giá trị (X)" 
          value={part}
          onChange={(e) => setPart(e.target.value)}
          placeholder="VD: 50"
        />
        <NumberInput 
          label="Tương ứng (%)" 
          suffix="%" 
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          placeholder="VD: 20"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-blue-50 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          {result !== null ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-medium mb-2 block uppercase tracking-wider">Số gốc cần tìm</span>
              <div className="text-4xl font-bold text-sky-600 mb-3">
                {formatNumber(result)}
              </div>
              <div className="text-xs text-slate-500 bg-white px-4 py-1.5 rounded-full border border-slate-200 inline-block font-mono shadow-sm">
                 {formatNumber(p)} ÷ ({formatNumber(per)} ÷ 100) = {formatNumber(result)}
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
