import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { TrendingUp, Calculator, RefreshCw, ArrowRight } from 'lucide-react';

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 4 }).format(num);
};

export const PercentageChange = () => {
  const [oldVal, setOldVal] = useState<string>('');
  const [newVal, setNewVal] = useState<string>('');

  const v1 = parseFloat(oldVal);
  const v2 = parseFloat(newVal);
  
  let result: number | null = null;
  let isIncrease = true;

  if (!isNaN(v1) && !isNaN(v2) && v1 !== 0) {
    result = ((v2 - v1) / Math.abs(v1)) * 100;
    isIncrease = result >= 0;
  }

  const handleReset = () => {
    setOldVal('');
    setNewVal('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-purple-200 text-sm">
        Tính tỷ lệ tăng/giảm (%) từ số <strong>cũ</strong> sang số <strong>mới</strong>.
      </div>
      
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
           <NumberInput 
              label="Giá trị cũ" 
              value={oldVal}
              onChange={(e) => setOldVal(e.target.value)}
              placeholder="VD: 1000"
            />
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1 justify-center items-center text-slate-600 z-10 bg-[#1e293b] rounded-full p-1 border border-slate-700">
               <ArrowRight size={16} />
            </div>
            <NumberInput 
              label="Giá trị mới" 
              value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              placeholder="VD: 1500"
            />
        </div>
      </div>

      <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {result !== null ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-medium mb-2 block uppercase tracking-wider">Mức độ thay đổi</span>
              <div className={`text-4xl font-bold flex items-center justify-center gap-3 ${isIncrease ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isIncrease ? '+' : ''}{formatNumber(result)}%
                <span className={`text-sm font-bold px-3 py-1 rounded-full border ${isIncrease ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                  {isIncrease ? 'Tăng trưởng' : 'Suy giảm'}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-3 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700 inline-block font-mono">
                Chênh lệch tuyệt đối: {formatNumber(v2 - v1)}
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