import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { Ruler, RefreshCw, ArrowRightLeft } from 'lucide-react';

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 6 }).format(num);
};

export const LengthConverter = () => {
  const [m, setM] = useState<string>('');
  const [cm, setCm] = useState<string>('');

  const handleMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setM(val);
    if (val === '') {
      setCm('');
    } else {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        // 1m = 100cm
        setCm(Number(num * 100).toString()); 
      }
    }
  };

  const handleCmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCm(val);
    if (val === '') {
      setM('');
    } else {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        // 1cm = 0.01m
        setM(Number(num / 100).toString());
      }
    }
  };

  const handleReset = () => {
    setM('');
    setCm('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-blue-200 text-sm">
        Nhập giá trị vào một trong hai ô bên dưới, ô còn lại sẽ tự động tính toán theo tỷ lệ <strong>1 m = 100 cm</strong>.
      </div>
      
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
           <NumberInput 
              label="Mét (m)" 
              value={m}
              onChange={handleMChange}
              placeholder="Nhập số mét..."
            />
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1 justify-center items-center text-slate-600 z-10 bg-[#1e293b] rounded-full p-2 border border-slate-700 shadow-lg">
               <ArrowRightLeft size={18} />
            </div>
            <NumberInput 
              label="Centimét (cm)" 
              value={cm}
              onChange={handleCmChange}
              placeholder="Nhập số cm..."
            />
        </div>
      </div>

      <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {(m && cm) ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-medium mb-2 block uppercase tracking-wider">Kết quả chuyển đổi</span>
              <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-3">
                {formatNumber(parseFloat(m))} m = {formatNumber(parseFloat(cm))} cm
              </div>
              <div className="text-xs text-slate-400 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700 inline-block font-mono">
                Hệ số chuyển đổi: 100
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-600 gap-3 relative z-10">
              <Ruler size={32} className="opacity-50" />
              <span className="text-sm">Nhập độ dài để bắt đầu chuyển đổi</span>
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