import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { ArrowRightLeft, Thermometer, RefreshCw } from 'lucide-react';

export const TemperatureConverter = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<'C'|'F'|'K'>('C');
  const [toUnit, setToUnit] = useState<'C'|'F'|'K'>('F');

  const convert = (val: number, from: string, to: string) => {
    let celsius = val;
    // To Celsius
    if (from === 'F') celsius = (val - 32) * 5/9;
    if (from === 'K') celsius = val - 273.15;
    
    // From Celsius to Target
    if (to === 'C') return celsius;
    if (to === 'F') return (celsius * 9/5) + 32;
    if (to === 'K') return celsius + 273.15;
    return celsius;
  };

  const result = amount !== '' && !isNaN(parseFloat(amount)) 
    ? convert(parseFloat(amount), fromUnit, toUnit) 
    : null;

  const formatNumber = (num: number) => 
    new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(num);

  const units = [
      { id: 'C', label: 'Độ C (Celsius)' },
      { id: 'F', label: 'Độ F (Fahrenheit)' },
      { id: 'K', label: 'Độ K (Kelvin)' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
        <div className="md:col-span-3 space-y-2">
           <label className="text-sm font-medium text-slate-400">Từ</label>
           <select 
             value={fromUnit}
             onChange={(e) => setFromUnit(e.target.value as any)}
             className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:border-indigo-500 outline-none"
           >
             {units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
           </select>
        </div>

        <div className="md:col-span-1 flex justify-center pb-3">
           <button 
             onClick={() => { setFromUnit(toUnit); setToUnit(fromUnit); }}
             className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-indigo-400 transition-colors border border-slate-700"
           >
             <ArrowRightLeft size={18} />
           </button>
        </div>

        <div className="md:col-span-3 space-y-2">
           <label className="text-sm font-medium text-slate-400">Sang</label>
           <select 
             value={toUnit}
             onChange={(e) => setToUnit(e.target.value as any)}
             className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:border-indigo-500 outline-none"
           >
             {units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
           </select>
        </div>
      </div>

      <div className="md:w-1/2 mx-auto">
         <NumberInput 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Nhập nhiệt độ..."
            className="text-center text-lg"
         />
      </div>

      <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {result !== null ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-medium mb-2 block uppercase tracking-wider">Kết quả</span>
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400 mb-3">
                {formatNumber(result)}°{toUnit}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-600 gap-3 relative z-10">
              <Thermometer size={32} className="opacity-50" />
              <span className="text-sm">Nhập nhiệt độ để chuyển đổi</span>
            </div>
          )}
      </div>

       <div className="flex justify-end">
         <button 
           onClick={() => setAmount('')}
           className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors"
         >
           <RefreshCw size={16} /> Làm mới
         </button>
      </div>
    </div>
  );
};
