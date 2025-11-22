
import React, { useState } from 'react';
import { NumberInput } from '../ui/Input';
import { TrendingUp, RefreshCw, DollarSign } from 'lucide-react';

const formatMoney = (num: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

export const FinanceCalculator = () => {
  const [principal, setPrincipal] = useState(''); // P
  const [rate, setRate] = useState(''); // r
  const [time, setTime] = useState(''); // t
  const [freq, setFreq] = useState('1'); // n (1=yearly, 12=monthly)

  const calc = () => {
      const p = parseFloat(principal);
      const r = parseFloat(rate) / 100;
      const t = parseFloat(time);
      const n = parseFloat(freq);

      if (isNaN(p) || isNaN(r) || isNaN(t)) return null;

      // A = P(1 + r/n)^(nt)
      const amount = p * Math.pow((1 + r/n), n * t);
      const interest = amount - p;

      return { amount, interest };
  };

  const result = calc();

  return (
      <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NumberInput label="Số tiền gốc (P)" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="VD: 100000000" />
              <NumberInput label="Lãi suất năm (%)" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="VD: 7" />
              <NumberInput label="Thời gian gửi (Năm)" value={time} onChange={(e) => setTime(e.target.value)} placeholder="VD: 5" />
              <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Kỳ hạn ghép lãi</label>
                  <select value={freq} onChange={(e) => setFreq(e.target.value)} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none">
                      <option value="1">Hàng năm (1 lần/năm)</option>
                      <option value="2">6 tháng (2 lần/năm)</option>
                      <option value="4">Hàng quý (4 lần/năm)</option>
                      <option value="12">Hàng tháng (12 lần/năm)</option>
                  </select>
              </div>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-6 border border-slate-800 text-center relative overflow-hidden">
              <div className="relative z-10">
                {result ? (
                    <div className="space-y-4">
                        <div>
                            <span className="text-slate-500 text-xs uppercase font-bold">Tổng tiền nhận được</span>
                            <div className="text-3xl md:text-4xl font-bold text-emerald-400 mt-1">{formatMoney(result.amount)}</div>
                        </div>
                         <div className="pt-4 border-t border-slate-800">
                            <span className="text-slate-500 text-xs uppercase font-bold">Tiền lãi phát sinh</span>
                            <div className="text-xl font-bold text-indigo-400 mt-1">+{formatMoney(result.interest)}</div>
                        </div>
                    </div>
                ) : (
                     <div className="flex flex-col items-center text-slate-600 gap-3 py-4">
                        <TrendingUp size={32} className="opacity-50" />
                        <span className="text-sm">Nhập thông tin gửi tiết kiệm để tính toán</span>
                    </div>
                )}
              </div>
          </div>
          
          <div className="flex justify-end">
            <button onClick={() => {setPrincipal(''); setRate(''); setTime('');}} className="text-slate-400 hover:text-white text-sm flex items-center gap-2">
                <RefreshCw size={16} /> Làm mới
            </button>
        </div>
      </div>
  );
};
