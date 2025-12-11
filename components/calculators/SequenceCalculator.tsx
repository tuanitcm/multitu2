
import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { Sigma, TrendingUp, RefreshCw, Calculator } from 'lucide-react';

type SeqType = 'arithmetic' | 'geometric';

const formatNumber = (num: number) => new Intl.NumberFormat('vi-VN').format(num);

export const SequenceCalculator = () => {
  const [type, setType] = useState<SeqType>('arithmetic');
  const [u1, setU1] = useState('');
  const [d, setD] = useState('');
  const [n, setN] = useState('');

  const handleReset = () => { setU1(''); setD(''); setN(''); };

  const calculate = () => {
      const a = parseFloat(u1);
      const step = parseFloat(d);
      const term = parseFloat(n);
      
      if (isNaN(a) || isNaN(step) || isNaN(term)) return null;

      let un = 0;
      let sn = 0;

      if (type === 'arithmetic') {
          un = a + (term - 1) * step;
          sn = (term * (a + un)) / 2;
      } else {
          un = a * Math.pow(step, term - 1);
          if (step === 1) sn = a * term;
          else sn = (a * (1 - Math.pow(step, term))) / (1 - step);
      }

      return { un, sn };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
            <button
                onClick={() => setType('arithmetic')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'arithmetic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
                Cấp số cộng (÷)
            </button>
            <button
                onClick={() => setType('geometric')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'geometric' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
                Cấp số nhân (×)
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <NumberInput 
                label="Số hạng đầu (u₁)" 
                value={u1} 
                onChange={(e) => setU1(e.target.value)} 
                placeholder="VD: 1"
            />
             <NumberInput 
                label={type === 'arithmetic' ? "Công sai (d)" : "Công bội (q)"} 
                value={d} 
                onChange={(e) => setD(e.target.value)} 
                placeholder={type === 'arithmetic' ? "VD: 2 (cộng thêm)" : "VD: 2 (nhân lên)"}
            />
             <NumberInput 
                label="Vị trí cần tính (n)" 
                value={n} 
                onChange={(e) => setN(e.target.value)} 
                placeholder="VD: 10"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm">
                 <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">Số hạng thứ n (uₙ)</span>
                 <div className="text-3xl font-bold text-emerald-600">
                     {result ? formatNumber(result.un) : '---'}
                 </div>
                 <div className="text-xs text-slate-500 mt-2 font-mono bg-slate-50 px-2 py-1 rounded inline-block">
                     {type === 'arithmetic' ? 'uₙ = u₁ + (n-1)d' : 'uₙ = u₁ × qⁿ⁻¹'}
                 </div>
             </div>
             <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm">
                 <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-2">Tổng n số hạng (Sₙ)</span>
                 <div className="text-3xl font-bold text-blue-600">
                     {result ? formatNumber(result.sn) : '---'}
                 </div>
                 <div className="text-xs text-slate-500 mt-2 font-mono bg-slate-50 px-2 py-1 rounded inline-block">
                     {type === 'arithmetic' ? 'Sₙ = ⁿ⁄₂ (u₁ + uₙ)' : 'Sₙ = u₁(1-qⁿ)/(1-q)'}
                 </div>
             </div>
        </div>
        
        <div className="flex justify-end">
            <button onClick={handleReset} className="text-slate-500 hover:text-blue-600 text-sm flex items-center gap-2 transition-colors">
                <RefreshCw size={16} /> Làm mới
            </button>
        </div>
    </div>
  );
};
