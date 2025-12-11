
import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { Dices, RefreshCw, Copy, Check } from 'lucide-react';

export const RandomNumberGenerator = () => {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [quantity, setQuantity] = useState('1');
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const minVal = parseInt(min) || 0;
    const maxVal = parseInt(max) || 100;
    const qty = parseInt(quantity) || 1;

    if (minVal > maxVal) return;

    let newResults: number[] = [];

    if (!allowDuplicates && qty > (maxVal - minVal + 1)) {
        // Requested more unique numbers than possible range
        setResults([]); 
        return; 
    }

    if (!allowDuplicates) {
        const set = new Set<number>();
        while (set.size < qty) {
            const num = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
            set.add(num);
        }
        newResults = Array.from(set);
    } else {
        for (let i = 0; i < qty; i++) {
            newResults.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
        }
    }

    setResults(newResults);
    setCopied(false);
  };

  const copyResults = () => {
      navigator.clipboard.writeText(results.join(', '));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-blue-800 text-sm">
            Tạo số ngẫu nhiên trong khoảng tùy chọn. Hỗ trợ tạo nhiều số cùng lúc.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NumberInput label="Từ số (Min)" value={min} onChange={(e) => setMin(e.target.value)} />
            <NumberInput label="Đến số (Max)" value={max} onChange={(e) => setMax(e.target.value)} />
            <NumberInput label="Số lượng kết quả" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>

        <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                    type="checkbox" 
                    checked={allowDuplicates} 
                    onChange={(e) => setAllowDuplicates(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-700 font-medium text-sm">Cho phép trùng lặp số</span>
            </label>
        </div>

        <div className="flex justify-center">
            <button 
                onClick={generate} 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all transform hover:scale-105"
            >
                <Dices size={24} /> Quay số
            </button>
        </div>

        {results.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Kết quả ({results.length} số)</div>
                <div className="flex flex-wrap gap-3">
                    {results.map((num, idx) => (
                        <div key={idx} className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-xl md:text-2xl font-bold text-slate-800 animate-in zoom-in duration-300">
                            {num}
                        </div>
                    ))}
                </div>
                <button 
                    onClick={copyResults}
                    className="absolute top-4 right-4 p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-blue-600 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                    title="Sao chép kết quả"
                >
                    {copied ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
                </button>
            </div>
        )}
    </div>
  );
};
