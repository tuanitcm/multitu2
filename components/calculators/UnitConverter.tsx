import React, { useState, useMemo } from 'react';
import { NumberInput } from '../ui/Input';
import { ArrowRightLeft, Calculator, RefreshCw } from 'lucide-react';

export type UnitDefinition = {
  id: string;
  label: string;
  ratio: number; // Ratio to base unit
};

interface UnitConverterProps {
  labelFrom: string;
  labelTo: string;
  units: UnitDefinition[];
  formatDecimals?: number;
  helpText?: string;
}

const formatNumber = (num: number, decimals: number = 6) => {
  // Prevent scientific notation for common numbers, handle very small/large numbers
  if (Math.abs(num) < 0.000001 || Math.abs(num) > 1000000000) {
      return num.toExponential(4);
  }
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: decimals }).format(num);
};

export const UnitConverter: React.FC<UnitConverterProps> = ({ 
  labelFrom, 
  labelTo, 
  units, 
  formatDecimals = 6,
  helpText 
}) => {
  const [amount, setAmount] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>(units[0].id);
  const [toUnit, setToUnit] = useState<string>(units[1]?.id || units[0].id);

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

  return (
    <div className="space-y-6">
      {helpText && (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-slate-300 text-sm">
          {helpText}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
        <div className="md:col-span-3 space-y-2">
           <label className="text-sm font-medium text-slate-400">{labelFrom}</label>
           <select 
             value={fromUnit}
             onChange={(e) => setFromUnit(e.target.value)}
             className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:border-indigo-500 outline-none"
           >
             {units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
           </select>
        </div>

        <div className="md:col-span-1 flex justify-center pb-3">
           <button 
             onClick={handleSwap}
             className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-indigo-400 transition-colors border border-slate-700"
             title="Đổi chiều"
           >
             <ArrowRightLeft size={18} />
           </button>
        </div>

        <div className="md:col-span-3 space-y-2">
           <label className="text-sm font-medium text-slate-400">{labelTo}</label>
           <select 
             value={toUnit}
             onChange={(e) => setToUnit(e.target.value)}
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
            placeholder="Nhập giá trị cần đổi..."
            className="text-center text-lg"
         />
      </div>

      <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {result !== null ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-medium mb-2 block uppercase tracking-wider">Kết quả</span>
              <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-3 break-words">
                {formatNumber(result, formatDecimals)} <span className="text-lg text-slate-500 font-normal">{toLabel}</span>
              </div>
              <div className="text-xs text-slate-400 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700 inline-block font-mono">
                1 {fromLabel} ≈ {formatNumber(units.find(u => u.id === fromUnit)!.ratio / units.find(u => u.id === toUnit)!.ratio, 6)} {toLabel}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-600 gap-3 relative z-10">
              <Calculator size={32} className="opacity-50" />
              <span className="text-sm">Nhập số liệu để xem kết quả</span>
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