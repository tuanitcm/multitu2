
import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { Wind, Hammer, Zap, RefreshCw } from 'lucide-react';

type PhysMode = 'motion' | 'work' | 'power';

const formatNumber = (num: number) => new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 4 }).format(num);

export const PhysicsCalculator = ({ defaultMode = 'motion' }: { defaultMode?: PhysMode }) => {
  const [mode, setMode] = useState<PhysMode>(defaultMode);
  
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [v3, setV3] = useState('');

  const calculate = () => {
      const val1 = parseFloat(v1);
      const val2 = parseFloat(v2);
      const val3 = parseFloat(v3); 

      if (mode === 'motion') {
          let filled = 0;
          if (v1) filled++; 
          if (v2) filled++; 
          if (v3) filled++; 
          
          if (filled !== 2) return null; 
          
          if (!v1) return { label: 'Quãng đường (s)', val: val2 * val3, unit: 'm' }; 
          if (!v2) return { label: 'Vận tốc (v)', val: val1 / val3, unit: 'm/s' }; 
          if (!v3) return { label: 'Thời gian (t)', val: val1 / val2, unit: 's' }; 
      }

      if (mode === 'work') {
          if (!isNaN(val1) && !isNaN(val2)) return { label: 'Công cơ học (A)', val: val1 * val2, unit: 'J' };
      }

      if (mode === 'power') {
          if (!isNaN(val1) && !isNaN(val2)) return { label: 'Công suất (P)', val: val1 / val2, unit: 'W' };
      }

      return null;
  };

  const result = calculate();
  const reset = () => { setV1(''); setV2(''); setV3(''); };

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
            <button onClick={() => { setMode('motion'); reset(); }} className={`p-2 rounded-lg text-sm font-bold flex flex-row sm:flex-col justify-center items-center gap-2 border transition-all ${mode === 'motion' ? 'bg-blue-600 border-blue-500 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                <Wind size={18} /> Vận tốc/Q.Đường
            </button>
            <button onClick={() => { setMode('work'); reset(); }} className={`p-2 rounded-lg text-sm font-bold flex flex-row sm:flex-col justify-center items-center gap-2 border transition-all ${mode === 'work' ? 'bg-blue-600 border-blue-500 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                <Hammer size={18} /> Công cơ học
            </button>
            <button onClick={() => { setMode('power'); reset(); }} className={`p-2 rounded-lg text-sm font-bold flex flex-row sm:flex-col justify-center items-center gap-2 border transition-all ${mode === 'power' ? 'bg-blue-600 border-blue-500 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                <Zap size={18} /> Công suất
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mode === 'motion' && (
                <>
                  <div className="md:col-span-2 text-xs text-slate-500 mb-2 italic">Nhập 2 ô để tính ô còn lại</div>
                  <NumberInput label="Quãng đường (s - mét)" value={v1} onChange={(e) => setV1(e.target.value)} />
                  <NumberInput label="Vận tốc (v - m/s)" value={v2} onChange={(e) => setV2(e.target.value)} />
                  <NumberInput label="Thời gian (t - giây)" value={v3} onChange={(e) => setV3(e.target.value)} />
                </>
            )}
            {mode === 'work' && (
                <>
                  <div className="md:col-span-2 text-xs text-slate-500 mb-2">Công thức: A = F × s</div>
                  <NumberInput label="Lực tác dụng (F - Newton)" value={v1} onChange={(e) => setV1(e.target.value)} />
                  <NumberInput label="Quãng đường dịch chuyển (s - mét)" value={v2} onChange={(e) => setV2(e.target.value)} />
                </>
            )}
            {mode === 'power' && (
                <>
                  <div className="md:col-span-2 text-xs text-slate-500 mb-2">Công thức: P = A / t</div>
                  <NumberInput label="Công thực hiện (A - Joule)" value={v1} onChange={(e) => setV1(e.target.value)} />
                  <NumberInput label="Thời gian (t - giây)" value={v2} onChange={(e) => setV2(e.target.value)} />
                </>
            )}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center min-h-[140px] text-center shadow-sm">
            {result ? (
                <div className="animate-in zoom-in duration-300">
                    <div className="text-slate-500 text-sm font-bold uppercase mb-2">{result.label}</div>
                    <div className="text-4xl font-bold text-blue-600">{formatNumber(result.val)} <span className="text-lg text-slate-500 font-normal">{result.unit}</span></div>
                </div>
            ) : (
                <span className="text-slate-400 text-sm">Nhập đủ thông số để tính toán</span>
            )}
        </div>

         <div className="flex justify-end">
            <button onClick={reset} className="text-slate-500 hover:text-blue-600 text-sm flex items-center gap-2 transition-colors">
                <RefreshCw size={16} /> Làm mới
            </button>
        </div>
    </div>
  );
};
