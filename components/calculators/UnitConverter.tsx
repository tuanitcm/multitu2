
import React, { useState, useMemo, useEffect } from 'react';
import { NumberInput } from '../ui/Input';
import { ArrowRightLeft, Calculator, RefreshCw, ChevronDown } from 'lucide-react';

export type UnitDefinition = {
  id: string;
  label: string;
  ratio: number; // Ratio to base unit
};

interface UnitConverterProps {
  labelFrom?: string;
  labelTo?: string;
  units: UnitDefinition[];
  formatDecimals?: number;
  helpText?: string;
}

const formatNumber = (num: number, decimals: number = 6) => {
  if (num === 0) return '0';
  // Prevent scientific notation for common numbers, handle very small/large numbers
  if (Math.abs(num) < 0.000001 || Math.abs(num) > 1000000000) {
      return num.toExponential(4);
  }
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: decimals }).format(num);
};

export const UnitConverter: React.FC<UnitConverterProps> = ({ 
  labelFrom = "Từ", 
  labelTo = "Sang", 
  units, 
  formatDecimals = 6,
  helpText 
}) => {
  // Safety check
  if (!units || units.length === 0) {
    return <div className="text-rose-500">Lỗi: Không có dữ liệu đơn vị.</div>;
  }

  const [amount, setAmount] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>(units[0]?.id);
  const [toUnit, setToUnit] = useState<string>(units[1]?.id || units[0]?.id);

  // Ensure selected units exist in the list (useful when switching tools reusing this component)
  useEffect(() => {
    if (!units.find(u => u.id === fromUnit)) setFromUnit(units[0].id);
    if (!units.find(u => u.id === toUnit)) setToUnit(units[1]?.id || units[0].id);
  }, [units, fromUnit, toUnit]);

  const result = useMemo(() => {
    const val = parseFloat(amount);
    if (isNaN(val)) return null;

    const from = units.find(u => u.id === fromUnit);
    const to = units.find(u => u.id === toUnit);

    if (!from || !to) return null;

    // Convert to base unit then to target unit
    const baseValue = val * from.ratio;
    const finalValue = baseValue / to.ratio;

    return finalValue;
  }, [amount, fromUnit, toUnit, units]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleReset = () => {
    setAmount('');
  };

  const fromLabel = units.find(u => u.id === fromUnit)?.label;
  const toLabel = units.find(u => u.id === toUnit)?.label;
  const ratioDisplay = units.find(u => u.id === fromUnit) && units.find(u => u.id === toUnit)
    ? units.find(u => u.id === fromUnit)!.ratio / units.find(u => u.id === toUnit)!.ratio
    : 1;

  return (
    <div className="space-y-6">
      {helpText && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-600 text-sm">
          {helpText}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
        <div className="md:col-span-3 space-y-2">
           <label className="text-sm font-semibold text-slate-700">{labelFrom}</label>
           <div className="relative group">
             <select 
               value={fromUnit}
               onChange={(e) => setFromUnit(e.target.value)}
               className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-10 py-3 text-slate-900 focus:border-blue-500 outline-none text-sm md:text-base focus:ring-2 focus:ring-blue-500/20 shadow-sm appearance-none cursor-pointer transition-all hover:border-blue-400"
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
             onClick={handleSwap}
             className="p-2 bg-slate-100 hover:bg-blue-50 hover:border-blue-200 rounded-full text-slate-500 hover:text-blue-600 transition-all border border-slate-200 shadow-sm active:scale-95"
             title="Đổi chiều"
           >
             <ArrowRightLeft size={20} />
           </button>
        </div>

        <div className="md:col-span-3 space-y-2">
           <label className="text-sm font-semibold text-slate-700">{labelTo}</label>
           <div className="relative group">
             <select 
               value={toUnit}
               onChange={(e) => setToUnit(e.target.value)}
               className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-10 py-3 text-slate-900 focus:border-blue-500 outline-none text-sm md:text-base focus:ring-2 focus:ring-blue-500/20 shadow-sm appearance-none cursor-pointer transition-all hover:border-blue-400"
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
            placeholder="Nhập giá trị..."
            className="text-center text-lg font-bold text-blue-600"
         />
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {result !== null ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-bold mb-2 block uppercase tracking-wider">Kết quả</span>
              <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-3 break-words">
                {formatNumber(result, formatDecimals)} <span className="text-lg text-slate-500 font-normal">{toLabel?.split('(')[0]}</span>
              </div>
              <div className="text-xs text-slate-500 bg-white px-4 py-1.5 rounded-full border border-slate-200 inline-block font-mono shadow-sm">
                1 {fromLabel?.split('(')[0]} ≈ {formatNumber(ratioDisplay, 6)} {toLabel?.split('(')[0]}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400 gap-3 relative z-10">
              <Calculator size={32} className="opacity-50" />
              <span className="text-sm">Nhập số liệu để xem kết quả</span>
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
