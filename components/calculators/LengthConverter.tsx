
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
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-blue-800 text-sm">
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
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1 justify-center items-center text-slate-500 z-10 bg-white rounded-full p-2 border border-slate-200 shadow-sm">
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

      <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden group shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          {(m && cm) ? (
            <div className="text-center animate-in fade-in zoom-in duration-300 relative z-10">
              <span className="text-slate-500 text-sm font-medium mb-2 block uppercase tracking-wider">Kết quả chuyển đổi</span>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
                {formatNumber(parseFloat(m))} m = {formatNumber(parseFloat(cm))} cm
              </div>
              <div className="text-xs text-slate-500 bg-white px-4 py-1.5 rounded-full border border-slate-200 inline-block font-mono shadow-sm">
                Hệ số chuyển đổi: 100
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400 gap-3 relative z-10">
              <Ruler size={32} className="opacity-50" />
              <span className="text-sm">Nhập độ dài để bắt đầu chuyển đổi</span>
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
