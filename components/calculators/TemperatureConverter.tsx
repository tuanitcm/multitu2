
import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { ArrowRightLeft, Thermometer, RefreshCw, ChevronDown } from 'lucide-react';

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
           <label className="text-sm font-semibold text-slate-700">Từ</label>
           <div className="relative group">
             <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-10 py-3 text-slate-900 focus:border-blue-500 outline-none appearance-none cursor-pointer hover:border-blue-400 transition-all shadow-sm"
             >
                {units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
             </select>
             <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
                <ChevronDown size={18} />
             </div>
           </div>
        </div>

        <div className="md:col-span-1 flex justify-center pb-3">
           <button 
             onClick={() => { setFromUnit(toUnit); setToUnit(fromUnit); }}
             className="p-2 bg-slate-100 hover:bg-blue-50 hover:border-blue-200 rounded-full text-slate-500 hover:text-blue-600 transition-all border border-slate-200 shadow-sm active:scale-95"
             title="Đổi chiều"
           >
             <ArrowRightLeft size={20} />
           </button>
        </div>

        <div className="md:col-span-3 space-y-2">
           <label className="text-sm font-semibold text-slate-700">Sang</label>
           <div className="relative group">
             <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as any)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-10 py-3 text-slate-900 focus:border-blue-500 outline-none appearance-none cursor-pointer hover:border-blue-400 transition-all shadow-sm"
             >
                {units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
             </select>
             <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
                <ChevronDown size={18} />
             </div>
           </div>
        </div>
      </div>

      <div className="md:w-1/2 mx-auto">
         <NumberInput 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Nhập nhiệt độ..."
            className="text-center text-lg font-bold text-slate-800"
         />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          {result !== null ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-medium mb-2 block uppercase tracking-wider">Kết quả</span>
              <div className="text-4xl font-bold text-slate-900 mb-3">
                {formatNumber(result)}°{toUnit}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400 gap-3 relative z-10">
              <Thermometer size={32} className="opacity-50" />
              <span className="text-sm">Nhập nhiệt độ để chuyển đổi</span>
            </div>
          )}
      </div>

       <div className="flex justify-end">
         <button 
           onClick={() => setAmount('')}
           className="text-sm font-medium text-slate-500 hover:text-blue-600 flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors"
         >
           <RefreshCw size={16} /> Làm mới
         </button>
      </div>
    </div>
  );
};
